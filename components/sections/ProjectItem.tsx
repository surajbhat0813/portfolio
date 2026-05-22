"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import HUDCorners from "../ui/HUDCorners";

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
  const num = String(index + 1).padStart(2, "0");

  // ── 3D tilt state ──────────────────────────────────────
  const tiltRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const shineX = useMotionValue(50);
  const shineY = useMotionValue(50);

  const rotX = useSpring(rawX, { stiffness: 180, damping: 28, mass: 0.4 });
  const rotY = useSpring(rawY, { stiffness: 180, damping: 28, mass: 0.4 });

  // Holographic shine — radial gradient that follows mouse
  const shineStyle = useTransform(
    [shineX, shineY],
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(0,245,255,0.18) 0%, rgba(120,80,255,0.08) 40%, transparent 65%)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltRef.current) return;
    const r = tiltRef.current.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width;   // 0→1
    const ny = (e.clientY - r.top)  / r.height;  // 0→1
    rawX.set((ny - 0.5) * -14);   // tilt up/down
    rawY.set((nx - 0.5) *  14);   // tilt left/right
    shineX.set(nx * 100);
    shineY.set(ny * 100);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
    shineX.set(50);
    shineY.set(50);
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 sm:px-8 lg:px-12 py-20">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ── Content ──────────────────────────────────── */}
          <div className={isEven ? "lg:pr-12" : "lg:pl-12 lg:order-2"}>
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: isEven ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Project number */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold tracking-[0.3em]" style={{ color: "var(--accent)" }}>
                  PROJECT_{num}
                </span>
                <div className="flex-1 h-px" style={{ backgroundColor: "rgba(0,245,255,0.2)" }} />
              </div>

              <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-none" style={{ letterSpacing: "0.05em" }}>
                {project.title}
              </h3>

              <p className="text-lg sm:text-xl text-gray-400 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <motion.span
                    key={tech}
                    className="px-3 py-1.5 text-xs tracking-widest uppercase border transition-all duration-200"
                    style={{ borderColor: "rgba(0,245,255,0.2)", color: "rgba(0,245,255,0.7)", backgroundColor: "rgba(0,245,255,0.04)" }}
                    whileHover={{ borderColor: "var(--accent)", color: "var(--accent)", backgroundColor: "rgba(0,245,255,0.1)" }}
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
                    className="flex items-center gap-2 text-sm tracking-wider uppercase transition-colors"
                    style={{ color: "var(--accent)" }}
                    whileHover={{ x: 4 }}
                  >
                    <ExternalLink size={16} /> Live Demo
                  </motion.a>
                )}
              </div>
            </motion.div>
          </div>

          {/* ── 3D image card ─────────────────────────────── */}
          <div className={isEven ? "lg:pl-12" : "lg:pr-12 lg:order-1"}>
            <motion.div
              initial={{ opacity: 0, x: isEven ? 30 : -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ perspective: "1000px" }}
            >
              <motion.div
                ref={tiltRef}
                className="relative w-full aspect-[4/3] group"
                style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Card surface */}
                <div
                  className="w-full h-full overflow-hidden relative"
                  style={{
                    backgroundColor: "rgba(0,245,255,0.03)",
                    border: "1px solid rgba(0,245,255,0.15)",
                  }}
                >
                  {project.imageUrl ? (
                    <>
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover object-top"
                      />
                      {/* Scanline overlay */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 4px)",
                        }}
                      />
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                      <div
                        className="w-16 h-16 border flex items-center justify-center"
                        style={{ borderColor: "rgba(0,245,255,0.2)" }}
                      >
                        <span className="text-3xl font-bold" style={{ color: "rgba(0,245,255,0.3)" }}>
                          {num}
                        </span>
                      </div>
                      <p className="text-xs tracking-[0.25em] uppercase text-gray-700">
                        Screenshot Coming Soon
                      </p>
                    </div>
                  )}

                  {/* Holographic shine layer — follows mouse */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: shineStyle }}
                  />
                </div>

                {/* HUD corners */}
                <HUDCorners size={18} thickness={2} />

                {/* Hover glow border */}
                <motion.div
                  className="absolute inset-0 pointer-events-none transition-all duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  style={{
                    boxShadow: "inset 0 0 30px rgba(0,245,255,0.08), 0 0 30px rgba(0,245,255,0.12)",
                    border: "1px solid rgba(0,245,255,0.5)",
                  }}
                />

                {/* 3D floating shadow under the card */}
                <motion.div
                  className="absolute -inset-1 -z-10"
                  style={{
                    background: "rgba(0,245,255,0.05)",
                    filter: "blur(20px)",
                    transform: "translateZ(-20px)",
                  }}
                />
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
