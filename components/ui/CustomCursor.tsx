"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [isMouse, setIsMouse] = useState(false);

  const dotX = useMotionValue(-200);
  const dotY = useMotionValue(-200);

  // Ring follows with spring lag — the "tracking" feel
  const ringX = useSpring(dotX, { stiffness: 120, damping: 18, mass: 0.4 });
  const ringY = useSpring(dotY, { stiffness: 120, damping: 18, mass: 0.4 });

  useEffect(() => {
    // Only show on pointer:fine devices (mouse/trackpad)
    const mq = window.matchMedia("(pointer: fine)");
    setIsMouse(mq.matches);
    if (!mq.matches) return;

    const onMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      setVisible(true);
      const el = e.target as HTMLElement;
      setHovering(!!el.closest('a, button, input, textarea, select, [role="button"]'));
    };

    const onDown = () => setClicking(true);
    const onUp   = () => setClicking(false);
    const onOut  = () => setVisible(false);
    const onIn   = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);
    document.addEventListener("mouseleave", onOut);
    document.addEventListener("mouseenter", onIn);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
      document.removeEventListener("mouseleave", onOut);
      document.removeEventListener("mouseenter", onIn);
    };
  }, [dotX, dotY]);

  if (!isMouse) return null;

  return (
    <>
      {/* ── Precise inner dot ───────────────────────────── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999]"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? 1 : 0, scale: clicking ? 0.4 : 1 }}
        transition={{ duration: 0.1 }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            backgroundColor: "var(--accent)",
            boxShadow: "0 0 10px rgba(0,245,255,1), 0 0 20px rgba(0,245,255,0.5)",
          }}
        />
      </motion.div>

      {/* ── Outer ring with spring lag ───────────────────── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99998]"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      >
        <motion.div
          animate={{
            width:  clicking ? 18 : hovering ? 50 : 34,
            height: clicking ? 18 : hovering ? 50 : 34,
            borderColor: hovering ? "var(--accent)" : "rgba(0,245,255,0.45)",
            backgroundColor: hovering ? "rgba(0,245,255,0.07)" : "transparent",
            boxShadow: hovering
              ? "0 0 14px rgba(0,245,255,0.55), inset 0 0 8px rgba(0,245,255,0.12)"
              : "0 0 5px rgba(0,245,255,0.2)",
          }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          style={{ borderRadius: "50%", border: "1.5px solid" }}
        />
      </motion.div>

      {/* ── Four crosshair tick marks (static, follow ring) ─ */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99997]"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? 0.5 : 0 }}
      >
        {/* Top */}
        <motion.div
          className="absolute"
          animate={{ height: hovering ? 10 : 7, top: hovering ? -22 : -16 }}
          transition={{ duration: 0.18 }}
          style={{ width: 1, left: "50%", translateX: "-50%", backgroundColor: "var(--accent)" }}
        />
        {/* Bottom */}
        <motion.div
          className="absolute"
          animate={{ height: hovering ? 10 : 7, bottom: hovering ? -22 : -16 }}
          transition={{ duration: 0.18 }}
          style={{ width: 1, left: "50%", translateX: "-50%", backgroundColor: "var(--accent)" }}
        />
        {/* Left */}
        <motion.div
          className="absolute"
          animate={{ width: hovering ? 10 : 7, left: hovering ? -22 : -16 }}
          transition={{ duration: 0.18 }}
          style={{ height: 1, top: "50%", translateY: "-50%", backgroundColor: "var(--accent)" }}
        />
        {/* Right */}
        <motion.div
          className="absolute"
          animate={{ width: hovering ? 10 : 7, right: hovering ? -22 : -16 }}
          transition={{ duration: 0.18 }}
          style={{ height: 1, top: "50%", translateY: "-50%", backgroundColor: "var(--accent)" }}
        />
      </motion.div>

      {/* ── Click ripple ────────────────────────────────── */}
      {clicking && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[99996]"
          style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
          initial={{ width: 10, height: 10, opacity: 0.8 }}
          animate={{ width: 60, height: 60, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              border: "1px solid var(--accent)",
            }}
          />
        </motion.div>
      )}
    </>
  );
}
