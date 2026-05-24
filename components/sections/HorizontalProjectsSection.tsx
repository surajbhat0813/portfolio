"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { featuredProjects } from "./Projects";
import type { Project } from "./Projects";
import HUDCorners from "../ui/HUDCorners";

interface Props {
  startIndex: number;
  numProjects: number;
  totalScrollUnits: number;
}

export default function HorizontalProjectsSection({
  startIndex,
  numProjects,
  totalScrollUnits,
}: Props) {
  const [activeIdx, setActiveIdx]   = useState(0);
  const [isVisible, setIsVisible]   = useState(false);
  const [vw, setVw]                 = useState(0);

  const xRaw = useMotionValue(0);
  const x    = useSpring(xRaw, { stiffness: 260, damping: 42, mass: 0.55 });

  // Keep vw updated on resize
  useEffect(() => {
    const update = () => setVw(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Map vertical scroll → horizontal carousel index
  useEffect(() => {
    if (!vw) return;

    const onScroll = () => {
      const vh      = window.innerHeight;
      const scrollY = window.scrollY;
      const start   = startIndex * vh;
      const end     = (startIndex + numProjects) * vh;

      const visible = scrollY >= start && scrollY < end;
      setIsVisible(visible);

      if (visible) {
        const idx = Math.min(
          numProjects - 1,
          Math.max(0, Math.floor((scrollY - start) / vh))
        );
        setActiveIdx(idx);
        xRaw.set(-idx * vw);
      }
    };

    let ticking = false;
    const throttled = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => { onScroll(); ticking = false; });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttled, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", throttled);
  }, [startIndex, numProjects, vw, xRaw]);

  return (
    <div
      className="fixed inset-0"
      style={{
        zIndex:        isVisible ? 100 : totalScrollUnits - startIndex,
        pointerEvents: isVisible ? "auto" : "none",
        opacity:       isVisible ? 1 : 0,
        transition:    "opacity 0.35s ease",
      }}
    >
      {/* ── Project counter ─────────────────────────── */}
      <div className="absolute top-24 left-8 z-20 pointer-events-none">
        <motion.span
          key={activeIdx}
          className="text-xs font-bold tracking-[0.35em] uppercase block"
          style={{ color: "var(--accent)" }}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {String(activeIdx + 1).padStart(2, "0")}&nbsp;/&nbsp;
          {String(numProjects).padStart(2, "0")}
        </motion.span>
      </div>

      {/* ── Vertical dot progress on the right ─────── */}
      <div className="absolute top-1/2 right-6 -translate-y-1/2 z-20 flex flex-col gap-3 pointer-events-none">
        {Array.from({ length: numProjects }).map((_, i) => (
          <motion.div
            key={i}
            className="rounded-full mx-auto"
            animate={{
              height:          i === activeIdx ? 28 : 8,
              width:           i === activeIdx ? 3  : 2,
              backgroundColor: i === activeIdx ? "var(--accent)" : "rgba(255,255,255,0.18)",
              boxShadow:       i === activeIdx ? "0 0 8px rgba(0,245,255,0.9)" : "none",
            }}
            transition={{ duration: 0.22 }}
          />
        ))}
      </div>

      {/* ── Scroll hint (first project only) ────────── */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
        animate={{ opacity: activeIdx === 0 ? 0.45 : 0 }}
        transition={{ duration: 0.4 }}
      >
        <span className="text-xs tracking-[0.25em] uppercase text-gray-600">
          Scroll to navigate
        </span>
        <motion.span
          style={{ color: "var(--accent)", fontSize: 14 }}
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          ↓
        </motion.span>
      </motion.div>

      {/* ── Horizontal carousel track ────────────────── */}
      <div className="w-screen h-screen overflow-hidden">
        <motion.div
          className="flex h-full"
          style={{ x, width: numProjects * (vw || 0) }}
        >
          {featuredProjects.map((project, i) => (
            <ProjectSlide
              key={project.title}
              project={project}
              index={i}
              isActive={i === activeIdx}
              vw={vw}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Deck-of-cards layout for multi-screenshot projects
// ─────────────────────────────────────────────────────
const FAN = [
  { rotate: -20, x: -6, y:  6, zIndex: 0, delay: 0.06 },
  { rotate:  -7, x: -2, y:  0, zIndex: 1, delay: 0.03 },
  { rotate:   7, x:  2, y:  0, zIndex: 2, delay: 0.0  },
  { rotate:  20, x:  6, y:  6, zIndex: 3, delay: 0.09 },
];

function ImageDeck({ images, title, isActive, labels }: { images: string[]; title: string; isActive: boolean; labels?: string[] }) {
  const getLabel = (i: number) => labels?.[i] ?? `Screen ${i + 1}`;
  const [hovered,  setHovered]  = useState<number | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [mounted,  setMounted]  = useState(false);
  const [fanned,   setFanned]   = useState(false);

  useEffect(() => setMounted(true), []);

  // Staggered fan-out when slide becomes active
  useEffect(() => {
    if (isActive) {
      const t = setTimeout(() => setFanned(true), 80);
      return () => clearTimeout(t);
    } else {
      setFanned(false);
      setHovered(null);
    }
  }, [isActive]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setExpanded(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* ── Fan deck ─────────────────────────────────────── */}
      <div className="relative w-full h-full flex items-center justify-center">
        {images.map((img, i) => {
          const fan   = FAN[i];
          const isHov = hovered === i;

          return (
            <motion.div
              key={i}
              className="absolute cursor-pointer"
              style={{
                width:    "76%",
                aspectRatio: "16/10",
                bottom:   "10%",
                left:     "12%",
                originX:  0.5,
                originY:  1.2,
                zIndex:   fan.zIndex,
                borderRadius: "10px",
                overflow: "hidden",
              }}
              initial={{ rotate: 0, x: 0, y: 40, opacity: 0, scale: 0.88 }}
              animate={fanned ? {
                rotate:    fan.rotate,
                x:         `${fan.x}%`,
                y:         isHov ? fan.y - 28 : fan.y,
                scale:     1,
                opacity:   1,
                boxShadow: isHov
                  ? "0 22px 55px rgba(0,0,0,0.8), 0 0 20px rgba(0,245,255,0.2)"
                  : "0 10px 36px rgba(0,0,0,0.65)",
              } : { rotate: 0, x: 0, y: 40, opacity: 0, scale: 0.88 }}
              transition={{
                type:      "spring",
                stiffness: 220,
                damping:   26,
                mass:      0.7,
                delay:     fanned ? fan.delay : 0,
                opacity:   { duration: 0.3, delay: fanned ? fan.delay : 0 },
              }}
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
              onClick={() => setExpanded(i)}
            >
              <img
                src={img}
                alt={`${title} – ${getLabel(i)}`}
                className="w-full h-full object-cover object-top select-none"
                draggable={false}
              />

              {/* Scanline texture */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.06) 3px,rgba(0,0,0,0.06) 4px)",
                }}
              />

              {/* Label chip — fades in on hover */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3 py-2 pointer-events-none"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, transparent 100%)" }}
                animate={{ opacity: isHov ? 1 : 0 }}
                transition={{ duration: 0.18 }}
              >
                <span className="text-[10px] tracking-[0.25em] uppercase text-white/70">
                  {getLabel(i)}
                </span>
                <span className="text-[10px] tracking-widest text-[var(--accent)]">
                  {i + 1} / {images.length}
                </span>
              </motion.div>

              {/* Cyan top-edge glow on hover */}
              <motion.div
                className="absolute inset-x-0 top-0 h-[2px] pointer-events-none"
                style={{ background: "var(--accent)", boxShadow: "0 0 12px rgba(0,245,255,0.9)" }}
                animate={{ scaleX: isHov ? 1 : 0, opacity: isHov ? 1 : 0 }}
                transition={{ duration: 0.22 }}
              />

              {/* Border */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  border:        isHov ? "1px solid rgba(0,245,255,0.5)" : "1px solid rgba(255,255,255,0.1)",
                  borderRadius:  "10px",
                  transition:    "border-color 0.2s",
                }}
              />
            </motion.div>
          );
        })}

        {/* Hint */}
        <motion.p
          className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.28em] uppercase text-gray-700 pointer-events-none select-none whitespace-nowrap"
          animate={{ opacity: fanned ? 1 : 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Hover &amp; click to explore
        </motion.p>
      </div>

      {/* ── Fullscreen overlay (portal — escapes transform stacking context) ── */}
      {mounted && createPortal(
        <AnimatePresence>
          {expanded !== null && (
            <motion.div
              className="fixed inset-0 flex flex-col items-center justify-center p-6 sm:p-10"
              style={{ zIndex: 9999, backgroundColor: "rgba(0,0,0,0.93)", backdropFilter: "blur(12px)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setExpanded(null)}
            >
              {/* Header label */}
              <motion.div
                className="flex items-center gap-3 mb-5"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.1 }}
              >
                <span className="text-xs tracking-[0.3em] uppercase text-gray-500">{title}</span>
                <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                <span className="text-xs tracking-[0.3em] uppercase" style={{ color: "var(--accent)" }}>
                  {getLabel(expanded)}
                </span>
              </motion.div>

              {/* Image */}
              <motion.div
                className="relative"
                style={{ maxWidth: "86vw", maxHeight: "78vh" }}
                initial={{ scale: 0.5, opacity: 0, rotate: FAN[expanded]?.rotate ?? 0, y: 30 }}
                animate={{ scale: 1,   opacity: 1, rotate: 0,                           y: 0  }}
                exit={{    scale: 0.5, opacity: 0, rotate: FAN[expanded]?.rotate ?? 0, y: 30  }}
                transition={{ type: "spring", stiffness: 250, damping: 26 }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={images[expanded]}
                  alt={`${title} – ${getLabel(expanded)}`}
                  style={{
                    maxHeight:  "78vh",
                    maxWidth:   "86vw",
                    display:    "block",
                    border:     "1px solid rgba(0,245,255,0.25)",
                    boxShadow:  "0 0 100px rgba(0,245,255,0.06), 0 30px 80px rgba(0,0,0,0.8)",
                    borderRadius: "10px",
                  }}
                />

                {/* Prev */}
                <motion.button
                  className="absolute -left-14 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border text-gray-400 hover:text-white"
                  style={{ borderColor: "rgba(255,255,255,0.12)" }}
                  whileHover={{ borderColor: "rgba(0,245,255,0.5)", color: "var(--accent)", scale: 1.1 }}
                  onClick={(e) => { e.stopPropagation(); setExpanded((expanded - 1 + images.length) % images.length); }}
                >‹</motion.button>

                {/* Next */}
                <motion.button
                  className="absolute -right-14 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border text-gray-400 hover:text-white"
                  style={{ borderColor: "rgba(255,255,255,0.12)" }}
                  whileHover={{ borderColor: "rgba(0,245,255,0.5)", color: "var(--accent)", scale: 1.1 }}
                  onClick={(e) => { e.stopPropagation(); setExpanded((expanded + 1) % images.length); }}
                >›</motion.button>
              </motion.div>

              {/* Dot nav */}
              <motion.div
                className="flex gap-2 mt-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.15 }}
                onClick={(e) => e.stopPropagation()}
              >
                {images.map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setExpanded(i)}
                    className="rounded-full"
                    animate={{
                      width:           i === expanded ? 22 : 6,
                      backgroundColor: i === expanded ? "var(--accent)" : "rgba(255,255,255,0.18)",
                      boxShadow:       i === expanded ? "0 0 10px rgba(0,245,255,0.9)" : "none",
                    }}
                    style={{ height: 6 }}
                    transition={{ duration: 0.2 }}
                  />
                ))}
              </motion.div>

              <motion.p
                className="mt-4 text-[11px] tracking-[0.3em] uppercase text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Esc or click outside to close
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────
// Individual project slide (full-width, full-height)
// ─────────────────────────────────────────────────────
function ProjectSlide({
  project,
  index,
  isActive,
  vw,
}: {
  project: Project;
  index: number;
  isActive: boolean;
  vw: number;
}) {
  const isEven = index % 2 === 0;
  const num    = String(index + 1).padStart(2, "0");

  // 3-D tilt
  const tiltRef = useRef<HTMLDivElement>(null);
  const rawX    = useMotionValue(0);
  const rawY    = useMotionValue(0);
  const shineX  = useMotionValue(50);
  const shineY  = useMotionValue(50);
  const rotX    = useSpring(rawX, { stiffness: 180, damping: 28, mass: 0.4 });
  const rotY    = useSpring(rawY, { stiffness: 180, damping: 28, mass: 0.4 });

  const shineStyle = useTransform(
    [shineX, shineY],
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(0,245,255,0.18) 0%, rgba(120,80,255,0.08) 40%, transparent 65%)`
  );

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltRef.current) return;
    const r = tiltRef.current.getBoundingClientRect();
    rawX.set(((e.clientY - r.top)  / r.height - 0.5) * -14);
    rawY.set(((e.clientX - r.left) / r.width  - 0.5) *  14);
    shineX.set(((e.clientX - r.left) / r.width)  * 100);
    shineY.set(((e.clientY - r.top)  / r.height) * 100);
  };
  const onMouseLeave = () => {
    rawX.set(0); rawY.set(0);
    shineX.set(50); shineY.set(50);
  };

  return (
    <div
      className="flex-shrink-0 h-full flex items-center justify-center px-8 sm:px-16 lg:px-20"
      style={{ width: vw }}
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Content */}
          <motion.div
            className={`space-y-6 ${!isEven ? "lg:order-2" : ""}`}
            animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -24 }}
            transition={{ duration: 0.45, delay: isActive ? 0.12 : 0 }}
          >
            <div className="flex items-center gap-3">
              <span
                className="text-xs font-bold tracking-[0.35em]"
                style={{ color: "var(--accent)" }}
              >
                PROJECT_{num}
              </span>
              <div
                className="flex-1 h-px"
                style={{ backgroundColor: "rgba(0,245,255,0.2)" }}
              />
            </div>

            <h3
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-none"
              style={{ letterSpacing: "0.05em" }}
            >
              {project.title}
            </h3>

            <p className="text-lg sm:text-xl text-gray-400 leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <motion.span
                  key={tech}
                  className="px-3 py-1.5 text-xs tracking-widest uppercase border"
                  style={{
                    borderColor:     "rgba(0,245,255,0.2)",
                    color:           "rgba(0,245,255,0.7)",
                    backgroundColor: "rgba(0,245,255,0.04)",
                  }}
                  whileHover={{
                    borderColor:     "var(--accent)",
                    color:           "var(--accent)",
                    backgroundColor: "rgba(0,245,255,0.1)",
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            <div className="flex gap-6 pt-2">
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm tracking-wider uppercase"
                  whileHover={{ x: 4 }}
                >
                  <Github size={16} /> View Code
                </motion.a>
              )}
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm tracking-wider uppercase"
                  style={{ color: "var(--accent)" }}
                  whileHover={{ x: 4 }}
                >
                  <ExternalLink size={16} /> Live Demo
                </motion.a>
              )}
            </div>
          </motion.div>

          {/* 3-D image card */}
          <motion.div
            className={isEven ? "" : "lg:order-1"}
            animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 24 }}
            transition={{ duration: 0.45, delay: isActive ? 0.18 : 0 }}
            style={{ perspective: "1000px" }}
          >
            <motion.div
              ref={tiltRef}
              className="relative w-full aspect-[4/3] group"
              style={{
                rotateX: project.images ? 0 : rotX,
                rotateY: project.images ? 0 : rotY,
                transformStyle: "preserve-3d",
                overflow: "visible",
              }}
              onMouseMove={project.images ? undefined : onMouseMove}
              onMouseLeave={project.images ? undefined : onMouseLeave}
              whileHover={project.images ? {} : { scale: 1.02 }}
            >
              {/* Card face */}
              <div
                className="w-full h-full relative"
                style={{
                  backgroundColor: project.images ? "transparent" : "rgba(0,245,255,0.03)",
                  border: project.images ? "none" : "1px solid rgba(0,245,255,0.15)",
                }}
              >
                {project.images && project.images.length > 0 ? (
                  <ImageDeck images={project.images} title={project.title} isActive={isActive} labels={project.imageLabels} />
                ) : project.imageUrl ? (
                  <>
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover object-top"
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 4px)",
                      }}
                    />
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                    <div
                      className="w-16 h-16 border flex items-center justify-center"
                      style={{ borderColor: "rgba(0,245,255,0.2)" }}
                    >
                      <span
                        className="text-3xl font-bold"
                        style={{ color: "rgba(0,245,255,0.3)" }}
                      >
                        {num}
                      </span>
                    </div>
                    <p className="text-xs tracking-[0.25em] uppercase text-gray-700">
                      Screenshot Coming Soon
                    </p>
                  </div>
                )}
                {/* Holographic shine */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: shineStyle }}
                />
              </div>

              <HUDCorners size={18} thickness={2} />

              {/* Hover glow border */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                style={{
                  boxShadow:
                    "inset 0 0 30px rgba(0,245,255,0.08), 0 0 30px rgba(0,245,255,0.12)",
                  border: "1px solid rgba(0,245,255,0.5)",
                }}
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
