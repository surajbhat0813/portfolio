"use client";

import ScrollReveal from "../animations/ScrollReveal";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
}

interface ProjectItemProps {
  project: Project;
  index: number;
}

export default function ProjectItem({ project, index }: ProjectItemProps) {
  const isEven = index % 2 === 0;

  return (
    <section className="min-h-screen flex items-center justify-center px-6 sm:px-8 lg:px-12 py-20">
      <div className="max-w-7xl mx-auto w-full">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
            !isEven ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* Content Side */}
          <div className={isEven ? "lg:pr-12" : "lg:pl-12 lg:order-2"}>
            <ScrollReveal delay={0.2}>
              <div className="space-y-6">
                <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                  {project.title}
                </h3>
                <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed mb-8">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 text-sm border border-gray-700 text-gray-400 hover:border-gray-600 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-6">
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={20} />
                      <span className="text-lg">View Code</span>
                    </motion.a>
                  )}
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={20} />
                      <span className="text-lg">Live Demo</span>
                    </motion.a>
                  )}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Image Placeholder Side */}
          <div className={isEven ? "lg:pl-12" : "lg:pr-12 lg:order-1"}>
            <ScrollReveal delay={0.4}>
              <motion.div
                className="w-full h-[400px] sm:h-[500px] lg:h-[600px] border-2 border-gray-800 bg-gray-900/50 flex items-center justify-center relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-8">
                    <div className="w-24 h-24 border-2 border-gray-700 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <span className="text-gray-600 text-4xl">📷</span>
                    </div>
                    <p className="text-gray-500 text-sm">Project Screenshot</p>
                    <p className="text-gray-600 text-xs mt-2">Coming Soon</p>
                  </div>
                )}
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

