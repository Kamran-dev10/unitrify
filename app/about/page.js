import Link from "next/link";
import { Globe, LandPlot, ShieldCheck, Info } from "lucide-react";
import { SITE_NAME } from "@/lib/config";
import { buildMetadata } from "@/lib/seo";
import { SITE_PAGES } from "@/lib/site-pages";
import SimplePage, { SimpleSection } from "@/components/SimplePage";

export const metadata = buildMetadata(SITE_PAGES.about);

export default function AboutPage() {
  return (
    <SimplePage title={`About ${SITE_NAME}`} intro="A free, careful unit converter for the whole world." path="/about">
      <SimpleSection icon={Globe} title="What we do">
        <p>
          {SITE_NAME} is a free unit converter for the whole world. It covers 76 unit categories:
          everyday ones like length, weight, temperature, area, volume and currency, and specialist ones for
          engineering, heat, electricity, magnetism, fluids, light and radiation. You can browse them all on
          the <Link href="/converters" className="text-accent underline">all converters</Link> page.
        </p>
      </SimpleSection>
      <SimpleSection icon={LandPlot} title="Pakistani land units">
        <p>
          {SITE_NAME} started with Pakistani land units, and they are still one of its strongest parts. Land
          sizes in Pakistan can be confusing because a marla is not the same size everywhere: you may see
          272.25, 250 or 225 square feet for one marla. Many converters pick one size without saying so. On{" "}
          {SITE_NAME}, every land converter lets you choose the marla size and shows which one is used.
        </p>
      </SimpleSection>
      <SimpleSection icon={ShieldCheck} title="How we keep conversions accurate">
        <ul>
          <li>All conversion factors are kept in one place in our code and checked against NIST SP 811 and exact SI definitions.</li>
          <li>Automated tests check hundreds of conversions, such as 1 kanal = 20 marla and 1 inch = 2.54 cm, every time the site is updated.</li>
          <li>Currency rates come from a public rates service and are refreshed once a day; the source is shown next to the rates.</li>
          <li>Results are shown with up to 4 decimal places.</li>
        </ul>
        <p>
          Read the details on{" "}
          <Link href="/how-we-verify" className="text-accent underline">
            how we verify these conversions
          </Link>
          .
        </p>
      </SimpleSection>
      <SimpleSection icon={Info} title="Good to know">
        <p>
          For buying, selling or legal matters, always confirm the area and the marla size in your official
          documents. Radiation and medical units are for information only.
        </p>
      </SimpleSection>
    </SimplePage>
  );
}
