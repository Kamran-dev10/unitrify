import Link from "next/link";
import { Calculator, BarChart3, Cookie, Megaphone, MessageSquare, SlidersHorizontal, Mail } from "lucide-react";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/config";
import { buildMetadata } from "@/lib/seo";
import { SITE_PAGES } from "@/lib/site-pages";
import SimplePage, { SimpleSection } from "@/components/SimplePage";

export const metadata = buildMetadata(SITE_PAGES.privacy);

// DRAFT. Have this reviewed before launch, then remove the [REVIEW] line.
export default function PrivacyPolicyPage() {
  return (
    <SimplePage
      title="Privacy Policy"
      intro="What we collect when you use this site, and what we do with it."
      path="/privacy-policy"
    >
      <p className="rounded-control border border-line bg-page px-5 py-3 font-semibold">[REVIEW]</p>
      <p className="text-muted">Last updated: November 2026</p>

      <p>
        This policy explains what information {SITE_NAME} collects when you use this website and how it
        is used.
      </p>

      <SimpleSection icon={Calculator} title="Conversions">
        <p>
          The numbers you type into our converters are processed in your browser. We do not store them or
          send them to our servers.
        </p>
      </SimpleSection>

      <SimpleSection icon={MessageSquare} title="Contact form">
        <p>
          When you send us a message through the contact form, we receive your name, your email address and
          your message. We use them only to reply to you. We do not share or sell them, and we do not add you
          to any mailing list.
        </p>
      </SimpleSection>

      <SimpleSection icon={BarChart3} title="Analytics">
        <p>
          We use Vercel Web Analytics to understand how the site is used, for example which pages are
          visited and what kind of device is used. It is privacy-friendly: it does not use cookies and does
          not identify you personally. We only see the information in aggregate.
        </p>
      </SimpleSection>

      <SimpleSection icon={Cookie} title="Cookies">
        <p>This site does not currently use cookies.</p>
      </SimpleSection>

      <SimpleSection icon={Megaphone} title="Advertising">
        <p>
          We may show ads on this site in the future. Ads would use cookies, for example to show ads and to
          measure how they perform. If we add ads, we will update this policy before they appear.
        </p>
      </SimpleSection>

      <SimpleSection icon={SlidersHorizontal} title="Your choices">
        <p>
          You can block or delete cookies in your browser settings at any time. The converters work without
          cookies.
        </p>
      </SimpleSection>

      <SimpleSection icon={Mail} title="Contact">
        <p>
          If you have questions about this policy, email us at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent underline">
            {CONTACT_EMAIL}
          </a>{" "}
          or use our{" "}
          <Link href="/contact" className="text-accent underline">
            Contact page
          </Link>
          .
        </p>
      </SimpleSection>
    </SimplePage>
  );
}
