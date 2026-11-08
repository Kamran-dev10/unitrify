import { linear } from "./helpers.js";

// ABSORBED DOSE (base: gray). rad = 0.01 Gy, 1 Gy = 1 J/kg.
const category = {
  id: "radiation-absorbed-dose",
  name: "Absorbed dose",
  group: "radiology",
  baseUnit: "gy",
  defaultFrom: "gy",
  defaultTo: "rad",
  note: "For information only, not for medical or safety decisions.",
  intro:
    "Absorbed dose is the energy radiation leaves in each kilogram of material, measured in grays (Gy) or the older rad. Radiotherapy plans and material testing use it.",
  units: [
    linear("gy", "Gray", "Gy", 1, { aliases: ["grays"] }),
    linear("mgy", "Milligray", "mGy", 0.001, { aliases: ["milligrays"] }),
    linear("ugy", "Microgray", "µGy", 1e-6, { aliases: ["micrograys", "ugy"] }),
    linear("rad", "Rad", "rad", 0.01, { aliases: ["rads", "radiation absorbed dose"] }),
    linear("j-kg", "Joule per kilogram", "J/kg", 1, { aliases: ["joules per kilogram", "j/kg"] }),
    linear("erg-g", "Erg per gram", "erg/g", 1e-4, { aliases: ["ergs per gram", "erg/g"] }),
  ],
};

export default category;
