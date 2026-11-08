import { linear } from "./helpers.js";

// MOMENT OF INERTIA (base: kilogram square meter)
const category = {
  id: "moment-of-inertia",
  name: "Moment of inertia",
  group: "engineering",
  baseUnit: "kg-m2",
  defaultFrom: "kg-m2",
  defaultTo: "lb-ft2",
  intro:
    "Moment of inertia measures how hard it is to change how fast something spins. Mechanical engineers use it for flywheels, shafts, motors and rotating machine parts.",
  units: [
    linear("kg-m2", "Kilogram square meter", "kg·m²", 1, { aliases: ["kilogram square meter", "kg m2"] }),
    linear("kg-cm2", "Kilogram square centimeter", "kg·cm²", 1e-4, { aliases: ["kilogram square centimeter", "kg cm2"] }),
    linear("g-cm2", "Gram square centimeter", "g·cm²", 1e-7, { aliases: ["gram square centimeter", "g cm2"] }),
    linear("lb-ft2", "Pound square foot", "lb·ft²", 0.04214011009, { aliases: ["pound square foot", "lb ft2"] }),
    linear("lb-in2", "Pound square inch", "lb·in²", 2.926397e-4, { aliases: ["pound square inch", "lb in2"] }),
    linear("slug-ft2", "Slug square foot", "slug·ft²", 1.355817948, { aliases: ["slug square foot", "slug ft2"] }),
  ],
};

export default category;
