import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/config";
import { PAGES, getPage } from "@/lib/pages";
import { OG_SIZE, ogElement } from "@/lib/og";

// Social image per converter page, e.g. "Marla to Square Feet".
export const alt = `Converter on ${SITE_NAME}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return PAGES.map((p) => ({ category: p.category, slug: p.slug }));
}

export default async function OpengraphImage({ params }) {
  const { category, slug } = await params;
  const page = getPage(category, slug);
  return new ImageResponse(
    ogElement({
      title: page ? page.h1 : SITE_NAME,
      subtitle: "Free converter · Every measurement, one place.",
    }),
    size
  );
}
