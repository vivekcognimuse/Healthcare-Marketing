"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const features = [
  {
    icon: "/icons/whySection/heart.svg",
    title: "Healthcare-Focused Expertise",
    position: "center",
  },
  {
    icon: "/icons/whySection/support.svg",
    title: "Dedicated Support",
    position: "top-right",
  },
  {
    icon: "/icons/whySection/growth.svg",
    title: "Measurable Growth",
    position: "bottom-right",
  },
  {
    icon: "/icons/whySection/compliance.svg",
    title: "Compliance-Focused",
    position: "top-left",
  },
  {
    icon: "/icons/whySection/patient.svg",
    title: "Patient-Centered",
    position: "bottom-left",
  },
];

export default function WhyChooseSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
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

    if (isLeftSwipe && currentIndex < features.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="expertise" className="bg-white py-12 sm:py-16 lg:py-24">
      <div className="container">
        {/* Header */}
        <motion.div 
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16"
        >
          <h2 className="typography-h2 text-black mb-3 sm:mb-4 md:mb-5 px-4 md:px-0">
            Why Choose CogniMuse
          </h2>
          <p className="typography-p1 text-black/80 mx-auto max-w-2xl md:max-w-3xl px-4 md:px-6 lg:px-0">
            We understand occupational therapy marketing challenges and communicate your expertise compliantly to patients.
          </p>
        </motion.div>

        {/* Mobile: Carousel */}
        <div className="md:hidden relative max-w-sm mx-auto">
          {/* Fallback: Show all features when JS is disabled */}
          {!isJsEnabled && (
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="px-4">
                  <div className="bg-[#E8E8E8] rounded-xl p-8 text-center">
                    <div className="mb-4">
                      <Image
                        src={feature.icon}
                        alt={feature.title}
                        width={64}
                        height={64}
                        className="w-16 h-16 mx-auto"
                      />
                    </div>
                    <h3 className="typography-h3 text-black">{feature.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Enhanced: Carousel when JS is enabled */}
          {isJsEnabled && (
            <>
              <div 
                className="relative overflow-hidden"
                ref={containerRef}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <div 
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {features.map((feature, index) => (
                    <div key={index} className="min-w-full flex-shrink-0 px-4">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="bg-[#E8E8E8] rounded-xl p-8 text-center"
                      >
                        <div className="mb-4">
                          <Image
                            src={feature.icon}
                            alt={feature.title}
                            width={64}
                            height={64}
                            className="w-16 h-16 mx-auto"
                          />
                        </div>
                        <h3 className="typography-h3 text-black">{feature.title}</h3>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Pagination Dots */}
              <div className="flex justify-center gap-2 mt-6">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentIndex === index ? "bg-primary w-6" : "bg-gray-300"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Tablet: Enhanced Grid Layout (md: 768px to lg: 1024px) */}
        <div className="hidden md:block lg:hidden relative max-w-4xl mx-auto">
          <div className="grid grid-cols-2 gap-6">
            {features.filter(f => f.title !== "Patient-Centered").map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.5, 
                  ease: [0.22, 1, 0.36, 1],
                  delay: index * 0.1 
                }}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                className="group"
              >
                <div className="bg-[#E8E8E8] rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary/20">
                  <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    <div className="relative">
                      <Image
                        src={feature.icon}
                        alt={feature.title}
                        width={72}
                        height={72}
                        className="w-[72px] h-[72px] mx-auto"
                      />
                      <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                  <h3 className="typography-h3 text-black group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                </div>
              </motion.div>
            ))}
            {/* Special Card: Patient-Centered with Text Box */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.5, 
                ease: [0.22, 1, 0.36, 1],
                delay: 0.5 
              }}
              className="col-span-2"
            >
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border-2 border-primary/20 shadow-lg">
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                  <div className="bg-[#E8E8E8] rounded-xl p-6 text-center flex-shrink-0">
                    <div className="mb-4">
                      <Image
                        src="/icons/whySection/patient.svg"
                        alt="Patient-Centered"
                        width={56}
                        height={56}
                        className="w-14 h-14 mx-auto"
                      />
                    </div>
                    <h3 className="typography-h3 text-black">Patient-Centered</h3>
                  </div>
                  <span className="text-primary text-3xl font-bold">+</span>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 flex-1 text-center md:text-right">
                    <p className="typography-p2 text-black/70">
                      Your care makes a difference—we connect you with patients who need it.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Desktop: Features Grid (lg: 1024px+) */}
        <div className="hidden lg:block relative max-w-5xl mx-auto">
          <div className="grid grid-cols-3 gap-6 lg:gap-8">
            {/* Top Left - Compliance-Focused (bottom-aligned to Healthcare) */}
            <div style={{ marginTop: '80px' }} className="flex flex-col justify-end">
              <div className="bg-[#E8E8E8] rounded-xl p-6 lg:p-8 text-center mx-auto" style={{ maxWidth: '240px' }}>
                <div className="mb-4">
                  <Image
                    src="/icons/whySection/compliance.svg"
                    alt="Compliance-Focused"
                    width={48}
                    height={48}
                    className="w-12 h-12 mx-auto"
                  />
                </div>
                <h3 className="typography-h3 text-black">Compliance-Focused</h3>
              </div>
            </div>

            {/* Center - Healthcare Focused (Large, spans 2 rows) */}
            <div className="lg:row-span-2 bg-[#E8E8E8] rounded-xl p-8 lg:p-12 text-center flex flex-col items-center justify-center">
              <div className="mb-4">
                <Image
                  src="/icons/whySection/heart.svg"
                  alt="Healthcare-Focused Expertise"
                  width={64}
                  height={64}
                  className="w-16 h-16"
                />
              </div>
              <h3 className="typography-h3 text-black">Healthcare-Focused Expertise</h3>
            </div>

            {/* Top Right - Dedicated Support (shifted up, reduced width) */}
            <div style={{ marginTop: '-40px', marginLeft: '-40px' }}>
              <div className="bg-[#E8E8E8] rounded-xl p-6 lg:p-8 text-center mx-auto" style={{ maxWidth: '240px' }}>
                <div className="mb-4">
                  <Image
                    src="/icons/whySection/support.svg"
                    alt="Dedicated Support"
                    width={48}
                    height={48}
                    className="w-12 h-12 mx-auto"
                  />
                </div>
                <h3 className="typography-h3 text-black">Dedicated Support</h3>
              </div>
            </div>

            {/* Bottom Left - Patient-Centred with Plus and Text Box (reduced width) */}
            <div className="lg:col-span-2 flex flex-col sm:flex-row items-start sm:items-center gap-12">
              <div className="bg-[#E8E8E8] rounded-xl p-6 lg:p-8 text-center" style={{ maxWidth: '200px' }}>
                <div className="mb-4">
                  <Image
                    src="/icons/whySection/patient.svg"
                    alt="Patient-Centred"
                    width={48}
                    height={48}
                    className="w-12 h-12 mx-auto"
                  />
                </div>
                <h3 className="typography-h3 text-black">Patient-Centred</h3>
              </div>
              <span className="text-black text-2xl font-bold self-right">+</span>
              <div className="bg-[#155DFC0D] rounded-xl p-4 text-right lg:p-6 flex-1 max-w-[350px]">
                <p className="typography-p2 text-black/70">
                  Your care makes a difference—we connect you with patients who need it.
                </p>
              </div>
            </div>

            {/* Bottom Right - Measurable Growth (shifted up more) */}
            <div style={{ marginTop: '-120px' }}>
              <div className="bg-[#E8E8E8] rounded-xl p-6 lg:p-8 text-center mx-auto" style={{ maxWidth: '290px' }}>
                <div className="mb-4">
                  <Image
                    src="/icons/whySection/growth.svg"
                    alt="Measurable Growth"
                    width={48}
                    height={48}
                    className="w-12 h-12 mx-auto"
                  />
                </div>
                <h3 className="typography-h3 text-black">Measurable Growth</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

