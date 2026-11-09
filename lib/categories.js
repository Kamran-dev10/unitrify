// Category pages (/{id}): SEO text and FAQs for each unit category.
// The unit data itself (name, group, intro, units) lives in lib/categories/
// and is merged in below, so CATEGORIES has everything a page needs.
//
// This file is only used on the server, so FAQ text never ships to the
// browser with the converter code.

import { UNIT_CATEGORIES, getCategoryUnits } from "./categories/index.js";
import { convert, formatResult } from "./convert.js";

// n(1, "rpm", "rad-s", "angular-velocity") -> "0.1047" (numbers always come from the engine)
const n = (value, from, to, category) => formatResult(convert(value, from, to, category));

const PAGE_CONTENT = {
  zameen: {
    h1: "Pakistani Land Unit Converter",
    metaDescription:
      "Free Pakistani land unit converter for marla, kanal, acre, murabba, square feet and square yards, with all three marla standards and a plot calculator.",
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
    metaDescription:
      "1 US bushel = 35.2391 litres. Dry volume converter for US and UK bushels, pecks, dry pints, dry quarts and litres, with a full table and FAQs.",
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
    metaDescription:
      "1 bar = 14.5038 psi. Pressure converter for psi, bar, kPa, MPa, atmospheres, torr, mmHg and inHg, with an all-units table and FAQs.",
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
    metaDescription:
      "1 kWh = 3.6 MJ = 3,412.14 BTU. Energy converter for joules, kWh, calories, kilocalories, BTU, therms and electronvolts, with a table and FAQs.",
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
    metaDescription:
      "1 horsepower = 745.7 W. Power converter for watts, kilowatts, horsepower, BTU per hour and tons of refrigeration, with a full table and FAQs.",
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
    metaDescription:
      "1 kgf = 9.80665 N. Force converter for newtons, kilonewtons, kilogram-force, pound-force, ounce-force, dynes and poundals, with a table and FAQs.",
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
    metaDescription:
      "1 day = 86,400 seconds. Time converter for nanoseconds, seconds, minutes, hours, days, weeks, average months and years, with a table and FAQs.",
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
    metaDescription:
      "60 mph = 96.5606 km/h. Speed converter for km/h, mph, m/s, knots, feet per second and the speed of light, with an all-units table and FAQs.",
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
    metaDescription:
      "180° = π radians. Angle converter for degrees, radians, gradians, arcminutes, arcseconds, turns and mils, with an all-units table and FAQs.",
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
    metaDescription:
      "30 mpg (US) = 7.8405 L/100 km. Fuel consumption converter for L/100 km, km/L and US or UK miles per gallon, with a full table and FAQs.",
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
    metaDescription:
      "1 TB = 931.32 GiB. Data storage converter for bits, bytes, decimal kB, MB, GB, TB and binary KiB, MiB, GiB, TiB, with a table and FAQs.",
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
  // ---------------------------------------------------------- ENGINEERING
  "angular-velocity": {
    h1: "Angular Velocity Converter",
    metaDescription: `1 rpm = ${n(1, "rpm", "rad-s", "angular-velocity")} rad/s. Angular velocity converter for rpm, rad/s, degrees per second and revolutions per second, with a table and FAQs.`,
    faqs: [
      { question: "How many rad/s is 1 rpm?", answer: `1 rpm is about ${n(1, "rpm", "rad-s", "angular-velocity")} rad/s, because one revolution is 2π radians and a minute is 60 seconds.` },
      { question: "How many revolutions per second is 3,000 rpm?", answer: `3,000 rpm is ${n(3000, "rpm", "rev-s", "angular-velocity")} revolutions per second.` },
      { question: "Is rpm the same as hertz?", answer: "Not quite. 1 revolution per second (1 Hz of rotation) is 60 rpm." },
    ],
  },
  acceleration: {
    h1: "Acceleration Converter",
    metaDescription: "1 g = 9.80665 m/s² exactly. Acceleration converter for g-force, m/s², ft/s², Gal and km/h per second, with an all-units table and quick FAQs.",
    faqs: [
      { question: "What is 1 g in m/s²?", answer: "Exactly 9.80665 m/s², the value of standard gravity." },
      { question: "How many g is 0 to 100 km/h in 5 seconds?", answer: `That is 20 km/h per second on average, about ${n(20, "kmh-s", "m-s2", "acceleration")} m/s² or ${n(20, "kmh-s", "g", "acceleration")} g.` },
      { question: "What is a Gal?", answer: "1 Gal is 1 centimeter per second squared (0.01 m/s²). It is used in geophysics to measure small changes in gravity." },
    ],
  },
  "angular-acceleration": {
    h1: "Angular Acceleration Converter",
    metaDescription: `1 rpm/s = ${n(1, "rpm-s", "rad-s2", "angular-acceleration")} rad/s². Angular acceleration converter for rad/s², degrees per second squared, rpm per second and rev/s², with FAQs.`,
    faqs: [
      { question: "How many rad/s² is 1 rpm per second?", answer: `1 rpm/s is about ${n(1, "rpm-s", "rad-s2", "angular-acceleration")} rad/s².` },
      { question: "How many rad/s² is 1 rev/s²?", answer: `1 rev/s² is 2π, about ${n(1, "rev-s2", "rad-s2", "angular-acceleration")} rad/s².` },
      { question: "How do I work out angular acceleration?", answer: `Divide the change in speed by the time. 0 to 600 rpm in 2 seconds is 300 rpm/s, about ${n(300, "rpm-s", "rad-s2", "angular-acceleration")} rad/s².` },
    ],
  },
  density: {
    h1: "Density Converter",
    metaDescription: `1 g/cm³ = 1,000 kg/m³ = ${n(1, "g-cm3", "lb-ft3", "density")} lb/ft³. Density converter for metric and imperial units, with an all-units table and quick FAQs.`,
    faqs: [
      { question: "What is the density of water?", answer: "About 1 g/cm³ (1,000 kg/m³) near 4 °C, and very slightly less at room temperature." },
      { question: "Are g/cm³ and g/mL the same?", answer: "Yes. 1 cm³ is exactly 1 mL, so 1 g/cm³ = 1 g/mL = 1 kg/L." },
      { question: "How many lb/ft³ is 1,000 kg/m³?", answer: `1,000 kg/m³ is about ${n(1000, "kg-m3", "lb-ft3", "density")} lb/ft³.` },
    ],
  },
  "specific-volume": {
    h1: "Specific Volume Converter",
    metaDescription: `1 ft³/lb = ${n(1, "ft3-lb", "m3-kg", "specific-volume")} m³/kg. Specific volume converter for m³/kg, L/kg, cm³/g, ft³/lb and US gal/lb, with a table and quick FAQs.`,
    faqs: [
      { question: "What is specific volume?", answer: "The volume taken up by one unit of mass. It is the inverse of density." },
      { question: "How do I get specific volume from density?", answer: "Divide 1 by the density. Water at about 1,000 kg/m³ has a specific volume of about 0.001 m³/kg." },
      { question: "How many m³/kg is 1 ft³/lb?", answer: `1 ft³/lb is about ${n(1, "ft3-lb", "m3-kg", "specific-volume")} m³/kg.` },
    ],
  },
  "moment-of-inertia": {
    h1: "Moment of Inertia Converter",
    metaDescription: `1 kg·m² = ${n(1, "kg-m2", "lb-ft2", "moment-of-inertia")} lb·ft². Moment of inertia converter for kg·m², kg·cm², g·cm², lb·ft², lb·in² and slug·ft², with FAQs.`,
    faqs: [
      { question: "How many lb·ft² is 1 kg·m²?", answer: `1 kg·m² is about ${n(1, "kg-m2", "lb-ft2", "moment-of-inertia")} lb·ft².` },
      { question: "How many kg·cm² is 1 kg·m²?", answer: "10,000 kg·cm², because 1 m² is 10,000 cm²." },
      { question: "What is the moment of inertia of a solid disc?", answer: "½ × mass × radius² about its centre. A 2 kg disc with a 0.1 m radius has 0.01 kg·m²." },
    ],
  },
  torque: {
    h1: "Torque Converter",
    metaDescription: `1 lbf·ft = ${n(1, "lbf-ft", "n-m", "torque")} N·m. Torque converter for N·m, foot-pounds, inch-pounds and kgf·m, with a table and quick FAQs.`,
    faqs: [
      { question: "Is torque the same as moment of force?", answer: "Yes. Both are force times distance and use the same units, so this one converter covers both." },
      { question: "How many N·m is 1 foot-pound?", answer: `1 lbf·ft (foot-pound) is about ${n(1, "lbf-ft", "n-m", "torque")} N·m.` },
      { question: "How many inch-pounds are in a foot-pound?", answer: "12, because a foot is 12 inches." },
    ],
  },

  // ---------------------------------------------------------------- HEAT
  "fuel-efficiency-mass": {
    h1: "Fuel Energy per Mass Converter",
    metaDescription: `1 MJ/kg = ${n(1, "mj-kg", "btu-lb", "fuel-efficiency-mass")} BTU/lb. Fuel energy per mass converter for J/kg, MJ/kg, cal/g, kcal/kg and BTU/lb, with FAQs.`,
    faqs: [
      { question: "How many BTU/lb is 1 MJ/kg?", answer: `1 MJ/kg is about ${n(1, "mj-kg", "btu-lb", "fuel-efficiency-mass")} BTU/lb.` },
      { question: "Are cal/g and kcal/kg the same?", answer: "Yes. Both equal 4,184 J/kg (thermochemical calorie)." },
      { question: "What is a heating value?", answer: "The energy released when a fuel burns completely. The higher heating value includes the heat from condensing water vapour; the lower heating value does not." },
    ],
  },
  "fuel-efficiency-volume": {
    h1: "Fuel Energy per Volume Converter",
    metaDescription: `1 MJ/m³ = ${n(1, "mj-m3", "btu-ft3", "fuel-efficiency-volume")} BTU/ft³. Fuel energy per volume converter for J/L, kJ/L, MJ/m³, kcal/m³, BTU/ft³ and BTU/gal.`,
    faqs: [
      { question: "How many BTU/ft³ is 1 MJ/m³?", answer: `1 MJ/m³ is about ${n(1, "mj-m3", "btu-ft3", "fuel-efficiency-volume")} BTU/ft³.` },
      { question: "Are kJ/L and MJ/m³ the same?", answer: "Yes. A cubic meter is 1,000 liters, so 1 kJ/L = 1 MJ/m³." },
      { question: "How many BTU per US gallon is 1 MJ/L?", answer: `1 MJ/L (1,000 kJ/L) is about ${n(1000, "kj-l", "btu-gal", "fuel-efficiency-volume")} BTU/gal.` },
    ],
  },
  "temperature-interval": {
    h1: "Temperature Difference Converter",
    metaDescription: "A change of 10 °C is a change of 18 °F. Temperature difference converter for °C, °F, K, °R and °Ré, which works unlike readings. Table and FAQs.",
    faqs: [
      { question: "Why is a 10 °C rise 18 °F and not 50 °F?", answer: "50 °F is the reading for 10 °C. A change only uses the size of the degree (×1.8), with no +32 offset." },
      { question: "Is a change of 1 K the same as 1 °C?", answer: "Yes. Kelvin and Celsius degrees are the same size, so differences are equal." },
      { question: "When should I use this instead of the temperature converter?", answer: "Use this for rises, drops, ranges and tolerances. Use the temperature converter for a reading on a thermometer." },
    ],
  },
  "thermal-expansion": {
    h1: "Thermal Expansion Converter",
    metaDescription: "1 ppm/K = 0.000001 per kelvin. Thermal expansion converter for 1/K, 1/°C, 1/°F, 1/°R and ppm/K, with an all-units table and quick FAQs.",
    faqs: [
      { question: "Why is the per °F value smaller than the per °C value?", answer: "A Fahrenheit degree is smaller (1/1.8 of a Celsius degree), so a material grows less for each °F." },
      { question: "What does 12 ppm/K mean?", answer: "The material grows by 12 millionths of its length for each kelvin. A 1 m bar grows 0.012 mm per degree." },
      { question: "Are 1/K and 1/°C the same?", answer: "Yes. Kelvin and Celsius degrees are the same size, so the coefficient is the same." },
    ],
  },
  "thermal-resistance": {
    h1: "Thermal Resistance Converter",
    metaDescription: `1 °F·h/BTU = ${n(1, "f-h-btu", "k-w", "thermal-resistance")} K/W. Thermal resistance converter for K/W, °C/W and °F·h/BTU for heat sinks and insulation, with FAQs.`,
    faqs: [
      { question: "Are K/W and °C/W the same?", answer: "Yes. Kelvin and Celsius degrees are the same size, so the numbers are identical." },
      { question: "What does a 2 °C/W heat sink mean?", answer: "Each watt of heat raises the temperature 2 °C above the surrounding air, so 10 W gives a 20 °C rise." },
      { question: "Is this the same as an R-value?", answer: "No. An R-value is per area of insulation; thermal resistance here is for a whole part or layer." },
    ],
  },
  "thermal-conductivity": {
    h1: "Thermal Conductivity Converter",
    metaDescription: `1 W/(m·K) = ${n(1, "w-mk", "btu-hftf", "thermal-conductivity")} BTU/(h·ft·°F). Thermal conductivity converter for metric, BTU and kcal units, with a table and FAQs.`,
    faqs: [
      { question: "How many BTU/(h·ft·°F) is 1 W/(m·K)?", answer: `1 W/(m·K) is about ${n(1, "w-mk", "btu-hftf", "thermal-conductivity")} BTU/(h·ft·°F).` },
      { question: "What is a k-value?", answer: `It is thermal conductivity, often given for insulation in BTU·in/(h·ft²·°F). 1 W/(m·K) is about ${n(1, "w-mk", "btu-in-hft2f", "thermal-conductivity")} in those units.` },
      { question: "Which kilocalorie does the kcal unit use?", answer: "The International Table kilocalorie, so 1 kcal/(h·m·°C) is exactly 1.163 W/(m·K)." },
    ],
  },
  "specific-heat-capacity": {
    h1: "Specific Heat Capacity Converter",
    metaDescription: "1 BTU/(lb·°F) = 4.1868 kJ/(kg·K). Specific heat capacity converter for J/(kg·K), kJ/(kg·K), cal/(g·°C) and BTU/(lb·°F), with a table and FAQs.",
    faqs: [
      { question: "What is the specific heat of water?", answer: "About 4.18 kJ/(kg·K) at room temperature, close to 1 cal/(g·°C)." },
      { question: "Why is 1 BTU/(lb·°F) 4.1868 and not 4.184 kJ/(kg·K)?", answer: "The BTU here is the International Table BTU, based on 4.1868 J per calorie; the cal units use the thermochemical calorie (4.184 J)." },
      { question: "Are J/(g·°C) and kJ/(kg·K) the same?", answer: "Yes. Both equal 1,000 J/(kg·K)." },
    ],
  },
  "heat-density": {
    h1: "Heat Density Converter",
    metaDescription: "1 langley = 41,840 J/m². Heat density converter for J/m², kJ/m², Wh/m², kcal/m², cal/cm², langleys and BTU/ft², with an all-units table and FAQs.",
    faqs: [
      { question: "What is a langley?", answer: "1 calorie per square centimeter (41,840 J/m²). It was used for solar radiation data." },
      { question: "How many Wh/m² is 1 langley?", answer: `1 langley is about ${n(1, "langley", "wh-m2", "heat-density")} Wh/m².` },
      { question: "How many J/m² is 1 BTU/ft²?", answer: `1 BTU/ft² is about ${n(1, "btu-ft2", "j-m2", "heat-density")} J/m².` },
    ],
  },
  "heat-flux-density": {
    h1: "Heat Flux Density Converter",
    metaDescription: `1 W/m² = ${n(1, "w-m2", "btu-hft2", "heat-flux-density")} BTU/(h·ft²). Heat flux density converter for W/m², kW/m², W/cm², BTU/(h·ft²) and kcal/(h·m²), with FAQs.`,
    faqs: [
      { question: "How many BTU/(h·ft²) is 1 kW/m²?", answer: `1 kW/m² is about ${n(1, "kw-m2", "btu-hft2", "heat-flux-density")} BTU/(h·ft²).` },
      { question: "What is heat flux?", answer: "The rate of heat flow through a surface, per unit area." },
      { question: "How many W/m² is 1 W/cm²?", answer: "10,000 W/m², because 1 m² is 10,000 cm²." },
    ],
  },
  "heat-transfer-coefficient": {
    h1: "Heat Transfer Coefficient Converter",
    metaDescription: `1 BTU/(h·ft²·°F) = ${n(1, "btu-hft2f", "w-m2k", "heat-transfer-coefficient")} W/(m²·K). Heat transfer coefficient converter for U-values in W/(m²·K), kcal and BTU units.`,
    faqs: [
      { question: "How do I convert a US U-factor to a metric U-value?", answer: `Multiply by about ${n(1, "btu-hft2f", "w-m2k", "heat-transfer-coefficient")}: 1 BTU/(h·ft²·°F) is that many W/(m²·K).` },
      { question: "Is a lower U-value better?", answer: "For insulation, yes: less heat passes through each square meter for each degree of difference." },
      { question: "Are W/(m²·K) and W/(m²·°C) the same?", answer: "Yes. Kelvin and Celsius degrees are the same size." },
    ],
  },
  // --------------------------------------------------------- ELECTRICITY
  charge: {
    h1: "Electric Charge Converter",
    metaDescription: "1 Ah = 3,600 C and 1,000 mAh = 1 Ah. Electric charge converter for coulombs, mAh, Ah, faradays and statcoulombs, with FAQs.",
    faqs: [
      { question: "How many coulombs is 1 mAh?", answer: "Exactly 3.6 C, because 1 mA flowing for 3,600 seconds moves 3.6 coulombs." },
      { question: "How many Ah is a 5,000 mAh power bank?", answer: `5,000 mAh is ${n(5000, "mah", "ah", "charge")} Ah.` },
      { question: "What is the elementary charge?", answer: "The charge of one proton, exactly 1.602176634 × 10⁻¹⁹ C since 2019. One coulomb is about 6.24 × 10¹⁸ of them." },
    ],
  },
  "linear-charge-density": {
    h1: "Linear Charge Density Converter",
    metaDescription: "1 C/cm = 100 C/m. Linear charge density converter for C/m, C/cm, C/in, µC/m and abC/cm for wires, rods and field problems, with a table and FAQs.",
    faqs: [
      { question: "How many C/m is 1 C/in?", answer: `1 C/in is about ${n(1, "c-in", "c-m", "linear-charge-density")} C/m, because an inch is 0.0254 m.` },
      { question: "What symbol is used for linear charge density?", answer: "Usually the Greek letter λ (lambda)." },
      { question: "How many C/m is 1 abC/cm?", answer: "1,000 C/m, because 1 abcoulomb is 10 C and 1 cm is 0.01 m." },
    ],
  },
  "surface-charge-density": {
    h1: "Surface Charge Density Converter",
    metaDescription: "1 µC/cm² = 0.01 C/m². Surface charge density converter for C/m², C/cm², C/in², µC/cm² and abC/cm² for plates and sheets, with a table and FAQs.",
    faqs: [
      { question: "How many C/m² is 1 C/in²?", answer: `1 C/in² is about ${n(1, "c-in2", "c-m2", "surface-charge-density")} C/m².` },
      { question: "What symbol is used for surface charge density?", answer: "Usually the Greek letter σ (sigma)." },
      { question: "How many µC/cm² is 1 C/m²?", answer: "100 µC/cm²." },
    ],
  },
  "volume-charge-density": {
    h1: "Volume Charge Density Converter",
    metaDescription: "1 C/cm³ = 1,000,000 C/m³. Volume charge density converter for C/m³, C/cm³, C/in³ and µC/cm³ for physics and device work, with a table and FAQs.",
    faqs: [
      { question: "How many C/m³ is 1 C/in³?", answer: `1 C/in³ is about ${n(1, "c-in3", "c-m3", "volume-charge-density")} C/m³.` },
      { question: "Why is 1 µC/cm³ equal to 1 C/m³?", answer: "Both the micro (10⁻⁶) and the cm³ (10⁻⁶ m³) cancel out." },
      { question: "What symbol is used for volume charge density?", answer: "Usually the Greek letter ρ (rho)." },
    ],
  },
  current: {
    h1: "Electric Current Converter",
    metaDescription: "1 A = 1,000 mA. Electric current converter for amperes, milliamps, microamps, kiloamps, abamperes and statamperes, with an all-units table and FAQs.",
    faqs: [
      { question: "How many mA is 2.4 A?", answer: `2.4 A is ${n(2.4, "a", "ma", "current")} mA, a common fast-charger rating.` },
      { question: "How many amps is 1 abampere?", answer: "Exactly 10 A. The abampere (biot) is the CGS electromagnetic unit." },
      { question: "Is amp the same as ampere?", answer: "Yes. Amp is the short, everyday name for the ampere." },
    ],
  },
  "linear-current-density": {
    h1: "Linear Current Density Converter",
    metaDescription: "1 A/cm = 100 A/m. Linear current density converter for A/m, A/cm, A/mm and A/in for motor windings and current sheets, with a table and FAQs.",
    faqs: [
      { question: "How many A/m is 1 A/in?", answer: `1 A/in is about ${n(1, "a-in", "a-m", "linear-current-density")} A/m.` },
      { question: "Where is linear current density used?", answer: "In electric motor and generator design, where it is called the electric loading of the machine." },
      { question: "How many A/cm is 1 A/mm?", answer: "10 A/cm." },
    ],
  },
  "surface-current-density": {
    h1: "Current Density Converter",
    metaDescription: "1 A/cm² = 10,000 A/m². Current density converter for A/m², A/cm², A/in² and mA/cm² for cables, busbars and electroplating, with a table and FAQs.",
    faqs: [
      { question: "How many A/m² is 1 A/in²?", answer: `1 A/in² is about ${n(1, "a-in2", "a-m2", "surface-current-density")} A/m².` },
      { question: "How many mA/cm² is 1 A/m²?", answer: "0.1 mA/cm²." },
      { question: "Why does current density matter for wires?", answer: "Too much current per square millimeter heats a conductor, so cables and busbars are sized to keep it in a safe range." },
    ],
  },
  "electric-field-strength": {
    h1: "Electric Field Strength Converter",
    metaDescription: "1 kV/cm = 100,000 V/m. Electric field strength converter for V/m, kV/m, V/cm, V/mm, kV/cm, V/in and statV/cm, with an all-units table and FAQs.",
    faqs: [
      { question: "What is the breakdown strength of air?", answer: "About 3 kV/mm (30 kV/cm, or 3,000,000 V/m) in dry air at sea level." },
      { question: "How many V/m is 1 V/in?", answer: `1 V/in is about ${n(1, "v-in", "v-m", "electric-field-strength")} V/m.` },
      { question: "Is V/m the same as N/C?", answer: "Yes. One volt per meter equals one newton per coulomb." },
    ],
  },
  "electric-potential": {
    h1: "Voltage Converter",
    metaDescription: "1 kV = 1,000 V. Voltage converter for volts, microvolts, millivolts, kilovolts, megavolts, abvolts and statvolts, with FAQs.",
    faqs: [
      { question: "How many volts is 11 kV?", answer: `11 kV is ${n(11, "kv", "v", "electric-potential")} V, a common distribution line voltage.` },
      { question: "How many volts is 1 statvolt?", answer: "Exactly 299.792458 V, the CGS electrostatic unit." },
      { question: "Does this convert AC to DC?", answer: "No. It changes the unit only; 230 V AC is still 0.23 kV AC." },
    ],
  },
  "electric-resistance": {
    h1: "Electric Resistance Converter",
    metaDescription: "1 kΩ = 1,000 Ω and 1 MΩ = 1,000 kΩ. Electric resistance converter for ohms, milliohms, kiloohms, megaohms, abohms and statohms, with FAQs.",
    faqs: [
      { question: "How many ohms is a 4.7 kΩ resistor?", answer: `4.7 kΩ is ${n(4.7, "kohm", "ohm", "electric-resistance")} Ω.` },
      { question: "Why do resistors say 4K7?", answer: "The letter replaces the decimal point, so 4K7 means 4.7 kΩ and 1M5 means 1.5 MΩ." },
      { question: "What is a milliohm used for?", answer: "Measuring very low resistance, like battery internal resistance, cable joints and shunts." },
    ],
  },
  "electric-resistivity": {
    h1: "Electric Resistivity Converter",
    metaDescription: "1 Ω·cm = 0.01 Ω·m. Electric resistivity converter for Ω·m, Ω·cm, Ω·mm²/m, µΩ·cm and Ω·circular mil per foot for materials and cables, with FAQs.",
    faqs: [
      { question: "What is the resistivity of copper?", answer: "About 1.68 × 10⁻⁸ Ω·m at 20 °C, which is 0.0168 Ω·mm²/m or 1.68 µΩ·cm." },
      { question: "How many Ω·m is 1 Ω·circular mil per foot?", answer: `About ${n(1, "ohm-cmil-ft", "ohm-m", "electric-resistivity")} Ω·m.` },
      { question: "What is the difference between resistance and resistivity?", answer: "Resistance belongs to a particular wire or part. Resistivity belongs to the material, whatever its length or thickness." },
    ],
  },
  "electric-conductance": {
    h1: "Electric Conductance Converter",
    metaDescription: "1 S = 1,000 mS and 1 mho = 1 S. Electric conductance converter for siemens, millisiemens, microsiemens, mhos, abmhos and statmhos, with FAQs.",
    faqs: [
      { question: "Is a mho the same as a siemens?", answer: "Yes. The mho (ohm spelled backwards) is the old name for the siemens." },
      { question: "How do I get conductance from resistance?", answer: "Divide 1 by the resistance in ohms. A 100 Ω resistor has a conductance of 0.01 S." },
      { question: "How many µS is 1 mS?", answer: "1,000 µS." },
    ],
  },
  "electric-conductivity": {
    h1: "Electric Conductivity Converter",
    metaDescription: "1,000 µS/cm = 1 mS/cm. Electric conductivity converter for µS/cm, mS/cm, S/cm, S/m and mho/m for testing water, with FAQs.",
    faqs: [
      { question: "What EC is normal for drinking water?", answer: "Tap water is often around 50 to 800 µS/cm. Pure distilled water is close to 0." },
      { question: "How do I convert EC to TDS?", answer: "Meters often use TDS (ppm) ≈ EC (µS/cm) × 0.5 to 0.7. The factor depends on the water, so it is an estimate, not a unit conversion." },
      { question: "How many S/m is 1 mS/cm?", answer: "0.1 S/m." },
    ],
  },
  capacitance: {
    h1: "Capacitance Converter",
    metaDescription: "1 µF = 1,000 nF and 1 nF = 1,000 pF. Capacitance converter for farads, millifarads, microfarads, nanofarads, picofarads and CGS units, with FAQs.",
    faqs: [
      { question: "What does 104 on a capacitor mean?", answer: "10 followed by 4 zeros pF: 100,000 pF, which is 100 nF or 0.1 µF." },
      { question: "Is MFD the same as µF?", answer: "Yes. Older motor and fan capacitors use MFD for microfarads." },
      { question: "How many pF is 1 µF?", answer: `1 µF is ${n(1, "uf", "pf", "capacitance")} pF.` },
    ],
  },
  inductance: {
    h1: "Inductance Converter",
    metaDescription: "1 mH = 1,000 µH. Inductance converter for henries, millihenries, microhenries, nanohenries, abhenries and stathenries for coils, with FAQs.",
    faqs: [
      { question: "How many µH is 0.1 mH?", answer: `0.1 mH is ${n(0.1, "mh", "uh", "inductance")} µH.` },
      { question: "Is the abhenry the same as the nanohenry?", answer: "In size, yes. 1 abhenry is exactly 10⁻⁹ H, the CGS electromagnetic unit." },
      { question: "Is the plural henries or henrys?", answer: "Both are used. The SI brochure uses henries." },
    ],
  },

  // ----------------------------------------------------------- MAGNETISM
  "magnetomotive-force": {
    h1: "Magnetomotive Force Converter",
    metaDescription: `1 gilbert = ${n(1, "gilbert", "at", "magnetomotive-force")} ampere-turns. Magnetomotive force converter for ampere-turns, kiloampere-turns and gilberts, with FAQs.`,
    faqs: [
      { question: "How do I work out ampere-turns?", answer: "Multiply the coil current by the number of turns. 2 A through 500 turns is 1,000 ampere-turns." },
      { question: "How many gilberts is 1 ampere-turn?", answer: `1 ampere-turn is about ${n(1, "at", "gilbert", "magnetomotive-force")} gilberts (4π/10).` },
      { question: "Is magnetomotive force really a force?", answer: "No. Despite the name, it is measured in amperes, like a magnetic version of voltage." },
    ],
  },
  "magnetic-field-strength": {
    h1: "Magnetic Field Strength Converter",
    metaDescription: `1 Oe = ${n(1, "oersted", "a-m", "magnetic-field-strength")} A/m. Magnetic field strength converter for A/m, kA/m, oersteds and ampere-turns per inch, with FAQs.`,
    faqs: [
      { question: "How many kA/m is 1,000 Oe?", answer: `1,000 Oe is about ${n(1000, "oersted", "ka-m", "magnetic-field-strength")} kA/m.` },
      { question: "Is the oersted the same as the gauss?", answer: "In air they have the same number, but the oersted measures H (field strength) and the gauss measures B (flux density)." },
      { question: "What does coercivity in kOe mean?", answer: "How strongly a magnet resists being demagnetised. Neodymium magnets are often 10 to 20 kOe." },
    ],
  },
  "magnetic-flux": {
    h1: "Magnetic Flux Converter",
    metaDescription: "1 Wb = 100,000,000 maxwells. Magnetic flux converter for webers, milliwebers, microwebers, maxwells and volt-seconds, with a table and FAQs.",
    faqs: [
      { question: "How many maxwells is 1 µWb?", answer: `1 µWb is ${n(1, "uwb", "maxwell", "magnetic-flux")} Mx.` },
      { question: "Why is a weber a volt-second?", answer: "A flux change of 1 Wb each second induces 1 V in a single loop, so 1 Wb = 1 V·s." },
      { question: "What is the difference between flux and flux density?", answer: "Flux (Wb) is the total field through an area. Flux density (T) is flux per square meter." },
    ],
  },
  "magnetic-flux-density": {
    h1: "Magnetic Flux Density Converter",
    metaDescription: "1 T = 10,000 G. Magnetic flux density converter for tesla, millitesla, microtesla, nanotesla, gauss, gamma and Wb/m², with a table and FAQs.",
    faqs: [
      { question: "How strong is the Earth's magnetic field?", answer: "About 25 to 65 µT, which is 0.25 to 0.65 gauss." },
      { question: "How strong is an MRI scanner?", answer: `Most are 1.5 or 3 T. 3 T is ${n(3, "t", "gauss", "magnetic-flux-density")} gauss.` },
      { question: "What is a gamma?", answer: "1 nanotesla. Geophysicists use it for small changes in the Earth's field." },
    ],
  },
  // -------------------------------------------------------------- FLUIDS
  flow: {
    h1: "Flow Rate Converter",
    metaDescription: `1 cusec = ${n(1, "cusec", "l-s", "flow")} L/s. Flow rate converter for cusecs, L/s, L/min, m³/h, GPM, CFM, MGD and barrels per day, with a table and FAQs.`,
    faqs: [
      { question: "What is a cusec?", answer: "One cubic foot per second. Canal, river and dam releases in Pakistan and India are usually given in cusecs." },
      { question: "How many cusecs is 1 m³/s (cumec)?", answer: `1 m³/s is about ${n(1, "m3-s", "cusec", "flow")} cusecs.` },
      { question: "How many L/min is 1 US GPM?", answer: `1 US gallon per minute is about ${n(1, "gpm", "l-min", "flow")} L/min.` },
    ],
  },
  "flow-mass": {
    h1: "Mass Flow Rate Converter",
    metaDescription: `1 t/h = ${n(1, "t-h", "kg-s", "flow-mass")} kg/s. Mass flow rate converter for kg/s, g/s, kg/min, kg/h, tonnes per hour and lb/s, lb/min or lb/h, with FAQs.`,
    faqs: [
      { question: "How many lb/h is 1 kg/h?", answer: `1 kg/h is about ${n(1, "kg-h", "lb-h", "flow-mass")} lb/h.` },
      { question: "How do I turn mass flow into volume flow?", answer: "Divide by the density. Water at about 1 kg/L means 1 kg/s is close to 1 L/s." },
      { question: "Where is t/h used?", answer: "For boiler steam output, crushers, conveyors and other bulk material handling." },
    ],
  },
  "flow-molar": {
    h1: "Molar Flow Rate Converter",
    metaDescription: `1 kmol/h = ${n(1, "kmol-h", "mol-s", "flow-molar")} mol/s. Molar flow rate converter for mol/s, mmol/s, kmol/s, mol/min, mol/h and kmol/h, with a table and FAQs.`,
    faqs: [
      { question: "How many mol/min is 1 mol/s?", answer: "60 mol/min." },
      { question: "How do I convert kmol/h to kg/h?", answer: "Multiply by the molar mass in kg/kmol. For water (18.015), 1 kmol/h is about 18 kg/h." },
      { question: "Why use moles instead of mass?", answer: "Chemical reactions combine substances in fixed mole ratios, so balances are easier in moles." },
    ],
  },
  "mass-flux-density": {
    h1: "Mass Flux Density Converter",
    metaDescription: `1 lb/(ft²·s) = ${n(1, "lb-ft2s", "kg-m2s", "mass-flux-density")} kg/(m²·s). Mass flux density converter for metric and pound units per second or hour, with FAQs.`,
    faqs: [
      { question: "How many kg/(m²·h) is 1 kg/(m²·s)?", answer: "3,600 kg/(m²·h)." },
      { question: "Is mass flux the same as mass flow rate?", answer: "No. Mass flux is mass flow rate divided by the area it flows through." },
      { question: "How many kg/(m²·s) is 1 g/(cm²·s)?", answer: "10 kg/(m²·s)." },
    ],
  },
  "concentration-molar": {
    h1: "Molar Concentration Converter",
    metaDescription: "1 M = 1,000 mM = 1,000,000 µM. Molar concentration converter for mol/L, mmol/L, µmol/L, nmol/L and mol/m³ for lab and blood tests, with FAQs.",
    faqs: [
      { question: "What does 1 M mean?", answer: "1 mole of the substance in each liter of solution (1 mol/L)." },
      { question: "How do I convert mmol/L to mg/dL?", answer: "Multiply by the molar mass and divide by 10. For glucose (180.16 g/mol), 5.5 mmol/L is about 99 mg/dL." },
      { question: "Is mmol/L the same as mol/m³?", answer: "Yes. 1 mmol/L equals exactly 1 mol/m³." },
    ],
  },
  "concentration-solution": {
    h1: "Solution Concentration Converter",
    metaDescription: "1 mg/L = 1 ppm for dilute water. Solution concentration converter for g/L, mg/L, µg/L, mg/mL, g/dL, mg/dL, lb/gal and grains per gallon.",
    faqs: [
      { question: "Is 1 mg/L always 1 ppm?", answer: "Only for dilute water solutions, where 1 L weighs about 1 kg. For dense or strong solutions, ppm by mass is different." },
      { question: "How many mg/L is 1 grain per gallon?", answer: `1 grain per US gallon is about ${n(1, "gr-gal", "mg-l", "concentration-solution")} mg/L, often used for water hardness.` },
      { question: "How many mg/dL is 1 g/L?", answer: "100 mg/dL." },
    ],
  },
  "viscosity-dynamic": {
    h1: "Dynamic Viscosity Converter",
    metaDescription: "1 cP = 1 mPa·s and 1 P = 0.1 Pa·s. Dynamic viscosity converter for Pa·s, mPa·s, poise, centipoise, lbf·s/ft², lb/(ft·s) and kgf·s/m², with FAQs.",
    faqs: [
      { question: "What is the viscosity of water?", answer: "About 1 cP (1 mPa·s) at 20 °C. Honey is several thousand cP." },
      { question: "How many cP is 1 lb/(ft·s)?", answer: `1 lb/(ft·s) is about ${n(1, "lb-ft-s", "cp", "viscosity-dynamic")} cP.` },
      { question: "What is the difference between dynamic and kinematic viscosity?", answer: "Dynamic viscosity (cP) is resistance to flow. Kinematic viscosity (cSt) is dynamic viscosity divided by density." },
    ],
  },
  "viscosity-kinematic": {
    h1: "Kinematic Viscosity Converter",
    metaDescription: "1 cSt = 1 mm²/s and 1 St = 100 cSt. Kinematic viscosity converter for m²/s, mm²/s, cm²/s, stokes, centistokes, ft²/s and in²/s, with FAQs.",
    faqs: [
      { question: "How do I convert cSt to cP?", answer: "Multiply by the density in g/cm³. An oil of 100 cSt and 0.9 g/cm³ is about 90 cP." },
      { question: "What viscosity is engine oil?", answer: "SAE 10W-40 is roughly 90 to 110 cSt at 40 °C and 13 to 15 cSt at 100 °C, depending on the brand." },
      { question: "How many cSt is 1 ft²/s?", answer: `1 ft²/s is ${n(1, "ft2-s", "cst", "viscosity-kinematic")} cSt.` },
    ],
  },
  "surface-tension": {
    h1: "Surface Tension Converter",
    metaDescription: "1 dyn/cm = 1 mN/m. Surface tension converter for N/m, mN/m, dyn/cm, erg/cm², lbf/in, lbf/ft and gf/cm for liquids and coatings, with FAQs.",
    faqs: [
      { question: "What is the surface tension of water?", answer: "About 72 mN/m (72 dyn/cm) at 25 °C." },
      { question: "Why are dyn/cm and erg/cm² the same?", answer: "Surface tension can be seen as force per length or energy per area; in CGS both give the same number." },
      { question: "How many N/m is 1 lbf/in?", answer: `1 lbf/in is about ${n(1, "lbf-in", "n-m", "surface-tension")} N/m.` },
    ],
  },
  permeability: {
    h1: "Permeability Converter",
    metaDescription: "1 darcy = 9.869233 × 10⁻¹³ m². Permeability converter for darcies, millidarcies, m², cm² and µm² for soil, groundwater and oil reservoirs.",
    faqs: [
      { question: "How many µm² is 1 darcy?", answer: `1 darcy is about ${n(1, "darcy", "um2", "permeability")} µm².` },
      { question: "What is a good reservoir permeability?", answer: "Oil reservoirs range from below 1 mD (tight rock) to several darcies (very permeable sand)." },
      { question: "Is this the same as hydraulic conductivity?", answer: "No. Hydraulic conductivity (m/s) also depends on the fluid. Intrinsic permeability belongs to the rock or soil only." },
    ],
  },

  // --------------------------------------------------------------- LIGHT
  luminance: {
    h1: "Luminance Converter",
    metaDescription: `1 fL = ${n(1, "fl", "cd-m2", "luminance")} cd/m². Luminance converter for nits, cd/m², cd/cm², stilb, foot-lamberts, lamberts and apostilbs, with FAQs.`,
    faqs: [
      { question: "Is a nit the same as cd/m²?", answer: "Yes. Screen brightness in nits is candelas per square meter." },
      { question: "How bright is a phone screen?", answer: "Most are 500 to 1,500 nits; outdoor peak modes can reach 2,000 nits or more." },
      { question: "How many nits is 14 foot-lamberts?", answer: `14 fL, the cinema standard, is about ${n(14, "fl", "nit", "luminance")} nits.` },
    ],
  },
  "luminous-intensity": {
    h1: "Luminous Intensity Converter",
    metaDescription: "1 cd = 1,000 mcd and 1 modern candlepower = 1 cd. Luminous intensity converter for candelas, millicandelas, kilocandelas and candlepower.",
    faqs: [
      { question: "What does mcd mean on an LED?", answer: "Millicandela, one thousandth of a candela. A bright 5 mm LED may be rated 10,000 mcd (10 cd)." },
      { question: "Is candlepower the same as a candela?", answer: "The modern candlepower is defined as 1 candela. Older national candle standards differed slightly." },
      { question: "Is candela the same as lumen?", answer: "No. Candela is brightness in one direction; lumen is the total light output in all directions." },
    ],
  },
  illuminance: {
    h1: "Illuminance Converter",
    metaDescription: `1 fc = ${n(1, "fc", "lux", "illuminance")} lux. Illuminance converter for lux, kilolux, lumens per m², foot-candles, phot and nox for lighting design, with FAQs.`,
    faqs: [
      { question: "How many lux does an office need?", answer: "About 300 to 500 lux on the desk is a common guideline." },
      { question: "How bright is sunlight in lux?", answer: "Direct sunlight is about 100,000 lux (100 klx); an overcast day is around 1,000 lux." },
      { question: "Is lux the same as lumens per square meter?", answer: "Yes. 1 lux is 1 lumen spread over 1 square meter." },
    ],
  },
  "image-resolution": {
    h1: "Image Resolution Converter",
    metaDescription: `300 dpi = ${n(300, "dpi", "dpcm", "image-resolution")} dots/cm. Image resolution converter for dpi, ppi, dots per cm, pixels per cm and dots per meter, with FAQs.`,
    faqs: [
      { question: "Are dpi and ppi the same?", answer: "In number, yes. dpi is used for printers and ppi for screens and images." },
      { question: "What resolution is best for printing photos?", answer: "300 dpi is the usual standard for sharp prints viewed up close." },
      { question: "How many pixels do I need for a 10 cm print at 300 dpi?", answer: `About ${n(300, "dpi", "dpcm", "image-resolution")} pixels per cm, so roughly 1,181 pixels across 10 cm.` },
    ],
  },
  "frequency-wavelength": {
    h1: "Frequency to Wavelength Converter",
    metaDescription: `500 nm = ${n(500, "nm", "thz", "frequency-wavelength")} THz. Frequency to wavelength converter for frequency (Hz to THz) and wavelength (m to nm) for light and radio waves, with FAQs.`,
    faqs: [
      { question: "What is the formula?", answer: "Frequency = speed of light ÷ wavelength, with c = 299,792,458 m/s in a vacuum." },
      { question: "What wavelength is 2.4 GHz Wi-Fi?", answer: `About ${n(2.4, "ghz", "cm", "frequency-wavelength")} cm.` },
      { question: "Does this work for sound?", answer: "No. Sound is much slower than light, so use the speed of sound instead (about 343 m/s in air)." },
    ],
  },

  // ----------------------------------------------------------- RADIOLOGY
  "radiation-dose": {
    h1: "Radiation Dose Converter (Sv, rem)",
    metaDescription: "1 rem = 10 mSv and 1 Sv = 100 rem. Radiation dose converter for sieverts, millisieverts, microsieverts, rem and millirem, with FAQs.",
    faqs: [
      { question: "How much radiation is a chest X-ray?", answer: "Roughly 0.1 mSv (10 mrem), similar to about 10 days of natural background radiation." },
      { question: "What is the yearly background dose?", answer: "About 2.4 mSv per year on average worldwide, though it varies by place." },
      { question: "How many µSv is 1 mrem?", answer: "10 µSv." },
    ],
  },
  "radiation-activity": {
    h1: "Radioactivity Converter (Bq, Ci)",
    metaDescription: "1 Ci = 37 GBq and 1 pCi = 0.037 Bq. Radioactivity converter for becquerels, kBq, MBq, GBq, curies, mCi, µCi, nCi, pCi and rutherfords, with FAQs.",
    faqs: [
      { question: "How many MBq is 1 mCi?", answer: `1 mCi is ${n(1, "mci", "mbq", "radiation-activity")} MBq.` },
      { question: "What does pCi/L mean for radon?", answer: "Picocuries per liter of air. 4 pCi/L is about 148 Bq/m³." },
      { question: "Is activity the same as dose?", answer: "No. Activity counts decays per second in a source; dose measures the effect on the body." },
    ],
  },
  "radiation-exposure": {
    h1: "Radiation Exposure Converter (R, C/kg)",
    metaDescription: "1 R = 2.58 × 10⁻⁴ C/kg exactly. Radiation exposure converter for coulombs per kilogram, mC/kg, roentgens and milliroentgens, with a table and FAQs.",
    faqs: [
      { question: "How many mR is 1 C/kg?", answer: `1 C/kg is about ${n(1, "c-kg", "mr", "radiation-exposure")} mR.` },
      { question: "Is a roentgen the same as a rem?", answer: "No. The roentgen measures ionisation in air; the rem measures the effect on the body." },
      { question: "Why is the roentgen still used?", answer: "Many older survey meters read in R/h or mR/h." },
    ],
  },
  "radiation-absorbed-dose": {
    h1: "Absorbed Dose Converter (Gy, rad)",
    metaDescription: "1 Gy = 100 rad = 1 J/kg. Absorbed dose converter for grays, milligrays, micrograys, rad, J/kg and erg per gram, with a table and FAQs.",
    faqs: [
      { question: "How many mGy is 1 rad?", answer: "10 mGy." },
      { question: "Is a gray the same as a sievert?", answer: "Not always. Gray is energy absorbed; sievert adjusts it for the type of radiation and body tissue." },
      { question: "What is a centigray?", answer: "0.01 Gy, which is exactly 1 rad." },
    ],
  },

  // --------------------------------------------------------------- OTHER
  prefixes: {
    h1: "Metric Prefix Converter",
    metaDescription: "1 kilo = 1,000 and 1 micro = 0.000001. Metric prefix converter for every SI prefix from quecto to quetta, including ronna and ronto (2022).",
    faqs: [
      { question: "What are the newest SI prefixes?", answer: "Ronna (10²⁷), quetta (10³⁰), ronto (10⁻²⁷) and quecto (10⁻³⁰), added in 2022." },
      { question: "How many micro are in one milli?", answer: "1,000." },
      { question: "Is a kilobyte 1,000 or 1,024 bytes?", answer: "In SI it is 1,000 bytes. 1,024 bytes is a kibibyte (KiB)." },
    ],
  },
  "data-transfer": {
    h1: "Data Transfer Rate Converter",
    metaDescription: "100 Mbps = 12.5 MB/s. Data transfer rate converter for bit/s, kbps, Mbps, Gbps, B/s, MB/s, GB/s and MiB/s, plus a download time calculator.",
    faqs: [
      { question: "Why is my download speed 8 times lower than my plan?", answer: "Plans are sold in megabits (Mbps) and downloads show megabytes (MB/s). One byte is 8 bits." },
      { question: "How long does a 1 GB file take at 100 Mbps?", answer: "About 80 seconds at full speed. Use the download time calculator above for other sizes." },
      { question: "How many Mbps is 1 Gbps?", answer: "1,000 Mbps." },
    ],
  },
  "sound-level": {
    h1: "Sound Level Converter (dB, Bel, Neper)",
    metaDescription: `1 Np = ${n(1, "np", "db", "sound-level")} dB. Sound level converter for decibels, bels and nepers, plus sound pressure in pascals to dB SPL (20 µPa reference).`,
    faqs: [
      { question: "How many dB SPL is 1 pascal?", answer: "About 94 dB SPL, the level many sound calibrators use." },
      { question: "How many dB is 1 neper?", answer: `For field quantities like pressure or voltage, 1 Np = 20 ÷ ln 10, about ${n(1, "np", "db", "sound-level")} dB.` },
      { question: "Does 6 dB more mean twice as loud?", answer: "6 dB more is twice the sound pressure. Most people hear about 10 dB more as twice as loud." },
    ],
  },
  typography: {
    h1: "Typography Converter (px, pt, rem)",
    metaDescription: "16 px = 12 pt = 1 rem (16 px base). Typography converter for px, pt, picas, em, rem, twips, mm and inches, with a base font size setting.",
    faqs: [
      { question: "How many points is 16 px?", answer: `12 pt, because CSS uses 96 px and 72 pt per inch.` },
      { question: "What is the difference between em and rem?", answer: "rem is based on the root (page) font size; em is based on the current element's font size. Both use the base size you pick here." },
      { question: "How many twips are in a point?", answer: "20. A twip is a twentieth of a point, used in Word and RTF files." },
    ],
  },
  "volume-lumber": {
    h1: "Lumber Volume Converter",
    metaDescription: `1 m³ = ${n(1, "m3", "board-foot", "volume-lumber")} board feet. Lumber volume converter for board feet, MBF, cubic feet, cubic meters, cords and hoppus feet.`,
    faqs: [
      { question: "How do I calculate board feet?", answer: "Thickness (in) × width (in) × length (ft) ÷ 12. A 2 × 6 × 8 ft board is 8 board feet." },
      { question: "How big is a cord of firewood?", answer: "A stack 4 ft × 4 ft × 8 ft, which is 128 cubic feet." },
      { question: "What is a hoppus foot?", answer: "A unit for round logs, equal to 4/π cubic feet (about 1.273 ft³), that allows for waste when squaring the log." },
    ],
  },
};

// Removes a "(px, pt, rem)" style note: "Typography Converter (px, pt, rem)" -> "Typography Converter".
const withoutNote = (text) => text.replace(/\s*\(.*?\)\s*/g, " ").trim();

// Heading words where the category name does not read well in "<name> units".
const HEADING_BASE = { prefixes: "Metric prefix" };

// Section headings on a category page. Their words double as the page's
// secondary keywords ("length conversion", "length units").
export function categoryHeadings(c) {
  const base = HEADING_BASE[c.id] ?? withoutNote(c.name).replace(/ units$/i, "");
  return {
    allUnits: `${base} conversion to all units`,
    units: `${base} units`,
    pairs: `${base} converters`,
  };
}

// Primary keyword = the h1 without its note, e.g. "length converter".
const primaryKeyword = (c) => withoutNote(c.h1).toLowerCase();

// Title with the unit count, e.g. "Length Converter – 27 Units, Instant Results".
// Falls back to a shorter form so it always stays under 60 characters.
function categoryTitle(c) {
  const name = withoutNote(c.h1);
  const count = getCategoryUnits(c.id).length;
  const options = [`${name} – ${count} Units, Instant Results`, `${name} – ${count} Units, Free`, `${name} – ${count} Units`];
  return options.find((t) => t.length < 60) ?? name;
}

// Pages added at launch; every other category page was added a day later.
const LAUNCH_CATEGORIES = new Set(["zameen", "length", "weight", "temperature", "area", "volume"]);

// Only categories with page content get a page (and appear in the sitemap).
export const CATEGORIES = UNIT_CATEGORIES.filter((c) => PAGE_CONTENT[c.id]).map((c) => {
  const page = { ...c, ...PAGE_CONTENT[c.id] };
  const h = categoryHeadings(page);
  return {
    ...page,
    title: categoryTitle(page),
    keywords: {
      primary: primaryKeyword(page),
      secondary: [h.allUnits.replace(/ to all units$/, "").toLowerCase(), h.units.toLowerCase()],
    },
    added: LAUNCH_CATEGORIES.has(c.id) ? "2026-11-08" : "2026-11-09",
    // Titles and descriptions of every category page were rewritten on this date.
    updated: page.updated ?? "2026-11-09",
  };
});

export function getCategory(id) {
  return CATEGORIES.find((c) => c.id === id) ?? null;
}
