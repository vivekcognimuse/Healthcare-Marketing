"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import { useState, useEffect } from "react";

export default function Footer() {
  const [isWhatsAppVisible, setIsWhatsAppVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsWhatsAppVisible(true);
      } else {
        setIsWhatsAppVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);
  return (
    <footer className="relative text-white bg-black min-h-screen h-screen flex flex-col">
      {/* Eclipse Background Section - Covers from top until logo bottom */}
      <div className="relative flex-1 overflow-hidden flex flex-col">
        {/* Eclipse Background Image - Covers entire section */}
        <Image
          src="/Images webp/footer-Ellipse.webp"
          alt=""
          width={1200}
          height={600}
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          priority
        />

        {/* Top Section */}
        <div className="relative z-10 py-6 sm:py-8 lg:pt-20 flex-shrink-0">
          <div className="container relative px-4 sm:px-6">
            {/* Main CTA Section */}
            <div className="flex flex-col md:grid md:grid-cols-2 gap-6 lg:gap-8 items-center md:items-center">
              <div className="text-center md:text-left w-full md:w-auto">
                <h2 className="typography-h2 text-white/50">
                  LET&apos;S GET YOUR BRAND TO THE NEXT LEVEL
                </h2>
              </div>
              <div className="text-center md:text-right w-full md:w-auto">
                <Button variant="primary" className="w-full md:w-auto px-4 sm:px-6 py-3 inline-flex items-center justify-center gap-2 sm:gap-3 mb-2">
                  BOOK YOUR DISCOVERY CALL
                  <Image
                    src="/icons/musemarketinglogo.svg"
                    alt="Muse Marketing Logo"
                    width={24}
                    height={24}
                    className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 flex-shrink-0"
                  />
                </Button>
                <p className="typography-footnote text-white/80 text-center md:text-right">
                  Your healthcare growth starts here.<br />Let&apos;s make it happen.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mid Section - Navigation */}
        <div className="relative z-10 flex-1 flex items-center justify-center min-h-0">
          <div className="container relative h-full flex items-center justify-center px-4 sm:px-6">
            <div className="relative w-full flex justify-center items-center h-full">
              {/* Navigation Links - Positioned on top of eclipse */}
              <div className="absolute top-[15%] sm:top-[20%] md:top-1/4 left-1/2 transform -translate-x-1/2 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 lg:gap-8 z-20 px-4">
                <Link href="#home" className="typography-footnote text-white/60 hover:text-white/80 transition-colors text-xs sm:text-sm md:text-base lg:text-[22px]">
                  Home
                </Link>
                <div className="w-8 h-px border-t border-dotted border-white/30 md:hidden"></div>
                <Link href="#services" className="typography-footnote text-white/60 hover:text-white/80 transition-colors text-xs sm:text-sm md:text-base lg:text-[22px]">
                  Services
                </Link>
                <div className="w-8 h-px border-t border-dotted border-white/30 md:hidden"></div>
                <Link href="#expertise" className="typography-footnote text-white/60 hover:text-white/80 transition-colors text-xs sm:text-sm md:text-base lg:text-[22px]">
                  Works
                </Link>
                <div className="w-8 h-px border-t border-dotted border-white/30 md:hidden"></div>
                <Link href="#packages" className="typography-footnote text-white/60 hover:text-white/80 transition-colors text-xs sm:text-sm md:text-base lg:text-[22px]">
                  Plans
                </Link>
                <div className="w-8 h-px border-t border-dotted border-white/30 md:hidden"></div>
                <Link href="#testimonials" className="typography-footnote text-white/60 hover:text-white/80 transition-colors text-xs sm:text-sm md:text-base lg:text-[22px]">
                  Testimonials
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Floating WhatsApp Icon */}
      <div className={`fixed bottom-56 sm:bottom-44 md:bottom-48 lg:bottom-52 right-8 z-40 transition-all duration-300 ${
        isWhatsAppVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}>
        <a
          href="https://wa.me/8861078009"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity block hover:scale-110 transition-transform"
          aria-label="WhatsApp"
        >
          <Image
            src="/icons/whatsapp-icon.svg"
            alt="WhatsApp"
            width={48}
            height={48}
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 drop-shadow-lg"
          />
        </a>
      </div>

        {/* Logo Image - Positioned at end of eclipse, just above footer bar */}
        <div className="relative z-10 flex-shrink-0">
          <div className="container px-4 sm:px-6">
            <Image
              src="/Images webp/Logo.webp"
              alt="Muse Marketing"
              width={1200}
              height={400}
              unoptimized
              className="w-full h-auto object-contain mx-auto"
            />
          </div>
        </div>
      </div>

      

      {/* Bottom Footer Bar */}
      <div className="bg-black flex-shrink-0 pb-16 pt-10 sm:pt-0 sm:pb-8">
        <div className="container py-3 sm:py-6 px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
            <p className="typography-footnote text-white/80 text-center sm:text-left text-xs sm:text-lg">
              Copyright © Muse Marketing Services
            </p>
            <div className="flex gap-3 sm:gap-4 items-center">
              <Link href="/terms-of-service" className="typography-footnote text-white/80 hover:text-white transition-colors text-xs sm:text-sm">
                Terms of Service
              </Link>
              <span className="text-white/80 hidden sm:inline">|</span>
              <Link href="/privacy-policy" className="typography-footnote text-white/80 hover:text-white transition-colors text-xs sm:text-sm">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

