import { linear } from "./helpers.js";

// ELECTRIC POTENTIAL / VOLTAGE (base: volt). abvolt = 1e-8 V, statvolt = c / 1e6 V (exact).
const category = {
  id: "electric-potential",
  name: "Voltage",
  group: "electricity",
  baseUnit: "v",
  defaultFrom: "kv",
  defaultTo: "v",
  intro:
    "Voltage (electric potential difference) is the push that drives current through a circuit. It ranges from µV in sensors and mV in electronics to kV and MV on power lines.",
  units: [
    linear("v", "Volt", "V", 1, { aliases: ["volts", "voltage"] }),
    linear("uv", "Microvolt", "µV", 1e-6, { aliases: ["microvolts", "uv"] }),
    linear("mv", "Millivolt", "mV", 1e-3, { aliases: ["millivolts"] }),
    linear("kv", "Kilovolt", "kV", 1000, { aliases: ["kilovolts"] }),
    linear("megav", "Megavolt", "MV", 1e6, { aliases: ["megavolts"] }),
    linear("abv", "Abvolt", "abV", 1e-8, { aliases: ["abvolts", "emu of potential"] }),
    linear("statv", "Statvolt", "statV", 299.792458, { aliases: ["statvolts", "esu of potential"] }),
  ],
};

export default category;
