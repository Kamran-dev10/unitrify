import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SITE_NAME, SITE_URL } from "@/lib/config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const viewport = {
  themeColor: "#0F766E",
};

// Search engine verification codes from env variables; an empty variable outputs nothing.
const verification = {};
if (process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION) verification.google = process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION;
if (process.env.NEXT_PUBLIC_BING_VERIFICATION) verification.other = { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION };

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description: "Every measurement, one place.",
  ...(Object.keys(verification).length > 0 && { verification }),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-page font-sans text-ink">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        {/* Vercel Web Analytics: cookie-free; starts collecting once deployed on Vercel. */}
        <Analytics />
      </body>
    </html>
  );
}
