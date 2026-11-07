import { SITE_NAME } from "@/lib/config";
import { buildMetadata } from "@/lib/seo";
import { SITE_PAGES } from "@/lib/site-pages";
import SimplePage from "@/components/SimplePage";

export const metadata = buildMetadata(SITE_PAGES.about);

export default function AboutPage() {
  return (
    <SimplePage title={`About ${SITE_NAME}`} path="/about">
      <p>
        {SITE_NAME} is a free unit converter. It focuses on Pakistani land units such as marla, kanal,
        acre and murabba, and also covers everyday units for length, weight, temperature, area and
        volume.
      </p>
      <h2>Why we built it</h2>
      <p>
        Land sizes in Pakistan can be confusing because a marla is not the same size everywhere. You may
        see 272.25, 250 or 225 square feet for one marla. Many converters pick one size without saying so.
        On {SITE_NAME}, every land converter lets you choose the marla size and shows which one is used.
      </p>
      <h2>How we keep conversions accurate</h2>
      <ul>
        <li>All conversions use standard factors, kept in one place in our code.</li>
        <li>Automated tests check common conversions, such as 1 kanal = 20 marla, every time the site is updated.</li>
        <li>Results are shown with up to 4 decimal places.</li>
      </ul>
      <p>
        For buying, selling or legal matters, always confirm the area and the marla size in your official
        documents.
      </p>
    </SimplePage>
  );
}
