export const SITE_NAME = "Unitrify";

// The one contact email, shown on /contact and in the Organization JSON-LD.
export const CONTACT_EMAIL = "info@unitrify.com";

// Set NEXT_PUBLIC_SITE_URL to the real domain when deploying,
// e.g. NEXT_PUBLIC_SITE_URL=https://www.example.com (no trailing slash).
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/, "");
