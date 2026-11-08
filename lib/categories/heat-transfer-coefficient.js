import { linear } from "./helpers.js";

// HEAT TRANSFER COEFFICIENT (base: watt per square meter kelvin).
// kcal/(h·m²·°C) uses the International Table calorie; cal/(s·cm²·°C) is thermochemical.
const category = {
  id: "heat-transfer-coefficient",
  name: "Heat transfer coefficient",
  group: "heat",
  baseUnit: "w-m2k",
  defaultFrom: "w-m2k",
  defaultTo: "btu-hft2f",
  intro:
    "The heat transfer coefficient (U-value) shows how much heat passes through a surface for each degree of temperature difference. It is used for windows, walls, heat exchangers and HVAC design.",
  units: [
    linear("w-m2k", "Watt per square meter kelvin", "W/(m²·K)", 1, { aliases: ["watts per square meter kelvin", "w/m2k", "u-value"] }),
    linear("w-cm2k", "Watt per square centimeter kelvin", "W/(cm²·K)", 10000, { aliases: ["watts per square centimeter kelvin", "w/cm2k"] }),
    linear("btu-hft2f", "BTU per hour square foot °F", "BTU/(h·ft²·°F)", 5.678263341, { aliases: ["btu/hr ft2 f", "u-factor"] }),
    linear("kcal-hm2c", "Kilocalorie (IT) per hour square meter °C", "kcal/(h·m²·°C)", 1.163, { aliases: ["kcal/h m2 c", "kcal/(h·m²·°c)"] }),
    linear("cal-scm2c", "Calorie per second square centimeter °C", "cal/(s·cm²·°C)", 41840, { aliases: ["cal/s cm2 c", "cal/(s·cm²·°c)"] }),
  ],
};

export default category;
