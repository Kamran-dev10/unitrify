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
};

// Only categories with page content get a page (and appear in the sitemap).
export const CATEGORIES = UNIT_CATEGORIES.filter((c) => PAGE_CONTENT[c.id]).map((c) => ({
  ...c,
  ...PAGE_CONTENT[c.id],
}));

export function getCategory(id) {
  return CATEGORIES.find((c) => c.id === id) ?? null;
}
