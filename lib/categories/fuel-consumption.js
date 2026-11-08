import { linear, inverse } from "./helpers.js";

// FUEL CONSUMPTION (base: litres per 100 km).
// Distance-per-fuel units are inverse: L/100 km = factor ÷ value.
//   km/L:     100 ÷ value
//   mpg (US): 100 × 3.785411784 / 1.609344 ÷ value  (235.2145833...)
//   mpg (UK): 100 × 4.54609 / 1.609344 ÷ value      (282.4809363...)
const MILE_KM = 1.609344;

const category = {
  id: "fuel-consumption",
  name: "Fuel consumption",
  group: "common",
  baseUnit: "l-100km",
  defaultFrom: "mpg-us",
  defaultTo: "l-100km",
  intro:
    "Fuel consumption shows how much fuel a vehicle uses. Europe and many other countries use litres per 100 km (lower is better), while the US and UK use miles per gallon and some countries use km per litre (higher is better).",
  units: [
    linear("l-100km", "Litres per 100 km", "L/100 km", 1, { aliases: ["l/100km", "liters per 100 km"] }),
    inverse("km-l", "Kilometers per litre", "km/L", 100, { aliases: ["kmpl", "km per liter"] }),
    inverse("mpg-us", "Miles per gallon (US)", "mpg (US)", (100 * 3.785411784) / MILE_KM, { aliases: ["mpg", "us mpg"] }),
    inverse("mpg-uk", "Miles per gallon (UK)", "mpg (UK)", (100 * 4.54609) / MILE_KM, { aliases: ["uk mpg", "imperial mpg"] }),
  ],
};

export default category;
