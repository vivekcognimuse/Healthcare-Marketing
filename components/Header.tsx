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
      } else if (footerVisible && !isSpecial) {
        // Hide header when footer is visible, but keep it visible on special pages (events/outreach)
        setIsHeaderVisible(false);
      } else {
        // Keep header visible on special pages (events/outreach) to avoid disappearing over hero-like content
        if (isSpecial) {
          setIsHeaderVisible(true);
        } else {
          setIsHeaderVisible(!shouldHide);
        }
      }
      
      handleHashChange();
    };

    // Set initial active section and scroll state
    handleHashChange();
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

    // Observe footer separately to hide header when footer enters viewport
    let footerObserver: IntersectionObserver | null = null;
    const footerEl = document.querySelector("footer");
    if (footerEl) {
      footerObserver = new IntersectionObserver(
        (entries) => {
          const e = entries[0];
          if (!e) return;
          // When the footer is visible, hide the header unless the mobile menu is open.
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
        { href: "/events", label: "Events", id: "events" },
       
      ],
    },
  ];

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

  return (  
    <>
    <header ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${textColorClass} ${
        isHeaderVisible || isMenuOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'
      }`}
      style={{
        overflow: 'visible',
        /* Background logic:
           - When scrolled, use a subtle gradient (existing behavior).
           - When header uses the black text variant but is not scrolled, use semi-opaque white (50%) instead of transparent.
           - Otherwise remain transparent. */
        background: isScrolled
          ? 'linear-gradient(135deg, rgba(0, 27, 87, 0.06) 0%, rgba(0, 27, 87, 0.04) 100%)'
          : (isHeaderTextBlack ? 'rgba(255, 255, 255, 0.7)' : 'transparent'),
        /* Apply blur only when scrolled — avoid blur when using the semi-opaque white header
           (the blur can create a halo/ghosting effect on darker backgrounds). */
        backdropFilter: isScrolled ? 'blur(6px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(6px)' : 'none',
        /* Show subtle border when scrolled or when using the semi-opaque white background */
        borderBottom: (isScrolled || isHeaderTextBlack) ? '1px solid rgba(0, 0, 0, 0.06)' : 'none',
        /* Only apply a prominent shadow when scrolled. When header is the black variant
           but not scrolled, avoid shadows that produce a glow/halo effect. */
        boxShadow: isScrolled ? '0 8px 24px rgba(0, 0, 0, 0.08)' : 'none',
      }}
    >
      <nav className="container py-4 lg:py-6">
        <div className="flex items-center justify-between w-full relative">
          {/* Logo */}
          <Link href="/" className="flex items-center z-10">
            <span
              className={`typography-h3 font-bold transition-colors duration-300 ${textColorClass}`}
              style={{ textShadow: "none", filter: "none" }}
            >
              CogniMuse
            </span>
          </Link>

          {/* Desktop Navigation - Middle section (lg: 1024px+) */}
          <div className="hidden lg:flex items-center gap-8 lg:gap-12 flex-1 justify-center">
            {navItems.map((item) => (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.children ? item.id : null)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={resolveHref(item.href)}
                  className={`typography-p2 hover:opacity-80 transition-all duration-300 ${textColorClass} ${
                    activeSection === item.id ? "font-bold" : ""
                  }`}
                  style={{ textShadow: "none", filter: "none" }}
                >
                  {item.label}
                </Link>

                {/* Dropdown for items with children (controlled by state to avoid flicker) */}
                {item.children && (
                  <div
                    className={`absolute left-1/2 top-full -translate-x-1/2 w-56 rounded-lg shadow-lg z-[60] transition-all duration-150 ${
                      openDropdown === item.id ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none translate-y-1"
                    }`}
                    onMouseEnter={() => setOpenDropdown(item.id)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <div
                      className={`flex flex-col py-1 rounded-lg overflow-hidden ${isHeaderTextBlack ? "bg-white text-black" : "bg-black/80 text-white"}`}
                    >
                      {item.children.map((c) => (
                        <Link
                          key={c.id}
                          href={c.href}
                          className={`typography-p2 px-4 py-3 transition-colors block rounded-md ${
                            isHeaderTextBlack
                              ? "hover:text-black hover:bg-gray-100"
                              : "hover:text-white hover:bg-gradient-to-b hover:from-[#001B57] hover:via-[#155DFC] hover:to-white/5"
                          }`}
                          style={{ textShadow: "none", filter: "none" }}
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
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
            aria-controls="mobile-menu"
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
                        href={resolveHref(item.href)}
                        onClick={() => setIsMenuOpen(false)}
                        className={`group relative flex items-center py-4 transition-all duration-300 ${
                          activeSection === item.id 
                            ? "text-black" 
                            : "text-white/90 hover:text-white"
                        }`}
                        style={{ textShadow: "none", filter: "none" }}
                      >
                        {item.label}
                      </Link>

                      {/* Mobile: show children as indented links */}
                      {item.children && (
                        <div className="ml-6 flex flex-col mb-2">
                          {item.children.map((c) => (
                            <Link
                              key={c.id}
                              href={c.href}
                              onClick={() => setIsMenuOpen(false)}
                              className="typography-p2 text-white/80 py-2"
                              style={{ textShadow: "none", filter: "none" }}
                            >
                              {c.label}
                            </Link>
                          ))}
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

