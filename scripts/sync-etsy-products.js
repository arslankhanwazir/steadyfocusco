#!/usr/bin/env node
// Read-only Etsy shop sync (Etsy Open API v3).
//
// POLICY: This script only READS and DISPLAYS our own shop's ACTIVE listings.
// It never touches checkout/payment. Every product link on the site points to
// the real Etsy listing page for purchase.
//
// It runs at build time (see package.json "prebuild") and writes the result to
// src/data/products.json, so the site stays fully static — no client-side Etsy
// calls. When a new product is published on Etsy, the next build pulls it in
// automatically with no manual edits.
//
// Required env (put in .env, which is gitignored):
//   ETSY_SHARED_SECRET - app Shared Secret, sent as the x-api-key header
//                        (Etsy Open API v3 requires the shared secret here,
//                        not the keystring).
//   ETSY_ACCESS_TOKEN  - OAuth2 access token, sent as Authorization: Bearer.
//   ETSY_SHOP_ID       - numeric shop id  (preferred)   OR
//   ETSY_SHOP_NAME     - shop name, e.g. steadyfocusco   (resolved to an id)
// Optional:
//   ETSY_REFRESH_TOKEN - OAuth2 refresh token. When the access token expires
//                        (HTTP 401), the script refreshes it automatically
//                        and retries once. Tokens are never printed.
//
// If credentials are missing or the API call fails, the existing
// src/data/products.json (the committed seed) is left untouched so the build
// still succeeds. This script always exits 0.

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT = resolve(ROOT, "src/data/products.json");
const ENV_PATH = resolve(ROOT, ".env");
const API = "https://openapi.etsy.com/v3/application";
const TOKEN_URL = "https://api.etsy.com/v3/public/oauth/token";
const DEFAULT_SHOP_NAME = "steadyfocusco";

// ---- tiny .env loader (no dependency) --------------------------------------
function loadDotEnv() {
  const envPath = resolve(ROOT, ".env");
  if (!existsSync(envPath)) return;
  const text = readFileSync(envPath, "utf8");
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
    if (!(key in process.env)) process.env[key] = val;
  }
}

// ---- write a single key back into .env (preserving other lines) ------------
function setEnvValue(key, value) {
  if (!existsSync(ENV_PATH)) return;
  const lines = readFileSync(ENV_PATH, "utf8").split("\n");
  const out = [];
  let replaced = false;
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith(`${key}=`)) {
      out.push(`${key}=${value}`);
      replaced = true;
    } else {
      out.push(line);
    }
  }
  if (!replaced) out.push(`${key}=${value}`);
  writeFileSync(ENV_PATH, out.join("\n") + "\n", "utf8");
}

// ---- helpers ----------------------------------------------------------------
function clusterFromTitle(title) {
  const t = title.toLowerCase();
  if (/(student|homework|study|assignment|school)/.test(t)) return "students";
  if (/(weekly|executive|productivit|planner for adults|task)/.test(t))
    return "productivity";
  return "adhd";
}

function formatPrice(price) {
  // v3 price is { amount, divisor, currency_code }
  if (price && typeof price === "object" && "amount" in price) {
    const divisor = price.divisor || 100;
    return (price.amount / divisor).toFixed(2);
  }
  // some endpoints return a plain string/number
  if (price != null) return String(price);
  return null;
}

function pickImage(listing) {
  const imgs = listing.images || (listing.Images ?? []);
  if (Array.isArray(imgs) && imgs.length > 0) {
    const first = imgs[0];
    return (
      first.url_570xN ||
      first.url_fullxfull ||
      first.url_680x540 ||
      first.url ||
      null
    );
  }
  return null;
}

// Listing IDs for the 3 products that previously surfaced with null/unusable
// images on the deployed site. We log image resolution for these specifically.
const IMAGE_DEBUG_LISTING_IDS = new Set([
  4549542728, // ADHD Study Planner PDF
  4549519458, // ADHD Homework Tracker Printable
  4549480819, // ADHD Brain Dump Printable
]);

// Fetch the best available image URL for a single listing via the Etsy v3
// listing-images endpoint. Falls back through url_570xN -> url_fullxfull ->
// url_680x540 -> url -> url_170x135 -> url_75x75. Returns null if the listing
// has no images or the call fails (so the sync can continue without breaking).
async function fetchListingImage(listingId, auth) {
  if (!listingId) return null;
  try {
    const data = await apiGetWithRefresh(`/listings/${listingId}/images`, auth);
    const imgs = data.results || [];
    if (imgs.length === 0) {
      if (IMAGE_DEBUG_LISTING_IDS.has(listingId)) {
        console.log(
          `[sync-etsy] image debug: listing ${listingId} has no images (0 results).`,
        );
      }
      return null;
    }
    const first = imgs[0];
    const url =
      first.url_570xN ||
      first.url_fullxfull ||
      first.url_680x540 ||
      first.url ||
      first.url_170x135 ||
      first.url_75x75 ||
      null;
    if (IMAGE_DEBUG_LISTING_IDS.has(listingId)) {
      console.log(
        `[sync-etsy] image debug: listing ${listingId} image URL ${
          url ? "FOUND" : "NOT FOUND"
        } (fields: ${Object.keys(first)
          .filter((k) => /^url_/.test(k))
          .join(",")}).`,
      );
    }
    return url;
  } catch (err) {
    if (IMAGE_DEBUG_LISTING_IDS.has(listingId)) {
      console.log(
        `[sync-etsy] image debug: listing ${listingId} image fetch failed (${err.message}).`,
      );
    }
    return null;
  }
}

// ---- OAuth token refresh (mirrors scripts/etsy-oauth.mjs) -------------------
// Refreshes the access token using ETSY_REFRESH_TOKEN, writes the new tokens
// back to .env, and returns the new access token. Never prints tokens.
async function refreshAccessToken() {
  const refreshToken = process.env.ETSY_REFRESH_TOKEN;
  const clientId = process.env.ETSY_API_KEY; // keystring is the OAuth client_id
  if (!refreshToken || !clientId) {
    throw new Error(
      "Access token expired but ETSY_REFRESH_TOKEN / ETSY_API_KEY are not set — cannot refresh.",
    );
  }
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
  if (!data.access_token) {
    throw new Error("Token refresh returned no access_token.");
  }
  setEnvValue("ETSY_ACCESS_TOKEN", data.access_token);
  if (data.refresh_token) setEnvValue("ETSY_REFRESH_TOKEN", data.refresh_token);
  process.env.ETSY_ACCESS_TOKEN = data.access_token;
  if (data.refresh_token) process.env.ETSY_REFRESH_TOKEN = data.refresh_token;
  return data.access_token;
}

// ---- Etsy API GET with keystring:shared-secret x-api-key + Bearer token -----
async function apiGet(path, { apiKey, sharedSecret, token }) {
  const headers = {
    "x-api-key": `${apiKey}:${sharedSecret}`,
    Authorization: `Bearer ${token}`,
  };
  const res = await fetch(`${API}${path}`, { headers });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Etsy API ${res.status} on ${path}: ${body.slice(0, 300)}`);
  }
  return res.json();
}

// Wraps apiGet: on HTTP 401 (expired token) it refreshes once and retries.
async function apiGetWithRefresh(path, auth) {
  try {
    return await apiGet(path, auth);
  } catch (err) {
    if (/Etsy API 401/.test(err.message)) {
      console.warn(
        "[sync-etsy] Access token expired (401) — refreshing and retrying once.",
      );
      auth.token = await refreshAccessToken();
      return await apiGet(path, auth);
    }
    throw err;
  }
}

async function resolveShopId(auth) {
  if (process.env.ETSY_SHOP_ID && /^\d+$/.test(process.env.ETSY_SHOP_ID)) {
    return process.env.ETSY_SHOP_ID;
  }
  const name = process.env.ETSY_SHOP_NAME || DEFAULT_SHOP_NAME;
  const data = await apiGetWithRefresh(
    `/shops?shop_name=${encodeURIComponent(name)}`,
    auth,
  );
  const shop = data.results?.[0];
  if (!shop) throw new Error(`No shop found for name "${name}"`);
  return String(shop.shop_id);
}

async function fetchActiveListings(shopId, auth) {
  const listings = [];
  const limit = 100;
  let offset = 0;

  // Use the general shop listings endpoint with an explicit active state.
  const basePath = `/shops/${shopId}/listings`;

  while (true) {
    const path =
      `${basePath}?state=active&limit=${limit}` +
      `&offset=${offset}` +
      `&includes=Images`;

    const data = await apiGetWithRefresh(path, auth);
    const batch = data.results || [];
    listings.push(...batch);
    if (batch.length < limit) break;
    offset += limit;
  }
  return listings;
}

async function main() {
  loadDotEnv();
  const apiKey = process.env.ETSY_API_KEY;
  const sharedSecret = process.env.ETSY_SHARED_SECRET;
  const token = process.env.ETSY_ACCESS_TOKEN;

  if (!apiKey || !sharedSecret || !token) {
    console.warn(
      "[sync-etsy] ETSY_API_KEY, ETSY_SHARED_SECRET and/or ETSY_ACCESS_TOKEN not set — skipping live sync. " +
        "Keeping existing src/data/products.json (seed). " +
        "Run `node scripts/etsy-oauth.mjs` to obtain tokens, then set ETSY_API_KEY + ETSY_SHARED_SECRET + ETSY_SHOP_ID (or ETSY_SHOP_NAME) in .env.",
    );
    return;
  }

  const auth = { apiKey, sharedSecret, token };
  try {
    const shopId = await resolveShopId(auth);
    console.log(`[sync-etsy] Resolved shop id: ${shopId}`);
    const raw = await fetchActiveListings(shopId, auth);

    // Fetch images sequentially to respect Etsy rate limits and keep the
    // per-listing image calls reliable.
    const products = [];
    for (const l of raw) {
      // Only active listings ever reach the site.
      if (l.state && l.state !== "active") continue;
      const listingId = l.listing_id ?? null;
      const image = pickImage(l) || (await fetchListingImage(listingId, auth));
      products.push({
        listing_id: listingId,
        title: l.title ?? "",
        price: formatPrice(l.price),
        currency_code: l.price?.currency_code || l.currency_code || "USD",
        image,
        url: l.url || `https://www.etsy.com/listing/${listingId}`,
        cluster: clusterFromTitle(l.title ?? ""),
      });
    }

    if (products.length === 0) {
      console.warn(
        "[sync-etsy] API returned 0 active listings — keeping existing products.json.",
      );
      return;
    }

    const out = {
      source: "etsy-api",
      shop: process.env.ETSY_SHOP_NAME || DEFAULT_SHOP_NAME,
      syncedAt: new Date().toISOString(),
      products,
    };
    writeFileSync(OUT, JSON.stringify(out, null, 2) + "\n", "utf8");
    console.log(
      `[sync-etsy] Wrote ${products.length} active listings to src/data/products.json`,
    );
  } catch (err) {
    // Fail-safe: never destroy the existing seed. Report the real reason.
    console.warn(
      `[sync-etsy] Live sync failed: ${err.message}. ` +
        "Keeping existing src/data/products.json so the build can continue.",
    );
  }
}

main();
