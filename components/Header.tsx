"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
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
      
      setIsHeaderVisible(!shouldHide);
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
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
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
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${textColorClass} ${
        isHeaderVisible || isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
      style={{
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
            className="lg:hidden flex flex-col gap-1.5 z-50 relative"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className={`w-6 h-0.5 ${hamburgerColorClass} transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 ${hamburgerColorClass} transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 ${hamburgerColorClass} transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile/Tablet Menu Overlay */}
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Mobile/Tablet Menu */}
            <div className="lg:hidden fixed top-0 left-0 right-0 bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out">
              <div className="container py-4">
                {/* Menu Header */}
                <div className="flex items-center justify-between mb-6">
                  <Link href="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
                    <span className="typography-h3 font-bold text-black">CogniMuse</span>
                  </Link>
                  <button
                    className="flex flex-col gap-1.5"
                    onClick={() => setIsMenuOpen(false)}
                    aria-label="Close menu"
                  >
                    <span className="w-6 h-0.5 bg-black rotate-45 translate-y-2 transition-all"></span>
                    <span className="w-6 h-0.5 bg-black opacity-0 transition-all"></span>
                    <span className="w-6 h-0.5 bg-black -rotate-45 -translate-y-2 transition-all"></span>
                  </button>
                </div>

                {/* Menu Items */}
                <div className="flex flex-col gap-4 pb-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={`typography-p2 text-black py-2 border-b border-gray-200 ${
                        activeSection === item.id ? "font-bold text-primary" : "hover:text-primary"
                      } transition-colors`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <a 
                    href="https://wa.me/8861078009"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary typography-btn1 px-6 py-3 w-full mt-2 text-center block transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    LET&apos;S CONNECT
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}

