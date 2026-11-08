import { linear } from "./helpers.js";

// THERMAL EXPANSION COEFFICIENT (base: per kelvin)
const category = {
  id: "thermal-expansion",
  name: "Thermal expansion",
  group: "heat",
  baseUnit: "per-k",
  defaultFrom: "per-c",
  defaultTo: "per-f",
  intro:
    "The coefficient of thermal expansion tells you how much a material grows for each degree it warms up. Engineers use it for bridges, pipes, rails and parts made of different materials that must fit together.",
  units: [
    linear("per-k", "Per kelvin", "1/K", 1, { aliases: ["per kelvin", "k^-1"] }),
    linear("per-c", "Per degree Celsius", "1/°C", 1, { aliases: ["per degree celsius", "/°c"] }),
    linear("per-f", "Per degree Fahrenheit", "1/°F", 1.8, { aliases: ["per degree fahrenheit", "/°f"] }),
    linear("per-r", "Per degree Rankine", "1/°R", 1.8, { aliases: ["per degree rankine", "/°r"] }),
    linear("ppm-k", "Parts per million per kelvin", "ppm/K", 1e-6, { aliases: ["ppm per kelvin", "ppm/k", "ppm/°c"] }),
  ],
};

export default category;
