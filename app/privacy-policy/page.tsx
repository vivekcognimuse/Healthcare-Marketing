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
      <section className="bg-white pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 lg:pb-24">
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
                  <li><strong>Personal Information:</strong> Name, email address, phone number, place of residence, profession, age, and business information</li>
                  <li><strong>Professional Information:</strong> Healthcare credentials, practice details, and service requirements</li>
                  <li><strong>Communication Data:</strong> Messages, inquiries, and correspondence through WhatsApp or other channels</li>
                  <li><strong>Usage Data:</strong> Website usage patterns, IP address, browser type, and device information</li>
                  <li><strong>Payment Information:</strong> Transaction details, payment method, billing information, and transaction history. Note: We do not store your complete payment card details on our servers. Payment card information is securely processed by our payment gateway partner, Razorpay Software Private Limited.</li>
                  <li><strong>Event Booking Data:</strong> Event registration details, booking confirmations, attendance records, and related transaction information</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">3. How We Use Your Information</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  We use the collected information for the following purposes:
                </p>
                <ul className="list-disc list-inside typography-p2 text-black/70 mb-4 space-y-2">
                  <li>To provide and deliver our marketing services</li>
                  <li>To process event bookings and registrations</li>
                  <li>To process payments and manage transactions</li>
                  <li>To communicate with you about your account, bookings, and services</li>
                  <li>To send booking confirmations, event details, and meeting links</li>
                  <li>To respond to your inquiries and provide customer support</li>
                  <li>To improve our services and website functionality</li>
                  <li>To send you marketing communications (with your consent)</li>
                  <li>To comply with legal obligations and financial regulations</li>
                  <li>To prevent fraud and ensure transaction security</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">4. Information Sharing and Disclosure</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                </p>
                <ul className="list-disc list-inside typography-p2 text-black/70 mb-4 space-y-2">
                  <li><strong>Payment Processors:</strong> We share payment information with Razorpay Software Private Limited ("Razorpay"), our payment gateway provider, to process payments securely. Razorpay is PCI-DSS compliant and handles payment card information in accordance with industry standards. For more information about Razorpay's privacy practices, please visit: <a href="https://razorpay.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://razorpay.com/privacy/</a></li>
                  <li>With service providers who assist us in operating our business (under strict confidentiality agreements)</li>
                  <li>When required by law or to protect our legal rights</li>
                  <li>With your explicit consent</li>
                  <li>In connection with a business transfer or merger</li>
                  <li>With financial institutions and payment networks for transaction processing and fraud prevention</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">5. Data Security</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  We implement appropriate technical and organizational measures to protect your personal information against 
                  unauthorized access, alteration, disclosure, or destruction. Our security measures include:
                </p>
                <ul className="list-disc list-inside typography-p2 text-black/70 mb-4 space-y-2">
                  <li>SSL/TLS encryption for data transmission</li>
                  <li>Secure payment processing through PCI-DSS compliant payment gateway (Razorpay)</li>
                  <li>Server-side payment verification to prevent fraud</li>
                  <li>Regular security audits and updates</li>
                  <li>Access controls and authentication mechanisms</li>
                  <li>Secure storage of personal information</li>
                </ul>
                <p className="typography-p2 text-black/70 mb-4">
                  <strong>Important:</strong> We do not store your complete payment card details (card number, CVV, expiry date) on our servers. 
                  All payment card information is securely processed by Razorpay, which is PCI-DSS Level 1 certified. However, 
                  no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
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
                <h2 className="typography-h2 text-black mb-4">9. Payment Processing and Third-Party Services</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  We use Razorpay Software Private Limited ("Razorpay") as our payment gateway provider to process payments. 
                  When you make a payment, you will be redirected to Razorpay's secure payment page. Razorpay collects and 
                  processes your payment information in accordance with their privacy policy and PCI-DSS standards.
                </p>
                <p className="typography-p2 text-black/70 mb-4">
                  <strong>Razorpay Privacy Policy:</strong> <a href="https://razorpay.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://razorpay.com/privacy/</a>
                </p>
                <p className="typography-p2 text-black/70 mb-4">
                  <strong>Razorpay Terms of Service:</strong> <a href="https://razorpay.com/terms/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://razorpay.com/terms/</a>
                </p>
                <p className="typography-p2 text-black/70 mb-4">
                  Our website may also contain links to other third-party websites. We are not responsible for the privacy 
                  practices of these external sites. We encourage you to review their privacy policies.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">10. Data Retention</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  We retain your personal information for as long as necessary to fulfill the purposes outlined in this 
                  Privacy Policy, unless a longer retention period is required by law. Specifically:
                </p>
                <ul className="list-disc list-inside typography-p2 text-black/70 mb-4 space-y-2">
                  <li><strong>Booking and Transaction Data:</strong> We retain booking and payment transaction records for a minimum of 7 years as required by Indian financial regulations and tax laws.</li>
                  <li><strong>Personal Information:</strong> We retain your personal information for as long as your account is active or as needed to provide services to you.</li>
                  <li><strong>Payment Information:</strong> Payment card details are not stored by us. Transaction records (without full card details) are retained as per financial regulations.</li>
                </ul>
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
                <h2 className="typography-h2 text-black mb-4">13. Payment-Related Inquiries</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  For payment-related inquiries, refund requests, or transaction disputes, please contact us. We will work 
                  with our payment gateway provider to resolve any issues promptly.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">14. Contact Us</h2>
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
                <p className="typography-p2 text-black/70 mb-4">
                  <strong>Email:</strong> For privacy-related inquiries, please contact us via WhatsApp or email.
                </p>
                <p className="typography-p2 text-black/70 mb-4">
                  <strong>Grievance Officer:</strong> In accordance with the Information Technology Act, 2000 and rules 
                  made thereunder, if you have any grievances regarding the processing of your personal information, you may 
                  contact our Grievance Officer at the contact details provided above.
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

