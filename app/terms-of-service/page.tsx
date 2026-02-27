import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Creative Labs - Expert Marketing for Healthcare Professionals. Learn about our service terms, client responsibilities, payment terms, and compliance requirements.",
  alternates: {
    canonical: "https://musemarketing.web.app/terms-of-service",
  },
  openGraph: {
    title: "Terms of Service - Creative Labs",
    description: "Terms of Service for Creative Labs - Expert Marketing for Healthcare Professionals",
    url: "https://musemarketing.web.app/terms-of-service",
    type: "website",
  },
};

export default function TermsOfService() {
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
            <h1 className="typography-h1 text-black mb-8">Terms of Service</h1>
            <p className="typography-p2 text-black/70 mb-6">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">1. Agreement to Terms</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  By accessing and using the services of Creative Labs, you agree to be bound by these Terms of Service. 
                  If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">2. Services</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  Creative Labs provides digital marketing services specifically tailored for healthcare professionals, 
                  including but not limited to:
                </p>
                <ul className="list-disc list-inside typography-p2 text-black/70 mb-4 space-y-2">
                  <li>Branding & Visual Identity</li>
                  <li>Website Design</li>
                  <li>Local SEO & Patient Discovery</li>
                  <li>Content Creation (Long-form and Short-form videos)</li>
                  <li>Marketing Campaigns</li>
                  <li>Social Media Management</li>
                  <li>Event Management and Booking Services (including podcast events, workshops, and seminars)</li>
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
                <h2 className="typography-h2 text-black mb-4">4. Payment Terms and Processing</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  <strong>4.1 Payment Gateway:</strong> We use Razorpay Software Private Limited ("Razorpay") as our payment 
                  gateway provider to process all payments securely. By making a payment, you agree to Razorpay's terms of 
                  service available at: <a href="https://razorpay.com/terms/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://razorpay.com/terms/</a>
                </p>
                <p className="typography-p2 text-black/70 mb-4">
                  <strong>4.2 Payment Methods:</strong> We accept payments through various methods including credit cards, debit 
                  cards, UPI, net banking, and digital wallets, as made available by Razorpay.
                </p>
                <p className="typography-p2 text-black/70 mb-4">
                  <strong>4.3 Payment Processing:</strong> All payments are processed in Indian Rupees (INR). Payment amounts 
                  are displayed in INR, and the final amount charged will be as displayed at the time of booking confirmation.
                </p>
                <p className="typography-p2 text-black/70 mb-4">
                  <strong>4.4 Transaction Fees:</strong> Transaction fees, if any, are included in the displayed price. 
                  No additional charges will be applied beyond the displayed amount.
                </p>
                <p className="typography-p2 text-black/70 mb-4">
                  <strong>4.5 Payment Confirmation:</strong> Your booking is confirmed only upon successful payment. You will 
                  receive a confirmation email/SMS with booking details and meeting link (if applicable) upon successful payment.
                </p>
                <p className="typography-p2 text-black/70 mb-4">
                  <strong>4.6 Failed Payments:</strong> If payment fails, your booking will not be confirmed. Please ensure 
                  sufficient funds and correct payment details. We are not responsible for payment failures due to incorrect 
                  information or insufficient funds.
                </p>
                <p className="typography-p2 text-black/70 mb-4">
                  <strong>4.7 Service Agreement Payments:</strong> For marketing services, payment terms will be specified in 
                  your service agreement. All fees are due as per the agreed schedule. Late payments may result in service 
                  suspension or termination.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">5. Event Booking Terms</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  <strong>5.1 Booking Process:</strong> Event bookings are subject to availability and capacity limits. 
                  Bookings are confirmed only upon successful payment. We reserve the right to refuse or cancel bookings 
                  at our discretion.
                </p>
                <p className="typography-p2 text-black/70 mb-4">
                  <strong>5.2 Event Pricing:</strong> Event ticket prices are set by the event organizer and displayed at 
                  the time of booking. Prices are subject to change without notice, but you will be charged the price 
                  displayed at the time of your booking confirmation.
                </p>
                <p className="typography-p2 text-black/70 mb-4">
                  <strong>5.3 Event Cancellation by Us:</strong> We reserve the right to cancel or reschedule events due 
                  to unforeseen circumstances. In such cases, you will be notified promptly, and a full refund will be 
                  processed within 7-14 business days.
                </p>
                <p className="typography-p2 text-black/70 mb-4">
                  <strong>5.4 Event Cancellation by You:</strong> Cancellation and refund policies vary by event. Please 
                  refer to the specific event details for cancellation terms. Generally:
                </p>
                <ul className="list-disc list-inside typography-p2 text-black/70 mb-4 space-y-2 ml-4">
                  <li>Cancellations made 48 hours or more before the event: Full refund (minus processing fees, if any)</li>
                  <li>Cancellations made less than 48 hours before the event: No refund (unless otherwise specified)</li>
                  <li>No-shows: No refund</li>
                </ul>
                <p className="typography-p2 text-black/70 mb-4">
                  <strong>5.5 Refund Processing:</strong> Refunds, when applicable, will be processed to the original payment 
                  method within 7-14 business days. Refund processing time may vary depending on your bank or payment provider.
                </p>
                <p className="typography-p2 text-black/70 mb-4">
                  <strong>5.6 Event Access:</strong> Meeting links and event access details will be provided upon successful 
                  booking. You are responsible for maintaining the confidentiality of meeting links and access credentials.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">6. Refund and Cancellation Policy</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  <strong>6.1 General Refund Policy:</strong> Refunds are processed in accordance with the specific terms 
                  applicable to each service or event. Refund requests must be submitted through our official channels.
                </p>
                <p className="typography-p2 text-black/70 mb-4">
                  <strong>6.2 Refund Eligibility:</strong> Refunds are subject to the terms specified at the time of purchase. 
                  We reserve the right to refuse refunds for services already rendered or events already attended.
                </p>
                <p className="typography-p2 text-black/70 mb-4">
                  <strong>6.3 Refund Processing Time:</strong> Approved refunds will be processed within 7-14 business days 
                  to the original payment method. Processing time may vary based on your bank or payment provider.
                </p>
                <p className="typography-p2 text-black/70 mb-4">
                  <strong>6.4 Disputed Transactions:</strong> If you believe a transaction was made in error or fraudulently, 
                  please contact us immediately. We will investigate and work with our payment gateway provider to resolve 
                  the issue.
                </p>
                <p className="typography-p2 text-black/70 mb-4">
                  <strong>6.5 Chargebacks:</strong> Initiating a chargeback without first contacting us may result in account 
                  suspension. Please contact us to resolve any payment issues before initiating a chargeback.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">7. Intellectual Property</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  All content, designs, and materials created by Creative Labs remain our intellectual property until 
                  full payment is received. Upon full payment, you will receive usage rights as specified in your agreement.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">8. Compliance</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  All marketing materials and strategies must comply with healthcare advertising regulations, including 
                  HIPAA guidelines where applicable. Creative Labs will work with you to ensure compliance, but 
                  ultimate responsibility lies with the healthcare provider.
                </p>
                <p className="typography-p2 text-black/70 mb-4">
                  <strong>8.1 Payment Compliance:</strong> All payment processing complies with applicable financial 
                  regulations and PCI-DSS standards through our payment gateway provider, Razorpay.
                </p>
                <p className="typography-p2 text-black/70 mb-4">
                  <strong>8.2 Tax Compliance:</strong> All prices displayed are inclusive of applicable taxes unless 
                  otherwise specified. We comply with Indian tax regulations, including GST.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">9. Limitation of Liability</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  Creative Labs shall not be liable for any indirect, incidental, or consequential damages arising 
                  from the use of our services. Our liability is limited to the amount paid for the specific service in question.
                </p>
                <p className="typography-p2 text-black/70 mb-4">
                  <strong>9.1 Payment Gateway Liability:</strong> We are not responsible for any issues arising from 
                  payment gateway failures, network issues, or third-party payment processor errors. However, we will 
                  work with our payment gateway provider to resolve any legitimate issues.
                </p>
                <p className="typography-p2 text-black/70 mb-4">
                  <strong>9.2 Event Liability:</strong> We are not liable for any loss, damage, or injury occurring 
                  during events. Participants attend events at their own risk.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">10. Termination</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  Either party may terminate services with written notice as specified in your service agreement. 
                  Upon termination, you will be responsible for payment of all services rendered up to the termination date.
                </p>
                <p className="typography-p2 text-black/70 mb-4">
                  <strong>10.1 Account Termination:</strong> We reserve the right to suspend or terminate accounts that 
                  violate these terms, engage in fraudulent activities, or abuse our services.
                </p>
                <p className="typography-p2 text-black/70 mb-4">
                  <strong>10.2 Booking Cancellation:</strong> We reserve the right to cancel bookings that violate 
                  our terms or are suspected of fraudulent activity.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">11. Dispute Resolution</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  <strong>11.1 Governing Law:</strong> These terms are governed by the laws of India. Any disputes 
                  arising from these terms or our services shall be subject to the exclusive jurisdiction of courts 
                  in India.
                </p>
                <p className="typography-p2 text-black/70 mb-4">
                  <strong>11.2 Dispute Resolution Process:</strong> In case of any disputes, we encourage you to 
                  contact us first to resolve the issue amicably. If a resolution cannot be reached, disputes will 
                  be resolved through appropriate legal channels.
                </p>
                <p className="typography-p2 text-black/70 mb-4">
                  <strong>11.3 Payment Disputes:</strong> For payment-related disputes, please contact us immediately. 
                  We will work with our payment gateway provider to investigate and resolve the issue.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">12. Changes to Terms</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  Creative Labs reserves the right to modify these terms at any time. Continued use of our services 
                  after changes constitutes acceptance of the new terms. We will notify users of significant changes 
                  via email or website notice.
                </p>
                <p className="typography-p2 text-black/70 mb-4">
                  <strong>12.1 Payment Terms Changes:</strong> Changes to payment terms will be communicated in advance, 
                  and existing bookings will be honored under the terms in effect at the time of booking.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">13. User Responsibilities</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  <strong>13.1 Accurate Information:</strong> You are responsible for providing accurate and complete 
                  information during booking and payment processes. Incorrect information may result in booking cancellation 
                  or payment issues.
                </p>
                <p className="typography-p2 text-black/70 mb-4">
                  <strong>13.2 Payment Security:</strong> You are responsible for maintaining the security of your payment 
                  credentials and account information. Do not share payment details with unauthorized parties.
                </p>
                <p className="typography-p2 text-black/70 mb-4">
                  <strong>13.3 Prohibited Activities:</strong> You agree not to:
                </p>
                <ul className="list-disc list-inside typography-p2 text-black/70 mb-4 space-y-2 ml-4">
                  <li>Use our services for any illegal or unauthorized purpose</li>
                  <li>Attempt to circumvent payment systems or engage in fraudulent transactions</li>
                  <li>Interfere with or disrupt our services or payment processing</li>
                  <li>Use automated systems to make bookings or payments</li>
                  <li>Share meeting links or access credentials with unauthorized parties</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">14. Contact Information</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  If you have any questions about these Terms of Service, payment issues, or booking inquiries, please contact us:
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
                  <strong>Payment Gateway Support:</strong> For payment gateway-related issues, you may also contact 
                  Razorpay support directly at <a href="https://razorpay.com/support/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://razorpay.com/support/</a>
                </p>
                <p className="typography-p2 text-black/70 mb-4">
                  <strong>Grievance Officer:</strong> For any grievances or complaints, please contact our Grievance 
                  Officer at the contact details provided above.
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

