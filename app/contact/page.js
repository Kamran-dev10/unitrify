import { MessageSquare, Mail } from "lucide-react";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/config";
import { buildMetadata } from "@/lib/seo";
import { SITE_PAGES } from "@/lib/site-pages";
import SimplePage, { SimpleSection } from "@/components/SimplePage";
import ContactForm from "@/components/ContactForm";

export const metadata = buildMetadata(SITE_PAGES.contact);

export default function ContactPage() {
  return (
    <SimplePage
      title={`Contact ${SITE_NAME}`}
      intro="Report a mistake, suggest a converter or ask us anything."
      path="/contact"
    >
      <SimpleSection icon={MessageSquare} title="Send us a message">
        <p>Found a wrong result, want a new converter, or have a question? Send us a message.</p>
        <p className="text-muted">We usually reply within 2 business days.</p>
        <div className="pt-2">
          <ContactForm email={CONTACT_EMAIL} />
        </div>
      </SimpleSection>

      <SimpleSection icon={Mail} title="Email">
        <p>
          Or email us directly:{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-medium text-accent underline-offset-2 hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      </SimpleSection>
    </SimplePage>
  );
}
