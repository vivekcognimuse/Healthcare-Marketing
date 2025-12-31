"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || "home";
      setActiveSection(hash);
    };

    const handleScroll = () => {
      // Check if Expertise section (id="expertise") is in view or scrolled past
      const expertiseSection = document.getElementById("expertise");
      if (expertiseSection) {
        const expertiseTop = expertiseSection.getBoundingClientRect().top;
        // Apply glossy effect when Expertise section reaches the top of viewport
        setIsScrolled(expertiseTop <= 100);
      } else {
        // Fallback: check if scrolled past hero section
        const heroSection = document.getElementById("home");
        if (heroSection) {
          const heroBottom = heroSection.getBoundingClientRect().bottom;
          setIsScrolled(heroBottom < 100);
        }
      }

      // Check if ContentSection (id="work") or Footer is in view
      const contentSection = document.getElementById("work");
      const footer = document.querySelector("footer");
      
      let shouldHide = false;
      
      // Always show header at the very top of the page
      if (window.scrollY < 50) {
        shouldHide = false;
      } else if (contentSection) {
        const contentTop = contentSection.getBoundingClientRect().top;
        const contentBottom = contentSection.getBoundingClientRect().bottom;
        // Hide header when ContentSection is in view (top of section reaches viewport)
        if (contentTop < window.innerHeight && contentBottom > 0) {
          shouldHide = true;
        }
      }
      
      if (footer) {
        const footerTop = footer.getBoundingClientRect().top;
        // Hide header when Footer is in view
        if (footerTop < window.innerHeight) {
          shouldHide = true;
        }
      }
      
      // If menu is open, always show header
      if (isMenuOpen) {
        setIsHeaderVisible(true);
      } else {
        setIsHeaderVisible(!shouldHide);
      }
      
      handleHashChange();
    };

    // Set initial active section and scroll state
    handleHashChange();
    handleScroll();

    // Listen for hash changes and scroll
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open and ensure header is visible
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      setIsHeaderVisible(true); // Force header to be visible when menu is open
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navItems = [
    { href: "#home", label: "Home", id: "home" },
    { href: "#services", label: "Services", id: "services" },
    { href: "#expertise", label: "Expertise", id: "expertise" },
    { href: "#packages", label: "Packages", id: "packages" },
    { href: "#testimonials", label: "Testimonials", id: "testimonials" },
  ];

  const textColorClass = isScrolled ? "text-black" : "text-white";
  const hamburgerColorClass = isScrolled ? "bg-black" : "bg-white";

  return (
    <>
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${textColorClass} ${
        isHeaderVisible || isMenuOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'
      }`}
      style={{
        overflow: 'visible',
        background: isScrolled 
          ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)'
          : 'linear-gradient(180deg, rgba(0, 27, 87, 0.3) 0%, rgba(0, 27, 87, 0.1) 100%)',
        backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'blur(8px)',
        WebkitBackdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'blur(8px)',
        borderBottom: isScrolled 
          ? '1px solid rgba(255, 255, 255, 0.18)'
          : '1px solid rgba(255, 255, 255, 0.05)',
        boxShadow: isScrolled
          ? '0 8px 32px 0 rgba(0, 0, 0, 0.1), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)'
          : '0 4px 16px 0 rgba(0, 0, 0, 0.1)',
      }}
    >
      <nav className="container py-4 lg:py-6">
        <div className="flex items-center justify-between w-full relative">
          {/* Logo */}
          <Link href="/" className="flex items-center z-10">
            <span className={`typography-h3 font-bold transition-colors duration-300 ${textColorClass}`}>CogniMuse</span>
          </Link>

          {/* Desktop Navigation - Middle section (lg: 1024px+) */}
          <div className="hidden lg:flex items-center gap-8 lg:gap-12 flex-1 justify-center">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`typography-p2 hover:opacity-80 transition-all duration-300 ${textColorClass} ${
                  activeSection === item.id ? "font-bold" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Button - Right section (lg: 1024px+) */}
          <div className="hidden lg:flex items-center">
            <a 
              href="https://wa.me/8861078009"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary typography-btn1 px-6 py-2 transition-all duration-300"
            >
              LET&apos;S CONNECT
            </a>
          </div>

          {/* Mobile/Tablet Menu Button (shows on mobile and tablet, hidden on desktop) */}
          <button
            className="lg:hidden flex flex-col gap-1.5 z-[120] relative cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            type="button"
          >
            <span className={`w-6 h-0.5 ${hamburgerColorClass} transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 ${hamburgerColorClass} transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 ${hamburgerColorClass} transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </nav>
    </header>
    
    {/* Mobile/Tablet Menu Overlay - Rendered outside header to prevent clipping */}
    <AnimatePresence>
      {isMenuOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Mobile/Tablet Menu - Slide in from right with gradient background */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 200,
              duration: 0.4
            }}
            className="lg:hidden fixed top-0 right-0 bottom-0 w-full max-w-sm z-[110] shadow-2xl overflow-y-auto"
            style={{
              background: 'linear-gradient(180deg, #001B57 0%, #155DFC 40%, rgba(255, 255, 255, 0.95) 100%)',
              boxShadow: "-4px 0 24px rgba(0, 0, 0, 0.15)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full">
              {/* Menu Header - Logo and Close Button */}
              <div className="relative px-6 py-6 flex items-center justify-between">
                <Link 
                  href="/" 
                  className="flex items-center" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="typography-h3 font-bold text-white">CogniMuse</span>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 flex items-center justify-center bg-black rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                  type="button"
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>
              </div>

              {/* Company Description */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="px-6 pb-6"
              >
                <p className="typography-p2 text-white/90 leading-relaxed">
                  CogniMuse Marketing, dedicated to driving progress for healthcare professionals through trusted marketing techniques.
                </p>
              </motion.div>

              {/* Navigation Links */}
              <nav className="flex-1 px-6 py-4">
                <div className="flex flex-col gap-1">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: index * 0.08 + 0.2,
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`group relative flex items-center py-4 transition-all duration-300 ${
                          activeSection === item.id 
                            ? "text-black" 
                            : "text-white/90 hover:text-white"
                        }`}
                      >
                        {/* Active underline - extends across */}
                        {activeSection === item.id && (
                          <motion.div
                            layoutId="activeUnderline"
                            className="absolute left-0 right-0 bottom-0 h-0.5 bg-black"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                        <span className={`typography-p2 font-medium relative z-10 ${
                          activeSection === item.id ? "font-semibold" : ""
                        }`}>
                          {item.label}
                        </span>
                        {/* Arrow indicator for active - pointing diagonally up-right */}
                        {activeSection === item.id && (
                          <motion.svg
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="w-5 h-5 ml-auto text-black"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </motion.svg>
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </nav>

              {/* CTA Button Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: navItems.length * 0.08 + 0.4,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="px-6 py-6 border-t border-white/20"
              >
                {/* CTA Button */}
                <a 
                  href="https://wa.me/8861078009"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white text-primary typography-btn1 px-6 py-4 w-full text-center rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    LET&apos;S CONNECT
                  </motion.div>
                </a>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  );
}

