"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Video } from "lucide-react";
import type { Event } from "@/data/events";

// Shimmer skeleton loader with wave effect
function ShimmerSkeleton() {
  return (
    <div className="absolute inset-0 z-20 overflow-hidden">
      {/* Mobile skeleton */}
      <div className="block md:hidden w-full h-full relative bg-gray-300">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-[length:200%_100%] animate-shimmer"></div>
      </div>
      
      {/* Desktop skeleton */}
      <div className="hidden md:block w-full h-full relative bg-gray-300">
        <div className="w-full h-[400px] bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-[length:200%_100%] animate-shimmer"></div>
      </div>
    </div>
  );
}

export default function EventCard({ event }: { event: Event }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link
      href={`/events/${event.id}`}
      aria-label={`Open event: ${event.title}`}
      className="block w-full rounded-2xl overflow-hidden transform transition-transform duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      {/* Mobile & Tablet: Optimized with Next.js Image */}
      <div className="block md:hidden w-full relative aspect-[9/16]">
        {!imageLoaded && <ShimmerSkeleton />}
        <Image
          src="/assets/events/event-mobile.png"
          alt={event.title}
          fill
          priority
          quality={90}
          sizes="100vw"
          className={`object-cover transition-opacity duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      {/* Desktop: Background image with overlaid content */}
      <div
        className="hidden md:block w-full relative"
        style={{
          borderTop: "7px solid #155DFC",
        }}
      >
        {!imageLoaded && <ShimmerSkeleton />}
        <Image
          src="/assets/events/bg.webp"
          alt=""
          fill
          priority
          quality={90}
          sizes="(min-width: 1024px) 1200px, 100vw"
          className={`object-cover object-center transition-opacity duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
          <div className={`flex flex-col md:flex-row items-stretch transition-opacity duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}>
            {/* Left content */}
            <div className="flex-1 px-10 md:px-12 py-10 md:py-12 text-white relative z-10">
              {/* WEBINAR label */}
              <div className="typography-p1  text-[#155DFC] mb-4 wide" style={{ fontWeight: 700, letterSpacing: "-0.01em" }}>WEBINAR</div>
              
              {/* Title */}
              <h3
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
                style={{ letterSpacing: "-0.01em" }}
              >
                Sundays with <span className="text-[#155DFC]">Dr. Shovan Saha</span>
              </h3>
              
              {/* Tagline */}
              <p className="text-base md:text-lg text-gray-300 mb-8 font-normal tracking-[-0.001em]">
                Master OT Communication
                <span className="inline-block px-4 align-middle text-xl text-gray-300 tracking-[-0.001em]" style={{ letterSpacing: "-0.01em" }}>•</span>
                Build Networks
                <span className="inline-block px-4 align-middle text-xl text-gray-300 tracking-[-0.001em]" style={{ letterSpacing: "-0.01em" }}>•</span>
                Pitch Your Practice
              </p>

              {/* Info boxes */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-6 mb-8">
                {/* Time */}
                <div className="flex items-start gap-3">
                  <div className="bg-[#081855] rounded-xl p-2.5 flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#1674D7]" strokeWidth={2.5} />
                  </div>
                  <div>
                    <div className="text-sm md:text-base font-semibold text-white leading-snug">
                      11:00 AM - 12:30 PM IST
                    </div>
                    <div className="text-xs md:text-sm text-gray-400 mt-0.5">Sunday</div>
                  </div>
                </div>

                {/* Google Meet */}
                <div className="flex items-start gap-3">
                  <div className="bg-[#081855] rounded-xl p-2.5 flex-shrink-0">
                    <Video className="w-5 h-5 text-[#1674D7]" strokeWidth={2.5} />
                  </div>
                  <div>
                    <div className="text-sm md:text-base font-semibold text-white leading-snug">
                      Google Meet
                    </div>
                    <div className="text-xs md:text-sm text-gray-400 mt-0.5">
                      Link provided upon registration
                    </div>
                  </div>
                </div>
              </div>

              {/* Register button */}
              <div>
                <span
                  className="btn-secondary px-4 py-2 tracking-wide rounded-full"
                >
                  REGISTER NOW
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
  );
}
