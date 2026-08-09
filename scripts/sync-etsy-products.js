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
//   ETSY_API_KEY   - your app's keystring (x-api-key)
//   ETSY_SHOP_ID   - numeric shop id  (preferred)   OR
//   ETSY_SHOP_NAME - shop name, e.g. steadyfocusco   (resolved to an id)
// Optional:
//   ETSY_ACCESS_TOKEN - OAuth2 token; when present the script uses the
//                       getListingsByShop endpoint with state=active.
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
const API = "https://openapi.etsy.com/v3/application";
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

async function apiGet(path, { apiKey, token }) {
  const headers = { "x-api-key": apiKey };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API}${path}`, { headers });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Etsy API ${res.status} on ${path}: ${body.slice(0, 300)}`);
  }
  return res.json();
}

async function resolveShopId(auth) {
  if (process.env.ETSY_SHOP_ID && /^\d+$/.test(process.env.ETSY_SHOP_ID)) {
    return process.env.ETSY_SHOP_ID;
  }
  const name = process.env.ETSY_SHOP_NAME || DEFAULT_SHOP_NAME;
  const data = await apiGet(
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

  // With an OAuth token we can use getListingsByShop?state=active.
  // With only an API key, the public "active" collection endpoint is used.
  const basePath = auth.token
    ? `/shops/${shopId}/listings`
    : `/shops/${shopId}/listings/active`;

  while (true) {
    const stateParam = auth.token ? "&state=active" : "";
    const path = `${basePath}?limit=${limit}&offset=${offset}&includes=Images${stateParam}`;
    const data = await apiGet(path, auth);
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
  const token = process.env.ETSY_ACCESS_TOKEN;

  if (!apiKey) {
    console.warn(
      "[sync-etsy] ETSY_API_KEY not set — skipping live sync. " +
        "Keeping existing src/data/products.json (seed). " +
        "Set ETSY_API_KEY + ETSY_SHOP_ID (or ETSY_SHOP_NAME) in .env to pull live listings.",
    );
    return;
  }

  const auth = { apiKey, token };
  try {
    const shopId = await resolveShopId(auth);
    console.log(`[sync-etsy] Resolved shop id: ${shopId}`);
    const raw = await fetchActiveListings(shopId, auth);

    const products = raw
      // Only active listings ever reach the site.
      .filter((l) => (l.state ? l.state === "active" : true))
      .map((l) => ({
        listing_id: l.listing_id ?? null,
        title: l.title ?? "",
        price: formatPrice(l.price),
        currency_code: l.price?.currency_code || l.currency_code || "USD",
        image: pickImage(l),
        url: l.url || `https://www.etsy.com/listing/${l.listing_id}`,
        cluster: clusterFromTitle(l.title ?? ""),
      }));

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
    console.warn(
      `[sync-etsy] Live sync failed (${err.message}). ` +
        "Keeping existing src/data/products.json so the build can continue.",
    );
  }
}

main();
