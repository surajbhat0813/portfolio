"use client";

import ScrollReveal from "../animations/ScrollReveal";
import { motion } from "framer-motion";

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string[];
}

const experiences: ExperienceItem[] = [
  {
    title: "Software Engineer",
    company: "Company Name",
    period: "2023 - Present",
    description: [
      "Developed and maintained web applications using modern frameworks",
      "Collaborated with cross-functional teams to deliver high-quality products",
      "Implemented best practices for code quality and performance optimization",
    ],
  },
  {
    title: "Junior Developer",
    company: "Previous Company",
    period: "2021 - 2023",
    description: [
      "Built responsive user interfaces with React and TypeScript",
      "Participated in agile development processes",
      "Contributed to open-source projects",
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
        <ScrollReveal delay={0.2}>
          <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-16 tracking-tight">
            Experience
          </h2>
        </ScrollReveal>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <ScrollReveal key={index} delay={0.3 + index * 0.2}>
              <motion.div
                className="border-l-2 border-gray-800 pl-8 pb-12 relative"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-white rounded-full" />
                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-semibold">{exp.title}</h3>
                  <p className="text-xl text-gray-400">{exp.company}</p>
                  <p className="text-sm text-gray-500 mb-4">{exp.period}</p>
                  <ul className="space-y-2 text-gray-300">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

