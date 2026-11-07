// Site sections. Each one has a page at /{id} listing its converters.
// Order here is the order used in the footer and on the homepage.

export const CATEGORIES = [
  {
    id: "zameen",
    name: "Land units",
    h1: "Pakistani Land Unit Converters",
    intro:
      "Convert marla, kanal, acre and murabba to square feet, square yards and each other. Every area converter lets you pick the 272.25, 250 or 225 sq ft marla.",
    title: "Pakistani Land Unit Converters – Marla, Kanal, Acre",
    metaDescription:
      "Free converters for Pakistani land units: marla, kanal, acre, murabba, square feet and square yards, with all three marla standards.",
  },
  {
    id: "length",
    name: "Length",
    h1: "Length Converters",
    intro: "Convert between centimeters, inches, feet, meters, kilometers and miles, including height in feet and inches.",
    title: "Length Converters – cm, Inches, Feet, Meters, Miles",
    metaDescription: "Convert length units: cm to inches, inches to cm, feet to cm, meters to feet and km to miles.",
  },
  {
    id: "weight",
    name: "Weight",
    h1: "Weight Converters",
    intro: "Convert kilograms, pounds and grams, plus the tola and maund used in Pakistan.",
    title: "Weight Converters – kg, lbs, Grams, Tola, Maund",
    metaDescription: "Convert weight units: kg to lbs, lbs to kg, grams to kg, tola to gram, gram to tola and maund to kg.",
  },
  {
    id: "temperature",
    name: "Temperature",
    h1: "Temperature Converters",
    intro: "Convert between Celsius and Fahrenheit with the exact formula.",
    title: "Temperature Converters – Celsius and Fahrenheit",
    metaDescription: "Convert Celsius to Fahrenheit and Fahrenheit to Celsius, with formulas and tables.",
  },
  {
    id: "area",
    name: "Area",
    h1: "Area Converters",
    intro: "Convert square feet, square meters and square yards (gaz). For marla and kanal, see the land unit converters.",
    title: "Area Converters – Sq Ft, Sq Meters, Gaz",
    metaDescription: "Convert area units: square feet to square meters and gaz (square yards) to square feet.",
  },
  {
    id: "volume",
    name: "Volume",
    h1: "Volume Converters",
    intro: "Convert litres, millilitres, US and UK gallons, and US cups.",
    title: "Volume Converters – Litres, Gallons, Cups",
    metaDescription: "Convert volume units: litres to US and UK gallons, and millilitres to US cups.",
  },
];

export function getCategory(id) {
  return CATEGORIES.find((c) => c.id === id) ?? null;
}
