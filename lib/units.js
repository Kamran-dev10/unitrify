// Thin wrapper kept for older imports. All units and conversion factors now
// live in lib/categories/ (one file per category, registry in index.js).

import { getCategoryUnits, getUnitCategory } from "./categories/index.js";
export { MARLA_STANDARDS } from "./categories/land.js";

// Land + area units (sq ft, sq yd, m², marla, kanal, acre, hectare, murabba).
export function getAreaUnits(marlaSize) {
  return getCategoryUnits("zameen", { marlaSize });
}

export const LENGTH_UNITS = getUnitCategory("length").units;
export const WEIGHT_UNITS = getUnitCategory("weight").units;
export const VOLUME_UNITS = getUnitCategory("volume").units;
export const TEMPERATURE_UNITS = getUnitCategory("temperature").units;
