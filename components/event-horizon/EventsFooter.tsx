"use client";

import Image from "next/image";
import Link from "next/link";

export default function EventsFooter() {
  return (
    <footer className="relative text-[#1E1E1E] overflow-hidden">
      {/* Footer Background Image - Crop sides and bottom, show top border only */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -left-18 -right-8 -bottom-8 top-0 md:-left-32 md:-right-12 md:-bottom-12 lg:-left-48 lg:-right-20 lg:-bottom-20">
          <div className="relative w-full h-full">
            <Image
              src="/Images webp/footer-bg.png"
              alt=""
              fill
              className="w-full h-full object-cover object-top"
              unoptimized
              priority
            />
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh] flex flex-col">
        {/* Main Content Area */}
        <div className="flex-1 flex items-start justify-between px-6 md:px-12 lg:px-20 pt-12 md:pt-16 lg:pt-24 pb-8">
          {/* Left Side - Headline */}
          <div className="flex-1 max-w-[60%] md:max-w-[55%] lg:max-w-[50%]">
            <h2 
              className="text-[#1E1E1E] leading-[1.2] tracking-tight"
              style={{
                fontFamily: "'PP Editorial New', serif",
                fontWeight: 400,
                fontSize: "clamp(48px, 8vw, 124px)",
                lineHeight: "1.2",
                letterSpacing: "0%",
                textTransform: "lowercase",
              }}
            >
              let's get your<br />
              brand to the<br />
              next level
            </h2>
          </div>

          {/* Right Side - Navigation and CTA */}
          <div className="flex flex-col items-end gap-8 md:gap-12 lg:gap-16 pt-4">
            {/* CTA Button */}
            <a 
              href="https://calendly.com/meet-manoj-cognimuse/consultation" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#155DFC] text-white px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-[#0D4AD3] transition-colors"
            >
              <span className="typography-btn1 font-medium tracking-wide uppercase">
                BOOK YOUR DISCOVERY CALL
              </span>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full  flex items-center justify-center flex-shrink-0">
                <Image
                  src="/icons/marketinglogo.svg"
                  alt="M"
                  width={20}
                  height={20}
                  className="w-12 h-12"
                />
              </div>
            </a>

            {/* Discover Section */}
            <div className="text-left">
            <p 
                className="typography-p1 font-bold mb-4 md:mb-6 tracking-wider uppercase"
                style={{ fontFamily: "'Anonymous Pro', monospace",  fontWeight: 700 }}
            >
                DISCOVER
            </p>
              <nav className="grid grid-cols-2 gap-x-8 md:gap-x-12 gap-y-2 md:gap-y-3 text-left">
                <Link 
                  href="/" 
                  className="text-sm md:text-base lg:text-lg hover:opacity-70 transition-opacity"
                >
                  Home
                </Link>
                <Link 
                  href="/knowledge-hub/articles" 
                  className="text-sm md:text-base lg:text-lg hover:opacity-70 transition-opacity"
                >
                  Articles
                </Link>
                <Link 
                  href="/#services" 
                  className="text-sm md:text-base lg:text-lg hover:opacity-70 transition-opacity"
                >
                  Services
                </Link>
                <Link 
                  href="/knowledge-hub/episode" 
                  className="text-sm md:text-base lg:text-lg hover:opacity-70 transition-opacity"
                >
                  Episodes
                </Link>
                <Link 
                  href="/#work" 
                  className="text-sm md:text-base lg:text-lg hover:opacity-70 transition-opacity"
                >
                  Works
                </Link>
                <Link 
                  href="/knowledge-hub/voices" 
                  className="text-sm md:text-base lg:text-lg hover:opacity-70 transition-opacity"
                >
                  Voices
                </Link>
                <Link 
                  href="/#packages" 
                  className="text-sm md:text-base lg:text-lg hover:opacity-70 transition-opacity"
                >
                  Plans
                </Link>
                <Link 
                  href="/events" 
                  className="text-sm md:text-base lg:text-lg hover:opacity-70 transition-opacity"
                >
                  Events
                </Link>
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright and Links */}
        <div className="px-6 md:px-12 lg:px-20 py-6 md:py-8 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-[#1E1E1E]/10">
          <p className="text-xs md:text-sm text-[#1E1E1E]">
            Copyright © Muse Marketing Services
          </p>
          <div className="flex gap-4 md:gap-6 items-center text-xs md:text-sm">
            <Link 
              href="/terms-of-service" 
              className="text-[#1E1E1E] hover:text-[#1E1E1E] transition-colors"
            >
              Terms of Service
            </Link>
            <span className="text-[#1E1E1E]/40">|</span>
            <Link 
              href="/privacy-policy" 
              className="text-[#1E1E1E] hover:text-[#1E1E1E] transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
