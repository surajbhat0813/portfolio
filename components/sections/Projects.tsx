"use client";

import ScrollReveal from "../animations/ScrollReveal";
import ProjectItem from "./ProjectItem";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
}

export const projects: Project[] = [
  {
    title: "Project One",
    description:
      "A modern web application built with Next.js and TypeScript, featuring real-time updates and a beautiful user interface.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    title: "Project Two",
    description:
      "An innovative mobile-first design system that provides seamless user experiences across all devices.",
    technologies: ["React", "Framer Motion", "CSS"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    title: "Project Three",
    description:
      "A full-stack application with authentication, database integration, and API endpoints for data management.",
    technologies: ["Node.js", "PostgreSQL", "Express"],
    githubUrl: "https://github.com",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="min-h-screen flex items-center justify-center px-6 sm:px-8 lg:px-12 py-20"
    >
      <div className="max-w-6xl mx-auto w-full text-center">
        <ScrollReveal delay={0.2}>
          <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-16 tracking-tight">
            Projects
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.4}>
          <p className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto">
            A collection of projects I've built using modern web technologies
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
