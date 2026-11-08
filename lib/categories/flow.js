import { linear } from "./helpers.js";

// VOLUME FLOW RATE (base: cubic meter per second). Gallons, feet and acres are exact (international foot).
const category = {
  id: "flow",
  name: "Flow rate",
  group: "fluids",
  baseUnit: "m3-s",
  defaultFrom: "cusec",
  defaultTo: "l-s",
  intro:
    "Flow rate is the volume of liquid or gas that passes each second, minute or hour. Plumbers use L/min and GPM, HVAC uses CFM, and in Pakistan and India canal and river flows are given in cusecs (cubic feet per second).",
  units: [
    linear("m3-s", "Cubic meter per second", "m³/s", 1, { aliases: ["cubic meters per second", "cumec", "m3/s"] }),
    linear("l-s", "Liter per second", "L/s", 0.001, { aliases: ["liters per second", "litres per second", "lps"] }),
    linear("l-min", "Liter per minute", "L/min", 0.001 / 60, { aliases: ["liters per minute", "litres per minute", "lpm"] }),
    linear("l-h", "Liter per hour", "L/h", 0.001 / 3600, { aliases: ["liters per hour", "litres per hour", "lph"] }),
    linear("m3-h", "Cubic meter per hour", "m³/h", 1 / 3600, { aliases: ["cubic meters per hour", "m3/h", "cmh"] }),
    linear("m3-day", "Cubic meter per day", "m³/day", 1 / 86400, { aliases: ["cubic meters per day", "m3/day", "m3/d"] }),
    linear("gpm", "US gallon per minute", "gal/min", 0.003785411784 / 60, { aliases: ["gpm", "gallons per minute", "us gpm"] }),
    linear("gph", "US gallon per hour", "gal/h", 0.003785411784 / 3600, { aliases: ["gph", "gallons per hour"] }),
    linear("uk-gpm", "UK gallon per minute", "UK gal/min", 0.00454609 / 60, { aliases: ["imperial gallons per minute", "uk gpm"] }),
    linear("ft3-s", "Cubic foot per second", "ft³/s", 0.028316846592, { aliases: ["cubic feet per second", "cfs", "ft3/s"] }),
    linear("cusec", "Cusec", "cusec", 0.028316846592, { aliases: ["cusecs", "cubic feet per second (canal)"] }),
    linear("cfm", "Cubic foot per minute", "CFM", 0.028316846592 / 60, { aliases: ["cfm", "cubic feet per minute", "ft3/min"] }),
    linear("mgd", "Million US gallons per day", "MGD", 0.003785411784 * 1e6 / 86400, { aliases: ["mgd", "million gallons per day"] }),
    linear("bbl-day", "Oil barrel per day", "bbl/day", 0.003785411784 * 42 / 86400, { aliases: ["barrels per day", "bpd", "bbl/d"] }),
    linear("acre-ft-day", "Acre-foot per day", "ac·ft/day", 4046.8564224 * 0.3048 / 86400, { aliases: ["acre-feet per day", "acre foot per day"] }),
  ],
};

export default category;
