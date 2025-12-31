import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TransitionSection from "@/components/TransitionSection";
import ContentSection from "@/components/ContentSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import PackagesSection from "@/components/PackagesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Muse Marketing",
    "description": "Expert Marketing for Healthcare Professionals. Connect with the Right Patients through Trusted Marketing Techniques.",
    "url": "https://musemarketing.web.app",
    "logo": "https://musemarketing.web.app/Images webp/Logo.webp",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "availableLanguage": "English"
    },
    "sameAs": [],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Healthcare Marketing Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Branding & Visual Identity",
            "description": "Professional branding services for healthcare practices"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Website Design",
            "description": "Custom website design for healthcare professionals"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Local SEO & Patient Discovery",
            "description": "SEO services to help healthcare practices connect with patients"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Long-Form Videos",
            "description": "Professional video content creation for healthcare marketing"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Marketing Campaigns",
            "description": "Comprehensive marketing campaign management"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Short Form Videos",
            "description": "Engaging short-form video content for social media"
          }
        }
      ]
    }
  };

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Muse Marketing",
    "url": "https://musemarketing.web.app",
    "description": "Expert Marketing for Healthcare Professionals"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
      />
      <main className="min-h-screen">
        <Header />
        <Hero />
        <TransitionSection />
        <ContentSection />
        <WhyChooseSection />
        <PackagesSection />
        <TestimonialsSection />
        <Footer />
        <ScrollToTop />
      </main>
    </>
  );
}

