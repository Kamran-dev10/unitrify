import Link from "next/link";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/config";
import { buildMetadata } from "@/lib/seo";
import { SITE_PAGES } from "@/lib/site-pages";
import { UNIT_CATEGORIES, getCategoryUnits } from "@/lib/categories/index";
import { PAGES } from "@/lib/pages";
import SimplePage from "@/components/SimplePage";

export const metadata = buildMetadata(SITE_PAGES.howWeVerify);

// The counts are read from the unit registry when the page is built, so they
// always match the site.
const categoryCount = UNIT_CATEGORIES.length;
const unitCount = UNIT_CATEGORIES.reduce((sum, c) => sum + getCategoryUnits(c.id).length, 0);
const pairCount = PAGES.length;
const fmt = (n) => n.toLocaleString("en-US");

export default function HowWeVerifyPage() {
  return (
    <SimplePage title="How We Verify Conversions" path="/how-we-verify">
      <p>
        A converter is only useful if you can trust the answer. This page explains, in plain English, where{" "}
        {SITE_NAME}’s numbers come from and how we check them. Today the site has {fmt(unitCount)} units in{" "}
        {fmt(categoryCount)} categories and {fmt(pairCount)} pair pages such as{" "}
        <Link href="/length/cm-to-inch" className="text-accent underline">cm to inches</Link>, and every one of them
        goes through the checks below.
      </p>

      <h2>1. Exact definitions first</h2>
      <p>
        Every unit is defined by how much it is in one base unit, for example 1 inch = 0.0254 meter. Where a unit
        has an exact legal or SI definition, we use that exact number, never a rounded one: the inch, foot, pound and
        US gallon have been exact since 1959, and the 2019 SI redefinition fixed constants such as the elementary
        charge exactly. Other factors come from NIST SP 811, the US National Institute of Standards and Technology
        guide to SI units, which lists conversion factors for older and non-SI units. Temperature readings use their
        formulas (°F = °C × 1.8 + 32), not a single factor.
      </p>
      <p>
        All factors are kept in one place in our code, one file per category, so a correction made once is used on
        every page, table and search answer.
      </p>

      <h2>2. An independent reference table</h2>
      <p>
        We keep a second, independent reference table, written straight from NIST SP 811 and the SI definitions and
        not copied from the converter’s own data. An automated test compares the two for every unit; they must agree
        to within one part in a million. If someone changes a factor by mistake, this test fails before the change
        can go live.
      </p>

      <h2>3. Automated tests on every page</h2>
      <ul>
        <li>Every unit: the engine’s result is checked against the independent reference table.</li>
        <li>Every pair page: the quick answer and any number in the title must equal what the converter calculates.</li>
        <li>Every conversion table: each row is recalculated and compared with the engine.</li>
        <li>Every reverse pair (such as kg to lbs and lbs to kg): the two factors must be exact inverses.</li>
        <li>Pakistani land units: marla, kanal and acre are checked for all three marla standards (272.25, 250 and 225 sq ft).</li>
      </ul>
      <p>
        These tests run every time the site is updated, together with browser tests on desktop and phone screens
        that check the converters work and no page shows a broken number.
      </p>

      <h2>4. What we do not verify</h2>
      <p>
        Currency rates are not fixed factors: they come from a public rates service once a day, and the source and
        update time are shown next to them. Local units with more than one size, such as the marla, are shown with
        the standard used. For buying land, legal or medical matters, always confirm figures with official
        documents.
      </p>

      <h2>Found a mistake?</h2>
      <p>
        Please tell us. Email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-accent underline">
          {CONTACT_EMAIL}
        </a>{" "}
        with the page address, the value you entered and the result you expected. We check every report against the
        official definition, and if we were wrong we fix the factor and add a test so it cannot happen again.
      </p>
    </SimplePage>
  );
}
