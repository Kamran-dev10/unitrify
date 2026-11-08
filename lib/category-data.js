// Server only: the unit data of ONE category, small and serialisable, for
// client components (Converter, AllUnitsConverter, ...). Pages pass it as a
// prop, so a page's JavaScript and HTML only hold its own category's units.
import { getUnitCategory, getCategoryUnits } from "./categories/index.js";
import { MARLA_OPTION } from "./marla.js";

// Only what the converters need (no aliases or country tags).
const slim = (u) => ({ id: u.id, name: u.name, symbol: u.symbol, kind: u.kind, factor: u.factor, offset: u.offset });

// categoryData("length") -> { id, baseUnit, defaultFrom, defaultTo, allowNegative, option, units, variants }
// option/variants: units for each choice of the category's setting
// (marla size for land, base font size for typography), keyed by the choice.
export function categoryData(id) {
  const c = getUnitCategory(id);
  if (!c) return null;
  const option = c.option ?? (c.hasMarlaStandard ? MARLA_OPTION : null);
  const variants = option
    ? Object.fromEntries(option.choices.map((v) => [String(v), getCategoryUnits(id, { [option.key]: v }).map(slim)]))
    : null;
  return {
    id: c.id,
    baseUnit: c.baseUnit,
    defaultFrom: c.defaultFrom ?? c.baseUnit,
    defaultTo: c.defaultTo ?? c.baseUnit,
    allowNegative: Boolean(c.allowNegative),
    option,
    units: getCategoryUnits(id, option ? { [option.key]: option.defaultValue } : {}).map(slim),
    variants,
  };
}
