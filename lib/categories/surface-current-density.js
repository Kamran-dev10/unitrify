import { linear } from "./helpers.js";

// SURFACE CURRENT DENSITY (base: ampere per square meter).
const category = {
  id: "surface-current-density",
  name: "Current density",
  group: "electricity",
  baseUnit: "a-m2",
  defaultFrom: "a-cm2",
  defaultTo: "a-m2",
  intro:
    "Current density is the current flowing through each unit of cross-section area. Engineers use it to size busbars and cables, and electroplaters and battery makers quote it in A/cm² or mA/cm².",
  units: [
    linear("a-m2", "Ampere per square meter", "A/m²", 1, { aliases: ["amperes per square meter", "a/m2"] }),
    linear("a-cm2", "Ampere per square centimeter", "A/cm²", 1e4, { aliases: ["amperes per square centimeter", "a/cm2"] }),
    linear("a-in2", "Ampere per square inch", "A/in²", 1 / 0.00064516, { aliases: ["amperes per square inch", "a/in2"] }),
    linear("ma-cm2", "Milliampere per square centimeter", "mA/cm²", 10, { aliases: ["milliamperes per square centimeter", "ma/cm2"] }),
  ],
};

export default category;
