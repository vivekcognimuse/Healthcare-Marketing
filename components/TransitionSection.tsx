"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

export default function TransitionSection() {
  const words = [
    "patient-centered",
    "care-driven",
    "health-conscious",
    "service-driven",
    "wellness-oriented"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [displayWord, setDisplayWord] = useState(words[0]);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentIndex((prev) => {
          const next = (prev + 1) % words.length;
          setDisplayWord(words[next]);
          return next;
        });
        setIsFlipping(false);
      }, 300); // Half of transition duration
    }, 3000); // Change word every 3 seconds

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section ref={sectionRef} className="bg-white py-8 sm:py-12">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          {/* Abstract Graphic */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-32 sm:h-40 md:h-74 lg:h-96 flex items-center justify-center"
          >
            <Image
              src="/Images webp/Circles.webp"
              alt="Eclipse graphic"
              width={600}
              height={600}
              className="h-full w-auto max-w-full object-contain"
              unoptimized
            />
          </motion.div>

          {/* Text - Centered container, left-aligned text */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="flex items-center justify-center h-full px-4"
          >
            <div className="flex flex-col gap-4 items-center md:items-start w-full max-w-md">
              <p className="typography-h2 text-primary text-center md:text-left" style={{ fontWeight: 400 }}>
                We transform your brand
              </p>
              <div 
                className="relative h-[1.2em] w-full flex items-center justify-center md:justify-start"
                style={{ 
                  perspective: '1000px',
                  transformStyle: 'preserve-3d'
                }}
              >
                <div
                  className="typography-h2 text-primary text-center md:text-left"
                  style={{
                    fontWeight: 700,
                    transform: isFlipping ? 'rotateX(90deg) scale(0.8)' : 'rotateX(0deg) scale(1)',
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                    opacity: isFlipping ? 0 : 1
                  }}
                >
                  {displayWord}.
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

