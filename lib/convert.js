import { getUnitCategory, getCategoryUnits } from "./categories/index.js";
import { MARLA_STANDARDS } from "./categories/land.js";

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

// Turns raw input into a number, or null if it is not a usable number.
function toNumber(value, allowNegative) {
  if (value === null || value === undefined) return null;
  if (typeof value === "string" && value.trim() === "") return null;
  const n = Number(value);
  if (!Number.isFinite(n)) return null;
  if (n < 0 && !allowNegative) return null;
  return n;
}

// One unit -> the category's base unit. Returns null when not possible
// (inverse units have no value for 0).
export function toBase(value, unit) {
  switch (unit.kind) {
    case "linear":
      return value * unit.factor;
    case "affine":
      return value * unit.factor + unit.offset;
    case "inverse":
      return value === 0 ? null : unit.factor / value;
    default:
      return null;
  }
}

// Base unit -> one unit.
export function fromBase(base, unit) {
  switch (unit.kind) {
    case "linear":
      return base / unit.factor;
    case "affine":
      return (base - unit.offset) / unit.factor;
    case "inverse":
      return base === 0 ? null : unit.factor / base;
    default:
      return null;
  }
}

// Convert a number between two unit objects through the base unit.
export function convertUnits(n, fromUnit, toUnit) {
  const base = toBase(n, fromUnit);
  if (base === null || !Number.isFinite(base)) return null;
  const result = fromBase(base, toUnit);
  return result === null || !Number.isFinite(result) ? null : result;
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
  if (value === null || value === undefined || String(value).trim() === "") return "";
  const n = Number(value);
  if (!Number.isFinite(n)) return "Please enter a number, like 5 or 2.5.";
  if (n < 0 && !getUnitCategory(category)?.allowNegative) return "Please enter a number that is 0 or more.";
  return "";
}

// True if the category's units depend on the marla size (land units).
export function hasMarlaStandard(category) {
  return Boolean(getUnitCategory(category)?.hasMarlaStandard);
}

// Plot area from length and width in feet.
// plotArea(25, 50) -> { sqFt: 1250, marla: 4.59..., kanal: 0.22..., sqYd: 138.88... }
// Returns null if either side is empty, not a number, or negative.
export function plotArea(lengthFt, widthFt, options = {}) {
  const length = toNumber(lengthFt, false);
  const width = toNumber(widthFt, false);
  if (length === null || width === null) return null;

  const sqFt = length * width;
  const to = (id) => convert(sqFt, "sq-ft", id, "zameen", options);
  return { sqFt, marla: to("marla"), kanal: to("kanal"), sqYd: to("sq-yd") };
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
  const feetEmpty = feet === undefined || feet === null || String(feet).trim() === "";
  const inchesEmpty = inches === undefined || inches === null || String(inches).trim() === "";
  if (feetEmpty && inchesEmpty) return null;

  const cmFromFeet = feetEmpty ? 0 : convert(feet, "foot", "cm", "length");
  const cmFromInches = inchesEmpty ? 0 : convert(inches, "inch", "cm", "length");
  if (cmFromFeet === null || cmFromInches === null) return null;
  return cmFromFeet + cmFromInches;
}

const formatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 4,
});

// formatResult(1361.25) -> "1,361.25"
// At most 4 decimals, no trailing zeros, thousands separators.
export function formatResult(number) {
  if (number === null || number === undefined || !Number.isFinite(number)) {
    return "";
  }
  const text = formatter.format(number);
  // Avoid showing "-0" for tiny negative results that round to zero.
  return text === "-0" ? "0" : text;
}

// Like formatResult, but very small (< 0.0001) or very large (>= 1e12)
// numbers use scientific notation with 6 significant digits:
// formatSmart(0.00000000123456789) -> "1.23457e-9", formatSmart(2e15) -> "2e15"
export function formatSmart(number) {
  if (number === null || number === undefined || !Number.isFinite(number)) return "";
  const abs = Math.abs(number);
  if (abs !== 0 && (abs < 0.0001 || abs >= 1e12)) {
    // toExponential(5) = 6 significant digits, always in "1.23457e-9" form.
    const [mantissa, exponent] = number.toExponential(5).split("e");
    const m = mantissa.replace(/\.?0+$/, "");
    return `${m}e${exponent.replace("+", "")}`;
  }
  return formatResult(number);
}
