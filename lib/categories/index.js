// Registry of all unit categories. Add a new category by creating a file
// in this folder and adding it to UNIT_CATEGORIES below.
//
// Each category: { id, name, group, baseUnit, intro, units, ... }
//   defaultFrom / defaultTo  units preselected in the converters
//   allowNegative            true if negative values are valid (temperature)
//   hasMarlaStandard         true if units depend on the marla size (land)
//   buildUnits(options)      optional: units for given options (marlaSize)

import land from "./land.js";
import length from "./length.js";
import weight from "./weight.js";
import temperature from "./temperature.js";
import area from "./area.js";
import volume from "./volume.js";

export const GROUPS = [
  "common",
  "engineering",
  "heat",
  "electricity",
  "magnetism",
  "fluids",
  "light",
  "radiology",
  "other",
  "land",
];

// Order here is the order used across the site (footer, homepage).
export const UNIT_CATEGORIES = [land, length, weight, temperature, area, volume];

export function getUnitCategory(id) {
  return UNIT_CATEGORIES.find((c) => c.id === id) ?? null;
}

// Units of a category. options.marlaSize is used by the land category.
export function getCategoryUnits(id, options = {}) {
  const c = getUnitCategory(id);
  if (!c) return [];
  return c.buildUnits ? c.buildUnits(options) : c.units;
}
