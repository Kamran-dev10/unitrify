import { linear } from "./helpers.js";
import { SQ_FT, SQ_YD, SQ_M, ACRE, HECTARE } from "./area.js";

// LAND (base: square foot). URL id stays "zameen" (/zameen/...).

// A marla is not the same size everywhere in Pakistan.
export const MARLA_STANDARDS = {
  revenue: 272.25, // sq ft, official revenue / Punjab standard
  scheme: 250, // sq ft, used by many housing schemes
  urban: 225, // sq ft, common in cities like Lahore
};

// Marla and kanal depend on the chosen marla size; murabba is 25 acres.
export function buildLandUnits(marlaSize = MARLA_STANDARDS.revenue) {
  return [
    SQ_FT,
    SQ_YD,
    SQ_M,
    linear("marla", "Marla", "marla", marlaSize, { country: "pk", aliases: ["marlas"] }),
    linear("kanal", "Kanal", "kanal", 20 * marlaSize, { country: "pk", aliases: ["kanals"] }),
    ACRE,
    HECTARE,
    linear("murabba", "Murabba", "murabba", 25 * ACRE.factor, { country: "pk", aliases: ["murabbas", "muraba"] }),
  ];
}

const category = {
  id: "zameen",
  name: "Land units",
  group: "land",
  baseUnit: "sq-ft",
  defaultFrom: "marla",
  defaultTo: "sq-ft",
  hasMarlaStandard: true,
  intro:
    "Pakistani land is measured in marla, kanal, acre and murabba. 1 kanal is always 20 marla, but a marla can be 272.25, 250 or 225 sq ft, so every land converter here lets you pick the marla size.",
  units: buildLandUnits(),
  // options.marlaSize: 272.25 (default), 250 or 225
  buildUnits: (options = {}) => buildLandUnits(options.marlaSize),
};

export default category;
