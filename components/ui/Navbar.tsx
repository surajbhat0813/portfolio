"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { featuredProjects } from "@/components/sections/Projects";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

// Must mirror the layout in page.tsx
const N                    = featuredProjects.length;   // 5
const CAROUSEL_START       = 3;
const AFTER_START          = CAROUSEL_START + N;        // 8
const PROJECTS_START       = 2;                         // Projects header
const OTHER_PROJECTS_INDEX = AFTER_START;               // 8
const SKILLS_INDEX         = AFTER_START + 1;           // 9
const CONTACT_INDEX        = AFTER_START + 2;           // 10

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("about");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const sectionIndex = Math.floor((scrollY + viewportHeight * 0.3) / viewportHeight);

      let activeSectionId = "";

      if (sectionIndex === 0) {
        activeSectionId = "about";
      } else if (sectionIndex === 1) {
        activeSectionId = "experience";
      } else if (sectionIndex >= PROJECTS_START && sectionIndex <= OTHER_PROJECTS_INDEX) {
        activeSectionId = "projects";
      } else if (sectionIndex === SKILLS_INDEX) {
        activeSectionId = "skills";
      } else if (sectionIndex >= CONTACT_INDEX) {
        activeSectionId = "contact";
      }

      setActiveSection(activeSectionId);
    };

    handleScroll();

    let ticking = false;
    const optimizedScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", optimizedScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", optimizedScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleNavClick = (href: string) => {
    const viewportHeight = window.innerHeight;

    const scrollMap: Record<string, number> = {
      "#about": 0,
      "#experience": 1 * viewportHeight,
      "#projects": 2 * viewportHeight,
      "#skills": SKILLS_INDEX * viewportHeight,
      "#contact": CONTACT_INDEX * viewportHeight,
    };

    const target = scrollMap[href];
    if (target !== undefined) {
      window.scrollTo({ top: target, behavior: "smooth" });
    }

    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-6 right-0 z-[200] transition-all duration-500 ${
        isScrolled
          ? "bg-black/85 backdrop-blur-md"
          : "bg-transparent"
      }`}
      style={isScrolled ? { borderBottom: "1px solid rgba(0,245,255,0.1)" } : {}}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <motion.a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#about");
            }}
            className="text-xl font-bold tracking-wider"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {`<dev>`}
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`relative text-base font-semibold tracking-wider uppercase transition-colors ${
                  activeSection === item.href.substring(1)
                    ? ""
                    : "text-gray-400 hover:text-white"
                }`}
                style={
                  activeSection === item.href.substring(1)
                    ? { color: "var(--accent)", textShadow: "0 0 10px rgba(0,245,255,0.5)" }
                    : {}
                }
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
                {activeSection === item.href.substring(1) && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5"
                    style={{
                      background: "var(--accent)",
                      boxShadow: "0 0 8px rgba(0,245,255,0.8), 0 0 20px rgba(0,245,255,0.4)",
                    }}
                    initial={false}
                    transition={{ type: "spring", stiffness: 380, damping: 30, mass: 0.5 }}
                  />
                )}
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-gray-800"
        >
          <div className="px-6 py-4 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`block text-sm font-medium transition-colors ${
                  activeSection === item.href.substring(1)
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
