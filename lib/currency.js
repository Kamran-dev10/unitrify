// Currency maths. Rates are "units of currency per 1 USD", as returned by
// https://open.er-api.com/v6/latest/USD. No network code here (see
// lib/currency-rates.js), so this file is safe in the browser and in tests.

// convertCurrency(100, "USD", "PKR", rates) -> 100 × rates.PKR / rates.USD
export function convertCurrency(amount, from, to, rates) {
  if (!rates) return null;
  const a = typeof amount === "string" ? (amount.trim() === "" ? NaN : Number(amount.replace(/,/g, ""))) : amount;
  if (!Number.isFinite(a) || a < 0) return null;
  const rFrom = rates[from];
  const rTo = rates[to];
  if (!rFrom || !rTo) return null;
  return (a / rFrom) * rTo;
}

// Money-style formatting: 2 decimals normally, more for tiny values.
export function formatMoney(value) {
  if (value === null || value === undefined || !Number.isFinite(value)) return "";
  const digits = Math.abs(value) >= 1 || value === 0 ? 2 : 6;
  return new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: digits }).format(value);
}

// "Sun, 08 Nov 2026 00:02:31 +0000" -> "8 November 2026"
export function formatRatesDate(utc) {
  const d = new Date(utc);
  if (Number.isNaN(d.getTime())) return utc ?? "";
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(d);
}

// English names for currency codes, e.g. "PKR" -> "Pakistani Rupee".
export function currencyName(code) {
  try {
    const name = new Intl.DisplayNames(["en"], { type: "currency" }).of(code);
    return name && name !== code ? name.replace(/^./, (c) => c.toUpperCase()) : code;
  } catch {
    return code;
  }
}

export const TABLE_AMOUNTS = [1, 5, 10, 50, 100, 500, 1000];

// Popular currencies first, then the rest A-Z.
const POPULAR = ["PKR", "USD", "GBP", "EUR", "AED", "SAR", "INR", "CAD", "AUD", "CNY"];

export function currencyList(rates) {
  const codes = Object.keys(rates ?? {});
  const popular = POPULAR.filter((c) => codes.includes(c));
  const rest = codes.filter((c) => !POPULAR.includes(c)).sort();
  return [...popular, ...rest].map((code) => ({ code, name: currencyName(code) }));
}
