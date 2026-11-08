import { linear } from "./helpers.js";

// ELECTRIC CONDUCTIVITY (base: siemens per meter).
const category = {
  id: "electric-conductivity",
  name: "Electric conductivity",
  group: "electricity",
  baseUnit: "s-m",
  defaultFrom: "us-cm",
  defaultTo: "ms-cm",
  intro:
    "Electric conductivity is how well a material or liquid carries current. Water quality (EC) for drinking water, farming, hydroponics and aquariums is usually given in µS/cm or mS/cm.",
  units: [
    linear("s-m", "Siemens per meter", "S/m", 1, { aliases: ["siemens per metre", "s/m"] }),
    linear("s-cm", "Siemens per centimeter", "S/cm", 100, { aliases: ["siemens per centimetre", "s/cm"] }),
    linear("ms-cm", "Millisiemens per centimeter", "mS/cm", 0.1, { aliases: ["millisiemens per centimetre", "ms/cm", "ec ms/cm"] }),
    linear("us-cm", "Microsiemens per centimeter", "µS/cm", 1e-4, { aliases: ["microsiemens per centimetre", "us/cm", "µs/cm", "ec us/cm"] }),
    linear("mho-m", "Mho per meter", "℧/m", 1, { aliases: ["mhos per meter", "mho/m"] }),
  ],
};

export default category;
