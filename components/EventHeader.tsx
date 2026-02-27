"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement | null>(null);
  // Derived route flags - used by the scroll/visibility logic and styling.
 

  const resolveHref = (href: string) => {
    if (href.startsWith("#")) {
      // Always route to the site's root with the fragment (e.g. /#home).
      // This ensures header top-level anchors like "#home" navigate to the main homepage.
      return `/${href}`;
    }
    return href;
  };

  useEffect(() => {
    // Calculate isSpecial inside useEffect to ensure current pathname is used
    const isSpecial = !!(pathname && (pathname.startsWith("/knowledge-hub") || pathname.startsWith("/events")));
    
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

      // For special pages (events/knowledge-hub), keep header always visible
      if (isSpecial) {
        setIsHeaderVisible(true);
        handleHashChange();
        return;
      }

      // Logic for other pages (home page)
      const contentSection = document.getElementById("work");
      const footer = document.querySelector("footer");
      
      let shouldHide = false;
      let footerVisible = false;
      
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
        // Mark footer visible when it enters the viewport
        if (footerTop < window.innerHeight) {
          footerVisible = true;
          shouldHide = true;
        }
      }
      
      // If menu is open, always show header
      if (isMenuOpen) {
        setIsHeaderVisible(true);
      } else if (footerVisible) {
        // Hide header when footer is visible
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(!shouldHide);
      }
      
      handleHashChange();
    };

    // Set initial active section and scroll state
    handleHashChange();
    
    // Ensure header is visible on initial mount for special pages
    if (isSpecial) {
      setIsHeaderVisible(true);
    }
    
    handleScroll();
    // If the current route is a knowledge-hub page, prefer the "over-hero" (light) header initially
    if (pathname && pathname.startsWith("/knowledge-hub")) {
      setIsScrolled(false);
    }
    // Use IntersectionObserver to detect whether a "hero" section is visible.
    // If a hero is visible, we keep the header in the "over-hero" style (light text).
    // When the hero is not visible (or there is no hero), we switch to the "scrolled" style (dark text).
    // Special-case: on the Voices page we want the header to be white while the
    // "Meet Dr. Shovan Saha" block (id="meet-dr-shovan") is visible, then switch to black.
    let heroObserver: IntersectionObserver | null = null;
    const voicesHero = document.getElementById("meet-dr-shovan");
    if (pathname && pathname.startsWith("/knowledge-hub/voices") && voicesHero) {
      heroObserver = new IntersectionObserver(
        (entries) => {
          const e = entries[0];
          if (!e) return;
          // When the hero is visible -> light header (isScrolled = false).
          setIsScrolled(!e.isIntersecting);
        },
        { root: null, threshold: 0, rootMargin: "-80px 0px 0px 0px" }
      );
      heroObserver.observe(voicesHero);
    } else {
      const hero =
        document.getElementById("home") ||
        (document.querySelector("section[data-hero]") as HTMLElement | null) ||
        (Array.from(document.querySelectorAll("section")).find((s) => !!s.querySelector("img")) as HTMLElement | null);

      if (!hero) {
        setIsScrolled(true);
      } else {
        heroObserver = new IntersectionObserver(
          (entries) => {
            const e = entries[0];
            if (!e) return;
            setIsScrolled(!e.isIntersecting);
          },
          { root: null, threshold: 0, rootMargin: "-80px 0px 0px 0px" }
        );
        heroObserver.observe(hero);
      }
    }

    // Observe footer separately to hide header when footer enters viewport (only for non-special pages)
    let footerObserver: IntersectionObserver | null = null;
    const footerEl = document.querySelector("footer");
    if (footerEl && !isSpecial) {
      footerObserver = new IntersectionObserver(
        (entries) => {
          const e = entries[0];
          if (!e) return;
          // When the footer is visible, hide the header unless the mobile menu is open
          if (isMenuOpen) {
            setIsHeaderVisible(true);
          } else {
            setIsHeaderVisible(!e.isIntersecting);
          }
        },
        { root: null, threshold: 0 }
      );
      footerObserver.observe(footerEl);
    }

    // Listen for hash changes and scroll
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("scroll", handleScroll);
      if (heroObserver) heroObserver.disconnect();
      if (footerObserver) footerObserver.disconnect();
    };
  }, [isMenuOpen, pathname]);

  // Measure header height and expose as CSS variable for layout spacing
  useEffect(() => {
    function setHeaderHeight() {
      try {
        const el = headerRef.current;
        if (el && typeof document !== "undefined") {
          const h = el.offsetHeight;
          document.documentElement.style.setProperty("--header-height", `${h}px`);
        }
      } catch (e) {
        // ignore
      }
    }

    setHeaderHeight();
    window.addEventListener("resize", setHeaderHeight);
    return () => window.removeEventListener("resize", setHeaderHeight);
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
    {
      href: "/knowledge-hub",
      label: "Knowledge Hub",
      id: "outreach",
      children: [
        { href: "/knowledge-hub/episode", label: "Episodes", id: "outreach-episodes" },
        { href: "/knowledge-hub/articles", label: "Articles", id: "outreach-articles" },
        { href: "/knowledge-hub/voices", label: "Voices", id: "outreach-voices" },
        // { href: "/events", label: "Events", id: "events" },
       
      ],
    },
  ];

  const isNavItemActive = (item: { href: string; id: string; children?: { href: string }[] }) => {
    if (item.href.startsWith("#")) {
      return pathname === "/" && activeSection === item.id;
    }

    if (!pathname) return false;

    if (item.href === "/knowledge-hub") {
      return pathname.startsWith("/knowledge-hub") || pathname.startsWith("/events");
    }

    return pathname === item.href;
  };

  const isSpecial = !!(pathname && (pathname.startsWith("/knowledge-hub") || pathname.startsWith("/events")));
  const isVoices = !!(pathname && pathname.startsWith("/knowledge-hub/voices"));
  // Header text/color rules:
  // - On the Voices page: white while over the hero, switch to black when scrolled past the hero.
  // - On other "special" pages (knowledge-hub / events) prefer black text.
  // - Otherwise (normal pages) switch between white (over hero) and black (scrolled).
  const textColorClass = isVoices ? (isScrolled ? "text-black" : "text-white") : isSpecial ? "text-black" : (isScrolled ? "text-black" : "text-white");
  const hamburgerColorClass = isVoices ? (isScrolled ? "bg-black" : "bg-white") : isSpecial ? "bg-black" : (isScrolled ? "bg-black" : "bg-white");
  const isHomeOrOutreach = pathname === "/" || isSpecial;
  // When header text is black we prefer a light (white) dropdown modal with dark text.
  const isHeaderTextBlack = textColorClass.includes("text-black");
  const headerBackground = isHeaderTextBlack
    ? "rgba(255, 255, 255, 0.9)"
    : isScrolled
    ? "linear-gradient(135deg, rgba(0, 27, 87, 0.06) 0%, rgba(0, 27, 87, 0.04) 100%)"
    : "transparent";
  const headerBlur = !isHeaderTextBlack && isScrolled ? "blur(6px)" : "none";
  const headerShadow = !isHeaderTextBlack && isScrolled ? "0 8px 24px rgba(0, 0, 0, 0.08)" : "none";

  return (  
    <>
    <div className={`fixed top-0 left-0 right-0 lg:left-1/2 lg:right-auto lg:-translate-x-1/2 z-40 transition-all duration-500 ease-out flex items-center gap-3 px-6 lg:px-0 ${
        isHeaderVisible || isMenuOpen ? 'translate-y-4 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'
      }`}
      style={{ filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.15))' }}
    >
      {/* Main Header Capsule */}
      <header ref={headerRef}
        className="w-full lg:w-auto lg:min-w-max"
        style={{
          background: '#FFFFFF',
          borderRadius: '100px',
          padding: '0',
        }}
      >
        <nav className="px-6 lg:px-8 py-2.5 lg:py-[22px]">
          <div className="flex items-center relative gap-4 lg:gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center z-10 flex-shrink-0">
              <span
                className="typography-h3 font-bold transition-colors duration-300 text-black"
                style={{ textShadow: "none", filter: "none" }}
              >
                Creative Labs
              </span>
            </Link>

            {/* Desktop Navigation - Middle section (lg: 1024px+) */}
            <div className="hidden lg:flex items-center gap-4 flex-nowrap">
              {navItems.map((item) => (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.children ? item.id : null)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={resolveHref(item.href)}
                    className={`typography-p2 transition-all duration-300 text-black px-3 py-2 rounded-full whitespace-nowrap ${
                      isNavItemActive(item) ? "bg-[#FCF4E1] shadow-sm" : "hover:bg-gray-100"
                    }`}
                    style={{ textShadow: "none", filter: "none" }}
                  >
                    {item.label}
                  </Link>

                  {/* Dropdown for items with children (controlled by state to avoid flicker) */}
                  {item.children && (
                    <div
                      className={`absolute left-1/2 top-full -translate-x-1/2 w-64 rounded-xl shadow-xl z-[60] transition-all duration-200 ease-out mt-2 ${
                        openDropdown === item.id ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-2"
                      }`}
                      onMouseEnter={() => setOpenDropdown(item.id)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <div className="flex flex-col py-2 rounded-xl overflow-hidden bg-white text-black border border-gray-100 shadow-lg">
                        {item.children.map((c) => {
                          const isActive = !!pathname && pathname === c.href;
                          return (
                            <Link
                              key={c.id}
                              href={c.href}
                              className={`typography-p2 px-4 py-3 mx-1 transition-all duration-200 block rounded-lg ${
                                isActive ? "bg-[#FCF4E1] shadow-sm" : "hover:bg-gray-100"
                              }`}
                              style={{ textShadow: "none", filter: "none" }}
                            >
                              <span className={`inline-block w-3 text-black transition-opacity duration-200 ${isActive ? "opacity-100" : "opacity-0"}`}>|</span>
                              <span className="ml-2">{c.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile/Tablet Menu Button (shows on mobile and tablet, hidden on desktop) */}
            <button
              className="lg:hidden flex flex-col gap-1.5 z-[120] relative cursor-pointer ml-auto"
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              type="button"
            >
              <span className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </nav>
      </header>

      {/* Separate "Get a quote" Button Capsule */}
      <a 
        href="https://wa.me/8861078009"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden lg:block typography-btn1 px-8 py-2.5 lg:py-[22px] transition-all duration-300 bg-white text-black rounded-full hover:scale-105 active:scale-95 whitespace-nowrap"
      >
        Get a quote
      </a>
    </div>
    
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
            id="mobile-menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 200,
              duration: 0.4
            }}
            className="lg:hidden fixed inset-0 z-[110] shadow-2xl overflow-y-auto"
            style={{
              background: '#FCF4E1',
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
                  <span className="typography-h3 font-bold text-black">Creative Labs</span>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 flex items-center justify-center bg-black hover:bg-black/80 rounded-full transition-colors duration-200"
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
                <p className="typography-p2 text-black/70 leading-relaxed">
                  CogniMuse Marketing, dedicated to driving progress for healthcare professionals through trusted marketing techniques.
                </p>
              </motion.div>

              {/* Navigation Links */}
              <nav className="flex-1 px-6 py-4">
                <div className="flex flex-col gap-2">
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
                        href={resolveHref(item.href)}
                        onClick={() => setIsMenuOpen(false)}
                        className={`group relative flex items-center px-4 py-4 rounded-full transition-all duration-300 ${
                          isNavItemActive(item) 
                            ? "text-white bg-primary shadow-sm" 
                            : "text-black hover:text-white hover:bg-primary/80 active:bg-primary"
                        }`}
                        style={{ textShadow: "none", filter: "none" }}
                      >
                        {item.label}
                      </Link>

                      {/* Mobile: show children as indented links */}
                      {item.children && (
                        <div className="ml-6 flex flex-col mb-2 gap-1.5">
                          {item.children.map((c) => {
                            const isChildActive = !!pathname && pathname === c.href;
                            return (
                              <Link
                                key={c.id}
                                href={c.href}
                                onClick={() => setIsMenuOpen(false)}
                                className={`typography-p2 px-4 py-2.5 rounded-full transition-all duration-300 ${
                                  isChildActive ? "text-white bg-primary shadow-sm" : "text-black/70 hover:text-white hover:bg-primary/70 active:bg-primary/80"
                                }`}
                                style={{ textShadow: "none", filter: "none" }}
                              >
                                {c.label}
                              </Link>
                            );
                          })}
                        </div>
                      )}
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
                className="px-6 py-6 border-t border-black/10"
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
                    className="bg-white text-primary typography-btn1 px-6 py-4 w-full text-center rounded-full font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                  >
                    Get a quote
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

