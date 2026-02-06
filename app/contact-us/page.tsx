import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Phone, Mail, MessageCircle } from "lucide-react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with CogniMuse Marketing. Contact us via WhatsApp, email, or through our website. We're here to help healthcare professionals grow their practices.",
  alternates: {
    canonical: "https://musemarketing.web.app/contact-us",
  },
  openGraph: {
    title: "Contact Us - CogniMuse Marketing",
    description: "Get in touch with CogniMuse Marketing - Expert marketing services for healthcare professionals",
    url: "https://musemarketing.web.app/contact-us",
    type: "website",
  },
};

export default function ContactUs() {
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
            <h1 className="typography-h1 text-black mb-8">Contact Us</h1>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <p className="typography-p2 text-black/70 mb-8">
                  We'd love to hear from you! Whether you have questions about our services, want to discuss your marketing 
                  needs, or need support with an existing project, we're here to help. Get in touch with us through any of 
                  the following channels:
                </p>
              </section>

              <section className="mb-8">
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 sm:p-8 mb-6">
                  <h2 className="typography-h2 text-black mb-6">Get in Touch</h2>
                  
                  <div className="space-y-6">
                    {/* WhatsApp */}
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                        <MessageCircle className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="typography-h3 text-black mb-2">WhatsApp</h3>
                        <p className="typography-p2 text-black/70 mb-3">
                          The fastest way to reach us. We typically respond within a few hours.
                        </p>
                        <a 
                          href="https://wa.me/8861078009" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg typography-p2 font-semibold hover:bg-primary/90 transition-all shadow-md hover:shadow-lg"
                        >
                          <MessageCircle className="w-5 h-5" />
                          Message Us on WhatsApp
                        </a>
                        <p className="typography-footnote text-black/60 mt-2">
                          Phone: <a href="tel:+918861078009" className="text-primary hover:underline">+91 8861078009</a>
                        </p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="typography-h3 text-black mb-2">Email</h3>
                        <p className="typography-p2 text-black/70 mb-3">
                          Send us a detailed message and we'll get back to you within 24 hours.
                        </p>
                        <p className="typography-p2 text-black/70">
                          For general inquiries, please contact us via WhatsApp for faster response.
                        </p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="typography-h3 text-black mb-2">Phone</h3>
                        <p className="typography-p2 text-black/70 mb-3">
                          Call us during business hours for immediate assistance.
                        </p>
                        <a 
                          href="tel:+918861078009" 
                          className="text-primary hover:underline typography-p2 font-semibold"
                        >
                          +91 8861078009
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">Business Hours</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  We're available Monday through Saturday, 9:00 AM to 6:00 PM IST. For urgent matters outside business 
                  hours, please send us a WhatsApp message and we'll respond as soon as possible.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">What We Can Help With</h2>
                <ul className="list-disc list-inside typography-p2 text-black/70 mb-4 space-y-2">
                  <li>Marketing strategy consultation for healthcare practices</li>
                  <li>Website design and development inquiries</li>
                  <li>SEO and local marketing services</li>
                  <li>Content creation and social media management</li>
                  <li>Event booking and registration support</li>
                  <li>Payment and billing questions</li>
                  <li>General inquiries about our services</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">Other Resources</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  For more information about our services, policies, and terms:
                </p>
                <ul className="list-disc list-inside typography-p2 text-black/70 mb-4 space-y-2">
                  <li><Link href="/about-us" className="text-primary hover:underline">Learn more about us</Link></li>
                  <li><Link href="/pricing" className="text-primary hover:underline">View pricing information</Link></li>
                  <li><Link href="/terms-of-service" className="text-primary hover:underline">Read our Terms of Service</Link></li>
                  <li><Link href="/privacy-policy" className="text-primary hover:underline">Review our Privacy Policy</Link></li>
                  <li><Link href="/cancellation-refund-policy" className="text-primary hover:underline">Cancellation & Refund Policy</Link></li>
                </ul>
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
