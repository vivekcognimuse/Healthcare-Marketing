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
  return (
    <section id="services" className="bg-white py-12 sm:py-16 lg:py-24">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="typography-h2 text-black mb-4">
            Content That Connects & Converts
          </h2>
          <p className="typography-p1 text-black/80  mx-auto">
            Specialized social media content creation services designed specifically for the healthcare industry.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16">
          {services.map((service, index) => (
            <div
              key={index}
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
            </div>
          ))}
        </div>
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
        {/* Header: Service Name (Left) and Hashtags (Right) - Always Visible */}
        <div className="bg-white border-b-2 border-gray-100" style={{ padding: '32px' }}>
          <div className="flex items-start justify-between flex-wrap" style={{ gap: '32px' }}>
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
        </div>

        {/* Content: Before/After Media - Gets Covered by Next Card */}
        <div className="bg-white" style={{ padding: '32px' }}>
          {/* For single sample: Before/After with labels at top */}
          {service.samples.length === 1 ? (
            <div 
              className="relative rounded-lg overflow-hidden border-2"
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

              {/* Videos/Images Row */}
              <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '24px' }}>
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
          ) : (
            /* For multiple samples: 2 sets side by side on desktop, stacked vertically on mobile */
            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '24px' }}>
              {service.samples.map((sample, sampleIndex) => (
                <div 
                  key={sampleIndex} 
                  className="relative rounded-lg overflow-hidden border-2"
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

                  {/* Videos Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: '16px' }}>
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
    <div id="work" className="relative w-full py-12 px-4 md:px-8 lg:px-12">
      <div className="relative space-y-32">
        {services.map((service, index) => (
          <StackedCard
            key={`${service.name}-${index}`}
            service={service}
            index={index}
            totalCards={services.length}
          />
        ))}
      </div>
    </div>
  );
}


