"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", updateScrollProgress);
    updateScrollProgress();

    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  return (
    <div className="fixed right-4 sm:right-8 top-1/2 -translate-y-1/2 z-40">
      <div className="relative w-1 h-48 sm:h-64 bg-gray-800/50">
        <motion.div
          className="absolute top-0 left-0 w-full bg-white origin-top"
          style={{ height: `${scrollProgress}%` }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.1 }}
        />
      </div>
    </div>
  );
}

