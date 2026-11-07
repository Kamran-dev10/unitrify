import { serializeJsonLd } from "@/lib/schema";

// Structured data for search engines. Build `data` with lib/schema.js.
export default function JsonLd({ data }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />;
}
