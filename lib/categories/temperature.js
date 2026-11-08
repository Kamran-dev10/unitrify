import { affine } from "./helpers.js";

// TEMPERATURE (base: Celsius). Affine units: °C = value × factor + offset.
// °F = °C × 1.8 + 32, K = °C + 273.15, °C = °R × 5/9 − 273.15, °C = °Ré × 1.25.
const category = {
  id: "temperature",
  name: "Temperature",
  group: "heat",
  baseUnit: "celsius",
  defaultFrom: "celsius",
  defaultTo: "fahrenheit",
  allowNegative: true,
  intro:
    "Temperature tells you how hot or cold something is, for weather, cooking, medicine and science. The scales start at different zeros, so they use a formula instead of a single factor. Convert between Celsius, Fahrenheit, Kelvin, Rankine and Réaumur.",
  units: [
    affine("celsius", "Celsius", "°C", 1, 0, { aliases: ["centigrade", "c", "degrees celsius"] }),
    affine("fahrenheit", "Fahrenheit", "°F", 1 / 1.8, -32 / 1.8, { aliases: ["f", "degrees fahrenheit"] }),
    affine("kelvin", "Kelvin", "K", 1, -273.15, { aliases: ["kelvins"] }),
    affine("rankine", "Rankine", "°R", 5 / 9, -273.15, { aliases: ["degrees rankine", "ra"] }),
    affine("reaumur", "Réaumur", "°Ré", 1.25, 0, { aliases: ["reaumur", "degrees reaumur"] }),
  ],
};

export default category;
