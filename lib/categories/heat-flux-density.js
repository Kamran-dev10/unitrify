import { linear } from "./helpers.js";

// HEAT FLUX DENSITY (power per area, base: watt per square meter).
// kcal/(h·m²) uses the International Table calorie (1.163 W/m²); cal/(s·cm²) is thermochemical.
const category = {
  id: "heat-flux-density",
  name: "Heat flux density",
  group: "heat",
  baseUnit: "w-m2",
  defaultFrom: "w-m2",
  defaultTo: "btu-hft2",
  intro:
    "Heat flux density is the rate of heat flow through an area. It is used for solar panels, heaters, furnaces, electronics cooling and building heat loss.",
  units: [
    linear("w-m2", "Watt per square meter", "W/m²", 1, { aliases: ["watts per square meter", "w/m2"] }),
    linear("kw-m2", "Kilowatt per square meter", "kW/m²", 1000, { aliases: ["kilowatts per square meter", "kw/m2"] }),
    linear("w-cm2", "Watt per square centimeter", "W/cm²", 10000, { aliases: ["watts per square centimeter", "w/cm2"] }),
    linear("btu-hft2", "BTU per hour square foot", "BTU/(h·ft²)", 3.154590745, { aliases: ["btu/hr ft2", "btu per hour per square foot"] }),
    linear("kcal-hm2", "Kilocalorie (IT) per hour square meter", "kcal/(h·m²)", 1.163, { aliases: ["kcal/h m2", "kcal/(h·m²)"] }),
    linear("cal-scm2", "Calorie per second square centimeter", "cal/(s·cm²)", 41840, { aliases: ["cal/s cm2", "cal/(s·cm²)"] }),
  ],
};

export default category;
