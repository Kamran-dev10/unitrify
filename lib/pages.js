// Every converter page on the site. Each one becomes a static page at
// /{category}/{slug}. Pakistani pages ("pk") have no country prefix.
//
// Fields:
//   category, slug        -> URL: /{category}/{slug}
//   unitCategory          -> unit category id in lib/categories/ ("zameen", "length", ...)
//   from, to              -> unit ids from lib/units.js
//   country               -> "pk" or "global"
//   title, metaDescription, h1
//   intro, formula        -> text (optional)
//   examples              -> array of text (optional)
//   faqs                  -> array of { question, answer } (optional)
//   related               -> array of slugs of other pages (optional)
//   tool                  -> optional: "plot" (PlotCalculator),
//                            "feet-inches" (FeetInchesConverter) or
//                            "plot-size" (PlotSizeAnswer, needs `size`).
//                            Default is the normal Converter.
//   size                  -> for "plot-size": how many `from` units, e.g. 5
//   alsoShow              -> optional: extra unit ids shown under the result
//   showPopularSizes      -> optional: show the "Popular plot sizes" cards
//

import { COMMON_PAGES } from "./pages-common.js";
import { TECHNICAL_PAGES } from "./pages-technical.js";
import { ELECTRIC_PAGES, KELVIN_PAGES } from "./pages-electric.js";
import { SCIENCE_PAGES } from "./pages-science.js";

const BASE_PAGES = [
  // -------------------------------------------------------------------------
  // ZAMEEN (Pakistani land units)
  // -------------------------------------------------------------------------
  {
    category: "zameen",
    slug: "marla-to-sq-ft",
    keywords: { primary: "marla to sq ft", secondary: ["marla to square feet","1 marla in square feet","marla size"] },
    unitCategory: "zameen",
    from: "marla",
    to: "sq-ft",
    country: "pk",
    showPopularSizes: true,
    title: "Marla to Sq Ft (1 marla = 272.25 sq ft) – 3 Standards",
    updated: "2026-11-09",
    metaDescription:
      "Convert marla to square feet instantly. Choose the 272.25, 250 or 225 sq ft marla standard and see a full marla to sq ft table.",
    h1: "Marla to Square Feet",
    intro:
      "1 marla is 272.25 square feet in the revenue standard. Land revenue records use the 272.25 sq ft marla. Many housing societies use a 225 or 250 sq ft marla instead, so check which one your plot uses.",
    formula: "Square feet = marla × marla size (272.25, 250 or 225 sq ft)",
    examples: [
      "5 marla = 1,361.25 sq ft (272.25 standard), 1,250 sq ft (250) or 1,125 sq ft (225)",
      "10 marla = 2,722.5 sq ft (272.25 standard), 2,500 sq ft (250) or 2,250 sq ft (225)",
      "20 marla (1 kanal) = 5,445 sq ft (272.25 standard), 5,000 sq ft (250) or 4,500 sq ft (225)",
    ],
    faqs: [
      {
        question: "How many square feet in 1 marla?",
        answer:
          "1 marla is 272.25 sq ft in the revenue standard. With the 250 sq ft standard it is 250 sq ft, and with the 225 sq ft standard it is 225 sq ft.",
      },
      {
        question: "How many square feet in 5 marla?",
        answer:
          "5 marla is 1,361.25 sq ft with a 272.25 sq ft marla, 1,250 sq ft with a 250 sq ft marla, and 1,125 sq ft with a 225 sq ft marla.",
      },
      {
        question: "How many square feet in 10 marla?",
        answer:
          "10 marla is 2,722.5 sq ft with a 272.25 sq ft marla, 2,500 sq ft with a 250 sq ft marla, and 2,250 sq ft with a 225 sq ft marla.",
      },
      {
        question: "Is 1 marla 225 or 272.25 square feet?",
        answer:
          "Both are in use. 272.25 sq ft is the revenue standard. Many housing societies use 225 or 250 sq ft. Always confirm the marla size in your plot documents.",
      },
      {
        question: "How many marla are in 1 kanal?",
        answer: "1 kanal is 20 marla, whichever marla size is used.",
      },
    ],
    related: ["kanal-to-marla", "sq-ft-to-marla", "marla-to-sq-yard"],
  },
  {
    category: "zameen",
    slug: "sq-ft-to-marla",
    keywords: { primary: "sq ft to marla", secondary: ["square feet to marla","how many marla in sq ft"] },
    unitCategory: "zameen",
    from: "sq-ft",
    to: "marla",
    country: "pk",
    title: "Sq Ft to Marla (272.25 sq ft = 1 marla) – Converter",
    updated: "2026-11-09",
    metaDescription:
      "Convert sq ft to marla. Pick the 272.25, 250 or 225 sq ft marla standard and get the exact marla size of your plot or house.",
    h1: "Square Feet to Marla",
    intro:
      "To get marla, divide square feet by the marla size: 1,000 sq ft is 3.6731 marla in the 272.25 sq ft revenue standard. Land revenue records use the 272.25 sq ft marla. Many housing societies use a 225 or 250 sq ft marla, which gives a higher marla count for the same area.",
    formula: "Marla = square feet ÷ marla size (272.25, 250 or 225 sq ft)",
    examples: [
      "1,000 sq ft = 3.6731 marla (272.25 standard), 4 marla (250) or 4.4444 marla (225)",
      "1,250 sq ft = 4.5914 marla (272.25 standard), 5 marla (250) or 5.5556 marla (225)",
      "2,000 sq ft = 7.3462 marla (272.25 standard), 8 marla (250) or 8.8889 marla (225)",
    ],
    faqs: [
      {
        question: "How many marla is 1,000 square feet?",
        answer:
          "1,000 sq ft is 3.6731 marla with a 272.25 sq ft marla, 4 marla with a 250 sq ft marla, and 4.4444 marla with a 225 sq ft marla.",
      },
      {
        question: "How many marla is 1,250 square feet?",
        answer:
          "1,250 sq ft is 4.5914 marla with a 272.25 sq ft marla, exactly 5 marla with a 250 sq ft marla, and 5.5556 marla with a 225 sq ft marla.",
      },
      {
        question: "How many marla is 2,000 square feet?",
        answer:
          "2,000 sq ft is 7.3462 marla with a 272.25 sq ft marla, 8 marla with a 250 sq ft marla, and 8.8889 marla with a 225 sq ft marla.",
      },
      {
        question: "Why do I get different marla values for the same area?",
        answer:
          "Because a marla is not the same size everywhere. The revenue standard is 272.25 sq ft, while many housing societies use 225 or 250 sq ft. Choose the standard that matches your documents.",
      },
      {
        question: "How do I find the marla of a plot from its length and width?",
        answer:
          "Multiply length by width in feet to get square feet, then divide by the marla size. The plot size calculator does both steps for you.",
      },
    ],
    related: ["marla-to-sq-ft", "plot-size-calculator", "kanal-to-sq-ft"],
  },
  {
    category: "zameen",
    slug: "kanal-to-marla",
    keywords: { primary: "kanal to marla", secondary: ["1 kanal in marla","kanal marla"] },
    unitCategory: "zameen",
    from: "kanal",
    to: "marla",
    country: "pk",
    title: "Kanal to Marla Converter – 1 Kanal = 20 Marla",
    metaDescription:
      "Convert kanal to marla. 1 kanal is always 20 marla. See half kanal, 1 kanal and 2 kanal in marla, plus a full table.",
    h1: "Kanal to Marla",
    intro:
      "1 kanal is 20 marla. This stays true whichever marla size you use; only the area in square feet changes. A kanal is 5,445 sq ft with a 272.25 sq ft marla and 4,500 sq ft with a 225 sq ft marla.",
    formula: "Marla = kanal × 20",
    examples: [
      "Half kanal (0.5 kanal) = 10 marla",
      "1 kanal = 20 marla",
      "2 kanal = 40 marla",
    ],
    faqs: [
      {
        question: "How many marla in 1 kanal?",
        answer: "1 kanal is 20 marla.",
      },
      {
        question: "How many marla in half a kanal?",
        answer: "Half a kanal (0.5 kanal) is 10 marla.",
      },
      {
        question: "How many marla in 2 kanal?",
        answer: "2 kanal is 40 marla.",
      },
      {
        question: "Does a kanal change size with the marla standard?",
        answer:
          "The kanal is always 20 marla, but its area in square feet follows the marla size: 5,445 sq ft (272.25 standard), 5,000 sq ft (250) or 4,500 sq ft (225).",
      },
      {
        question: "How many kanal are in 1 acre?",
        answer:
          "1 acre is 8 kanal with the 272.25 sq ft marla. With a 250 sq ft marla it is 8.712 kanal, and with a 225 sq ft marla it is 9.68 kanal.",
      },
    ],
    related: ["kanal-to-sq-ft", "marla-to-sq-ft", "acre-to-kanal"],
  },
  {
    category: "zameen",
    slug: "kanal-to-sq-ft",
    keywords: { primary: "kanal to sq ft", secondary: ["1 kanal in square feet","kanal size"] },
    unitCategory: "zameen",
    from: "kanal",
    to: "sq-ft",
    country: "pk",
    showPopularSizes: true,
    title: "Kanal to Sq Ft (1 kanal = 5,445 sq ft) – 3 Standards",
    updated: "2026-11-09",
    metaDescription:
      "Convert kanal to sq ft. 1 kanal is 5,445, 5,000 or 4,500 square feet depending on the marla standard. Includes a full table.",
    h1: "Kanal to Square Feet",
    intro:
      "1 kanal is 5,445 square feet in the 272.25 sq ft revenue standard, because a kanal is 20 marla. Land revenue records use the 272.25 sq ft marla. With a 250 sq ft marla a kanal is 5,000 sq ft, and with a 225 sq ft marla it is 4,500 sq ft.",
    formula: "Square feet = kanal × 20 × marla size",
    examples: [
      "Half kanal = 2,722.5 sq ft (272.25 standard), 2,500 sq ft (250) or 2,250 sq ft (225)",
      "1 kanal = 5,445 sq ft (272.25 standard), 5,000 sq ft (250) or 4,500 sq ft (225)",
      "2 kanal = 10,890 sq ft (272.25 standard), 10,000 sq ft (250) or 9,000 sq ft (225)",
    ],
    faqs: [
      {
        question: "How many square feet in 1 kanal?",
        answer:
          "1 kanal is 5,445 sq ft with a 272.25 sq ft marla, 5,000 sq ft with a 250 sq ft marla, and 4,500 sq ft with a 225 sq ft marla.",
      },
      {
        question: "How many square feet in half a kanal?",
        answer:
          "Half a kanal is 2,722.5 sq ft with a 272.25 sq ft marla, 2,500 sq ft with a 250 sq ft marla, and 2,250 sq ft with a 225 sq ft marla.",
      },
      {
        question: "How many square feet in 2 kanal?",
        answer:
          "2 kanal is 10,890 sq ft with a 272.25 sq ft marla, 10,000 sq ft with a 250 sq ft marla, and 9,000 sq ft with a 225 sq ft marla.",
      },
      {
        question: "Is 1 kanal 4,500 or 5,445 square feet?",
        answer:
          "It depends on the marla size. 5,445 sq ft uses the 272.25 sq ft revenue marla. 4,500 sq ft uses a 225 sq ft marla, which many housing societies use.",
      },
      {
        question: "How many square yards in 1 kanal?",
        answer:
          "1 kanal is 605 sq yards with a 272.25 sq ft marla, 555.5556 sq yards with a 250 sq ft marla, and 500 sq yards with a 225 sq ft marla.",
      },
    ],
    related: ["kanal-to-marla", "marla-to-sq-ft", "acre-to-kanal"],
  },
  {
    category: "zameen",
    slug: "acre-to-kanal",
    keywords: { primary: "acre to kanal", secondary: ["acres to kanal","1 acre in kanal"] },
    unitCategory: "zameen",
    from: "acre",
    to: "kanal",
    country: "pk",
    title: "Acre to Kanal Converter – 1 acre = 8 Kanal",
    metaDescription:
      "Convert acre to kanal. 1 acre is 8 kanal with the 272.25 sq ft marla. See values for the 250 and 225 sq ft standards too.",
    h1: "Acre to Kanal",
    intro:
      "1 acre is 8 kanal when a marla is 272.25 sq ft. An acre is always 43,560 sq ft, so with a smaller marla you get more kanal: 8.712 kanal with a 250 sq ft marla and 9.68 kanal with a 225 sq ft marla.",
    formula: "Kanal = acre × 43,560 ÷ (20 × marla size)",
    examples: [
      "1 acre = 8 kanal (272.25 standard), 8.712 kanal (250) or 9.68 kanal (225)",
      "2 acres = 16 kanal (272.25 standard), 17.424 kanal (250) or 19.36 kanal (225)",
      "5 acres = 40 kanal (272.25 standard), 43.56 kanal (250) or 48.4 kanal (225)",
    ],
    faqs: [
      {
        question: "How many kanal in 1 acre?",
        answer:
          "1 acre is 8 kanal with a 272.25 sq ft marla, 8.712 kanal with a 250 sq ft marla, and 9.68 kanal with a 225 sq ft marla.",
      },
      {
        question: "How many kanal in 2 acres?",
        answer:
          "2 acres is 16 kanal with a 272.25 sq ft marla, 17.424 kanal with a 250 sq ft marla, and 19.36 kanal with a 225 sq ft marla.",
      },
      {
        question: "How many kanal in 5 acres?",
        answer:
          "5 acres is 40 kanal with a 272.25 sq ft marla, 43.56 kanal with a 250 sq ft marla, and 48.4 kanal with a 225 sq ft marla.",
      },
      {
        question: "How many square feet in 1 acre?",
        answer: "1 acre is 43,560 sq ft. This does not change with the marla standard.",
      },
      {
        question: "How many marla in 1 acre?",
        answer:
          "1 acre is 160 marla with a 272.25 sq ft marla, 174.24 marla with a 250 sq ft marla, and 193.6 marla with a 225 sq ft marla.",
      },
    ],
    related: ["acre-to-marla", "kanal-to-marla", "murabba-to-acre"],
  },
  {
    category: "zameen",
    slug: "acre-to-marla",
    keywords: { primary: "acre to marla", secondary: ["acres to marla","1 acre in marla"] },
    unitCategory: "zameen",
    from: "acre",
    to: "marla",
    country: "pk",
    title: "Acre to Marla Converter – 1 acre = 160 Marla",
    metaDescription:
      "Convert acre to marla. 1 acre is 160 marla with the 272.25 sq ft marla, 174.24 with 250 sq ft and 193.6 with 225 sq ft.",
    h1: "Acre to Marla",
    intro:
      "1 acre is 160 marla when a marla is 272.25 sq ft. An acre is always 43,560 sq ft, so with a 250 sq ft marla it is 174.24 marla, and with a 225 sq ft marla it is 193.6 marla.",
    formula: "Marla = acre × 43,560 ÷ marla size",
    examples: [
      "1 acre = 160 marla (272.25 standard), 174.24 marla (250) or 193.6 marla (225)",
      "2 acres = 320 marla (272.25 standard), 348.48 marla (250) or 387.2 marla (225)",
      "5 acres = 800 marla (272.25 standard), 871.2 marla (250) or 968 marla (225)",
    ],
    faqs: [
      {
        question: "How many marla in 1 acre?",
        answer:
          "1 acre is 160 marla with a 272.25 sq ft marla, 174.24 marla with a 250 sq ft marla, and 193.6 marla with a 225 sq ft marla.",
      },
      {
        question: "How many marla in 2 acres?",
        answer:
          "2 acres is 320 marla with a 272.25 sq ft marla, 348.48 marla with a 250 sq ft marla, and 387.2 marla with a 225 sq ft marla.",
      },
      {
        question: "How many marla in 5 acres?",
        answer:
          "5 acres is 800 marla with a 272.25 sq ft marla, 871.2 marla with a 250 sq ft marla, and 968 marla with a 225 sq ft marla.",
      },
      {
        question: "Why is 1 acre exactly 160 marla?",
        answer:
          "Because 43,560 sq ft divided by 272.25 sq ft is exactly 160. That is also why 1 acre is exactly 8 kanal in this standard.",
      },
      {
        question: "How many kanal in 1 acre?",
        answer: "1 acre is 8 kanal with a 272.25 sq ft marla.",
      },
    ],
    related: ["acre-to-kanal", "marla-to-sq-ft", "acre-to-hectare"],
  },
  {
    category: "zameen",
    slug: "marla-to-sq-yard",
    keywords: { primary: "marla to square yard", secondary: ["marla to gaz","1 marla in square yards"] },
    unitCategory: "zameen",
    from: "marla",
    to: "sq-yd",
    country: "pk",
    title: "Marla to Square Yard (1 marla = 30.25 gaz) – Converter",
    updated: "2026-11-09",
    metaDescription:
      "Convert marla to square yards (gaz). 1 marla is 30.25 sq yd with the 272.25 sq ft marla, 27.7778 with 250 and 25 with 225.",
    h1: "Marla to Square Yards (Gaz)",
    intro:
      "1 marla is 30.25 square yards with the 272.25 sq ft revenue marla. A square yard is 9 sq ft, so a 250 sq ft marla is 27.7778 sq yd and a 225 sq ft marla is exactly 25 sq yd. In some cities, such as Karachi, plot sizes are usually given in square yards.",
    formula: "Square yards = marla × marla size ÷ 9",
    examples: [
      "5 marla = 151.25 sq yd (272.25 standard), 138.8889 sq yd (250) or 125 sq yd (225)",
      "10 marla = 302.5 sq yd (272.25 standard), 277.7778 sq yd (250) or 250 sq yd (225)",
      "1 kanal (20 marla) = 605 sq yd (272.25 standard), 555.5556 sq yd (250) or 500 sq yd (225)",
    ],
    faqs: [
      {
        question: "How many square yards in 1 marla?",
        answer:
          "1 marla is 30.25 sq yd with a 272.25 sq ft marla, 27.7778 sq yd with a 250 sq ft marla, and 25 sq yd with a 225 sq ft marla.",
      },
      {
        question: "How many square yards in 5 marla?",
        answer:
          "5 marla is 151.25 sq yd with a 272.25 sq ft marla, 138.8889 sq yd with a 250 sq ft marla, and 125 sq yd with a 225 sq ft marla.",
      },
      {
        question: "How many square yards in 10 marla?",
        answer:
          "10 marla is 302.5 sq yd with a 272.25 sq ft marla, 277.7778 sq yd with a 250 sq ft marla, and 250 sq yd with a 225 sq ft marla.",
      },
      {
        question: "Is a gaz the same as a square yard?",
        answer:
          "When talking about plot area, \"gaz\" usually means a square yard (9 sq ft). As a length, 1 gaz is 1 yard, which is 3 feet.",
      },
      {
        question: "How many square yards in 1 kanal?",
        answer:
          "1 kanal is 605 sq yd with a 272.25 sq ft marla, 555.5556 sq yd with a 250 sq ft marla, and 500 sq yd with a 225 sq ft marla.",
      },
    ],
    related: ["marla-to-sq-ft", "sq-ft-to-marla", "kanal-to-sq-ft"],
  },
  {
    category: "zameen",
    slug: "murabba-to-acre",
    keywords: { primary: "murabba to acre", secondary: ["1 murabba in acres","murabba size"] },
    unitCategory: "zameen",
    from: "murabba",
    to: "acre",
    country: "pk",
    title: "Murabba to Acre Converter – 1 Murabba = 25 acres",
    metaDescription:
      "Convert murabba to acres. 1 murabba is 25 acres. See 2 and 4 murabba in acres, and a murabba in kanal and square feet.",
    h1: "Murabba to Acre",
    intro:
      "1 murabba is 25 acres, which is 1,089,000 square feet. A murabba is a traditional unit for agricultural land, used mainly in Punjab. With the 272.25 sq ft marla, 1 murabba is 200 kanal.",
    formula: "Acres = murabba × 25",
    examples: [
      "1 murabba = 25 acres",
      "2 murabba = 50 acres",
      "4 murabba = 100 acres",
    ],
    faqs: [
      {
        question: "How many acres in 1 murabba?",
        answer: "1 murabba is 25 acres.",
      },
      {
        question: "How many kanal in 1 murabba?",
        answer:
          "1 murabba is 200 kanal with a 272.25 sq ft marla. With a 250 sq ft marla it is 217.8 kanal, and with a 225 sq ft marla it is 242 kanal.",
      },
      {
        question: "How many square feet in 1 murabba?",
        answer: "1 murabba is 1,089,000 sq ft (25 × 43,560 sq ft).",
      },
      {
        question: "How many hectares in 1 murabba?",
        answer: "1 murabba (25 acres) is about 10.1171 hectares.",
      },
      {
        question: "Where is the murabba used?",
        answer:
          "The murabba is used mainly for agricultural land in Punjab. For plots and houses, marla and kanal are more common.",
      },
    ],
    related: ["acre-to-kanal", "acre-to-hectare", "acre-to-marla"],
  },
  {
    category: "zameen",
    slug: "acre-to-hectare",
    keywords: { primary: "acre to hectare", secondary: ["acres to hectares","hectare to acre"] },
    unitCategory: "zameen",
    from: "acre",
    to: "hectare",
    country: "pk",
    title: "Acre to Hectare Converter – 1 acre = 0.4047 ha",
    metaDescription:
      "Convert acres to hectares. 1 acre is 0.4047 hectares and 1 hectare is 2.4711 acres. Includes a full acre to hectare table.",
    h1: "Acre to Hectare",
    intro:
      "1 acre is about 0.4047 hectares, and 1 hectare is about 2.4711 acres. An acre is 43,560 sq ft and a hectare is 10,000 square meters.",
    formula: "Hectares = acres × 0.4047 (more exactly, acres × 43,560 ÷ 107,639.1)",
    examples: [
      "1 acre = 0.4047 hectares",
      "10 acres = 4.0469 hectares",
      "25 acres (1 murabba) = 10.1171 hectares",
    ],
    faqs: [
      {
        question: "How many hectares in 1 acre?",
        answer: "1 acre is about 0.4047 hectares.",
      },
      {
        question: "How many acres in 1 hectare?",
        answer: "1 hectare is about 2.4711 acres.",
      },
      {
        question: "How many hectares in 100 acres?",
        answer: "100 acres is about 40.4686 hectares.",
      },
      {
        question: "Is a hectare bigger than an acre?",
        answer: "Yes. A hectare is about 2.47 times the size of an acre.",
      },
      {
        question: "How many hectares in 1 murabba?",
        answer: "1 murabba is 25 acres, which is about 10.1171 hectares.",
      },
    ],
    related: ["acre-to-kanal", "murabba-to-acre", "acre-to-marla"],
  },
  {
    category: "zameen",
    slug: "plot-size-calculator",
    keywords: { primary: "plot size calculator", secondary: ["plot area calculator","plot size in marla"] },
    unitCategory: "zameen",
    tool: "plot",
    country: "pk",
    title: "Plot Size Calculator – Length × Width to Marla",
    metaDescription:
      "Plot size calculator: enter length and width in feet to get the area in square feet, marla, kanal and square yards, with all 3 marla sizes.",
    h1: "Plot Size Calculator",
    intro:
      "Enter the length and width of your plot in feet to see its area in square feet, marla, kanal and square yards. A 25 × 50 ft plot is 1,250 sq ft, which is 4.5914 marla with the 272.25 sq ft marla or exactly 5 marla with a 250 sq ft marla.",
    formula: "Area (sq ft) = length (ft) × width (ft), then marla = sq ft ÷ marla size",
    examples: [
      "25 × 50 ft = 1,250 sq ft = 4.5914 marla (272.25 standard), 5 marla (250) or 5.5556 marla (225)",
      "30 × 60 ft = 1,800 sq ft = 6.6116 marla (272.25 standard), 7.2 marla (250) or 8 marla (225)",
      "40 × 80 ft = 3,200 sq ft = 11.7539 marla (272.25 standard), 12.8 marla (250) or 14.2222 marla (225)",
    ],
    faqs: [
      {
        question: "How many marla is a 25 × 50 plot?",
        answer:
          "A 25 × 50 ft plot is 1,250 sq ft: 4.5914 marla with a 272.25 sq ft marla, 5 marla with a 250 sq ft marla, and 5.5556 marla with a 225 sq ft marla.",
      },
      {
        question: "How many marla is a 30 × 60 plot?",
        answer:
          "A 30 × 60 ft plot is 1,800 sq ft: 6.6116 marla with a 272.25 sq ft marla, 7.2 marla with a 250 sq ft marla, and 8 marla with a 225 sq ft marla.",
      },
      {
        question: "How many marla is a 40 × 80 plot?",
        answer:
          "A 40 × 80 ft plot is 3,200 sq ft: 11.7539 marla with a 272.25 sq ft marla, 12.8 marla with a 250 sq ft marla, and 14.2222 marla with a 225 sq ft marla.",
      },
      {
        question: "How do I calculate plot size in marla?",
        answer:
          "Multiply length by width in feet to get square feet. Then divide by the marla size used for your plot: 272.25, 250 or 225 sq ft.",
      },
      {
        question: "What if my plot is not a rectangle?",
        answer:
          "This calculator works for rectangular plots. For other shapes, split the plot into rectangles, add up their square feet, and convert the total.",
      },
    ],
    related: ["sq-ft-to-marla", "marla-to-sq-ft", "kanal-to-sq-ft"],
  },

  // -------------------------------------------------------------------------
  // ZAMEEN: popular plot sizes (PlotSizeAnswer)
  // -------------------------------------------------------------------------
  {
    category: "zameen",
    slug: "3-marla-in-sq-ft",
    keywords: { primary: "3 marla in sq ft", secondary: ["3 marla plot size","3 marla in square feet"] },
    unitCategory: "zameen",
    from: "marla",
    to: "sq-ft",
    tool: "plot-size",
    size: 3,
    country: "pk",
    title: "3 Marla in Sq Ft – 816.75, 750 or 675 Sq Ft",
    metaDescription:
      "3 marla in sq ft: 816.75 sq ft (272.25 standard), 750 sq ft (250) or 675 sq ft (225). Also shown in sq yards, sq meters, kanal and acres.",
    h1: "3 Marla in Square Feet",
    intro:
      "3 marla is 816.75 square feet with the 272.25 sq ft revenue marla, 750 sq ft with a 250 sq ft marla, and 675 sq ft with a 225 sq ft marla. 3 marla is 0.15 kanal, one of the smallest plot sizes listed here.",
    formula: "Square feet = 3 × marla size",
    faqs: [
      {
        question: "Why does 3 marla have three different sizes in sq ft?",
        answer:
          "Because the marla itself is not the same everywhere. With a 272.25 sq ft marla, 3 marla is 816.75 sq ft; with 250 sq ft it is 750 sq ft; with 225 sq ft it is 675 sq ft.",
      },
      {
        question: "How many 3 marla plots fit in 1 kanal?",
        answer: "1 kanal is 20 marla, so it holds 6 full 3 marla plots (18 marla) with 2 marla left over.",
      },
      {
        question: "How do I work out 3 marla in square feet myself?",
        answer:
          "Multiply 3 by the marla size used for your plot. For example, 3 × 272.25 = 816.75 sq ft, 3 × 250 = 750 sq ft, and 3 × 225 = 675 sq ft.",
      },
      {
        question: "Is 3 marla bigger than 800 square feet?",
        answer:
          "Only with the 272.25 sq ft marla, where 3 marla is 816.75 sq ft. With a 250 sq ft marla it is 750 sq ft, and with a 225 sq ft marla it is 675 sq ft.",
      },
    ],
    related: ["5-marla-in-sq-ft", "7-marla-in-sq-ft", "marla-to-sq-ft"],
  },
  {
    category: "zameen",
    slug: "5-marla-in-sq-ft",
    keywords: { primary: "5 marla in sq ft", secondary: ["5 marla plot size","5 marla in square feet"] },
    unitCategory: "zameen",
    from: "marla",
    to: "sq-ft",
    tool: "plot-size",
    size: 5,
    country: "pk",
    title: "5 Marla in Sq Ft – 1,361.25, 1,250 or 1,125 Sq Ft",
    updated: "2026-11-09",
    metaDescription:
      "5 marla in sq ft: 1,361.25 sq ft (272.25 standard), 1,250 sq ft (250) or 1,125 sq ft (225). Also shown in sq yards, sq meters, kanal and acres.",
    h1: "5 Marla in Square Feet",
    intro:
      "5 marla is 1,361.25 square feet with the 272.25 sq ft revenue marla, 1,250 sq ft with a 250 sq ft marla, and 1,125 sq ft with a 225 sq ft marla. For example, a 25 × 45 ft plot is 1,125 sq ft, which is 5 marla at the 225 sq ft standard.",
    formula: "Square feet = 5 × marla size",
    faqs: [
      {
        question: "Is a 25 × 45 ft plot 5 marla?",
        answer:
          "25 × 45 ft is 1,125 sq ft. That is exactly 5 marla with a 225 sq ft marla, 4.5 marla with a 250 sq ft marla, and about 4.1322 marla with a 272.25 sq ft marla.",
      },
      {
        question: "What part of a kanal is 5 marla?",
        answer: "5 marla is a quarter of a kanal (0.25 kanal), whichever marla size is used. Four 5 marla plots make 1 kanal.",
      },
      {
        question: "Is 5 marla the same as 125 square yards?",
        answer:
          "Only with a 225 sq ft marla. With the 272.25 sq ft marla, 5 marla is 151.25 sq yd, and with a 250 sq ft marla it is 138.8889 sq yd.",
      },
      {
        question: "Which marla size should I use for a 5 marla plot?",
        answer:
          "Use the marla size given in your plot documents. The revenue standard is 272.25 sq ft, while many housing societies use 225 or 250 sq ft.",
      },
    ],
    related: ["3-marla-in-sq-ft", "7-marla-in-sq-ft", "marla-to-sq-ft"],
  },
  {
    category: "zameen",
    slug: "7-marla-in-sq-ft",
    keywords: { primary: "7 marla in sq ft", secondary: ["7 marla plot size","7 marla in square feet"] },
    unitCategory: "zameen",
    from: "marla",
    to: "sq-ft",
    tool: "plot-size",
    size: 7,
    country: "pk",
    title: "7 Marla in Sq Ft – 1,905.75, 1,750 or 1,575 Sq Ft",
    metaDescription:
      "7 marla in sq ft: 1,905.75 sq ft (272.25 standard), 1,750 sq ft (250) or 1,575 sq ft (225). Also shown in sq yards, sq meters, kanal and acres.",
    h1: "7 Marla in Square Feet",
    intro:
      "7 marla is 1,905.75 square feet with the 272.25 sq ft revenue marla, 1,750 sq ft with a 250 sq ft marla, and 1,575 sq ft with a 225 sq ft marla. That is 0.35 kanal.",
    formula: "Square feet = 7 × marla size",
    faqs: [
      {
        question: "How many square yards is 7 marla?",
        answer:
          "7 marla is 211.75 sq yd with a 272.25 sq ft marla, 194.4444 sq yd with a 250 sq ft marla, and 175 sq yd with a 225 sq ft marla.",
      },
      {
        question: "What is 7 marla in square meters?",
        answer: "With the 272.25 sq ft marla, 7 marla is about 177.05 square meters.",
      },
      {
        question: "Can 7 marla be split into two equal plots?",
        answer:
          "Yes, into two plots of 3.5 marla each. Each half is 952.875 sq ft with a 272.25 sq ft marla, 875 sq ft with 250 sq ft, or 787.5 sq ft with 225 sq ft.",
      },
      {
        question: "Is 7 marla more than a third of a kanal?",
        answer: "Yes, a little. 7 marla is 0.35 kanal, and a third of a kanal is about 0.3333 kanal (6.6667 marla).",
      },
    ],
    related: ["5-marla-in-sq-ft", "8-marla-in-sq-ft", "marla-to-sq-ft"],
  },
  {
    category: "zameen",
    slug: "8-marla-in-sq-ft",
    keywords: { primary: "8 marla in sq ft", secondary: ["8 marla plot size","8 marla in square feet"] },
    unitCategory: "zameen",
    from: "marla",
    to: "sq-ft",
    tool: "plot-size",
    size: 8,
    country: "pk",
    title: "8 Marla in Sq Ft – 2,178, 2,000 or 1,800 Sq Ft",
    updated: "2026-11-09",
    metaDescription:
      "8 marla in sq ft: 2,178 sq ft (272.25 standard), 2,000 sq ft (250) or 1,800 sq ft (225). Also shown in sq yards, sq meters, kanal and acres.",
    h1: "8 Marla in Square Feet",
    intro:
      "8 marla is 2,178 square feet with the 272.25 sq ft revenue marla, 2,000 sq ft with a 250 sq ft marla, and 1,800 sq ft with a 225 sq ft marla. For example, a 30 × 60 ft plot is 1,800 sq ft, which is 8 marla at the 225 sq ft standard.",
    formula: "Square feet = 8 × marla size",
    faqs: [
      {
        question: "Which marla standard makes 8 marla a round 2,000 sq ft?",
        answer:
          "The 250 sq ft marla: 8 × 250 = 2,000 sq ft. With a 272.25 sq ft marla, 8 marla is 2,178 sq ft, and with a 225 sq ft marla it is 1,800 sq ft.",
      },
      {
        question: "How many marla is a 30 × 60 ft plot?",
        answer:
          "30 × 60 ft is 1,800 sq ft, which is exactly 8 marla when a marla is 225 sq ft. With the 272.25 sq ft marla, the same plot is about 6.6116 marla.",
      },
      {
        question: "If 8 marla is sold from a 1 kanal plot, how much land is left?",
        answer:
          "12 marla is left, because 1 kanal is 20 marla. That is 3,267 sq ft with a 272.25 sq ft marla, 3,000 sq ft with 250 sq ft, or 2,700 sq ft with 225 sq ft.",
      },
      {
        question: "Is 8 marla bigger than 200 square meters?",
        answer: "Yes, just. With the 272.25 sq ft marla, 8 marla is about 202.3428 square meters.",
      },
    ],
    related: ["7-marla-in-sq-ft", "10-marla-in-sq-ft", "marla-to-sq-ft"],
  },
  {
    category: "zameen",
    slug: "10-marla-in-sq-ft",
    keywords: { primary: "10 marla in sq ft", secondary: ["10 marla plot size","10 marla in square feet"] },
    unitCategory: "zameen",
    from: "marla",
    to: "sq-ft",
    tool: "plot-size",
    size: 10,
    country: "pk",
    title: "10 Marla in Sq Ft – 2,722.5, 2,500 or 2,250 Sq Ft",
    metaDescription:
      "10 marla in sq ft: 2,722.5 sq ft (272.25 standard), 2,500 sq ft (250) or 2,250 sq ft (225). Also shown in sq yards, sq meters, kanal and acres.",
    h1: "10 Marla in Square Feet",
    intro:
      "10 marla is 2,722.5 square feet with the 272.25 sq ft revenue marla, 2,500 sq ft with a 250 sq ft marla, and 2,250 sq ft with a 225 sq ft marla. 10 marla is exactly half a kanal.",
    formula: "Square feet = 10 × marla size",
    faqs: [
      {
        question: "Is 10 marla half a kanal?",
        answer: "Yes. A kanal is 20 marla, so 10 marla is always half a kanal.",
      },
      {
        question: "How many 10 marla plots can be made from 1 acre?",
        answer:
          "In area, 16. With the 272.25 sq ft marla, 1 acre is 160 marla, which equals 16 plots of 10 marla.",
      },
      {
        question: "Is a 10 marla plot twice the size of a 5 marla plot?",
        answer:
          "Yes, if both use the same marla size. With the 272.25 sq ft marla, 10 marla is 2,722.5 sq ft and 5 marla is 1,361.25 sq ft.",
      },
      {
        question: "Is 10 marla 2,500 or 2,722.5 square feet?",
        answer:
          "Both are correct for different marla sizes: 2,722.5 sq ft with a 272.25 sq ft marla and 2,500 sq ft with a 250 sq ft marla. With a 225 sq ft marla it is 2,250 sq ft.",
      },
    ],
    related: ["8-marla-in-sq-ft", "12-marla-in-sq-ft", "marla-to-sq-ft"],
  },
  {
    category: "zameen",
    slug: "12-marla-in-sq-ft",
    keywords: { primary: "12 marla in sq ft", secondary: ["12 marla plot size","12 marla in square feet"] },
    unitCategory: "zameen",
    from: "marla",
    to: "sq-ft",
    tool: "plot-size",
    size: 12,
    country: "pk",
    title: "12 Marla in Sq Ft – 3,267, 3,000 or 2,700 Sq Ft",
    metaDescription:
      "12 marla in sq ft: 3,267 sq ft (272.25 standard), 3,000 sq ft (250) or 2,700 sq ft (225). Also shown in sq yards, sq meters, kanal and acres.",
    h1: "12 Marla in Square Feet",
    intro:
      "12 marla is 3,267 square feet with the 272.25 sq ft revenue marla, 3,000 sq ft with a 250 sq ft marla, and 2,700 sq ft with a 225 sq ft marla. That is 0.6 kanal.",
    formula: "Square feet = 12 × marla size",
    faqs: [
      {
        question: "How much bigger is 12 marla than 10 marla?",
        answer:
          "The difference is 2 marla: 544.5 sq ft with a 272.25 sq ft marla, 500 sq ft with 250 sq ft, or 450 sq ft with 225 sq ft.",
      },
      {
        question: "A 12 marla plot is listed as 3,000 sq ft. Which marla size is that?",
        answer: "The 250 sq ft marla, because 3,000 ÷ 12 = 250.",
      },
      {
        question: "What is 12 marla in hectares?",
        answer: "With the 272.25 sq ft marla, 12 marla is about 0.0304 hectares (about 303.5142 square meters).",
      },
      {
        question: "Can a 12 marla plot be divided into a 5 marla and a 7 marla plot?",
        answer:
          "Yes, in area: 5 + 7 = 12 marla. With the 272.25 sq ft marla, that is 1,361.25 sq ft plus 1,905.75 sq ft, which makes 3,267 sq ft.",
      },
    ],
    related: ["10-marla-in-sq-ft", "15-marla-in-sq-ft", "marla-to-sq-ft"],
  },
  {
    category: "zameen",
    slug: "15-marla-in-sq-ft",
    keywords: { primary: "15 marla in sq ft", secondary: ["15 marla plot size","15 marla in square feet"] },
    unitCategory: "zameen",
    from: "marla",
    to: "sq-ft",
    tool: "plot-size",
    size: 15,
    country: "pk",
    title: "15 Marla in Sq Ft – 4,083.75, 3,750 or 3,375 Sq Ft",
    metaDescription:
      "15 marla in sq ft: 4,083.75 sq ft (272.25 standard), 3,750 sq ft (250) or 3,375 sq ft (225). Also shown in sq yards, sq meters, kanal and acres.",
    h1: "15 Marla in Square Feet",
    intro:
      "15 marla is 4,083.75 square feet with the 272.25 sq ft revenue marla, 3,750 sq ft with a 250 sq ft marla, and 3,375 sq ft with a 225 sq ft marla. That is three quarters of a kanal.",
    formula: "Square feet = 15 × marla size",
    faqs: [
      {
        question: "Is 15 marla closer to 10 marla or to 1 kanal?",
        answer:
          "It is exactly in the middle: 5 marla more than 10 marla and 5 marla less than 1 kanal (20 marla). With the 272.25 sq ft marla, 5 marla is 1,361.25 sq ft.",
      },
      {
        question: "How big is the gap between the 272.25 and 225 sq ft standards for 15 marla?",
        answer: "708.75 sq ft. 15 marla is 4,083.75 sq ft with a 272.25 sq ft marla but 3,375 sq ft with a 225 sq ft marla.",
      },
      {
        question: "What is 15 marla in acres?",
        answer:
          "About 0.0938 acre with a 272.25 sq ft marla, 0.0861 acre with a 250 sq ft marla, and 0.0775 acre with a 225 sq ft marla.",
      },
      {
        question: "Is 15 marla three quarters of a kanal?",
        answer: "Yes. 15 out of 20 marla is 0.75 kanal, whichever marla size is used.",
      },
    ],
    related: ["12-marla-in-sq-ft", "1-kanal-in-sq-ft", "marla-to-sq-ft"],
  },
  {
    category: "zameen",
    slug: "1-kanal-in-sq-ft",
    keywords: { primary: "1 kanal in sq ft", secondary: ["1 kanal plot size","1 kanal in square feet"] },
    unitCategory: "zameen",
    from: "kanal",
    to: "sq-ft",
    tool: "plot-size",
    size: 1,
    country: "pk",
    title: "1 Kanal in Sq Ft – 5,445, 5,000 or 4,500 Sq Ft",
    updated: "2026-11-09",
    metaDescription:
      "1 kanal in sq ft: 5,445 sq ft (272.25 standard), 5,000 sq ft (250) or 4,500 sq ft (225). Also shown in sq yards, sq meters, marla and acres.",
    h1: "1 Kanal in Square Feet",
    intro:
      "1 kanal is 5,445 square feet with the 272.25 sq ft revenue marla, 5,000 sq ft with a 250 sq ft marla, and 4,500 sq ft with a 225 sq ft marla. For example, a 50 × 90 ft plot is 4,500 sq ft, which is 1 kanal at the 225 sq ft standard.",
    formula: "Square feet = 20 × marla size",
    faqs: [
      {
        question: "Is 1 kanal always 20 marla?",
        answer:
          "Yes. A kanal is always 20 marla. Only its size in square feet changes with the marla size: 5,445, 5,000 or 4,500 sq ft.",
      },
      {
        question: "Is 1 kanal more than 500 square yards?",
        answer:
          "With a 272.25 sq ft marla, 1 kanal is 605 sq yd. With 250 sq ft it is 555.5556 sq yd, and with 225 sq ft it is exactly 500 sq yd.",
      },
      {
        question: "What part of an acre is 1 kanal?",
        answer: "With the 272.25 sq ft marla, 1 kanal is one eighth of an acre (0.125 acre).",
      },
      {
        question: "Is 1 kanal about 500 square meters?",
        answer:
          "With the 272.25 sq ft marla, yes: about 505.8571 square meters. With a 250 sq ft marla it is about 464.5152 m², and with a 225 sq ft marla about 418.0637 m².",
      },
    ],
    related: ["15-marla-in-sq-ft", "2-kanal-in-sq-ft", "marla-to-sq-ft"],
  },
  {
    category: "zameen",
    slug: "2-kanal-in-sq-ft",
    keywords: { primary: "2 kanal in sq ft", secondary: ["2 kanal plot size","2 kanal in square feet"] },
    unitCategory: "zameen",
    from: "kanal",
    to: "sq-ft",
    tool: "plot-size",
    size: 2,
    country: "pk",
    title: "2 Kanal in Sq Ft – 10,890, 10,000 or 9,000 Sq Ft",
    metaDescription:
      "2 kanal in sq ft: 10,890 sq ft (272.25 standard), 10,000 sq ft (250) or 9,000 sq ft (225). Also shown in sq yards, sq meters, marla and acres.",
    h1: "2 Kanal in Square Feet",
    intro:
      "2 kanal is 10,890 square feet with the 272.25 sq ft revenue marla, 10,000 sq ft with a 250 sq ft marla, and 9,000 sq ft with a 225 sq ft marla. That is 40 marla, or a quarter acre in the revenue standard.",
    formula: "Square feet = 40 × marla size",
    faqs: [
      {
        question: "Is 2 kanal a quarter of an acre?",
        answer:
          "Yes, with the 272.25 sq ft marla: 2 kanal is 10,890 sq ft and 1 acre is 43,560 sq ft, so 2 kanal is exactly 0.25 acre.",
      },
      {
        question: "How many marla is 2 kanal?",
        answer: "2 kanal is 40 marla.",
      },
      {
        question: "How long would each side be if 2 kanal were a perfect square?",
        answer:
          "About 104.3552 ft with a 272.25 sq ft marla (10,890 sq ft), exactly 100 ft with a 250 sq ft marla (10,000 sq ft), and about 94.8683 ft with a 225 sq ft marla (9,000 sq ft).",
      },
      {
        question: "Is 2 kanal 10,000 square feet?",
        answer:
          "Yes, with a 250 sq ft marla. With the 272.25 sq ft marla, 2 kanal is 10,890 sq ft, and with a 225 sq ft marla it is 9,000 sq ft.",
      },
    ],
    related: ["1-kanal-in-sq-ft", "4-kanal-in-sq-ft", "marla-to-sq-ft"],
  },
  {
    category: "zameen",
    slug: "4-kanal-in-sq-ft",
    keywords: { primary: "4 kanal in sq ft", secondary: ["4 kanal plot size","4 kanal in square feet"] },
    unitCategory: "zameen",
    from: "kanal",
    to: "sq-ft",
    tool: "plot-size",
    size: 4,
    country: "pk",
    title: "4 Kanal in Sq Ft – 21,780, 20,000 or 18,000 Sq Ft",
    metaDescription:
      "4 kanal in sq ft: 21,780 sq ft (272.25 standard), 20,000 sq ft (250) or 18,000 sq ft (225). Also shown in sq yards, sq meters, marla and acres.",
    h1: "4 Kanal in Square Feet",
    intro:
      "4 kanal is 21,780 square feet with the 272.25 sq ft revenue marla, 20,000 sq ft with a 250 sq ft marla, and 18,000 sq ft with a 225 sq ft marla. In the revenue standard, that is exactly half an acre.",
    formula: "Square feet = 80 × marla size",
    faqs: [
      {
        question: "How many acres is 4 kanal?",
        answer:
          "Exactly 0.5 acre with the 272.25 sq ft marla, about 0.4591 acre with a 250 sq ft marla, and about 0.4132 acre with a 225 sq ft marla.",
      },
      {
        question: "How many 10 marla plots does 4 kanal equal?",
        answer: "8. 4 kanal is 80 marla, and 80 ÷ 10 = 8, as long as both use the same marla size.",
      },
      {
        question: "Is 4 kanal about a fifth of a hectare?",
        answer:
          "Yes, roughly. With the 272.25 sq ft marla, 4 kanal is about 0.2023 hectares (about 2,023.4282 square meters).",
      },
      {
        question: "Why might 4 kanal be listed as 18,000 sq ft?",
        answer:
          "Because that uses a 225 sq ft marla: 80 marla × 225 = 18,000 sq ft. With the 272.25 sq ft revenue marla, 4 kanal is 21,780 sq ft.",
      },
    ],
    related: ["2-kanal-in-sq-ft", "1-kanal-in-sq-ft", "marla-to-sq-ft"],
  },

  // -------------------------------------------------------------------------
  // LENGTH
  // -------------------------------------------------------------------------
  {
    category: "length",
    slug: "cm-to-inch",
    keywords: { primary: "cm to inches", secondary: ["centimeters to inches","cm in inches"] },
    unitCategory: "length",
    from: "cm",
    to: "inch",
    country: "global",
    title: "CM to Inches Converter – 1 cm = 0.3937 in",
    metaDescription: "1 cm = 0.3937 inches. Use this cm to inches converter for any length, with a ready conversion table from 1 to 100 cm and answers to common questions.",
    h1: "Centimeters to Inches",
    intro: "1 centimeter is about 0.3937 inches. To convert, divide centimeters by 2.54.",
    formula: "Inches = cm ÷ 2.54",
    faqs: [
      { question: "How many inches in 1 cm?", answer: "1 cm is about 0.3937 inches." },
      { question: "How many inches in 30 cm?", answer: "30 cm is about 11.811 inches." },
      { question: "How many inches in 100 cm?", answer: "100 cm is about 39.3701 inches." },
    ],
    related: ["inch-to-cm", "feet-to-cm", "meter-to-feet"],
  },
  {
    category: "length",
    slug: "inch-to-cm",
    keywords: { primary: "inches to cm", secondary: ["inch to cm","inches in cm"] },
    unitCategory: "length",
    from: "inch",
    to: "cm",
    country: "global",
    title: "Inches to CM Converter – 1 in = 2.54 cm",
    metaDescription: "1 inch = 2.54 cm exactly. Convert any length with this inches to cm converter, plus a conversion table from 1 to 100 inches and quick FAQs.",
    h1: "Inches to Centimeters",
    intro: "1 inch is exactly 2.54 centimeters. To convert, multiply inches by 2.54.",
    formula: "Centimeters = inches × 2.54",
    faqs: [
      { question: "How many cm in 1 inch?", answer: "1 inch is exactly 2.54 cm." },
      { question: "How many cm in 6 inches?", answer: "6 inches is 15.24 cm." },
      { question: "How many cm in 12 inches?", answer: "12 inches (1 foot) is 30.48 cm." },
    ],
    related: ["cm-to-inch", "feet-to-cm", "meter-to-feet"],
  },
  {
    category: "length",
    slug: "feet-to-cm",
    keywords: { primary: "feet to cm", secondary: ["height in cm","feet and inches to cm"] },
    unitCategory: "length",
    from: "foot",
    to: "cm",
    tool: "feet-inches",
    country: "global",
    title: "Feet to CM (1 ft = 30.48 cm) – Height Converter & Chart",
    updated: "2026-11-09",
    metaDescription:
      "5 ft 4 in = 162.56 cm. Enter your height in feet and inches with this feet to cm converter, then see a full conversion table and FAQs.",
    h1: "Feet and Inches to Centimeters",
    intro:
      "1 foot is exactly 30.48 cm and 1 inch is 2.54 cm, so a height of 5 ft 4 in is 162.56 cm. Enter feet and inches together to convert your height.",
    formula: "Centimeters = feet × 30.48 + inches × 2.54",
    faqs: [
      { question: "How many cm is 5 ft 4 in?", answer: "5 ft 4 in is 162.56 cm." },
      { question: "How many cm is 5 ft 8 in?", answer: "5 ft 8 in is 172.72 cm." },
      { question: "What is 6 feet in cm?", answer: "6 feet is 182.88 cm." },
    ],
    related: ["inch-to-cm", "cm-to-inch", "meter-to-feet"],
  },
  {
    category: "length",
    slug: "km-to-miles",
    keywords: { primary: "km to miles", secondary: ["kilometers to miles","km in miles"] },
    unitCategory: "length",
    from: "km",
    to: "mile",
    country: "global",
    title: "KM to Miles Converter – 1 km = 0.6214 mi",
    metaDescription: "1 km = 0.6214 miles. Convert distances with this km to miles converter, including a table from 1 to 100 km and answers to common questions.",
    h1: "Kilometers to Miles",
    intro: "1 kilometer is about 0.6214 miles. To convert, divide kilometers by 1.609344.",
    formula: "Miles = km ÷ 1.609344",
    faqs: [
      { question: "How many miles in 1 km?", answer: "1 km is about 0.6214 miles." },
      { question: "How many miles is 10 km?", answer: "10 km is about 6.2137 miles." },
      { question: "How many km in 1 mile?", answer: "1 mile is about 1.6093 km." },
    ],
    related: ["meter-to-feet", "cm-to-inch", "feet-to-cm"],
  },
  {
    category: "length",
    slug: "meter-to-feet",
    keywords: { primary: "meters to feet", secondary: ["m to ft","metres to feet"] },
    unitCategory: "length",
    from: "m",
    to: "foot",
    country: "global",
    title: "Meters to Feet Converter – 1 m = 3.2808 ft",
    metaDescription: "1 meter = 3.2808 feet. Convert any length with this meters to feet converter, plus a conversion table from 1 to 100 meters and quick FAQs.",
    h1: "Meters to Feet",
    intro: "1 meter is about 3.2808 feet. To convert, divide meters by 0.3048.",
    formula: "Feet = meters ÷ 0.3048",
    faqs: [
      { question: "How many feet in 1 meter?", answer: "1 meter is about 3.2808 feet." },
      { question: "How many feet in 10 meters?", answer: "10 meters is about 32.8084 feet." },
      { question: "How many feet in 100 meters?", answer: "100 meters is about 328.084 feet." },
    ],
    related: ["feet-to-meters", "feet-to-cm", "km-to-miles"],
  },

  // -------------------------------------------------------------------------
  // WEIGHT
  // -------------------------------------------------------------------------
  {
    category: "weight",
    slug: "kg-to-lbs",
    keywords: { primary: "kg to lbs", secondary: ["kg to pounds","kilograms to pounds"] },
    unitCategory: "weight",
    from: "kg",
    to: "pound",
    country: "global",
    title: "KG to LBS Converter – 1 kg = 2.2046 lb",
    metaDescription: "1 kg = 2.2046 lb. Convert body weight or luggage with this kg to lbs converter, with a ready table from 1 to 100 kg and quick FAQs.",
    h1: "Kilograms to Pounds",
    intro: "1 kilogram is about 2.2046 pounds. To convert, divide kilograms by 0.45359237.",
    formula: "Pounds = kg ÷ 0.45359237",
    faqs: [
      { question: "How many pounds in 1 kg?", answer: "1 kg is about 2.2046 lb." },
      { question: "How many pounds is 50 kg?", answer: "50 kg is about 110.2311 lb." },
      { question: "How many pounds is 70 kg?", answer: "70 kg is about 154.3236 lb." },
    ],
    related: ["lbs-to-kg", "grams-to-kg", "maund-to-kg"],
  },
  {
    category: "weight",
    slug: "lbs-to-kg",
    keywords: { primary: "lbs to kg", secondary: ["pounds to kg","lb to kg"] },
    unitCategory: "weight",
    from: "pound",
    to: "kg",
    country: "global",
    title: "LBS to KG Converter – 1 lb = 0.4536 kg",
    metaDescription: "1 lb = 0.4536 kg. Convert any weight with this lbs to kg converter, with a conversion table from 1 to 100 lb and answers to common questions.",
    h1: "Pounds to Kilograms",
    intro: "1 pound is exactly 0.45359237 kilograms, or about 0.4536 kg. To convert, multiply pounds by 0.45359237.",
    formula: "Kilograms = lb × 0.45359237",
    faqs: [
      { question: "How many kg in 1 lb?", answer: "1 lb is about 0.4536 kg." },
      { question: "How many kg is 100 lbs?", answer: "100 lb is about 45.3592 kg." },
      { question: "How many kg is 150 lbs?", answer: "150 lb is about 68.0389 kg." },
    ],
    related: ["kg-to-lbs", "grams-to-kg", "maund-to-kg"],
  },
  {
    category: "weight",
    slug: "grams-to-kg",
    keywords: { primary: "grams to kg", secondary: ["g to kg","grams to kilograms"] },
    unitCategory: "weight",
    from: "g",
    to: "kg",
    country: "global",
    title: "Grams to KG Converter – 1,000 g = 1 kg",
    metaDescription: "1,000 g = 1 kg. Convert recipe or package weights with this grams to kg converter, plus a conversion table and answers to common questions.",
    h1: "Grams to Kilograms",
    intro: "1,000 grams is 1 kilogram. To convert, divide grams by 1,000.",
    formula: "Kilograms = grams ÷ 1,000",
    faqs: [
      { question: "How many kg is 250 grams?", answer: "250 grams is 0.25 kg." },
      { question: "How many kg is 500 grams?", answer: "500 grams is 0.5 kg." },
      { question: "How many grams in 1 kg?", answer: "1 kg is 1,000 grams." },
    ],
    related: ["kg-to-lbs", "gram-to-tola", "lbs-to-kg"],
  },
  {
    category: "weight",
    slug: "tola-to-gram",
    keywords: { primary: "tola to gram", secondary: ["1 tola gold in grams","tola weight in grams"] },
    unitCategory: "weight",
    from: "tola",
    to: "g",
    country: "pk",
    title: "Tola to Gram Converter – 1 tola = 11.6638 g",
    metaDescription: "1 tola = 11.6638 grams. Convert gold and silver weights with this tola to gram converter, plus a table from 1 to 100 tola and quick FAQs.",
    h1: "Tola to Grams",
    intro:
      "1 tola is about 11.6638 grams. Gold and silver prices in Pakistan are usually quoted per tola.",
    formula: "Grams = tola × 11.6638038",
    faqs: [
      { question: "How many grams in 1 tola?", answer: "1 tola is about 11.6638 grams." },
      { question: "How many grams in 5 tola?", answer: "5 tola is about 58.319 grams." },
      { question: "How many grams in 10 tola?", answer: "10 tola is about 116.638 grams." },
    ],
    related: ["gram-to-tola", "grams-to-kg", "maund-to-kg"],
  },
  {
    category: "weight",
    slug: "gram-to-tola",
    keywords: { primary: "gram to tola", secondary: ["grams to tola","gold grams to tola"] },
    unitCategory: "weight",
    from: "g",
    to: "tola",
    country: "pk",
    title: "Gram to Tola (1 tola = 11.6638 g) – Gold Converter",
    updated: "2026-11-09",
    metaDescription: "10 grams = 0.8574 tola. Convert gold and silver weights with this gram to tola converter, plus a conversion table and answers to common questions.",
    h1: "Grams to Tola",
    intro:
      "1 gram is about 0.0857 tola, because 1 tola is 11.6638 grams. Gold and silver prices in Pakistan are usually quoted per tola.",
    formula: "Tola = grams ÷ 11.6638038",
    faqs: [
      { question: "How many tola is 1 gram?", answer: "1 gram is about 0.0857 tola." },
      { question: "How many tola is 10 grams?", answer: "10 grams is about 0.8574 tola." },
      { question: "How many tola is 100 grams?", answer: "100 grams is about 8.5735 tola." },
    ],
    related: ["tola-to-gram", "grams-to-kg", "kg-to-lbs"],
  },
  {
    category: "weight",
    slug: "maund-to-kg",
    keywords: { primary: "maund to kg", secondary: ["1 maund in kg","mann to kg"] },
    unitCategory: "weight",
    from: "maund",
    to: "kg",
    country: "pk",
    title: "Maund to KG Converter – 1 maund = 40 kg",
    metaDescription: "1 maund = 40 kg in Pakistan. Convert crop and bulk weights with this maund to kg converter, plus a table from 1 to 100 maund and quick FAQs.",
    h1: "Maund to Kilograms",
    intro:
      "1 maund is 40 kilograms. In Pakistan the maund is taken as 40 kg, and it is still common for crops such as wheat.",
    formula: "Kilograms = maund × 40",
    faqs: [
      { question: "How many kg in 1 maund?", answer: "1 maund is 40 kg." },
      { question: "How many kg in 5 maund?", answer: "5 maund is 200 kg." },
      { question: "How many maund in 1,000 kg?", answer: "1,000 kg is 25 maund." },
    ],
    related: ["kg-to-lbs", "tola-to-gram", "grams-to-kg"],
  },

  // -------------------------------------------------------------------------
  // TEMPERATURE
  // -------------------------------------------------------------------------
  {
    category: "temperature",
    slug: "celsius-to-fahrenheit",
    keywords: { primary: "celsius to fahrenheit", secondary: ["c to f","°c to °f"] },
    unitCategory: "temperature",
    from: "celsius",
    to: "fahrenheit",
    country: "global",
    title: "Celsius to Fahrenheit (0 °C = 32 °F) – Converter & Chart",
    updated: "2026-11-09",
    metaDescription: "0 °C = 32 °F and 100 °C = 212 °F. Convert any temperature with this Celsius to Fahrenheit converter, plus a conversion table and FAQs.",
    h1: "Celsius to Fahrenheit",
    intro: "To convert Celsius to Fahrenheit, multiply by 1.8 and add 32. So 0 °C is 32 °F and 100 °C is 212 °F.",
    formula: "°F = °C × 1.8 + 32",
    faqs: [
      { question: "What is 0 °C in Fahrenheit?", answer: "0 °C is 32 °F." },
      { question: "What is 37 °C in Fahrenheit?", answer: "37 °C is 98.6 °F." },
      { question: "What is 100 °C in Fahrenheit?", answer: "100 °C is 212 °F." },
    ],
    related: ["fahrenheit-to-celsius", "celsius-to-kelvin", "fahrenheit-to-kelvin"],
  },
  {
    category: "temperature",
    slug: "fahrenheit-to-celsius",
    keywords: { primary: "fahrenheit to celsius", secondary: ["f to c","°f to °c"] },
    unitCategory: "temperature",
    from: "fahrenheit",
    to: "celsius",
    country: "global",
    title: "Fahrenheit to Celsius (98.6 °F = 37 °C) – Converter & Chart",
    updated: "2026-11-09",
    metaDescription: "98.6 °F = 37 °C and 32 °F = 0 °C. Convert any temperature with this Fahrenheit to Celsius converter, plus a conversion table and FAQs.",
    h1: "Fahrenheit to Celsius",
    intro: "To convert Fahrenheit to Celsius, subtract 32 and divide by 1.8. So 32 °F is 0 °C and 212 °F is 100 °C.",
    formula: "°C = (°F − 32) ÷ 1.8",
    faqs: [
      { question: "What is 98.6 °F in Celsius?", answer: "98.6 °F is 37 °C." },
      { question: "What is 100 °F in Celsius?", answer: "100 °F is about 37.7778 °C." },
      { question: "What is 0 °F in Celsius?", answer: "0 °F is about −17.7778 °C." },
    ],
    related: ["celsius-to-fahrenheit", "fahrenheit-to-kelvin", "celsius-to-kelvin"],
  },

  // -------------------------------------------------------------------------
  // AREA (common)
  // -------------------------------------------------------------------------
  {
    category: "area",
    slug: "sq-ft-to-sq-meter",
    keywords: { primary: "square feet to square meters", secondary: ["sq ft to sq m","sq ft to m2"] },
    unitCategory: "area",
    from: "sq-ft",
    to: "sq-m",
    country: "global",
    title: "Sq Ft to Sq Meter Converter – 1 sq ft = 0.0929 m²",
    metaDescription: "1 sq ft = 0.0929 m² and 1 m² = 10.7639 sq ft. Use this square feet to square meters converter, with a conversion table and answers to common questions.",
    h1: "Square Feet to Square Meters",
    intro: "1 square foot is about 0.0929 square meters, and 1 square meter is about 10.7639 sq ft. To convert, divide square feet by 10.7639.",
    formula: "Square meters = sq ft ÷ 10.7639",
    faqs: [
      { question: "How many square meters in 1 sq ft?", answer: "1 sq ft is about 0.0929 m²." },
      { question: "How many square meters is 1,000 sq ft?", answer: "1,000 sq ft is about 92.903 m²." },
      { question: "How many sq ft in 1 square meter?", answer: "1 m² is about 10.7639 sq ft." },
    ],
    related: ["gaz-to-feet", "square-feet-to-acres", "acres-to-square-feet"],
  },
  {
    category: "area",
    slug: "gaz-to-feet",
    keywords: { primary: "gaz to feet", secondary: ["gaz to sq ft","square yards to square feet"] },
    unitCategory: "area",
    from: "sq-yd",
    to: "sq-ft",
    country: "global",
    title: "Gaz to Feet Converter – 1 Gaz = 9 Sq Ft",
    metaDescription: "1 gaz (square yard) = 9 sq ft, so a 120 gaz plot is 1,080 sq ft. Use this gaz to feet converter, with a full conversion table and quick FAQs.",
    h1: "Gaz (Square Yards) to Square Feet",
    intro:
      "For plot area, 1 gaz means 1 square yard, which is 9 square feet. So a 120 gaz plot is 1,080 sq ft and a 240 gaz plot is 2,160 sq ft.",
    formula: "Square feet = gaz × 9",
    faqs: [
      { question: "How many square feet in 1 gaz?", answer: "1 gaz (square yard) is 9 sq ft." },
      { question: "How many square feet is 120 gaz?", answer: "120 gaz is 1,080 sq ft." },
      { question: "How many square feet is 240 gaz?", answer: "240 gaz is 2,160 sq ft." },
    ],
    related: ["sq-ft-to-sq-meter", "square-feet-to-acres", "acres-to-square-feet"],
  },

  // -------------------------------------------------------------------------
  // VOLUME
  // -------------------------------------------------------------------------
  {
    category: "volume",
    slug: "litre-to-gallon",
    keywords: { primary: "litre to gallon", secondary: ["liters to gallons","litres to us gallons"] },
    unitCategory: "volume",
    from: "litre",
    to: "us-gallon",
    alsoShow: ["uk-gallon"],
    country: "global",
    title: "Litre to Gallon (1 L = 0.2642 US gal) – US & UK Converter",
    updated: "2026-11-09",
    metaDescription: "1 litre = 0.2642 US gallons or 0.22 UK gallons. This litre to gallon converter shows both, with a conversion table and answers to common questions.",
    h1: "Litres to Gallons",
    intro:
      "This converter uses the US gallon: 1 litre is about 0.2642 US gallons. The UK (imperial) gallon is bigger, so 1 litre is about 0.22 UK gallons; it is shown under the result too.",
    formula: "US gallons = litres ÷ 3.785411784 (UK gallons = litres ÷ 4.54609)",
    faqs: [
      { question: "How many US gallons in 1 litre?", answer: "1 litre is about 0.2642 US gallons." },
      { question: "How many UK gallons in 1 litre?", answer: "1 litre is about 0.22 UK gallons." },
      { question: "How many litres in 1 US gallon?", answer: "1 US gallon is about 3.7854 litres." },
    ],
    related: ["gallons-to-liters", "ml-to-cup", "cups-to-ml"],
  },
  {
    category: "volume",
    slug: "ml-to-cup",
    keywords: { primary: "ml to cup", secondary: ["ml to cups","millilitres to cups"] },
    unitCategory: "volume",
    from: "ml",
    to: "us-cup",
    country: "global",
    title: "ML to Cup (1 US cup = 236.5882 ml) – Converter & Chart",
    updated: "2026-11-09",
    metaDescription: "250 ml = 1.0567 US cups and 1 cup = 236.5882 ml. Use this ml to cup converter for recipes, with a conversion table and quick FAQs.",
    h1: "Millilitres to Cups",
    intro: "1 US cup is about 236.5882 millilitres, so 250 ml is about 1.0567 cups. This page uses the US cup.",
    formula: "Cups = ml ÷ 236.5882365",
    faqs: [
      { question: "How many cups is 250 ml?", answer: "250 ml is about 1.0567 US cups." },
      { question: "How many cups is 500 ml?", answer: "500 ml is about 2.1134 US cups." },
      { question: "How many ml in 1 cup?", answer: "1 US cup is about 236.5882 ml." },
    ],
    related: ["cups-to-ml", "litre-to-gallon", "gallons-to-liters"],
  },
];

// All pair pages: the land and first common pages above, plus the common
// conversion pages in lib/pages-common.js.
// "added": the day a page went live (used for the sitemap date unless the
// page has its own "updated" date). Launch pages first, then later batches.
// (Set on the page objects themselves, so other modules see the same objects.)
const LATER_PAGES = [...COMMON_PAGES, ...TECHNICAL_PAGES, ...KELVIN_PAGES, ...ELECTRIC_PAGES, ...SCIENCE_PAGES];
for (const p of BASE_PAGES) p.added ??= "2026-11-08";
for (const p of LATER_PAGES) p.added ??= "2026-11-09";
export const PAGES = [...BASE_PAGES, ...LATER_PAGES];

// Pages listed in the "Popular plot sizes" cards.
export const POPULAR_SIZE_PAGES = PAGES.filter((p) => p.tool === "plot-size");

export function getPage(category, slug) {
  return PAGES.find((p) => p.category === category && p.slug === slug) ?? null;
}

// Slugs are unique across the whole site, so related links can use them.
export function getPageBySlug(slug) {
  return PAGES.find((p) => p.slug === slug) ?? null;
}

export function pageUrl(page) {
  return `/${page.category}/${page.slug}`;
}
