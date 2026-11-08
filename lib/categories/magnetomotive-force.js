import { linear } from "./helpers.js";

// MAGNETOMOTIVE FORCE (base: ampere-turn). gilbert = 10/(4π) ampere-turn.
const category = {
  id: "magnetomotive-force",
  name: "Magnetomotive force",
  group: "magnetism",
  baseUnit: "at",
  defaultFrom: "gilbert",
  defaultTo: "at",
  intro:
    "Magnetomotive force drives magnetic flux around a magnetic circuit, the way voltage drives current. It equals the current times the number of turns in a coil, and is used in transformer, motor and relay design.",
  units: [
    linear("at", "Ampere-turn", "A·t", 1, { aliases: ["ampere turns", "amp turns"] }),
    linear("kat", "Kiloampere-turn", "kA·t", 1000, { aliases: ["kiloampere turns", "kiloamp turns"] }),
    linear("gilbert", "Gilbert", "Gb", 10 / (4 * Math.PI), { aliases: ["gilberts", "gi"] }),
  ],
};

export default category;
