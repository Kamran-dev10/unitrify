import { linear } from "./helpers.js";

// MASS FLOW RATE (base: kilogram per second).
const category = {
  id: "flow-mass",
  name: "Mass flow rate",
  group: "fluids",
  baseUnit: "kg-s",
  defaultFrom: "kg-h",
  defaultTo: "kg-s",
  intro:
    "Mass flow rate is the mass of material that moves each second, hour or minute. Process and boiler engineers use it for steam, fuel and bulk materials, often in kg/h, tonnes per hour or lb/h.",
  units: [
    linear("kg-s", "Kilogram per second", "kg/s", 1, { aliases: ["kilograms per second", "kg/s"] }),
    linear("g-s", "Gram per second", "g/s", 0.001, { aliases: ["grams per second", "g/s"] }),
    linear("kg-min", "Kilogram per minute", "kg/min", 1 / 60, { aliases: ["kilograms per minute", "kg/min"] }),
    linear("kg-h", "Kilogram per hour", "kg/h", 1 / 3600, { aliases: ["kilograms per hour", "kg/h", "kg/hr"] }),
    linear("t-h", "Tonne per hour", "t/h", 1000 / 3600, { aliases: ["tonnes per hour", "tons per hour", "tph"] }),
    linear("lb-s", "Pound per second", "lb/s", 0.45359237, { aliases: ["pounds per second", "lb/s"] }),
    linear("lb-min", "Pound per minute", "lb/min", 0.45359237 / 60, { aliases: ["pounds per minute", "lb/min"] }),
    linear("lb-h", "Pound per hour", "lb/h", 0.45359237 / 3600, { aliases: ["pounds per hour", "lb/hr", "pph"] }),
  ],
};

export default category;
