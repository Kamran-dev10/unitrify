import { affine } from "./helpers.js";

// TEMPERATURE (base: Celsius). Affine units: °C = value × factor + offset.
// Same formulas as before: °F = °C × 1.8 + 32 and K = °C + 273.15.
const category = {
  id: "temperature",
  name: "Temperature",
  group: "heat",
  baseUnit: "celsius",
  defaultFrom: "celsius",
  defaultTo: "fahrenheit",
  allowNegative: true,
  intro:
    "Temperature scales do not start at the same zero, so they use a formula instead of a single factor. Convert between Celsius, Fahrenheit and Kelvin.",
  units: [
    affine("celsius", "Celsius", "°C", 1, 0, { aliases: ["centigrade", "c", "degrees celsius"] }),
    affine("fahrenheit", "Fahrenheit", "°F", 1 / 1.8, -32 / 1.8, { aliases: ["f", "degrees fahrenheit"] }),
    affine("kelvin", "Kelvin", "K", 1, -273.15, { aliases: ["kelvins"] }),
  ],
};

export default category;
