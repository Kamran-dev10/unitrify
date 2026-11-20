import Link from "next/link";
import { Calculator, BarChart3, Cookie, Megaphone, MessageSquare, SlidersHorizontal, Mail, Coins } from "lucide-react";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/config";
import { buildMetadata } from "@/lib/seo";
import { SITE_PAGES } from "@/lib/site-pages";
import SimplePage, { SimpleSection } from "@/components/SimplePage";

export const metadata = buildMetadata(SITE_PAGES.privacy);

// Keep this page in step with what the site really does: Vercel Web Analytics
// (no cookies), the contact form, server-side exchange rates, and future AdSense.
export default function PrivacyPolicyPage() {
  return (
    <SimplePage
      title="Privacy Policy"
      intro="What we collect when you use this site, and what we do with it."
      path="/privacy-policy"
    >
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

      <SimpleSection icon={Coins} title="Exchange rates">
        <p>
          Currency rates come from{" "}
          <a href="https://www.exchangerate-api.com" className="text-accent underline">
            ExchangeRate-API
          </a>
          . Our server fetches them about once a day; your browser does not contact ExchangeRate-API, and
          no information about you is sent to it.
        </p>
      </SimpleSection>

      <SimpleSection icon={Cookie} title="Cookies">
        <p>This site does not currently use cookies.</p>
      </SimpleSection>

      <SimpleSection icon={Megaphone} title="Advertising">
        <p>
          We may show ads from Google AdSense on this site in the future. Google and its partners would then
          use cookies to show ads, including ads based on your visits to this and other websites, and to
          measure how ads perform. Before ads appear we will update this policy and, where the law requires
          it, ask for your consent.
        </p>
        <p>
          You will be able to turn off personalized ads in{" "}
          <a href="https://adssettings.google.com" className="text-accent underline">
            Google Ads Settings
          </a>
          , and read how Google uses data at{" "}
          <a href="https://policies.google.com/technologies/partner-sites" className="text-accent underline">
            policies.google.com/technologies/partner-sites
          </a>
          .
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
