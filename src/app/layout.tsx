import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import NewsletterCTA from "@/components/newsletter-cta";
import { Toaster } from "@/components/ui/sonner";
import InvestorRestriction from "@/components/investor-restriction";
import CookieConsent from "@/components/cookie-consent";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Psalion - Capital multipliers across the blockchain asset class",
  description: "Psalion provides unique instituional-level investment products tailored to private clients, family offices, and professional investors.",
  keywords: ["blockchain", "cryptocurrency", "digital assets", "crypto investment", "institutional crypto", "blockchain investment", "crypto strategies", "digital asset management"],
  authors: [{ name: "Psalion" }],
  icons: {
    icon: "/favicon.ico.png",
    shortcut: "/favicon.ico.png",
    apple: "/favicon.ico.png",
  },
  openGraph: {
    title: "Psalion - Capital multipliers across the blockchain asset class",
    description: "Psalion provides unique instituional-level investment products tailored to private clients, family offices, and professional investors.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Psalion - Capital multipliers across the blockchain asset class",
    description: "Psalion provides unique instituional-level investment products tailored to private clients, family offices, and professional investors.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <InvestorRestriction />
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <NewsletterCTA />
        <Footer />
        <CookieConsent />
        <Toaster />
      </body>
    </html>
  );
}
