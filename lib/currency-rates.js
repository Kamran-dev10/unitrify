// Server only: fetch exchange rates from ExchangeRate-API's open endpoint
// at most once per 24 hours, using Next.js "use cache".
//
// How failures are handled:
// - If a daily refresh fails at runtime, fetchLatestRates throws. Next.js
//   then keeps serving the last successfully generated page (with the last
//   good rates) and tries again on the next request.
// - If the very first fetch fails during `next build`, there are no older
//   rates yet: getRates returns null (the page shows a friendly message),
//   and that page is set to retry every hour instead of every 24 hours.

import { cacheLife } from "next/cache";

export const RATES_URL = "https://open.er-api.com/v6/latest/USD";

async function fetchLatestRates() {
  "use cache";
  cacheLife({ stale: 60 * 60, revalidate: 60 * 60 * 24, expire: 60 * 60 * 24 * 365 });

  const res = await fetch(RATES_URL);
  if (!res.ok) throw new Error(`Exchange rates request failed: ${res.status}`);
  const data = await res.json();
  if (data.result !== "success" || !data.rates || data.rates.USD !== 1) {
    throw new Error("Exchange rates response was not usable");
  }
  return {
    rates: data.rates,
    updatedUtc: data.time_last_update_utc,
  };
}

// Short-lived empty result used only when the build could not fetch rates.
async function noRatesYet() {
  "use cache";
  cacheLife({ stale: 60 * 5, revalidate: 60 * 60, expire: 60 * 60 * 24 });
  return null;
}

// { rates, updatedUtc } or null if no rates are available yet.
export async function getRates() {
  try {
    return await fetchLatestRates();
  } catch (err) {
    if (process.env.NEXT_PHASE === "phase-production-build") {
      console.warn(`[currency] ${err.message}. Building currency pages without rates.`);
      return noRatesYet();
    }
    throw err;
  }
}
