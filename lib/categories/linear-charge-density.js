import { linear } from "./helpers.js";

// LINEAR CHARGE DENSITY (base: coulomb per meter).
const category = {
  id: "linear-charge-density",
  name: "Linear charge density",
  group: "electricity",
  baseUnit: "c-m",
  defaultFrom: "c-cm",
  defaultTo: "c-m",
  intro:
    "Linear charge density is the electric charge per unit length, such as along a wire, a rod or a charged beam. Physics students and engineers use it in electric field calculations.",
  units: [
    linear("c-m", "Coulomb per meter", "C/m", 1, { aliases: ["coulombs per meter", "c/m"] }),
    linear("c-cm", "Coulomb per centimeter", "C/cm", 100, { aliases: ["coulombs per centimeter", "c/cm"] }),
    linear("c-in", "Coulomb per inch", "C/in", 1 / 0.0254, { aliases: ["coulombs per inch", "c/in"] }),
    linear("uc-m", "Microcoulomb per meter", "µC/m", 1e-6, { aliases: ["microcoulombs per meter", "uc/m"] }),
    linear("abc-cm", "Abcoulomb per centimeter", "abC/cm", 1000, { aliases: ["abcoulombs per centimeter", "abc/cm"] }),
  ],
};

export default category;
