import { linear } from "./helpers.js";

// EQUIVALENT DOSE (base: sievert). rem = 0.01 Sv.
const category = {
  id: "radiation-dose",
  name: "Radiation dose (equivalent)",
  group: "radiology",
  baseUnit: "sv",
  defaultFrom: "msv",
  defaultTo: "rem",
  note: "For information only, not for medical or safety decisions.",
  intro:
    "Equivalent dose measures the health effect of radiation on the body, in sieverts (Sv) or the older rem. X-ray, CT and work limits are usually given in mSv or µSv.",
  units: [
    linear("sv", "Sievert", "Sv", 1, { aliases: ["sieverts"] }),
    linear("msv", "Millisievert", "mSv", 0.001, { aliases: ["millisieverts"] }),
    linear("usv", "Microsievert", "µSv", 1e-6, { aliases: ["microsieverts", "usv"] }),
    linear("rem", "Rem", "rem", 0.01, { aliases: ["roentgen equivalent man", "rems"] }),
    linear("mrem", "Millirem", "mrem", 1e-5, { aliases: ["millirems"] }),
  ],
};

export default category;
