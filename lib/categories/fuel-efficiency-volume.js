import { linear } from "./helpers.js";

// FUEL EFFICIENCY BY VOLUME (heating value per volume, base: joule per cubic meter).
// kcal is thermochemical (4.184 kJ); BTU is International Table.
const category = {
  id: "fuel-efficiency-volume",
  name: "Fuel energy per volume",
  group: "heat",
  baseUnit: "j-m3",
  defaultFrom: "mj-m3",
  defaultTo: "btu-ft3",
  intro:
    "This measures how much energy a fuel releases per liter, cubic meter or cubic foot. Gas suppliers, heating engineers and energy analysts use it to compare natural gas, LPG, diesel and other fuels.",
  units: [
    linear("j-m3", "Joule per cubic meter", "J/m³", 1, { aliases: ["joules per cubic meter", "j/m3"] }),
    linear("j-l", "Joule per liter", "J/L", 1000, { aliases: ["joules per liter", "j/l"] }),
    linear("kj-l", "Kilojoule per liter", "kJ/L", 1e6, { aliases: ["kilojoules per liter", "kj/l"] }),
    linear("mj-m3", "Megajoule per cubic meter", "MJ/m³", 1e6, { aliases: ["megajoules per cubic meter", "mj/m3"] }),
    linear("kcal-m3", "Kilocalorie per cubic meter", "kcal/m³", 4184, { aliases: ["kilocalories per cubic meter", "kcal/m3"] }),
    linear("btu-ft3", "BTU per cubic foot", "BTU/ft³", 37258.94579, { aliases: ["btu per cubic foot", "btu/ft3", "btu/cf"] }),
    linear("btu-gal", "BTU per gallon (US)", "BTU/gal", 278716.3, { aliases: ["btu per gallon", "btu/gal"] }),
  ],
};

export default category;
