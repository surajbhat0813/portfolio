"use client";

import { useRef } from "react";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import Navbar from "@/components/ui/Navbar";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import ScrollSection from "@/components/ui/ScrollSection";

const sections = [
  { id: "about", component: About },
  { id: "experience", component: Experience },
  { id: "projects", component: Projects },
  { id: "skills", component: Skills },
  { id: "contact", component: Contact },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <main ref={containerRef} className="relative">
      <Navbar />
      <ScrollIndicator />
      
      {/* Spacer divs for scroll height */}
      <div style={{ height: `${sections.length * 100}vh` }} />
      
      {/* Fixed sections that transition on scroll */}
      {sections.map((section, index) => {
        const SectionComponent = section.component;
        return (
          <ScrollSection
            key={section.id}
            index={index}
            totalSections={sections.length}
          >
            <SectionComponent />
          </ScrollSection>
        );
      })}
    </main>
  );
}
