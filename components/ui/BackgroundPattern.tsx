"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

// Circuit path definitions – sharp right-angle turns like PCB traces
const CIRCUIT_1 = "M -50,750 L 200,750 L 200,500 L 500,500 L 500,300 L 850,300 L 850,550 L 1200,550 L 1200,350 L 1600,350 L 1600,200 L 1970,200";
const CIRCUIT_2 = "M 1970,880 L 1700,880 L 1700,650 L 1400,650 L 1400,450 L 1050,450 L 1050,650 L 700,650 L 700,850 L 350,850 L 350,600 L -50,600";
const CIRCUIT_3 = "M 500,1090 L 500,800 L 800,800 L 800,600 L 1100,600 L 1100,400 L 1400,400 L 1400,180";
const CIRCUIT_4 = "M 1200,1090 L 1200,900 L 900,900 L 900,700 L 600,700 L 600,450 L 300,450 L 300,-10";

export default function BackgroundPattern() {
  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: 3 + Math.random() * 5,
        delay: Math.random() * 6,
        isCyan: i % 3 === 0,
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">

      {/* Dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(0,245,255,0.08) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          opacity: 0.7,
        }}
      />

      {/* Corner radial glows */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px]"
        style={{
          background: "radial-gradient(circle at top right, rgba(0,245,255,0.04) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px]"
        style={{
          background: "radial-gradient(circle at bottom left, rgba(0,245,255,0.03) 0%, transparent 60%)",
        }}
      />

      {/* SVG circuit lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-70"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="cg1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#00f5ff" stopOpacity="0" />
            <stop offset="40%"  stopColor="#00f5ff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#00f5ff" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="cg2" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%"   stopColor="#00f5ff" stopOpacity="0" />
            <stop offset="40%"  stopColor="#00f5ff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#00f5ff" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="cg3" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%"   stopColor="#00f5ff" stopOpacity="0" />
            <stop offset="50%"  stopColor="#00f5ff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00f5ff" stopOpacity="0.05" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Circuit trace 1 */}
        <motion.path
          d={CIRCUIT_1}
          fill="none"
          stroke="url(#cg1)"
          strokeWidth="1"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 4, ease: "easeInOut" }}
        />

        {/* Circuit trace 2 */}
        <motion.path
          d={CIRCUIT_2}
          fill="none"
          stroke="url(#cg2)"
          strokeWidth="1"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 5, delay: 0.6, ease: "easeInOut" }}
        />

        {/* Circuit trace 3 */}
        <motion.path
          d={CIRCUIT_3}
          fill="none"
          stroke="url(#cg3)"
          strokeWidth="0.7"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 3.5, delay: 1.2, ease: "easeInOut" }}
        />

        {/* Circuit trace 4 */}
        <motion.path
          d={CIRCUIT_4}
          fill="none"
          stroke="url(#cg3)"
          strokeWidth="0.7"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.4 }}
          transition={{ duration: 3, delay: 1.8, ease: "easeInOut" }}
        />

        {/* Junction nodes */}
        {[
          [200, 750], [200, 500], [500, 500], [500, 300], [850, 300],
          [850, 550], [1200, 550], [1200, 350], [1600, 350],
          [1700, 650], [1400, 650], [1400, 450], [1050, 450], [1050, 650],
        ].map(([cx, cy], i) => (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r="2.5"
            fill="#00f5ff"
            filter="url(#glow)"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0.6], scale: 1 }}
            transition={{ duration: 0.4, delay: 2 + i * 0.08 }}
          />
        ))}

        {/* Moving data packets */}
        <DataPacket path={CIRCUIT_1} duration={9} delay={3} />
        <DataPacket path={CIRCUIT_2} duration={12} delay={5} />
        <DataPacket path={CIRCUIT_3} duration={7} delay={6.5} />
      </svg>

      {/* Horizontal scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px z-10"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(0,245,255,0.5) 30%, rgba(0,245,255,0.8) 50%, rgba(0,245,255,0.5) 70%, transparent 100%)",
          boxShadow: "0 0 8px rgba(0,245,255,0.4)",
        }}
        initial={{ top: "-2px" }}
        animate={{ top: "100vh" }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
      />

      {/* ── Tron-style 3D perspective grid floor ─────── */}
      <div
        className="absolute bottom-0 left-0 right-0 overflow-hidden"
        style={{ height: "42%" }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,245,255,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,245,255,0.06) 1px, transparent 1px)
            `,
            backgroundSize: "65px 65px",
            transform: "perspective(400px) rotateX(75deg)",
            transformOrigin: "bottom center",
            maskImage: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 90%)",
            WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 90%)",
          }}
        />
      </div>

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.isCyan ? 3 : 2,
            height: p.isCyan ? 3 : 2,
            backgroundColor: p.isCyan ? "#00f5ff" : "rgba(255,255,255,0.4)",
            boxShadow: p.isCyan ? "0 0 6px rgba(0,245,255,0.8)" : "none",
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, p.isCyan ? 0.8 : 0.3, 0], scale: [0, 1, 0] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Moving dot along a circuit path
function DataPacket({ path, duration, delay }: { path: string; duration: number; delay: number }) {
  const id = `dp-${duration}-${delay}`;
  return (
    <>
      <style>{`
        @keyframes move-${id} { from { offset-distance: 0%; } to { offset-distance: 100%; } }
      `}</style>
      <circle
        r="3"
        fill="#00f5ff"
        style={{
          offsetPath: `path("${path}")`,
          animation: `move-${id} ${duration}s linear ${delay}s infinite`,
          filter: "drop-shadow(0 0 4px #00f5ff)",
        } as React.CSSProperties}
      />
      <circle
        r="2"
        fill="#00f5ff"
        style={{
          offsetPath: `path("${path}")`,
          animation: `move-${id} ${duration}s linear ${delay + 0.15}s infinite`,
          opacity: 0.5,
        } as React.CSSProperties}
      />
    </>
  );
}
