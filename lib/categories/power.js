import { linear } from "./helpers.js";

// POWER (base: watt). BTU = International Table BTU; kcal = thermochemical.
const category = {
  id: "power",
  name: "Power",
  group: "common",
  baseUnit: "w",
  defaultFrom: "kw",
  defaultTo: "hp",
  intro:
    "Power is how fast energy is used or produced. Appliances and solar panels are rated in watts and kilowatts, engines in horsepower, and air conditioners in BTU per hour or tons of refrigeration.",
  units: [
    linear("w", "Watt", "W", 1, { aliases: ["watts"] }),
    linear("kw", "Kilowatt", "kW", 1e3, { aliases: ["kilowatts"] }),
    linear("mw", "Megawatt", "MW", 1e6, { aliases: ["megawatts"] }),
    linear("hp", "Horsepower (mechanical)", "hp", 745.69987158227022, { aliases: ["horsepower", "bhp"] }),
    linear("hp-metric", "Metric horsepower", "PS", 735.49875, { aliases: ["ps", "cv", "pferdestarke"] }),
    linear("btu-h", "BTU per hour", "BTU/h", 0.29307107017, { aliases: ["btu/hr", "btuh"] }),
    linear("ft-lbf-s", "Foot-pound per second", "ft·lbf/s", 1.3558179483314004, { aliases: ["ft lb/s"] }),
    linear("kcal-h", "Kilocalorie per hour", "kcal/h", 4184 / 3600, { aliases: ["kcal/hr"] }),
    linear("ton-refrigeration", "Ton of refrigeration", "TR", 3516.8528420667, { aliases: ["refrigeration ton", "rt", "ac ton"] }),
  ],
};

export default category;
