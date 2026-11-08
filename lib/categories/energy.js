import { linear } from "./helpers.js";

// ENERGY (base: joule). Calorie = thermochemical calorie (4.184 J);
// BTU = International Table BTU.
const category = {
  id: "energy",
  name: "Energy",
  group: "common",
  baseUnit: "j",
  defaultFrom: "kwh",
  defaultTo: "mj",
  intro:
    "Energy is the capacity to do work or produce heat. Electricity bills use kilowatt-hours, food labels use kilocalories (Calories), heating and air conditioning use BTU and therms, and physics uses joules and electronvolts.",
  units: [
    linear("j", "Joule", "J", 1, { aliases: ["joules"] }),
    linear("kj", "Kilojoule", "kJ", 1e3, { aliases: ["kilojoules"] }),
    linear("mj", "Megajoule", "MJ", 1e6, { aliases: ["megajoules"] }),
    linear("wh", "Watt-hour", "Wh", 3600, { aliases: ["watt hours", "watt hour"] }),
    linear("kwh", "Kilowatt-hour", "kWh", 3.6e6, { aliases: ["kilowatt hours", "unit of electricity"] }),
    linear("cal", "Calorie", "cal", 4.184, { aliases: ["calories", "small calorie"] }),
    linear("kcal", "Kilocalorie", "kcal", 4184, { aliases: ["kilocalories", "food calorie", "Cal"] }),
    linear("btu", "British thermal unit", "BTU", 1055.05585262, { aliases: ["btus", "btu it"] }),
    linear("therm", "Therm (US)", "thm", 105480400, { aliases: ["therms"] }),
    linear("ev", "Electronvolt", "eV", 1.602176634e-19, { aliases: ["electronvolts", "electron volt"] }),
    linear("ft-lbf", "Foot-pound", "ft·lbf", 1.3558179483314004, { aliases: ["foot pound", "ft lb", "foot-pounds"] }),
    linear("erg", "Erg", "erg", 1e-7, { aliases: ["ergs"] }),
  ],
};

export default category;
