"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const stats = [
  { value: "2.5+", label: "Years Experience" },
  { value: "9+",   label: "Projects Shipped" },
  { value: "4",    label: "Dashboards Built" },
  { value: "30%",  label: "Productivity Gain" },
];

export default function About() {
  // Mouse parallax — toned down range to avoid clipping
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const cfg = { stiffness: 50, damping: 20, mass: 1 };
  const sX = useSpring(mouseX, cfg);
  const sY = useSpring(mouseY, cfg);

  const headingX = useTransform(sX, [-1, 1], [-8, 8]);
  const headingY = useTransform(sY, [-1, 1], [-5, 5]);
  const descX    = useTransform(sX, [-1, 1], [-4, 4]);
  const descY    = useTransform(sY, [-1, 1], [-3, 3]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth  - 0.5) * 2);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center px-8 sm:px-12 lg:px-16 pt-28 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full">

        {/* Status badge */}
        <motion.div
          className="flex items-center gap-3 mb-10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <motion.span
            className="inline-block w-2 h-2 rounded-full"
            style={{ backgroundColor: "var(--accent)" }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-xs tracking-[0.35em] uppercase" style={{ color: "var(--accent)" }}>
            Available for new roles
          </span>
        </motion.div>

        {/* Hero headline — parallax layer 1 */}
        <motion.div
          style={{ x: headingX, y: headingY }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-8"
        >
          <p className="text-xl sm:text-2xl text-gray-500 font-normal tracking-[0.15em] mb-3 uppercase">
            Hello, I&apos;m
          </p>
          <h1
            className="glitch-text text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] font-bold leading-none tracking-tight"
            data-text="Suraj Bhat"
          >
            Suraj Bhat
          </h1>
        </motion.div>

        {/* Accent divider */}
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{ originX: 0 }}
        >
          <div className="h-px w-12" style={{ backgroundColor: "var(--accent)" }} />
          <span className="text-xs tracking-[0.3em] uppercase text-gray-600">
            Frontend Developer
          </span>
          <div className="h-px flex-1 max-w-24" style={{ backgroundColor: "rgba(0,245,255,0.15)" }} />
        </motion.div>

        {/* Description — parallax layer 2 */}
        <motion.div
          style={{ x: descX, y: descY }}
          className="mb-12 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-3">
            Specialising in{" "}
            <span style={{ color: "var(--accent)" }}>React.js</span> &amp;{" "}
            <span style={{ color: "var(--accent)" }}>Next.js</span>
            {" "}— building responsive dashboards, e-commerce platforms, and data-driven interfaces.
          </p>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Strong in API integration, reusable components, performance optimisation, and scalable production interfaces.
          </p>
        </motion.div>

        {/* Stats — clean, no boxes, just numbers */}
        <motion.div
          className="flex flex-wrap gap-x-10 gap-y-6 mb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.75 + i * 0.08 }}
            >
              <span
                className="text-3xl sm:text-4xl font-bold leading-none mb-1.5"
                style={{
                  color: "var(--accent)",
                  textShadow: "0 0 20px rgba(0,245,255,0.4)",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {stat.value}
              </span>
              <span className="text-xs text-gray-500 tracking-[0.2em] uppercase whitespace-nowrap">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap items-center gap-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.95 }}
        >
          <motion.a
            href="#contact"
            className="relative inline-flex items-center px-8 py-3.5 text-sm font-medium tracking-widest uppercase overflow-hidden group"
            style={{ border: "1px solid var(--accent)", color: "var(--accent)" }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <motion.span
              className="absolute inset-0"
              style={{ backgroundColor: "var(--accent)" }}
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.22 }}
            />
            <span className="relative group-hover:text-black transition-colors duration-200 z-10">
              Get in Touch
            </span>
          </motion.a>

          <motion.a
            href="#projects"
            className="flex items-center gap-2 text-sm tracking-widest uppercase text-gray-500 hover:text-white transition-colors"
            whileHover={{ x: 5 }}
          >
            View Work
            <span style={{ color: "var(--accent)" }}>→</span>
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}
