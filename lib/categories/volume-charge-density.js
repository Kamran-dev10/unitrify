import { linear } from "./helpers.js";

// VOLUME CHARGE DENSITY (base: coulomb per cubic meter).
const category = {
  id: "volume-charge-density",
  name: "Volume charge density",
  group: "electricity",
  baseUnit: "c-m3",
  defaultFrom: "c-cm3",
  defaultTo: "c-m3",
  intro:
    "Volume charge density is the electric charge per unit volume, such as inside a charged cloud, a plasma or a semiconductor. It appears in Gauss's law and in device physics.",
  units: [
    linear("c-m3", "Coulomb per cubic meter", "C/m³", 1, { aliases: ["coulombs per cubic meter", "c/m3"] }),
    linear("c-cm3", "Coulomb per cubic centimeter", "C/cm³", 1e6, { aliases: ["coulombs per cubic centimeter", "c/cm3"] }),
    linear("c-in3", "Coulomb per cubic inch", "C/in³", 1 / 1.6387064e-5, { aliases: ["coulombs per cubic inch", "c/in3"] }),
    linear("uc-cm3", "Microcoulomb per cubic centimeter", "µC/cm³", 1, { aliases: ["microcoulombs per cubic centimeter", "uc/cm3"] }),
  ],
};

export default category;
