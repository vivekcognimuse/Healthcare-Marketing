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
              src="/Images webp/footer-bg.webp"
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
        <div className="flex-1 flex flex-col px-8 pt-12 md:pt-16 lg:pt-24 pb-8">
          {/* Top Section - Headline and CTA Button */}
          <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-6 lg:gap-8 items-center md:items-center mt-12 mb-12 md:mb-16 lg:mb-20">
            {/* Left Side - Headline */}
            <div className="text-center md:text-left w-full md:w-auto">
              <h2 className="typography-h1 text-white/50" style={{fontWeight:400}}>
                <span className="text-white">Let's get your brand</span> <br />
                <span className="text-white">to the </span>
                <span className="text-[#FFD100]"> next level.</span>
              </h2>
            </div>

            {/* Right Side - CTA Button */}
            <div className="text-center md:text-right w-full md:w-auto">
              <a 
                href="https://calendly.com/meet-manoj-cognimuse/consultation" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 bg-[#FFD100] text-white px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-primary transition-colors"
              >
                {/* Footer Illustration - Shows on hover */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 mb-4 w-[250px] md:w-[350px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <Image
                    src="/icons/footer-illustration.svg"
                    alt=""
                    width={400}
                    height={100}
                    className="w-full h-auto"
                    unoptimized
                  />
                </div>
                
                <span className="typography-btn1 font-medium tracking-wide uppercase text-black group-hover:text-white transition-colors">
                  BOOK YOUR DISCOVERY CALL
                </span>
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 relative">
                  <Image
                    src="/icons/marketinglogo-dark.svg"
                    alt="M"
                    width={20}
                    height={20}
                    className="w-12 h-12 group-hover:hidden"
                  />
                  <Image
                    src="/icons/marketinglogo.svg"
                    alt="M"
                    width={20}
                    height={20}
                    className="w-12 h-12 hidden group-hover:block"
                  />
                </div>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 flex items-center justify-center">
            <nav className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 lg:gap-8">
              <Link 
                href="/" 
                className="text-white/60 hover:text-white/80 text-sm md:text-base lg:text-[22px] transition-colors"
              >
                Home
              </Link>
              <div className="w-8 h-px border-t border-dotted border-white/30 md:hidden"></div>
              <Link 
                href="/#services" 
                className="text-white/60 hover:text-white/80 text-sm md:text-base lg:text-[22px] transition-colors"
              >
                Services
              </Link>
              <div className="w-8 h-px border-t border-dotted border-white/30 md:hidden"></div>
              <Link 
                href="/#work" 
                className="text-white/60 hover:text-white/80 text-sm md:text-base lg:text-[22px] transition-colors"
              >
                Works
              </Link>
              <div className="w-8 h-px border-t border-dotted border-white/30 md:hidden"></div>
              <Link 
                href="/#packages" 
                className="text-white/60 hover:text-white/80 text-sm md:text-base lg:text-[22px] transition-colors"
              >
                Plans
              </Link>
              <div className="w-8 h-px border-t border-dotted border-white/30 md:hidden"></div>
              <Link 
                href="/knowledge-hub/articles" 
                className="text-white/60 hover:text-white/80 text-sm md:text-base lg:text-[22px] transition-colors"
              >
                Articles
              </Link>
              <div className="w-8 h-px border-t border-dotted border-white/30 md:hidden"></div>
              <Link 
                href="/knowledge-hub/episode" 
                className="text-white/60 hover:text-white/80 text-sm md:text-base lg:text-[22px] transition-colors"
              >
                Episodes
              </Link>
              <div className="w-8 h-px border-t border-dotted border-white/30 md:hidden"></div>
              <Link 
                href="/knowledge-hub/voices" 
                className="text-white/60 hover:text-white/80 text-sm md:text-base lg:text-[22px] transition-colors"
              >
                Voices
              </Link>
              <div className="w-8 h-px border-t border-dotted border-white/30 md:hidden"></div>
              <Link 
                href="/events" 
                className="text-white/60 hover:text-white/80 text-sm md:text-base lg:text-[22px] transition-colors"
              >
                Events
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Section - Copyright and Links */}
        <div className="px-8 py-6 md:py-8 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-[#1E1E1E]/10">
          <p className="text-xs md:text-sm text-white">
            Copyright © Muse Marketing Services
          </p>
          <div className="flex gap-4 md:gap-6 items-center text-xs md:text-sm">
            <Link 
              href="/terms-of-service" 
              className="text-white hover:text-[#FFFFFF]/80 transition-colors"
            >
              Terms of Service
            </Link>
            <span className="text-[#1E1E1E]/40">|</span>
            <Link 
              href="/privacy-policy" 
              className="text-white hover:text-[#FFFFFF]/80 transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
