import { linear } from "./helpers.js";

// AREA (base: square foot). Pakistani land units (marla, kanal, murabba)
// live in land.js, which reuses these units.

// 1 sq ft = 0.09290304 m² exactly (NIST SP 811), so 1 m² = 10.7639104167... sq ft.
// Changed 2026-11-09 with approval: was 10.7639 (sq m) and 107639.1 (hectare).
const SQ_FT_PER_SQ_M = 1 / 0.09290304;

export const SQ_FT = linear("sq-ft", "Square foot", "sq ft", 1, {
  aliases: ["square feet", "sqft", "ft2"],
});
export const SQ_YD = linear("sq-yd", "Square yard (gaz)", "sq yd", 9, {
  aliases: ["square yards", "gaz", "yd2"],
});
export const SQ_M = linear("sq-m", "Square meter", "m²", SQ_FT_PER_SQ_M, {
  aliases: ["square meters", "square metres", "m2"],
});
export const ACRE = linear("acre", "Acre", "acre", 43560, { aliases: ["acres", "ac"] });
export const HECTARE = linear("hectare", "Hectare", "ha", 10000 * SQ_FT_PER_SQ_M, { aliases: ["hectares", "ha"] });

const SQ_MM = linear("sq-mm", "Square millimeter", "mm²", 1e-6 * SQ_FT_PER_SQ_M, {
  aliases: ["square millimeters", "mm2"],
});
const SQ_CM = linear("sq-cm", "Square centimeter", "cm²", 1e-4 * SQ_FT_PER_SQ_M, {
  aliases: ["square centimeters", "cm2"],
});
const SQ_KM = linear("sq-km", "Square kilometer", "km²", 1e6 * SQ_FT_PER_SQ_M, {
  aliases: ["square kilometers", "km2"],
});
const SQ_IN = linear("sq-in", "Square inch", "sq in", 1 / 144, { aliases: ["square inches", "in2"] });
const SQ_MI = linear("sq-mi", "Square mile", "sq mi", 27878400, { aliases: ["square miles", "mi2"] });
const ARE = linear("are", "Are", "a", 100 * SQ_FT_PER_SQ_M, { aliases: ["ares"] });

const category = {
  id: "area",
  name: "Area",
  group: "common",
  baseUnit: "sq-ft",
  defaultFrom: "sq-ft",
  defaultTo: "sq-m",
  intro:
    "Area measures the size of a surface, from a phone screen to a farm or a country. Convert between metric units (square millimeters to square kilometers, ares and hectares) and imperial units (square inches, feet, yards, acres and miles). For marla and kanal, use the land unit converters.",
  units: [SQ_MM, SQ_CM, SQ_M, ARE, HECTARE, SQ_KM, SQ_IN, SQ_FT, SQ_YD, ACRE, SQ_MI],
};

export default category;
