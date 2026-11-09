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
    "Weight (mass) tells you how heavy something is, from medicine doses to cargo ships. Convert between metric units (micrograms to tonnes), imperial units (grains, ounces, pounds, stone, short and long tons), units for gold and gems (troy ounce, pennyweight, carat), and the tola and maund used in Pakistan.",
  units: [
    linear("ug", "Microgram", "µg", 1e-6, { aliases: ["micrograms", "mcg"] }),
    linear("mg", "Milligram", "mg", 0.001, { aliases: ["milligrams"] }),
    linear("g", "Gram", "g", 1, { aliases: ["grams", "gm", "gms", "gramme", "grammes"] }),
    linear("kg", "Kilogram", "kg", 1000, { aliases: ["kilograms", "kilo", "kilos", "kgs", "kilogrammes"] }),
    linear("quintal", "Quintal", "q", 100000, { aliases: ["quintals"] }),
    linear("tonne", "Tonne", "t", 1000000, { aliases: ["tonnes", "metric ton", "metric tons"] }),
    linear("carat", "Carat", "ct", 0.2, { aliases: ["carats", "karat"] }),
    linear("grain", "Grain", "gr", 0.06479891, { aliases: ["grains"] }),
    linear("pennyweight", "Pennyweight", "dwt", 1.55517384, { aliases: ["pennyweights", "dwt"] }),
    linear("ounce", "Ounce", "oz", 28.349523125, { aliases: ["ounces", "oz"] }),
    linear("troy-ounce", "Troy ounce", "oz t", 31.1034768, { aliases: ["troy ounces", "ozt"] }),
    linear("pound", "Pound", "lb", 453.59237, { aliases: ["pounds", "lbs", "lb"] }),
    linear("stone", "Stone", "st", 6350.29318, { aliases: ["stones"] }),
    linear("short-ton", "Short ton (US)", "ton (US)", 907184.74, { aliases: ["us ton", "short tons"] }),
    linear("long-ton", "Long ton (UK)", "ton (UK)", 1016046.9088, { aliases: ["uk ton", "imperial ton"] }),
    linear("slug", "Slug", "slug", (0.45359237 * 9.80665 * 1000) / 0.3048, { aliases: ["slugs"] }), // 1 lbf·s²/ft (exact)
    linear("tola", "Tola", "tola", 11.6638038, { country: "pk", aliases: ["tolas", "tolay"] }),
    linear("maund", "Maund", "maund", 40000, { country: "pk", aliases: ["maunds", "mann"] }), // Pakistani 40 kg maund
  ],
};

export default category;
