#!/usr/bin/env node
// Etsy OAuth 2.0 + PKCE token acquisition for the build-time shop sync.
//
// This is a DEVELOPER tool, not part of the site. It runs once (or on refresh)
// to obtain an Etsy access token + refresh token for the steadyfocusco shop,
// then writes them into the local .env so the existing build-time sync
// (scripts/sync-etsy-products.js) can authenticate.
//
// Usage:
//   node scripts/etsy-oauth.mjs            # full authorize + exchange flow
//   node scripts/etsy-oauth.mjs --refresh  # refresh an existing access token
//
// Required env (in .env):
//   ETSY_API_KEY        - app keystring (used as the OAuth client_id)
// Optional:
//   ETSY_ACCESS_TOKEN   - existing token (for --refresh)
//   ETSY_REFRESH_TOKEN  - existing refresh token (for --refresh)
//
// SECURITY: This script NEVER prints tokens. It only writes them to .env.

import { createHash, randomBytes, randomUUID } from "node:crypto";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import http from "node:http";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const ENV_PATH = resolve(ROOT, ".env");

const AUTH_URL = "https://www.etsy.com/oauth/connect";
const TOKEN_URL = "https://api.etsy.com/v3/public/oauth/token";
const REDIRECT_PORT = 3001;
const REDIRECT_PATH = "/callback";
const REDIRECT_URI = `http://localhost:${REDIRECT_PORT}${REDIRECT_PATH}`;
const SCOPE = "listings_r"; // read-only listings — matches the sync's read-only policy

// ---- tiny .env loader (no dependency) --------------------------------------
function loadDotEnv() {
  if (!existsSync(ENV_PATH)) return {};
  const env = {};
  const text = readFileSync(ENV_PATH, "utf8");
  for (const rawLine of text.split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    env[key] = val;
  }
  return env;
}

// ---- write a single key back into .env (preserving other lines) ------------
// Matches by key only (tolerant of spaces around "=") and never writes empty/
// undefined values, so a real token is never clobbered with a blank/undefined.
function setEnvValue(key, value) {
  if (!value) return; // guard: never overwrite a real value with empty/undefined
  const lines = existsSync(ENV_PATH)
    ? readFileSync(ENV_PATH, "utf8").split("\n")
    : [];
  const out = [];
  let replaced = false;
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
      const eq = trimmed.indexOf("=");
      const lineKey = trimmed.slice(0, eq).trim(); // "KEY = value" -> "KEY"
      if (lineKey === key) {
        out.push(`${key}=${value}`);
        replaced = true;
        continue;
      }
    }
    out.push(line);
  }
  if (!replaced) out.push(`${key}=${value}`);
  writeFileSync(ENV_PATH, out.join("\n") + "\n", "utf8");
}

// ---- PKCE helpers -----------------------------------------------------------
function base64url(buf) {
  return Buffer.from(buf)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
function generateCodeVerifier() {
  return base64url(randomBytes(32)); // 43-char PKCE verifier
}
function generateCodeChallenge(verifier) {
  return base64url(createHash("sha256").update(verifier).digest());
}

// ---- token exchange ----------------------------------------------------------
async function exchangeCode({ clientId, code, codeVerifier }) {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: clientId,
    code,
    code_verifier: codeVerifier,
    redirect_uri: REDIRECT_URI,
  });
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      `Token exchange failed (${res.status}): ${JSON.stringify(data)}`,
    );
  }
  return data;
}

async function refreshToken({ clientId, refreshToken }) {
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: clientId,
    refresh_token: refreshToken,
  });
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      `Token refresh failed (${res.status}): ${JSON.stringify(data)}`,
    );
  }
  return data;
}

// ---- local callback server ---------------------------------------------------
function startCallbackServer() {
  return new Promise((resolvePromise, rejectPromise) => {
    const server = http.createServer((req, res) => {
      const url = new URL(req.url, REDIRECT_URI);
      if (url.pathname !== REDIRECT_PATH) {
        res.writeHead(404).end("Not found");
        return;
      }
      const code = url.searchParams.get("code");
      const state = url.searchParams.get("state");
      res.writeHead(200, { "Content-Type": "text/html" });
      if (code) {
        res.end(
          "<h1>Authorization received</h1><p>You can close this tab and return to the terminal.</p>",
        );
        server.close();
        resolvePromise({ code, state });
      } else {
        res.end(
          "<h1>Authorization failed</h1><p>No code returned. Check the error in the URL.</p>",
        );
        server.close();
        rejectPromise(new Error("No authorization code returned by Etsy."));
      }
    });
    server.listen(REDIRECT_PORT, () => {
      console.log(
        `[etsy-oauth] Waiting for the Etsy callback on ${REDIRECT_URI} ...`,
      );
    });
    server.on("error", (err) => rejectPromise(err));
  });
}

// ---- main ---------------------------------------------------------------------
async function main() {
  const args = process.argv.slice(2);
  const env = loadDotEnv();
  const clientId = env.ETSY_API_KEY;

  if (!clientId) {
    console.error(
      "[etsy-oauth] ETSY_API_KEY (keystring) is required in .env — it is the OAuth client_id.",
    );
    process.exit(1);
  }

  if (args.includes("--refresh")) {
    const refreshTokenValue = env.ETSY_REFRESH_TOKEN;
    if (!refreshTokenValue) {
      console.error(
        "[etsy-oauth] ETSY_REFRESH_TOKEN is required for --refresh.",
      );
      process.exit(1);
    }
    console.log("[etsy-oauth] Refreshing access token ...");
    const data = await refreshToken({
      clientId,
      refreshToken: refreshTokenValue,
    });
    setEnvValue("ETSY_ACCESS_TOKEN", data.access_token);
    if (data.refresh_token)
      setEnvValue("ETSY_REFRESH_TOKEN", data.refresh_token);
    console.log(
      `[etsy-oauth] Access token refreshed (expires_in=${data.expires_in}s). Tokens written to .env.`,
    );
    return;
  }

  // Full authorize flow
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = generateCodeChallenge(codeVerifier);
  const state = randomUUID();

  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    redirect_uri: REDIRECT_URI,
    scope: SCOPE,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
    state,
  });
  const authUrl = `${AUTH_URL}?${params.toString()}`;

  console.log(
    "[etsy-oauth] Open this URL in your browser and authorize the app:",
  );
  console.log(authUrl);
  console.log("");

  const { code, state: returnedState } = await startCallbackServer();
  if (returnedState !== state) {
    console.error("[etsy-oauth] State mismatch — aborting.");
    process.exit(1);
  }

  console.log("[etsy-oauth] Exchanging authorization code for tokens ...");
  const data = await exchangeCode({ clientId, code, codeVerifier });
  setEnvValue("ETSY_ACCESS_TOKEN", data.access_token);
  if (data.refresh_token) setEnvValue("ETSY_REFRESH_TOKEN", data.refresh_token);
  console.log(
    `[etsy-oauth] Tokens obtained (expires_in=${data.expires_in}s). Written to .env.`,
  );
}

main().catch((err) => {
  console.error(`[etsy-oauth] ${err.message}`);
  process.exit(1);
});
