import { linear } from "./helpers.js";

// SPEED (base: meter per second). No Mach: it depends on air temperature.
const category = {
  id: "speed",
  name: "Speed",
  group: "common",
  baseUnit: "m-s",
  defaultFrom: "km-h",
  defaultTo: "mph",
  intro:
    "Speed tells you how far something travels in a given time. Road signs use km/h or mph, ships and aircraft use knots, and science uses meters per second.",
  units: [
    linear("m-s", "Meter per second", "m/s", 1, { aliases: ["meters per second", "mps"] }),
    linear("km-h", "Kilometer per hour", "km/h", 1 / 3.6, { aliases: ["kph", "kmh", "kilometers per hour"] }),
    linear("mph", "Mile per hour", "mph", 0.44704, { aliases: ["miles per hour", "mi/h"] }),
    linear("knot", "Knot", "kn", 1852 / 3600, { aliases: ["knots", "kt"] }),
    linear("ft-s", "Foot per second", "ft/s", 0.3048, { aliases: ["feet per second", "fps"] }),
    linear("light", "Speed of light", "c", 299792458, { aliases: ["light speed"] }),
  ],
};

export default category;
