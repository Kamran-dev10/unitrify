import { inverse, linear } from "./helpers.js";

// FREQUENCY AND WAVELENGTH (base: hertz). Wavelengths are INVERSE units: Hz = c ÷ wavelength, with c = 299,792,458 m/s (exact), for light and radio waves in a vacuum.
const category = {
  id: "frequency-wavelength",
  name: "Frequency and wavelength",
  group: "light",
  baseUnit: "hz",
  defaultFrom: "nm",
  defaultTo: "thz",
  intro:
    "Frequency and wavelength describe the same light or radio wave: frequency = speed of light ÷ wavelength. Radio uses Hz, kHz and MHz, while optics and lasers use nm and µm; values are for a vacuum.",
  units: [
    linear("hz", "Hertz", "Hz", 1, { aliases: ["hertz", "cycles per second"] }),
    linear("khz", "Kilohertz", "kHz", 1e3, { aliases: ["kilohertz"] }),
    linear("mhz", "Megahertz", "MHz", 1e6, { aliases: ["megahertz"] }),
    linear("ghz", "Gigahertz", "GHz", 1e9, { aliases: ["gigahertz"] }),
    linear("thz", "Terahertz", "THz", 1e12, { aliases: ["terahertz"] }),
    inverse("m", "Wavelength in meters", "m", 299792458, { aliases: ["meters", "metres", "wavelength m"] }),
    inverse("cm", "Wavelength in centimeters", "cm", 299792458 * 100, { aliases: ["centimeters", "wavelength cm"] }),
    inverse("mm", "Wavelength in millimeters", "mm", 299792458 * 1e3, { aliases: ["millimeters", "wavelength mm"] }),
    inverse("um", "Wavelength in micrometers", "µm", 299792458 * 1e6, { aliases: ["micrometers", "microns", "wavelength um"] }),
    inverse("nm", "Wavelength in nanometers", "nm", 299792458 * 1e9, { aliases: ["nanometers", "wavelength nm"] }),
  ],
};

export default category;
