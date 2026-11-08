import { linear } from "./helpers.js";

// ELECTRIC CHARGE (base: coulomb). Exact SI: e = 1.602176634e-19 C, F = N_A × e, statcoulomb = 1/(10c) C, abcoulomb = 10 C.
const category = {
  id: "charge",
  name: "Electric charge",
  group: "electricity",
  baseUnit: "c",
  defaultFrom: "mah",
  defaultTo: "ah",
  intro:
    "Electric charge is the amount of electricity stored or moved. Battery capacity is given in mAh or Ah, while physicists and chemists use coulombs, the faraday and the elementary charge.",
  units: [
    linear("c", "Coulomb", "C", 1, { aliases: ["coulombs"] }),
    linear("mc", "Millicoulomb", "mC", 1e-3, { aliases: ["millicoulombs"] }),
    linear("uc", "Microcoulomb", "µC", 1e-6, { aliases: ["microcoulombs", "uc"] }),
    linear("nc", "Nanocoulomb", "nC", 1e-9, { aliases: ["nanocoulombs"] }),
    linear("ah", "Ampere-hour", "Ah", 3600, { aliases: ["amp hours", "ampere hours", "amp-hour"] }),
    linear("mah", "Milliampere-hour", "mAh", 3.6, { aliases: ["milliamp hours", "milliampere hours"] }),
    linear("abc", "Abcoulomb", "abC", 10, { aliases: ["abcoulombs", "emu of charge"] }),
    linear("statc", "Statcoulomb", "statC", 1 / 2997924580, { aliases: ["statcoulombs", "franklin", "esu of charge"] }),
    linear("faraday", "Faraday", "F", 6.02214076e23 * 1.602176634e-19, { aliases: ["faradays", "faraday constant"] }),
    linear("e", "Elementary charge", "e", 1.602176634e-19, { aliases: ["electron charge", "proton charge"] }),
  ],
};

export default category;
