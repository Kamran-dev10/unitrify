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
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description: "Every measurement, one place.",
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
