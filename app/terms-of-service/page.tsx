import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Muse Marketing - Expert Marketing for Healthcare Professionals. Learn about our service terms, client responsibilities, payment terms, and compliance requirements.",
  alternates: {
    canonical: "https://musemarketing.web.app/terms-of-service",
  },
  openGraph: {
    title: "Terms of Service - Muse Marketing",
    description: "Terms of Service for Muse Marketing - Expert Marketing for Healthcare Professionals",
    url: "https://musemarketing.web.app/terms-of-service",
    type: "website",
  },
};

export default function TermsOfService() {
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
            <h1 className="typography-h1 text-black mb-8">Terms of Service</h1>
            <p className="typography-p2 text-black/70 mb-6">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">1. Agreement to Terms</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  By accessing and using the services of Muse Marketing, you agree to be bound by these Terms of Service. 
                  If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">2. Services</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  Muse Marketing provides digital marketing services specifically tailored for healthcare professionals, 
                  including but not limited to:
                </p>
                <ul className="list-disc list-inside typography-p2 text-black/70 mb-4 space-y-2">
                  <li>Branding & Visual Identity</li>
                  <li>Website Design</li>
                  <li>Local SEO & Patient Discovery</li>
                  <li>Content Creation (Long-form and Short-form videos)</li>
                  <li>Marketing Campaigns</li>
                  <li>Social Media Management</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">3. Client Responsibilities</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  As a client, you agree to:
                </p>
                <ul className="list-disc list-inside typography-p2 text-black/70 mb-4 space-y-2">
                  <li>Provide accurate and complete information necessary for service delivery</li>
                  <li>Comply with all applicable healthcare regulations and guidelines</li>
                  <li>Review and approve content before publication</li>
                  <li>Make timely payments as agreed in your service package</li>
                  <li>Maintain ethical standards in all marketing materials</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">4. Payment Terms</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  Payment terms will be specified in your service agreement. All fees are due as per the agreed schedule. 
                  Late payments may result in service suspension or termination.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">5. Intellectual Property</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  All content, designs, and materials created by Muse Marketing remain our intellectual property until 
                  full payment is received. Upon full payment, you will receive usage rights as specified in your agreement.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">6. Compliance</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  All marketing materials and strategies must comply with healthcare advertising regulations, including 
                  HIPAA guidelines where applicable. Muse Marketing will work with you to ensure compliance, but 
                  ultimate responsibility lies with the healthcare provider.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">7. Limitation of Liability</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  Muse Marketing shall not be liable for any indirect, incidental, or consequential damages arising 
                  from the use of our services. Our liability is limited to the amount paid for the specific service in question.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">8. Termination</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  Either party may terminate services with written notice as specified in your service agreement. 
                  Upon termination, you will be responsible for payment of all services rendered up to the termination date.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">9. Changes to Terms</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  Muse Marketing reserves the right to modify these terms at any time. Continued use of our services 
                  after changes constitutes acceptance of the new terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">10. Contact Information</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  If you have any questions about these Terms of Service, please contact us:
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

