"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const essentialFeatures = [
  {
    title: "Weekly content posts (3-4)",
    description: "3-4 posts per week (therapy tips, educational content, before/after recovery posts, and conference photos)"
  },
  {
    title: "Community Management",
    description: "Manage paid ads (Facebook/Instagram) to drive more patient leads, growth, and visibility"
  },
  {
    title: "Brand Development",
    description: "Simple visual identity with branded templates, colors, and fonts consistency"
  },
  {
    title: "Video Editing",
    description: "Basic editing for client-provided videos (before/after recovery or conference videos)"
  },
  {
    title: "Analytics & Reporting",
    description: "Monthly performance tracking with basic insights on engagement, reach, and growth"
  },
  {
    title: "Social Media Strategy",
    description: "Platform-specific strategy for up to 2 platforms (Instagram, Facebook, LinkedIn)"
  },
];

const proFeatures = [
  {
    title: "Weekly content posts (5-6)",
    description: "5-6 posts per week, including patient success stories, conference posts, and weekly video content"
  },
  {
    title: "Community Management",
    description: "Full 24/7 response management (comments, messages, reviews, live Q&A, polls, interactive content)"
  },
  {
    title: "Brand Development",
    description: "Full brand identity (logo design, visual identity, brand voice development, custom social media templates)"
  },
  {
    title: "Video Editing",
    description: "Professional video editing for before/after recovery videos and educational content"
  },
  {
    title: "Analytics & Reporting",
    description: "Weekly performance tracking with detailed ROI analysis, growth insights, and recommendations"
  },
  {
    title: "Social Media Strategy",
    description: "Advanced strategy for up to 3 platforms (Instagram, Facebook, LinkedIn, YouTube)"
  },
  {
    title: "Local SEO & Google My Business",
    description: "Google My Business setup and optimization. Local SEO for better search visibility. Review management"
  },
  {
    title: "Paid Advertising (Optional)",
    description: "Manage paid ads (Facebook/Instagram) to drive more patient leads and growth"
  },
];

export default function PackagesSection() {
  const [activeTab, setActiveTab] = useState(0); // 0 for Essential, 1 for Pro
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isJsEnabled, setIsJsEnabled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsJsEnabled(true);
  }, []);

  // Minimum swipe distance
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && activeTab === 0) {
      setActiveTab(1);
    }
    if (isRightSwipe && activeTab === 1) {
      setActiveTab(0);
    }
  };

  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const isCardsInView = useInView(cardsRef, { once: true, margin: "-50px" });

  return (
    <section id="packages" className="bg-white py-12 sm:py-16 lg:py-24">
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
            Our Social Media Package for Occupational Therapists
          </h2>
          <p className="typography-p1 text-black/80  mx-auto">
            We offer two tailored packages to help you strengthen your online presence and engage with patients effectively, consistently.
          </p>
        </motion.div>

        {/* Package Cards */}
        <div className="max-w-3xl md:max-w-xl lg:max-w-5xl mx-auto">
          {/* Mobile: Fallback - Show both packages when JS is disabled */}
          {!isJsEnabled && (
            <div className="md:hidden space-y-6">
              {/* Essential Package */}
              <div className="px-4">
                <div className="flex flex-col bg-white border-[1px] border-black/50 rounded-xl overflow-hidden">
                  <div className="p-6 pb-0">
                    <h3 className="typography-h3 text-black mb-4 text-center">Essential</h3>
                    <div className="w-full h-[1px] bg-black mb-6"></div>
                    <h4 className="typography-h3 text-black mb-4">Package Includes:</h4>
                    <ul className="space-y-4">
                      {essentialFeatures.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <svg
                            className="w-5 h-5 text-primary flex-shrink-0 mt-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <div className="flex-1 min-w-0">
                            <p className="typography-p2 text-black break-words" style={{ fontWeight: 'bold' }}>{feature.title}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-t-[1px] border-black/50">
                    <a 
                      href="https://wa.me/8861078009"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-white text-black border-none typography-btn1 py-4 rounded-b-xl hover:opacity-90 transition-opacity font-bold block text-center"
                    >
                      CONNECT WITH AN EXPERT
                    </a>
                  </div>
                </div>
              </div>
              {/* Pro Package */}
              <div className="px-4">
                <div className="relative flex flex-col">
                  <div className="flex flex-col bg-primary/10 border-2 border-primary rounded-xl overflow-hidden">
                    <div className="p-6 pb-0">
                      <h3 className="typography-h3 text-primary mb-4 text-center">Pro</h3>
                      <div className="w-full h-[2px] bg-primary mb-6"></div>
                      <h4 className="typography-h3 text-primary mb-4">Package Includes:</h4>
                      <ul className="space-y-4">
                        {proFeatures.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <svg
                              className="w-5 h-5 text-primary flex-shrink-0 mt-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <div>
                              <p className="typography-p2 text-black" style={{ fontWeight: 'bold' }}>{feature.title}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="border-t border-primary/70">
                      <a 
                        href="https://wa.me/8861078009"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-primary text-white border-none typography-btn1 py-4 rounded-b hover:opacity-90 transition-opacity font-bold block text-center"
                      >
                        CONNECT WITH AN EXPERT
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mobile: Tab Interface - Only show when JS is enabled */}
          {isJsEnabled && (
            <div className="md:hidden mb-6 flex justify-center px-4">
              <div className="bg-primary/10 rounded-full p-1 inline-flex w-full max-w-sm">
                <button
                  onClick={() => setActiveTab(0)}
                  className={`flex-1 px-4 sm:px-6 py-2.5 rounded-full typography-p2 font-bold transition-all text-sm sm:text-base ${
                    activeTab === 0
                      ? "bg-white text-black shadow-sm"
                      : "text-black/70"
                  }`}
                >
                  Essential
                </button>
                <button
                  onClick={() => setActiveTab(1)}
                  className={`flex-1 px-4 sm:px-6 py-2.5 rounded-full typography-p2 font-bold transition-all text-sm sm:text-base ${
                    activeTab === 1
                      ? "bg-white text-black shadow-sm"
                      : "text-black/70"
                  }`}
                >
                  Pro
                </button>
              </div>
            </div>
          )}

          {/* Mobile: Carousel Cards - Only show when JS is enabled */}
          {isJsEnabled && (
            <div 
              className="md:hidden relative overflow-hidden"
              ref={containerRef}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${activeTab * 100}%)` }}>
              {/* Essential Package - Mobile */}
              <div className="min-w-full flex-shrink-0 px-4">
                <div className="flex flex-col bg-white border-[1px] border-black/50 rounded-xl overflow-hidden">
                  <div className="p-6 pb-0">
                    <h3 className="typography-h3 text-black mb-4 text-center">Essential</h3>
                    <div className="w-full h-[1px] bg-black mb-6"></div>
                    <h4 className="typography-h3 text-black mb-4">Package Includes:</h4>
                    <ul className="space-y-4">
                      {essentialFeatures.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <svg
                            className="w-5 h-5 text-primary flex-shrink-0 mt-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <div className="flex-1 min-w-0">
                            <p className="typography-p2 text-black break-words" style={{ fontWeight: 'bold' }}>{feature.title}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-t-[1px] border-black/50">
                    <a 
                      href="https://wa.me/8861078009"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-white text-black border-none typography-btn1 py-4 rounded-b-xl hover:opacity-90 transition-opacity font-bold block text-center"
                    >
                      CONNECT WITH AN EXPERT
                    </a>
                  </div>
                </div>
              </div>

              {/* Pro Package - Mobile */}
              <div className="min-w-full flex-shrink-0 px-4">
                <div className="relative flex flex-col">
                  <div className="flex flex-col bg-primary/10 border-[1px] border-primary rounded-xl overflow-hidden">
                    <div className="p-6 pb-0">
                      <h3 className="typography-h3 text-primary mb-4 text-center">Pro</h3>
                      <div className="w-full h-[1px] bg-primary mb-6"></div>
                      <h4 className="typography-h3 text-primary mb-4">Package Includes:</h4>
                      <ul className="space-y-4">
                        {proFeatures.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <svg
                              className="w-5 h-5 text-primary flex-shrink-0 mt-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <div>
                              <p className="typography-p2 text-black" style={{ fontWeight: 'bold' }}>{feature.title}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="border-t-[1px] border-primary/70">
                      <a 
                        href="https://wa.me/8861078009"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-primary text-white border-none typography-btn1 py-4 rounded-b hover:opacity-90 transition-opacity font-bold block text-center"
                      >
                        CONNECT WITH AN EXPERT
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          )}

          {/* Mobile: Carousel Dots - Only show when JS is enabled */}
          {isJsEnabled && (
            <div className="md:hidden flex justify-center gap-2 mt-6">
              <button
                onClick={() => setActiveTab(0)}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeTab === 0 ? "bg-primary w-6" : "bg-gray-300"
                }`}
                aria-label="Essential package"
              />
              <button
                onClick={() => setActiveTab(1)}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeTab === 1 ? "bg-primary w-6" : "bg-gray-300"
                }`}
                aria-label="Pro package"
              />
            </div>
          )}

          {/* Desktop: Original Layout */}
          <motion.div 
            ref={cardsRef}
            initial="hidden"
            animate={isCardsInView ? "visible" : "hidden"}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
            className="hidden md:flex flex-col gap-8 lg:flex-row lg:gap-12 lg:items-start"
          >
            {/* Essential Package */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col bg-white border-[1px] border-black/50 rounded-xl hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className="p-8 lg:p-10 pb-0">
                <h3 className="typography-h3 text-black mb-2 text-center">Essential</h3>
                <p className="typography-p2 text-black/70 mb-6 text-center">
                  For therapists starting or maintaining an online presence.
                </p>
                <div className="w-full h-[1px] bg-black mb-6"></div>
                <h4 className="typography-h3 text-black mb-6">Package Includes:</h4>
                <ul className="space-y-6">
                  {essentialFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-primary flex-shrink-0 mt-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <div>
                        <p className="typography-p2 text-black mb-1" style={{ fontWeight: 'bold' }}>{feature.title}</p>
                        <p className="typography-p2 text-black/70">{feature.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t-[1px] border-black/50">
                <a 
                  href="https://wa.me/8861078009"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white text-black border-none typography-btn1 py-4 rounded-b-xl hover:opacity-90 transition-opacity font-bold block text-center"
                >
                  CONNECT WITH AN EXPERT
                </a>
              </div>
            </motion.div>

            {/* Pro Package */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col"
            >
              <div 
                className="absolute bg-primary text-white typography-footnote px-6 py-2 font-bold whitespace-nowrap z-10"
                style={{ 
                  top: '-20px',
                  right: '40px',
                  borderRadius: '100px',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
                }}
              >
                Most Popular
              </div>
              <div className="flex flex-col bg-primary/10 border-[1px] border-primary rounded-xl hover:shadow-lg transition-shadow overflow-hidden">
                <div className="p-8 lg:p-10 pb-0">
                  <h3 className="typography-h3 text-primary mb-2 text-center">Pro</h3>
                  <p className="typography-p2 text-black/70 mb-6 text-center">
                    For therapists ready to grow visibility and patient enquiries.
                  </p>
                  <div className="w-full h-[1px] bg-primary mb-6"></div>
                  <h4 className="typography-h3 text-primary mb-6">Package Includes:</h4>
                  <ul className="space-y-6">
                    {proFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <svg
                          className="w-5 h-5 text-primary flex-shrink-0 mt-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <div>
                          <p className="typography-p2 text-black mb-1" style={{ fontWeight: 'bold' }}>{feature.title}</p>
                          <p className="typography-p2 text-black/70">{feature.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t-[1px] border-primary/70">
                  <a 
                    href="https://wa.me/8861078009"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-primary text-white border-none typography-btn1 py-4 rounded-b hover:opacity-90 transition-opacity font-bold block text-center"
                  >
                    CONNECT WITH AN EXPERT
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

