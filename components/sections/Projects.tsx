"use client";

import ScrollReveal from "../animations/ScrollReveal";

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
}

export const featuredProjects: Project[] = [
  {
    title: "ApniKheti E-Commerce",
    description:
      "Full e-commerce platform for agricultural products serving farmers across India. Built complete frontend including product listings, cart management, checkout flow, category filters, and responsive design across all devices.",
    technologies: ["Next.js", "React.js", "Tailwind CSS", "REST APIs"],
    liveUrl: "https://shop.apnikheti.com",
    imageUrl: "/projects/apnikheti.jpg",
  },
  {
    title: "Argyle Analytics Dashboard",
    description:
      "Power BI-like data visualization dashboard for insurance analytics. Built 15+ interactive charts including donut charts, bar charts, line graphs, and geographic maps enabling faster business insights for the analytics team.",
    technologies: ["React.js", "Next.js", "amCharts", "Redux Toolkit", "Tailwind CSS"],
    imageUrl: "/projects/argyle.jpg",
  },
  {
    title: "XPT LandonVision",
    description:
      "Enterprise document automation platform processing 24,000+ insurance submissions. Built PDF extraction workflows, intelligent insured matching, and multi-step review pipelines — improving team productivity by 30%.",
    technologies: ["React.js", "Next.js", "Tailwind CSS", "Redux Toolkit"],
    imageUrl: "/projects/xpt.jpg",
  },
  {
    title: "Honey Trading Platform",
    description:
      "Frontend for a perpetual contracts crypto trading platform with automated strategies. Built live candlestick charts, position management tables, and strategy configuration interfaces for algorithmic trading.",
    technologies: ["React.js", "Next.js", "Tailwind CSS"],
    imageUrl: "/projects/honey.jpg",
  },
  {
    title: "TotalExpert Integration",
    description:
      "Data integration dashboard for syncing AE and TE objects via event-driven jobs. Built job monitoring with stats cards, version history tracking, and request/response inspection panels.",
    technologies: ["React.js", "Next.js", "Tailwind CSS", "REST APIs"],
    imageUrl: "/projects/totalexpert.jpg",
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
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16" style={{ backgroundColor: "rgba(0,245,255,0.3)" }} />
            <span className="text-xs tracking-[0.3em] uppercase" style={{ color: "var(--accent)" }}>
              Selected Work
            </span>
            <div className="h-px w-16" style={{ backgroundColor: "rgba(0,245,255,0.3)" }} />
          </div>
          <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-10 tracking-tight">
            Projects
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.4}>
          <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto">
            Production-ready applications across e-commerce, analytics, enterprise automation, and fintech
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
