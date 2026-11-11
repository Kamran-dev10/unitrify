// Every indexable page with its sitemap date. Used by app/sitemap.js and
// the tests (keywords, orphans), so both always see the same list.
//
// lastModified = the page's own "updated" date, else the day it was added.
// It does NOT change on every deploy: give a page `updated: "YYYY-MM-DD"`
// in its data when its content really changes.
import { PAGES, pageUrl } from "./pages.js";
import { CATEGORIES } from "./categories.js";
import { TOOLS, TOOL_PAGES, toolPageUrl } from "./tools.js";
import { CONVERTER_GROUPS, ALL_CONVERTERS_PAGE } from "./groups.js";
import { SITE_PAGES } from "./site-pages.js";

// Tools and their pair pages went live on this day.
const TOOLS_ADDED = "2026-11-09";

// The date a page last really changed: its "updated" date, else the day it was added.
export const lastModifiedOf = (page, added) => page.updated ?? page.added ?? added;

const entry = (path, page, added) => ({ path, page, lastModified: lastModifiedOf(page, added) });

export function siteEntries() {
  return [
    entry("/", SITE_PAGES.home),
    entry(ALL_CONVERTERS_PAGE.path, ALL_CONVERTERS_PAGE),
    ...CONVERTER_GROUPS.map((g) => entry(g.path, g)),
    ...CATEGORIES.map((c) => entry(`/${c.id}`, c)),
    ...PAGES.map((p) => entry(pageUrl(p), p)),
    ...TOOLS.map((t) => entry(`/${t.id}`, t, TOOLS_ADDED)),
    ...TOOL_PAGES.map((p) => entry(toolPageUrl(p), p, TOOLS_ADDED)),
    entry(SITE_PAGES.about.path, SITE_PAGES.about),
    entry(SITE_PAGES.contact.path, SITE_PAGES.contact),
    entry(SITE_PAGES.privacy.path, SITE_PAGES.privacy),
    entry(SITE_PAGES.howWeVerify.path, SITE_PAGES.howWeVerify),
  ];
}
