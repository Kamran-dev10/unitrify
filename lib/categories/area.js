import { linear } from "./helpers.js";

// AREA (base: square foot). Pakistani land units (marla, kanal, murabba)
// live in land.js, which reuses these units.
export const SQ_FT = linear("sq-ft", "Square foot", "sq ft", 1, {
  aliases: ["square feet", "sqft", "ft2", "sq feet"],
});
export const SQ_YD = linear("sq-yd", "Square yard (gaz)", "sq yd", 9, {
  aliases: ["square yards", "gaz", "sq yards", "yd2"],
});
export const SQ_M = linear("sq-m", "Square meter", "m²", 10.7639, {
  aliases: ["square meters", "square metres", "sqm", "m2"],
});
export const ACRE = linear("acre", "Acre", "acre", 43560, { aliases: ["acres", "ac"] });
export const HECTARE = linear("hectare", "Hectare", "ha", 107639.1, { aliases: ["hectares", "ha"] });

const category = {
  id: "area",
  name: "Area",
  group: "common",
  baseUnit: "sq-ft",
  defaultFrom: "sq-ft",
  defaultTo: "sq-m",
  intro:
    "Area measures the size of a surface. Convert between square feet, square meters, square yards (gaz), acres and hectares. For marla and kanal, use the land unit converters.",
  units: [SQ_FT, SQ_YD, SQ_M, ACRE, HECTARE],
};

export default category;
