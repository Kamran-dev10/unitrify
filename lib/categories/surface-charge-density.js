import { linear } from "./helpers.js";

// SURFACE CHARGE DENSITY (base: coulomb per square meter).
const category = {
  id: "surface-charge-density",
  name: "Surface charge density",
  group: "electricity",
  baseUnit: "c-m2",
  defaultFrom: "uc-cm2",
  defaultTo: "c-m2",
  intro:
    "Surface charge density is the electric charge per unit area, such as on a capacitor plate or a charged sheet. It is used in electrostatics, capacitor design and surface science.",
  units: [
    linear("c-m2", "Coulomb per square meter", "C/m²", 1, { aliases: ["coulombs per square meter", "c/m2"] }),
    linear("c-cm2", "Coulomb per square centimeter", "C/cm²", 1e4, { aliases: ["coulombs per square centimeter", "c/cm2"] }),
    linear("c-in2", "Coulomb per square inch", "C/in²", 1 / 0.00064516, { aliases: ["coulombs per square inch", "c/in2"] }),
    linear("uc-cm2", "Microcoulomb per square centimeter", "µC/cm²", 0.01, { aliases: ["microcoulombs per square centimeter", "uc/cm2"] }),
    linear("abc-cm2", "Abcoulomb per square centimeter", "abC/cm²", 1e5, { aliases: ["abcoulombs per square centimeter", "abc/cm2"] }),
  ],
};

export default category;
