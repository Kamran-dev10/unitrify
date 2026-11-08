import { linear } from "./helpers.js";

// RADIATION EXPOSURE (base: coulomb per kilogram). roentgen = 2.58e-4 C/kg (exact).
const category = {
  id: "radiation-exposure",
  name: "Radiation exposure",
  group: "radiology",
  baseUnit: "c-kg",
  defaultFrom: "r",
  defaultTo: "c-kg",
  note: "For information only, not for medical or safety decisions.",
  intro:
    "Radiation exposure measures how much X-ray or gamma radiation ionises air, in coulombs per kilogram or the older roentgen. Survey meters and old dosimeters often read in mR/h.",
  units: [
    linear("c-kg", "Coulomb per kilogram", "C/kg", 1, { aliases: ["coulombs per kilogram", "c/kg"] }),
    linear("mc-kg", "Millicoulomb per kilogram", "mC/kg", 0.001, { aliases: ["millicoulombs per kilogram", "mc/kg"] }),
    linear("r", "Roentgen", "R", 2.58e-4, { aliases: ["roentgens", "röntgen"] }),
    linear("mr", "Milliroentgen", "mR", 2.58e-7, { aliases: ["milliroentgens"] }),
  ],
};

export default category;
