"use client";

import { useEffect, useState } from "react";

interface AnimatedDotProps {
  path: string;
  duration: number;
  delay?: number;
  trailCount?: number;
  size?: number;
  id: string;
}

export default function AnimatedDot({
  path,
  duration,
  delay = 0,
  trailCount = 4,
  size = 4,
  id,
}: AnimatedDotProps) {
  const [animationId, setAnimationId] = useState(`dot-${id}`);

  useEffect(() => {
    // Inject CSS keyframe animation
    const styleId = `dot-animation-${id}`;
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        @keyframes moveDot-${id} {
          from {
            offset-distance: 0%;
          }
          to {
            offset-distance: 100%;
          }
        }
      `;
      document.head.appendChild(style);
    }

    return () => {
      const style = document.getElementById(styleId);
      if (style) style.remove();
    };
  }, [id]);

  return (
    <>
      {/* Main dot */}
      <circle
        r={size}
        fill="url(#dotGradient)"
        style={{
          offsetPath: `path("${path}")`,
          animation: `moveDot-${id} ${duration}s linear infinite`,
          animationDelay: `${delay}s`,
        } as React.CSSProperties}
      />
      {/* Trail dots */}
      {Array.from({ length: trailCount }).map((_, i) => (
        <circle
          key={i}
          r={size - (i + 1) * 0.5}
          fill="url(#dotGradient)"
          style={{
            offsetPath: `path("${path}")`,
            animation: `moveDot-${id} ${duration}s linear infinite`,
            animationDelay: `${delay + (i + 1) * 0.1}s`,
            opacity: 0.8 - i * 0.15,
          } as React.CSSProperties}
        />
      ))}
    </>
  );
}

