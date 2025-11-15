"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollSectionProps {
  children: ReactNode;
  index: number;
  totalSections: number;
}

export default function ScrollSection({
  children,
  index,
  totalSections,
}: ScrollSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(index === 0);
  const [scrollDirection, setScrollDirection] = useState<"forward" | "backward">("forward");
  const prevScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const sectionStart = index * viewportHeight;
      const sectionEnd = (index + 1) * viewportHeight;
      
      // Determine scroll direction
      if (currentScrollY > prevScrollY.current) {
        setScrollDirection("forward");
      } else if (currentScrollY < prevScrollY.current) {
        setScrollDirection("backward");
      }
      prevScrollY.current = currentScrollY;

      // Check if this section should be active (when scroll is near the section center)
      const isInView = currentScrollY >= sectionStart && 
                       currentScrollY < sectionEnd;
      setIsActive(isInView);
    };

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
    handleScroll();
    return () => window.removeEventListener("scroll", optimizedScroll);
  }, [index]);

  // Animation variants
  const variants = {
    hidden: {
      opacity: 0,
      x: scrollDirection === "forward" ? 150 : -150,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.9,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
    exit: {
      opacity: 0,
      x: scrollDirection === "forward" ? -150 : 150,
      scale: 0.9,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      className="min-h-screen w-full fixed top-0 left-0 flex items-center justify-center"
      style={{ 
        zIndex: isActive ? 100 : totalSections - index,
        pointerEvents: isActive ? "auto" : "none"
      }}
      initial="hidden"
      animate={isActive ? "visible" : "exit"}
      variants={variants}
    >
      <div className="w-full h-full relative z-50" style={{ pointerEvents: isActive ? "auto" : "none" }}>
        {children}
      </div>
    </motion.section>
  );
}

