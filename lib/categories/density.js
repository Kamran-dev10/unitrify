import { linear } from "./helpers.js";

// DENSITY (base: kilogram per cubic meter)
const category = {
  id: "density",
  name: "Density",
  group: "engineering",
  baseUnit: "kg-m3",
  defaultFrom: "g-cm3",
  defaultTo: "kg-m3",
  intro:
    "Density is mass per volume: how heavy a material is for its size. Scientists, engineers, builders and cooks use it to compare materials, check liquids and work out weights from volumes.",
  units: [
    linear("kg-m3", "Kilogram per cubic meter", "kg/m³", 1, { aliases: ["kilograms per cubic meter", "kg/m3"] }),
    linear("g-cm3", "Gram per cubic centimeter", "g/cm³", 1000, { aliases: ["grams per cubic centimeter", "g/cc", "g/cm3"] }),
    linear("g-ml", "Gram per milliliter", "g/mL", 1000, { aliases: ["grams per milliliter", "g/ml"] }),
    linear("kg-l", "Kilogram per liter", "kg/L", 1000, { aliases: ["kilograms per liter", "kg/l"] }),
    linear("g-l", "Gram per liter", "g/L", 1, { aliases: ["grams per liter", "g/l"] }),
    linear("mg-l", "Milligram per liter", "mg/L", 0.001, { aliases: ["milligrams per liter", "mg/l"] }),
    linear("lb-ft3", "Pound per cubic foot", "lb/ft³", 16.01846337, { aliases: ["pounds per cubic foot", "pcf", "lb/ft3"] }),
    linear("lb-in3", "Pound per cubic inch", "lb/in³", 27679.90471, { aliases: ["pounds per cubic inch", "lb/in3"] }),
    linear("lb-gal", "Pound per gallon (US)", "lb/gal", 119.8264273, { aliases: ["pounds per gallon", "ppg", "lb/gal"] }),
    linear("oz-in3", "Ounce per cubic inch", "oz/in³", 1729.994044, { aliases: ["ounces per cubic inch", "oz/in3"] }),
    linear("slug-ft3", "Slug per cubic foot", "slug/ft³", 515.3788184, { aliases: ["slugs per cubic foot", "slug/ft3"] }),
  ],
};

export default category;
