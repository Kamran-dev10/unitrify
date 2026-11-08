import { linear } from "./helpers.js";

// SPECIFIC VOLUME (base: cubic meter per kilogram)
const category = {
  id: "specific-volume",
  name: "Specific volume",
  group: "engineering",
  baseUnit: "m3-kg",
  defaultFrom: "ft3-lb",
  defaultTo: "m3-kg",
  intro:
    "Specific volume is volume per mass, the inverse of density. Engineers use it for steam tables, refrigerants, air conditioning and other thermodynamics work.",
  units: [
    linear("m3-kg", "Cubic meter per kilogram", "m³/kg", 1, { aliases: ["cubic meters per kilogram", "m3/kg"] }),
    linear("l-kg", "Liter per kilogram", "L/kg", 0.001, { aliases: ["liters per kilogram", "l/kg"] }),
    linear("cm3-g", "Cubic centimeter per gram", "cm³/g", 0.001, { aliases: ["cubic centimeters per gram", "cm3/g"] }),
    linear("ft3-lb", "Cubic foot per pound", "ft³/lb", 0.06242796057, { aliases: ["cubic feet per pound", "ft3/lb"] }),
    linear("gal-lb", "Gallon (US) per pound", "gal/lb", 0.008345404452, { aliases: ["gallons per pound", "gal/lb"] }),
  ],
};

export default category;
