import { linear } from "./helpers.js";

// WEIGHT (base: gram)
const category = {
  id: "weight",
  name: "Weight",
  group: "common",
  baseUnit: "g",
  defaultFrom: "kg",
  defaultTo: "pound",
  intro:
    "Weight (mass) converters for metric units like grams and kilograms, imperial units like ounces and pounds, and the tola and maund used in Pakistan.",
  units: [
    linear("mg", "Milligram", "mg", 0.001, { aliases: ["milligrams"] }),
    linear("g", "Gram", "g", 1, { aliases: ["grams", "gm", "gms"] }),
    linear("kg", "Kilogram", "kg", 1000, { aliases: ["kilograms", "kilo", "kilos", "kgs"] }),
    linear("tonne", "Tonne", "t", 1000000, { aliases: ["tonnes", "metric ton", "metric tons"] }),
    linear("ounce", "Ounce", "oz", 28.349523125, { aliases: ["ounces"] }),
    linear("pound", "Pound", "lb", 453.59237, { aliases: ["pounds", "lbs"] }),
    linear("tola", "Tola", "tola", 11.6638038, { country: "pk", aliases: ["tolas", "tolay"] }),
    linear("maund", "Maund", "maund", 40000, { country: "pk", aliases: ["maunds", "mann"] }), // Pakistani 40 kg maund
  ],
};

export default category;
