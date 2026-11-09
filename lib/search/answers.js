// Turns a parsed query (lib/search/parseQuery.js) into instant answers for
// the search box. Pure: the maths uses the shared engine (lib/engine.js, the
// same functions lib/convert.js uses) and lib/currency.js for money.
//
// buildAnswers(parsed, data, rates) -> null | {
//   lines: [{ text, copy, href }],   // the first line is the main answer
//   links: [{ label, href }],        // pair page and/or category page
//   didYouMean: [{ label, query }],  // other meanings, as new queries
//   needsRates: true,                // a currency query before rates loaded
//   rates: { updated } }             // shown with the attribution link
import { convertUnits, formatDisplay, formatSmart } from "../engine.js";
import { convertCurrency, formatMoney, formatRatesDate } from "../currency.js";

// The most useful targets per category when only the "from" unit is given.
const USEFUL = {
  length: ["m", "cm", "mm", "inch", "foot", "km", "mile"],
  weight: ["kg", "g", "pound", "ounce", "tola"],
  area: ["sq-m", "sq-ft", "sq-yd", "acre", "hectare"],
  volume: ["litre", "ml", "us-gallon", "us-cup", "uk-gallon"],
  speed: ["km-h", "mph", "m-s", "knot"],
  time: ["s", "min", "h", "day"],
  "data-storage": ["mb", "gb", "kb", "tb", "gib"],
  zameen: ["sq-ft", "sq-yd", "marla", "kanal", "acre"],
  pressure: ["psi", "bar", "kpa", "atm"],
  energy: ["kj", "kwh", "kcal", "btu"],
  power: ["kw", "hp", "w", "btu-h"],
  force: ["n", "kgf", "lbf", "kn"],
};
const CURRENCY_TARGETS = ["PKR", "USD", "GBP", "EUR", "AED", "SAR"];

const unitsOf = (data, category) => data.units.filter((u) => u.category === category);
const withMarla = (u, size) => (u.marlaFactors ? { ...u, factor: u.marlaFactors[String(size)] } : u);
const plainValue = (v) => formatSmart(v);

function hrefFor(data, category, from, to, value) {
  const pair = data.pairs.find((p) => p.category === category && p.from === from && p.to === to);
  const v = encodeURIComponent(plainValue(value));
  if (pair) return { href: `${pair.href}?v=${v}`, pair };
  return { href: `/${category}?v=${v}&from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`, pair: null };
}

function unitAnswers(parsed, data) {
  const { value, from, category } = parsed;
  const cat = data.categories.find((c) => c.id === category);
  if (value < 0 && !cat?.allowNegative) return null;
  const left = parsed.valueText ?? formatDisplay(value);
  const leftText = parsed.feetInches ? left : `${left} ${from.symbol}`;
  const units = unitsOf(data, category);
  const targets = parsed.to
    ? [parsed.to]
    : (USEFUL[category] ?? units.map((u) => u.id))
        .filter((id) => id !== from.id)
        .map((id) => units.find((u) => u.id === id))
        .filter(Boolean)
        .slice(0, 5);

  const lines = [];
  for (const to of targets) {
    const marlaDependent = Boolean(from.marlaFactors || to.marlaFactors);
    const sizes = marlaDependent ? data.marlaSizes : [null];
    for (const size of sizes) {
      const result = convertUnits(value, size ? withMarla(from, size) : from, size ? withMarla(to, size) : to);
      if (result === null) continue;
      const suffix = size ? ` (${formatDisplay(size)} sq ft marla)` : "";
      const { href } = hrefFor(data, category, from.id, to.id, value);
      lines.push({ text: `${leftText} = ${formatDisplay(result)} ${to.symbol}${suffix}`, copy: plainValue(result), href });
    }
  }
  if (lines.length === 0) return null;

  const links = [];
  if (parsed.to) {
    const { pair } = hrefFor(data, category, from.id, parsed.to.id, value);
    if (pair) links.push({ label: pair.h1 ?? `${from.name} to ${parsed.to.name}`, href: lines[0].href });
  }
  if (cat) links.push({ label: cat.h1, href: `/${cat.id}` });

  const number = parsed.hasNumber ? `${plainValue(value)} ` : "";
  const didYouMean = parsed.didYouMean.map((d) =>
    d.currency ? { label: d.label, query: `${number}${d.currency.toLowerCase()}` } : { label: d.label, query: `${number}${d.symbol}`, unit: d.unit, category: d.category },
  );
  // Clicking a "Did you mean" unit must pick that unit, so use its full name.
  for (const d of didYouMean) if (d.unit) d.query = `${number}${d.label.toLowerCase()}`;
  return { lines, links, didYouMean };
}

function currencyAnswers(parsed, data, ratesData) {
  if (!ratesData?.rates) return { lines: [], links: [], didYouMean: [], needsRates: true };
  const { value, from } = parsed;
  if (value < 0) return null;
  const rates = ratesData.rates;
  const targets = parsed.to ? [parsed.to] : CURRENCY_TARGETS.filter((c) => c !== from).slice(0, 5);
  const lines = [];
  for (const to of targets) {
    const result = convertCurrency(value, from, to, rates);
    if (result === null) continue;
    const pair = data.currencyPairs.find((p) => p.from === from && p.to === to);
    const v = encodeURIComponent(plainValue(value));
    const href = pair ? `${pair.href}?v=${v}` : `/currency-converter?v=${v}&from=${from}&to=${to}`;
    lines.push({ text: `${formatMoney(value)} ${from} = ${formatMoney(result)} ${to}`, copy: formatMoney(result).replace(/,/g, ""), href });
  }
  if (lines.length === 0) return null;
  return {
    lines,
    links: [{ label: "Currency Converter", href: "/currency-converter" }],
    didYouMean: [],
    rates: { updated: ratesData.updatedUtc ? formatRatesDate(ratesData.updatedUtc) : null },
  };
}

export function buildAnswers(parsed, data, ratesData) {
  if (!parsed || parsed.type === "none" || !data) return null;
  if (parsed.type === "currency") return currencyAnswers(parsed, data, ratesData);
  return unitAnswers(parsed, data);
}
