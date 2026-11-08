import { linear } from "./helpers.js";

// LEVEL UNITS (base: decibel). bel = 10 dB, neper = 20 / ln(10) dB (exact, for field quantities).
const category = {
  id: "sound-level",
  name: "Sound level",
  group: "other",
  baseUnit: "db",
  defaultFrom: "np",
  defaultTo: "db",
  allowNegative: true,
  intro:
    "Decibels, bels and nepers express a level: a ratio on a log scale. Sound engineers use dB, and telecoms and physics also use the neper; below you can also turn a sound pressure in pascals into dB SPL.",
  units: [
    linear("db", "Decibel", "dB", 1, { aliases: ["decibels"] }),
    linear("bel", "Bel", "B", 10, { aliases: ["bels"] }),
    linear("np", "Neper", "Np", 20 / Math.LN10, { aliases: ["nepers"] }),
  ],
};

export default category;
