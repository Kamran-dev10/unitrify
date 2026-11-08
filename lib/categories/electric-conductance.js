import { linear } from "./helpers.js";

// ELECTRIC CONDUCTANCE (base: siemens). abmho = 1e9 S, statmho = 1 / (c² × 1e-5) S (exact).
const category = {
  id: "electric-conductance",
  name: "Electric conductance",
  group: "electricity",
  baseUnit: "s",
  defaultFrom: "ms",
  defaultTo: "s",
  intro:
    "Electric conductance is the opposite of resistance: how easily current flows, measured in siemens (S). Its older name is the mho. It is used in circuit analysis and electrochemistry.",
  units: [
    linear("s", "Siemens", "S", 1, { aliases: ["siemen"] }),
    linear("us", "Microsiemens", "µS", 1e-6, { aliases: ["microsiemen", "us"] }),
    linear("ms", "Millisiemens", "mS", 1e-3, { aliases: ["millisiemen"] }),
    linear("ks", "Kilosiemens", "kS", 1000, { aliases: ["kilosiemen"] }),
    linear("mho", "Mho", "℧", 1, { aliases: ["mhos", "reciprocal ohm"] }),
    linear("abmho", "Abmho", "abS", 1e9, { aliases: ["abmhos", "absiemens"] }),
    linear("statmho", "Statmho", "statS", 1 / (299792458 ** 2 * 1e-5), { aliases: ["statmhos", "statsiemens"] }),
  ],
};

export default category;
