"use client";

import { motion } from "framer-motion";
import AnimatedDot from "./AnimatedDot";

export default function BackgroundPattern() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Animated curved lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-40"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.45" />
          </linearGradient>
          <radialGradient id="dotGradient">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
            <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.3" />
          </radialGradient>
        </defs>

        {/* Smooth flowing curved lines - Samsung Galaxy style */}
        {/* Horizontal smooth curve */}
        <motion.path
          d="M -100,700 C 300,650 600,750 900,800 C 1200,850 1500,900 2020,850"
          fill="none"
          stroke="url(#gradient1)"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 4, ease: "easeInOut" }}
        />

        {/* Diagonal smooth curve */}
        <motion.path
          d="M -100,200 C 400,500 800,800 1200,1000 C 1600,1200 1900,1300 2020,1380"
          fill="none"
          stroke="url(#gradient2)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 5, delay: 0.3, ease: "easeInOut" }}
        />

        {/* Animated dots with trails moving along paths */}
        <AnimatedDot
          id="1"
          path="M -100,700 C 300,650 600,750 900,800 C 1200,850 1500,900 2020,850"
          duration={8}
          delay={0}
          trailCount={4}
          size={4}
        />
        <AnimatedDot
          id="2"
          path="M -100,200 C 400,500 800,800 1200,1000 C 1600,1200 1900,1300 2020,1380"
          duration={15}
          delay={3}
          trailCount={4}
          size={4}
        />
      </svg>

      {/* Subtle animated dots/particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.3, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}

