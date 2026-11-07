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

      <h2>Analytics and cookies</h2>
      <p>
        We use analytics tools to understand how people use the site, for example which pages are visited
        and what kind of device is used. These tools may set cookies in your browser. The information is
        used in aggregate to improve the site, not to identify you personally.
      </p>

      <h2>Advertising</h2>
      <p>
        We may show ads on this site in the future. If we do, our advertising partners may use cookies to
        show ads and to measure how they perform. We will update this policy when ads are added.
      </p>

      <h2>Your choices</h2>
      <p>
        You can block or delete cookies in your browser settings. The converters will still work without
        cookies.
      </p>

      <h2>Contact</h2>
      <p>If you have questions about this policy, please use our Contact page.</p>
    </SimplePage>
  );
}
