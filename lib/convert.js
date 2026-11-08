import { getUnitCategory, getCategoryUnits } from "./categories/index.js";
import { MARLA_STANDARDS } from "./marla.js";
import { toNumber, convertUnits, inputMessageFor, plotAreaWith, feetInchesToCmWith } from "./engine.js";

// The pure engine (also used directly by client components).
export { toBase, fromBase, convertUnits, formatResult, formatSmart } from "./engine.js";

// Units of a category, e.g. getUnits("zameen", { marlaSize: 225 }).
export function getUnits(category, options = {}) {
  return getCategoryUnits(category, options);
}

// Before the land category existed, marla, kanal and murabba were part of
// "area". Both use square feet as the base, so old calls such as
// convert(1, "kanal", "marla", "area") still work by looking in "zameen".
const LEGACY_FALLBACK = { area: "zameen" };

function findUnit(category, unitId, options) {
  const found = getUnits(category, options).find((u) => u.id === unitId);
  if (found || !LEGACY_FALLBACK[category]) return found ?? null;
  return getUnits(LEGACY_FALLBACK[category], options).find((u) => u.id === unitId) ?? null;
}

// convert(1, "kanal", "marla", "zameen") -> 20
// Returns null for empty input, text, negative values (unless the category
// allows them, like temperature), 0 for inverse units, or unknown units.
export function convert(value, fromId, toId, category, options = {}) {
  const cat = getUnitCategory(category);
  if (!cat) return null;
  const n = toNumber(value, Boolean(cat.allowNegative));
  if (n === null) return null;

  const from = findUnit(category, fromId, options);
  const to = findUnit(category, toId, options);
  if (!from || !to) return null;

  return convertUnits(n, from, to);
}

// A friendly message for input that cannot be converted, or "" if the
// input is fine (or empty).
export function inputMessage(value, category) {
  return inputMessageFor(value, Boolean(getUnitCategory(category)?.allowNegative));
}

// True if the category's units depend on the marla size (land units).
export function hasMarlaStandard(category) {
  return Boolean(getUnitCategory(category)?.hasMarlaStandard);
}

// Plot area from length and width in feet.
// plotArea(25, 50) -> { sqFt: 1250, marla: 4.59..., kanal: 0.22..., sqYd: 138.88... }
// Returns null if either side is empty, not a number, or negative.
export function plotArea(lengthFt, widthFt, options = {}) {
  return plotAreaWith(getUnitCategory("zameen"), lengthFt, widthFt, options);
}

// Everything a plot size page shows, e.g. plotSizeSummary(5, "marla"):
//   sqFt: { revenue, scheme, urban }  -> sq ft for each marla standard
//   sqYd, sqM, kanal, acre            -> revenue standard (272.25 sq ft marla)
export function plotSizeSummary(value, unitId) {
  const sqFt = {};
  for (const [name, marlaSize] of Object.entries(MARLA_STANDARDS)) {
    sqFt[name] = convert(value, unitId, "sq-ft", "zameen", { marlaSize });
  }
  const revenue = { marlaSize: MARLA_STANDARDS.revenue };
  return {
    sqFt,
    sqYd: convert(value, unitId, "sq-yd", "zameen", revenue),
    sqM: convert(value, unitId, "sq-m", "zameen", revenue),
    kanal: convert(value, unitId, "kanal", "zameen", revenue),
    marla: convert(value, unitId, "marla", "zameen", revenue),
    acre: convert(value, unitId, "acre", "zameen", revenue),
  };
}

// Height style input: feet and inches together. feetInchesToCm(5, 4) -> 162.56
// An empty field counts as 0, but at least one field must have a number.
export function feetInchesToCm(feet, inches) {
  return feetInchesToCmWith(getUnitCategory("length"), feet, inches);
}
