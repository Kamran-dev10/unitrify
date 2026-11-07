import { buildMetadata } from "@/lib/seo";
import { SITE_PAGES } from "@/lib/site-pages";
import SimplePage from "@/components/SimplePage";

export const metadata = buildMetadata(SITE_PAGES.contact);

// TODO: replace [MY EMAIL] below. You can make it a link like:
// <a href="mailto:you@example.com" className="font-medium text-accent">you@example.com</a>
export default function ContactPage() {
  return (
    <SimplePage title="Contact" path="/contact">
      <p>
        Found a mistake, or want a converter we do not have yet? We would like to hear from you.
      </p>
      <p>
        Email: <span className="font-medium">[MY EMAIL]</span>
      </p>
      <p className="text-muted">We try to reply within a few days.</p>
    </SimplePage>
  );
}
