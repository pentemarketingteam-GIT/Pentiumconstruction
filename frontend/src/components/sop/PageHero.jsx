import ParticleField from "@/components/sop/ParticleField";
import { Eyebrow } from "@/components/sop/Primitives";

const BG = {
  blue: "from-sop-blue to-sop-purple",
  coral: "from-sop-coral to-sop-purple",
  green: "from-sop-green to-sop-blue",
  yellow: "from-sop-yellow to-sop-coral",
  sky: "from-sop-sky to-sop-blue",
  purple: "from-sop-purple to-sop-blue",
};

/**
 * Compact interior page hero with the interactive particle field baked in.
 */
export default function PageHero({ eyebrow, title, subtitle, color = "blue", children }) {
  return (
    <section className="relative overflow-hidden bg-white pb-14 pt-10">
      <div className="sop-container">
        <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${BG[color]} px-6 py-14 text-white shadow-play-lg sm:px-12 sm:py-16`}>
          <ParticleField density={0.7} />
          <div className="relative z-10 max-w-3xl">
            {eyebrow && (
              <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-700 uppercase tracking-wide font-display ring-1 ring-white/30">
                {eyebrow}
              </span>
            )}
            <h1 className="mt-4 font-display text-4xl font-700 leading-[1.05] text-balance sm:text-5xl">
              {title}
            </h1>
            {subtitle && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/90">{subtitle}</p>}
            {children && <div className="mt-7 flex flex-wrap gap-3">{children}</div>}
          </div>
        </div>
      </div>
    </section>
  );
}
