"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollSectionProps {
  children: ReactNode;
  index: number;
  totalSections: number;
}

export default function ScrollSection({ children, index, totalSections }: ScrollSectionProps) {
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

      if (currentScrollY > prevScrollY.current) {
        setScrollDirection("forward");
      } else if (currentScrollY < prevScrollY.current) {
        setScrollDirection("backward");
      }
      prevScrollY.current = currentScrollY;

      setIsActive(currentScrollY >= sectionStart && currentScrollY < sectionEnd);
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

  const offset = scrollDirection === "forward" ? 80 : -80;

  const variants = {
    hidden: {
      opacity: 0,
      x: offset,
      scale: 0.97,
      filter: "blur(6px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
    exit: {
      opacity: 0,
      x: -offset,
      scale: 0.97,
      filter: "blur(6px)",
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      className="min-h-screen w-full fixed top-0 left-0 flex items-center justify-center"
      style={{
        zIndex: isActive ? 100 : totalSections - index,
        pointerEvents: isActive ? "auto" : "none",
      }}
      initial="hidden"
      animate={isActive ? "visible" : "exit"}
      variants={variants}
    >
      <div
        className="w-full h-full relative z-50"
        style={{ pointerEvents: isActive ? "auto" : "none" }}
      >
        {children}
      </div>
    </motion.section>
  );
}
