"use client";

import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects, { featuredProjects } from "@/components/sections/Projects";
import HorizontalProjectsSection from "@/components/sections/HorizontalProjectsSection";
import OtherProjects from "@/components/sections/OtherProjects";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import Navbar from "@/components/ui/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import ScrollSection from "@/components/ui/ScrollSection";
import BackgroundPattern from "@/components/ui/BackgroundPattern";

// ── Section layout ─────────────────────────────────────────────
// Index 0 : About
// Index 1 : Experience
// Index 2 : Projects header
// Index 3…(3+N-1) : Horizontal carousel  (N = featuredProjects.length)
// Index 3+N : OtherProjects
// Index 4+N : Skills
// Index 5+N : Contact
// ───────────────────────────────────────────────────────────────

const N               = featuredProjects.length;          // 5
const CAROUSEL_START  = 3;
const AFTER_START     = CAROUSEL_START + N;               // 8
const TOTAL           = CAROUSEL_START + N + 3;           // 11

const BEFORE_SECTIONS = [
  { id: "about",           component: About },
  { id: "experience",      component: Experience },
  { id: "projects-header", component: Projects },
];

const AFTER_SECTIONS = [
  { id: "other-projects", component: OtherProjects },
  { id: "skills",         component: Skills },
  { id: "contact",        component: Contact },
];

export default function Home() {
  return (
    <main className="relative">
      <CustomCursor />
      <BackgroundPattern />
      <Navbar />
      <ScrollIndicator />

      {/* Spacer that gives the page its total scroll height */}
      <div style={{ height: `${TOTAL * 100}vh` }} />

      {/* Sections before the project carousel */}
      {BEFORE_SECTIONS.map((s, i) => {
        const C = s.component;
        return (
          <ScrollSection key={s.id} index={i} totalSections={TOTAL}>
            <C />
          </ScrollSection>
        );
      })}

      {/* Horizontal project carousel — spans scroll indices 3 … (3+N-1) */}
      <HorizontalProjectsSection
        startIndex={CAROUSEL_START}
        numProjects={N}
        totalScrollUnits={TOTAL}
      />

      {/* Sections after the project carousel */}
      {AFTER_SECTIONS.map((s, i) => {
        const C = s.component;
        return (
          <ScrollSection
            key={s.id}
            index={AFTER_START + i}
            totalSections={TOTAL}
          >
            <C />
          </ScrollSection>
        );
      })}
    </main>
  );
}
