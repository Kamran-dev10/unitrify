import { linear } from "./helpers.js";

// LENGTH (base: meter). Fathom, chain, rod and furlong use the international
// foot (0.3048 m); NIST SP 811 still lists U.S. survey foot values for them.
const category = {
  id: "length",
  name: "Length",
  group: "common",
  baseUnit: "m",
  defaultFrom: "m",
  defaultTo: "foot",
  intro:
    "Length measures distance, from the size of an atom to the distance between stars. Convert between metric units (nanometers to kilometers), imperial units (inches, feet, yards, miles), nautical miles for sea and air travel, and astronomical units and light years for space.",
  units: [
    linear("nm", "Nanometer", "nm", 1e-9, { aliases: ["nanometers", "nanometres"] }),
    linear("um", "Micrometer", "µm", 1e-6, { aliases: ["micrometers", "micron", "microns"] }),
    linear("mm", "Millimeter", "mm", 0.001, { aliases: ["millimeters", "millimetres", "millimetre"] }),
    linear("cm", "Centimeter", "cm", 0.01, { aliases: ["centimeters", "centimetres", "centimetre"] }),
    linear("dm", "Decimeter", "dm", 0.1, { aliases: ["decimeters", "decimetres"] }),
    linear("m", "Meter", "m", 1, { aliases: ["meters", "metres", "metre"] }),
    linear("km", "Kilometer", "km", 1000, { aliases: ["kilometers", "kilometres", "kilometre"] }),
    linear("mil", "Mil (thou)", "mil", 2.54e-5, { aliases: ["thou", "thousandth of an inch"] }),
    linear("inch", "Inch", "in", 0.0254, { aliases: ["inches", '"'] }),
    linear("hand", "Hand", "hh", 0.1016, { aliases: ["hands"] }),
    linear("foot", "Foot", "ft", 0.3048, { aliases: ["feet", "'"] }),
    linear("yard", "Yard", "yd", 0.9144, { aliases: ["yards", "gaz"] }),
    linear("fathom", "Fathom", "ftm", 1.8288, { aliases: ["fathoms"] }),
    linear("rod", "Rod", "rd", 5.0292, { aliases: ["rods", "pole", "perch"] }),
    linear("chain", "Chain", "ch", 20.1168, { aliases: ["chains"] }),
    linear("furlong", "Furlong", "fur", 201.168, { aliases: ["furlongs"] }),
    linear("mile", "Mile", "mi", 1609.344, { aliases: ["miles"] }),
    linear("nautical-mile", "Nautical mile", "NM", 1852, { aliases: ["nautical miles", "nmi"] }),
    linear("angstrom", "Ångström", "Å", 1e-10, { aliases: ["angstrom", "angstroms"] }),
    linear("au", "Astronomical unit", "au", 149597870700, { aliases: ["astronomical units", "AU"] }),
    linear("light-year", "Light year", "ly", 9.4607304725808e15, { aliases: ["light years", "lightyear"] }),
  ],
};

export default category;
