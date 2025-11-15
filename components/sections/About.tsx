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
              I'm a frontend developer with 2.5 years of experience building modern web
              applications. I specialize in creating responsive, performant user interfaces
              using React, Next.js, and Tailwind CSS.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.6}>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-400 leading-relaxed">
              I'm passionate about writing clean, maintainable code and creating seamless
              user experiences. I enjoy working with modern frontend technologies and
              staying up-to-date with the latest web development trends.
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

