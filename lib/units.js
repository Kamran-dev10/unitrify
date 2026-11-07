// All units and conversion factors for the site live in this file only.
//
// Each category has a base unit. For every unit, `factor` is how many base
// units are in 1 of that unit. Example: in LENGTH (base: meter), foot has
// factor 0.3048 because 1 foot = 0.3048 meters.
//
// To convert: value * from.factor / to.factor
//
// country: "pk" = Pakistani unit, "global" = used everywhere.

// ---------------------------------------------------------------------------
// AREA (base: square foot)
// ---------------------------------------------------------------------------

// A marla is not the same size everywhere in Pakistan.
export const MARLA_STANDARDS = {
  revenue: 272.25, // sq ft, official revenue / Punjab standard
  scheme: 250, // sq ft, used by many housing schemes
  urban: 225, // sq ft, common in cities like Lahore
};

const ACRE_SQ_FT = 43560;

export function getAreaUnits(marlaSize = MARLA_STANDARDS.revenue) {
  return [
    { id: "sq-ft", name: "Square foot", symbol: "sq ft", factor: 1, country: "global" },
    { id: "sq-yd", name: "Square yard (gaz)", symbol: "sq yd", factor: 9, country: "global" },
    { id: "sq-m", name: "Square meter", symbol: "m²", factor: 10.7639, country: "global" },
    { id: "marla", name: "Marla", symbol: "marla", factor: marlaSize, country: "pk" },
    { id: "kanal", name: "Kanal", symbol: "kanal", factor: 20 * marlaSize, country: "pk" },
    { id: "acre", name: "Acre", symbol: "acre", factor: ACRE_SQ_FT, country: "global" },
    { id: "hectare", name: "Hectare", symbol: "ha", factor: 107639.1, country: "global" },
    { id: "murabba", name: "Murabba", symbol: "murabba", factor: 25 * ACRE_SQ_FT, country: "pk" },
  ];
}

// ---------------------------------------------------------------------------
// LENGTH (base: meter)
// ---------------------------------------------------------------------------

export const LENGTH_UNITS = [
  { id: "mm", name: "Millimeter", symbol: "mm", factor: 0.001, country: "global" },
  { id: "cm", name: "Centimeter", symbol: "cm", factor: 0.01, country: "global" },
  { id: "m", name: "Meter", symbol: "m", factor: 1, country: "global" },
  { id: "km", name: "Kilometer", symbol: "km", factor: 1000, country: "global" },
  { id: "inch", name: "Inch", symbol: "in", factor: 0.0254, country: "global" },
  { id: "foot", name: "Foot", symbol: "ft", factor: 0.3048, country: "global" },
  { id: "yard", name: "Yard", symbol: "yd", factor: 0.9144, country: "global" },
  { id: "mile", name: "Mile", symbol: "mi", factor: 1609.344, country: "global" },
];

// ---------------------------------------------------------------------------
// WEIGHT (base: gram)
// ---------------------------------------------------------------------------

export const WEIGHT_UNITS = [
  { id: "mg", name: "Milligram", symbol: "mg", factor: 0.001, country: "global" },
  { id: "g", name: "Gram", symbol: "g", factor: 1, country: "global" },
  { id: "kg", name: "Kilogram", symbol: "kg", factor: 1000, country: "global" },
  { id: "tonne", name: "Tonne", symbol: "t", factor: 1000000, country: "global" },
  { id: "ounce", name: "Ounce", symbol: "oz", factor: 28.349523125, country: "global" },
  { id: "pound", name: "Pound", symbol: "lb", factor: 453.59237, country: "global" },
  { id: "tola", name: "Tola", symbol: "tola", factor: 11.6638038, country: "pk" },
  { id: "maund", name: "Maund", symbol: "maund", factor: 40000, country: "pk" }, // Pakistani 40 kg maund
];

// ---------------------------------------------------------------------------
// VOLUME (base: litre)
// ---------------------------------------------------------------------------

export const VOLUME_UNITS = [
  { id: "ml", name: "Millilitre", symbol: "ml", factor: 0.001, country: "global" },
  { id: "litre", name: "Litre", symbol: "L", factor: 1, country: "global" },
  { id: "us-gallon", name: "US gallon", symbol: "US gal", factor: 3.785411784, country: "global" },
  { id: "uk-gallon", name: "UK gallon", symbol: "UK gal", factor: 4.54609, country: "global" },
  { id: "us-cup", name: "US cup", symbol: "cup", factor: 0.2365882365, country: "global" },
];

// ---------------------------------------------------------------------------
// TEMPERATURE (no factors: the engine converts these with formulas)
// ---------------------------------------------------------------------------

export const TEMPERATURE_UNITS = [
  { id: "celsius", name: "Celsius", symbol: "°C", factor: null, special: true, country: "global" },
  { id: "fahrenheit", name: "Fahrenheit", symbol: "°F", factor: null, special: true, country: "global" },
  { id: "kelvin", name: "Kelvin", symbol: "K", factor: null, special: true, country: "global" },
];

// ---------------------------------------------------------------------------
// All categories in one place
// ---------------------------------------------------------------------------

export const CATEGORIES = {
  area: { id: "area", name: "Area", base: "sq-ft", units: getAreaUnits() },
  length: { id: "length", name: "Length", base: "m", units: LENGTH_UNITS },
  weight: { id: "weight", name: "Weight", base: "g", units: WEIGHT_UNITS },
  volume: { id: "volume", name: "Volume", base: "litre", units: VOLUME_UNITS },
  temperature: { id: "temperature", name: "Temperature", base: null, units: TEMPERATURE_UNITS },
};
