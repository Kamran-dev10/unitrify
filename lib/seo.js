import { SITE_NAME, SITE_URL } from "./config.js";

export const MAX_TITLE_LENGTH = 60;

// Full browser title. Adds " | SITE_NAME" only when the result stays
// under 60 characters; otherwise uses the page title alone.
export function buildTitle(pageTitle) {
  const withSite = `${pageTitle} | ${SITE_NAME}`;
  return withSite.length < MAX_TITLE_LENGTH ? withSite : pageTitle;
}

// Metadata for a page: title, description, canonical URL and Open Graph.
// `path` starts with "/", e.g. "/zameen/marla-to-sq-ft".
// `fullTitle: true` uses the title as is (no " | SITE_NAME").
// `imagePath`: folder of this page's own opengraph-image.js / twitter-image.js
// (e.g. the page path). Leave empty to use the site-wide image.
export function buildMetadata({ title, description, path, fullTitle = false, imagePath = "" }) {
  const finalTitle = fullTitle ? title : buildTitle(title);
  const url = `${SITE_URL}${path === "/" ? "" : path}` || SITE_URL;
  return {
    title: { absolute: finalTitle },
    description,
    alternates: { canonical: url },
    openGraph: {
      title: finalTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images: [{ url: `${imagePath}/opengraph-image`, width: 1200, height: 630, alt: finalTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description,
      images: [`${imagePath}/twitter-image`],
    },
  };
}
