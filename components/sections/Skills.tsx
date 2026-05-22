"use client";

import { motion } from "framer-motion";
import ScrollReveal from "../animations/ScrollReveal";

const skillCategories = [
  {
    category: "Frontend",
    skills: ["React.js", "Next.js", "JavaScript (ES6+)", "Tailwind CSS", "CSS3"],
  },
  {
    category: "State & Data",
    skills: ["Redux Toolkit", "REST APIs", "amCharts", "Data Visualization"],
  },
  {
    category: "Tools",
    skills: ["Git", "GitHub", "VS Code", "Postman", "Vercel"],
  },
  {
    category: "AI-Assisted Dev",
    skills: ["Cursor AI", "GitHub Copilot", "ChatGPT", "Claude AI"],
  },
  {
    category: "Architecture",
    skills: ["Component Architecture", "BFF Pattern", "Responsive Design", "Dashboard Dev"],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="min-h-screen flex items-center justify-center px-6 sm:px-8 lg:px-12 py-20"
    >
      <div className="max-w-6xl mx-auto w-full">
        <ScrollReveal delay={0.1}>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs tracking-[0.3em] uppercase" style={{ color: "var(--accent)" }}>
              Tech Stack
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: "rgba(0,245,255,0.15)" }} />
          </div>
          <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-16 tracking-tight">
            Skills
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((cat, ci) => (
            <ScrollReveal key={cat.category} delay={0.2 + ci * 0.08}>
              <div
                className="p-6 border transition-colors duration-300"
                style={{
                  borderColor: "rgba(0,245,255,0.1)",
                  backgroundColor: "rgba(0,245,255,0.02)",
                }}
              >
                {/* Category header */}
                <p
                  className="text-xs tracking-[0.25em] uppercase mb-5 font-semibold"
                  style={{ color: "var(--accent)" }}
                >
                  {cat.category}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, si) => (
                    <motion.span
                      key={skill}
                      className="px-3 py-1.5 text-sm border cursor-default transition-all duration-200"
                      style={{
                        borderColor: "rgba(255,255,255,0.1)",
                        color: "rgba(255,255,255,0.7)",
                      }}
                      whileHover={{
                        borderColor: "var(--accent)",
                        color: "#fff",
                        backgroundColor: "rgba(0,245,255,0.06)",
                      }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: ci * 0.05 + si * 0.04 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
