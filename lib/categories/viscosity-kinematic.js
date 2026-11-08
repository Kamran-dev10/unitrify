import { linear } from "./helpers.js";

// KINEMATIC VISCOSITY (base: square meter per second). 1 cSt = 1 mm²/s.
const category = {
  id: "viscosity-kinematic",
  name: "Kinematic viscosity",
  group: "fluids",
  baseUnit: "m2-s",
  defaultFrom: "cst",
  defaultTo: "mm2-s",
  intro:
    "Kinematic viscosity is a fluid's viscosity divided by its density, which shows how fast it flows under gravity. Lubricating and fuel oils are graded in centistokes (cSt), the same as mm²/s.",
  units: [
    linear("m2-s", "Square meter per second", "m²/s", 1, { aliases: ["square meters per second", "m2/s"] }),
    linear("mm2-s", "Square millimeter per second", "mm²/s", 1e-6, { aliases: ["square millimeters per second", "mm2/s"] }),
    linear("cm2-s", "Square centimeter per second", "cm²/s", 1e-4, { aliases: ["square centimeters per second", "cm2/s"] }),
    linear("stokes", "Stokes", "St", 1e-4, { aliases: ["stoke", "st"] }),
    linear("cst", "Centistokes", "cSt", 1e-6, { aliases: ["centistoke", "cst"] }),
    linear("ft2-s", "Square foot per second", "ft²/s", 0.09290304, { aliases: ["square feet per second", "ft2/s"] }),
    linear("in2-s", "Square inch per second", "in²/s", 6.4516e-4, { aliases: ["square inches per second", "in2/s"] }),
  ],
};

export default category;
