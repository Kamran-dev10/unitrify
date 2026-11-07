@AGENTS.md

# Project

A unit converter website. Main focus: Pakistani land units (marla, kanal,
acre, murabba), plus common conversions (length, weight, temperature, area,
volume).

- Pakistan first; other countries later under `/in/`, `/uk/` URL prefixes.
- Pakistani pages have no prefix, e.g. `/zameen/marla-to-sq-ft`.

# Code rules

- Next.js App Router, JavaScript only. Never use TypeScript.
- All units and conversion factors live only in `lib/units.js`.
- Never change a conversion factor without telling the user the old and new value.
- Every unit has a country tag: `"pk"` or `"global"`.
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
| `muted`        | `#6B7280` | Secondary text               |
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
