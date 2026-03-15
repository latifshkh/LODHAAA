import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "LODHA",
    template: "%s | LODHA Real Estate",
  },
  description:
    "Lodha Group — India's premier real estate developer. Discover ultra-luxury residences, Grade A commercial spaces, and world-class destinations across Mumbai, London, Dubai and New York.",
  keywords: [
    "Lodha",
    "Lodha Group",
    "luxury real estate",
    "Mumbai apartments",
    "World One",
    "Lodha Park",
    "premium residences",
    "commercial real estate India",
  ],
  authors: [{ name: "Lodha Group" }],
  creator: "Lodha Group",
  publisher: "Macrotech Developers Ltd.",
  metadataBase: new URL("https://www.lodhagroup.com"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.lodhagroup.com",
    siteName: "LODHA Real Estate",
    title: "LODHA — Crafting the World's Finest Addresses",
    description:
      "Ultra-luxury residences and Grade A commercial spaces across Mumbai, London, Dubai and New York.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LODHA Real Estate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LODHA — Crafting the World's Finest Addresses",
    description:
      "Ultra-luxury residences and Grade A commercial spaces across four global cities.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/lodhaaa.jpeg",
    apple: "/apple-touch-icon.png",
  },
  themeColor: "#B8952A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body
        className="antialiased"
        style={{
          fontFamily: "var(--font-montserrat), sans-serif",
          background: "#FAF6EF",
        }}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}