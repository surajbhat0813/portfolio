"use client";

import { motion } from "framer-motion";

interface HUDCornersProps {
  size?: number;
  thickness?: number;
  color?: string;
  animated?: boolean;
}

export default function HUDCorners({
  size = 20,
  thickness = 2,
  color = "var(--accent)",
  animated = true,
}: HUDCornersProps) {
  const style = {
    width: size,
    height: size,
    borderColor: color,
    borderWidth: thickness,
  };

  const corners = [
    { top: 0, left: 0, borderRight: "none", borderBottom: "none" },
    { top: 0, right: 0, borderLeft: "none", borderBottom: "none" },
    { bottom: 0, left: 0, borderRight: "none", borderTop: "none" },
    { bottom: 0, right: 0, borderLeft: "none", borderTop: "none" },
  ];

  return (
    <>
      {corners.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ ...style, ...pos, borderStyle: "solid" }}
          initial={animated ? { opacity: 0, scale: 0.5 } : undefined}
          animate={animated ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 0.4, delay: i * 0.06 }}
        />
      ))}
    </>
  );
}
