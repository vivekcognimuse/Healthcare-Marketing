import type { Metadata } from "next";
import { Red_Hat_Display } from "next/font/google";
import "./globals.css";

const redHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-red-hat-display",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://musemarketing.web.app"),
  title: {
    default: "Healthcare Marketing for Professionals | SEO, Branding & Patient Engagement | Cognimuse",
    template: "%s | CogniMuse",
  },
  description: "CogniMuse Marketing helps healthcare professionals grow through SEO, social media, branding, website design, and video content. Elevate patient engagement today.",
  keywords: [
    "healthcare marketing",
    "medical marketing",
    "healthcare branding",
    "medical website design",
    "healthcare SEO",
    "patient acquisition",
    "healthcare video marketing",
    "medical practice marketing",
  ],
  authors: [{ name: "CogniMuse" }],
  creator: "CogniMuse",
  publisher: "CogniMuse",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://musemarketing.web.app",
    siteName: "CogniMuse",
    title: "Healthcare Marketing for Professionals | SEO, Branding & Patient Engagement | Cognimuse",
    description: "CogniMuse Marketing helps healthcare professionals grow through SEO, social media, branding, website design, and video content. Elevate patient engagement today.",
    images: [
      {
        url: "/Images webp/Social-Image.webp",
        width: 1200,
        height: 630,
        alt: "CogniMuse Marketing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Healthcare Marketing for Professionals | SEO, Branding & Patient Engagement | Cognimuse",
    description: "CogniMuse Marketing helps healthcare professionals grow through SEO, social media, branding, website design, and video content. Elevate patient engagement today.",
    images: ["/Images webp/Social-Image.webp"],
  },
  alternates: {
    canonical: "https://musemarketing.web.app",
  },
  verification: {
    // Add Google Search Console verification code here when available
    // google: "your-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${redHatDisplay.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}

