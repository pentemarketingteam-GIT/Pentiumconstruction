import { useMemo } from "react";

// Subtle ambient gold motes drifting over the dark canvas.
export default function Particles({ count = 18, className = "" }) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 6,
        dur: 7 + Math.random() * 8,
        op: 0.15 + Math.random() * 0.35,
      })),
    [count]
  );
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {dots.map((d) => (
        <span
          key={d.id}
          className="absolute rounded-full"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            background: "radial-gradient(circle, var(--pen-gold-2), transparent 70%)",
            opacity: d.op,
            animation: `pen-float ${d.dur}s ease-in-out ${d.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
