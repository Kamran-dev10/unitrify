import { linear } from "./helpers.js";

// TEMPERATURE INTERVAL (base: kelvin). LINEAR, not affine: this converts a
// change in temperature, so there is no offset (a change of 1 °C = 1.8 °F).
const category = {
  id: "temperature-interval",
  name: "Temperature difference",
  group: "heat",
  baseUnit: "delta-k",
  defaultFrom: "delta-c",
  defaultTo: "delta-f",
  allowNegative: true,
  intro:
    "This converts a change or difference in temperature, not a reading. A rise of 1 °C is a rise of 1.8 °F, while a reading of 1 °C is 33.8 °F, so use the temperature converter for readings and this one for differences.",
  units: [
    linear("delta-k", "Kelvin (difference)", "ΔK", 1, { aliases: ["kelvin difference", "delta k"] }),
    linear("delta-c", "Degree Celsius (difference)", "Δ°C", 1, { aliases: ["celsius difference", "delta c"] }),
    linear("delta-f", "Degree Fahrenheit (difference)", "Δ°F", 5 / 9, { aliases: ["fahrenheit difference", "delta f"] }),
    linear("delta-r", "Degree Rankine (difference)", "Δ°R", 5 / 9, { aliases: ["rankine difference", "delta r"] }),
    linear("delta-re", "Degree Réaumur (difference)", "Δ°Ré", 1.25, { aliases: ["reaumur difference", "delta re"] }),
  ],
};

export default category;
