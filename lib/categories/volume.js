import { linear } from "./helpers.js";

// VOLUME (base: litre). Liquid and general volume; dry units are in volume-dry.js.
const category = {
  id: "volume",
  name: "Volume",
  group: "common",
  baseUnit: "litre",
  defaultFrom: "litre",
  defaultTo: "us-gallon",
  intro:
    "Volume measures how much space a liquid or object takes up. Convert between metric units (millilitres, litres, cubic meters), US and UK kitchen measures (teaspoons, cups, pints, quarts, gallons), cubic inches, feet and yards, and the oil barrel.",
  units: [
    linear("ml", "Millilitre", "ml", 0.001, { aliases: ["millilitres", "milliliters", "milliliter", "millilitre", "mls"] }),
    linear("cubic-cm", "Cubic centimeter", "cm³", 0.001, { aliases: ["cc", "cubic centimeters", "cm3"] }),
    linear("litre", "Litre", "L", 1, { aliases: ["litres", "liter", "liters", "ltr", "l"] }),
    linear("cubic-m", "Cubic meter", "m³", 1000, { aliases: ["cubic meters", "cubic metres", "m3"] }),
    linear("us-teaspoon", "US teaspoon", "tsp", 0.00492892159375, { aliases: ["teaspoon", "teaspoons"] }),
    linear("us-tablespoon", "US tablespoon", "tbsp", 0.01478676478125, { aliases: ["tablespoon", "tablespoons"] }),
    linear("us-fl-oz", "US fluid ounce", "US fl oz", 0.0295735295625, { aliases: ["fluid ounce", "fl oz"] }),
    linear("uk-fl-oz", "UK fluid ounce", "UK fl oz", 0.0284130625, { aliases: ["imperial fluid ounce"] }),
    linear("us-cup", "US cup", "cup", 0.2365882365, { aliases: ["cups", "cup"] }),
    linear("metric-cup", "Metric cup", "metric cup", 0.25, { aliases: ["cup 250 ml"] }),
    linear("us-pint", "US pint", "US pt", 0.473176473, { aliases: ["pint", "pints"] }),
    linear("uk-pint", "UK pint", "UK pt", 0.56826125, { aliases: ["imperial pint"] }),
    linear("us-quart", "US quart", "US qt", 0.946352946, { aliases: ["quart", "quarts"] }),
    linear("uk-quart", "UK quart", "UK qt", 1.1365225, { aliases: ["imperial quart"] }),
    linear("us-gallon", "US gallon", "US gal", 3.785411784, { aliases: ["gallons", "gallon", "gal"] }),
    linear("uk-gallon", "UK gallon", "UK gal", 4.54609, { aliases: ["imperial gallon", "imperial gallons"] }),
    linear("cubic-inch", "Cubic inch", "in³", 0.016387064, { aliases: ["cubic inches", "in3"] }),
    linear("cubic-foot", "Cubic foot", "ft³", 28.316846592, { aliases: ["cubic feet", "cu ft", "ft3"] }),
    linear("cubic-yard", "Cubic yard", "yd³", 764.554857984, { aliases: ["cubic yards", "yd3"] }),
    linear("oil-barrel", "Oil barrel", "bbl", 158.987294928, { aliases: ["barrel", "barrels"] }),
  ],
};

export default category;
