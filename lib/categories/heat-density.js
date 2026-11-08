import { linear } from "./helpers.js";

// HEAT DENSITY (energy per area, base: joule per square meter).
// kcal, cal and langley are thermochemical (4.184 J); BTU is International Table.
const category = {
  id: "heat-density",
  name: "Heat density",
  group: "heat",
  baseUnit: "j-m2",
  defaultFrom: "wh-m2",
  defaultTo: "btu-ft2",
  intro:
    "Heat density is energy per area. It is used for solar energy on a surface, fire and heat exposure, and in weather and climate data, where the langley is an older unit.",
  units: [
    linear("j-m2", "Joule per square meter", "J/m²", 1, { aliases: ["joules per square meter", "j/m2"] }),
    linear("kj-m2", "Kilojoule per square meter", "kJ/m²", 1000, { aliases: ["kilojoules per square meter", "kj/m2"] }),
    linear("wh-m2", "Watt-hour per square meter", "Wh/m²", 3600, { aliases: ["watt hours per square meter", "wh/m2"] }),
    linear("kcal-m2", "Kilocalorie per square meter", "kcal/m²", 4184, { aliases: ["kilocalories per square meter", "kcal/m2"] }),
    linear("cal-cm2", "Calorie per square centimeter", "cal/cm²", 41840, { aliases: ["calories per square centimeter", "cal/cm2"] }),
    linear("langley", "Langley", "Ly", 41840, { aliases: ["langleys"] }),
    linear("btu-ft2", "BTU per square foot", "BTU/ft²", 11356.53, { aliases: ["btu per square foot", "btu/ft2"] }),
  ],
};

export default category;
