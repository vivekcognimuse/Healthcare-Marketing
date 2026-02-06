import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { AlertCircle, Clock, CheckCircle, XCircle } from "lucide-react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy",
  description: "Cancellation and Refund Policy for CogniMuse Marketing. Learn about our refund terms, cancellation procedures, and policies for event bookings and services.",
  alternates: {
    canonical: "https://musemarketing.web.app/cancellation-refund-policy",
  },
  openGraph: {
    title: "Cancellation & Refund Policy - CogniMuse Marketing",
    description: "Cancellation and Refund Policy for CogniMuse Marketing",
    url: "https://musemarketing.web.app/cancellation-refund-policy",
    type: "website",
  },
};

export default function CancellationRefundPolicy() {
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
            <h1 className="typography-h1 text-black mb-8">Cancellation & Refund Policy</h1>
            <p className="typography-p2 text-black/70 mb-8">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <p className="typography-p2 text-black/70 mb-6">
                  This Cancellation & Refund Policy outlines the terms and conditions for canceling bookings and requesting 
                  refunds for events and services provided by CogniMuse Marketing. Please read this policy carefully before 
                  making any bookings or payments.
                </p>
              </section>

              {/* Event Booking Cancellation */}
              <section className="mb-8">
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 sm:p-8 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertCircle className="w-6 h-6 text-primary" />
                    <h2 className="typography-h2 text-black">Event Booking Cancellation</h2>
                  </div>

                  <div className="bg-white rounded-lg p-6 border-2 border-primary/20 mb-4">
                    <h3 className="typography-h3 text-black mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      Cancellation by You (Customer)
                    </h3>
                    <p className="typography-p2 text-black/70 mb-4">
                      You may cancel your event booking subject to the following terms:
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="typography-p2 font-semibold text-black mb-1">48+ Hours Before Event</h4>
                          <p className="typography-p2 text-black/70">
                            If you cancel your booking 48 hours or more before the scheduled event start time, you are 
                            eligible for a <strong>full refund</strong> (minus any processing fees, if applicable). 
                            Refunds will be processed within 7-14 business days to your original payment method.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="typography-p2 font-semibold text-black mb-1">Less Than 48 Hours Before Event</h4>
                          <p className="typography-p2 text-black/70">
                            Cancellations made less than 48 hours before the event start time are generally <strong>not eligible 
                            for refund</strong>, unless otherwise specified in the event details or due to exceptional circumstances 
                            (medical emergencies, etc.). Please contact us immediately if you need to cancel due to an emergency.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="typography-p2 font-semibold text-black mb-1">No-Show</h4>
                          <p className="typography-p2 text-black/70">
                            If you do not attend the event without prior cancellation, <strong>no refund will be provided</strong>. 
                            Meeting links and access credentials are provided upon booking confirmation, and it is your 
                            responsibility to attend or cancel in advance.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-6 border-2 border-primary/20">
                    <h3 className="typography-h3 text-black mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      Cancellation by Us (Event Organizer)
                    </h3>
                    <p className="typography-p2 text-black/70 mb-4">
                      In the event that we need to cancel or reschedule an event due to unforeseen circumstances:
                    </p>
                    <ul className="list-disc list-inside typography-p2 text-black/70 mb-4 space-y-2">
                      <li>You will be notified immediately via email and/or WhatsApp</li>
                      <li>You will receive a <strong>full refund</strong> of your ticket price</li>
                      <li>Refunds will be processed within 7-14 business days</li>
                      <li>If the event is rescheduled, you will have the option to attend the new date or receive a full refund</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Refund Process */}
              <section className="mb-8">
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 sm:p-8 mb-6">
                  <h2 className="typography-h2 text-black mb-4">Refund Process</h2>
                  
                  <div className="bg-white rounded-lg p-6 border-2 border-primary/20">
                    <h3 className="typography-h3 text-black mb-4">How to Request a Refund</h3>
                    <ol className="list-decimal list-inside typography-p2 text-black/70 mb-4 space-y-2">
                      <li>Contact us via WhatsApp at <a href="https://wa.me/8861078009" className="text-primary hover:underline">+91 8861078009</a> or email</li>
                      <li>Provide your booking confirmation number or transaction ID</li>
                      <li>State the reason for cancellation/refund request</li>
                      <li>We will review your request and respond within 24-48 hours</li>
                    </ol>

                    <h3 className="typography-h3 text-black mb-4 mt-6">Refund Processing Time</h3>
                    <ul className="list-disc list-inside typography-p2 text-black/70 mb-4 space-y-2">
                      <li><strong>Approval:</strong> Refund requests are typically approved within 24-48 hours of submission</li>
                      <li><strong>Processing:</strong> Once approved, refunds are processed within 7-14 business days</li>
                      <li><strong>Credit to Account:</strong> The time for the refund to appear in your account depends on your bank or payment provider (typically 3-7 additional business days)</li>
                    </ul>

                    <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 mt-4">
                      <p className="typography-p2 text-black/70">
                        <strong>Note:</strong> Refunds are processed to the original payment method used for the transaction. 
                        If the original payment method is no longer available, please contact us to arrange an alternative 
                        refund method.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Marketing Services */}
              <section className="mb-8">
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 sm:p-8 mb-6">
                  <h2 className="typography-h2 text-black mb-4">Marketing Services Cancellation</h2>
                  <div className="bg-white rounded-lg p-6 border-2 border-primary/20">
                    <p className="typography-p2 text-black/70 mb-4">
                      For marketing services (branding, website design, SEO, content creation, etc.), cancellation and 
                      refund terms are specified in your individual service agreement. Generally:
                    </p>
                    <ul className="list-disc list-inside typography-p2 text-black/70 mb-4 space-y-2">
                      <li>Services already rendered are not eligible for refund</li>
                      <li>Partial refunds may be available for services not yet started, subject to agreement terms</li>
                      <li>Cancellation must be provided in writing with appropriate notice</li>
                      <li>Refund eligibility is determined on a case-by-case basis as per your service agreement</li>
                    </ul>
                    <p className="typography-p2 text-black/70">
                      Please refer to your specific service agreement for detailed cancellation and refund terms.
                    </p>
                  </div>
                </div>
              </section>

              {/* Disputed Transactions */}
              <section className="mb-8">
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 sm:p-8 mb-6">
                  <h2 className="typography-h2 text-black mb-4">Disputed Transactions</h2>
                  <div className="bg-white rounded-lg p-6 border-2 border-primary/20">
                    <p className="typography-p2 text-black/70 mb-4">
                      If you believe a transaction was made in error or fraudulently:
                    </p>
                    <ul className="list-disc list-inside typography-p2 text-black/70 mb-4 space-y-2">
                      <li>Contact us immediately via WhatsApp or email</li>
                      <li>Provide transaction details and reason for dispute</li>
                      <li>We will investigate the matter promptly</li>
                      <li>If the transaction is found to be erroneous, a full refund will be processed</li>
                    </ul>
                    <p className="typography-p2 text-black/70">
                      <strong>Important:</strong> Please contact us before initiating a chargeback with your bank or payment 
                      provider. We are committed to resolving disputes amicably and quickly.
                    </p>
                  </div>
                </div>
              </section>

              {/* Free Events */}
              <section className="mb-8">
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 sm:p-8 mb-6">
                  <h2 className="typography-h2 text-black mb-4">Free Events</h2>
                  <div className="bg-white rounded-lg p-6 border-2 border-primary/20">
                    <p className="typography-p2 text-black/70">
                      For free events, no payment is required and therefore no refund is applicable. However, if you have 
                      registered for a free event and are unable to attend, please notify us so we can release your spot 
                      to others on the waiting list.
                    </p>
                  </div>
                </div>
              </section>

              {/* Contact */}
              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">Questions About Cancellations or Refunds?</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  If you have any questions about this policy or need assistance with a cancellation or refund request, 
                  please contact us:
                </p>
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6">
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
                  <p className="typography-p2 text-black/70">
                    <strong>Email:</strong> Contact us via WhatsApp for fastest response
                  </p>
                </div>
              </section>

              {/* Policy Updates */}
              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">Policy Updates</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  We reserve the right to update this Cancellation & Refund Policy at any time. Changes will be posted on 
                  this page with an updated "Last updated" date. Your continued use of our services after changes are posted 
                  constitutes acceptance of the updated policy.
                </p>
                <p className="typography-p2 text-black/70">
                  Existing bookings will be honored under the cancellation and refund terms in effect at the time of booking.
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
