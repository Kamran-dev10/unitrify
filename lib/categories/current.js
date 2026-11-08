import { linear } from "./helpers.js";

// ELECTRIC CURRENT (base: ampere). abampere = 10 A, statampere = 1/(10c) A.
const category = {
  id: "current",
  name: "Electric current",
  group: "electricity",
  baseUnit: "a",
  defaultFrom: "ma",
  defaultTo: "a",
  intro:
    "Electric current is the flow of electric charge, measured in amperes (amps). Electricians, electronics hobbyists and engineers use it to size wires, fuses, chargers and circuits.",
  units: [
    linear("a", "Ampere", "A", 1, { aliases: ["amperes", "amps", "amp"] }),
    linear("ma", "Milliampere", "mA", 1e-3, { aliases: ["milliamperes", "milliamps", "milliamp"] }),
    linear("ua", "Microampere", "µA", 1e-6, { aliases: ["microamperes", "microamps", "ua"] }),
    linear("ka", "Kiloampere", "kA", 1000, { aliases: ["kiloamperes", "kiloamps"] }),
    linear("aba", "Abampere", "abA", 10, { aliases: ["abamperes", "biot", "emu of current"] }),
    linear("stata", "Statampere", "statA", 1 / 2997924580, { aliases: ["statamperes", "esu of current"] }),
  ],
};

export default category;
