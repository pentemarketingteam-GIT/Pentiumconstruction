import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CONTACT } from "@/lib/sopContent";

/* ---------- Motion reveal ---------- */
export function Reveal({ children, delay = 0, y = 24, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Buttons ---------- */
const BTN_BASE =
  "inline-flex items-center justify-center gap-2 rounded-full font-display font-600 transition-all duration-200 active:scale-[0.97] focus:outline-none focus-visible:ring-4 focus-visible:ring-sop-blue/25 disabled:opacity-60";
const BTN_SIZE = { md: "px-6 py-3 text-[15px]", lg: "px-8 py-4 text-base" };
const BTN_VARIANT = {
  primary: "bg-sop-blue text-white shadow-play hover:bg-sop-bluedeep hover:-translate-y-0.5",
  coral: "bg-sop-coral text-white shadow-play hover:brightness-105 hover:-translate-y-0.5",
  yellow: "bg-sop-yellow text-sop-ink shadow-play hover:brightness-105 hover:-translate-y-0.5",
  green: "bg-sop-green text-white shadow-play hover:brightness-105 hover:-translate-y-0.5",
  ghost: "bg-white text-sop-ink ring-2 ring-sop-border hover:ring-sop-blue hover:text-sop-blue",
  white: "bg-white text-sop-blue shadow-play hover:-translate-y-0.5",
};

export function CTA({ children, variant = "primary", size = "md", className = "", ...rest }) {
  return (
    <button className={`${BTN_BASE} ${BTN_SIZE[size]} ${BTN_VARIANT[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function CTALink({ children, to, variant = "primary", size = "md", external = false, className = "" }) {
  const cls = `${BTN_BASE} ${BTN_SIZE[size]} ${BTN_VARIANT[variant]} ${className}`;
  if (external) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to} className={cls}>
      {children}
    </Link>
  );
}

export function BookNowButton({ size = "md", variant = "coral", className = "" }) {
  return (
    <CTALink to={CONTACT.bookingUrl} external variant={variant} size={size} className={className}>
      Book Now
    </CTALink>
  );
}

/* ---------- Eyebrow / heading ---------- */
export function Eyebrow({ children, color = "blue" }) {
  const map = {
    blue: "bg-sop-blue/10 text-sop-blue",
    coral: "bg-sop-coral/12 text-sop-coral",
    green: "bg-sop-green/12 text-sop-green",
    yellow: "bg-sop-yellow/20 text-[#8a6a00]",
    purple: "bg-sop-purple/12 text-sop-purple",
  };
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-700 uppercase tracking-wide font-display ${map[color]}`}>
      {children}
    </span>
  );
}

export function SectionHeading({ eyebrow, eyebrowColor = "blue", title, subtitle, center = false, className = "" }) {
  return (
    <div className={`${center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}>
      {eyebrow && <Eyebrow color={eyebrowColor}>{eyebrow}</Eyebrow>}
      <h2 className="mt-4 text-3xl font-700 leading-tight text-sop-ink sm:text-4xl text-balance">{title}</h2>
      {subtitle && <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

/* ---------- Pills / chips ---------- */
export function ChipList({ items, color = "blue" }) {
  const map = {
    blue: "bg-sop-blue/8 text-sop-bluedeep ring-sop-blue/15",
    coral: "bg-sop-coral/8 text-sop-coral ring-sop-coral/20",
    green: "bg-sop-green/8 text-sop-green ring-sop-green/20",
    purple: "bg-sop-purple/8 text-sop-purple ring-sop-purple/20",
    yellow: "bg-sop-yellow/15 text-[#8a6a00] ring-sop-yellow/30",
  };
  return (
    <ul className="flex flex-wrap gap-2.5">
      {items.map((it) => (
        <li key={it} className={`rounded-full px-4 py-2 text-sm font-600 ring-1 ${map[color]}`}>
          {it}
        </li>
      ))}
    </ul>
  );
}

/* ---------- Ticked list ---------- */
import { Check } from "lucide-react";
export function TickList({ items, color = "green", className = "" }) {
  const dot = {
    green: "bg-sop-green/15 text-sop-green",
    blue: "bg-sop-blue/12 text-sop-blue",
    coral: "bg-sop-coral/12 text-sop-coral",
    purple: "bg-sop-purple/12 text-sop-purple",
  }[color];
  return (
    <ul className={`grid gap-3 sm:grid-cols-2 ${className}`}>
      {items.map((it) => (
        <li key={it} className="flex items-start gap-3">
          <span className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full ${dot}`}>
            <Check className="h-3.5 w-3.5" strokeWidth={3} />
          </span>
          <span className="text-[15px] leading-relaxed text-sop-ink/85">{it}</span>
        </li>
      ))}
    </ul>
  );
}

/* ---------- Price card ---------- */
export function PriceCard({ tier, detail, price, highlight = false, color = "blue" }) {
  const ring = {
    blue: "ring-sop-blue/20",
    green: "ring-sop-green/25",
    yellow: "ring-sop-yellow/40",
    coral: "ring-sop-coral/25",
    purple: "ring-sop-purple/25",
  }[color];
  return (
    <div className={`rounded-3xl bg-white p-6 ring-2 ${ring} ${highlight ? "shadow-play-lg -translate-y-1" : "shadow-play"}`}>
      {tier && <div className="font-display text-lg font-700 text-sop-ink">{tier}</div>}
      {detail && <div className="text-sm text-muted-foreground">{detail}</div>}
      <div className="mt-3 text-2xl font-800 text-sop-blue font-display">{price}</div>
    </div>
  );
}

/* ---------- Decorative confetti blob for section corners ---------- */
export function BlobDecor({ className = "" }) {
  return <div className={`animate-sop-blob bg-sop-yellow/30 ${className}`} />;
}
