"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Button from "./Button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || "home";
      setActiveSection(hash);
    };

    // Set initial active section
    handleHashChange();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("scroll", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("scroll", handleHashChange);
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

  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-transparent text-white">
      <nav className="container py-4 lg:py-6">
        <div className="flex items-center justify-between w-full relative">
          {/* Logo */}
          <Link href="/" className="flex items-center z-10">
            <span className="typography-h3 font-bold">Muse Marketing</span>
          </Link>

          {/* Desktop Navigation - Middle section */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12 flex-1 justify-center">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`typography-p2 hover:opacity-80 transition-opacity ${
                  activeSection === item.id ? "font-bold" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Button - Right section */}
          <div className="hidden md:flex items-center">
            <a 
              href="https://wa.me/8861078009"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary typography-btn1 px-6 py-3 transition-all duration-300"
            >
              LET&apos;S CONNECT
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col gap-1.5 z-50 relative"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Mobile Menu */}
            <div className="md:hidden fixed top-0 left-0 right-0 bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out">
              <div className="container py-4">
                {/* Menu Header */}
                <div className="flex items-center justify-between mb-6">
                  <Link href="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
                    <span className="typography-h3 font-bold text-black">Muse Marketing</span>
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

