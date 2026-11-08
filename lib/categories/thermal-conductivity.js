import { linear } from "./helpers.js";

// THERMAL CONDUCTIVITY (base: watt per meter kelvin).
// BTU and the kcal/h unit use the International Table calorie (1 kcal/h = 1.163 W);
// cal/(s·cm·°C) uses the thermochemical calorie (4.184 J).
const category = {
  id: "thermal-conductivity",
  name: "Thermal conductivity",
  group: "heat",
  baseUnit: "w-mk",
  defaultFrom: "w-mk",
  defaultTo: "btu-hftf",
  intro:
    "Thermal conductivity measures how well a material conducts heat. Builders and engineers use it to compare insulation, metals, glass and other materials for walls, cookware, electronics and pipes.",
  units: [
    linear("w-mk", "Watt per meter kelvin", "W/(m·K)", 1, { aliases: ["watts per meter kelvin", "w/mk", "w/m·k"] }),
    linear("w-cmk", "Watt per centimeter kelvin", "W/(cm·K)", 100, { aliases: ["watts per centimeter kelvin", "w/cmk"] }),
    linear("btu-hftf", "BTU per hour foot °F", "BTU/(h·ft·°F)", 1.730734666, { aliases: ["btu/hr ft f", "btu/(h·ft·°f)"] }),
    linear("btu-in-hft2f", "BTU inch per hour square foot °F", "BTU·in/(h·ft²·°F)", 0.1442278888, { aliases: ["btu in/hr ft2 f", "k-value"] }),
    linear("kcal-hmc", "Kilocalorie (IT) per hour meter °C", "kcal/(h·m·°C)", 1.163, { aliases: ["kcal/h m c", "kcal/(h·m·°c)"] }),
    linear("cal-scmc", "Calorie per second centimeter °C", "cal/(s·cm·°C)", 418.4, { aliases: ["cal/s cm c", "cal/(s·cm·°c)"] }),
  ],
};

export default category;
