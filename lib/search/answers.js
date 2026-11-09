// Turns a parsed query (lib/search/parseQuery.js) into instant answers for
// the search box. Pure: the maths uses the shared engine (lib/engine.js, the
// same functions lib/convert.js uses) and lib/currency.js for money.
//
// buildAnswers(parsed, data, rates) -> null | {
//   main: { text, copy, href },     // the big answer (full precision)
//   rows: [{ label, valueText, copy, href }], // up to 5 more, 4 significant figures
//   lines: [main, ...rows],
//   links: [{ label, href }],        // pair page and/or category page
//   didYouMean: [{ label, query }],  // other meanings, as new queries
//   needsRates: true,                // a currency query before rates loaded
//   rates: { updated } }             // shown with the attribution link
import { convertUnits, formatDisplay, formatSmart } from "../engine.js";
import { convertCurrency, currencyName, formatRatesDate } from "../currency.js";

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

// 4 significant figures for the smaller rows: 39.3701 -> "39.37", 3.28084 -> "3.281".
const sig4 = (x) => formatDisplay(Number(x.toPrecision(4)));

// Currency: 2 decimals from 1 up (1.33), 4 significant digits below 1 (0.3613).
export function formatCurrencyAnswer(x) {
  if (!Number.isFinite(x)) return "";
  if (Math.abs(x) >= 1) return x.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (x === 0) return "0";
  return String(Number(x.toPrecision(4)));
}
const plainCurrency = (x) => formatCurrencyAnswer(x).replace(/,/g, "");

// "Inch" -> "Inches", "Square yard (gaz)" -> "Square yards (gaz)", "Meter per second" -> "Meters per second".
function pluralName(name) {
  const m = name.match(/^(.*?)( per .*| \(.*\))?$/);
  const head = m[1];
  const rest = m[2] ?? "";
  let p;
  if (/foot$/i.test(head)) p = head.replace(/oot$/i, "eet");
  else if (/(inch|s|x|sh)$/i.test(head)) p = `${head}es`;
  else if (/[^aeiou]y$/i.test(head)) p = head.replace(/y$/i, "ies");
  else p = `${head}s`;
  return p + rest;
}

// "Did you mean" only for real everyday mix-ups (m = meter, minute or mile;
// oz = ounce or fluid ounce; pound = weight or GBP). Never niche categories
// and never a unit with the same name as the answer.
const EVERYDAY = new Set([
  "length", "weight", "temperature", "area", "volume", "volume-dry", "speed", "time", "data-storage", "pressure",
  "energy", "power", "force", "angle", "fuel-consumption", "zameen",
]);

function unitAnswers(parsed, data) {
  const { value, from, category } = parsed;
  const cat = data.categories.find((c) => c.id === category);
  if (value < 0 && !cat?.allowNegative) return null;
  // The number as the user typed it, formatted nicely ("1,000", "2.5").
  const left = parsed.valueText ?? formatDisplay(value);
  const leftText = parsed.feetInches ? left : `${left} ${from.symbol}`;
  const units = unitsOf(data, category);
  const targets = parsed.to
    ? [parsed.to]
    : (USEFUL[category] ?? units.map((u) => u.id))
        .filter((id) => id !== from.id)
        .map((id) => units.find((u) => u.id === id))
        .filter(Boolean)
        .slice(0, 6);

  // Every answer line: the main one keeps full precision, rows use 4 significant figures.
  const lines = [];
  for (const to of targets) {
    const marlaDependent = Boolean(from.marlaFactors || to.marlaFactors);
    const sizes = marlaDependent ? data.marlaSizes : [null];
    for (const size of sizes) {
      const result = convertUnits(value, size ? withMarla(from, size) : from, size ? withMarla(to, size) : to);
      if (result === null) continue;
      const suffix = size ? ` (${formatDisplay(size)} sq ft marla)` : "";
      const { href } = hrefFor(data, category, from.id, to.id, value);
      lines.push({
        text: `${leftText} = ${formatDisplay(result)} ${to.symbol}${suffix}`,
        label: size ? `${formatDisplay(size)} sq ft marla` : pluralName(to.name),
        valueText: `${sig4(result)} ${to.symbol}`,
        copy: plainValue(result),
        href,
      });
    }
  }
  if (lines.length === 0) return null;
  const main = lines[0];
  const rows = lines.slice(1, 6);

  const pair = parsed.to ? hrefFor(data, category, from.id, parsed.to.id, value).pair : null;
  const links = [];
  if (pair) links.push({ label: pair.h1 ?? `${from.name} to ${parsed.to.name}`, href: pair.href });
  if (cat) links.push({ label: cat.h1, href: `/${cat.id}` });

  const number = parsed.hasNumber ? `${plainValue(value)} ` : "";
  const didYouMean = parsed.didYouMean
    .filter((d) => d.currency || (EVERYDAY.has(d.category) && d.label.toLowerCase() !== from.name.toLowerCase()))
    .map((d) =>
      d.currency
        ? { label: d.label, query: `${number}${d.currency.toLowerCase()}` }
        : // A suggestion is a new query that reads as that unit, so use its full name.
          { label: d.label, query: `${number}${d.label.toLowerCase()}` },
    );
  return { main, rows, lines: [main, ...rows], links, didYouMean, hasPair: Boolean(pair) };
}

function currencyAnswers(parsed, data, ratesData) {
  if (!ratesData?.rates) return { main: null, rows: [], lines: [], links: [], didYouMean: [], needsRates: true };
  const { value, from } = parsed;
  if (value < 0) return null;
  const rates = ratesData.rates;
  const targets = parsed.to ? [parsed.to] : CURRENCY_TARGETS.filter((c) => c !== from).slice(0, 5);
  const left = parsed.valueText ?? formatDisplay(value);
  const lines = [];
  let hasPair = false;
  for (const to of targets) {
    const result = convertCurrency(value, from, to, rates);
    if (result === null) continue;
    const pair = data.currencyPairs.find((p) => p.from === from && p.to === to);
    if (pair && lines.length === 0) hasPair = true;
    const v = encodeURIComponent(plainValue(value));
    const href = pair ? `${pair.href}?v=${v}` : `/currency-converter?v=${v}&from=${from}&to=${to}`;
    lines.push({
      text: `${left} ${from} = ${formatCurrencyAnswer(result)} ${to}`,
      label: currencyName(to),
      valueText: `${formatCurrencyAnswer(result)} ${to}`,
      copy: plainCurrency(result),
      href,
    });
  }
  if (lines.length === 0) return null;
  const [main, ...rows] = lines;
  return {
    main,
    rows: rows.slice(0, 5),
    lines: [main, ...rows.slice(0, 5)],
    links: [{ label: "Currency Converter", href: "/currency-converter" }],
    didYouMean: [],
    hasPair,
    rates: { updated: ratesData.updatedUtc ? formatRatesDate(ratesData.updatedUtc) : null },
  };
}

export function buildAnswers(parsed, data, ratesData) {
  if (!parsed || parsed.type === "none" || !data) return null;
  if (parsed.type === "currency") return currencyAnswers(parsed, data, ratesData);
  return unitAnswers(parsed, data);
}
