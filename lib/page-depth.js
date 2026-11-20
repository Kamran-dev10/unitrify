// Extra depth for pages that were thin (see the "Indexing fix" audit in
// REVIEW.md). Keyed by URL path, merged into the page data:
//   pair pages      (lib/pages.js)  usage, examples, tableRowSet, faqs, compound, updated
//   number pages    (lib/tools.js)  usage, steps, worked, examples (table), faqs, updated
//   category pages  (lib/categories.js) about (paragraphs), updated
//
// Every number is calculated by the engine, so the text always matches the
// converter. Facts are limited to definitions and well-known reference values.

import { convert, formatResult } from "./convert.js";
import { formatFeetInches, formatPoundsOunces, formatSmart, prettyNumber } from "./engine.js";
import { convertBase } from "./number-base.js";

// n(5, "mile", "km", "length") -> "8.0467"; sm() shows tiny/huge values as "5 × 10⁻⁵".
const n = (value, from, to, category) => formatResult(convert(value, from, to, category));
const sm = (value, from, to, category) => prettyNumber(formatSmart(convert(value, from, to, category)));
const ftIn = (meters) => formatFeetInches(convert(meters, "m", "inch", "length"));
const lbOz = (ounces) => formatPoundsOunces(convert(ounces, "ounce", "ounce", "weight"));
const base = (text, from, to) => convertBase(text, from, to).value;

const UPDATED = "2026-11-20";

// ------------------------------------------------------------------ PAIR PAGES

const PAIRS = {
  "/length/meter-to-feet": {
    usage:
      "Meters to feet comes up whenever metric sizes meet people who think in feet: room and plot dimensions from architects, ceiling heights, swimming pool lengths, and a person's height on a form. The answer is also shown in feet and inches, which is how heights are usually said.",
    compound: "feet-inches",
    examples: [
      `A 2.7 m ceiling: 2.7 ÷ 0.3048 = ${n(2.7, "m", "foot", "length")} ft, or ${ftIn(2.7)}`,
      `A person 1.75 m tall: ${n(1.75, "m", "foot", "length")} ft, or ${ftIn(1.75)}`,
      `A 25 m swimming pool: ${n(25, "m", "foot", "length")} ft`,
    ],
    tableRowSet: [0.5, 1, 1.5, 1.6, 1.7, 1.8, 1.9, 2, 2.5, 3, 5, 10, 20, 25, 50, 100],
    faqs: [
      { question: "How many feet in 1 meter?", answer: `1 meter is ${n(1, "m", "foot", "length")} feet, or ${ftIn(1)}.` },
      { question: "How tall is 1.8 m in feet and inches?", answer: `1.8 m is ${n(1.8, "m", "foot", "length")} ft, which is ${ftIn(1.8)}.` },
      { question: "How many feet is 10 meters?", answer: `10 meters is ${n(10, "m", "foot", "length")} feet.` },
      { question: "Why divide by 0.3048?", answer: "Because the foot is defined as exactly 0.3048 m (since 1959), so meters ÷ 0.3048 gives feet with no rounding in the factor." },
    ],
  },

  "/weight/tola-to-gram": {
    usage:
      "The tola is the traditional unit for gold and silver in Pakistan and India, and jewelers there quote gold rates per tola. International prices are per gram or per troy ounce, so converting tola to grams lets you compare a local rate with a world price.",
    examples: [
      `1 tola = ${n(1, "tola", "g", "weight")} g (180 grains)`,
      `A 10 tola gold bar: 10 × ${n(1, "tola", "g", "weight")} = ${n(10, "tola", "g", "weight")} g`,
      `2.5 tola of jewelry: ${n(2.5, "tola", "g", "weight")} g`,
    ],
    tableRowSet: [0.25, 0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 10, 20, 50, 100],
    faqs: [
      { question: "How many grams in 1 tola?", answer: `1 tola is ${n(1, "tola", "g", "weight")} g, which is exactly 180 grains.` },
      { question: "How many grams is a 10 tola gold bar?", answer: `A 10 tola bar weighs ${n(10, "tola", "g", "weight")} g, or ${n(10, "tola", "troy-ounce", "weight")} troy ounces.` },
      {
        question: "How do I compare a per-tola gold rate with a per-gram rate?",
        answer: `Divide the tola rate by ${n(1, "tola", "g", "weight")}, the grams in one tola. The result is the rate per gram.`,
      },
      {
        question: "Is a tola the same as 10 grams?",
        answer: `No. 1 tola is ${n(1, "tola", "g", "weight")} g, so treating it as 10 g leaves out about ${Math.round(((convert(1, "tola", "g", "weight") - 10) / convert(1, "tola", "g", "weight")) * 100)}% of the weight.`,
      },
    ],
  },

  "/weight/gram-to-tola": {
    usage:
      "Jewelers weigh gold on gram scales, but in Pakistan and India the market rate is quoted per tola. Converting grams to tola tells you what share of the tola rate a ring, chain or bar is worth.",
    examples: [
      `A 5 g ring: 5 ÷ ${n(1, "tola", "g", "weight")} = ${n(5, "g", "tola", "weight")} tola`,
      `A 20 g chain: ${n(20, "g", "tola", "weight")} tola`,
      `A 100 g gold bar: ${n(100, "g", "tola", "weight")} tola`,
    ],
    tableRowSet: [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50, 100, 250, 500, 1000],
    faqs: [
      { question: "How many tola is 1 gram?", answer: `1 gram is ${n(1, "g", "tola", "weight")} tola.` },
      { question: "How many tola is a 100 g gold bar?", answer: `100 g is ${n(100, "g", "tola", "weight")} tola.` },
      { question: "How many grams make half a tola?", answer: `Half a tola is ${n(0.5, "tola", "g", "weight")} g.` },
      {
        question: "How do I price 8 grams of gold from a per-tola rate?",
        answer: `Turn the grams into tola first (8 g = ${n(8, "g", "tola", "weight")} tola), then multiply by the rate per tola.`,
      },
    ],
  },

  "/weight/maund-to-kg": {
    usage:
      "In Pakistan, prices for wheat, rice, sugarcane and cotton are commonly quoted per maund, and farm yields are counted in maunds per acre. Converting to kilograms makes it easy to compare with prices per kilogram or per tonne.",
    examples: [
      `1 maund = ${n(1, "maund", "kg", "weight")} kg`,
      `A wheat yield of 50 maund: ${n(50, "maund", "kg", "weight")} kg (${n(50, "maund", "tonne", "weight")} tonnes)`,
      `25 maund of rice: ${n(25, "maund", "kg", "weight")} kg`,
    ],
    tableRowSet: [0.5, 1, 2, 5, 10, 20, 25, 30, 40, 50, 60, 100],
    faqs: [
      { question: "How many kg in 1 maund?", answer: `1 maund is ${n(1, "maund", "kg", "weight")} kg on this site, the value used in Pakistan today.` },
      { question: "How many kg is 50 maund?", answer: `50 maund is ${n(50, "maund", "kg", "weight")} kg.` },
      { question: "How many maund make 1 tonne?", answer: `1 tonne (1,000 kg) is ${n(1000, "kg", "maund", "weight")} maund.` },
      {
        question: "Was the maund always 40 kg?",
        answer: "No. Older and regional maunds differed; the British Indian maund was 82 2/7 pounds, about 37.32 kg. For old land or trade records, check which maund is meant.",
      },
    ],
  },

  "/temperature/celsius-to-fahrenheit": {
    usage:
      "Weather forecasts, oven settings and body temperature are where most people meet this conversion. Most of the world uses Celsius, while the United States uses Fahrenheit for weather, cooking and fever thermometers.",
    examples: [
      `Body temperature, 37 °C: 37 × 1.8 + 32 = ${n(37, "celsius", "fahrenheit", "temperature")} °F`,
      `An oven at 180 °C: ${n(180, "celsius", "fahrenheit", "temperature")} °F`,
      `A summer day of 25 °C: ${n(25, "celsius", "fahrenheit", "temperature")} °F`,
    ],
    tableRowSet: [-40, -20, -10, 0, 5, 10, 15, 20, 25, 30, 35, 37, 38, 39, 40, 100, 160, 180, 200, 220, 250],
    faqs: [
      { question: "What is normal body temperature in Fahrenheit?", answer: `37 °C is ${n(37, "celsius", "fahrenheit", "temperature")} °F.` },
      {
        question: "What oven temperature is 180 °C in Fahrenheit?",
        answer: `180 °C is ${n(180, "celsius", "fahrenheit", "temperature")} °F. American recipes usually round it to 350 °F.`,
      },
      { question: "At what temperature are Celsius and Fahrenheit equal?", answer: `At -40: -40 °C is ${n(-40, "celsius", "fahrenheit", "temperature")} °F.` },
      {
        question: "Is there a quick way to estimate it?",
        answer: `Double the Celsius value and add 30. For 20 °C that gives 70 °F, close to the exact ${n(20, "celsius", "fahrenheit", "temperature")} °F.`,
      },
    ],
  },

  "/temperature/fahrenheit-to-celsius": {
    usage:
      "Anyone reading an American recipe, weather site or fever thermometer needs Fahrenheit in Celsius. Most other countries, and all scientific work, use Celsius.",
    examples: [
      `Body temperature, 98.6 °F: (98.6 − 32) ÷ 1.8 = ${n(98.6, "fahrenheit", "celsius", "temperature")} °C`,
      `An oven at 350 °F: ${n(350, "fahrenheit", "celsius", "temperature")} °C`,
      `A room at 72 °F: ${n(72, "fahrenheit", "celsius", "temperature")} °C`,
    ],
    tableRowSet: [-40, 0, 10, 20, 32, 40, 50, 60, 68, 70, 72, 75, 80, 90, 98.6, 100, 102, 104, 212, 300, 350, 400, 450],
    faqs: [
      {
        question: "Is 100 °F a fever?",
        answer: `100 °F is ${n(100, "fahrenheit", "celsius", "temperature")} °C. A fever is usually taken as 38 °C (${n(38, "celsius", "fahrenheit", "temperature")} °F) or higher, so 100 °F is just below that.`,
      },
      { question: "What is 350 °F in Celsius?", answer: `350 °F is ${n(350, "fahrenheit", "celsius", "temperature")} °C; metric recipes usually round it to 180 °C.` },
      { question: "What is 0 °F in Celsius?", answer: `0 °F is ${n(0, "fahrenheit", "celsius", "temperature")} °C.` },
      {
        question: "Is there a quick way to estimate it?",
        answer: `Subtract 30 and halve. For 80 °F that gives 25 °C, close to the exact ${n(80, "fahrenheit", "celsius", "temperature")} °C.`,
      },
    ],
  },

  "/temperature/fahrenheit-to-kelvin": {
    usage:
      "Engineers and scientists in the US often receive temperatures in Fahrenheit but need kelvin for gas-law, heat-transfer and radiation formulas. Those formulas only work on an absolute scale, where zero means no thermal energy.",
    examples: [
      `A room at 68 °F: (68 − 32) ÷ 1.8 + 273.15 = ${n(68, "fahrenheit", "kelvin", "temperature")} K`,
      `Water freezing, 32 °F: ${n(32, "fahrenheit", "kelvin", "temperature")} K`,
      `Water boiling, 212 °F: ${n(212, "fahrenheit", "kelvin", "temperature")} K`,
    ],
    tableRowSet: [-459.67, -100, -40, 0, 32, 50, 68, 70, 77, 98.6, 100, 212, 300, 500, 1000],
    faqs: [
      { question: "What is 68 °F in kelvin?", answer: `68 °F is ${n(68, "fahrenheit", "kelvin", "temperature")} K.` },
      { question: "What is absolute zero in Fahrenheit?", answer: `0 K is ${n(0, "kelvin", "fahrenheit", "temperature")} °F.` },
      { question: "What is 0 °F in kelvin?", answer: `0 °F is ${n(0, "fahrenheit", "kelvin", "temperature")} K.` },
      {
        question: "Why can't I use Fahrenheit in the ideal gas law?",
        answer: "PV = nRT needs an absolute temperature, where zero means no thermal energy. 0 °F is not that point, so convert to kelvin (or Rankine) first.",
      },
    ],
  },

  "/radiation-dose/rem-to-msv": {
    usage:
      "US regulations, US dosimetry reports and older textbooks give dose in rem or millirem, while international guidance and most countries use sieverts. Converting rem to mSv lets you compare a US dose record with international figures.",
    examples: [
      `The US yearly limit for radiation workers, 5 rem: ${n(5, "rem", "msv", "radiation-dose")} mSv`,
      `100 mrem (0.1 rem): ${n(0.1, "rem", "msv", "radiation-dose")} mSv`,
      `25 rem: ${n(25, "rem", "msv", "radiation-dose")} mSv`,
    ],
    tableRowSet: [0.01, 0.1, 0.5, 1, 2, 5, 10, 25, 50, 100],
    faqs: [
      { question: "What is 5 rem in mSv?", answer: `5 rem is ${n(5, "rem", "msv", "radiation-dose")} mSv.` },
      { question: "What is 100 mrem in mSv?", answer: `100 mrem is ${n(100, "mrem", "msv", "radiation-dose")} mSv.` },
      {
        question: "Why do US and international documents use different units?",
        answer: "US regulations still use the rem, while the ICRP and most countries use the SI unit, the sievert. The link is exact: 1 rem = 0.01 Sv = 10 mSv.",
      },
      { question: "Is rem the same as roentgen?", answer: "No. The roentgen measures exposure (ionization in air), while the rem measures dose equivalent in the body." },
    ],
  },

  "/radiation-dose/msv-to-rem": {
    usage:
      "Medical imaging reports and international guidance give dose in millisieverts, while US workers' dose records and older US references use rem or millirem. Converting mSv to rem lets you read one in terms of the other.",
    examples: [
      `20 mSv, the ICRP yearly average limit for workers: ${n(20, "msv", "rem", "radiation-dose")} rem`,
      `1 mSv, the ICRP yearly limit for the public: ${n(1, "msv", "mrem", "radiation-dose")} mrem`,
      `50 mSv: ${n(50, "msv", "rem", "radiation-dose")} rem`,
    ],
    tableRowSet: [0.01, 0.1, 0.5, 1, 2, 3, 5, 10, 20, 50, 100, 250, 1000],
    faqs: [
      { question: "What is 1 mSv in millirem?", answer: `1 mSv is ${n(1, "msv", "mrem", "radiation-dose")} mrem.` },
      { question: "What is 20 mSv in rem?", answer: `20 mSv is ${n(20, "msv", "rem", "radiation-dose")} rem.` },
      { question: "What is 50 mSv in rem?", answer: `50 mSv is ${n(50, "msv", "rem", "radiation-dose")} rem.` },
      {
        question: "Is mSv the same as mGy?",
        answer: "Not in general. The gray measures absorbed energy; the sievert weights it by the type of radiation. For X-rays and gamma rays, 1 mGy gives 1 mSv of equivalent dose.",
      },
    ],
  },

  "/volume/ml-to-cup": {
    usage:
      "American recipes measure liquids in cups, while bottles, cartons and metric recipes give milliliters. Converting ml to cups helps when a recipe asks for cups and your jug is marked in ml. This page uses the US cup; some countries use a 250 ml metric cup.",
    examples: [
      `250 ml of milk: 250 ÷ ${n(1, "us-cup", "ml", "volume")} = ${n(250, "ml", "us-cup", "volume")} cups`,
      `A 500 ml bottle: ${n(500, "ml", "us-cup", "volume")} cups`,
      `120 ml of oil: ${n(120, "ml", "us-cup", "volume")} cups`,
    ],
    tableRowSet: [30, 50, 60, 75, 100, 120, 125, 150, 180, 200, 240, 250, 300, 355, 400, 500, 750, 1000],
    faqs: [
      { question: "How many cups is 250 ml?", answer: `250 ml is ${n(250, "ml", "us-cup", "volume")} US cups.` },
      { question: "How many cups is a 500 ml bottle?", answer: `500 ml is ${n(500, "ml", "us-cup", "volume")} US cups.` },
      {
        question: "Is a cup 240 ml or 250 ml?",
        answer: `A US customary cup is ${n(1, "us-cup", "ml", "volume")} ml. US nutrition labels round it to 240 ml, and the metric cup used in some countries is ${n(1, "metric-cup", "ml", "volume")} ml.`,
      },
      { question: "How many ml in half a cup?", answer: `Half a US cup is ${n(0.5, "us-cup", "ml", "volume")} ml.` },
    ],
  },

  "/capacitance/uf-to-pf": {
    usage:
      "Schematics and parts lists often give capacitors in µF, while small ceramic capacitors are marked with three-digit codes in picofarads (104 means 10 followed by 4 zeros, 100,000 pF). Converting µF to pF lets you match a schematic value to the code on the part.",
    examples: [
      `A 0.1 µF decoupling capacitor: ${n(0.1, "uf", "pf", "capacitance")} pF, code 104`,
      `0.01 µF: ${n(0.01, "uf", "pf", "capacitance")} pF, code 103`,
      `0.0047 µF: ${n(0.0047, "uf", "pf", "capacitance")} pF, code 472`,
    ],
    tableRowSet: [0.0001, 0.001, 0.0022, 0.0047, 0.01, 0.022, 0.047, 0.1, 0.22, 0.47, 1, 10],
    faqs: [
      { question: "What is 0.1 µF in pF?", answer: `0.1 µF is ${n(0.1, "uf", "pf", "capacitance")} pF, marked 104 on ceramic capacitors.` },
      {
        question: "How do I read a code like 473?",
        answer: `Take the first two digits and add the third digit as a number of zeros, in pF: 47 followed by 3 zeros is 47,000 pF, which is ${n(47000, "pf", "uf", "capacitance")} µF.`,
      },
      { question: "What is 1 µF in pF?", answer: `1 µF is ${n(1, "uf", "pf", "capacitance")} pF.` },
      { question: "What is 0.022 µF in pF?", answer: `0.022 µF is ${n(0.022, "uf", "pf", "capacitance")} pF, code 223.` },
    ],
  },

  "/viscosity-dynamic/cp-to-pa-s": {
    usage:
      "Centipoise is the traditional unit on paint, adhesive, food and lab data sheets, while SI-based specifications and simulation software use pascal-seconds. Water at about 20 °C is close to 1 cP, which makes the unit easy to picture.",
    examples: [
      `Water at about 20 °C, 1 cP: ${n(1, "cp", "pa-s", "viscosity-dynamic")} Pa·s`,
      `A glue rated 5,000 cP: ${n(5000, "cp", "pa-s", "viscosity-dynamic")} Pa·s`,
      `A product rated 10,000 cP: ${n(10000, "cp", "pa-s", "viscosity-dynamic")} Pa·s`,
    ],
    tableRowSet: [1, 5, 10, 50, 100, 500, 1000, 2000, 5000, 10000, 50000, 100000],
    faqs: [
      { question: "What is 1 cP in Pa·s?", answer: `1 cP is ${n(1, "cp", "pa-s", "viscosity-dynamic")} Pa·s.` },
      { question: "What is 5,000 cP in Pa·s?", answer: `5,000 cP is ${n(5000, "cp", "pa-s", "viscosity-dynamic")} Pa·s.` },
      { question: "Is cP the same as mPa·s?", answer: `Yes. 1 cP is exactly ${n(1, "cp", "mpa-s", "viscosity-dynamic")} mPa·s.` },
      {
        question: "What is the difference between cP and cSt?",
        answer: "cP measures dynamic viscosity (resistance to flow); cSt measures kinematic viscosity (dynamic viscosity divided by density). To go from cP to cSt, divide by the density in g/cm³.",
      },
    ],
  },

  "/viscosity-kinematic/cst-to-mm2-s": {
    usage:
      "Lubricant grades, fuel specifications and hydraulic oil data sheets give kinematic viscosity in centistokes, while SI-style standards write the same value in mm²/s. The two are identical, so converting is mostly about knowing they mean the same thing.",
    examples: [
      `ISO VG 46 hydraulic oil, 46 cSt at 40 °C: ${n(46, "cst", "mm2-s", "viscosity-kinematic")} mm²/s`,
      `Water at about 20 °C, roughly 1 cSt: ${n(1, "cst", "mm2-s", "viscosity-kinematic")} mm²/s, or ${sm(1, "cst", "m2-s", "viscosity-kinematic")} m²/s`,
      `ISO VG 220 gear oil, 220 cSt: ${n(220, "cst", "mm2-s", "viscosity-kinematic")} mm²/s`,
    ],
    tableRowSet: [1, 2, 5, 10, 22, 32, 46, 68, 100, 150, 220, 320, 460, 680, 1000],
    faqs: [
      { question: "What is 46 cSt in mm²/s?", answer: `46 cSt is ${n(46, "cst", "mm2-s", "viscosity-kinematic")} mm²/s; the numbers are always the same.` },
      { question: "What is 1 cSt in m²/s?", answer: `1 cSt is ${sm(1, "cst", "m2-s", "viscosity-kinematic")} m²/s.` },
      {
        question: "What does ISO VG 68 mean?",
        answer: "An oil whose kinematic viscosity at 40 °C is 68 cSt (68 mm²/s) on average, within ±10% (61.2 to 74.8 cSt).",
      },
      { question: "What is 100 cSt in stokes?", answer: `100 cSt is ${n(100, "cst", "stokes", "viscosity-kinematic")} St.` },
    ],
  },

  "/illuminance/lux-to-foot-candles": {
    usage:
      "Lighting plans outside the US are written in lux, while many US specifications and light meters report foot-candles. Converting lux to foot-candles lets you check a metric lighting design against a US requirement.",
    examples: [
      `An office at 500 lux: 500 ÷ 10.764 = ${n(500, "lux", "fc", "illuminance")} fc`,
      `A classroom at 300 lux: ${n(300, "lux", "fc", "illuminance")} fc`,
      `Bright sunlight, about 100,000 lux: ${n(100000, "lux", "fc", "illuminance")} fc`,
    ],
    tableRowSet: [1, 10, 50, 100, 150, 200, 300, 400, 500, 750, 1000, 2000, 10000, 100000],
    faqs: [
      { question: "What is 500 lux in foot-candles?", answer: `500 lux is ${n(500, "lux", "fc", "illuminance")} fc.` },
      { question: "What is 300 lux in foot-candles?", answer: `300 lux is ${n(300, "lux", "fc", "illuminance")} fc.` },
      {
        question: "Why 10.764?",
        answer: `A foot-candle is one lumen per square foot and a lux is one lumen per square meter. A square meter is ${n(1, "fc", "lux", "illuminance")} square feet, so 1 fc = ${n(1, "fc", "lux", "illuminance")} lux.`,
      },
      { question: "Is lux the same as lumens?", answer: "No. Lumens measure the total light from a source; lux measures how much of it lands on each square meter of a surface." },
    ],
  },

  "/illuminance/foot-candles-to-lux": {
    usage:
      "US lighting guides and older light meters give foot-candles, while European standards and most workplace rules elsewhere use lux. Converting foot-candles to lux turns a US lighting spec into a metric one.",
    examples: [
      `50 fc for an office: 50 × 10.764 = ${n(50, "fc", "lux", "illuminance")} lux`,
      `30 fc for a corridor: ${n(30, "fc", "lux", "illuminance")} lux`,
      `10 fc: ${n(10, "fc", "lux", "illuminance")} lux`,
    ],
    tableRowSet: [1, 5, 10, 20, 30, 40, 50, 75, 100, 200, 500, 1000],
    faqs: [
      { question: "What is 50 fc in lux?", answer: `50 fc is ${n(50, "fc", "lux", "illuminance")} lux.` },
      { question: "What is 30 fc in lux?", answer: `30 fc is ${n(30, "fc", "lux", "illuminance")} lux.` },
      { question: "What is 100 fc in lux?", answer: `100 fc is ${n(100, "fc", "lux", "illuminance")} lux.` },
      { question: "How bright is 1 foot-candle?", answer: `One lumen spread evenly over one square foot, which is ${n(1, "fc", "lux", "illuminance")} lux, a dim indoor level.` },
    ],
  },

  "/length/feet-to-meters": {
    usage:
      "Building plans, ceiling heights, aircraft altitude and diving depths are often given in feet in the US and UK, while engineering and most countries use meters. It is also how a height in feet becomes a metric value on a form.",
    examples: [
      `An 8 ft ceiling: 8 × 0.3048 = ${n(8, "foot", "m", "length")} m`,
      `A cruising altitude of 35,000 ft: ${n(35000, "foot", "m", "length")} m`,
      `A person 6 ft tall: ${n(6, "foot", "m", "length")} m`,
    ],
    tableRowSet: [1, 2, 3, 4, 5, 5.5, 6, 6.5, 7, 8, 9, 10, 12, 15, 20, 25, 30, 50, 100, 1000, 10000, 35000],
    faqs: [
      { question: "How many meters is 10 feet?", answer: `10 feet is ${n(10, "foot", "m", "length")} m.` },
      { question: "How many meters is 100 feet?", answer: `100 feet is ${n(100, "foot", "m", "length")} m.` },
      { question: "How high is 35,000 feet in meters?", answer: `35,000 ft is ${n(35000, "foot", "m", "length")} m, about ${n(35000, "foot", "km", "length")} km.` },
      { question: "Is a foot exactly 0.3048 m?", answer: "Yes. Since 1959 the international foot has been defined as exactly 0.3048 m." },
    ],
  },

  "/weight/ounces-to-pounds": {
    usage:
      "In the US, food packages, parcel weights and baby weights are given in ounces, while scales and shipping rates switch to pounds above 16 oz. The answer is also shown as pounds and ounces, the way a scale reads.",
    compound: "pounds-ounces",
    examples: [
      `A 12 oz can: 12 ÷ 16 = ${n(12, "ounce", "pound", "weight")} lb`,
      `A 24 oz jar: ${n(24, "ounce", "pound", "weight")} lb`,
      `A 70 oz parcel: ${n(70, "ounce", "pound", "weight")} lb, or ${lbOz(70)}`,
    ],
    tableRowSet: [1, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 32, 40, 48, 64, 80, 100, 128, 160],
    faqs: [
      { question: "How many pounds is 24 oz?", answer: `24 oz is ${n(24, "ounce", "pound", "weight")} lb.` },
      { question: "Is 8 oz half a pound?", answer: `Yes. 8 oz is ${n(8, "ounce", "pound", "weight")} lb.` },
      { question: "How do I write 70 oz in pounds and ounces?", answer: `70 oz is ${lbOz(70)}.` },
      {
        question: "Are these the same ounces as fluid ounces?",
        answer: `No. These are weight ounces (${n(1, "ounce", "g", "weight")} g each). Fluid ounces measure volume.`,
      },
    ],
  },

  "/electric-potential/v-to-kv": {
    usage:
      "Power distribution, cable insulation ratings and high-voltage test equipment are specified in kilovolts, while household and electronics work stays in volts. Converting V to kV makes it easy to compare a supply voltage with a cable or insulator rating.",
    examples: [
      `A 230 V household supply: ${n(230, "v", "kv", "electric-potential")} kV`,
      `An 11,000 V distribution line: ${n(11000, "v", "kv", "electric-potential")} kV`,
      `A 400 V three-phase supply: ${n(400, "v", "kv", "electric-potential")} kV`,
    ],
    tableRowSet: [100, 110, 120, 220, 230, 240, 380, 400, 415, 480, 600, 1000, 1500, 3300, 6600, 11000, 33000, 66000, 132000, 220000],
    faqs: [
      { question: "What is 230 V in kV?", answer: `230 V is ${n(230, "v", "kv", "electric-potential")} kV.` },
      { question: "What is 11,000 V in kV?", answer: `11,000 V is ${n(11000, "v", "kv", "electric-potential")} kV.` },
      { question: "What is 1,500 V in kV?", answer: `1,500 V is ${n(1500, "v", "kv", "electric-potential")} kV.` },
      { question: "How many volts are in 1 kV?", answer: `1 kV is ${n(1, "kv", "v", "electric-potential")} V.` },
    ],
  },

  "/magnetic-flux-density/gauss-to-tesla": {
    usage:
      "Magnet suppliers, gaussmeters and older physics texts give flux density in gauss, while SI papers, MRI specifications and engineering standards use tesla. Converting gauss to tesla lets you compare a magnet's rating with MRI fields or sensor ranges.",
    examples: [
      `The Earth's field, about 0.5 G: ${sm(0.5, "gauss", "t", "magnetic-flux-density")} T (${n(0.5, "gauss", "ut", "magnetic-flux-density")} µT)`,
      `A magnet rated 5,000 G: ${n(5000, "gauss", "t", "magnetic-flux-density")} T`,
      `15,000 G, the field of a common MRI scanner: ${n(15000, "gauss", "t", "magnetic-flux-density")} T`,
    ],
    tableRowSet: [1, 10, 50, 100, 200, 500, 1000, 2000, 3000, 5000, 10000, 15000, 30000],
    faqs: [
      { question: "What is 5,000 gauss in tesla?", answer: `5,000 G is ${n(5000, "gauss", "t", "magnetic-flux-density")} T.` },
      { question: "What is 1 gauss in millitesla?", answer: `1 G is ${n(1, "gauss", "mt", "magnetic-flux-density")} mT.` },
      { question: "How strong is a 1.5 T MRI in gauss?", answer: `1.5 T is ${n(1.5, "t", "gauss", "magnetic-flux-density")} G.` },
      {
        question: "How strong is the Earth's magnetic field?",
        answer: `About 0.25 to 0.65 G at the surface, which is ${n(0.25, "gauss", "ut", "magnetic-flux-density")} to ${n(0.65, "gauss", "ut", "magnetic-flux-density")} µT.`,
      },
    ],
  },

  "/time/days-to-hours": {
    usage:
      "Rental periods, hospital stays, project estimates and delivery times are given in days. Billing, shift planning and dosing schedules often run in hours instead.",
    examples: [
      `A 3-day car rental: 3 × 24 = ${n(3, "day", "h", "time")} hours`,
      `A 14-day project: ${n(14, "day", "h", "time")} hours`,
      `2.5 days: ${n(2.5, "day", "h", "time")} hours`,
    ],
    tableRowSet: [0.25, 0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 7, 10, 14, 21, 28, 30, 31, 60, 90, 365],
    faqs: [
      { question: "How many hours are in a week?", answer: `A week (7 days) has ${n(7, "day", "h", "time")} hours.` },
      { question: "How many hours is 1.5 days?", answer: `1.5 days is ${n(1.5, "day", "h", "time")} hours.` },
      { question: "How many hours are in a 30-day month?", answer: `30 days is ${n(30, "day", "h", "time")} hours.` },
      { question: "How many hours are in a year?", answer: `A 365-day year has ${n(365, "day", "h", "time")} hours; a leap year has ${n(366, "day", "h", "time")}.` },
    ],
  },

  "/time/hours-to-minutes": {
    usage:
      "Timesheets and payroll often record time in decimal hours, such as 7.75 h, while clocks, cooking and travel plans use minutes. Converting hours to minutes turns a decimal like 1.2 h into something you can read on a clock.",
    examples: [
      `A 7.75-hour shift: 7.75 × 60 = ${n(7.75, "h", "min", "time")} minutes`,
      `1.2 hours: ${n(1.2, "h", "min", "time")} minutes, which is 1 h 12 min`,
      `A quarter of an hour, 0.25 h: ${n(0.25, "h", "min", "time")} minutes`,
    ],
    tableRowSet: [0.1, 0.2, 0.25, 0.3, 0.5, 0.75, 1, 1.2, 1.25, 1.5, 1.75, 2, 2.5, 3, 4, 5, 6, 7.5, 8, 10, 12, 24],
    faqs: [
      { question: "How many minutes is 2.5 hours?", answer: `2.5 hours is ${n(2.5, "h", "min", "time")} minutes.` },
      { question: "How many minutes is 1.75 hours?", answer: `1.75 hours is ${n(1.75, "h", "min", "time")} minutes (1 h 45 min).` },
      { question: "How do I write 1.2 hours in hours and minutes?", answer: `Keep the 1 hour and multiply the 0.2 by 60: ${n(0.2, "h", "min", "time")} minutes, so 1 h 12 min.` },
      { question: "How many minutes are in a day?", answer: `A day has ${n(1, "day", "min", "time")} minutes.` },
    ],
  },

  "/data-storage/tb-to-gb": {
    usage:
      "Hard drives, SSDs, cloud plans and backup software mix TB and GB. Drive makers count 1 TB as 1,000 GB, while Windows reports sizes in binary units (GiB, labeled GB), which is why a new drive looks smaller than its label.",
    examples: [
      `A 2 TB drive: 2 × 1,000 = ${n(2, "tb", "gb", "data-storage")} GB`,
      `A 0.5 TB SSD: ${n(0.5, "tb", "gb", "data-storage")} GB`,
      `A 4 TB drive: ${n(4, "tb", "gb", "data-storage")} GB, shown by Windows as about ${n(4, "tb", "gib", "data-storage")} GiB`,
    ],
    tableRowSet: [0.25, 0.5, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 18, 20, 24],
    faqs: [
      { question: "How many GB is 2 TB?", answer: `2 TB is ${n(2, "tb", "gb", "data-storage")} GB.` },
      {
        question: "Why does my 1 TB drive show about 931 GB?",
        answer: `Windows divides by 1,024 instead of 1,000 and calls the result GB. 1 TB is ${n(1, "tb", "gib", "data-storage")} GiB, so no space is missing.`,
      },
      { question: "How many GiB does a 4 TB drive show?", answer: `About ${n(4, "tb", "gib", "data-storage")} GiB.` },
      { question: "How many 4 GB films fit on 1 TB?", answer: `1 TB is ${n(1, "tb", "gb", "data-storage")} GB, so ${formatResult(convert(1, "tb", "gb", "data-storage") / 4)} films of 4 GB each.` },
    ],
  },

  "/data-storage/kb-to-mb": {
    usage:
      "Upload limits on forms and email services are given in MB, while file managers, cameras and document tools often show sizes in kB. Converting kB to MB tells you whether a photo or PDF will fit under a limit.",
    examples: [
      `An 850 kB photo: 850 ÷ 1,000 = ${n(850, "kb", "mb", "data-storage")} MB`,
      `A 2,500 kB PDF: ${n(2500, "kb", "mb", "data-storage")} MB`,
      `A 300 kB scan: ${n(300, "kb", "mb", "data-storage")} MB`,
    ],
    tableRowSet: [10, 50, 100, 200, 250, 300, 500, 750, 1000, 1500, 2000, 2500, 5000, 10000, 25000],
    faqs: [
      { question: "How many MB is 500 kB?", answer: `500 kB is ${n(500, "kb", "mb", "data-storage")} MB.` },
      { question: "Will a 2,500 kB file fit under a 2 MB upload limit?", answer: `No. 2,500 kB is ${n(2500, "kb", "mb", "data-storage")} MB, which is over 2 MB.` },
      { question: "Is it kB or KB?", answer: "In SI units the kilo prefix is a lowercase k, so kB means 1,000 bytes. KB is sometimes used for 1,024 bytes, now written KiB." },
      {
        question: "Why does my computer show a different size?",
        answer: `Windows divides by 1,024 (KiB, MiB) but labels the result KB and MB. A 2,500 kB file is ${n(2500, "kb", "mib", "data-storage")} MiB, so it shows as about that many "MB".`,
      },
    ],
  },

  "/typography/rem-to-px": {
    usage:
      "CSS frameworks and design systems set font sizes, spacing and breakpoints in rem so they scale with the reader's browser setting, while design files are usually drawn in px. Converting rem to px tells you what a value looks like at the default 16 px base.",
    examples: [
      `A 1.5rem heading at a 16 px base: 1.5 × 16 = ${n(1.5, "rem", "px", "typography")} px`,
      `0.875rem body text: ${n(0.875, "rem", "px", "typography")} px`,
      `3rem of spacing: ${n(3, "rem", "px", "typography")} px`,
    ],
    tableRowSet: [0.125, 0.25, 0.5, 0.625, 0.75, 0.875, 1, 1.125, 1.25, 1.5, 1.75, 2, 2.5, 3, 4, 5, 6],
    faqs: [
      { question: "What is 2 rem in px?", answer: `With the usual 16 px base, 2 rem is ${n(2, "rem", "px", "typography")} px.` },
      { question: "What is 0.75 rem in px?", answer: `0.75 rem is ${n(0.75, "rem", "px", "typography")} px at a 16 px base.` },
      { question: "Is rem the same as em?", answer: "No. rem is relative to the root (html) font size; em is relative to the font size of the element itself, so em values compound when nested." },
      { question: "What if the reader changes the browser font size?", answer: "rem follows it: with a 20 px base, 1 rem is 20 px. Choose a different base font above the converter to see the effect." },
    ],
  },

  "/volume-dry/bushels-to-liters": {
    usage:
      "US grain markets, crop yields (bushels per acre) and farm storage bins are measured in bushels, while metric countries and shipping use liters, cubic meters or tonnes. A bushel is a volume; its weight depends on the crop.",
    examples: [
      `1 US bushel = ${n(1, "us-bushel", "litre", "volume-dry")} L`,
      `50 bushels: ${n(50, "us-bushel", "litre", "volume-dry")} L`,
      `A 1,000 bushel storage bin: ${n(1000, "us-bushel", "litre", "volume-dry")} L, about ${n(1000, "us-bushel", "cubic-m", "volume-dry")} m³`,
    ],
    tableRowSet: [0.25, 0.5, 1, 2, 5, 10, 20, 25, 50, 100, 250, 500, 1000],
    faqs: [
      { question: "How many liters is 10 US bushels?", answer: `10 US bushels is ${n(10, "us-bushel", "litre", "volume-dry")} L.` },
      { question: "How many liters is a UK bushel?", answer: `A UK (imperial) bushel is ${n(1, "uk-bushel", "litre", "volume-dry")} L, a little larger than the US bushel.` },
      { question: "How many cubic meters is 1,000 US bushels?", answer: `1,000 US bushels is ${n(1000, "us-bushel", "cubic-m", "volume-dry")} m³.` },
      {
        question: "Can I convert bushels to kilograms?",
        answer: "Not with one factor. A bushel is a volume, and the weight depends on the crop, so grain markets use a standard weight per bushel for each grain.",
      },
    ],
  },

  "/electric-conductivity/ms-cm-to-us-cm": {
    usage:
      "Hydroponic and aquarium meters, soil labs and irrigation water reports often give electrical conductivity in mS/cm. Drinking water tests and lab instruments use µS/cm, which suits lower readings.",
    examples: [
      `A hydroponic nutrient solution at 1.8 mS/cm: ${n(1.8, "ms-cm", "us-cm", "electric-conductivity")} µS/cm`,
      `Tap water reading 0.5 mS/cm: ${n(0.5, "ms-cm", "us-cm", "electric-conductivity")} µS/cm`,
      `Seawater, about 50 mS/cm: ${n(50, "ms-cm", "us-cm", "electric-conductivity")} µS/cm`,
    ],
    tableRowSet: [0.05, 0.1, 0.2, 0.5, 0.8, 1, 1.2, 1.5, 1.8, 2, 2.5, 3, 5, 10, 50],
    faqs: [
      { question: "What is 2.5 mS/cm in µS/cm?", answer: `2.5 mS/cm is ${n(2.5, "ms-cm", "us-cm", "electric-conductivity")} µS/cm.` },
      { question: "What is 0.8 mS/cm in µS/cm?", answer: `0.8 mS/cm is ${n(0.8, "ms-cm", "us-cm", "electric-conductivity")} µS/cm.` },
      { question: "Is mS/cm the same as dS/m?", answer: "Yes. 1 dS/m equals 1 mS/cm, which is why soil and irrigation reports use the two interchangeably." },
      {
        question: "Can I turn mS/cm into ppm?",
        answer: "Only approximately. Meters multiply conductivity by a conversion factor (often 0.5 or 0.7) to estimate dissolved solids, so ppm readings differ between meters.",
      },
    ],
  },

  "/frequency-wavelength/mhz-to-meters": {
    usage:
      "Radio amateurs name bands by wavelength (the 20 m band is around 14 MHz) and cut antennas from it, while FM broadcast, Wi-Fi and mobile networks are given in MHz. Wavelength in meters is about 299.79 divided by the frequency in MHz.",
    examples: [
      `14.2 MHz in the 20 m band: ${n(14.2, "mhz", "m", "frequency-wavelength")} m`,
      `7.1 MHz in the 40 m band: ${n(7.1, "mhz", "m", "frequency-wavelength")} m`,
      `FM radio at 100 MHz: ${n(100, "mhz", "m", "frequency-wavelength")} m`,
    ],
    tableRowSet: [1.8, 3.5, 7, 10.1, 14, 18.1, 21, 24.9, 28, 50, 100, 144, 146, 430, 446, 900, 2400],
    faqs: [
      { question: "What wavelength is 14 MHz?", answer: `14 MHz is ${n(14, "mhz", "m", "frequency-wavelength")} m.` },
      {
        question: "How long is a half-wave antenna for 146 MHz?",
        answer: `Half of ${n(146, "mhz", "m", "frequency-wavelength")} m is ${formatResult(convert(146, "mhz", "m", "frequency-wavelength") / 2)} m. Real dipoles are cut a few percent shorter, then trimmed.`,
      },
      { question: "Why is 7 MHz called the 40 m band?", answer: `7 MHz is ${n(7, "mhz", "m", "frequency-wavelength")} m; bands are named by a round wavelength.` },
      { question: "What wavelength is FM radio?", answer: `FM broadcast runs from about 88 to 108 MHz, which is ${n(108, "mhz", "m", "frequency-wavelength")} to ${n(88, "mhz", "m", "frequency-wavelength")} m.` },
    ],
  },

  "/volume-lumber/board-feet-to-cubic-feet": {
    usage:
      "Hardwood lumber in the US and Canada is priced and sold by the board foot, while shipping, kiln capacity and log volumes are given in cubic feet or cubic meters. A board foot is 1 ft × 1 ft × 1 in, one twelfth of a cubic foot.",
    examples: [
      `A 2 × 6 board, 10 ft long: 2 × 6 × 10 ÷ 12 = 10 board feet, which is ${n(10, "board-foot", "ft3", "volume-lumber")} ft³`,
      `1,000 board feet (1 MBF): ${n(1000, "board-foot", "ft3", "volume-lumber")} ft³`,
      `144 board feet: ${n(144, "board-foot", "ft3", "volume-lumber")} ft³`,
    ],
    tableRowSet: [1, 10, 12, 24, 50, 100, 144, 250, 500, 1000, 5000, 10000],
    faqs: [
      { question: "What is 1,000 board feet in cubic feet?", answer: `1,000 board feet is ${n(1000, "board-foot", "ft3", "volume-lumber")} ft³.` },
      { question: "How do I find the board feet of a board?", answer: "Multiply thickness (inches) × width (inches) × length (feet), then divide by 12." },
      { question: "What is 1 board foot in cubic meters?", answer: `1 board foot is ${sm(1, "board-foot", "m3", "volume-lumber")} m³.` },
      {
        question: "Are board feet nominal or actual size?",
        answer: "Hardwood is usually measured at its actual rough size, while softwood dimension lumber is often counted at nominal size. Check how your supplier measures.",
      },
    ],
  },
  // ---------------------------------------------------------------- round 2

  "/capacitance/nf-to-pf": {
    usage:
      "Filter, timing and radio circuits use ceramic capacitors of roughly 1 to 100 nF, and European schematics often write them in nF (4n7 = 4.7 nF). The parts themselves carry three-digit codes in picofarads, so converting nF to pF tells you which code to look for.",
    examples: [
      `4.7 nF: 4.7 × 1,000 = ${n(4.7, "nf", "pf", "capacitance")} pF, code 472`,
      `10 nF: ${n(10, "nf", "pf", "capacitance")} pF, code 103`,
      `2.2 nF: ${n(2.2, "nf", "pf", "capacitance")} pF, code 222`,
    ],
    tableRowSet: [0.01, 0.022, 0.047, 0.1, 0.22, 0.47, 1, 2.2, 4.7, 10, 22, 47, 100, 220, 470, 1000],
    faqs: [
      { question: "What is 4.7 nF in pF?", answer: `4.7 nF is ${n(4.7, "nf", "pf", "capacitance")} pF.` },
      { question: "What does 472 mean on a capacitor?", answer: `47 followed by 2 zeros: 4,700 pF, which is ${n(4700, "pf", "nf", "capacitance")} nF.` },
      { question: "What is 100 nF in pF?", answer: `100 nF is ${n(100, "nf", "pf", "capacitance")} pF, the same as ${n(100, "nf", "uf", "capacitance")} µF.` },
      {
        question: "Why do some schematics write 4n7?",
        answer: "It means 4.7 nF. In this style (IEC 60062) the unit letter takes the place of the decimal point, so the value cannot be misread if a dot is lost when a drawing is copied.",
      },
    ],
  },

  "/torque/in-lbs-to-nm": {
    usage:
      "Small fasteners on bicycles, scope mounts, electronics and small engines are torqued in inch-pounds in US manuals. European manuals and many dual-scale torque wrenches use newton-meters, so converting keeps you within the maker's limit.",
    examples: [
      `A 50 in-lb spec: 50 × 0.113 = ${n(50, "lbf-in", "n-m", "torque")} N·m`,
      `A 25 in-lb spec: ${n(25, "lbf-in", "n-m", "torque")} N·m`,
      `120 in-lb: ${n(120, "lbf-in", "n-m", "torque")} N·m, which is ${n(120, "lbf-in", "lbf-ft", "torque")} ft-lb`,
    ],
    tableRowSet: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 75, 100, 120, 150, 200],
    faqs: [
      { question: "What is 50 in-lbs in N·m?", answer: `50 in-lb is ${n(50, "lbf-in", "n-m", "torque")} N·m.` },
      { question: "How many in-lbs make 1 N·m?", answer: `1 N·m is ${n(1, "n-m", "lbf-in", "torque")} in-lb.` },
      { question: "How do I change in-lbs to ft-lbs?", answer: `Divide by 12: 60 in-lb is ${n(60, "lbf-in", "lbf-ft", "torque")} ft-lb.` },
      { question: "Is in-lb the same as lbf·in?", answer: "Yes. Torque specs write in-lb or in-lbs for short; strictly it is pound-force inch (lbf·in)." },
    ],
  },

  "/magnetic-flux-density/tesla-to-gauss": {
    usage:
      "MRI scanners, lab electromagnets and research papers give field strength in tesla, the SI unit. Gaussmeters, magnet catalogs and hobby suppliers often use gauss, so converting lets you compare the two.",
    examples: [
      `A 1.5 T MRI scanner: 1.5 × 10,000 = ${n(1.5, "t", "gauss", "magnetic-flux-density")} G`,
      `A 3 T MRI scanner: ${n(3, "t", "gauss", "magnetic-flux-density")} G`,
      `The Earth's field, about 50 µT: ${n(50, "ut", "gauss", "magnetic-flux-density")} G`,
    ],
    tableRowSet: [0.0001, 0.001, 0.01, 0.05, 0.1, 0.2, 0.5, 1, 1.5, 2, 3, 7],
    faqs: [
      { question: "What is 1.5 T in gauss?", answer: `1.5 T is ${n(1.5, "t", "gauss", "magnetic-flux-density")} G.` },
      { question: "What is 1 mT in gauss?", answer: `1 mT is ${n(1, "mt", "gauss", "magnetic-flux-density")} G.` },
      { question: "What is 3 T in gauss?", answer: `3 T is ${n(3, "t", "gauss", "magnetic-flux-density")} G.` },
      { question: "Why are there two units?", answer: "The tesla is the SI unit; the gauss belongs to the older CGS system. The link is exact: 1 G = 0.0001 T." },
    ],
  },

  "/force/newtons-to-lbf": {
    usage:
      "Load cells, spring ratings, tensile tests and climbing gear give forces in newtons or kilonewtons, while US specifications use pound-force. Converting newtons to lbf lets you compare a metric rating with a US requirement.",
    examples: [
      `100 N: 100 ÷ 4.4482 = ${n(100, "n", "lbf", "force")} lbf`,
      `A spring rated 500 N: ${n(500, "n", "lbf", "force")} lbf`,
      `A carabiner rated 22 kN (22,000 N): ${n(22000, "n", "lbf", "force")} lbf`,
    ],
    tableRowSet: [1, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 22000, 50000],
    faqs: [
      { question: "What is 100 N in lbf?", answer: `100 N is ${n(100, "n", "lbf", "force")} lbf.` },
      { question: "What is 1 kN in lbf?", answer: `1 kN is ${n(1, "kn", "lbf", "force")} lbf.` },
      { question: "How many newtons is 1 lbf?", answer: `1 lbf is ${n(1, "lbf", "n", "force")} N.` },
      { question: "Is a newton bigger than a pound-force?", answer: `No. A newton is smaller: 1 N is only ${n(1, "n", "lbf", "force")} lbf.` },
    ],
  },

  "/time/minutes-to-hours": {
    usage:
      "Payroll systems, invoices and project trackers record time in decimal hours. People log work, workouts and meetings in minutes, so converting turns 45 minutes into the 0.75 hours a timesheet needs.",
    examples: [
      `A 90-minute meeting: 90 ÷ 60 = ${n(90, "min", "h", "time")} hours`,
      `45 minutes: ${n(45, "min", "h", "time")} hours`,
      `A 480-minute shift: ${n(480, "min", "h", "time")} hours`,
    ],
    tableRowSet: [5, 10, 15, 20, 25, 30, 40, 45, 50, 60, 75, 90, 100, 120, 150, 180, 200, 240, 300, 480, 600],
    faqs: [
      { question: "How many hours is 90 minutes?", answer: `90 minutes is ${n(90, "min", "h", "time")} hours.` },
      { question: "What is 45 minutes as a decimal hour?", answer: `45 minutes is ${n(45, "min", "h", "time")} hours.` },
      { question: "How do I bill 50 minutes?", answer: `50 minutes is ${n(50, "min", "h", "time")} hours; multiply that by the hourly rate.` },
      { question: "How many hours is 200 minutes?", answer: `200 minutes is ${n(200, "min", "h", "time")} hours, which is 3 h 20 min.` },
    ],
  },

  "/time/weeks-to-days": {
    usage:
      "Pregnancy, notice periods, courses, sprints and delivery estimates are often given in weeks. Calendars and contracts count days, so converting weeks to days gives you a date to plan around.",
    examples: [
      `A 40-week pregnancy: 40 × 7 = ${n(40, "week", "day", "time")} days`,
      `A 6-week course: ${n(6, "week", "day", "time")} days`,
      `2.5 weeks: ${n(2.5, "week", "day", "time")} days`,
    ],
    tableRowSet: [0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10, 12, 13, 16, 20, 26, 36, 40, 52],
    faqs: [
      { question: "How many days are in 6 weeks?", answer: `6 weeks is ${n(6, "week", "day", "time")} days.` },
      { question: "How many days is 40 weeks?", answer: `40 weeks is ${n(40, "week", "day", "time")} days.` },
      { question: "How many days is 2.5 weeks?", answer: `2.5 weeks is ${n(2.5, "week", "day", "time")} days.` },
      { question: "How many weeks are in a year?", answer: `A 365-day year is ${n(365, "day", "week", "time")} weeks: 52 weeks and 1 day.` },
    ],
  },

  "/temperature/kelvin-to-celsius": {
    usage:
      "Scientists, lab instruments and physics problems give temperatures in kelvin, the SI unit, while everyday readings and most engineering specs use Celsius. Lamp color temperature is also given in kelvin, but it describes the color of the light, not how hot the lamp is.",
    examples: [
      `Room temperature, 300 K: 300 − 273.15 = ${n(300, "kelvin", "celsius", "temperature")} °C`,
      `Liquid nitrogen, about 77 K: ${n(77, "kelvin", "celsius", "temperature")} °C`,
      `Boiling water, 373.15 K: ${n(373.15, "kelvin", "celsius", "temperature")} °C`,
    ],
    tableRowSet: [0, 4, 77, 100, 200, 250, 273.15, 283.15, 293.15, 298.15, 300, 310, 373.15, 500, 1000, 5778],
    faqs: [
      { question: "What is 0 K in Celsius?", answer: `0 K, absolute zero, is ${n(0, "kelvin", "celsius", "temperature")} °C.` },
      { question: "What is 300 K in Celsius?", answer: `300 K is ${n(300, "kelvin", "celsius", "temperature")} °C.` },
      { question: "Is a change of 1 K the same as 1 °C?", answer: "Yes. The two scales have the same step size; only their zero points differ, by 273.15." },
      { question: "Why is it kelvin and not degrees Kelvin?", answer: "Since 1967 the SI unit has been called the kelvin, symbol K, with no degree sign." },
    ],
  },

  "/temperature/kelvin-to-fahrenheit": {
    usage:
      "Astronomy, cryogenics and lighting specifications use kelvin, while US readers think in Fahrenheit. Converting tells you how hot a star's surface or how cold liquid nitrogen is in familiar terms.",
    examples: [
      `The Sun's surface, about 5,778 K: ${n(5778, "kelvin", "fahrenheit", "temperature")} °F`,
      `Liquid nitrogen, about 77 K: ${n(77, "kelvin", "fahrenheit", "temperature")} °F`,
      `Body temperature, 310 K: ${n(310, "kelvin", "fahrenheit", "temperature")} °F`,
    ],
    tableRowSet: [0, 4, 77, 100, 200, 250, 273.15, 293.15, 298.15, 300, 310, 373.15, 500, 1000, 5778],
    faqs: [
      { question: "What is 5,778 K in Fahrenheit?", answer: `5,778 K is ${n(5778, "kelvin", "fahrenheit", "temperature")} °F.` },
      { question: "What is 310 K in Fahrenheit?", answer: `310 K is ${n(310, "kelvin", "fahrenheit", "temperature")} °F.` },
      { question: "What is 77 K in Fahrenheit?", answer: `77 K is ${n(77, "kelvin", "fahrenheit", "temperature")} °F.` },
      { question: "What is 0 K in Fahrenheit?", answer: `0 K, absolute zero, is ${n(0, "kelvin", "fahrenheit", "temperature")} °F.` },
    ],
  },
};

// ------------------------------------------------------------------ NUMBER PAGES

const NUMBERS = {
  "/number-converter/binary-to-decimal": {
    usage:
      "Binary is how computers store numbers, so it appears in networking (subnet masks), file permissions, bit flags in code and digital electronics. Converting to decimal turns a pattern of bits into a value you can compare or calculate with.",
    steps: [
      "Write the binary digits in a row.",
      "Under each digit, from the right, write its place value: 1, 2, 4, 8, 16 and so on (each one double the last).",
      "Keep the place values where the digit is 1 and ignore the 0s.",
      "Add the place values you kept. The sum is the decimal number.",
    ],
    worked: [
      `1011 = 8 + 0 + 2 + 1 = ${base("1011", 2, 10)}`,
      `11001 = 16 + 8 + 1 = ${base("11001", 2, 10)}`,
      `11111111 = 128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = ${base("11111111", 2, 10)}`,
    ],
    examples: ["1", "10", "11", "100", "101", "111", "1000", "1010", "1111", "10000", "100000", "1000000", "1100100", "10000000", "11111111", "100000000", "1111101000", "10000000000"].map((b) => [
      b,
      base(b, 2, 10),
    ]),
    faqs: [
      { question: "What is 1111 in decimal?", answer: `1111 in binary is ${base("1111", 2, 10)} (8 + 4 + 2 + 1).` },
      { question: "What is 11111111 in decimal?", answer: `11111111 in binary is ${base("11111111", 2, 10)}, the largest value one byte can hold.` },
      { question: "How many values can 8 bits hold?", answer: `${base("100000000", 2, 10)} values: 0 to ${base("11111111", 2, 10)}.` },
      { question: "What is 1100100 in decimal?", answer: `1100100 is ${base("1100100", 2, 10)} (64 + 32 + 4).` },
    ],
  },

  "/number-converter/hex-to-decimal": {
    usage:
      "Hexadecimal appears in web colour codes, memory addresses, MAC addresses, error codes and Unicode code points. Programmers convert it to decimal to compare a value with a limit or use it in a calculation.",
    steps: [
      "Replace any letters with their values: A = 10, B = 11, C = 12, D = 13, E = 14, F = 15.",
      "Under each digit, from the right, write its place value: 1, 16, 256, 4,096 and so on (each one 16 times the last).",
      "Multiply each digit by its place value.",
      "Add the results. The sum is the decimal number.",
    ],
    worked: [
      `1F = 1 × 16 + 15 × 1 = ${base("1f", 16, 10)}`,
      `C0 = 12 × 16 + 0 = ${base("c0", 16, 10)}`,
      `1A3 = 1 × 256 + 10 × 16 + 3 = ${base("1a3", 16, 10)}`,
    ],
    examples: ["a", "f", "10", "1f", "40", "64", "7f", "80", "c0", "ff", "100", "3e8", "400", "fff", "1000", "7fff", "ffff", "ffffff"].map((h) => [
      h.toUpperCase(),
      base(h, 16, 10),
    ]),
    faqs: [
      { question: "What is 0x1F in decimal?", answer: `0x1F is ${base("1f", 16, 10)} (1 × 16 + 15).` },
      { question: "What are the hex digits A to F?", answer: "A = 10, B = 11, C = 12, D = 13, E = 14 and F = 15." },
      { question: "How do I read a colour code like #FF8000?", answer: `Split it into pairs: FF = ${base("ff", 16, 10)} red, 80 = ${base("80", 16, 10)} green, 00 = 0 blue.` },
      { question: "What is 0xFFFF in decimal?", answer: `0xFFFF is ${base("ffff", 16, 10)}, the largest value 16 bits can hold.` },
    ],
  },
};

// ------------------------------------------------------------------ CATEGORIES

const CATEGORIES = {
  "mass-flux-density": [
    "Mass flux density is the mass of material passing through one unit of area each second: how much steam, air or water crosses a surface. Its SI unit is the kilogram per square meter per second, kg/(m²·s).",
    "Chemical and process engineers use it to size pipes, dryers and heat exchangers, because it does not change along a pipe of constant cross-section even when the fluid's density changes. g/(cm²·s) appears in lab work, kg/(m²·h) in drying and evaporation data, and lb/(ft²·s) or lb/(ft²·h) in US engineering references.",
  ],
  "surface-charge-density": [
    "Surface charge density is the electric charge held on each unit of area of a surface, such as a capacitor plate, an electrode or a charged film. Its SI unit is the coulomb per square meter, C/m².",
    "Electrochemistry and semiconductor work often use µC/cm², the size of charges stored on electrodes and in thin films. C/cm² and C/in² are larger area-based variants, and the abcoulomb per square centimeter belongs to the older CGS electromagnetic system found in some physics texts.",
  ],
  inductance: [
    "Inductance measures how strongly a coil or circuit opposes a change in the current through it, by storing energy in its magnetic field. Its SI unit is the henry (H): one henry produces one volt when the current changes by one ampere per second.",
    "Real components are usually much smaller than a henry: power inductors in switching supplies are in microhenries (µH), radio-frequency coils in nanohenries (nH), and mains chokes and transformer windings in millihenries (mH) or henries. The abhenry and stathenry are CGS units found in older physics books.",
  ],
  "heat-flux-density": [
    "Heat flux density is the rate of heat flow through one unit of area: how many watts pass through each square meter of a wall, a pipe or a furnace lining. Its SI unit is the watt per square meter, W/m².",
    "Building and insulation work uses W/m², high-heat equipment such as boilers and electronics cooling uses kW/m² or W/cm², US HVAC references use BTU/(h·ft²), and older metric engineering data uses kcal/(h·m²). Solar irradiance, about 1,000 W/m² in strong sunlight, is measured in the same unit.",
  ],
  luminance: [
    "Luminance is how bright a surface looks: the light it gives off or reflects towards the viewer, per unit of area. Its SI unit is the candela per square meter, cd/m², which display makers call the nit.",
    "Screen and TV brightness is quoted in nits, road and tunnel lighting rules use cd/m², and older or US texts use the foot-lambert (fL), lambert, stilb and apostilb. Luminance differs from illuminance: illuminance (lux) is the light falling on a surface, luminance is how bright that surface appears.",
  ],
  "heat-density": [
    "Heat density here means energy per unit of area: how much heat or radiation energy reaches each square meter over a period. Its SI unit is the joule per square meter, J/m².",
    "Solar energy data gives daily sunshine in Wh/m² or kWh/m², fire-safety work uses kJ/m² for heat dose, and climatology uses the langley (1 cal/cm²) for solar radiation. kcal/m² and BTU/ft² appear in older metric and US engineering references.",
  ],
  "specific-volume": [
    "Specific volume is the volume that one unit of mass takes up, the inverse of density. Its SI unit is the cubic meter per kilogram, m³/kg.",
    "Steam tables and thermodynamics use m³/kg, chemistry and lab work use cm³/g or L/kg, and US engineering references use ft³/lb. It is most useful for gases and steam, whose volume changes strongly with temperature and pressure.",
  ],
  "volume-charge-density": [
    "Volume charge density is the electric charge in each unit of volume, for example in a plasma, an electrolyte or a doped semiconductor region. Its SI unit is the coulomb per cubic meter, C/m³.",
    "Physics and semiconductor texts often use C/cm³ or µC/cm³ for small regions, and C/in³ appears in some US references. It is the quantity that appears in Gauss's law for charge spread through a volume.",
  ],
  "linear-current-density": [
    "Linear current density is current per unit length: the current flowing along a sheet or across the width of a conductor or winding. Its SI unit is the ampere per meter, A/m.",
    "Electric machine designers use it to describe how heavily a motor or generator winding is loaded, often in A/cm or A/mm, and A/in appears in US references. It shares the unit A/m with magnetic field strength, but the two describe different things.",
  ],
  "surface-current-density": [
    "Surface current density is the current flowing through each unit of cross-sectional area of a conductor. Its SI unit is the ampere per square meter, A/m².",
    "Electroplating and battery work use mA/cm² or A/cm², cable and busbar sizing uses A/mm² in practice, and A/in² appears in US references. It tells you how hard a conductor is being worked, which sets how hot it gets.",
  ],
  "angular-velocity": [
    "Angular velocity is how fast something turns: the angle it sweeps each second. Its SI unit is the radian per second, rad/s.",
    "Motor and engine speeds are given in revolutions per minute (rpm), physics and control formulas use rad/s, rev/s suits fast spindles and turbines, and degrees per second is used for gyroscopes and camera gimbals. One revolution is 2π radians, which links rpm and rad/s.",
  ],
  "magnetomotive-force": [
    "Magnetomotive force is what drives magnetic flux around a magnetic circuit, much as voltage drives current. Its SI unit is the ampere-turn (A·t), the current in a coil multiplied by its number of turns.",
    "Transformer, relay and electromagnet designers use ampere-turns or kiloampere-turns, and the gilbert is the older CGS unit. A coil of 200 turns carrying 2 A produces 400 ampere-turns.",
  ],
  "volume-lumber": [
    "Lumber volume measures how much wood is in boards, logs or a stack of firewood. The SI unit is the cubic meter, m³, which international timber trade uses.",
    "In the US and Canada, sawn lumber is sold by the board foot (1 ft × 1 ft × 1 in) and in thousands of board feet (MBF), firewood by the cord (128 cubic feet of stacked wood), and the Hoppus foot is a traditional British and Commonwealth unit for round logs. Cubic feet are common for shipping and storage.",
  ],
  // round 2
  "angular-acceleration": [
    "Angular acceleration is how quickly the turning speed of something changes. Its SI unit is the radian per second squared, rad/s².",
    "Motor and robot specifications use rad/s², animation and camera gimbals often use °/s², and motor drives set ramp rates in rpm per second: a motor that goes from 0 to 3,000 rpm in 2 seconds accelerates at 1,500 rpm/s. rev/s² and rad/min² appear in some mechanics problems.",
  ],
  "electric-field-strength": [
    "Electric field strength is the force an electric field puts on each unit of charge. Its SI unit is the volt per meter, V/m, which is the same as the newton per coulomb.",
    "Radio-frequency exposure limits are given in V/m, while insulation and dielectric strength use kV/mm or kV/cm: dry air at sea level breaks down at about 3 kV/mm (30 kV/cm). V/in appears in US references, and the statvolt per centimeter belongs to the older CGS system.",
  ],
  "thermal-conductivity": [
    "Thermal conductivity says how easily heat flows through a material: the heat that passes through a 1 m thick layer of 1 m² for each kelvin of temperature difference. Its SI unit is the watt per meter kelvin, W/(m·K).",
    "Insulation data sheets give it as a lambda value in W/(m·K), with good insulation around 0.03 to 0.04 and copper near 400. US references use BTU/(h·ft·°F), and US insulation k-values use BTU·in/(h·ft²·°F). kcal/(h·m·°C) and cal/(s·cm·°C) appear in older metric and lab data.",
  ],
  "electric-conductance": [
    "Electric conductance is how easily current flows through a component or a sample, the inverse of resistance. Its SI unit is the siemens (S), and 1 S = 1/Ω.",
    "Sensors and conductivity cells read in microsiemens (µS) or millisiemens (mS). The mho (℧, ohm spelled backwards) is the old name for the siemens, still seen on older meters, and the abmho and statmho belong to the CGS systems.",
  ],
  prefixes: [
    "Metric prefixes multiply a unit by a power of ten: kilo means 1,000 (10³), mega 1,000,000 (10⁶) and milli one thousandth (10⁻³). They are not an SI unit themselves; here they are converted against the plain number 1.",
    "The SI has 24 prefixes, from quecto (10⁻³⁰) to quetta (10³⁰); ronna, quetta, ronto and quecto were added in 2022. Kilo, mega, giga, milli, micro and nano cover most daily use. Computer memory also uses binary prefixes such as kibi (1,024), which are separate from these.",
  ],
};

// Merge into the page objects (keeps object identity, so other modules see it).
export function addPairDepth(page, path) {
  const extra = PAIRS[path];
  if (extra) Object.assign(page, extra, { updated: UPDATED });
}

export function addNumberDepth(page, path) {
  const extra = NUMBERS[path];
  if (extra) Object.assign(page, extra, { updated: UPDATED });
}

// { about: [paragraphs], updated } for a category id, or {}.
export function categoryDepth(id) {
  return CATEGORIES[id] ? { about: CATEGORIES[id], updated: UPDATED } : {};
}

export const DEPTH_PATHS = { pairs: Object.keys(PAIRS), numbers: Object.keys(NUMBERS), categories: Object.keys(CATEGORIES) };
