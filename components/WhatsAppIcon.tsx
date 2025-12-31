"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function WhatsAppIcon() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Hide in hero section
      if (window.pageYOffset <= 300) {
        setIsVisible(false);
        return;
      }

      // Check if footer is in viewport - hide WhatsApp if footer is visible
      const footer = document.querySelector('footer');
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Hide if footer is visible in viewport (when footer top is above viewport bottom)
        if (footerRect.top < viewportHeight) {
          setIsVisible(false);
          return;
        }
      }

      // Show WhatsApp if past hero and footer is not visible
      setIsVisible(true);
    };

    window.addEventListener("scroll", toggleVisibility);
    toggleVisibility(); // Check initial state

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className={`fixed bottom-8 right-8 z-40 transition-all duration-300 ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
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
  );
}

