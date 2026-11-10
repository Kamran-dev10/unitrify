import { CONTACT_EMAIL, SITE_NAME } from "@/lib/config";
import { buildMetadata } from "@/lib/seo";
import { SITE_PAGES } from "@/lib/site-pages";
import SimplePage from "@/components/SimplePage";

export const metadata = buildMetadata(SITE_PAGES.contact);

export default function ContactPage() {
  return (
    <SimplePage title={`Contact ${SITE_NAME}`} path="/contact">
      <p>
        Want to report a mistake or suggest a converter we do not have yet? We would like to hear from you.
      </p>
      <p>
        Email: <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-accent underline-offset-2 hover:underline">
          {CONTACT_EMAIL}
        </a>
      </p>
      <p className="text-muted">We try to reply within a few days.</p>
    </SimplePage>
  );
}
