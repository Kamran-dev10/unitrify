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
    metaDescription:
      "Free length converters: cm to inches, inches to cm, feet and inches to cm for height, meters to feet and km to miles, each with a table and FAQs.",
  },
  {
    id: "weight",
    name: "Weight",
    h1: "Weight Converters",
    intro: "Convert kilograms, pounds and grams, plus the tola and maund used in Pakistan.",
    title: "Weight Converters – kg, lbs, Grams, Tola, Maund",
    metaDescription:
      "Free weight converters: kg to lbs, lbs to kg and grams to kg, plus tola to gram and maund to kg for Pakistan. Each has a converter, table and FAQs.",
  },
  {
    id: "temperature",
    name: "Temperature",
    h1: "Temperature Converters",
    intro: "Convert between Celsius and Fahrenheit with the exact formula.",
    title: "Temperature Converters – Celsius and Fahrenheit",
    metaDescription:
      "°F = °C × 1.8 + 32. Free temperature converters for Celsius to Fahrenheit and Fahrenheit to Celsius, each with the formula, a table and FAQs.",
  },
  {
    id: "area",
    name: "Area",
    h1: "Area Converters",
    intro: "Convert square feet, square meters and square yards (gaz). For marla and kanal, see the land unit converters.",
    title: "Area Converters – Sq Ft, Sq Meters, Gaz",
    metaDescription:
      "Free area converters: square feet to square meters and gaz (square yards) to square feet. For marla and kanal, see our land unit converters.",
  },
  {
    id: "volume",
    name: "Volume",
    h1: "Volume Converters",
    intro: "Convert litres, millilitres, US and UK gallons, and US cups.",
    title: "Volume Converters – Litres, Gallons, Cups",
    metaDescription:
      "Free volume converters: litres to US and UK gallons, and millilitres to US cups. Each page has an instant converter, a conversion table and FAQs.",
  },
];

export function getCategory(id) {
  return CATEGORIES.find((c) => c.id === id) ?? null;
}
