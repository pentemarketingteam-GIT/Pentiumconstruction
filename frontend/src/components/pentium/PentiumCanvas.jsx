import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, MapPin, ShieldCheck, Building2, Home as HomeIcon, Hammer,
  Leaf, HeartHandshake, Phone, Mail, MessageCircle, CalendarCheck, Check,
  Sparkles, Award, Layers, ChevronRight,
} from "lucide-react";
import {
  BRAND, PROJECTS, SERVICES, DIFFERENTIATORS, WHY_PILLARS, QUALITY_STAGES,
  GO_GREEN, CSR, LEADERSHIP, STATS, IMAGES,
} from "@/lib/pentium";
import EnquiryForm from "@/components/pentium/EnquiryForm";

const projByKey = Object.fromEntries(PROJECTS.map((p) => [p.key, p]));

/* ---------- small building blocks ---------- */

function Eyebrow({ children }) {
  return (
    <span className="font-display text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: "var(--pen-gold)" }}>
      {children}
    </span>
  );
}

function Panel({ eyebrow, title, desc, children, footer }) {
  return (
    <div className="flex h-full flex-col">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="mt-1.5 font-display text-2xl leading-tight sm:text-3xl" style={{ color: "var(--pen-ink)" }}>{title}</h2>
        {desc && <p className="mt-2 max-w-xl text-[15px] leading-relaxed" style={{ color: "var(--pen-fg-2)" }}>{desc}</p>}
      </motion.div>
      <div className="mt-5 min-h-0 flex-1">{children}</div>
      {footer && <div className="mt-4 flex flex-wrap items-center gap-2.5">{footer}</div>}
    </div>
  );
}

function StatusBadge({ status, badge }) {
  const ongoing = status === "ongoing";
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide"
      style={{
        background: ongoing ? "rgba(201,166,98,0.16)" : "rgba(111,191,139,0.14)",
        color: ongoing ? "var(--pen-gold-2)" : "var(--pen-ok)",
        border: `1px solid ${ongoing ? "rgba(201,166,98,0.35)" : "rgba(111,191,139,0.3)"}`,
      }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: "currentColor" }} />
      {badge}
    </span>
  );
}

function ReraBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold" style={{ background: "var(--pen-surface-2)", color: "var(--pen-fg-2)", border: "1px solid var(--pen-border)" }}>
      <ShieldCheck className="h-3.5 w-3.5" style={{ color: "var(--pen-gold)" }} /> RERA
    </span>
  );
}

function GoldButton({ onClick, children, icon: Icon = ArrowRight }) {
  return (
    <button onClick={onClick} className="pen-btn-gold text-sm" data-testid="pen-quick-action">
      {children} <Icon className="h-4 w-4" />
    </button>
  );
}

function GhostButton({ onClick, children }) {
  return (
    <button onClick={onClick} className="pen-btn-ghost text-sm">
      {children}
    </button>
  );
}

function Counter({ value, suffix = "", noPlus }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const dur = 1300;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return (
    <span>
      {noPlus ? n : n.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ---------- interactive project gallery ---------- */

function ProjectCard({ project, onAsk }) {
  const [active, setActive] = useState(0);
  const imgs = project.gallery && project.gallery.length ? project.gallery : [project.image];
  return (
    <div className="grid h-full gap-4 lg:grid-cols-[1.35fr_1fr]">
      {/* imagery */}
      <div className="flex flex-col gap-2.5">
        <div className="relative overflow-hidden rounded-3xl" style={{ border: "1px solid var(--pen-border)" }}>
          <motion.img key={active} src={imgs[active]} alt={project.name} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="h-52 w-full object-cover sm:h-64" loading="lazy" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(11,14,19,0.85))" }} />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <StatusBadge status={project.status} badge={project.badge} />
            {project.rera && <ReraBadge />}
          </div>
          <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-xs" style={{ color: "var(--pen-fg-2)" }}>
            <MapPin className="h-3.5 w-3.5" style={{ color: "var(--pen-gold)" }} /> {project.location}
          </div>
        </div>
        {imgs.length > 1 && (
          <div className="flex gap-2">
            {imgs.map((im, i) => (
              <button key={im + i} onClick={() => setActive(i)} className="relative h-14 flex-1 overflow-hidden rounded-xl transition" style={{ border: `1px solid ${i === active ? "var(--pen-gold)" : "var(--pen-border)"}`, opacity: i === active ? 1 : 0.6 }}>
                <img src={im} alt="" className="h-full w-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </div>
      {/* details */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2 font-display text-sm" style={{ color: "var(--pen-fg-3)" }}>
          <Layers className="h-4 w-4" style={{ color: "var(--pen-gold)" }} /> {project.type}
        </div>
        <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "var(--pen-fg-2)" }}>{project.blurb}</p>
        <div className="mt-auto flex flex-col gap-2.5 pt-5">
          <GoldButton onClick={() => onAsk(`I'd like to book a site visit for ${project.name}`, "book_visit")} icon={CalendarCheck}>Book a site visit</GoldButton>
          <GhostButton onClick={() => onAsk("Show me all Pentium projects", "projects")}>Browse other projects</GhostButton>
        </div>
      </div>
    </div>
  );
}

function ProjectTile({ project, onAsk }) {
  return (
    <button onClick={() => onAsk(`Tell me about ${project.name}`, project.key)} className="group flex flex-col overflow-hidden rounded-2xl text-left transition-all hover:-translate-y-1" style={{ border: "1px solid var(--pen-border)", background: "var(--pen-surface)" }}>
      <div className="relative h-28 overflow-hidden">
        <img src={project.image} alt={project.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 30%, rgba(11,14,19,0.9))" }} />
        <div className="absolute left-2.5 top-2.5"><StatusBadge status={project.status} badge={project.badge} /></div>
      </div>
      <div className="p-3.5">
        <p className="font-display text-[15px] leading-tight" style={{ color: "var(--pen-ink)" }}>{project.name}</p>
        <p className="mt-1 text-xs" style={{ color: "var(--pen-fg-3)" }}>{project.type}</p>
        <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold" style={{ color: "var(--pen-gold-2)" }}>
          View details <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </button>
  );
}

/* ---------- views ---------- */

const VIEWS = {
  welcome: (onAsk) => (
    <Panel eyebrow="Pentium Home Advisor" title="Find your future home in Kerala"
      desc="Ask me about our premium apartments and villas, our story, or how to visit. This panel comes alive as we chat — tap a card to begin.">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {[
          { t: "Our Projects", s: "Apartments & villas", p: "Show me all Pentium projects", g: "projects", Icon: Building2 },
          { t: "Spring Green Villas", s: "3–5 BHK, Malappuram", p: "Tell me about Pentium Spring Green Villas", g: "project_spring_green", Icon: HomeIcon },
          { t: "Harmony Heights", s: "Ongoing · 45%", p: "Tell me about Pentium Harmony Heights", g: "project_harmony", Icon: Building2 },
          { t: "Why Pentium", s: "30+ years", p: "Why should I choose Pentium?", g: "why_pentium", Icon: Award },
          { t: "Services", s: "Start to finish", p: "What construction services do you offer?", g: "services", Icon: Hammer },
          { t: "Book a visit", s: "Talk to the team", p: "I'd like to book a site visit", g: "book_visit", Icon: CalendarCheck },
        ].map((c, i) => (
          <motion.button key={c.t} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            onClick={() => onAsk(c.p, c.g)}
            className="group flex flex-col rounded-2xl p-4 text-left transition-all hover:-translate-y-1"
            style={{ border: "1px solid var(--pen-border)", background: "var(--pen-surface)" }}>
            <c.Icon className="h-6 w-6" style={{ color: "var(--pen-gold)" }} strokeWidth={1.5} />
            <p className="mt-3 font-display text-[15px]" style={{ color: "var(--pen-ink)" }}>{c.t}</p>
            <p className="mt-0.5 text-xs" style={{ color: "var(--pen-fg-3)" }}>{c.s}</p>
            <ArrowRight className="mt-2 h-4 w-4 transition-transform group-hover:translate-x-1" style={{ color: "var(--pen-gold)" }} />
          </motion.button>
        ))}
      </div>
    </Panel>
  ),

  projects: (onAsk) => <ProjectsView onAsk={onAsk} />,

  services: () => (
    <Panel eyebrow="Our Services" title="Construction solutions, start to finish"
      desc="Residential, commercial, institutional and industrial work — delivered as one seamless process.">
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {SERVICES.map((s, i) => (
          <motion.div key={s.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="rounded-2xl p-3.5" style={{ border: "1px solid var(--pen-border)", background: "var(--pen-surface)" }}>
            <p className="font-display text-[15px]" style={{ color: "var(--pen-ink)" }}>{s.name}</p>
            <p className="mt-0.5 text-xs leading-relaxed" style={{ color: "var(--pen-fg-3)" }}>{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </Panel>
  ),

  why_pentium: (onAsk) => (
    <Panel eyebrow="Why Pentium" title="The right partner for your build"
      desc="A construction partner matters most years after handover. Here is what sets Pentium apart."
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
              <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--pen-gold)" }} strokeWidth={2.5} /> {d}
            </div>
          ))}
        </div>
      </div>
    </Panel>
  ),

  quality_process: () => (
    <Panel eyebrow="Quality Process" title="Getting it right at every stage"
      desc="Quality is built into every stage — not just checked at the end.">
      <div className="grid grid-cols-1 gap-2.5">
        {QUALITY_STAGES.map((s, i) => (
          <motion.div key={s.title} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
            className="flex items-center gap-3.5 rounded-2xl p-3.5" style={{ border: "1px solid var(--pen-border)", background: "var(--pen-surface)" }}>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl font-display text-lg" style={{ background: "rgba(201,166,98,0.15)", color: "var(--pen-gold-2)", border: "1px solid var(--pen-border)" }}>{i + 1}</span>
            <div>
              <p className="font-display text-[15px]" style={{ color: "var(--pen-ink)" }}>{s.title}</p>
              <p className="text-xs" style={{ color: "var(--pen-fg-3)" }}>{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Panel>
  ),

  go_green: () => (
    <Panel eyebrow="Go Green" title="Building responsibly, not just efficiently"
      desc="Sustainability shapes decisions from design through daily site management.">
      <div className="flex flex-wrap gap-2">
        {GO_GREEN.map((g) => (
          <span key={g} className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium" style={{ background: "rgba(111,191,139,0.1)", color: "var(--pen-ok)", border: "1px solid rgba(111,191,139,0.25)" }}>
            <Leaf className="h-4 w-4" /> {g}
          </span>
        ))}
      </div>
    </Panel>
  ),

  csr: () => (
    <Panel eyebrow="CSR" title="Building communities, not just structures"
      desc="Responsibility is part of how Pentium operates — from planned initiatives to disaster relief.">
      <div className="flex flex-wrap gap-2">
        {CSR.map((c) => (
          <span key={c} className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium" style={{ background: "var(--pen-surface)", color: "var(--pen-fg-2)", border: "1px solid var(--pen-border)" }}>
            <HeartHandshake className="h-4 w-4" style={{ color: "var(--pen-gold)" }} /> {c}
          </span>
        ))}
      </div>
    </Panel>
  ),

  about: () => (
    <Panel eyebrow="About Pentium" title="Responsible Building. Unmatched Craft."
      desc="A premium residential developer headquartered in Calicut since 1994 — blending contemporary design with Kerala living traditions like passive ventilation and teakwood craftsmanship.">
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

  contact: () => (
    <Panel eyebrow="Get in touch" title="Begin your journey with us"
      desc="We respond to every enquiry within 24 hours on business days.">
      <div className="grid gap-2.5">
        <a href={BRAND.phoneHref} className="flex items-center gap-3 rounded-2xl p-3.5" style={{ border: "1px solid var(--pen-border)", background: "var(--pen-surface)" }}>
          <span className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: "rgba(201,166,98,0.14)", color: "var(--pen-gold-2)" }}><Phone className="h-5 w-5" /></span>
          <span className="font-display" style={{ color: "var(--pen-ink)" }}>{BRAND.phone}</span>
        </a>
        <a href={BRAND.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl p-3.5" style={{ border: "1px solid var(--pen-border)", background: "var(--pen-surface)" }}>
          <span className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: "rgba(111,191,139,0.14)", color: "var(--pen-ok)" }}><MessageCircle className="h-5 w-5" /></span>
          <span className="font-display" style={{ color: "var(--pen-ink)" }}>WhatsApp us</span>
        </a>
        <a href={BRAND.emailHref} className="flex items-center gap-3 rounded-2xl p-3.5" style={{ border: "1px solid var(--pen-border)", background: "var(--pen-surface)" }}>
          <span className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: "rgba(201,166,98,0.14)", color: "var(--pen-gold-2)" }}><Mail className="h-5 w-5" /></span>
          <span className="font-display" style={{ color: "var(--pen-ink)" }}>{BRAND.salesEmail}</span>
        </a>
        <div className="flex items-center gap-3 rounded-2xl p-3.5" style={{ border: "1px solid var(--pen-border)", background: "var(--pen-surface)" }}>
          <span className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: "var(--pen-surface-2)", color: "var(--pen-gold-2)" }}><MapPin className="h-5 w-5" /></span>
          <span className="text-sm" style={{ color: "var(--pen-fg-2)" }}>{BRAND.address}</span>
        </div>
      </div>
    </Panel>
  ),

  book_visit: (onAsk) => (
    <Panel eyebrow="Book a site visit" title="Let's arrange your visit"
      desc="Share your name, phone and the project you're interested in — in the chat or the quick form below — and our team will reach out to schedule a visit.">
      <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
        <EnquiryForm source="advisor_book_visit" heading="" compact />
        <div className="flex flex-col gap-2.5">
          <GoldButton onClick={() => onAsk("Please call me back to arrange a visit", "book_visit")} icon={Phone}>Request a call-back</GoldButton>
          <a href={BRAND.whatsapp} target="_blank" rel="noreferrer" className="pen-btn-ghost text-sm justify-center"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
          <a href={BRAND.phoneHref} className="pen-btn-ghost text-sm justify-center"><Phone className="h-4 w-4" /> {BRAND.phone}</a>
        </div>
      </div>
    </Panel>
  ),
};

// individual project panels reuse the ProjectCard
PROJECTS.forEach((p) => {
  VIEWS[p.key] = (onAsk) => (
    <Panel eyebrow={p.status === "ongoing" ? "Ongoing Project" : "Completed Project"} title={p.name}>
      <ProjectCard project={p} onAsk={onAsk} />
    </Panel>
  );
});

function ProjectsView({ onAsk }) {
  const [tab, setTab] = useState("ongoing");
  const list = PROJECTS.filter((p) => p.status === tab);
  return (
    <Panel eyebrow="Our Portfolio" title="Latest projects"
      desc="Premium apartments and villas across Calicut and Malappuram. Tap any project to explore it live.">
      <div className="flex h-full flex-col">
        <div className="mb-3 inline-flex gap-1 rounded-full p-1 self-start" style={{ border: "1px solid var(--pen-border)", background: "var(--pen-surface)" }}>
          {[["ongoing", "Ongoing"], ["completed", "Completed"]].map(([k, label]) => (
            <button key={k} onClick={() => setTab(k)} className="rounded-full px-4 py-1.5 text-sm font-semibold transition"
              style={tab === k ? { background: "linear-gradient(135deg, var(--pen-gold-2), var(--pen-gold))", color: "#1a140a" } : { color: "var(--pen-fg-3)" }}>
              {label}
            </button>
          ))}
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-2 content-start gap-2.5 overflow-y-auto pen-scroll sm:grid-cols-3">
          {list.map((p) => <ProjectTile key={p.key} project={p} onAsk={onAsk} />)}
          {list.length === 0 && <p className="text-sm" style={{ color: "var(--pen-fg-3)" }}>No projects in this category right now.</p>}
        </div>
      </div>
    </Panel>
  );
}

export default function PentiumCanvas({ view = "welcome", onAsk }) {
  const render = VIEWS[view] || VIEWS.welcome;
  return <div className="h-full">{render(onAsk)}</div>;
}
