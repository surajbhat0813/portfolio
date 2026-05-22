"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import ScrollReveal from "../animations/ScrollReveal";
import HUDCorners from "../ui/HUDCorners";

interface OtherProject {
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
}

const otherProjects: OtherProject[] = [
  {
    title: "Government Schemes Portal",
    description:
      "Real-time portal listing agricultural govt schemes, viewed by thousands of farmers. CMS dashboard cut admin content update time by 50%.",
    technologies: ["Next.js", "React.js", "Tailwind CSS", "REST APIs"],
    liveUrl: "https://agrischemes.apnikheti.com",
  },
  {
    title: "Tricon Data Extraction",
    description:
      "Document processing platform with split-panel PDF viewer and AI-powered field extraction. Built review and approval flows for financial documents.",
    technologies: ["React.js", "Next.js", "Tailwind CSS"],
  },
  {
    title: "Data Mod Dashboard",
    description:
      "Data management dashboard using BFF architecture to streamline API communication, reduce over-fetching, and improve UI responsiveness.",
    technologies: ["React.js", "Next.js", "Redux Toolkit", "Tailwind CSS"],
  },
  {
    title: "Miden Blockchain Wallet",
    description:
      "Frontend for a Miden blockchain multisig wallet with complex transaction workflows simplified for non-technical users.",
    technologies: ["React.js", "Next.js", "TypeScript", "Web3"],
  },
];

export default function OtherProjects() {
  return (
    <section
      id="other-projects"
      className="min-h-screen flex items-center justify-center px-6 sm:px-8 lg:px-12 py-20"
    >
      <div className="max-w-6xl mx-auto w-full">
        <ScrollReveal delay={0.1}>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs tracking-[0.3em] uppercase" style={{ color: "var(--accent)" }}>
              More Work
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: "rgba(0,245,255,0.15)" }} />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-2 tracking-tight">Other Projects</h2>
          <p className="text-gray-600 text-sm tracking-wider mb-12">
            Additional production work shipped at Cogneesol &amp; freelance
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {otherProjects.map((project, i) => (
            <ScrollReveal key={project.title} delay={0.15 + i * 0.08}>
              <motion.div
                className="relative p-7 border flex flex-col justify-between h-full group transition-all duration-300"
                style={{
                  borderColor: "rgba(0,245,255,0.1)",
                  backgroundColor: "rgba(0,0,0,0.4)",
                }}
                whileHover={{
                  borderColor: "rgba(0,245,255,0.4)",
                  backgroundColor: "rgba(0,245,255,0.04)",
                  y: -3,
                }}
                transition={{ duration: 0.2 }}
              >
                <div>
                  {/* Header row */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span
                        className="text-xs tracking-[0.25em] uppercase mb-2 block"
                        style={{ color: "rgba(0,245,255,0.5)" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                    </div>
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-4 flex-shrink-0 transition-colors"
                        style={{ color: "rgba(0,245,255,0.4)" }}
                        whileHover={{ color: "var(--accent)", scale: 1.1 }}
                      >
                        <ExternalLink size={16} />
                      </motion.a>
                    )}
                  </div>

                  <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2.5 py-1 border"
                      style={{
                        borderColor: "rgba(0,245,255,0.12)",
                        color: "rgba(0,245,255,0.5)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* HUD corners — visible on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <HUDCorners size={12} thickness={1} animated={false} />
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
