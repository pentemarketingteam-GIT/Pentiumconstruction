import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, MapPin, ShieldCheck, Building2, Home as HomeIcon, Hammer,
  Leaf, HeartHandshake, Phone, Mail, MessageCircle, CalendarCheck, Check,
  Award, Layers, ChevronRight, Ruler, Calendar, Info, HelpCircle,
} from "lucide-react";
import {
  BRAND, PROJECTS, SERVICES, DIFFERENTIATORS, QUALITY_STAGES,
  GO_GREEN, CSR, LEADERSHIP, STATS, FAQS,
} from "@/lib/pentium";
import EnquiryForm from "@/components/pentium/EnquiryForm";

const projByKey = Object.fromEntries(PROJECTS.map((p) => [p.key, p]));
const PLACEHOLDER =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'><rect width='100%25' height='100%25' fill='%23e9e2d2'/><text x='50%25' y='50%25' fill='%23b78d3c' font-family='sans-serif' font-size='18' text-anchor='middle'>Pentium</text></svg>";

function SmartImg({ src, alt = "", className = "", ...rest }) {
  return <img src={src} alt={alt} loading="lazy" onError={(e) => { e.currentTarget.src = PLACEHOLDER; }} className={className} {...rest} />;
}

function Eyebrow({ children }) {
  return <span className="font-display text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: "var(--pen-gold-2)" }}>{children}</span>;
}

function Panel({ eyebrow, title, desc, children, footer }) {
  return (
    <div className="flex h-full flex-col">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="mt-1.5 font-display text-2xl leading-tight sm:text-3xl" style={{ color: "var(--pen-ink)" }}>{title}</h2>
        {desc && <p className="mt-2 max-w-2xl text-[15px] leading-relaxed" style={{ color: "var(--pen-fg-2)" }}>{desc}</p>}
      </motion.div>
      <div className="mt-4 min-h-0 flex-1">{children}</div>
      {footer && <div className="mt-4 flex flex-wrap items-center gap-2.5">{footer}</div>}
    </div>
  );
}

function StatusBadge({ status, badge }) {
  const ongoing = status === "ongoing";
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide"
      style={{ background: ongoing ? "rgba(183,141,60,0.16)" : "rgba(21,122,81,0.14)", color: ongoing ? "var(--pen-gold-2)" : "var(--pen-ok)", border: `1px solid ${ongoing ? "rgba(183,141,60,0.35)" : "rgba(21,122,81,0.3)"}` }}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: "currentColor" }} /> {badge}
    </span>
  );
}

function GoldButton({ onClick, children, icon: Icon = ArrowRight }) {
  return <button onClick={onClick} className="pen-btn-gold text-sm" data-testid="pen-quick-action">{children} <Icon className="h-4 w-4" /></button>;
}
function GhostButton({ onClick, children }) {
  return <button onClick={onClick} className="pen-btn-ghost text-sm">{children}</button>;
}

function Counter({ value, suffix = "", noPlus }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf; const start = performance.now(); const dur = 1300;
    const tick = (t) => { const p = Math.min(1, (t - start) / dur); setN(Math.round(value * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf);
  }, [value]);
  return <span>{noPlus ? n : n.toLocaleString()}{suffix}</span>;
}

/* ---------------- Project detail (rich, sub-tabbed) ---------------- */

function Fact({ icon: Icon, label, value }) {
  if (!value) return null;
  return (
    <div className="rounded-xl p-2.5" style={{ border: "1px solid var(--pen-border)", background: "var(--pen-surface)" }}>
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide" style={{ color: "var(--pen-fg-3)" }}>
        <Icon className="h-3.5 w-3.5" style={{ color: "var(--pen-gold-2)" }} /> {label}
      </div>
      <div className="mt-0.5 text-[13px] font-semibold" style={{ color: "var(--pen-ink)" }}>{value}</div>
    </div>
  );
}

function ProjectDetail({ project, onAsk }) {
  const tabs = ["Overview"];
  if (project.amenities) tabs.push("Amenities");
  if (project.specs) tabs.push("Specifications");
  if (project.blueprintTabs) tabs.push("Blueprints");
  if (project.gallery && project.gallery.length) tabs.push("Gallery");
  const [tab, setTab] = useState("Overview");
  const [gImg, setGImg] = useState(0);

  return (
    <div className="flex h-full flex-col">
      {/* header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <Eyebrow>{project.status === "ongoing" ? "Ongoing Project" : "Completed Project"}</Eyebrow>
          <h2 className="mt-1 font-display text-2xl leading-tight sm:text-3xl" style={{ color: "var(--pen-ink)" }}>{project.name}</h2>
          <div className="mt-1 flex items-center gap-1.5 text-xs" style={{ color: "var(--pen-fg-3)" }}>
            <MapPin className="h-3.5 w-3.5" style={{ color: "var(--pen-gold-2)" }} /> {project.location} · {project.type}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <StatusBadge status={project.status} badge={project.badge} />
          {project.rera && <span className="text-[10px]" style={{ color: "var(--pen-fg-3)" }}>RERA {project.rera}</span>}
        </div>
      </div>

      {/* sub-tabs */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)} className="rounded-full px-3 py-1.5 text-xs font-semibold transition"
            style={tab === t ? { background: "linear-gradient(135deg, var(--pen-gold), var(--pen-gold-deep))", color: "#fff" } : { color: "var(--pen-fg-3)", border: "1px solid var(--pen-border)" }}>
            {t}
          </button>
        ))}
      </div>

      {/* body */}
      <div className="mt-3 min-h-0 flex-1 overflow-y-auto pen-scroll pr-1">
        {tab === "Overview" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid gap-3">
            <div className="relative overflow-hidden rounded-2xl" style={{ border: "1px solid var(--pen-border)" }}>
              <SmartImg src={project.image} alt={project.name} className="h-44 w-full object-cover sm:h-52" />
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              <Fact icon={HomeIcon} label="Config" value={project.config} />
              <Fact icon={Building2} label="Floors" value={project.floors} />
              <Fact icon={Layers} label="Units" value={project.units} />
              <Fact icon={Ruler} label="Area" value={project.areaRange} />
              <Fact icon={MapPin} label="Land" value={project.land} />
              <Fact icon={Calendar} label="Completion" value={project.completion} />
            </div>
            <p className="text-[14px] leading-relaxed" style={{ color: "var(--pen-fg-2)" }}>{project.vision || project.overview}</p>
          </motion.div>
        )}

        {tab === "Amenities" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <p className="mb-2 text-xs" style={{ color: "var(--pen-fg-3)" }}>{project.amenitiesCount} signature facilities</p>
            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {project.amenities.map((a) => (
                <div key={a} className="flex items-start gap-2 rounded-lg px-2.5 py-2 text-[13px]" style={{ border: "1px solid var(--pen-border)", background: "var(--pen-surface)", color: "var(--pen-fg-2)" }}>
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: "var(--pen-ok)" }} strokeWidth={2.5} /> {a}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {tab === "Specifications" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid gap-2">
            {project.specs.map((s) => (
              <div key={s.title} className="rounded-xl p-3" style={{ border: "1px solid var(--pen-border)", background: "var(--pen-surface)" }}>
                <p className="font-display text-sm" style={{ color: "var(--pen-gold-2)" }}>{s.title}</p>
                <p className="mt-1 text-[13px] leading-relaxed" style={{ color: "var(--pen-fg-2)" }}>{s.text}</p>
              </div>
            ))}
          </motion.div>
        )}

        {tab === "Blueprints" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid gap-3">
            <div className="overflow-hidden rounded-2xl p-3" style={{ border: "1px solid var(--pen-border)", background: "var(--pen-surface)" }}>
              <SmartImg src={project.blueprint} alt="Layout blueprint" className="mx-auto max-h-56 w-auto object-contain" />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.blueprintTabs.map((t) => (
                <span key={t} className="rounded-full px-3 py-1.5 text-xs font-semibold" style={{ border: "1px solid var(--pen-border)", color: "var(--pen-fg-2)" }}>{t}</span>
              ))}
            </div>
            <p className="text-xs" style={{ color: "var(--pen-fg-3)" }}>Full layout set available on request — our sales team can share every floor plan.</p>
          </motion.div>
        )}

        {tab === "Gallery" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid gap-2">
            <div className="overflow-hidden rounded-2xl" style={{ border: "1px solid var(--pen-border)" }}>
              <SmartImg src={project.gallery[gImg]} alt={project.name} className="h-56 w-full object-cover" />
            </div>
            {project.gallery.length > 1 && (
              <div className="grid grid-cols-5 gap-1.5">
                {project.gallery.map((im, i) => (
                  <button key={im + i} onClick={() => setGImg(i)} className="h-12 overflow-hidden rounded-lg" style={{ border: `1px solid ${i === gImg ? "var(--pen-gold)" : "var(--pen-border)"}`, opacity: i === gImg ? 1 : 0.65 }}>
                    <SmartImg src={im} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* actions */}
      <div className="mt-3 flex flex-wrap items-center gap-2.5">
        <GoldButton onClick={() => onAsk(`I'd like to book a site visit for ${project.name}`, "book_visit")} icon={CalendarCheck}>Book a site visit</GoldButton>
        <GhostButton onClick={() => onAsk("Show me all Pentium projects", "projects")}>Other projects</GhostButton>
      </div>
    </div>
  );
}

/* ---------------- Projects list ---------------- */

function ProjectTile({ project, onAsk }) {
  return (
    <button onClick={() => onAsk(`Tell me about ${project.name}`, project.key)} className="group flex flex-col overflow-hidden rounded-2xl text-left transition-all hover:-translate-y-1" style={{ border: "1px solid var(--pen-border)", background: "var(--pen-surface)" }}>
      <div className="relative h-28 overflow-hidden">
        <SmartImg src={project.image} alt={project.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute left-2.5 top-2.5"><StatusBadge status={project.status} badge={project.badge} /></div>
      </div>
      <div className="p-3">
        <p className="font-display text-[15px] leading-tight" style={{ color: "var(--pen-ink)" }}>{project.name}</p>
        <p className="mt-0.5 text-xs" style={{ color: "var(--pen-fg-3)" }}>{project.location}</p>
        <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold" style={{ color: "var(--pen-gold-2)" }}>View details <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
      </div>
    </button>
  );
}

function ProjectsView({ onAsk }) {
  const [tab, setTab] = useState("ongoing");
  const list = PROJECTS.filter((p) => p.status === tab);
  return (
    <Panel eyebrow="Our Portfolio" title="Latest projects" desc="Premium apartments and villas across Calicut and Malappuram. Tap any project for full details.">
      <div className="flex h-full flex-col">
        <div className="mb-3 inline-flex gap-1 self-start rounded-full p-1" style={{ border: "1px solid var(--pen-border)", background: "var(--pen-surface)" }}>
          {[["ongoing", "Ongoing"], ["completed", "Completed"]].map(([k, label]) => (
            <button key={k} onClick={() => setTab(k)} className="rounded-full px-4 py-1.5 text-sm font-semibold transition"
              style={tab === k ? { background: "linear-gradient(135deg, var(--pen-gold), var(--pen-gold-deep))", color: "#fff" } : { color: "var(--pen-fg-3)" }}>{label}</button>
          ))}
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-2 content-start gap-2.5 overflow-y-auto pen-scroll sm:grid-cols-3">
          {list.map((p) => <ProjectTile key={p.key} project={p} onAsk={onAsk} />)}
        </div>
      </div>
    </Panel>
  );
}

/* ---------------- info panels ---------------- */

const VIEWS = {
  welcome: (onAsk) => (
    <Panel eyebrow="Pentium Home Advisor" title="Find your future home in Kerala"
      desc="Ask about our premium apartments and villas, our story, or how to visit. This panel comes alive as we chat — tap a card to begin.">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {[
          { t: "Our Projects", s: "Apartments & villas", p: "Show me all Pentium projects", g: "projects", Icon: Building2 },
          { t: "Harmony Heights", s: "Ongoing · 18 floors", p: "Tell me about Harmony Heights", g: "project_harmony", Icon: Building2 },
          { t: "Spring Green Villas", s: "3–5 BHK villas", p: "Tell me about Spring Green Villas", g: "project_spring_green", Icon: HomeIcon },
          { t: "Why Pentium", s: "30+ years", p: "Why should I choose Pentium?", g: "why_pentium", Icon: Award },
          { t: "Services", s: "Start to finish", p: "What services do you offer?", g: "services", Icon: Hammer },
          { t: "Book a visit", s: "Talk to the team", p: "I'd like to book a site visit", g: "book_visit", Icon: CalendarCheck },
        ].map((c, i) => (
          <motion.button key={c.t} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            onClick={() => onAsk(c.p, c.g)} className="group flex flex-col rounded-2xl p-4 text-left transition-all hover:-translate-y-1"
            style={{ border: "1px solid var(--pen-border)", background: "var(--pen-surface)" }}>
            <c.Icon className="h-6 w-6" style={{ color: "var(--pen-gold-2)" }} strokeWidth={1.5} />
            <p className="mt-3 font-display text-[15px]" style={{ color: "var(--pen-ink)" }}>{c.t}</p>
            <p className="mt-0.5 text-xs" style={{ color: "var(--pen-fg-3)" }}>{c.s}</p>
            <ArrowRight className="mt-2 h-4 w-4 transition-transform group-hover:translate-x-1" style={{ color: "var(--pen-gold-2)" }} />
          </motion.button>
        ))}
      </div>
    </Panel>
  ),
  projects: (onAsk) => <ProjectsView onAsk={onAsk} />,
  services: () => (
    <Panel eyebrow="Our Services" title="Construction solutions, start to finish" desc="Residential, commercial, institutional and industrial work — delivered as one seamless process.">
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {SERVICES.map((s, i) => (
          <motion.div key={s.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="rounded-2xl p-3.5" style={{ border: "1px solid var(--pen-border)", background: "var(--pen-surface)" }}>
            <p className="font-display text-[15px]" style={{ color: "var(--pen-ink)" }}>{s.name}</p>
            <p className="mt-0.5 text-xs leading-relaxed" style={{ color: "var(--pen-fg-3)" }}>{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </Panel>
  ),
  why_pentium: (onAsk) => (
    <Panel eyebrow="Why Pentium" title="The right partner for your build" desc="A construction partner matters most years after handover. Here's what sets Pentium apart."
      footer={<GoldButton onClick={() => onAsk("I'd like to talk to the Pentium team", "book_visit")} icon={MessageCircle}>Talk to us</GoldButton>}>
      <div className="grid h-full grid-rows-[auto_1fr] gap-3">
        <div className="grid grid-cols-3 gap-2.5">
          {STATS.slice(0, 3).map((s) => (
            <div key={s.label} className="rounded-2xl p-3 text-center" style={{ border: "1px solid var(--pen-border)", background: "var(--pen-surface)" }}>
              <p className="font-display text-2xl" style={{ color: "var(--pen-gold-2)" }}><Counter value={s.value} suffix={s.suffix} noPlus={s.noPlus} /></p>
              <p className="mt-0.5 text-[11px]" style={{ color: "var(--pen-fg-3)" }}>{s.label}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {DIFFERENTIATORS.map((d) => (
            <div key={d} className="flex items-start gap-2 rounded-xl p-2.5 text-[13px]" style={{ border: "1px solid var(--pen-border)", background: "var(--pen-surface)", color: "var(--pen-fg-2)" }}>
              <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--pen-ok)" }} strokeWidth={2.5} /> {d}
            </div>
          ))}
        </div>
      </div>
    </Panel>
  ),
  quality_process: () => (
    <Panel eyebrow="Quality Process" title="Getting it right at every stage" desc="Quality is built into every stage — not just checked at the end.">
      <div className="grid grid-cols-1 gap-2.5">
        {QUALITY_STAGES.map((s, i) => (
          <motion.div key={s.title} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} className="flex items-center gap-3.5 rounded-2xl p-3.5" style={{ border: "1px solid var(--pen-border)", background: "var(--pen-surface)" }}>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl font-display text-lg" style={{ background: "rgba(183,141,60,0.15)", color: "var(--pen-gold-2)", border: "1px solid var(--pen-border)" }}>{i + 1}</span>
            <div><p className="font-display text-[15px]" style={{ color: "var(--pen-ink)" }}>{s.title}</p><p className="text-xs" style={{ color: "var(--pen-fg-3)" }}>{s.desc}</p></div>
          </motion.div>
        ))}
      </div>
    </Panel>
  ),
  go_green: () => (
    <Panel eyebrow="Go Green" title="Building responsibly, not just efficiently" desc="Sustainability shapes decisions from design through daily site management.">
      <div className="flex flex-wrap gap-2">
        {GO_GREEN.map((x) => (
          <span key={x} className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium" style={{ background: "rgba(21,122,81,0.1)", color: "var(--pen-ok)", border: "1px solid rgba(21,122,81,0.25)" }}><Leaf className="h-4 w-4" /> {x}</span>
        ))}
      </div>
    </Panel>
  ),
  csr: () => (
    <Panel eyebrow="CSR" title="Building communities, not just structures" desc="Responsibility is part of how Pentium operates — from planned initiatives to disaster relief.">
      <div className="flex flex-wrap gap-2">
        {CSR.map((c) => (
          <span key={c} className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium" style={{ background: "var(--pen-surface)", color: "var(--pen-fg-2)", border: "1px solid var(--pen-border)" }}><HeartHandshake className="h-4 w-4" style={{ color: "var(--pen-gold-2)" }} /> {c}</span>
        ))}
      </div>
    </Panel>
  ),
  about: () => (
    <Panel eyebrow="About Pentium" title="Responsible Building. Unmatched Craft." desc="A premium residential developer headquartered in Calicut since 1994 — contemporary design blended with Kerala living traditions like passive ventilation and teakwood craftsmanship.">
      <div className="grid h-full grid-rows-[auto_1fr] gap-3.5">
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-2xl p-3 text-center" style={{ border: "1px solid var(--pen-border)", background: "var(--pen-surface)" }}>
              <p className="font-display text-xl" style={{ color: "var(--pen-gold-2)" }}><Counter value={s.value} suffix={s.suffix} noPlus={s.noPlus} /></p>
              <p className="mt-0.5 text-[11px]" style={{ color: "var(--pen-fg-3)" }}>{s.label}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {LEADERSHIP.map((l) => (
            <div key={l.name} className="rounded-2xl p-4" style={{ border: "1px solid var(--pen-border)", background: "var(--pen-surface)" }}>
              <p className="font-display text-[15px]" style={{ color: "var(--pen-ink)" }}>{l.name}</p>
              <p className="mt-0.5 text-xs" style={{ color: "var(--pen-gold-2)" }}>{l.role}</p>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  ),
  faqs: () => (
    <Panel eyebrow="FAQs" title="Help & clarity" desc="Quick answers to the questions buyers ask us most.">
      <div className="grid gap-2">
        {FAQS.map((f) => (
          <div key={f.q} className="rounded-xl p-3" style={{ border: "1px solid var(--pen-border)", background: "var(--pen-surface)" }}>
            <p className="flex items-start gap-2 font-display text-sm" style={{ color: "var(--pen-ink)" }}><HelpCircle className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--pen-gold-2)" }} /> {f.q}</p>
            <p className="mt-1 pl-6 text-[13px] leading-relaxed" style={{ color: "var(--pen-fg-2)" }}>{f.a}</p>
          </div>
        ))}
      </div>
    </Panel>
  ),
  contact: () => (
    <Panel eyebrow="Get in touch" title="Begin your journey with us" desc="We respond to every enquiry within 24 hours on business days.">
      <div className="grid gap-2.5">
        <a href={BRAND.phoneHref} className="flex items-center gap-3 rounded-2xl p-3.5" style={{ border: "1px solid var(--pen-border)", background: "var(--pen-surface)" }}>
          <span className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: "rgba(183,141,60,0.14)", color: "var(--pen-gold-2)" }}><Phone className="h-5 w-5" /></span>
          <span><span className="block font-display" style={{ color: "var(--pen-ink)" }}>{BRAND.phone}</span><span className="text-xs" style={{ color: "var(--pen-fg-3)" }}>UAE: {BRAND.phoneUAE}</span></span>
        </a>
        <a href={BRAND.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl p-3.5" style={{ border: "1px solid var(--pen-border)", background: "var(--pen-surface)" }}>
          <span className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: "rgba(21,122,81,0.14)", color: "var(--pen-ok)" }}><MessageCircle className="h-5 w-5" /></span>
          <span className="font-display" style={{ color: "var(--pen-ink)" }}>WhatsApp us</span>
        </a>
        <a href={BRAND.emailHref} className="flex items-center gap-3 rounded-2xl p-3.5" style={{ border: "1px solid var(--pen-border)", background: "var(--pen-surface)" }}>
          <span className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: "rgba(183,141,60,0.14)", color: "var(--pen-gold-2)" }}><Mail className="h-5 w-5" /></span>
          <span className="font-display" style={{ color: "var(--pen-ink)" }}>{BRAND.salesEmail}</span>
        </a>
        {BRAND.offices.map((o) => (
          <div key={o.label} className="flex items-start gap-3 rounded-2xl p-3.5" style={{ border: "1px solid var(--pen-border)", background: "var(--pen-surface)" }}>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl" style={{ background: "var(--pen-surface-2)", color: "var(--pen-gold-2)" }}><MapPin className="h-5 w-5" /></span>
            <span><span className="block text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--pen-gold-2)" }}>{o.label}</span><span className="text-sm" style={{ color: "var(--pen-fg-2)" }}>{o.text}</span></span>
          </div>
        ))}
      </div>
    </Panel>
  ),
  book_visit: (onAsk) => (
    <Panel eyebrow="Book a site visit" title="Let's arrange your visit" desc="Share your name, phone and the project you're interested in — here or in the chat — and our team will reach out to schedule a visit.">
      <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
        <EnquiryForm source="advisor_book_visit" heading="" compact />
        <div className="flex flex-col gap-2.5">
          <GoldButton onClick={() => onAsk("Please call me back to arrange a visit", "book_visit")} icon={Phone}>Request a call-back</GoldButton>
          <a href={BRAND.whatsapp} target="_blank" rel="noreferrer" className="pen-btn-ghost justify-center text-sm"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
          <a href={BRAND.phoneHref} className="pen-btn-ghost justify-center text-sm"><Phone className="h-4 w-4" /> {BRAND.phone}</a>
        </div>
      </div>
    </Panel>
  ),
};

PROJECTS.forEach((p) => { VIEWS[p.key] = (onAsk) => <ProjectDetail project={p} onAsk={onAsk} />; });

export default function PentiumCanvas({ view = "welcome", onAsk }) {
  const render = VIEWS[view] || VIEWS.welcome;
  return <div className="h-full">{render(onAsk)}</div>;
}
