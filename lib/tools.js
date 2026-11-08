// Tool pages: Case Converter, Number Converter, Currency Converter, plus
// their pair pages (/number-converter/<slug>, /currency-converter/<slug>).
// Same rules as converter pages: titles under 60 characters, descriptions
// 110-155 characters, keywords, 3 FAQs, 3 related links in the same tool.

import { convertBase } from "./number-base.js";
import { toRoman, fromRoman } from "./roman.js";

const base = (text, from, to) => convertBase(text, from, to).value;

export const TOOLS = [
  {
    id: "case-converter",
    name: "Case Converter",
    h1: "Case Converter",
    title: "Case Converter – UPPER, lower, Title, camelCase",
    metaDescription:
      "Free case converter: change text to UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case and more, with live word and character counts.",
    keywords: { primary: "case converter", secondary: ["uppercase to lowercase", "title case converter", "camelcase converter"] },
    intro:
      "Paste or type your text, then pick a case. The Case Converter is handy for headings, file names, code variables and fixing text typed with Caps Lock on.",
    faqs: [
      {
        question: "Is my text sent to a server?",
        answer: "No. Everything runs in your browser. Your text is never uploaded, stored or sent anywhere.",
      },
      {
        question: "What is the difference between Title Case and Sentence case?",
        answer: "Title Case capitalises the first letter of every word. Sentence case capitalises only the first letter of each sentence.",
      },
      {
        question: "Which case should I use for code?",
        answer:
          "It depends on the language: JavaScript variables usually use camelCase, Python uses snake_case, class names use PascalCase and constants use CONSTANT_CASE.",
      },
    ],
  },
  {
    id: "number-converter",
    name: "Number Converter",
    h1: "Number Converter",
    title: "Number Converter – Binary, Hex, Decimal, Roman",
    metaDescription:
      "Free number converter for binary, octal, decimal, hexadecimal and any base from 2 to 36, plus Roman numerals. Works with very large whole numbers.",
    keywords: { primary: "number converter", secondary: ["base converter", "binary converter", "roman numeral converter"] },
    intro:
      "Convert whole numbers between binary, octal, decimal, hexadecimal and any base from 2 to 36, and between numbers and Roman numerals. Programmers, students and puzzle fans use it to check their working.",
    faqs: [
      {
        question: "How large a number can I convert?",
        answer: "There is no fixed limit for whole numbers: the converter uses BigInt, so even numbers with hundreds of digits stay exact.",
      },
      {
        question: "Which digits are used above base 10?",
        answer: "After 0–9 come the letters a–z, so base 16 uses 0–9 and a–f, and base 36 uses 0–9 and a–z.",
      },
      {
        question: "Why do Roman numerals stop at 3999?",
        answer: "Standard Roman numerals have no symbol above M (1000), and M can repeat at most three times, so 3999 (MMMCMXCIX) is the largest.",
      },
    ],
  },
  {
    id: "currency-converter",
    name: "Currency Converter",
    h1: "Currency Converter",
    title: "Currency Converter – Live Rates, Updated Daily",
    metaDescription:
      "Free currency converter with daily mid-market rates for 160+ currencies, including PKR, USD, GBP, EUR, AED and SAR. For information only, not bank rates.",
    keywords: { primary: "currency converter", secondary: ["exchange rate", "currency exchange rates today", "money converter"] },
    intro:
      "Convert between more than 160 currencies using mid-market reference rates that refresh once a day. It is useful for remittances, travel budgets and online shopping.",
    faqs: [
      {
        question: "Where do the exchange rates come from?",
        answer: "From ExchangeRate-API. The site fetches them once a day and uses the same rates on every page.",
      },
      {
        question: "Why is my bank's rate different?",
        answer:
          "These are mid-market reference rates. Banks, money changers and transfer services add their own margin and fees, so their rates are usually less favourable.",
      },
      {
        question: "How is one currency converted into another?",
        answer: "Through the US dollar: the amount is converted to USD and then to the target currency, using the same daily rates.",
      },
    ],
  },
];

export function getTool(id) {
  return TOOLS.find((t) => t.id === id) ?? null;
}

// ------------------------------------------------------------------ NUMBER

export const NUMBER_PAGES = [
  {
    slug: "binary-to-decimal",
    kind: "base",
    fromBase: 2,
    toBase: 10,
    defaultValue: "101010",
    title: "Binary to Decimal Converter – Any Length",
    h1: "Binary to Decimal",
    quickAnswer: `101010 (binary) = ${base("101010", 2, 10)} (decimal)`,
    metaDescription:
      "Convert binary to decimal instantly, even for very long numbers. Shows how place values work, with a table of common values and quick FAQs.",
    keywords: { primary: "binary to decimal", secondary: ["binary to number", "base 2 to base 10", "bin to dec"] },
    intro: `101010 in binary is ${base("101010", 2, 10)} in decimal. Each binary digit is a power of 2, which is why computers, networking and digital electronics use it.`,
    formula: "Decimal = sum of (digit × 2^position), counting positions from 0 on the right",
    examples: ["1", "10", "101", "1010", "1111", "10000", "11111111", "100000000"].map((b) => [b, base(b, 2, 10)]),
    faqs: [
      { question: "What is 1111 in decimal?", answer: `1111 in binary is ${base("1111", 2, 10)} (8 + 4 + 2 + 1).` },
      { question: "How do I convert binary to decimal by hand?", answer: "Write the powers of 2 under the digits from the right (1, 2, 4, 8 …) and add the powers where the digit is 1." },
      { question: "What is 11111111 in decimal?", answer: `11111111 in binary is ${base("11111111", 2, 10)}, the largest value one byte can hold.` },
    ],
    related: ["decimal-to-binary", "hex-to-decimal", "decimal-to-hex"],
  },
  {
    slug: "decimal-to-binary",
    kind: "base",
    fromBase: 10,
    toBase: 2,
    defaultValue: "42",
    title: "Decimal to Binary Converter – Any Length",
    h1: "Decimal to Binary",
    quickAnswer: `42 = ${base("42", 10, 2)} in binary`,
    metaDescription:
      "Convert decimal to binary instantly for homework, networking and programming, even for very large whole numbers. Includes a value table and FAQs.",
    keywords: { primary: "decimal to binary", secondary: ["number to binary", "base 10 to base 2", "dec to bin"] },
    intro: `42 in decimal is ${base("42", 10, 2)} in binary. Students use this conversion in computer science, and engineers use it for bit masks and network settings.`,
    formula: "Divide by 2 repeatedly and read the remainders from bottom to top",
    examples: ["1", "2", "5", "10", "16", "42", "100", "255"].map((d) => [d, base(d, 10, 2)]),
    faqs: [
      { question: "What is 10 in binary?", answer: `10 in decimal is ${base("10", 10, 2)} in binary.` },
      { question: "What is 255 in binary?", answer: `255 is ${base("255", 10, 2)}, eight 1s in a row.` },
      { question: "Can I convert negative numbers?", answer: "Yes. Add a minus sign: -5 becomes -101. The converter does not use two's complement." },
    ],
    related: ["binary-to-decimal", "decimal-to-hex", "hex-to-decimal"],
  },
  {
    slug: "hex-to-decimal",
    kind: "base",
    fromBase: 16,
    toBase: 10,
    defaultValue: "ff",
    title: "Hex to Decimal Converter – Hexadecimal to Number",
    h1: "Hexadecimal to Decimal",
    quickAnswer: `FF (hex) = ${base("ff", 16, 10)} (decimal)`,
    metaDescription:
      "Convert hex to decimal for colour codes, memory addresses and programming. Accepts 0x prefixes and very long values, with a value table and FAQs.",
    keywords: { primary: "hex to decimal", secondary: ["hexadecimal to decimal", "hex to number", "0x to decimal"] },
    intro: `FF in hexadecimal is ${base("ff", 16, 10)} in decimal. Hex is used for colour codes, memory addresses and data, because each hex digit stands for 4 bits.`,
    formula: "Decimal = sum of (digit × 16^position), where a–f are 10–15",
    examples: ["a", "f", "10", "1f", "64", "ff", "100", "ffff"].map((h) => [h.toUpperCase(), base(h, 16, 10)]),
    faqs: [
      { question: "What is 0x1F in decimal?", answer: `0x1F is ${base("1f", 16, 10)} (1 × 16 + 15).` },
      { question: "What are the hex digits A to F?", answer: "A = 10, B = 11, C = 12, D = 13, E = 14 and F = 15." },
      { question: "How do I read a colour code like #FF8000?", answer: `Split it into pairs: FF = ${base("ff", 16, 10)} red, 80 = ${base("80", 16, 10)} green, 00 = 0 blue.` },
    ],
    related: ["decimal-to-hex", "binary-to-decimal", "decimal-to-binary"],
  },
  {
    slug: "decimal-to-hex",
    kind: "base",
    fromBase: 10,
    toBase: 16,
    defaultValue: "255",
    title: "Decimal to Hex Converter – Number to Hexadecimal",
    h1: "Decimal to Hexadecimal",
    quickAnswer: `255 = ${base("255", 10, 16).toUpperCase()} in hex`,
    metaDescription:
      "Convert decimal to hex for colour codes, programming and debugging, even for very large whole numbers. Includes a table of common values and FAQs.",
    keywords: { primary: "decimal to hex", secondary: ["decimal to hexadecimal", "number to hex", "dec to hex"] },
    intro: `255 in decimal is ${base("255", 10, 16).toUpperCase()} in hexadecimal. Developers use this to write colour codes, byte values and memory addresses.`,
    formula: "Divide by 16 repeatedly and read the remainders (0–9, A–F) from bottom to top",
    examples: ["10", "15", "16", "100", "255", "256", "1000", "65535"].map((d) => [d, base(d, 10, 16).toUpperCase()]),
    faqs: [
      { question: "What is 100 in hex?", answer: `100 in decimal is ${base("100", 10, 16).toUpperCase()} in hex.` },
      { question: "What is 4096 in hex?", answer: `4096 is ${base("4096", 10, 16).toUpperCase()} in hex (16 × 16 × 16).` },
      { question: "Should hex letters be upper or lower case?", answer: "Both mean the same value. This converter shows lower case, which is common in code; colour codes are often written in upper case." },
    ],
    related: ["hex-to-decimal", "decimal-to-binary", "binary-to-decimal"],
  },
  {
    slug: "roman-numerals-to-numbers",
    kind: "roman",
    mode: "fromRoman",
    defaultValue: "MMXXVI",
    title: "Roman Numerals to Numbers Converter – I to MMMCMXCIX",
    h1: "Roman Numerals to Numbers",
    quickAnswer: `MMXXVI = ${fromRoman("MMXXVI").value}`,
    metaDescription:
      "Convert roman numerals to numbers for dates, clocks, book chapters and film credits. Checks the numeral is written correctly, with a table and FAQs.",
    keywords: { primary: "roman numerals to numbers", secondary: ["roman numeral converter", "roman to number", "read roman numerals"] },
    intro: `MMXXVI is ${fromRoman("MMXXVI").value}. Roman numerals still appear in dates, clock faces, book chapters, film credits and the names of kings and events.`,
    formula: "Add the values; when a smaller symbol comes before a larger one (IV, IX, XL…), subtract it",
    examples: ["IV", "IX", "XL", "XC", "CD", "CM", "MCMXCIX", "MMXXVI"].map((r) => [r, String(fromRoman(r).value)]),
    faqs: [
      { question: "What number is MCMXCIV?", answer: `MCMXCIV is ${fromRoman("MCMXCIV").value}: M (1000) + CM (900) + XC (90) + IV (4).` },
      { question: "Is IIII a valid Roman numeral?", answer: "Not in standard form; 4 is written IV. You may still see IIII on some clock faces." },
      { question: "What does an X with V before it mean?", answer: "VX is not valid. Only I, X and C can be placed before a larger symbol to subtract." },
    ],
    related: ["numbers-to-roman-numerals", "binary-to-decimal", "decimal-to-binary"],
  },
  {
    slug: "numbers-to-roman-numerals",
    kind: "roman",
    mode: "toRoman",
    defaultValue: "2026",
    title: "Numbers to Roman Numerals Converter – 1 to 3999",
    h1: "Numbers to Roman Numerals",
    quickAnswer: `2026 = ${toRoman(2026).value}`,
    metaDescription:
      "Convert numbers to roman numerals from 1 to 3999 for dates, tattoos, invitations and outlines. Instant results in standard form, with a table and FAQs.",
    keywords: { primary: "numbers to roman numerals", secondary: ["number to roman numeral", "year in roman numerals", "roman numeral generator"] },
    intro: `2026 in Roman numerals is ${toRoman(2026).value}. People use them for years on buildings and films, tattoos, wedding invitations and numbered outlines.`,
    formula: "Write the largest symbol that fits (M, CM, D, CD, C, XC, L, XL, X, IX, V, IV, I), subtract, repeat",
    examples: [1, 4, 9, 14, 40, 90, 400, 1999, 2000, 3999].map((n) => [String(n), toRoman(n).value]),
    faqs: [
      { question: "How do I write 1994 in Roman numerals?", answer: `1994 is ${toRoman(1994).value}.` },
      { question: "How is 0 written in Roman numerals?", answer: "It isn't. The Roman system has no symbol for zero, so this converter starts at 1." },
      { question: "What is the largest number I can convert?", answer: `3999, written ${toRoman(3999).value}.` },
    ],
    related: ["roman-numerals-to-numbers", "decimal-to-binary", "decimal-to-hex"],
  },
];

// ---------------------------------------------------------------- CURRENCY
// No rates in this file: every number on currency pages comes from the
// cached rates when the page is built.

const cur = (slug, from, to, fromName, toName, extra) => ({
  slug,
  from,
  to,
  title: `${from} to ${to} Converter – ${fromName} to ${toName}`,
  h1: `${fromName} to ${toName}`,
  ...extra,
});

export const CURRENCY_PAGES = [
  cur("usd-to-pkr", "USD", "PKR", "US Dollar", "Pakistani Rupee", {
    metaDescription: "USD to PKR converter with today's mid-market rate, updated daily. See US dollars in Pakistani rupees from 1 to 1,000 USD, plus quick FAQs.",
    keywords: { primary: "usd to pkr", secondary: ["dollar to rupee", "dollar rate in pakistan", "us dollar to pakistani rupee"] },
    intro: "Convert US dollars to Pakistani rupees with a daily mid-market reference rate. It helps with remittances, freelance payments and online shopping in dollars.",
    amounts: [100, 10000],
    extraFaq: {
      question: "Is this the open market or the interbank rate?",
      answer: "Neither exactly. It is a mid-market reference rate from ExchangeRate-API. Banks, open market dealers and money transfer services set their own rates.",
    },
    related: ["gbp-to-pkr", "eur-to-pkr", "aed-to-pkr"],
  }),
  cur("gbp-to-pkr", "GBP", "PKR", "British Pound", "Pakistani Rupee", {
    metaDescription: "GBP to PKR converter with today's mid-market rate, updated daily. See British pounds in Pakistani rupees from 1 to 1,000 GBP, plus quick FAQs.",
    keywords: { primary: "gbp to pkr", secondary: ["pound to rupee", "pound rate in pakistan", "british pound to pakistani rupee"] },
    intro: "Convert British pounds to Pakistani rupees with a daily mid-market reference rate. It is useful for money sent from the UK and for UK purchases.",
    amounts: [100, 50000],
    extraFaq: {
      question: "Why do money changers give fewer rupees per pound?",
      answer: "They buy pounds below the mid-market rate to cover costs and profit, so you usually receive fewer rupees than shown here.",
    },
    related: ["usd-to-pkr", "eur-to-pkr", "gbp-to-inr"],
  }),
  cur("eur-to-pkr", "EUR", "PKR", "Euro", "Pakistani Rupee", {
    metaDescription: "EUR to PKR converter with today's mid-market rate, updated daily. See euros in Pakistani rupees from 1 to 1,000 EUR, plus quick answers and FAQs.",
    keywords: { primary: "eur to pkr", secondary: ["euro to rupee", "euro rate in pakistan", "euro to pakistani rupee"] },
    intro: "Convert euros to Pakistani rupees with a daily mid-market reference rate. It helps with payments from Europe, study fees and travel budgets.",
    amounts: [50, 20000],
    extraFaq: {
      question: "How often does the euro to rupee rate change?",
      answer: "Currency rates move all the time while markets are open. This page refreshes its reference rate once a day.",
    },
    related: ["usd-to-pkr", "gbp-to-pkr", "eur-to-usd"],
  }),
  cur("aed-to-pkr", "AED", "PKR", "UAE Dirham", "Pakistani Rupee", {
    metaDescription: "AED to PKR converter with today's mid-market rate, updated daily. See UAE dirhams in Pakistani rupees from 1 to 1,000 AED, plus quick FAQs.",
    keywords: { primary: "aed to pkr", secondary: ["dirham to rupee", "dirham rate in pakistan", "uae dirham to pakistani rupee"] },
    intro: "Convert UAE dirhams to Pakistani rupees with a daily mid-market reference rate. It is useful for salaries and money sent home from the UAE.",
    amounts: [1000, 10000],
    extraFaq: { question: "Is AED the same as the dirham?", answer: "Yes. AED is the currency code for the UAE dirham." },
    related: ["sar-to-pkr", "usd-to-pkr", "gbp-to-pkr"],
  }),
  cur("sar-to-pkr", "SAR", "PKR", "Saudi Riyal", "Pakistani Rupee", {
    metaDescription: "SAR to PKR converter with today's mid-market rate, updated daily. See Saudi riyals in Pakistani rupees from 1 to 1,000 SAR, plus quick FAQs.",
    keywords: { primary: "sar to pkr", secondary: ["riyal to rupee", "riyal rate in pakistan", "saudi riyal to pakistani rupee"] },
    intro: "Convert Saudi riyals to Pakistani rupees with a daily mid-market reference rate. It helps with salaries, Umrah budgets and money sent from Saudi Arabia.",
    amounts: [500, 10000],
    extraFaq: { question: "What does SAR stand for?", answer: "SAR is the currency code for the Saudi riyal." },
    related: ["aed-to-pkr", "usd-to-pkr", "eur-to-pkr"],
  }),
  cur("usd-to-inr", "USD", "INR", "US Dollar", "Indian Rupee", {
    metaDescription: "USD to INR converter with today's mid-market rate, updated daily. See US dollars in Indian rupees from 1 to 1,000 USD, plus quick answers and FAQs.",
    keywords: { primary: "usd to inr", secondary: ["dollar to indian rupee", "dollar rate in india", "us dollar to inr"] },
    intro: "Convert US dollars to Indian rupees with a daily mid-market reference rate. It is useful for remittances, freelance income and shopping in dollars.",
    amounts: [100, 10000],
    extraFaq: {
      question: "Is this the same as an official reference rate?",
      answer: "Not necessarily. This page uses a mid-market rate from ExchangeRate-API, which can differ slightly from official or bank reference rates.",
    },
    related: ["gbp-to-inr", "usd-to-pkr", "usd-to-eur"],
  }),
  cur("gbp-to-inr", "GBP", "INR", "British Pound", "Indian Rupee", {
    metaDescription: "GBP to INR converter with today's mid-market rate, updated daily. See British pounds in Indian rupees from 1 to 1,000 GBP, plus quick answers and FAQs.",
    keywords: { primary: "gbp to inr", secondary: ["pound to indian rupee", "pound rate in india", "british pound to inr"] },
    intro: "Convert British pounds to Indian rupees with a daily mid-market reference rate. It helps when sending money from the UK to India or planning travel.",
    amounts: [100, 50000],
    extraFaq: {
      question: "Which rate should I use for a money transfer?",
      answer: "Use the rate your transfer service quotes when you pay. This page is a reference for comparing those quotes.",
    },
    related: ["usd-to-inr", "gbp-to-pkr", "gbp-to-usd"],
  }),
  cur("usd-to-eur", "USD", "EUR", "US Dollar", "Euro", {
    metaDescription: "USD to EUR converter with today's mid-market rate, updated daily. See US dollars in euros from 1 to 1,000 USD for travel and shopping, plus FAQs.",
    keywords: { primary: "usd to eur", secondary: ["dollar to euro", "us dollar to euro", "usd in eur"] },
    intro: "Convert US dollars to euros with a daily mid-market reference rate. It is useful for travel in Europe, online purchases and invoices.",
    amounts: [100, 1000],
    extraFaq: {
      question: "Why does my card statement show a different rate?",
      answer: "Card networks and banks use their own exchange rates and may add a foreign transaction fee.",
    },
    related: ["eur-to-usd", "usd-to-gbp", "usd-to-inr"],
  }),
  cur("eur-to-usd", "EUR", "USD", "Euro", "US Dollar", {
    metaDescription: "EUR to USD converter with today's mid-market rate, updated daily. See euros in US dollars from 1 to 1,000 EUR, plus quick answers and FAQs.",
    keywords: { primary: "eur to usd", secondary: ["euro to dollar", "euro to us dollar", "eur/usd rate"] },
    intro: "Convert euros to US dollars with a daily mid-market reference rate. It helps with prices, salaries and invoices quoted in euros.",
    amounts: [100, 1000],
    extraFaq: {
      question: "Is EUR/USD the same as this rate?",
      answer: "Yes. EUR/USD shows how many US dollars one euro buys, which is what this page converts.",
    },
    related: ["usd-to-eur", "eur-to-gbp", "gbp-to-usd"],
  }),
  cur("gbp-to-usd", "GBP", "USD", "British Pound", "US Dollar", {
    metaDescription: "GBP to USD converter with today's mid-market rate, updated daily. See British pounds in US dollars from 1 to 1,000 GBP, plus quick answers and FAQs.",
    keywords: { primary: "gbp to usd", secondary: ["pound to dollar", "british pound to us dollar", "gbp/usd rate"] },
    intro: "Convert British pounds to US dollars with a daily mid-market reference rate. It is useful for travel, US purchases and comparing salaries.",
    amounts: [100, 1000],
    extraFaq: {
      question: "Why is GBP/USD called cable?",
      answer: "Traders call the pound–dollar rate cable, a name from the telegraph cable that once carried the rate across the Atlantic.",
    },
    related: ["usd-to-gbp", "eur-to-usd", "gbp-to-pkr"],
  }),
  cur("usd-to-gbp", "USD", "GBP", "US Dollar", "British Pound", {
    metaDescription: "USD to GBP converter with today's mid-market rate, updated daily. See US dollars in British pounds from 1 to 1,000 USD, plus quick answers and FAQs.",
    keywords: { primary: "usd to gbp", secondary: ["dollar to pound", "us dollar to british pound", "usd in gbp"] },
    intro: "Convert US dollars to British pounds with a daily mid-market reference rate. It helps with UK travel, tuition fees and online orders.",
    amounts: [100, 1000],
    extraFaq: {
      question: "How do I convert dollars to pounds by hand?",
      answer: "Multiply the dollar amount by the USD to GBP rate shown at the top of this page.",
    },
    related: ["gbp-to-usd", "usd-to-eur", "eur-to-gbp"],
  }),
  cur("eur-to-gbp", "EUR", "GBP", "Euro", "British Pound", {
    metaDescription: "EUR to GBP converter with today's mid-market rate, updated daily. See euros in British pounds from 1 to 1,000 EUR, plus quick answers and FAQs.",
    keywords: { primary: "eur to gbp", secondary: ["euro to pound", "euro to british pound", "eur in gbp"] },
    intro: "Convert euros to British pounds with a daily mid-market reference rate. It is useful for trips between the UK and Europe and for cross-border shopping.",
    amounts: [100, 1000],
    extraFaq: { question: "Does the UK use the euro?", answer: "No. The UK uses the pound sterling (GBP)." },
    related: ["usd-to-gbp", "eur-to-usd", "gbp-to-usd"],
  }),
];

// All tool pair pages with their tool id, for search, sitemap and tests.
export const TOOL_PAGES = [
  ...NUMBER_PAGES.map((p) => ({ ...p, tool: "number-converter" })),
  ...CURRENCY_PAGES.map((p) => ({ ...p, tool: "currency-converter" })),
];

export function toolPageUrl(p) {
  return `/${p.tool}/${p.slug}`;
}
