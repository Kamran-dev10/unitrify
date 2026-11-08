@AGENTS.md

# Project

A unit converter website. Main focus: Pakistani land units (marla, kanal,
acre, murabba), plus common conversions (length, weight, temperature, area,
volume).

- Pakistan first; other countries later under `/in/`, `/uk/` URL prefixes.
- Pakistani pages have no prefix, e.g. `/zameen/marla-to-sq-ft`.

# Code rules

- Next.js App Router, JavaScript only. Never use TypeScript.
- All units and conversion factors live only in `lib/categories/` (one file
  per category, registered in `lib/categories/index.js`). `lib/units.js` is
  only a thin wrapper for older imports.
- Units have a `kind`: `"linear"` (base = value × factor), `"affine"`
  (base = value × factor + offset) or `"inverse"` (base = factor ÷ value).
- Never change a conversion factor without telling the user the old and new value.
- Every unit has a country tag: `"global"` or a country code such as `"pk"`.
- Every page must be statically generated (good for SEO).
- Site name comes only from `SITE_NAME` in `lib/config.js`. Never hardcode it.
- All website text is in English only. No Urdu or Roman Urdu text anywhere
  on the site. Local unit names (marla, kanal, murabba, tola, maund) stay as
  they are.
- Ask the user before installing any new package.
- Work in small steps. After each step, explain in simple words what changed
  and how the user can check it.

# Design rules (calm, modern, aesthetic, but simple)

Colours are defined as theme tokens in `app/globals.css`. Use the tokens
(e.g. `bg-page`, `text-ink`, `bg-accent`), never raw hex values in components.

| Token          | Value     | Use                          |
| -------------- | --------- | ---------------------------- |
| `page`         | `#FAFAF7` | Page background (warm off-white) |
| `surface`      | `#FFFFFF` | Cards                        |
| `line`         | `#E7E5E0` | 1px card / input borders     |
| `ink`          | `#1F2937` | Main text (dark slate)       |
| `muted`        | `#676D7B` | Secondary text               |
| `accent`       | `#0F766E` | The one accent (deep green)  |
| `accent-hover` | `#115E59` | Accent hover                 |
| `accent-tint`  | `#E6F2EF` | Highlights                   |

- Cards: white, 1px `line` border, very light shadow (`shadow-card`).
- Rounded corners: 12px on inputs and buttons (`rounded-control`), 16px on
  cards (`rounded-card`).
- Font: Inter via `next/font` for everything.
- Lots of white space. Max content width about 768px (`max-w-3xl`), centred.
- The converter result is the hero: large, bold, easy to copy.
- No popups, no clutter, no more than one accent colour on a screen.
- Mobile first: big touch targets (min 44px), everything readable on a phone.
- Subtle transitions only (150ms), no flashy animations.

# Project status

- Worldwide converter: 80+ unit categories in 10 groups + tools; Pakistani land (`/zameen`) stays a strong category.
- `lib/categories/`: one file per category + `index.js` registry (`GROUPS`); `helpers.js` builds units. Kinds: `linear`, `affine`, `inverse` (0 → null).
- Category extras: `buildUnits(options)` + `hasMarlaStandard` (land) or `option` (typography base font, shown by `UnitOptionPicker`); `note` (radiology disclaimer); `searchAliases`.
- `lib/convert.js`: engine (`convert`, `formatSmart`); `lib/units.js` legacy wrapper; `"area"` falls back to `zameen`.
- `lib/categories.js`: category page text + FAQs (server only). `lib/site-pages.js`: home/about/contact/privacy meta.
- Pair pages: `lib/pages.js` + `pages-common.js`, `pages-technical.js`, `pages-electric.js`, `pages-science.js` → `PAGES`, rendered by `app/[category]/[slug]`.
- Tools: `lib/tools.js` (case, number, currency + pair pages); logic in `lib/text-case.js`, `number-base.js`, `roman.js`, `currency.js`, `download-time.js`, `sound-pressure.js`.
- Groups: `lib/groups.js` (names, page text, items, `groupCrumbFor`, `menuGroups`) → `/converters` (HTML sitemap) and `/converters/<group>`, header menu, homepage, footer, breadcrumbs (Home › Group › Category › Page).
- Header: `AllConvertersMenu` (desktop columns, phone full-screen accordion; Esc, focus trap). Search loads `/search-index.json` (route handler, prerendered) on first focus; matching in `lib/search-match.js`.
- Currency: `lib/currency-rates.js` fetches open.er-api.com in `"use cache"` once per 24 h; runtime failure keeps last good page; build failure shows a message, retries hourly. Never hand-write rates; `RatesAttribution` on every rates page.
- Dynamic routes use `ensureStatic = "navigation"` + `instant = false` (real 404s, fully prerendered).
- Keyword rule: primary in title or h1, once in the description; 2-4 secondary; primary unique. Titles < 60 (`buildTitle`), descriptions 110-155, unique.
- Related rule: same category first, then same group, then `"/<category>"`; never an unrelated category.
- Tests (`tests/`): engine, convert, common, pages, seo, descriptions, schema, tools, groups, one file per new unit batch. Audit scripts (sitemap, links, a11y, JS size, duplicates) were run ad hoc, not in the repo.
- Known: 404 pages render their content on the client (Next.js shell); input border token `line` is ~1.2:1 against white.
