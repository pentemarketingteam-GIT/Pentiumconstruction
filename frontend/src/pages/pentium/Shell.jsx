import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Phone, MessageCircle, ShieldCheck } from "lucide-react";
import { BRAND, STATS, PROJECTS, HERO_IMG } from "@/lib/pentium";
import Particles from "@/components/pentium/Particles";
import EnquiryForm from "@/components/pentium/EnquiryForm";
import ThemeToggle from "@/components/pentium/ThemeToggle";
import { PentiumThemeProvider } from "@/lib/PentiumTheme";

const tickerItems = [
  "Harmony Heights — 45% Complete",
  "Spring Green Villas, Perinthalmanna — Ongoing",
  "RERA Certified — Every Project",
  "Tranquil Vertical Home — Nearing Completion",
  "Eternia Vertical Homes — Delivered",
];

// fixed light colours for text sitting over the dark hero image (both themes)
const HERO_INK = "#f6f1e6";
const HERO_GOLD = "#e6cf98";
const HERO_MUTE = "rgba(246,241,230,0.82)";

export default function Shell() {
  return (
    <PentiumThemeProvider>
      <div className="min-h-screen bg-pen-mesh" style={{ color: "var(--pen-ink)" }}>
        <header className="sticky top-0 z-40 flex h-[68px] items-center justify-between px-5 sm:px-10" style={{ background: "var(--pen-bg-top)", backdropFilter: "blur(16px)", borderBottom: "1px solid var(--pen-border)" }}>
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-xl font-display text-xl" style={{ background: "linear-gradient(135deg, var(--pen-gold), var(--pen-gold-deep))", color: "#fff" }}>P</span>
            <span className="font-display text-lg" style={{ color: "var(--pen-ink)" }}>Pentium <span style={{ color: "var(--pen-gold-2)" }}>Constructions</span></span>
          </div>
          <div className="flex items-center gap-2">
            <a href={BRAND.phoneHref} className="hidden text-sm sm:inline" style={{ color: "var(--pen-fg-2)" }}>{BRAND.phone}</a>
            <ThemeToggle />
            <Link to="/advisor" className="pen-btn-gold text-sm"><Sparkles className="h-4 w-4" /> Home Advisor</Link>
          </div>
        </header>

        {/* hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img src={HERO_IMG} alt="" className="h-full w-full object-cover" onError={(e) => { e.currentTarget.style.display = "none"; }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(11,14,19,0.94) 0%, rgba(11,14,19,0.82) 45%, rgba(11,14,19,0.5) 100%)" }} />
          </div>
          <Particles count={16} />
          <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
            <div>
              <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ border: "1px solid rgba(230,207,152,0.35)", background: "rgba(255,255,255,0.06)", color: HERO_GOLD }}>
                <ShieldCheck className="h-3.5 w-3.5" /> Premium Residential · Calicut, Kerala
              </motion.span>
              <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-5 font-display text-5xl leading-[1.05] sm:text-6xl" style={{ color: HERO_INK }}>
                Homes built to <span className="pen-serif" style={{ color: HERO_GOLD }}>last for generations</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }} className="mt-5 max-w-xl text-lg" style={{ color: HERO_MUTE }}>
                {BRAND.tagline} Three decades of precision engineering, climate-responsive design and premium apartments &amp; villas across Kerala.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }} className="mt-8 flex flex-wrap gap-3">
                <Link to="/advisor" className="pen-btn-gold"><Sparkles className="h-4 w-4" /> Meet your Home Advisor</Link>
                <a href={BRAND.phoneHref} className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-display font-semibold" style={{ border: "1px solid rgba(246,241,230,0.35)", color: HERO_INK }}><Phone className="h-4 w-4" /> Call us</a>
                <a href={BRAND.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-display font-semibold" style={{ border: "1px solid rgba(246,241,230,0.35)", color: HERO_INK }}><MessageCircle className="h-4 w-4" /> WhatsApp</a>
              </motion.div>
              <div className="mt-12 grid max-w-xl grid-cols-4 gap-3">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <p className="font-display text-2xl sm:text-3xl" style={{ color: HERO_GOLD }}>{s.noPlus ? s.value : s.value.toLocaleString()}{s.suffix}</p>
                    <p className="mt-0.5 text-[11px]" style={{ color: HERO_MUTE }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:block">
              <EnquiryForm source="shell_hero" heading="Enquire about your future home" />
            </div>
          </div>

          <div className="relative z-10 overflow-hidden py-3" style={{ borderTop: "1px solid rgba(230,207,152,0.25)", borderBottom: "1px solid rgba(230,207,152,0.25)", background: "rgba(11,14,19,0.55)" }}>
            <div className="flex whitespace-nowrap" style={{ animation: "pen-marquee 26s linear infinite" }}>
              {[...tickerItems, ...tickerItems].map((t, i) => (
                <span key={i} className="mx-6 inline-flex items-center gap-2 text-sm" style={{ color: HERO_MUTE }}>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: HERO_GOLD }} /> {t}
                </span>
              ))}
            </div>
          </div>
          <style>{`@keyframes pen-marquee { from { transform: translateX(0);} to { transform: translateX(-50%);} }`}</style>
        </section>

        {/* projects preview */}
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-10">
          <div className="flex items-end justify-between">
            <div>
              <span className="font-display text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: "var(--pen-gold-2)" }}>Our Portfolio</span>
              <h2 className="mt-1.5 font-display text-3xl sm:text-4xl" style={{ color: "var(--pen-ink)" }}>Latest projects</h2>
            </div>
            <Link to="/advisor" className="hidden items-center gap-1.5 text-sm font-semibold sm:inline-flex" style={{ color: "var(--pen-gold-2)" }}>Explore with the Advisor <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.slice(0, 6).map((p, i) => (
              <motion.div key={p.key} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 3) * 0.06 }}>
                <Link to="/advisor" className="group flex h-full flex-col overflow-hidden rounded-3xl" style={{ border: "1px solid var(--pen-border)", background: "var(--pen-surface)" }}>
                  <div className="relative h-44 overflow-hidden">
                    <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    <span className="absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide" style={{ background: p.status === "ongoing" ? "rgba(183,141,60,0.9)" : "rgba(21,122,81,0.9)", color: "#fff" }}>{p.badge}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <p className="font-display text-lg" style={{ color: "var(--pen-ink)" }}>{p.name}</p>
                    <p className="mt-1 text-sm" style={{ color: "var(--pen-fg-3)" }}>{p.type}</p>
                    <p className="mt-1 text-xs" style={{ color: "var(--pen-fg-3)" }}>{p.location}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold" style={{ color: "var(--pen-gold-2)" }}>View live <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-2xl px-5 pb-16 lg:hidden">
          <EnquiryForm source="shell_mobile" heading="Enquire about your future home" />
        </section>

        <section className="relative overflow-hidden py-16" style={{ borderTop: "1px solid var(--pen-border)" }}>
          <div className="mx-auto max-w-3xl px-5 text-center">
            <h2 className="font-display text-3xl sm:text-4xl" style={{ color: "var(--pen-ink)" }}>Ready to own your dream home in Kerala?</h2>
            <p className="mt-3" style={{ color: "var(--pen-fg-2)" }}>Chat with the Pentium Home Advisor for a guided, personalised experience.</p>
            <Link to="/advisor" className="pen-btn-gold mt-7"><Sparkles className="h-4 w-4" /> Start the conversation</Link>
          </div>
        </section>

        <footer className="px-5 py-8 text-center text-sm sm:px-10" style={{ borderTop: "1px solid var(--pen-border)", color: "var(--pen-fg-3)" }}>
          Pentium Construction Pvt. Ltd. · Since 1994 · {BRAND.address}
        </footer>
      </div>
    </PentiumThemeProvider>
  );
}
