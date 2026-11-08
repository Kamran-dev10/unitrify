// The conversion engine without the unit registry. Safe to import in the
// browser: it has no imports, so a page only ships the units it is given.
//
// "data" is a category's unit data: either a registry category (with
// units / buildUnits, used on the server and in tests) or the small
// serialisable object from lib/category-data.js (units, option, variants),
// which server pages pass to client components.

// Turns raw input into a number, or null if it is not a usable number.
export function toNumber(value, allowNegative) {
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

// Units of a category for the given options, e.g. { marlaSize: 250 }.
export function unitsFor(data, options = {}) {
  if (!data) return [];
  if (typeof data.buildUnits === "function") return data.buildUnits(options);
  const key = data.option?.key;
  if (key && data.variants) {
    return data.variants[String(options[key] ?? data.option.defaultValue)] ?? data.units;
  }
  return data.units;
}

// convertWith(lengthData, 1, "inch", "cm") -> 2.54. Same rules as convert().
export function convertWith(data, value, fromId, toId, options = {}) {
  if (!data) return null;
  const n = toNumber(value, Boolean(data.allowNegative));
  if (n === null) return null;
  const units = unitsFor(data, options);
  const from = units.find((u) => u.id === fromId);
  const to = units.find((u) => u.id === toId);
  if (!from || !to) return null;
  return convertUnits(n, from, to);
}

// A friendly message for input that cannot be converted, or "" if fine (or empty).
export function inputMessageFor(value, allowNegative) {
  if (value === null || value === undefined || String(value).trim() === "") return "";
  const n = Number(value);
  if (!Number.isFinite(n)) return "Please enter a number, like 5 or 2.5.";
  if (n < 0 && !allowNegative) return "Please enter a number that is 0 or more.";
  return "";
}

// Plot area from length and width in feet, with land unit data.
export function plotAreaWith(landData, lengthFt, widthFt, options = {}) {
  const length = toNumber(lengthFt, false);
  const width = toNumber(widthFt, false);
  if (length === null || width === null) return null;

  const sqFt = length * width;
  const to = (id) => convertWith(landData, sqFt, "sq-ft", id, options);
  return { sqFt, marla: to("marla"), kanal: to("kanal"), sqYd: to("sq-yd") };
}

// Feet and inches together -> cm, with length unit data.
// An empty field counts as 0, but at least one field must have a number.
export function feetInchesToCmWith(lengthData, feet, inches) {
  const feetEmpty = feet === undefined || feet === null || String(feet).trim() === "";
  const inchesEmpty = inches === undefined || inches === null || String(inches).trim() === "";
  if (feetEmpty && inchesEmpty) return null;

  const cmFromFeet = feetEmpty ? 0 : convertWith(lengthData, feet, "foot", "cm");
  const cmFromInches = inchesEmpty ? 0 : convertWith(lengthData, inches, "inch", "cm");
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
