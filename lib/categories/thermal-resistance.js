import { linear } from "./helpers.js";

// THERMAL RESISTANCE (base: kelvin per watt). BTU is International Table.
const category = {
  id: "thermal-resistance",
  name: "Thermal resistance",
  group: "heat",
  baseUnit: "k-w",
  defaultFrom: "c-w",
  defaultTo: "f-h-btu",
  intro:
    "Thermal resistance tells you how strongly a part resists heat flow. Electronics engineers use it to choose heat sinks for chips and LEDs, and building engineers use it for walls and insulation.",
  units: [
    linear("k-w", "Kelvin per watt", "K/W", 1, { aliases: ["kelvin per watt", "k/w"] }),
    linear("c-w", "Degree Celsius per watt", "°C/W", 1, { aliases: ["celsius per watt", "°c/w"] }),
    linear("f-h-btu", "Degree Fahrenheit hour per BTU", "°F·h/BTU", 1.895634, { aliases: ["°f h/btu", "f h/btu"] }),
  ],
};

export default category;
