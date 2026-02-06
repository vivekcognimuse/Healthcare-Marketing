import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Calendar, IndianRupee, Users, Info } from "lucide-react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Learn about CogniMuse Marketing pricing for healthcare professionals. We offer flexible pricing for marketing services and event bookings with transparent, dynamic pricing.",
  alternates: {
    canonical: "https://musemarketing.web.app/pricing",
  },
  openGraph: {
    title: "Pricing - CogniMuse Marketing",
    description: "Learn about CogniMuse Marketing pricing for healthcare professionals",
    url: "https://musemarketing.web.app/pricing",
    type: "website",
  },
};

export default function Pricing() {
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
            <h1 className="typography-h1 text-black mb-8">Pricing</h1>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <p className="typography-p2 text-black/70 mb-6">
                  At CogniMuse Marketing, we offer flexible and transparent pricing for our services. Our pricing structure 
                  is designed to accommodate the diverse needs of healthcare professionals, from individual practitioners 
                  to large practices.
                </p>
              </section>

              {/* Event Booking Pricing */}
              <section className="mb-8">
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 sm:p-8 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="w-6 h-6 text-primary" />
                    <h2 className="typography-h2 text-black">Event Booking Pricing</h2>
                  </div>
                  <p className="typography-p2 text-black/70 mb-4">
                    We organize various events including podcast sessions, workshops, and seminars for healthcare professionals. 
                    Each event has its own pricing based on the event type, duration, and content.
                  </p>
                  
                  <div className="bg-white rounded-lg p-6 border-2 border-primary/20 mb-4">
                    <h3 className="typography-h3 text-black mb-4 flex items-center gap-2">
                      <Info className="w-5 h-5 text-primary" />
                      How Event Pricing Works
                    </h3>
                    <ul className="list-disc list-inside typography-p2 text-black/70 mb-4 space-y-2">
                      <li><strong>Dynamic Pricing:</strong> Each event has its own ticket price set by the event organizer</li>
                      <li><strong>Transparent Display:</strong> The exact ticket price is clearly displayed on each event's booking page</li>
                      <li><strong>Free Events:</strong> Some events may be free - this will be indicated on the booking page</li>
                      <li><strong>All-Inclusive:</strong> The displayed price includes all applicable taxes and fees</li>
                      <li><strong>No Hidden Charges:</strong> You pay exactly what is shown - no additional fees at checkout</li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-lg p-6 border-2 border-primary/20">
                    <h3 className="typography-h3 text-black mb-4 flex items-center gap-2">
                      <IndianRupee className="w-5 h-5 text-primary" />
                      Payment Information
                    </h3>
                    <ul className="list-disc list-inside typography-p2 text-black/70 mb-4 space-y-2">
                      <li>All prices are displayed in Indian Rupees (INR)</li>
                      <li>Payments are processed securely through Razorpay</li>
                      <li>We accept credit cards, debit cards, UPI, net banking, and digital wallets</li>
                      <li>Payment confirmation and event details are sent immediately after successful payment</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Marketing Services Pricing */}
              <section className="mb-8">
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 sm:p-8 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-6 h-6 text-primary" />
                    <h2 className="typography-h2 text-black">Marketing Services Pricing</h2>
                  </div>
                  <p className="typography-p2 text-black/70 mb-4">
                    Our marketing services are customized based on your specific needs, practice size, and goals. We offer 
                    flexible packages and can create custom solutions tailored to your requirements.
                  </p>
                  
                  <div className="bg-white rounded-lg p-6 border-2 border-primary/20">
                    <h3 className="typography-h3 text-black mb-4">Custom Pricing</h3>
                    <p className="typography-p2 text-black/70 mb-4">
                      Since every healthcare practice is unique, we provide customized pricing based on:
                    </p>
                    <ul className="list-disc list-inside typography-p2 text-black/70 mb-4 space-y-2">
                      <li>Scope of services required (branding, website, SEO, content, etc.)</li>
                      <li>Practice size and target market</li>
                      <li>Project duration and timeline</li>
                      <li>Specific goals and objectives</li>
                    </ul>
                    <p className="typography-p2 text-black/70 mb-4">
                      To get a personalized quote for your practice, please contact us for a consultation. We'll discuss 
                      your needs and provide transparent pricing with no hidden fees.
                    </p>
                    <a 
                      href="https://wa.me/8861078009" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg typography-p2 font-semibold hover:bg-primary/90 transition-all shadow-md hover:shadow-lg"
                    >
                      Get a Custom Quote
                    </a>
                  </div>
                </div>
              </section>

              {/* Important Notes */}
              <section className="mb-8">
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
                  <h3 className="typography-h3 text-black mb-4">Important Notes</h3>
                  <ul className="list-disc list-inside typography-p2 text-black/70 space-y-2">
                    <li>All prices are subject to change, but you will be charged the price displayed at the time of booking</li>
                    <li>Event prices are set per event and may vary between different events</li>
                    <li>Marketing service pricing is discussed during consultation and confirmed before project start</li>
                    <li>All payments are processed securely and comply with Indian financial regulations</li>
                    <li>For refund and cancellation policies, please see our <Link href="/cancellation-refund-policy" className="text-primary hover:underline">Cancellation & Refund Policy</Link></li>
                  </ul>
                </div>
              </section>

              {/* Contact Section */}
              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">Have Questions About Pricing?</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  If you have any questions about our pricing or would like to discuss your specific needs, we're here to help. 
                  Contact us through any of the following channels:
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="https://wa.me/8861078009" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg typography-p2 font-semibold hover:bg-primary/90 transition-all shadow-md hover:shadow-lg"
                  >
                    WhatsApp Us
                  </a>
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black/5 text-black rounded-lg typography-p2 font-semibold hover:bg-black/10 transition-all"
                  >
                    View Contact Page
                  </Link>
                </div>
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
