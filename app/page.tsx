"use client";

import { useRef } from "react";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects, { projects } from "@/components/sections/Projects";
import ProjectItem from "@/components/sections/ProjectItem";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import Navbar from "@/components/ui/Navbar";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import ScrollSection from "@/components/ui/ScrollSection";

// Calculate total sections: About, Experience, Projects Header, each Project, Skills, Contact
const baseSections = [
  { id: "about", component: About },
  { id: "experience", component: Experience },
  { id: "projects-header", component: Projects },
];

// Add individual project sections
const projectSections = projects.map((project, index) => ({
  id: `project-${index}`,
  component: () => <ProjectItem project={project} index={index} />,
}));

const endSections = [
  { id: "skills", component: Skills },
  { id: "contact", component: Contact },
];

const allSections = [...baseSections, ...projectSections, ...endSections];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <main ref={containerRef} className="relative">
      <Navbar />
      <ScrollIndicator />
      
      {/* Spacer divs for scroll height */}
      <div style={{ height: `${allSections.length * 100}vh` }} />
      
      {/* Fixed sections that transition on scroll */}
      {allSections.map((section, index) => {
        const SectionComponent = section.component;
        return (
          <ScrollSection
            key={section.id}
            index={index}
            totalSections={allSections.length}
          >
            <SectionComponent />
          </ScrollSection>
        );
      })}
    </main>
  );
}
