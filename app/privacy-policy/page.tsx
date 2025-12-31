import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Muse Marketing - Expert Marketing for Healthcare Professionals. Learn how we collect, use, and protect your personal information in compliance with privacy regulations.",
  alternates: {
    canonical: "https://musemarketing.web.app/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy - Muse Marketing",
    description: "Privacy Policy for Muse Marketing - Expert Marketing for Healthcare Professionals",
    url: "https://musemarketing.web.app/privacy-policy",
    type: "website",
  },
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="bg-white py-12 sm:py-16 lg:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-black/70 hover:text-black transition-colors mb-6 typography-p2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Home
            </Link>
            <h1 className="typography-h1 text-black mb-8">Privacy Policy</h1>
            <p className="typography-p2 text-black/70 mb-6">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">1. Introduction</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  At Muse Marketing, we are committed to protecting your privacy. This Privacy Policy explains how we 
                  collect, use, disclose, and safeguard your information when you use our services or visit our website.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">2. Information We Collect</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  We may collect the following types of information:
                </p>
                <ul className="list-disc list-inside typography-p2 text-black/70 mb-4 space-y-2">
                  <li><strong>Personal Information:</strong> Name, email address, phone number, and business information</li>
                  <li><strong>Professional Information:</strong> Healthcare credentials, practice details, and service requirements</li>
                  <li><strong>Communication Data:</strong> Messages, inquiries, and correspondence through WhatsApp or other channels</li>
                  <li><strong>Usage Data:</strong> Website usage patterns, IP address, browser type, and device information</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">3. How We Use Your Information</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  We use the collected information for the following purposes:
                </p>
                <ul className="list-disc list-inside typography-p2 text-black/70 mb-4 space-y-2">
                  <li>To provide and deliver our marketing services</li>
                  <li>To communicate with you about your account and services</li>
                  <li>To respond to your inquiries and provide customer support</li>
                  <li>To improve our services and website functionality</li>
                  <li>To send you marketing communications (with your consent)</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">4. Information Sharing and Disclosure</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                </p>
                <ul className="list-disc list-inside typography-p2 text-black/70 mb-4 space-y-2">
                  <li>With service providers who assist us in operating our business (under strict confidentiality agreements)</li>
                  <li>When required by law or to protect our legal rights</li>
                  <li>With your explicit consent</li>
                  <li>In connection with a business transfer or merger</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">5. Data Security</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  We implement appropriate technical and organizational measures to protect your personal information against 
                  unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the 
                  internet is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">6. Healthcare Information (HIPAA Compliance)</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  While we work with healthcare professionals, we do not directly handle Protected Health Information (PHI) 
                  as defined by HIPAA. However, we maintain strict confidentiality standards and work with clients to ensure 
                  all marketing materials comply with healthcare privacy regulations.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">7. Your Rights</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside typography-p2 text-black/70 mb-4 space-y-2">
                  <li>Access and receive a copy of your personal information</li>
                  <li>Request correction of inaccurate or incomplete information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Object to or restrict processing of your information</li>
                  <li>Withdraw consent at any time (where applicable)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">8. Cookies and Tracking Technologies</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  Our website may use cookies and similar tracking technologies to enhance your experience. You can control 
                  cookie preferences through your browser settings.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">9. Third-Party Links</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  Our website may contain links to third-party websites. We are not responsible for the privacy practices of 
                  these external sites. We encourage you to review their privacy policies.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">10. Data Retention</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  We retain your personal information for as long as necessary to fulfill the purposes outlined in this 
                  Privacy Policy, unless a longer retention period is required by law.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">11. Children's Privacy</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  Our services are not directed to individuals under the age of 18. We do not knowingly collect personal 
                  information from children.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">12. Changes to This Privacy Policy</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the 
                  new Privacy Policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">13. Contact Us</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
                </p>
                <p className="typography-p2 text-black/70 mb-2">
                  <strong>WhatsApp:</strong>{" "}
                  <a 
                    href="https://wa.me/8861078009" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    +91 8861078009
                  </a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <ScrollToTop />
    </main>
  );
}

