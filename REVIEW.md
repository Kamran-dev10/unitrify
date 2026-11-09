# Full site review

Date: 2026-11-09. Site: 76 unit categories (all with a page) + 3 tools, 591 units,
265 sitemap URLs (153 unit pair pages, tool pages, 10 group pages, `/converters`,
home, About, Contact, Privacy Policy). `/moment-of-force` redirects (308) to `/torque`.

Every category in the checklist exists with its page: all 18 everyday categories and
tools, 7 engineering, 10 heat, 15 electricity, 4 magnetism, 10 fluids, 5 light,
4 radiology, 5 other, and `zameen` (land).

How it was checked:

- **Unit tests (Vitest):** 220 tests. These include `tests/reference.test.js`, a
  reference table written from NIST SP 811 and exact SI definitions without reading
  `lib/categories`. It compares every one of the 591 units with the engine at two
  values. It also checks every quick answer, every answer in a title, every
  conversion-table row and every reverse pair.
- **Browser tests (Playwright, Chromium, desktop 1280px and phone 375px):**
  20 tests in `tests/e2e/`. Run them with `npm run test:e2e` (it builds first).
- **SEO audit of every sitemap URL:** each one returns 200 and has one h1, a unique
  title and description, a canonical link, valid JSON-LD and its text in the HTML.
  No page is an orphan.

## Fixed

- **Restored phrases:** `/electric-conductivity` FAQ now says "Water EC for tap water
  is often around 50 to 800 µS/cm (0.05 to 0.8 mS/cm)". `/charge` FAQ now mentions
  battery capacity in mAh and Ah.
- **Capitalised unit names in title and quick-answer lines** (21 lines), now lower
  case like the rest of the site. Examples: "1 Mile" → "1 mile", "1 Inch" → "1 inch",
  "1 Foot" → "1 foot", "1 Maund" → "1 maund", "1 US Cup" → "1 US cup",
  "1 Acre" → "1 acre", "1 Hour = 60 Minutes" → "1 hour = 60 minutes".
- **Wrong unit symbol:** "1,000 KB = 1 MB" now uses the site's own symbol "1,000 kB".
- **Awkward "in in" questions** (4 FAQs) reworded, e.g. "What is 5 ft 4 in in cm?" →
  "How many cm is 5 ft 4 in?", "What is 5 N·m in in-lbs?" → "How many in-lbs is 5 N·m?".
- **Content scan of 2,905 text fields** (spelling list, doubled words, double spaces,
  spaces before punctuation, missing spaces, unbalanced brackets, missing end
  punctuation, questions without "?", empty values, wrong symbols such as °K, Kg, kmph):
  nothing else needed fixing. "Calorie" (food Calorie) and "British" are capitalised
  on purpose.
- **Accuracy:** the engine matches the reference for all 591 units (relative difference
  ≤ 1e-6, almost all exactly), apart from the two conventions under "Needs my decision".
  Every conversion-table row matches the engine. Every reverse pair is the exact inverse
  (< 1e-12). Every quick answer the parser could read matches the engine. The 13 it
  could not read (they use °, lb·ft or "× 10¹⁰") were checked by hand and are all
  correct:
  - 1 rad = 57.2958°
  - 1° = 0.0175 rad
  - 30 mpg (US) = 7.8405 L/100 km
  - 1 US bu = 35.2391 L
  - 100 L = 2.8378 US bu
  - 1 N·m = 0.7376 lb·ft
  - 1 lb·ft = 1.3558 N·m
  - 1 lb·in = 0.113 N·m
  - 1 N·m = 8.8507 lb·in
  - 1 kJ/(kg·K) = 0.2388 BTU/(lb·°F)
  - 1 Ci = 3.7 × 10¹⁰ Bq
- **No conversion factor was changed.**
- **Browser tests:** all 20 pass. They check that the homepage loads, there is no
  sideways scrolling, and the menu opens, keeps Tab inside and closes on Esc. They
  also check that search for "psi" opens a page, 10 cm = 3.937 in (plus swap and the
  "abc" message), and that the marla picker gives 272.25 / 250 / 225. The case
  converter, 255 → ff, and 1 GB at 100 Mbps = 1 min 20 s are tested too, as are the
  currency rate, "Rates updated" and the attribution link. Finally, 30 sitemap pages
  (fixed seed) are checked for console errors and for "NaN", "undefined", "Infinity"
  or "null". Vercel Analytics' script is ignored, because it only exists on Vercel.

## Added units

Only units with an exact SI or NIST (or IAU) definition were added. The value is what
1 unit equals.

| Category | Unit | Value | Definition |
| --- | --- | --- | --- |
| length | parsec (pc) | 3.085677581491367 × 10¹⁶ m | 648,000/π au, au = 149,597,870,700 m (IAU 2015, exact) |
| weight | slug | 14,593.90294 g | 1 lbf·s²/ft (exact from lb and g_n) |
| volume | centilitre (cl) | 0.01 L | SI prefix |
| volume | decilitre (dl) | 0.1 L | SI prefix |
| pressure | hectopascal (hPa) | 100 Pa | SI prefix (weather) |
| pressure | gigapascal (GPa) | 10⁹ Pa | SI prefix |
| pressure | meter of water (mH₂O) | 9,806.65 Pa | conventional: 1 m × 1000 kg/m³ × 9.80665 m/s² |
| pressure | foot of water (ftH₂O) | 2,989.06692 Pa | conventional, same rule as the existing inH₂O |
| energy | gigajoule (GJ) | 10⁹ J | SI prefix |
| energy | megawatt-hour (MWh) | 3.6 × 10⁹ J | 10⁶ W × 3,600 s |
| power | gigawatt (GW) | 10⁹ W | SI prefix |
| power | horsepower, electric (hp(E)) | 746 W | exact by definition |
| force | kip | 4,448.2216152605 N | 1,000 lbf |
| torque | kilogram-force centimeter (kgf·cm) | 0.0980665 N·m | 9.80665 N × 0.01 m |
| electric resistance | gigaohm (GΩ) | 10⁹ Ω | SI prefix (insulation testing) |
| magnetic flux density | kilogauss (kG) | 0.1 T | 1,000 G, G = 10⁻⁴ T |
| magnetic field strength | kilooersted (kOe) | 10⁶/(4π) A/m ≈ 79,577.47 A/m | 1,000 Oe |
| flow | milliliter per minute (mL/min) | 1.6667 × 10⁻⁸ m³/s | 10⁻⁶ m³ / 60 s |

### Suggested, not added

These are commonly expected, but have no single exact definition, depend on region,
are deprecated, or belong to a different quantity:

- **zameen:** sarsai (often 1/9 marla, but varies); killa (used as 1 acre in Punjab;
  could be an alias of acre); bigha (varies by region); square karam.
- **length:** US survey foot (1200/3937 m, exact but withdrawn in 2023); gaz as a
  length (= 1 yard; local name); league.
- **weight:** seer (1/40 maund, depends on the maund chosen); dalton/atomic mass unit
  (measured, not exact); dram.
- **area:** dunam (metric dunam = 1,000 m², regional); square rod/perch
  (272.25 sq ft, the same as the revenue marla).
- **volume:** US legal cup (240 mL, used on nutrition labels; would sit beside the
  236.59 mL US cup); hectolitre.
- **pressure:** centimeter of water (conventional 98.0665 Pa, used for medical devices).
  Gauge units such as psig are a reading type, not a unit.
- **energy:** ton of TNT (4.184 × 10⁹ J by convention); quad; International Table calorie.
- **power:** kVA (apparent power, a different quantity); boiler horsepower (not exact).
- **force:** ton-force (short or metric, ambiguous).
- **speed:** Mach (depends on air temperature); km/s.
- **data storage:** exabyte/exbibyte; kilobit and megabit as storage sizes.
- **density:** t/m³ (same as g/cm³); lb/gal (UK).
- **heat:** R-value (m²·K/W and ft²·°F·h/BTU) is thermal insulance, a new category
  rather than a unit of thermal resistance.
- **radiology:** kilogray (kGy, sterilisation).
- **flow:** megalitre per day; UK gallon per hour; tonne per day (mass flow).
- **data transfer:** kibibit and mebibit per second.
- **typography:** Q (0.25 mm, Japanese typesetting).

## Needs my decision

1. **Maund:** the site uses 1 maund = 40 kg, Pakistan's metric maund. NIST has no
   definition. The old British-India maund is 40 seer × 80 tola = 37.3242 kg. Keep 40 kg?
2. **Kilocalorie per hour (power category):** it uses the thermochemical calorie,
   1 kcal/h = 1.1622 W. The heat categories (thermal conductivity, heat flux, heat
   transfer coefficient) label their kcal/h units "Kilocalorie (IT)" and use 1.163 W.
   Both are valid NIST values. To be consistent, the power unit could become
   "Kilocalorie (IT) per hour" (old 1.16222 W → new 1.163 W). It was not changed.
3. **Spelling:** "litre" appears in 22 text fields (volume, fuel consumption,
   `/volume/litre-to-gallon`) and "liter" in 51 (newer categories). "meter" is used
   everywhere and "metre" never. Pick one spelling for litre/liter. URLs would stay
   the same.
4. **Title style:** older pair titles start with upper-case abbreviations ("KG to LBS",
   "CM to Inches", "ML to Cup", "MM to CM"). This is consistent, but strictly ML and MM
   mean megalitre and megameter. The answer part of each title uses the correct
   symbols. Keep the headline style, or switch to lower-case symbols or full words?
5. **Contact page** is very short (one sentence and the email).
6. **404 pages** render their content in the browser, which is how Next.js handles
   these 404s. Search works there.
7. **Average month and year** use the Gregorian year (365.2425 days). Some converters
   use the Julian year (365.25 days). The engine and the reference agree; this is noted
   only so you know which one is used.

## Placeholders I must fill

- `app/contact/page.js`: `[MY EMAIL]` is shown on the page, and the TODO comment
  above it explains how to make it a mailto link.
- `app/privacy-policy/page.js`: the `[REVIEW]` line is shown on the page. The policy
  is marked as a draft to be reviewed before launch; remove the line after review.
- Vercel environment variables (see `.env.example`):
  - `NEXT_PUBLIC_SITE_URL` is required. Without it every page is noindexed.
  - `NEXT_PUBLIC_GOOGLE_VERIFICATION`, `NEXT_PUBLIC_BING_VERIFICATION` and
    `INDEXNOW_KEY` are optional.
