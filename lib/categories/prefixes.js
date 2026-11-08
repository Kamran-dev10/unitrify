import { linear } from "./helpers.js";

// SI PREFIXES (base: 1, no prefix). Includes ronna, quetta, ronto and quecto (added in 2022).
const category = {
  id: "prefixes",
  name: "Metric prefixes",
  group: "other",
  baseUnit: "one",
  defaultFrom: "kilo",
  defaultTo: "one",
  intro:
    "SI prefixes are the words in front of a unit, like kilo in kilometer or micro in microgram. Each one multiplies the unit by a power of ten, from quecto (10⁻³⁰) to quetta (10³⁰).",
  units: [
    linear("quetta", "Quetta", "Q", 1e30, { aliases: ["quetta-"] }),
    linear("ronna", "Ronna", "R", 1e27, { aliases: ["ronna-"] }),
    linear("yotta", "Yotta", "Y", 1e24, { aliases: ["yotta-"] }),
    linear("zetta", "Zetta", "Z", 1e21, { aliases: ["zetta-"] }),
    linear("exa", "Exa", "E", 1e18, { aliases: ["exa-"] }),
    linear("peta", "Peta", "P", 1e15, { aliases: ["peta-"] }),
    linear("tera", "Tera", "T", 1e12, { aliases: ["tera-", "trillion"] }),
    linear("giga", "Giga", "G", 1e9, { aliases: ["giga-", "billion"] }),
    linear("mega", "Mega", "M", 1e6, { aliases: ["mega-", "million"] }),
    linear("kilo", "Kilo", "k", 1e3, { aliases: ["kilo-", "thousand"] }),
    linear("hecto", "Hecto", "h", 1e2, { aliases: ["hecto-", "hundred"] }),
    linear("deca", "Deca", "da", 10, { aliases: ["deka", "deca-"] }),
    linear("one", "No prefix (one)", "1", 1, { aliases: ["unit", "none", "one"] }),
    linear("deci", "Deci", "d", 0.1, { aliases: ["deci-", "tenth"] }),
    linear("centi", "Centi", "c", 0.01, { aliases: ["centi-", "hundredth"] }),
    linear("milli", "Milli", "m", 1e-3, { aliases: ["milli-", "thousandth"] }),
    linear("micro", "Micro", "µ", 1e-6, { aliases: ["micro-", "u"] }),
    linear("nano", "Nano", "n", 1e-9, { aliases: ["nano-"] }),
    linear("pico", "Pico", "p", 1e-12, { aliases: ["pico-"] }),
    linear("femto", "Femto", "f", 1e-15, { aliases: ["femto-"] }),
    linear("atto", "Atto", "a", 1e-18, { aliases: ["atto-"] }),
    linear("zepto", "Zepto", "z", 1e-21, { aliases: ["zepto-"] }),
    linear("yocto", "Yocto", "y", 1e-24, { aliases: ["yocto-"] }),
    linear("ronto", "Ronto", "r", 1e-27, { aliases: ["ronto-"] }),
    linear("quecto", "Quecto", "q", 1e-30, { aliases: ["quecto-"] }),
  ],
};

export default category;
