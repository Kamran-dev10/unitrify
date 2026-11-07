import { SITE_NAME } from "@/lib/config";
import { buildMetadata } from "@/lib/seo";
import SimplePage from "@/components/SimplePage";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How ${SITE_NAME} handles your data, cookies and analytics.`,
  path: "/privacy-policy",
});

// DRAFT. Have this reviewed before launch, then remove the [REVIEW] line.
export default function PrivacyPolicyPage() {
  return (
    <SimplePage title="Privacy Policy" path="/privacy-policy">
      <p className="rounded-control border border-line bg-surface px-5 py-3 font-semibold">[REVIEW]</p>
      <p className="text-muted">Last updated: November 2026</p>

      <p>
        This policy explains what information {SITE_NAME} collects when you use this website and how it
        is used.
      </p>

      <h2>Conversions</h2>
      <p>
        The numbers you type into our converters are processed in your browser. We do not store them or
        send them to our servers.
      </p>

      <h2>Analytics</h2>
      <p>
        We use Vercel Web Analytics to understand how the site is used, for example which pages are
        visited and what kind of device is used. It is privacy-friendly: it does not use cookies and does
        not identify you personally. We only see the information in aggregate.
      </p>

      <h2>Cookies</h2>
      <p>This site does not currently use cookies.</p>

      <h2>Advertising</h2>
      <p>
        We may show ads on this site in the future. Ads would use cookies, for example to show ads and to
        measure how they perform. If we add ads, we will update this policy before they appear.
      </p>

      <h2>Your choices</h2>
      <p>
        You can block or delete cookies in your browser settings at any time. The converters work without
        cookies.
      </p>

      <h2>Contact</h2>
      <p>If you have questions about this policy, please use our Contact page.</p>
    </SimplePage>
  );
}
