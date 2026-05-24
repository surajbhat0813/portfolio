"use client";

import { motion } from "framer-motion";
import ScrollReveal from "../animations/ScrollReveal";

const roles = [
  {
    title: "Software Developer",
    period: "Oct 2023 – Present",
    bullets: [
      "Owned frontend for 4 production dashboards and portals using React.js and Next.js, improving team productivity by 30%.",
      "Built reusable, scalable UI components with Tailwind CSS, reducing future development time by 40%.",
      "Improved Lighthouse scores (Accessibility, Best Practices, SEO) by 10–20% through systematic UI refactoring.",
      "Delivered full frontend for ApniKheti e-commerce and Government Schemes Portal, serving thousands of farmers.",
    ],
  },
  {
    title: "Trainee",
    period: "Aug 2023 – Oct 2023",
    bullets: [
      "Completed structured training in modern frontend frameworks and contributed to early prototypes that improved team development velocity.",
    ],
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="min-h-screen flex items-center justify-center px-6 sm:px-10 lg:px-16 py-20"
    >
      <div className="max-w-6xl mx-auto w-full">

        {/* Section label */}
        <ScrollReveal delay={0.1}>
          <div className="flex items-center gap-4 mb-3">
            <span className="text-xs tracking-[0.35em] uppercase" style={{ color: "var(--accent)" }}>
              Work History
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: "rgba(0,245,255,0.12)" }} />
          </div>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-10 tracking-tight">
            Experience
          </h2>
        </ScrollReveal>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 lg:gap-14">

          {/* Left — company info */}
          <ScrollReveal delay={0.25}>
            <div className="lg:pt-1">
              {/* Glowing dot + company name */}
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0 pulse-glow"
                  style={{ backgroundColor: "var(--accent)" }}
                />
                <span className="text-2xl font-bold tracking-wide">Cogneesol</span>
              </div>

              {/* Total tenure badge */}
              <span
                className="inline-block text-xs tracking-[0.2em] uppercase px-3 py-1 border mb-6"
                style={{
                  color: "var(--accent)",
                  borderColor: "rgba(0,245,255,0.25)",
                  backgroundColor: "rgba(0,245,255,0.05)",
                }}
              >
                Aug 2023 – Present
              </span>

              {/* Award */}
              <motion.div
                className="flex items-start gap-3 px-4 py-3 border"
                style={{ borderColor: "rgba(0,245,255,0.2)", backgroundColor: "rgba(0,245,255,0.03)" }}
                whileHover={{ borderColor: "rgba(0,245,255,0.5)", backgroundColor: "rgba(0,245,255,0.07)" }}
                transition={{ duration: 0.2 }}
              >
                <span
                  className="text-lg mt-0.5 flex-shrink-0"
                  style={{ color: "var(--accent)", textShadow: "0 0 10px rgba(0,245,255,0.6)" }}
                >
                  ◆
                </span>
                <div>
                  <p className="text-white text-sm font-semibold leading-tight">Tech Wiz Award</p>
                  <p className="text-gray-500 text-xs mt-0.5 leading-snug">Outstanding frontend performance</p>
                </div>
              </motion.div>
            </div>
          </ScrollReveal>

          {/* Right — roles */}
          <div
            className="relative pl-6 border-l space-y-8"
            style={{ borderColor: "rgba(0,245,255,0.12)" }}
          >
            {roles.map((role, i) => (
              <ScrollReveal key={i} delay={0.35 + i * 0.12}>
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  {/* Timeline node */}
                  <div
                    className="absolute -left-[1.65rem] top-1.5 w-2.5 h-2.5 rounded-full border-2"
                    style={{
                      backgroundColor: i === 0 ? "var(--accent)" : "transparent",
                      borderColor: "var(--accent)",
                      boxShadow: i === 0 ? "0 0 8px rgba(0,245,255,0.5)" : "none",
                    }}
                  />

                  {/* Role header */}
                  <div className="flex flex-wrap items-baseline gap-3 mb-3">
                    <h4 className="text-lg sm:text-xl font-semibold tracking-wide">{role.title}</h4>
                    <span className="text-xs text-gray-600 tracking-wider uppercase">{role.period}</span>
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-2">
                    {role.bullets.map((item, k) => (
                      <li
                        key={k}
                        className="flex items-start gap-3 text-sm text-gray-400 leading-relaxed"
                      >
                        <span
                          className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full"
                          style={{ backgroundColor: "var(--accent)" }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
