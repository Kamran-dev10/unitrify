import { linear } from "./helpers.js";

// SPECIFIC HEAT CAPACITY (base: joule per kilogram kelvin).
// cal and kcal are thermochemical (4.184 J); BTU/(lb·°F) is International Table (4186.8).
const category = {
  id: "specific-heat-capacity",
  name: "Specific heat capacity",
  group: "heat",
  baseUnit: "j-kgk",
  defaultFrom: "kj-kgk",
  defaultTo: "btu-lbf",
  intro:
    "Specific heat capacity is the energy needed to warm 1 kg of a material by 1 degree. Engineers, chemists and students use it for heating, cooling, cooking and energy storage calculations.",
  units: [
    linear("j-kgk", "Joule per kilogram kelvin", "J/(kg·K)", 1, { aliases: ["joules per kilogram kelvin", "j/kg k"] }),
    linear("kj-kgk", "Kilojoule per kilogram kelvin", "kJ/(kg·K)", 1000, { aliases: ["kilojoules per kilogram kelvin", "kj/kg k"] }),
    linear("j-gc", "Joule per gram °C", "J/(g·°C)", 1000, { aliases: ["joules per gram degree", "j/g c"] }),
    linear("cal-gc", "Calorie per gram °C", "cal/(g·°C)", 4184, { aliases: ["calories per gram degree", "cal/g c"] }),
    linear("kcal-kgc", "Kilocalorie per kilogram °C", "kcal/(kg·°C)", 4184, { aliases: ["kilocalories per kilogram degree", "kcal/kg c"] }),
    linear("btu-lbf", "BTU per pound °F", "BTU/(lb·°F)", 4186.8, { aliases: ["btu per pound degree", "btu/lb f"] }),
  ],
};

export default category;
