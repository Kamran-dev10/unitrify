import { linear } from "./helpers.js";

// LUMINOUS INTENSITY (base: candela). Modern candlepower = 1 cd.
const category = {
  id: "luminous-intensity",
  name: "Luminous intensity",
  group: "light",
  baseUnit: "cd",
  defaultFrom: "mcd",
  defaultTo: "cd",
  intro:
    "Luminous intensity is how bright a light source is in one direction, measured in candelas. LEDs are rated in millicandelas (mcd), and the modern candlepower is the same as one candela.",
  units: [
    linear("cd", "Candela", "cd", 1, { aliases: ["candelas"] }),
    linear("mcd", "Millicandela", "mcd", 0.001, { aliases: ["millicandelas"] }),
    linear("kcd", "Kilocandela", "kcd", 1000, { aliases: ["kilocandelas"] }),
    linear("candlepower", "Candlepower (modern)", "cp", 1, { aliases: ["candle power", "candles"] }),
  ],
};

export default category;
