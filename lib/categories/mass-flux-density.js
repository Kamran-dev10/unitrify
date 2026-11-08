import { linear } from "./helpers.js";

// MASS FLUX DENSITY (base: kilogram per square meter per second).
const category = {
  id: "mass-flux-density",
  name: "Mass flux density",
  group: "fluids",
  baseUnit: "kg-m2s",
  defaultFrom: "lb-ft2h",
  defaultTo: "kg-m2s",
  intro:
    "Mass flux density is the mass flowing through each square meter of area every second. It is used in drying, evaporation, membrane and heat-exchanger design.",
  units: [
    linear("kg-m2s", "Kilogram per square meter second", "kg/(m²·s)", 1, { aliases: ["kg/m2/s", "kilograms per square meter per second"] }),
    linear("g-cm2s", "Gram per square centimeter second", "g/(cm²·s)", 10, { aliases: ["g/cm2/s", "grams per square centimeter per second"] }),
    linear("kg-m2h", "Kilogram per square meter hour", "kg/(m²·h)", 1 / 3600, { aliases: ["kg/m2/h", "kilograms per square meter per hour"] }),
    linear("lb-ft2s", "Pound per square foot second", "lb/(ft²·s)", 0.45359237 / 0.09290304, { aliases: ["lb/ft2/s", "pounds per square foot per second"] }),
    linear("lb-ft2h", "Pound per square foot hour", "lb/(ft²·h)", 0.45359237 / 0.09290304 / 3600, { aliases: ["lb/ft2/h", "pounds per square foot per hour"] }),
  ],
};

export default category;
