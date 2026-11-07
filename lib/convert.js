import {
  MARLA_STANDARDS,
  getAreaUnits,
  LENGTH_UNITS,
  WEIGHT_UNITS,
  VOLUME_UNITS,
  TEMPERATURE_UNITS,
} from "./units.js";

// Returns the list of units for a category. Area depends on the marla size.
export function getUnits(category, options = {}) {
  switch (category) {
    case "area":
      return getAreaUnits(options.marlaSize ?? MARLA_STANDARDS.revenue);
    case "length":
      return LENGTH_UNITS;
    case "weight":
      return WEIGHT_UNITS;
    case "volume":
      return VOLUME_UNITS;
    case "temperature":
      return TEMPERATURE_UNITS;
    default:
      return [];
  }
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

// Temperature: convert to Celsius first, then to the target.
function toCelsius(n, fromId) {
  if (fromId === "celsius") return n;
  if (fromId === "fahrenheit") return (n - 32) / 1.8;
  if (fromId === "kelvin") return n - 273.15;
  return null;
}

function fromCelsius(c, toId) {
  if (toId === "celsius") return c;
  if (toId === "fahrenheit") return c * 1.8 + 32;
  if (toId === "kelvin") return c + 273.15;
  return null;
}

// convert(1, "kanal", "marla", "area") -> 20
// Returns null for empty input, text, negative values (except temperature),
// or unknown units.
export function convert(value, fromId, toId, category, options = {}) {
  const isTemperature = category === "temperature";
  const n = toNumber(value, isTemperature);
  if (n === null) return null;

  if (isTemperature) {
    const c = toCelsius(n, fromId);
    if (c === null) return null;
    return fromCelsius(c, toId);
  }

  const units = getUnits(category, options);
  const from = units.find((u) => u.id === fromId);
  const to = units.find((u) => u.id === toId);
  if (!from || !to) return null;

  return (n * from.factor) / to.factor;
}

// Plot area from length and width in feet.
// plotArea(25, 50) -> { sqFt: 1250, marla: 4.59..., kanal: 0.22..., sqYd: 138.88... }
// Returns null if either side is empty, not a number, or negative.
export function plotArea(lengthFt, widthFt, options = {}) {
  const length = toNumber(lengthFt, false);
  const width = toNumber(widthFt, false);
  if (length === null || width === null) return null;

  const sqFt = length * width;
  const to = (id) => convert(sqFt, "sq-ft", id, "area", options);
  return { sqFt, marla: to("marla"), kanal: to("kanal"), sqYd: to("sq-yd") };
}

// Everything a plot size page shows, e.g. plotSizeSummary(5, "marla"):
//   sqFt: { revenue, scheme, urban }  -> sq ft for each marla standard
//   sqYd, sqM, kanal, acre            -> revenue standard (272.25 sq ft marla)
export function plotSizeSummary(value, unitId) {
  const sqFt = {};
  for (const [name, marlaSize] of Object.entries(MARLA_STANDARDS)) {
    sqFt[name] = convert(value, unitId, "sq-ft", "area", { marlaSize });
  }
  const revenue = { marlaSize: MARLA_STANDARDS.revenue };
  return {
    sqFt,
    sqYd: convert(value, unitId, "sq-yd", "area", revenue),
    sqM: convert(value, unitId, "sq-m", "area", revenue),
    kanal: convert(value, unitId, "kanal", "area", revenue),
    marla: convert(value, unitId, "marla", "area", revenue),
    acre: convert(value, unitId, "acre", "area", revenue),
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
