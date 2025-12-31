"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Ananya R.,",
    role: "Occupational Therapist",
    image: "/testimonials/ananya.png",
    quote: "Working with Muse Marketing has transformed our online presence. We've seen a significant increase in patient inquiries and our brand now truly reflects our values.",
    rating: 5,
  },
  {
    name: "Matthew.,",
    role: "Occupational Therapist",
    image: "/testimonials/matthew.png",
    quote: "What I appreciated most was their ethical and patient-focused approach. Everything felt professional and compliant.",
    rating: 5,
  },
  {
    name: "Eliza M.,",
    role: "Rehabilitation Therapist",
    image: "/testimonials/eliza.png",
    quote: "From content to engagement, they handled everything smoothly. It allowed me to focus more on my patients.",
    rating: 5,
  },
  {
    name: "Mr. Rahul",
    role: "Pedriatric OT",
    image: "/testimonials/mr-rahul.png",
    quote: "Muse Marketing helped us get more patient leads and made us stand out locally. Their support and creativity have been outstanding.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isJsEnabled, setIsJsEnabled] = useState(false);

  useEffect(() => {
    setIsJsEnabled(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => {
      const step = isMobile ? 1 : 2;
      const maxIndex = isMobile 
        ? testimonials.length - 1 
        : Math.max(0, testimonials.length - 2);
      return prev + step > maxIndex ? 0 : prev + step;
    });
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => {
      const step = isMobile ? 1 : 2;
      const maxIndex = isMobile 
        ? testimonials.length - 1 
        : Math.max(0, testimonials.length - 2);
      return prev - step < 0 ? maxIndex : prev - step;
    });
  };

  // Get testimonials to display (1 on mobile, 2 on desktop)
  const getVisibleTestimonials = () => {
    const visible: typeof testimonials = [];
    if (testimonials[currentIndex]) {
      visible.push(testimonials[currentIndex]);
    }
    // Only add second card on desktop
    if (!isMobile && testimonials[currentIndex + 1]) {
      visible.push(testimonials[currentIndex + 1]);
    }
    return visible;
  };

  return (
    <section id="testimonials" className="bg-white py-12 sm:py-16 lg:py-24">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="typography-h2 text-black mb-4">
            Trusted by Healthcare Professionals
          </h2>
          <p className="typography-p1 text-black/80 max-w-3xl mx-auto">
            Real experiences from therapists who partnered with us to strengthen their online presence and patient trust.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Navigation Arrows - Outside Cards Container */}
          {(isMobile ? testimonials.length > 1 : testimonials.length > 2) && (
            <>
              <motion.button
                onClick={prevTestimonial}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 md:-translate-x-16 lg:-translate-x-20 bg-black text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center z-10"
                aria-label="Previous testimonial"
                whileHover={{ scale: 1.1, backgroundColor: "#155DFC" }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  whileHover={{ x: -2 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </motion.svg>
              </motion.button>
              <motion.button
                onClick={nextTestimonial}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 md:translate-x-16 lg:translate-x-20 bg-black text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center z-10"
                aria-label="Next testimonial"
                whileHover={{ scale: 1.1, backgroundColor: "#155DFC" }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  whileHover={{ x: 2 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </motion.svg>
              </motion.button>
            </>
          )}

          {/* Cards Container */}
          <div className="max-w-sm md:max-w-6xl mx-auto px-4 md:px-0">
            {/* Fallback: Show all testimonials when JS is disabled */}
            {!isJsEnabled && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 lg:p-8 border border-gray-200"
                  >
                    {/* Mobile Layout */}
                    <div className="md:hidden">
                      <p className="typography-p2 text-black/70 italic mb-4">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                      <div className="border-b border-gray-200 mb-4"></div>
                      <div className="mb-4">
                        <h3 className="typography-h3 text-black font-bold">{testimonial.name}</h3>
                        <p className="typography-footnote text-black/70">{testimonial.role}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            width={60}
                            height={60}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="typography-footnote text-black/70 mb-1">Rating</span>
                          <div className="flex gap-1">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <svg
                                key={i}
                                className="w-5 h-5 text-yellow-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Desktop Layout */}
                    <div className="hidden md:block">
                      <div className="flex gap-4 mb-4 pb-4 border-b border-gray-200">
                        <div className="flex-shrink-0">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            width={120}
                            height={120}
                            className="w-24 h-24 rounded-lg object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="typography-p2 text-black/70 italic">
                            &ldquo;{testimonial.quote}&rdquo;
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="typography-h3 text-black font-bold">{testimonial.name}</h3>
                          <p className="typography-footnote text-black/70">{testimonial.role}</p>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="typography-footnote text-black/70 mb-1">Rating</span>
                          <div className="flex gap-1">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <svg
                                key={i}
                                className="w-5 h-5 text-yellow-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Enhanced: Carousel when JS is enabled */}
            {isJsEnabled && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                <AnimatePresence mode="wait">
                  {getVisibleTestimonials().map((testimonial, index) => (
                  <motion.div
                    key={`${currentIndex}-${index}`}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.1,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="bg-white rounded-xl p-6 lg:p-8 border border-gray-200"
                  >
                    {/* Mobile Layout: Quote at top, then author info, then image and rating */}
                    <div className="md:hidden">
                      {/* Quote Section */}
                      <motion.p 
                        className="typography-p2 text-black/70 italic mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                      >
                        &ldquo;{testimonial.quote}&rdquo;
                      </motion.p>
                      
                      {/* Separator */}
                      <div className="border-b border-gray-200 mb-4"></div>
                      
                      {/* Author Name and Title */}
                      <motion.div 
                        className="mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.25 + index * 0.1 }}
                      >
                        <h3 className="typography-h3 text-black font-bold">{testimonial.name}</h3>
                        <p className="typography-footnote text-black/70">{testimonial.role}</p>
                      </motion.div>
                      
                      {/* Profile Picture and Rating */}
                      <motion.div 
                        className="flex items-center gap-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        <div className="flex-shrink-0">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            width={60}
                            height={60}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="typography-footnote text-black/70 mb-1">Rating</span>
                          <div className="flex gap-1">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <motion.svg
                                key={i}
                                className="w-5 h-5 text-yellow-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ 
                                  delay: 0.35 + index * 0.1 + i * 0.05,
                                  type: "spring",
                                  stiffness: 200,
                                  damping: 10
                                }}
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </motion.svg>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Desktop Layout: Image Left, Quote Right */}
                    <div className="hidden md:block">
                      <motion.div 
                        className="flex gap-4 mb-4 pb-4 border-b border-gray-200"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                      >
                        <div className="flex-shrink-0">
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                          >
                            <Image
                              src={testimonial.image}
                              alt={testimonial.name}
                              width={120}
                              height={120}
                              className="w-24 h-24 rounded-lg object-cover"
                            />
                          </motion.div>
                        </div>
                        <div className="flex-1">
                          <motion.p 
                            className="typography-p2 text-black/70 italic"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.25 + index * 0.1 }}
                          >
                            &ldquo;{testimonial.quote}&rdquo;
                          </motion.p>
                        </div>
                      </motion.div>

                      {/* Bottom Section: Name & Role Left, Rating Right */}
                      <motion.div 
                        className="flex items-center justify-between"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.35 + index * 0.1 }}
                      >
                        <div>
                          <h3 className="typography-h3 text-black font-bold">{testimonial.name}</h3>
                          <p className="typography-footnote text-black/70">{testimonial.role}</p>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="typography-footnote text-black/70 mb-1">Rating</span>
                          <div className="flex gap-1">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <motion.svg
                                key={i}
                                className="w-5 h-5 text-yellow-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ 
                                  delay: 0.4 + index * 0.1 + i * 0.05,
                                  type: "spring",
                                  stiffness: 200,
                                  damping: 10
                                }}
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </motion.svg>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

