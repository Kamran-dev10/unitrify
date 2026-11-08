// Category pages (/{id}): SEO text and FAQs for each unit category.
// The unit data itself (name, group, intro, units) lives in lib/categories/
// and is merged in below, so CATEGORIES has everything a page needs.
//
// This file is only used on the server, so FAQ text never ships to the
// browser with the converter code.

import { UNIT_CATEGORIES } from "./categories/index.js";
import { convert, formatResult } from "./convert.js";

// n(1, "rpm", "rad-s", "angular-velocity") -> "0.1047" (numbers always come from the engine)
const n = (value, from, to, category) => formatResult(convert(value, from, to, category));

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
  // ---------------------------------------------------------- ENGINEERING
  "angular-velocity": {
    h1: "Angular Velocity Converter",
    title: "Angular Velocity Converter – rpm, rad/s, deg/s",
    metaDescription: `1 rpm = ${n(1, "rpm", "rad-s", "angular-velocity")} rad/s. Convert angular velocity between rpm, rad/s, degrees per second and revolutions per second, with a table and FAQs.`,
    faqs: [
      { question: "How many rad/s is 1 rpm?", answer: `1 rpm is about ${n(1, "rpm", "rad-s", "angular-velocity")} rad/s, because one revolution is 2π radians and a minute is 60 seconds.` },
      { question: "How many revolutions per second is 3,000 rpm?", answer: `3,000 rpm is ${n(3000, "rpm", "rev-s", "angular-velocity")} revolutions per second.` },
      { question: "Is rpm the same as hertz?", answer: "Not quite. 1 revolution per second (1 Hz of rotation) is 60 rpm." },
    ],
  },
  acceleration: {
    h1: "Acceleration Converter",
    title: "Acceleration Converter – g, m/s², ft/s²",
    metaDescription: "1 g = 9.80665 m/s² exactly. Convert acceleration between g-force, m/s², ft/s², Gal and km/h per second, with an all-units table and quick FAQs.",
    faqs: [
      { question: "What is 1 g in m/s²?", answer: "Exactly 9.80665 m/s², the value of standard gravity." },
      { question: "How many g is 0 to 100 km/h in 5 seconds?", answer: `That is 20 km/h per second on average, about ${n(20, "kmh-s", "m-s2", "acceleration")} m/s² or ${n(20, "kmh-s", "g", "acceleration")} g.` },
      { question: "What is a Gal?", answer: "1 Gal is 1 centimeter per second squared (0.01 m/s²). It is used in geophysics to measure small changes in gravity." },
    ],
  },
  "angular-acceleration": {
    h1: "Angular Acceleration Converter",
    title: "Angular Acceleration Converter – rad/s², rpm/s",
    metaDescription: `1 rpm/s = ${n(1, "rpm-s", "rad-s2", "angular-acceleration")} rad/s². Convert angular acceleration between rad/s², degrees per second squared, rpm per second and rev/s², with FAQs.`,
    faqs: [
      { question: "How many rad/s² is 1 rpm per second?", answer: `1 rpm/s is about ${n(1, "rpm-s", "rad-s2", "angular-acceleration")} rad/s².` },
      { question: "How many rad/s² is 1 rev/s²?", answer: `1 rev/s² is 2π, about ${n(1, "rev-s2", "rad-s2", "angular-acceleration")} rad/s².` },
      { question: "How do I work out angular acceleration?", answer: `Divide the change in speed by the time. 0 to 600 rpm in 2 seconds is 300 rpm/s, about ${n(300, "rpm-s", "rad-s2", "angular-acceleration")} rad/s².` },
    ],
  },
  density: {
    h1: "Density Converter",
    title: "Density Converter – kg/m³, g/cm³, lb/ft³",
    metaDescription: `1 g/cm³ = 1,000 kg/m³ = ${n(1, "g-cm3", "lb-ft3", "density")} lb/ft³. Convert density between metric and imperial units, with an all-units table and quick FAQs.`,
    faqs: [
      { question: "What is the density of water?", answer: "About 1 g/cm³ (1,000 kg/m³) near 4 °C, and very slightly less at room temperature." },
      { question: "Are g/cm³ and g/mL the same?", answer: "Yes. 1 cm³ is exactly 1 mL, so 1 g/cm³ = 1 g/mL = 1 kg/L." },
      { question: "How many lb/ft³ is 1,000 kg/m³?", answer: `1,000 kg/m³ is about ${n(1000, "kg-m3", "lb-ft3", "density")} lb/ft³.` },
    ],
  },
  "specific-volume": {
    h1: "Specific Volume Converter",
    title: "Specific Volume Converter – m³/kg, ft³/lb",
    metaDescription: `1 ft³/lb = ${n(1, "ft3-lb", "m3-kg", "specific-volume")} m³/kg. Convert specific volume between m³/kg, L/kg, cm³/g, ft³/lb and US gal/lb, with a table and quick FAQs.`,
    faqs: [
      { question: "What is specific volume?", answer: "The volume taken up by one unit of mass. It is the inverse of density." },
      { question: "How do I get specific volume from density?", answer: "Divide 1 by the density. Water at about 1,000 kg/m³ has a specific volume of about 0.001 m³/kg." },
      { question: "How many m³/kg is 1 ft³/lb?", answer: `1 ft³/lb is about ${n(1, "ft3-lb", "m3-kg", "specific-volume")} m³/kg.` },
    ],
  },
  "moment-of-inertia": {
    h1: "Moment of Inertia Converter",
    title: "Moment of Inertia Converter – kg·m², lb·ft²",
    metaDescription: `1 kg·m² = ${n(1, "kg-m2", "lb-ft2", "moment-of-inertia")} lb·ft². Convert moment of inertia between kg·m², kg·cm², g·cm², lb·ft², lb·in² and slug·ft², with FAQs.`,
    faqs: [
      { question: "How many lb·ft² is 1 kg·m²?", answer: `1 kg·m² is about ${n(1, "kg-m2", "lb-ft2", "moment-of-inertia")} lb·ft².` },
      { question: "How many kg·cm² is 1 kg·m²?", answer: "10,000 kg·cm², because 1 m² is 10,000 cm²." },
      { question: "What is the moment of inertia of a solid disc?", answer: "½ × mass × radius² about its centre. A 2 kg disc with a 0.1 m radius has 0.01 kg·m²." },
    ],
  },
  torque: {
    h1: "Torque Converter",
    title: "Torque Converter – N·m, lb·ft, lb·in, kgf·m",
    metaDescription: `1 lbf·ft = ${n(1, "lbf-ft", "n-m", "torque")} N·m. Convert torque (moment of force) between N·m, foot-pounds, inch-pounds and kgf·m, with a table and quick FAQs.`,
    faqs: [
      { question: "Is torque the same as moment of force?", answer: "Yes. Both are force times distance and use the same units, so this one converter covers both." },
      { question: "How many N·m is 1 foot-pound?", answer: `1 lbf·ft (foot-pound) is about ${n(1, "lbf-ft", "n-m", "torque")} N·m.` },
      { question: "How many inch-pounds are in a foot-pound?", answer: "12, because a foot is 12 inches." },
    ],
  },

  // ---------------------------------------------------------------- HEAT
  "fuel-efficiency-mass": {
    h1: "Fuel Energy per Mass Converter",
    title: "Fuel Energy per Mass Converter – MJ/kg, BTU/lb",
    metaDescription: `1 MJ/kg = ${n(1, "mj-kg", "btu-lb", "fuel-efficiency-mass")} BTU/lb. Convert fuel heating values per mass between J/kg, MJ/kg, cal/g, kcal/kg and BTU/lb, with FAQs.`,
    faqs: [
      { question: "How many BTU/lb is 1 MJ/kg?", answer: `1 MJ/kg is about ${n(1, "mj-kg", "btu-lb", "fuel-efficiency-mass")} BTU/lb.` },
      { question: "Are cal/g and kcal/kg the same?", answer: "Yes. Both equal 4,184 J/kg (thermochemical calorie)." },
      { question: "What is a heating value?", answer: "The energy released when a fuel burns completely. The higher heating value includes the heat from condensing water vapour; the lower heating value does not." },
    ],
  },
  "fuel-efficiency-volume": {
    h1: "Fuel Energy per Volume Converter",
    title: "Fuel Energy per Volume Converter – MJ/m³, BTU/ft³",
    metaDescription: `1 MJ/m³ = ${n(1, "mj-m3", "btu-ft3", "fuel-efficiency-volume")} BTU/ft³. Convert fuel energy per volume between J/L, kJ/L, MJ/m³, kcal/m³, BTU/ft³ and BTU/gal.`,
    faqs: [
      { question: "How many BTU/ft³ is 1 MJ/m³?", answer: `1 MJ/m³ is about ${n(1, "mj-m3", "btu-ft3", "fuel-efficiency-volume")} BTU/ft³.` },
      { question: "Are kJ/L and MJ/m³ the same?", answer: "Yes. A cubic meter is 1,000 liters, so 1 kJ/L = 1 MJ/m³." },
      { question: "How many BTU per US gallon is 1 MJ/L?", answer: `1 MJ/L (1,000 kJ/L) is about ${n(1000, "kj-l", "btu-gal", "fuel-efficiency-volume")} BTU/gal.` },
    ],
  },
  "temperature-interval": {
    h1: "Temperature Difference Converter",
    title: "Temperature Difference Converter – °C to °F Change",
    metaDescription: "A change of 10 °C is a change of 18 °F. Convert temperature differences between °C, °F, K, °R and °Ré, which works unlike readings. Table and FAQs.",
    faqs: [
      { question: "Why is a 10 °C rise 18 °F and not 50 °F?", answer: "50 °F is the reading for 10 °C. A change only uses the size of the degree (×1.8), with no +32 offset." },
      { question: "Is a change of 1 K the same as 1 °C?", answer: "Yes. Kelvin and Celsius degrees are the same size, so differences are equal." },
      { question: "When should I use this instead of the temperature converter?", answer: "Use this for rises, drops, ranges and tolerances. Use the temperature converter for a reading on a thermometer." },
    ],
  },
  "thermal-expansion": {
    h1: "Thermal Expansion Converter",
    title: "Thermal Expansion Converter – 1/K, 1/°F, ppm/K",
    metaDescription: "1 ppm/K = 0.000001 per kelvin. Convert thermal expansion coefficients between 1/K, 1/°C, 1/°F, 1/°R and ppm/K, with an all-units table and quick FAQs.",
    faqs: [
      { question: "Why is the per °F value smaller than the per °C value?", answer: "A Fahrenheit degree is smaller (1/1.8 of a Celsius degree), so a material grows less for each °F." },
      { question: "What does 12 ppm/K mean?", answer: "The material grows by 12 millionths of its length for each kelvin. A 1 m bar grows 0.012 mm per degree." },
      { question: "Are 1/K and 1/°C the same?", answer: "Yes. Kelvin and Celsius degrees are the same size, so the coefficient is the same." },
    ],
  },
  "thermal-resistance": {
    h1: "Thermal Resistance Converter",
    title: "Thermal Resistance Converter – K/W, °C/W",
    metaDescription: `1 °F·h/BTU = ${n(1, "f-h-btu", "k-w", "thermal-resistance")} K/W. Convert thermal resistance between K/W, °C/W and °F·h/BTU for heat sinks and insulation, with FAQs.`,
    faqs: [
      { question: "Are K/W and °C/W the same?", answer: "Yes. Kelvin and Celsius degrees are the same size, so the numbers are identical." },
      { question: "What does a 2 °C/W heat sink mean?", answer: "Each watt of heat raises the temperature 2 °C above the surrounding air, so 10 W gives a 20 °C rise." },
      { question: "Is this the same as an R-value?", answer: "No. An R-value is per area of insulation; thermal resistance here is for a whole part or layer." },
    ],
  },
  "thermal-conductivity": {
    h1: "Thermal Conductivity Converter",
    title: "Thermal Conductivity Converter – W/(m·K), BTU",
    metaDescription: `1 W/(m·K) = ${n(1, "w-mk", "btu-hftf", "thermal-conductivity")} BTU/(h·ft·°F). Convert thermal conductivity between metric, BTU and kcal units, with a table and FAQs.`,
    faqs: [
      { question: "How many BTU/(h·ft·°F) is 1 W/(m·K)?", answer: `1 W/(m·K) is about ${n(1, "w-mk", "btu-hftf", "thermal-conductivity")} BTU/(h·ft·°F).` },
      { question: "What is a k-value?", answer: `It is thermal conductivity, often given for insulation in BTU·in/(h·ft²·°F). 1 W/(m·K) is about ${n(1, "w-mk", "btu-in-hft2f", "thermal-conductivity")} in those units.` },
      { question: "Which kilocalorie does the kcal unit use?", answer: "The International Table kilocalorie, so 1 kcal/(h·m·°C) is exactly 1.163 W/(m·K)." },
    ],
  },
  "specific-heat-capacity": {
    h1: "Specific Heat Capacity Converter",
    title: "Specific Heat Capacity Converter – J/(kg·K), BTU",
    metaDescription: "1 BTU/(lb·°F) = 4.1868 kJ/(kg·K). Convert specific heat capacity between J/(kg·K), kJ/(kg·K), cal/(g·°C) and BTU/(lb·°F), with a table and FAQs.",
    faqs: [
      { question: "What is the specific heat of water?", answer: "About 4.18 kJ/(kg·K) at room temperature, close to 1 cal/(g·°C)." },
      { question: "Why is 1 BTU/(lb·°F) 4.1868 and not 4.184 kJ/(kg·K)?", answer: "The BTU here is the International Table BTU, based on 4.1868 J per calorie; the cal units use the thermochemical calorie (4.184 J)." },
      { question: "Are J/(g·°C) and kJ/(kg·K) the same?", answer: "Yes. Both equal 1,000 J/(kg·K)." },
    ],
  },
  "heat-density": {
    h1: "Heat Density Converter",
    title: "Heat Density Converter – J/m², Wh/m², Langley",
    metaDescription: "1 langley = 41,840 J/m². Convert heat density between J/m², kJ/m², Wh/m², kcal/m², cal/cm², langleys and BTU/ft², with an all-units table and FAQs.",
    faqs: [
      { question: "What is a langley?", answer: "1 calorie per square centimeter (41,840 J/m²). It was used for solar radiation data." },
      { question: "How many Wh/m² is 1 langley?", answer: `1 langley is about ${n(1, "langley", "wh-m2", "heat-density")} Wh/m².` },
      { question: "How many J/m² is 1 BTU/ft²?", answer: `1 BTU/ft² is about ${n(1, "btu-ft2", "j-m2", "heat-density")} J/m².` },
    ],
  },
  "heat-flux-density": {
    h1: "Heat Flux Density Converter",
    title: "Heat Flux Density Converter – W/m², BTU/(h·ft²)",
    metaDescription: `1 W/m² = ${n(1, "w-m2", "btu-hft2", "heat-flux-density")} BTU/(h·ft²). Convert heat flux density between W/m², kW/m², W/cm², BTU/(h·ft²) and kcal/(h·m²), with FAQs.`,
    faqs: [
      { question: "How many BTU/(h·ft²) is 1 kW/m²?", answer: `1 kW/m² is about ${n(1, "kw-m2", "btu-hft2", "heat-flux-density")} BTU/(h·ft²).` },
      { question: "What is heat flux?", answer: "The rate of heat flow through a surface, per unit area." },
      { question: "How many W/m² is 1 W/cm²?", answer: "10,000 W/m², because 1 m² is 10,000 cm²." },
    ],
  },
  "heat-transfer-coefficient": {
    h1: "Heat Transfer Coefficient Converter",
    title: "Heat Transfer Coefficient Converter – U-value",
    metaDescription: `1 BTU/(h·ft²·°F) = ${n(1, "btu-hft2f", "w-m2k", "heat-transfer-coefficient")} W/(m²·K). Convert U-values and heat transfer coefficients between metric and US units.`,
    faqs: [
      { question: "How do I convert a US U-factor to a metric U-value?", answer: `Multiply by about ${n(1, "btu-hft2f", "w-m2k", "heat-transfer-coefficient")}: 1 BTU/(h·ft²·°F) is that many W/(m²·K).` },
      { question: "Is a lower U-value better?", answer: "For insulation, yes: less heat passes through each square meter for each degree of difference." },
      { question: "Are W/(m²·K) and W/(m²·°C) the same?", answer: "Yes. Kelvin and Celsius degrees are the same size." },
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
