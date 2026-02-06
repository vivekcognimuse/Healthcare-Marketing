import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about CogniMuse Marketing - Expert marketing services for healthcare professionals. We help healthcare practices grow through SEO, branding, content creation, and digital marketing.",
  alternates: {
    canonical: "https://musemarketing.web.app/about-us",
  },
  openGraph: {
    title: "About Us - CogniMuse Marketing",
    description: "Learn about CogniMuse Marketing - Expert marketing services for healthcare professionals",
    url: "https://musemarketing.web.app/about-us",
    type: "website",
  },
};

export default function AboutUs() {
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
            <h1 className="typography-h1 text-black mb-8">About Us</h1>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">Who We Are</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  CogniMuse Marketing is a specialized digital marketing agency dedicated to helping healthcare professionals 
                  grow their practices and reach more patients. We understand the unique challenges healthcare providers face 
                  in today's digital landscape and provide tailored marketing solutions that comply with healthcare regulations 
                  and ethical standards.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">Our Mission</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  Our mission is to empower healthcare professionals with effective marketing strategies that help them 
                  connect with patients, build trust, and grow their practices. We believe that every healthcare provider 
                  deserves access to professional marketing services that respect patient privacy and maintain the highest 
                  ethical standards.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">What We Do</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  We offer comprehensive digital marketing services specifically designed for healthcare professionals:
                </p>
                <ul className="list-disc list-inside typography-p2 text-black/70 mb-4 space-y-2">
                  <li><strong>Branding & Visual Identity:</strong> Create a professional brand that reflects your practice's values and expertise</li>
                  <li><strong>Website Design:</strong> Build responsive, user-friendly websites that convert visitors into patients</li>
                  <li><strong>Local SEO & Patient Discovery:</strong> Help patients find you when they search for healthcare services in your area</li>
                  <li><strong>Content Creation:</strong> Produce engaging long-form and short-form video content that educates and builds trust</li>
                  <li><strong>Marketing Campaigns:</strong> Develop and execute targeted marketing campaigns to reach your ideal patients</li>
                  <li><strong>Social Media Management:</strong> Manage your online presence across social media platforms</li>
                  <li><strong>Event Management:</strong> Organize and manage podcast events, workshops, and seminars for healthcare professionals</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">Why Choose Us</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  Healthcare marketing requires a deep understanding of both marketing principles and healthcare regulations. 
                  We specialize in this intersection, ensuring that all our marketing strategies:
                </p>
                <ul className="list-disc list-inside typography-p2 text-black/70 mb-4 space-y-2">
                  <li>Comply with healthcare advertising regulations and HIPAA guidelines</li>
                  <li>Maintain patient privacy and confidentiality</li>
                  <li>Build trust and credibility with your target audience</li>
                  <li>Deliver measurable results and ROI</li>
                  <li>Respect ethical standards in healthcare marketing</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">Our Approach</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  We take a collaborative approach to marketing, working closely with healthcare professionals to understand 
                  their unique needs, target audience, and practice goals. Every strategy is customized to reflect your 
                  brand, values, and the specific services you offer.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="typography-h2 text-black mb-4">Get in Touch</h2>
                <p className="typography-p2 text-black/70 mb-4">
                  Ready to take your healthcare practice to the next level? We'd love to hear from you and discuss how 
                  we can help you grow your practice.
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
                  Visit our <Link href="/contact-us" className="text-primary hover:underline">Contact Us</Link> page for more ways to reach us.
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
