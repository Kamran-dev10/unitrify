// Reads search queries like "100 cm to m", "5 ft 4 in to cm", "10 marla kitne
// square feet", "100 dollar to pkr". Pure function: no imports, no network.
//
// parseQuery(query, data, { currencies }) ->
//   { type: "unit", value, valueText, from, to, category, didYouMean }
//   { type: "currency", value, valueText, from, to, didYouMean }
//   { type: "none" }
// data: the object from lib/search/units-data.js (/search-units.json).
// currencies: currency codes that may be used (e.g. the keys of the rates).

// Words people add that carry no meaning here, including Roman Urdu.
const FILLERS = new Set([
  "kitne", "kitna", "kitni", "mein", "main", "me", "ka", "ki", "ke", "hai", "hain", "hota", "hoti", "hote",
  "what", "whats", "what's", "is", "are", "the", "of", "a", "an", "please", "equals", "equal", "convert",
  "conversion", "calculate", "value", "how", "much", "many", "there", "does", "do", "make", "makes", "for",
]);
const SEPARATORS = new Set(["to", "in", "into", "as"]);

// Category order when a word fits several categories (everyday ones first).
const PRIORITY = [
  "length", "weight", "temperature", "area", "volume", "speed", "time", "data-storage", "pressure", "energy",
  "power", "force", "angle", "fuel-consumption", "volume-dry", "zameen",
];

// Short symbols with several meanings: the usual meaning, then the others.
const AMBIGUOUS = {
  m: ["length:m", "time:min", "length:mile"],
  min: ["time:min", "angle:arcmin"],
  oz: ["weight:ounce", "volume:us-fl-oz"],
  ton: ["weight:tonne", "weight:short-ton", "weight:long-ton"],
  tons: ["weight:tonne", "weight:short-ton", "weight:long-ton"],
  cup: ["volume:us-cup", "volume:metric-cup"],
  cups: ["volume:us-cup", "volume:metric-cup"],
  gal: ["volume:us-gallon", "volume:uk-gallon"],
  gallon: ["volume:us-gallon", "volume:uk-gallon"],
  gallons: ["volume:us-gallon", "volume:uk-gallon"],
  pt: ["volume:us-pint", "typography:pt"],
};

// Currency words. "pound"/"pounds" are handled separately (weight or GBP).
const CURRENCY_WORDS = {
  $: "USD", dollar: "USD", dollars: "USD", usd: "USD", "us dollar": "USD", "us dollars": "USD",
  rupee: "PKR", rupees: "PKR", pkr: "PKR", rs: "PKR", "rs.": "PKR", "pakistani rupee": "PKR", "pakistani rupees": "PKR",
  inr: "INR", "indian rupee": "INR", "indian rupees": "INR",
  "£": "GBP", gbp: "GBP", "pound sterling": "GBP", "pounds sterling": "GBP", "british pound": "GBP", "british pounds": "GBP",
  "€": "EUR", euro: "EUR", euros: "EUR", eur: "EUR",
  dirham: "AED", dirhams: "AED", aed: "AED",
  riyal: "SAR", riyals: "SAR", sar: "SAR",
};
const POUND_WORDS = new Set(["pound", "pounds"]);

// --------------------------------------------------------------- helpers

function plural(word) {
  if (/foot$/.test(word)) return word.replace(/foot$/, "feet");
  if (/inch$/.test(word)) return `${word}es`;
  if (/(s|x|ch|sh)$/.test(word)) return `${word}es`;
  if (/[^aeiou]y$/.test(word)) return word.replace(/y$/, "ies");
  return `${word}s`;
}

// "Meter per second" -> ["meters per second"]; "Foot" -> ["feet"].
function plurals(name) {
  const per = name.indexOf(" per ");
  if (per > 0) return [plural(name.slice(0, per)) + name.slice(per)];
  return [plural(name)];
}

function levenshtein(a, b) {
  if (Math.abs(a.length - b.length) > 2) return 3;
  const prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let diag = prev[0];
    prev[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = prev[j];
      prev[j] = Math.min(prev[j] + 1, prev[j - 1] + 1, diag + (a[i - 1] === b[j - 1] ? 0 : 1));
      diag = tmp;
    }
  }
  return prev[b.length];
}

// Lookup tables, built once per data object.
const INDEX_CACHE = new WeakMap();
function buildIndex(data) {
  if (INDEX_CACHE.has(data)) return INDEX_CACHE.get(data);
  const exact = new Map(); // name/alias/id key -> Set of "category:id"
  const symbols = new Map(); // unit symbol key -> Set of "category:id"
  const fuzzyKeys = new Map(); // longer name/alias keys only (no short symbols)
  const units = new Map(); // "category:id" -> unit
  const add = (key, ref, fuzzy, map = exact) => {
    const k = key.toLowerCase().trim().replace(/\s+/g, " ");
    if (!k) return;
    if (!map.has(k)) map.set(k, new Set());
    map.get(k).add(ref);
    if (fuzzy && k.length >= 4) {
      if (!fuzzyKeys.has(k)) fuzzyKeys.set(k, new Set());
      fuzzyKeys.get(k).add(ref);
    }
  };
  for (const u of data.units) {
    const ref = `${u.category}:${u.id}`;
    units.set(ref, u);
    const name = u.name.toLowerCase();
    const short = name.replace(/\s*\(.*?\)\s*/g, " ").trim();
    for (const n of new Set([name, short])) {
      add(n, ref, true);
      for (const p of plurals(n)) add(p, ref, true);
    }
    // Internal ids only when long enough to be words ("us-cup"); short ids such
    // as "abc" (abcoulomb) would otherwise match ordinary text.
    if (u.id.length >= 4) {
      add(u.id, ref, false);
      add(u.id.replace(/-/g, " "), ref, false);
    }
    add(u.symbol, ref, false, symbols);
    add(u.symbol.replace(/²/g, "2").replace(/³/g, "3"), ref, false, symbols);
    for (const a of u.aliases ?? []) add(a, ref, true);
  }
  const categoryOrder = new Map(data.categories.map((c, i) => [c.id, i]));
  const index = { exact, symbols, fuzzyKeys, units, categoryOrder };
  INDEX_CACHE.set(data, index);
  return index;
}

function rank(index, category) {
  const p = PRIORITY.indexOf(category);
  return p >= 0 ? p : 100 + (index.categoryOrder.get(category) ?? 0);
}

// Units (as "category:id" refs) and a currency code for a phrase.
function resolve(index, words, { fuzzy, currencies, symbolsAllowed }) {
  const phrase = words.join(" ");
  if (!phrase) return null;
  // Bare symbols ("abc" is the abcoulomb symbol) only count when the query
  // has a number or "to"/"in"; on their own they are ordinary search words.
  const symbolRefs = symbolsAllowed ? (index.symbols.get(phrase) ?? []) : [];
  const refs = new Set([...(index.exact.get(phrase) ?? []), ...symbolRefs]);
  for (const r of AMBIGUOUS[phrase] ?? []) refs.add(r);
  let currency = CURRENCY_WORDS[phrase] ?? (currencies.has(phrase.toUpperCase()) && phrase.length === 3 ? phrase.toUpperCase() : null);
  const pound = POUND_WORDS.has(phrase);
  let typo = false;
  if (refs.size === 0 && !currency && fuzzy && phrase.length >= 4) {
    const max = phrase.length >= 7 ? 2 : 1;
    let best = max + 1;
    let bestRefs = null;
    for (const [key, set] of index.fuzzyKeys) {
      const d = levenshtein(phrase, key);
      if (d < best) {
        best = d;
        bestRefs = set;
      }
    }
    if (bestRefs) {
      for (const r of bestRefs) refs.add(r);
      typo = true;
    }
  }
  if (refs.size === 0 && !currency) return null;
  // Only real units: drop curated refs that do not exist in this data.
  const list = [...refs].filter((r) => index.units.has(r));
  if (list.length === 0 && !currency) return null;
  return { refs: list, currency, pound, typo, phrase, ordered: AMBIGUOUS[phrase] ?? null };
}

// The usual meaning first: the curated order, else category priority.
function orderRefs(index, side) {
  if (side.ordered) {
    const first = side.ordered.filter((r) => side.refs.includes(r));
    const rest = side.refs.filter((r) => !first.includes(r));
    return [...first, ...rest.sort((a, b) => rank(index, a.split(":")[0]) - rank(index, b.split(":")[0]))];
  }
  return [...side.refs].sort((a, b) => rank(index, a.split(":")[0]) - rank(index, b.split(":")[0]));
}

// ------------------------------------------------------------ the parser

const NUMBER = /(?<![a-z²³\d.])-?(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?(?![\d,])|(?<![a-z²³\d])-?\.\d+/;
const FEET_INCHES = /(?<![a-z\d.])(\d+(?:\.\d+)?)\s*(?:'|ft\b|feet\b|foot\b)\s*(\d+(?:\.\d+)?)\s*(?:"|''|in\b|inch\b|inches\b)?/;

export function parseQuery(query, data, { currencies = [] } = {}) {
  if (typeof query !== "string" || !data?.units) return { type: "none" };
  const currencySet = new Set(currencies.map((c) => c.toUpperCase()));
  const index = buildIndex(data);

  let text = query
    .toLowerCase()
    .replace(/[’′]/g, "'")
    .replace(/[”″]/g, '"')
    .replace(/\s*(->|→|=)\s*/g, " to ")
    .replace(/([$£€])/g, " $1 ")
    .replace(/[?!,;:](?!\d{3})/g, " ")
    .trim();

  // "how many ml in 2 cups" -> "2 cups to ml"
  const howMany = text.match(/^how many (.+?) (?:are |is )?(?:in|make|makes) (.+)$/);
  if (howMany) text = `${howMany[2]} to ${howMany[1]}`;

  // Number: feet and inches together ("5 ft 4 in", 5'4"), else a plain number.
  let value = null;
  let valueText = null;
  let feetInches = null;
  const fi = text.match(FEET_INCHES);
  if (fi) {
    feetInches = { feet: Number(fi[1]), inches: Number(fi[2]) };
    value = feetInches.feet + feetInches.inches / 12;
    valueText = `${fi[1]} ft ${fi[2]} in`;
    text = text.replace(fi[0], " foot ");
  } else {
    const m = text.match(NUMBER);
    if (m) {
      value = Number(m[0].replace(/,/g, ""));
      valueText = null; // formatted later
      text = text.replace(m[0], " ");
    }
  }
  const hasNumber = value !== null;
  if (!hasNumber) value = 1;

  const tokens = text.split(/\s+/).map((t) => t.replace(/^[.'"]+|[.'"]+$/g, "")).filter(Boolean);
  if (tokens.length === 0) return { type: "none" };
  const meaningful = (words) => {
    const kept = words.filter((w) => !FILLERS.has(w));
    return kept.length > 0 ? kept : words;
  };
  const fuzzy = hasNumber || tokens.some((t) => SEPARATORS.has(t));
  const opts = { fuzzy, currencies: currencySet, symbolsAllowed: fuzzy };

  // 1) Split at a separator ("to", "in", "into"); 2) split anywhere both
  // halves are units ("marla square feet"); 3) the whole text is one unit.
  let from = null;
  let to = null;
  for (let i = 1; i < tokens.length - 1 && !from; i++) {
    if (!SEPARATORS.has(tokens[i])) continue;
    const left = resolve(index, meaningful(tokens.slice(0, i)), opts);
    const right = resolve(index, meaningful(tokens.slice(i + 1)), opts);
    if (left && right) [from, to] = [left, right];
  }
  if (!from) {
    const words = meaningful(tokens.filter((t) => !SEPARATORS.has(t) || tokens.length === 1));
    for (let k = 1; k < words.length && !from; k++) {
      const left = resolve(index, words.slice(0, k), { ...opts, fuzzy: false });
      const right = resolve(index, words.slice(k), { ...opts, fuzzy: false });
      if (left && right) [from, to] = [left, right];
    }
    if (!from) from = resolve(index, words, opts);
  }
  if (!from) return { type: "none" };

  // Currency: both sides are currencies, or one side is a currency and the
  // other is "pound(s)" (then pound means GBP).
  const asCurrency = (side) => side?.currency ?? (side?.pound ? "GBP" : null);
  if (from.currency || (from.pound && to?.currency)) {
    const toCode = to ? asCurrency(to) : null;
    if (!to || toCode) {
      return { type: "currency", value, valueText, hasNumber, from: asCurrency(from), to: toCode, didYouMean: [] };
    }
  }
  if (to?.currency && !from.refs.length) return { type: "none" };

  // Units: with a target, the best category that has both units.
  const fromRefs = orderRefs(index, from);
  let fromRef = null;
  let toRef = null;
  if (to) {
    const toRefs = orderRefs(index, to);
    const pairs = [];
    for (const f of fromRefs) for (const t of toRefs) if (f.split(":")[0] === t.split(":")[0]) pairs.push([f, t]);
    pairs.sort((a, b) => rank(index, a[0].split(":")[0]) - rank(index, b[0].split(":")[0]));
    if (pairs.length === 0) return { type: "none" };
    [fromRef, toRef] = pairs[0];
  } else {
    fromRef = fromRefs[0];
  }
  if (!fromRef) return { type: "none" };

  const fromUnit = index.units.get(fromRef);
  const toUnit = toRef ? index.units.get(toRef) : null;
  const didYouMean = [];
  if (!to) {
    for (const r of fromRefs.slice(1, 3)) {
      const u = index.units.get(r);
      didYouMean.push({ category: u.category, unit: u.id, label: `${u.name}`, symbol: u.symbol });
    }
    if (from.pound) didYouMean.push({ currency: "GBP", label: "British pound (GBP)" });
  }
  return {
    type: "unit",
    value,
    valueText,
    hasNumber,
    feetInches,
    category: fromUnit.category,
    from: fromUnit,
    to: toUnit,
    typo: Boolean(from.typo || to?.typo),
    didYouMean,
  };
}
