"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

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
    <section className="bg-white py-8 sm:py-12">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          {/* Abstract Graphic */}
          <div className="relative h-32 sm:h-40 md:h-74 lg:h-96 flex items-center justify-center">
            <Image
              src="/Images webp/Circles.webp"
              alt="Eclipse graphic"
              width={600}
              height={600}
              className="h-full w-auto max-w-full object-contain"
              unoptimized
            />
          </div>

          {/* Text - Centered container, left-aligned text */}
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col gap-4 items-start">
              <p className="typography-h2 text-primary" style={{ fontWeight: 400 }}>
                We transform your brand
              </p>
              <div 
                className="relative h-[1.2em] min-w-[200px] flex items-center justify-center md:justify-start w-full"
                style={{ 
                  perspective: '1000px',
                  transformStyle: 'preserve-3d'
                }}
              >
                <div
                  className="typography-h2 text-primary"
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
          </div>
        </div>
      </div>
    </section>
  );
}

