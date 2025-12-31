"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, memo } from "react";

const services = [
  {
    icon: "/icons/contentSection/0.svg",
    title: "Branding & Visual Identity",
    description: "Create a strong brand identity with a unique logo, colors, and visuals that reflect your healthcare values and build patient trust.",
    hashtag: "#BuildYourBrand",
  },
  {
    icon: "/icons/contentSection/1.svg",
    title: "Website Design",
    description: "Visually appealing, SEO-optimized websites that enhance your online presence, improve user experience, and drive conversions.",
    hashtag: "#SearchOnlineAndShine",
  },
  {
    icon: "/icons/contentSection/2.svg",
    title: "Local SEO, Patient Discovery",
    description: "Help nearby patients discover your therapy services through optimized local SEO and Google My Business listings.",
    hashtag: "#Visibility",
  },
  {
    icon: "/icons/contentSection/3.svg",
    title: "Long-Form Videos",
    description: "Produce in-depth educational videos to establish authority, share valuable insights, and build trust with potential patients.",
    hashtag: "#AuthoritativeBuilding",
  },
  {
    icon: "/icons/contentSection/4.svg",
    title: "Marketing Campaign",
    description: "Run targeted campaigns to attract patients, increase visibility, and achieve measurable growth outcomes.",
    hashtag: "#ReachAndAttraction",
  },
  {
    icon: "/icons/contentSection/5.svg",
    title: "Short Form Videos",
    description: "Engage your audience with dynamic short videos to showcase services, share quick tips, and highlight patient success stories.",
    hashtag: "#PatientEngagement",
  },
];

const additionalServices: Array<{
  name: string;
  hashtags: string[];
  samples: Array<{
    before: { type: "image" | "video"; src: string };
    after: { type: "image" | "video"; src: string };
  }>;
}> = [
  { 
    name: "Posters Design", 
    hashtags: ["#InstagramPosts", "#LinkedInCreatives"],
    samples: [
      {
        before: { type: "image" as const, src: "/Poster 1/Iceberg before.webp" },
        after: { type: "image" as const, src: "/Poster 1/Iceberg after.webp" }
      },
      {
        before: { type: "image" as const, src: "/Poster 2/deformity before.webp" },
        after: { type: "image" as const, src: "/Poster 2/deformity after.webp" }
      }
    ]
  },
  { 
    name: "Website Design", 
    hashtags: ["#HealthcareWebsites", "#UXUI", "#DigitalPresence"],
    samples: [
      {
        before: { type: "image" as const, src: "/Website/Website before.webp" },
        after: { type: "image" as const, src: "/Website/Website after.webp" }
      }
    ]
  },
  { 
    name: "Branding & Visual Identity", 
    hashtags: ["#Logodesign", "#UXUI", "#HealthcareLogos"],
    samples: [
      {
        before: { type: "image" as const, src: "/Logos/Logo before.webp" },
        after: { type: "image" as const, src: "/Logos/Logo after.webp" }
      }
    ]
  },
  { 
    name: "Long-Form videos", 
    hashtags: ["#Exercise demonstrations", "#Patient education series", "#Therapist-led talks"],
    samples: [
      {
        before: { type: "video" as const, src: "/Compressed videos/Long-form-Video/before-video.mp4" },
        after: { type: "video" as const, src: "/Compressed videos/Long-form-Video/after-video.mp4" }
      }
    ]
  },
  { 
    name: "Short-Form videos", 
    hashtags: ["#Therapy tips", "#Myth vs Fact", "#Talking-head advice"],
    samples: [
      {
        before: { type: "video" as const, src: "/Compressed videos/Short-form-video/Short-form-video-1-before.mp4" },
        after: { type: "video" as const, src: "/Compressed videos/Short-form-video/Short-form-video-1-after.mp4" }
      },
      {
        before: { type: "video" as const, src: "/Compressed videos/Short-form-video/Short-form-video-2-before.mp4" },
        after: { type: "video" as const, src: "/Compressed videos/Short-form-video/Short-form-video-2-after.mp4" }
      }
    ]
  },
];

export default function ContentSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const isCardsInView = useInView(cardsRef, { once: true, margin: "-50px" });

  return (
    <section id="services" className="bg-white py-12 sm:py-16 lg:py-24">
      <div className="container">
        {/* Header */}
        <motion.div 
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="typography-h2 text-black mb-4">
            Content That Connects & Converts
          </h2>
          <p className="typography-p1 text-black/80  mx-auto">
            Specialized social media content creation services designed specifically for the healthcare industry.
          </p>
        </motion.div>

        {/* Service Cards Grid */}
        <motion.div 
          ref={cardsRef}
          initial="hidden"
          animate={isCardsInView ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="bg-primary/10 rounded-xl p-6 lg:p-8 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <Image
                  src={service.icon}
                  alt={service.title}
                  width={48}
                  height={48}
                  className="w-12 h-12"
                />
                <span className="typography-footnote">
                  <span className="text-primary">#</span>
                  <span style={{ color: '#1E1E1E' }}>{service.hashtag.substring(1)}</span>
                </span>
              </div>
              <h3 className="typography-h3 text-black mb-3">{service.title}</h3>
              <p className="typography-p2 text-black/70 mb-4">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Stacked Folder Cards - Full Width */}
      <StackedFolderCards services={additionalServices} />
    </section>
  );
}

interface StackedFolderCardsProps {
  services: Array<{
    name: string;
    hashtags: string[];
    samples: Array<{
      before: { type: "image" | "video"; src: string };
      after: { type: "image" | "video"; src: string };
    }>;
  }>;
}

// Memoized individual card component to prevent unnecessary re-renders
const StackedCard = memo(({ 
  service, 
  index, 
  totalCards 
}: { 
  service: {
    name: string;
    hashtags: string[];
    samples: Array<{
      before: { type: "image" | "video"; src: string };
      after: { type: "image" | "video"; src: string };
    }>;
  };
  index: number;
  totalCards: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { 
    once: true, // Only animate once to prevent flickering
    margin: "-100px 0px -100px 0px", // More generous margins
    amount: 0.15
  });

  const zIndex = index + 1;
  const headerGap = 24; // Small gap to show just a sliver of previous cards (stacked effect)
  const stickyTop = 50 + (index * headerGap);
  
  // Calculate scale: each card is slightly smaller than the one on top
  // Latest card (highest index) = scale 1.0, previous cards scale down progressively
  const maxIndex = totalCards - 1;
  const scaleValue = 0.95 + (index / maxIndex) * 0.05; // Ranges from 0.95 to 1.0

  return (
    <motion.div
      ref={cardRef}
      className="sticky"
      style={{
        zIndex,
        top: `${stickyTop}px`,
      }}
      initial={{ 
        y: 100,
        opacity: 0,
      }}
      animate={isInView ? { 
        y: 0,
        opacity: 1,
      } : { 
        y: 100,
        opacity: 0,
      }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div
        className="shadow-2xl"
        style={{
          background: 'linear-gradient(180deg, rgba(21, 93, 252, 0.3) 0%, rgba(102, 102, 102, 0) 28.85%)',
          borderRadius: '16px',
          padding: '3px',
          transform: `scale(${scaleValue})`,
          transformOrigin: 'top center',
          minHeight: '100vh',
        }}
        whileHover={{
          y: -5,
          transition: { duration: 0.3, ease: "easeOut" }
        }}
      >
        <div className={`bg-white h-full overflow-hidden ${service.samples.length === 1 ? 'pb-48 md:pb-8' : 'pb-8'}`} style={{ borderRadius: '13px' }}>
        {/* Header: Service Name (Left) and Hashtags (Right) - Responsive Design */}
        <div className="bg-white border-b-2 border-gray-100 px-3 py-2 sm:px-4 sm:py-4 md:px-6 md:py-6 lg:px-8 lg:py-8">
          {/* Desktop: Original Layout (lg: 1024px+) */}
          <div className="hidden lg:flex items-start justify-between flex-wrap" style={{ gap: '32px' }}>
            <h3 className="typography-h3 text-black font-bold flex-shrink-0">
              {service.name}
            </h3>
            <div className="flex flex-wrap gap-2 justify-end items-start">
              {service.hashtags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="typography-footnote whitespace-nowrap"
                >
                  <span className="text-primary">#</span>
                  <span style={{ color: '#1E1E1E' }}>{tag.substring(1)}</span>
                </span>
              ))}
            </div>
          </div>
          
          {/* Mobile/Tablet: Enhanced Layout - Hashtags hidden on mobile (< 1024px) */}
          <div className="lg:hidden">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black leading-tight">
              {service.name}
            </h3>
          </div>
        </div>

        {/* Content: Before/After Media - Gets Covered by Next Card */}
        <div className="bg-white px-2 py-2 sm:px-4 sm:py-4 md:px-6 md:py-6 lg:px-8 lg:py-8">
          {/* For single sample: Desktop side-by-side, Mobile/Tablet stacked */}
          {service.samples.length === 1 ? (
            <div 
              className="relative rounded-lg overflow-hidden border-[1px] lg:p-6"
              style={{
                borderColor: "#1E4783",
              }}
            >
              {/* Desktop: Side by side layout (lg: 1024px+) */}
              <div className="hidden lg:block">
                {/* Labels Row */}
                <div className="flex justify-between" style={{ marginBottom: '24px' }}>
                  <div 
                    className="text-white typography-footnote px-2 py-1 rounded"
                    style={{
                      backgroundColor: "#155DFC",
                      borderRadius: "4px",
                    }}
                  >
                    Before
                  </div>
                  <div 
                    className="text-white typography-footnote px-2 py-1 rounded"
                    style={{
                      backgroundColor: "#155DFC",
                      borderRadius: "4px",
                    }}
                  >
                    After
                  </div>
                </div>
                {/* Content Row - Side by side */}
                <div className="grid grid-cols-2" style={{ gap: '24px' }}>
                  {service.samples[0].before.type === "video" ? (
                    <video
                      src={service.samples[0].before.src}
                      className="w-full h-auto max-h-[650px] object-contain rounded"
                      style={{ border: '1px solid #0000004D' }}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                    >
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Image
                        src={service.samples[0].before.src}
                        alt={`${service.name} - Before`}
                        width={600}
                        height={400}
                        className="w-full h-auto max-h-[650px] object-contain rounded"
                        style={{ border: '1px solid #0000004D' }}
                        loading="lazy"
                        quality={100}
                        unoptimized
                      />
                    </div>
                  )}
                  
                  {service.samples[0].after.type === "video" ? (
                    <video
                      src={service.samples[0].after.src}
                      className="w-full h-auto max-h-[650px] object-contain rounded"
                      style={{ border: '1px solid #0000004D' }}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                    >
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Image
                        src={service.samples[0].after.src}
                        alt={`${service.name} - After`}
                        width={600}
                        height={400}
                        className="w-full h-auto max-h-[650px] object-contain rounded"
                        style={{ border: '1px solid #0000004D' }}
                        loading="lazy"
                        quality={100}
                        unoptimized
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile/Tablet: Enhanced Stacked layout with better UX (< 1024px) */}
              <div className="lg:hidden space-y-3 sm:space-y-6">
                {/* Before Section - Enhanced Design */}
                <motion.div 
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Before Label - Enhanced - Centered on mobile, reduced padding */}
                  <div className="mb-1.5 sm:mb-3 flex justify-center">
                    <div 
                      className="inline-flex items-center gap-1 px-2 py-1 sm:px-4 sm:py-2.5 md:px-5 md:py-3 rounded-lg shadow-sm"
                      style={{
                        backgroundColor: "#155DFC",
                        borderRadius: "8px",
                      }}
                    >
                      <span className="text-white text-xs sm:text-sm md:text-base font-semibold">
                        Before
                      </span>
                    </div>
                  </div>
                  {/* Before Content - Enhanced */}
                  <div className="w-full sm:rounded-xl overflow-hidden sm:shadow-lg sm:bg-gray-50">
                    {service.samples[0].before.type === "video" ? (
                      <video
                        src={service.samples[0].before.src}
                        className="w-full h-auto max-h-[600px] sm:max-h-[500px] sm:rounded-lg sm:border-2 sm:border-[#E5E7EB]"
                        style={{ 
                          objectFit: 'contain'
                        }}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                      >
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <Image
                        src={service.samples[0].before.src}
                        alt={`${service.name} - Before`}
                        width={600}
                        height={400}
                        className="w-full h-auto max-h-[600px] sm:max-h-[500px] sm:rounded-lg sm:border-2 sm:border-[#E5E7EB] sm:bg-white"
                        style={{ 
                          objectFit: 'contain'
                        }}
                        loading="lazy"
                        quality={100}
                        unoptimized
                      />
                    )}
                  </div>
                </motion.div>

                {/* Divider - Visual Separation */}
                <div className="flex items-center justify-center py-0.5 sm:py-1">
                  <div className="flex items-center gap-2 sm:gap-3 w-full max-w-xs">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary"></div>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                  </div>
                </div>

                {/* After Section - Enhanced Design */}
                <motion.div 
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                >
                  {/* After Label - Enhanced - Centered on mobile, reduced padding */}
                  <div className="mb-1.5 sm:mb-3 flex justify-center">
                    <div 
                      className="inline-flex items-center gap-1 px-2 py-1 sm:px-4 sm:py-2.5 md:px-5 md:py-3 rounded-lg shadow-sm"
                      style={{
                        backgroundColor: "#155DFC",
                        borderRadius: "8px",
                      }}
                    >
                      <span className="text-white text-xs sm:text-sm md:text-base font-semibold">
                        After
                      </span>
                    </div>
                  </div>
                  {/* After Content - Enhanced */}
                  <div className="w-full sm:rounded-xl overflow-hidden sm:shadow-lg sm:bg-gray-50">
                    {service.samples[0].after.type === "video" ? (
                      <video
                        src={service.samples[0].after.src}
                        className="w-full h-auto max-h-[600px] sm:max-h-[500px] sm:rounded-lg sm:border-2 sm:border-[#E5E7EB]"
                        style={{ 
                          objectFit: 'contain'
                        }}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                      >
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <Image
                        src={service.samples[0].after.src}
                        alt={`${service.name} - After`}
                        width={600}
                        height={400}
                        className="w-full h-auto max-h-[600px] sm:max-h-[500px] sm:rounded-lg sm:border-2 sm:border-[#E5E7EB] sm:bg-white"
                        style={{ 
                          objectFit: 'contain'
                        }}
                        loading="lazy"
                        quality={100}
                        unoptimized
                      />
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          ) : (
            /* For multiple samples: Desktop shows both sets, Mobile shows only first set */
            <>
              {/* Desktop: Show all samples - Side by side layout (lg: 1024px+) */}
              <div className="hidden lg:grid grid-cols-2" style={{ gap: '24px' }}>
                {service.samples.map((sample, sampleIndex) => (
                  <div 
                    key={sampleIndex} 
                    className="relative rounded-lg overflow-hidden border-[1px]"
                    style={{
                      borderColor: "#1E4783",
                      padding: '24px',
                    }}
                  >
                    {/* Labels Row */}
                    <div className="flex justify-between" style={{ marginBottom: '24px' }}>
                      <div 
                        className="text-white typography-footnote px-2 py-1 rounded"
                        style={{
                          backgroundColor: "#155DFC",
                          borderRadius: "4px",
                        }}
                      >
                        Before
                      </div>
                      <div 
                        className="text-white typography-footnote px-2 py-1 rounded"
                        style={{
                          backgroundColor: "#155DFC",
                          borderRadius: "4px",
                        }}
                      >
                        After
                      </div>
                    </div>

                    {/* Videos Row - Side by side on desktop */}
                    <div className="grid grid-cols-2" style={{ gap: '16px' }}>
                      {sample.before.type === "video" ? (
                        <video
                          src={sample.before.src}
                          className="w-full h-auto max-h-[650px] object-cover rounded"
                          style={{ border: '1px solid #0000004D' }}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="auto"
                        >
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <div className="flex items-center justify-center">
                          <Image
                            src={sample.before.src}
                            alt={`${service.name} - Sample ${sampleIndex + 1} - Before`}
                            width={600}
                            height={400}
                            className="w-full h-auto max-h-[650px] object-cover rounded"
                            style={{ border: '1px solid #0000004D' }}
                            loading="lazy"
                            quality={100}
                            unoptimized
                          />
                        </div>
                      )}
                      
                      {sample.after.type === "video" ? (
                        <video
                          src={sample.after.src}
                          className="w-full h-auto max-h-[650px] object-cover rounded"
                          style={{ border: '1px solid #0000004D' }}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="auto"
                        >
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <div className="flex items-center justify-center">
                          <Image
                            src={sample.after.src}
                            alt={`${service.name} - Sample ${sampleIndex + 1} - After`}
                            width={600}
                            height={400}
                            className="w-full h-auto max-h-[650px] object-center object-cover rounded"
                            style={{ border: '1px solid #0000004D' }}
                            loading="lazy"
                            quality={100}
                            unoptimized
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile/Tablet: Enhanced layout - Show only first set (< 1024px) */}
              <div className="lg:hidden">
                {service.samples.length > 0 && (
                  <div className="space-y-3 sm:space-y-6">
                    {/* Before Section - Enhanced */}
                    <motion.div 
                      className="relative"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {/* Before Label - Enhanced - Centered on mobile, reduced padding */}
                      <div className="mb-1.5 sm:mb-3 flex justify-center">
                        <div 
                          className="inline-flex items-center gap-1 px-2 py-1 sm:px-4 sm:py-2.5 md:px-5 md:py-3 rounded-lg shadow-sm"
                          style={{
                            backgroundColor: "#155DFC",
                            borderRadius: "8px",
                          }}
                        >
                          <span className="text-white text-xs sm:text-sm md:text-base font-semibold">
                            Before
                          </span>
                        </div>
                      </div>
                      {/* Before Content - Enhanced */}
                      <div className="w-full sm:rounded-xl overflow-hidden sm:shadow-lg sm:bg-gray-50">
                        {service.samples[0].before.type === "video" ? (
                          <video
                            src={service.samples[0].before.src}
                            className="w-full h-auto max-h-[600px] sm:max-h-[500px] sm:rounded-lg sm:border-2 sm:border-[#E5E7EB]"
                            style={{ 
                              objectFit: 'contain'
                            }}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="auto"
                          >
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <Image
                            src={service.samples[0].before.src}
                            alt={`${service.name} - Before`}
                            width={600}
                            height={400}
                            className="w-full h-auto max-h-[600px] sm:max-h-[500px] sm:rounded-lg sm:border-2 sm:border-[#E5E7EB] sm:bg-white"
                            style={{ 
                              objectFit: 'contain'
                            }}
                            loading="lazy"
                            quality={100}
                            unoptimized
                          />
                        )}
                      </div>
                    </motion.div>

                    {/* Divider - Visual Separation */}
                    <div className="flex items-center justify-center py-0.5 sm:py-1">
                      <div className="flex items-center gap-2 sm:gap-3 w-full max-w-xs">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary"></div>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                      </div>
                    </div>

                    {/* After Section - Enhanced */}
                    <motion.div 
                      className="relative"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                    >
                      {/* After Label - Enhanced - Centered on mobile, reduced padding */}
                      <div className="mb-1.5 sm:mb-3 flex justify-center">
                        <div 
                          className="inline-flex items-center gap-1 px-2 py-1 sm:px-4 sm:py-2.5 md:px-5 md:py-3 rounded-lg shadow-sm"
                          style={{
                            backgroundColor: "#155DFC",
                            borderRadius: "8px",
                          }}
                        >
                          <span className="text-white text-xs sm:text-sm md:text-base font-semibold">
                            After
                          </span>
                        </div>
                      </div>
                      {/* After Content - Enhanced */}
                      <div className="w-full sm:rounded-xl overflow-hidden sm:shadow-lg sm:bg-gray-50">
                        {service.samples[0].after.type === "video" ? (
                          <video
                            src={service.samples[0].after.src}
                            className="w-full h-auto max-h-[600px] sm:max-h-[500px] sm:rounded-lg sm:border-2 sm:border-[#E5E7EB]"
                            style={{ 
                              objectFit: 'contain'
                            }}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="auto"
                          >
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <Image
                            src={service.samples[0].after.src}
                            alt={`${service.name} - After`}
                            width={600}
                            height={400}
                            className="w-full h-auto max-h-[600px] sm:max-h-[500px] sm:rounded-lg sm:border-2 sm:border-[#E5E7EB] sm:bg-white"
                            style={{ 
                              objectFit: 'contain'
                            }}
                            loading="lazy"
                            quality={100}
                            unoptimized
                          />
                        )}
                      </div>
                    </motion.div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

StackedCard.displayName = 'StackedCard';

function StackedFolderCards({ services }: StackedFolderCardsProps) {
  return (
    <div id="work" className="relative w-full py-4 sm:py-8 md:py-12 px-2 sm:px-4 md:px-6 lg:px-12">
      {/* Desktop: Original stacked layout (lg: 1024px+) */}
      <div className="hidden lg:block relative space-y-32">
        {services.map((service, index) => (
          <StackedCard
            key={`${service.name}-${index}`}
            service={service}
            index={index}
            totalCards={services.length}
          />
        ))}
      </div>
      
      {/* Tablet: Optimized layout to use more screen space (md: 768px to lg: 1024px) */}
      <div className="hidden md:block lg:hidden">
        <div className="max-w-5xl mx-auto space-y-12">
          {services.map((service, index) => (
            <motion.div
              key={`${service.name}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.6, 
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.1 
              }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-primary/5 to-primary/10 px-6 py-5 border-b border-gray-200">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <h3 className="text-2xl font-bold text-black leading-tight">
                    {service.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {service.hashtags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-sm px-3 py-1.5 rounded-full bg-white/80 text-primary font-medium shadow-sm"
                      >
                        <span className="text-primary font-semibold">#</span>
                        <span className="text-gray-800">{tag.substring(1)}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Card Content - Side by side for tablet */}
              <div className="px-6 py-6">
                {service.samples.length === 1 ? (
                  <div className="space-y-6">
                    {/* Labels Row */}
                    <div className="flex justify-between">
                      <div 
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-lg shadow-sm"
                        style={{
                          backgroundColor: "#155DFC",
                          borderRadius: "8px",
                        }}
                      >
                        <span className="text-white text-base font-semibold">
                          Before
                        </span>
                      </div>
                      <div 
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-lg shadow-sm"
                        style={{
                          backgroundColor: "#155DFC",
                          borderRadius: "8px",
                        }}
                      >
                        <span className="text-white text-base font-semibold">
                          After
                        </span>
                      </div>
                    </div>
                    {/* Content Row - Side by side */}
                    <div className="grid grid-cols-2 gap-6">
                      {service.samples[0].before.type === "video" ? (
                        <video
                          src={service.samples[0].before.src}
                          className="w-full h-auto rounded-lg"
                          style={{ 
                            border: '2px solid #E5E7EB',
                            maxHeight: '600px',
                            objectFit: 'contain'
                          }}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="auto"
                        >
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <div className="flex items-center justify-center bg-white rounded-lg overflow-hidden">
                          <Image
                            src={service.samples[0].before.src}
                            alt={`${service.name} - Before`}
                            width={600}
                            height={400}
                            className="w-full h-auto rounded-lg"
                            style={{ 
                              border: '2px solid #E5E7EB',
                              maxHeight: '600px',
                              objectFit: 'contain'
                            }}
                            loading="lazy"
                            quality={100}
                            unoptimized
                          />
                        </div>
                      )}
                      
                      {service.samples[0].after.type === "video" ? (
                        <video
                          src={service.samples[0].after.src}
                          className="w-full h-auto rounded-lg"
                          style={{ 
                            border: '2px solid #E5E7EB',
                            maxHeight: '600px',
                            objectFit: 'contain'
                          }}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="auto"
                        >
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <div className="flex items-center justify-center bg-white rounded-lg overflow-hidden">
                          <Image
                            src={service.samples[0].after.src}
                            alt={`${service.name} - After`}
                            width={600}
                            height={400}
                            className="w-full h-auto rounded-lg"
                            style={{ 
                              border: '2px solid #E5E7EB',
                              maxHeight: '600px',
                              objectFit: 'contain'
                            }}
                            loading="lazy"
                            quality={100}
                            unoptimized
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-6">
                    {service.samples.map((sample, sampleIndex) => (
                      <div key={sampleIndex} className="space-y-4">
                        {/* Labels Row */}
                        <div className="flex justify-between">
                          <div 
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg shadow-sm"
                            style={{
                              backgroundColor: "#155DFC",
                              borderRadius: "8px",
                            }}
                          >
                            <span className="text-white text-sm font-semibold">
                              Before
                            </span>
                          </div>
                          <div 
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg shadow-sm"
                            style={{
                              backgroundColor: "#155DFC",
                              borderRadius: "8px",
                            }}
                          >
                            <span className="text-white text-sm font-semibold">
                              After
                            </span>
                          </div>
                        </div>
                        {/* Content - Side by side */}
                        <div className="grid grid-cols-2 gap-4">
                          {sample.before.type === "video" ? (
                            <video
                              src={sample.before.src}
                              className="w-full h-auto rounded-lg"
                              style={{ 
                                border: '2px solid #E5E7EB',
                                maxHeight: '500px',
                                objectFit: 'contain'
                              }}
                              autoPlay
                              muted
                              loop
                              playsInline
                              preload="auto"
                            >
                              Your browser does not support the video tag.
                            </video>
                          ) : (
                            <div className="flex items-center justify-center bg-white rounded-lg overflow-hidden">
                              <Image
                                src={sample.before.src}
                                alt={`${service.name} - Sample ${sampleIndex + 1} - Before`}
                                width={600}
                                height={400}
                                className="w-full h-auto rounded-lg"
                                style={{ 
                                  border: '2px solid #E5E7EB',
                                  maxHeight: '500px',
                                  objectFit: 'contain'
                                }}
                                loading="lazy"
                                quality={100}
                                unoptimized
                              />
                            </div>
                          )}
                          
                          {sample.after.type === "video" ? (
                            <video
                              src={sample.after.src}
                              className="w-full h-auto rounded-lg"
                              style={{ 
                                border: '2px solid #E5E7EB',
                                maxHeight: '500px',
                                objectFit: 'contain'
                              }}
                              autoPlay
                              muted
                              loop
                              playsInline
                              preload="auto"
                            >
                              Your browser does not support the video tag.
                            </video>
                          ) : (
                            <div className="flex items-center justify-center bg-white rounded-lg overflow-hidden">
                              <Image
                                src={sample.after.src}
                                alt={`${service.name} - Sample ${sampleIndex + 1} - After`}
                                width={600}
                                height={400}
                                className="w-full h-auto rounded-lg"
                                style={{ 
                                  border: '2px solid #E5E7EB',
                                  maxHeight: '500px',
                                  objectFit: 'contain'
                                }}
                                loading="lazy"
                                quality={100}
                                unoptimized
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Mobile: Enhanced carousel-like layout (< 768px) */}
      <div className="md:hidden space-y-8 sm:space-y-10">
        {services.map((service, index) => (
          <motion.div
            key={`${service.name}-${index}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              duration: 0.6, 
              ease: [0.22, 1, 0.36, 1],
              delay: index * 0.1 
            }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              {/* Card Header - Enhanced - Hashtags hidden on mobile */}
              <div className="bg-gradient-to-r from-primary/5 to-primary/10 px-4 py-4 sm:px-5 sm:py-5 border-b border-gray-200">
                <h3 className="text-xl sm:text-2xl font-bold text-black leading-tight">
                  {service.name}
                </h3>
              </div>
              
              {/* Card Content - Reuse the same content structure */}
              <div className="px-4 py-4 sm:px-5 sm:py-5">
                {service.samples.length === 1 ? (
                  <div className="space-y-6">
                    {/* Before Section */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="mb-3 flex justify-center">
                        <div 
                          className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg shadow-sm"
                          style={{
                            backgroundColor: "#155DFC",
                            borderRadius: "8px",
                          }}
                        >
                          <span className="text-white text-sm sm:text-base font-semibold">
                            Before
                          </span>
                        </div>
                      </div>
                      <div className="w-full rounded-xl overflow-hidden shadow-lg bg-gray-50 p-2 sm:p-3">
                        {service.samples[0].before.type === "video" ? (
                          <video
                            src={service.samples[0].before.src}
                            className="w-full h-auto rounded-lg"
                            style={{ 
                              border: '2px solid #E5E7EB',
                              maxHeight: '500px',
                              objectFit: 'contain'
                            }}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="auto"
                          >
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <div className="flex items-center justify-center bg-white rounded-lg overflow-hidden">
                            <Image
                              src={service.samples[0].before.src}
                              alt={`${service.name} - Before`}
                              width={600}
                              height={400}
                              className="w-full h-auto rounded-lg"
                              style={{ 
                                border: '2px solid #E5E7EB',
                                maxHeight: '500px',
                                objectFit: 'contain'
                              }}
                              loading="lazy"
                              quality={100}
                              unoptimized
                            />
                          </div>
                        )}
                      </div>
                    </motion.div>

                    {/* Divider */}
                    <div className="flex items-center justify-center py-1">
                      <div className="flex items-center gap-3 w-full max-w-xs">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                      </div>
                    </div>

                    {/* After Section */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <div className="mb-3 flex justify-center">
                        <div 
                          className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg shadow-sm"
                          style={{
                            backgroundColor: "#155DFC",
                            borderRadius: "8px",
                          }}
                        >
                          <span className="text-white text-sm sm:text-base font-semibold">
                            After
                          </span>
                        </div>
                      </div>
                      <div className="w-full rounded-xl overflow-hidden shadow-lg bg-gray-50 p-2 sm:p-3">
                        {service.samples[0].after.type === "video" ? (
                          <video
                            src={service.samples[0].after.src}
                            className="w-full h-auto rounded-lg"
                            style={{ 
                              border: '2px solid #E5E7EB',
                              maxHeight: '500px',
                              objectFit: 'contain'
                            }}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="auto"
                          >
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <div className="flex items-center justify-center bg-white rounded-lg overflow-hidden">
                            <Image
                              src={service.samples[0].after.src}
                              alt={`${service.name} - After`}
                              width={600}
                              height={400}
                              className="w-full h-auto rounded-lg"
                              style={{ 
                                border: '2px solid #E5E7EB',
                                maxHeight: '500px',
                                objectFit: 'contain'
                              }}
                              loading="lazy"
                              quality={100}
                              unoptimized
                            />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Show only first set for mobile */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="mb-3 flex justify-center">
                        <div 
                          className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg shadow-sm"
                          style={{
                            backgroundColor: "#155DFC",
                            borderRadius: "8px",
                          }}
                        >
                          <span className="text-white text-sm sm:text-base font-semibold">
                            Before
                          </span>
                        </div>
                      </div>
                      <div className="w-full rounded-xl overflow-hidden shadow-lg bg-gray-50 p-2 sm:p-3">
                        {service.samples[0].before.type === "video" ? (
                          <video
                            src={service.samples[0].before.src}
                            className="w-full h-auto rounded-lg"
                            style={{ 
                              border: '2px solid #E5E7EB',
                              maxHeight: '500px',
                              objectFit: 'contain'
                            }}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="auto"
                          >
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <div className="flex items-center justify-center bg-white rounded-lg overflow-hidden">
                            <Image
                              src={service.samples[0].before.src}
                              alt={`${service.name} - Before`}
                              width={600}
                              height={400}
                              className="w-full h-auto rounded-lg"
                              style={{ 
                                border: '2px solid #E5E7EB',
                                maxHeight: '500px',
                                objectFit: 'contain'
                              }}
                              loading="lazy"
                              quality={100}
                              unoptimized
                            />
                          </div>
                        )}
                      </div>
                    </motion.div>

                    {/* Divider */}
                    <div className="flex items-center justify-center py-1">
                      <div className="flex items-center gap-3 w-full max-w-xs">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                      </div>
                    </div>

                    {/* After Section */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <div className="mb-3 flex justify-center">
                        <div 
                          className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg shadow-sm"
                          style={{
                            backgroundColor: "#155DFC",
                            borderRadius: "8px",
                          }}
                        >
                          <span className="text-white text-sm sm:text-base font-semibold">
                            After
                          </span>
                        </div>
                      </div>
                      <div className="w-full rounded-xl overflow-hidden shadow-lg bg-gray-50 p-2 sm:p-3">
                        {service.samples[0].after.type === "video" ? (
                          <video
                            src={service.samples[0].after.src}
                            className="w-full h-auto rounded-lg"
                            style={{ 
                              border: '2px solid #E5E7EB',
                              maxHeight: '500px',
                              objectFit: 'contain'
                            }}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="auto"
                          >
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <div className="flex items-center justify-center bg-white rounded-lg overflow-hidden">
                            <Image
                              src={service.samples[0].after.src}
                              alt={`${service.name} - After`}
                              width={600}
                              height={400}
                              className="w-full h-auto rounded-lg"
                              style={{ 
                                border: '2px solid #E5E7EB',
                                maxHeight: '500px',
                                objectFit: 'contain'
                              }}
                              loading="lazy"
                              quality={100}
                              unoptimized
                            />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}


