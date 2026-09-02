import { useEffect, useRef } from "react";

/**
 * ParticleField — interactive mouse-responsive confetti field.
 *
 * Renders soft cloud blobs (CSS) + a lightweight canvas of floating square
 * "confetti" particles of varied sizes/colours/positions. Particles gently
 * drift and follow the cursor with eased parallax (deeper particles move more).
 * On touch / reduced-motion devices the cursor tracking is disabled and the
 * particles keep an ambient drift so the composition stays stable.
 */
const COLORS = [
  "#2A54E4", // blue
  "#39B7F5", // sky
  "#FFC22E", // yellow
  "#2BC183", // green
  "#FF5C79", // coral
  "#8B5CF6", // purple
  "#FFFFFF", // white
];

export default function ParticleField({ className = "", density = 1 }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const stateRef = useRef({
    particles: [],
    mouse: { x: 0, y: 0 },     // eased cursor offset from centre (-1..1)
    target: { x: 0, y: 0 },    // raw target offset from centre (-1..1)
    w: 0,
    h: 0,
    dpr: 1,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const S = stateRef.current;

    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const interactive = !isTouch && !prefersReduced;

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      S.dpr = Math.min(window.devicePixelRatio || 1, 2);
      S.w = rect.width;
      S.h = rect.height;
      canvas.width = Math.floor(rect.width * S.dpr);
      canvas.height = Math.floor(rect.height * S.dpr);
      ctx.setTransform(S.dpr, 0, 0, S.dpr, 0, 0);

      const area = rect.width * rect.height;
      const count = Math.max(
        14,
        Math.min(60, Math.round((area / 12000) * density))
      );
      S.particles = Array.from({ length: count }).map(() => {
        const depth = 0.25 + Math.random() * 0.75; // 0.25 (far) .. 1 (near)
        return {
          bx: Math.random(),            // base x (0..1)
          by: Math.random(),            // base y (0..1)
          size: 6 + depth * 16 + Math.random() * 6,
          color: COLORS[(Math.random() * COLORS.length) | 0],
          depth,
          rot: Math.random() * Math.PI,
          rotSpeed: (Math.random() - 0.5) * 0.008,
          phase: Math.random() * Math.PI * 2,
          driftAmp: 6 + Math.random() * 16,
          driftSpeed: 0.0004 + Math.random() * 0.0008,
          alpha: 0.55 + Math.random() * 0.4,
        };
      });
    };

    const onResize = () => build();

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;   // 0..1
      const py = (e.clientY - rect.top) / rect.height;   // 0..1
      S.target.x = (px - 0.5) * 2;                       // -1..1
      S.target.y = (py - 0.5) * 2;
    };
    const onLeave = () => {
      S.target.x = 0;
      S.target.y = 0;
    };

    let t = 0;
    const render = () => {
      t += 16;
      // ease current offset toward target
      S.mouse.x += (S.target.x - S.mouse.x) * 0.06;
      S.mouse.y += (S.target.y - S.mouse.y) * 0.06;

      ctx.clearRect(0, 0, S.w, S.h);
      const maxShift = Math.min(S.w, S.h) * 0.10; // parallax travel

      for (const p of S.particles) {
        p.rot += p.rotSpeed;
        const driftX = Math.sin(t * p.driftSpeed + p.phase) * p.driftAmp;
        const driftY = Math.cos(t * p.driftSpeed * 0.9 + p.phase) * p.driftAmp;
        const parX = S.mouse.x * maxShift * p.depth;
        const parY = S.mouse.y * maxShift * p.depth;

        const x = p.bx * S.w + driftX + parX;
        const y = p.by * S.h + driftY + parY;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        const s = p.size;
        const r = s * 0.28;
        // rounded square
        ctx.beginPath();
        ctx.moveTo(-s / 2 + r, -s / 2);
        ctx.arcTo(s / 2, -s / 2, s / 2, s / 2, r);
        ctx.arcTo(s / 2, s / 2, -s / 2, s / 2, r);
        ctx.arcTo(-s / 2, s / 2, -s / 2, -s / 2, r);
        ctx.arcTo(-s / 2, -s / 2, s / 2, -s / 2, r);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
      rafRef.current = requestAnimationFrame(render);
    };

    build();
    render();
    window.addEventListener("resize", onResize);
    if (interactive) {
      window.addEventListener("mousemove", onMove);
      canvas.addEventListener("mouseleave", onLeave);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [density]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {/* soft cloud-like graphic composition */}
      <div className="absolute -left-10 top-6 h-40 w-72 rounded-full bg-white/80 blur-2xl animate-sop-float-slow" />
      <div className="absolute right-4 top-16 h-32 w-56 rounded-full bg-white/70 blur-2xl animate-sop-float" />
      <div className="absolute bottom-6 left-1/3 h-36 w-80 rounded-full bg-white/60 blur-2xl animate-sop-float-slow" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
