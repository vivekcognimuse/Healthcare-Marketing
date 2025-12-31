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
    default: "Muse Marketing - Expert Marketing for Healthcare Professionals",
    template: "%s | Muse Marketing",
  },
  description: "Connect with the Right Patients through Trusted Marketing Techniques. Expert healthcare marketing services including branding, website design, SEO, and video content creation.",
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
  authors: [{ name: "Muse Marketing" }],
  creator: "Muse Marketing",
  publisher: "Muse Marketing",
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
    siteName: "Muse Marketing",
    title: "Muse Marketing - Expert Marketing for Healthcare Professionals",
    description: "Connect with the Right Patients through Trusted Marketing Techniques. Expert healthcare marketing services including branding, website design, SEO, and video content creation.",
    images: [
      {
        url: "/Images webp/Logo.webp",
        width: 1200,
        height: 630,
        alt: "Muse Marketing Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muse Marketing - Expert Marketing for Healthcare Professionals",
    description: "Connect with the Right Patients through Trusted Marketing Techniques",
    images: ["/Images webp/Logo.webp"],
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

