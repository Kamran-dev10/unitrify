// Category pages (/{id}): SEO text and FAQs for each unit category.
// The unit data itself (name, group, intro, units) lives in lib/categories/
// and is merged in below, so CATEGORIES has everything a page needs.
//
// This file is only used on the server, so FAQ text never ships to the
// browser with the converter code.

import { UNIT_CATEGORIES } from "./categories/index.js";

const PAGE_CONTENT = {
  zameen: {
    h1: "Pakistani Land Unit Converter",
    title: "Pakistani Land Unit Converters – Marla, Kanal, Acre",
    metaDescription:
      "Free converters for Pakistani land units: marla, kanal, acre, murabba, square feet and square yards, with all three marla standards.",
    faqs: [
      {
        question: "What is the difference between marla and kanal?",
        answer:
          "A kanal is 20 marla. The marla itself can be 272.25, 250 or 225 sq ft, so 1 kanal is 5,445, 5,000 or 4,500 sq ft.",
      },
      {
        question: "Which marla size do these converters use?",
        answer:
          "The 272.25 sq ft revenue marla by default. You can switch to a 250 or 225 sq ft marla with the marla size buttons.",
      },
      {
        question: "How many kanal are in an acre?",
        answer:
          "8 kanal with the 272.25 sq ft marla. With a 250 sq ft marla it is 8.712 kanal, and with a 225 sq ft marla it is 9.68 kanal.",
      },
    ],
  },
  length: {
    h1: "Length Converter",
    title: "Length Converters – cm, Inches, Feet, Meters, Miles",
    metaDescription:
      "Free length converters: cm to inches, inches to cm, feet and inches to cm for height, meters to feet and km to miles, each with a table and FAQs.",
    faqs: [
      { question: "How many centimeters are in an inch?", answer: "Exactly 2.54 centimeters." },
      { question: "How many feet are in a meter?", answer: "About 3.2808 feet." },
      { question: "How many kilometers are in a mile?", answer: "About 1.6093 kilometers (exactly 1.609344)." },
    ],
  },
  weight: {
    h1: "Weight Converter",
    title: "Weight Converters – kg, lbs, Grams, Tola, Maund",
    metaDescription:
      "Free weight converters: kg to lbs, lbs to kg and grams to kg, plus tola to gram and maund to kg for Pakistan. Each has a converter, table and FAQs.",
    faqs: [
      { question: "How many pounds are in a kilogram?", answer: "About 2.2046 pounds." },
      { question: "How many grams is 1 tola?", answer: "About 11.6638 grams." },
      { question: "How many kilograms is a maund?", answer: "These converters use the Pakistani maund of 40 kg." },
    ],
  },
  temperature: {
    h1: "Temperature Converter",
    title: "Temperature Converters – Celsius and Fahrenheit",
    metaDescription:
      "°F = °C × 1.8 + 32. Free temperature converters for Celsius to Fahrenheit and Fahrenheit to Celsius, each with the formula, a table and FAQs.",
    faqs: [
      { question: "How do I convert Celsius to Fahrenheit?", answer: "Multiply by 1.8 and add 32. For example, 100 °C × 1.8 + 32 = 212 °F." },
      { question: "What is absolute zero in Celsius?", answer: "0 K, which is −273.15 °C." },
      { question: "At what temperature are Celsius and Fahrenheit the same?", answer: "At −40: −40 °C is exactly −40 °F." },
    ],
  },
  area: {
    h1: "Area Converter",
    title: "Area Converters – Sq Ft, Sq Meters, Gaz",
    metaDescription:
      "Free area converters: square feet to square meters and gaz (square yards) to square feet. For marla and kanal, see our land unit converters.",
    faqs: [
      { question: "How many square feet are in a square meter?", answer: "About 10.7639 square feet." },
      { question: "How many square feet are in an acre?", answer: "Exactly 43,560 square feet." },
      { question: "How many acres are in a hectare?", answer: "About 2.4711 acres." },
    ],
  },
  volume: {
    h1: "Volume Converter",
    title: "Volume Converters – Litres, Gallons, Cups",
    metaDescription:
      "Free volume converters: litres to US and UK gallons, and millilitres to US cups. Each page has an instant converter, a conversion table and FAQs.",
    faqs: [
      { question: "How many litres are in a US gallon?", answer: "About 3.7854 litres." },
      {
        question: "What is the difference between a US and a UK gallon?",
        answer: "The UK (imperial) gallon is bigger: about 4.5461 litres, compared with about 3.7854 litres for a US gallon.",
      },
      { question: "How many millilitres are in a US cup?", answer: "About 236.5882 millilitres." },
    ],
  },
  "volume-dry": {
    h1: "Dry Volume Converter",
    title: "Dry Volume Converter – Bushels, Pecks, Dry Pints",
    metaDescription:
      "1 US bushel = 35.2391 litres. Convert dry volume between US and UK bushels, pecks, dry pints, dry quarts and litres, with a full table and FAQs.",
    faqs: [
      { question: "How many litres are in a US bushel?", answer: "About 35.2391 litres." },
      {
        question: "Is a UK bushel the same as a US bushel?",
        answer: "No. A UK (imperial) bushel is 36.36872 litres, while a US bushel is about 35.2391 litres.",
      },
      {
        question: "Is a US dry pint the same as a US liquid pint?",
        answer: "No. A US dry pint is about 0.5506 litres, while a US liquid pint is about 0.4732 litres.",
      },
    ],
  },
  pressure: {
    h1: "Pressure Converter",
    title: "Pressure Converter – psi, bar, kPa, atm, mmHg",
    metaDescription:
      "1 bar = 14.5038 psi. Convert pressure between psi, bar, kPa, MPa, atmospheres, torr, mmHg and inHg, with an all-units table and FAQs.",
    faqs: [
      { question: "How many psi is 1 bar?", answer: "About 14.5038 psi." },
      {
        question: "What is standard atmospheric pressure?",
        answer: "1 standard atmosphere is 101,325 Pa, which is 1.01325 bar, about 14.6959 psi, or exactly 760 torr.",
      },
      {
        question: "Are torr and mmHg the same?",
        answer:
          "Almost. 1 torr is 101,325 ÷ 760 Pa (about 133.3224 Pa) and 1 mmHg is about 133.3224 Pa too; they differ by less than one part in a million.",
      },
    ],
  },
  energy: {
    h1: "Energy Converter",
    title: "Energy Converter – Joules, kWh, Calories, BTU",
    metaDescription:
      "1 kWh = 3.6 MJ = 3,412.14 BTU. Convert energy between joules, kWh, calories, kilocalories, BTU, therms and electronvolts, with a table and FAQs.",
    faqs: [
      { question: "How many joules are in a kilowatt-hour?", answer: "Exactly 3,600,000 joules (3.6 MJ)." },
      {
        question: "Is a food Calorie the same as a kilocalorie?",
        answer: "Yes. The Calorie on food labels is 1 kilocalorie, which is 4,184 joules.",
      },
      { question: "How many BTU are in a kilowatt-hour?", answer: "About 3,412.1416 BTU." },
    ],
  },
  power: {
    h1: "Power Converter",
    title: "Power Converter – Watts, kW, Horsepower, BTU/h",
    metaDescription:
      "1 horsepower = 745.7 W. Convert power between watts, kilowatts, horsepower, BTU per hour and tons of refrigeration, with a full table and FAQs.",
    faqs: [
      {
        question: "How many watts is 1 horsepower?",
        answer: "Mechanical horsepower is about 745.6999 W. Metric horsepower (PS) is about 735.4988 W.",
      },
      { question: "How many BTU per hour is 1 kW?", answer: "About 3,412.1416 BTU/h." },
      {
        question: "What is a ton of refrigeration?",
        answer: "A cooling rate of 12,000 BTU per hour, which is about 3,516.8528 W (3.5169 kW).",
      },
    ],
  },
  force: {
    h1: "Force Converter",
    title: "Force Converter – Newtons, kgf, Pound-force",
    metaDescription:
      "1 kgf = 9.80665 N. Convert force between newtons, kilonewtons, kilogram-force, pound-force, ounce-force, dynes and poundals, with a table and FAQs.",
    faqs: [
      { question: "How many newtons is 1 kilogram-force?", answer: "Exactly 9.80665 newtons." },
      { question: "How many newtons is 1 pound-force?", answer: "About 4.4482 newtons." },
      {
        question: "What is the difference between a kilogram and a kilogram-force?",
        answer:
          "A kilogram measures mass. A kilogram-force is the weight of 1 kg under standard gravity (9.80665 m/s²), so it is a force.",
      },
    ],
  },
  time: {
    h1: "Time Converter",
    title: "Time Converter – Seconds, Minutes, Hours, Days",
    metaDescription:
      "1 day = 86,400 seconds. Convert time between nanoseconds, seconds, minutes, hours, days, weeks, average months and years, with a table and FAQs.",
    faqs: [
      { question: "How many seconds are in a day?", answer: "86,400 seconds (24 × 60 × 60)." },
      {
        question: "Why is a month 30.436875 days here?",
        answer:
          "Real months have 28 to 31 days, so this converter uses the average Gregorian month: 365.2425 days ÷ 12 = 30.436875 days.",
      },
      { question: "How many hours are in a week?", answer: "168 hours (7 × 24)." },
    ],
  },
  speed: {
    h1: "Speed Converter",
    title: "Speed Converter – km/h, mph, m/s, Knots",
    metaDescription:
      "60 mph = 96.5606 km/h. Convert speed between km/h, mph, m/s, knots, feet per second and the speed of light, with an all-units table and FAQs.",
    faqs: [
      { question: "How do I convert km/h to m/s?", answer: "Divide by 3.6. For example, 90 km/h ÷ 3.6 = 25 m/s." },
      { question: "How many km/h is 1 knot?", answer: "Exactly 1.852 km/h, because 1 knot is 1 nautical mile (1,852 m) per hour." },
      {
        question: "Why is there no Mach converter?",
        answer: "Mach compares a speed with the speed of sound, which changes with air temperature, so it has no single fixed value.",
      },
    ],
  },
  angle: {
    h1: "Angle Converter",
    title: "Angle Converter – Degrees, Radians, Gradians",
    metaDescription:
      "180° = π radians. Convert angles between degrees, radians, gradians, arcminutes, arcseconds, turns and mils, with an all-units table and FAQs.",
    faqs: [
      { question: "How many degrees are in a radian?", answer: "180 ÷ π, which is about 57.2958 degrees." },
      { question: "What is a gradian?", answer: "1/400 of a full turn, so a right angle is exactly 100 gradians." },
      {
        question: "Is a milliradian the same as a NATO mil?",
        answer: "No. A milliradian is 1/1000 of a radian (about 6,283.19 per turn); a NATO mil is exactly 1/6400 of a turn.",
      },
    ],
  },
  "fuel-consumption": {
    h1: "Fuel Consumption Converter",
    title: "Fuel Consumption Converter – mpg, L/100 km, km/L",
    metaDescription:
      "30 mpg (US) = 7.8405 L/100 km. Convert fuel consumption between L/100 km, km/L and US or UK miles per gallon, with a full table and FAQs.",
    faqs: [
      {
        question: "How do I convert mpg to L/100 km?",
        answer: "Divide 235.2146 by the US mpg, or 282.4809 by the UK mpg. For example, 235.2146 ÷ 30 mpg (US) = 7.8405 L/100 km.",
      },
      {
        question: "Why does a higher mpg mean a lower L/100 km?",
        answer: "mpg and km/L measure distance per fuel (higher is better), while L/100 km measures fuel per distance (lower is better).",
      },
      {
        question: "Is UK mpg the same as US mpg?",
        answer: "No. A UK gallon is about 20% bigger than a US gallon, so the same car shows a higher mpg figure in UK gallons.",
      },
    ],
  },
  "data-storage": {
    h1: "Data Storage Converter",
    title: "Data Storage Converter – MB, GB, TB, GiB",
    metaDescription:
      "1 TB = 931.32 GiB. Convert data storage between bits, bytes, decimal kB, MB, GB, TB and binary KiB, MiB, GiB, TiB, with a table and FAQs.",
    faqs: [
      {
        question: "Why does a 1 TB drive show about 931 GB?",
        answer:
          "The drive maker counts 1 TB as 10¹² bytes. Many computers count in binary GiB (1,073,741,824 bytes each), which gives about 931.3226 GiB, often labelled \"GB\".",
      },
      { question: "How many bits are in a byte?", answer: "8 bits." },
      {
        question: "What is the difference between MB and MiB?",
        answer: "1 MB is 1,000,000 bytes (decimal). 1 MiB is 1,048,576 bytes (binary, 1024 × 1024).",
      },
    ],
  },
};

// Only categories with page content get a page (and appear in the sitemap).
export const CATEGORIES = UNIT_CATEGORIES.filter((c) => PAGE_CONTENT[c.id]).map((c) => ({
  ...c,
  ...PAGE_CONTENT[c.id],
}));

export function getCategory(id) {
  return CATEGORIES.find((c) => c.id === id) ?? null;
}
