import { linear } from "./helpers.js";

// MASS CONCENTRATION (base: gram per liter = kilogram per cubic meter). ppm here means mg/L in dilute water only.
const category = {
  id: "concentration-solution",
  name: "Solution concentration",
  group: "fluids",
  baseUnit: "g-l", // 1 g/L = 1 kg/m³
  defaultFrom: "mg-l",
  defaultTo: "ppm",
  intro:
    "Solution concentration is the mass of a substance dissolved in each liter of liquid. Water labs use mg/L, medical tests use mg/dL, and 1 mg/L is taken as 1 ppm only for dilute water solutions.",
  units: [
    linear("g-l", "Gram per liter", "g/L", 1, { aliases: ["grams per liter", "g/l", "kg/m3"] }),
    linear("mg-l", "Milligram per liter", "mg/L", 0.001, { aliases: ["milligrams per liter", "mg/l"] }),
    linear("ug-l", "Microgram per liter", "µg/L", 1e-6, { aliases: ["micrograms per liter", "ug/l", "µg/l"] }),
    linear("g-ml", "Gram per milliliter", "g/mL", 1000, { aliases: ["grams per milliliter", "g/ml"] }),
    linear("mg-ml", "Milligram per milliliter", "mg/mL", 1, { aliases: ["milligrams per milliliter", "mg/ml"] }),
    linear("g-dl", "Gram per deciliter", "g/dL", 10, { aliases: ["grams per deciliter", "g/dl"] }),
    linear("mg-dl", "Milligram per deciliter", "mg/dL", 0.01, { aliases: ["milligrams per deciliter", "mg/dl"] }),
    linear("ppm", "Parts per million (dilute water)", "ppm", 0.001, { aliases: ["parts per million", "ppm in water"] }),
    linear("lb-gal", "Pound per US gallon", "lb/gal", 0.45359237 / 0.003785411784, { aliases: ["pounds per gallon", "lb/gal", "ppg"] }),
    linear("gr-gal", "Grain per US gallon", "gr/gal", 0.00006479891 / 0.003785411784, { aliases: ["grains per gallon", "gpg"] }),
  ],
};

export default category;
