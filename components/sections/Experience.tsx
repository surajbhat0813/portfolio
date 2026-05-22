"use client";

import { motion } from "framer-motion";
import ScrollReveal from "../animations/ScrollReveal";

interface Role {
  title: string;
  period: string;
  description: string[];
}

interface ExperienceItem {
  company: string;
  period: string;
  roles: Role[];
}

const experiences: ExperienceItem[] = [
  {
    company: "Cogneesol",
    period: "Aug 2023 – Present",
    roles: [
      {
        title: "Software Developer",
        period: "Oct 2023 – Present",
        description: [
          "Owned frontend for 4 production dashboards and portals using React.js and Next.js, improving team productivity by 30%.",
          "Built reusable, scalable UI components with Tailwind CSS, reducing future development time by 40%.",
          "Improved Lighthouse scores (Accessibility, Best Practices, SEO) by 10–20% through systematic UI refactoring.",
          "Delivered full frontend for ApniKheti e-commerce and Government Schemes Portal, serving thousands of farmers.",
        ],
      },
      {
        title: "Trainee",
        period: "Aug 2023 – Oct 2023",
        description: [
          "Completed structured training in modern frontend frameworks and contributed to early prototypes that improved team development velocity.",
        ],
      },
    ],
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="min-h-screen flex items-center justify-center px-6 sm:px-8 lg:px-12 py-20"
    >
      <div className="max-w-6xl mx-auto w-full">
        <ScrollReveal delay={0.1}>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs tracking-[0.3em] uppercase" style={{ color: "var(--accent)" }}>
              Work History
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: "rgba(0,245,255,0.15)" }} />
          </div>
          <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-16 tracking-tight">
            Experience
          </h2>
        </ScrollReveal>

        <div className="space-y-16">
          {experiences.map((exp, i) => (
            <ScrollReveal key={i} delay={0.25}>
              <div className="relative pl-10">
                {/* Vertical timeline line */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-px"
                  style={{ backgroundColor: "rgba(0,245,255,0.15)" }}
                />
                {/* Glowing node */}
                <div
                  className="absolute left-[-5px] top-2 w-[11px] h-[11px] rounded-full pulse-glow"
                  style={{ backgroundColor: "var(--accent)" }}
                />

                {/* Company header */}
                <div className="mb-10">
                  <div className="flex flex-wrap items-baseline gap-4 mb-1">
                    <h3 className="text-3xl sm:text-4xl font-bold">{exp.company}</h3>
                    <span
                      className="text-xs tracking-[0.2em] uppercase px-3 py-1 border"
                      style={{
                        color: "var(--accent)",
                        borderColor: "rgba(0,245,255,0.25)",
                        backgroundColor: "rgba(0,245,255,0.05)",
                      }}
                    >
                      {exp.period}
                    </span>
                  </div>
                </div>

                {/* Roles */}
                <div className="space-y-10">
                  {exp.roles.map((role, j) => (
                    <motion.div
                      key={j}
                      className="relative pl-6 border-l transition-all duration-300"
                      style={{ borderColor: "rgba(0,245,255,0.1)" }}
                      whileHover={{ borderColor: "rgba(0,245,255,0.4)", x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex flex-wrap items-baseline gap-3 mb-4">
                        <h4 className="text-xl sm:text-2xl font-semibold">{role.title}</h4>
                        <span className="text-xs text-gray-600 tracking-wider">{role.period}</span>
                      </div>
                      <ul className="space-y-2.5 text-gray-400">
                        {role.description.map((item, k) => (
                          <li key={k} className="flex items-start gap-3 leading-relaxed text-sm sm:text-base">
                            <span style={{ color: "var(--accent)", flexShrink: 0, marginTop: "0.35em" }}>›</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Award */}
        <ScrollReveal delay={0.5}>
          <motion.div
            className="mt-14 inline-flex items-center gap-4 px-6 py-4 border transition-all duration-300"
            style={{ borderColor: "rgba(0,245,255,0.2)", backgroundColor: "rgba(0,245,255,0.03)" }}
            whileHover={{ borderColor: "rgba(0,245,255,0.5)", backgroundColor: "rgba(0,245,255,0.07)" }}
          >
            <span
              className="text-2xl font-bold"
              style={{ color: "var(--accent)", textShadow: "0 0 12px rgba(0,245,255,0.6)" }}
            >
              ◆
            </span>
            <div>
              <p className="text-white font-semibold tracking-wide">Tech Wiz Award</p>
              <p className="text-gray-500 text-sm">Cogneesol — outstanding frontend performance</p>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
