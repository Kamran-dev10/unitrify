import { linear } from "./helpers.js";

// TIME (base: second). Month and year are AVERAGE Gregorian values:
// year = 365.2425 days = 31,556,952 s; month = year / 12 = 2,629,746 s.
const YEAR = 31556952;

const category = {
  id: "time",
  name: "Time",
  group: "common",
  baseUnit: "s",
  defaultFrom: "h",
  defaultTo: "min",
  intro:
    "Time converters help with schedules, project planning, computing and science. Months and years here are averages over the Gregorian calendar (365.2425 days per year), because real months and years have different lengths.",
  units: [
    linear("ns", "Nanosecond", "ns", 1e-9, { aliases: ["nanoseconds"] }),
    linear("us", "Microsecond", "µs", 1e-6, { aliases: ["microseconds"] }),
    linear("ms", "Millisecond", "ms", 1e-3, { aliases: ["milliseconds"] }),
    linear("s", "Second", "s", 1, { aliases: ["seconds", "sec", "secs"] }),
    linear("min", "Minute", "min", 60, { aliases: ["minutes", "mins"] }),
    linear("h", "Hour", "h", 3600, { aliases: ["hours", "hr", "hrs"] }),
    linear("day", "Day", "d", 86400, { aliases: ["days"] }),
    linear("week", "Week", "wk", 604800, { aliases: ["weeks"] }),
    linear("month", "Month (average)", "mo", YEAR / 12, { aliases: ["months"] }),
    linear("year", "Year (average)", "yr", YEAR, { aliases: ["years"] }),
    linear("decade", "Decade (average)", "dec", 10 * YEAR, { aliases: ["decades"] }),
    linear("century", "Century (average)", "c", 100 * YEAR, { aliases: ["centuries"] }),
  ],
};

export default category;
