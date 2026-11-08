import { linear } from "./helpers.js";

// FUEL EFFICIENCY BY MASS (heating value per mass, base: joule per kilogram).
// cal and kcal are thermochemical (4.184 J); BTU is International Table.
const category = {
  id: "fuel-efficiency-mass",
  name: "Fuel energy per mass",
  group: "heat",
  baseUnit: "j-kg",
  defaultFrom: "mj-kg",
  defaultTo: "btu-lb",
  intro:
    "This measures how much energy a fuel releases per kilogram or pound, also called heating value or specific energy. Engineers use it to compare fuels such as gas, coal, wood and hydrogen.",
  units: [
    linear("j-kg", "Joule per kilogram", "J/kg", 1, { aliases: ["joules per kilogram", "j/kg"] }),
    linear("kj-kg", "Kilojoule per kilogram", "kJ/kg", 1000, { aliases: ["kilojoules per kilogram", "kj/kg"] }),
    linear("mj-kg", "Megajoule per kilogram", "MJ/kg", 1e6, { aliases: ["megajoules per kilogram", "mj/kg"] }),
    linear("cal-g", "Calorie per gram", "cal/g", 4184, { aliases: ["calories per gram", "cal/g"] }),
    linear("kcal-kg", "Kilocalorie per kilogram", "kcal/kg", 4184, { aliases: ["kilocalories per kilogram", "kcal/kg"] }),
    linear("btu-lb", "BTU per pound", "BTU/lb", 2326, { aliases: ["btu per pound", "btu/lb"] }),
  ],
};

export default category;
