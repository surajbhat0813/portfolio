"use client";

import ScrollReveal from "../animations/ScrollReveal";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center px-6 sm:px-8 lg:px-12 pt-32 sm:pt-40"
    >
      <div className="max-w-6xl mx-auto w-full">
        <ScrollReveal delay={0.2}>
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-12 tracking-tight leading-none"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Hello,
            <br />
            I'm Suraj Bhat
          </motion.h1>
        </ScrollReveal>

        <div className="space-y-8 max-w-3xl mt-16">
          <ScrollReveal delay={0.4}>
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 leading-relaxed">
              I'm a passionate developer who loves creating beautiful and functional
              digital experiences. With a focus on clean code and user-centered design,
              I bring ideas to life through technology.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.6}>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-400 leading-relaxed">
              My journey in software development has been driven by curiosity and a
              constant desire to learn and grow. I enjoy working on challenging projects
              that push the boundaries of what's possible.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.8}>
            <motion.div
              className="pt-8"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="#contact"
                className="inline-block px-8 py-4 border border-white text-white font-medium hover:bg-white hover:text-black transition-all duration-300"
              >
                Get in Touch
              </a>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

