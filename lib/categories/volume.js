import { linear } from "./helpers.js";

// VOLUME (base: litre)
const category = {
  id: "volume",
  name: "Volume",
  group: "common",
  baseUnit: "litre",
  defaultFrom: "litre",
  defaultTo: "us-gallon",
  intro:
    "Volume measures how much space a liquid or object takes up. Convert between millilitres, litres, US and UK gallons, and US cups.",
  units: [
    linear("ml", "Millilitre", "ml", 0.001, { aliases: ["millilitres", "milliliters", "milliliter"] }),
    linear("litre", "Litre", "L", 1, { aliases: ["litres", "liter", "liters"] }),
    linear("us-gallon", "US gallon", "US gal", 3.785411784, { aliases: ["gallons", "gallon", "gal"] }),
    linear("uk-gallon", "UK gallon", "UK gal", 4.54609, { aliases: ["imperial gallon", "imperial gallons"] }),
    linear("us-cup", "US cup", "cup", 0.2365882365, { aliases: ["cups", "cup"] }),
  ],
};

export default category;
