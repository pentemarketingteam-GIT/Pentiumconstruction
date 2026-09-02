import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { NAV, CONTACT } from "@/lib/sopContent";
import { BookNowButton } from "@/components/sop/Primitives";

export default function Footer() {
  return (
    <footer className="mt-24 bg-sop-ink text-white">
      {/* CTA band */}
      <div className="sop-container -mb-px">
        <div className="relative -translate-y-14 overflow-hidden rounded-3xl bg-gradient-to-br from-sop-blue to-sop-purple p-8 text-center shadow-play-lg sm:p-12">
          <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-sop-yellow/30 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-6 h-44 w-44 rounded-full bg-sop-coral/30 blur-2xl" />
          <h2 className="relative font-display text-2xl font-700 sm:text-3xl">Ready to get your children playing?</h2>
          <p className="relative mx-auto mt-3 max-w-xl text-white/85">
            Book a place at a holiday camp or club, or talk to us about bringing School of Play to your school.
          </p>
          <div className="relative mt-6 flex flex-wrap justify-center gap-3">
            <BookNowButton variant="yellow" size="lg" />
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full bg-white/15 px-8 py-4 font-display font-600 text-white ring-2 ring-white/40 transition hover:bg-white/25"
            >
              Enquire Today
            </Link>
          </div>
        </div>
      </div>

      <div className="sop-container grid gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-sop-blue">
              <span className="font-display text-xl font-700">S</span>
            </span>
            <span className="font-display text-xl font-700">School of Play</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Purposeful play and physical activity for children — holiday camps, wraparound care and school sport across Greater Manchester.
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg font-700">Parents</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            {NAV.parents.links.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-sop-yellow">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg font-700">Schools</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            {NAV.schools.links.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-sop-yellow">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg font-700">Get in touch</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sop-yellow" />
              <span>{CONTACT.address}</span>
            </li>
            <li>
              <a href={CONTACT.phoneHref} className="flex items-center gap-2.5 hover:text-sop-yellow">
                <Phone className="h-4 w-4 text-sop-yellow" /> {CONTACT.phone}
              </a>
            </li>
            <li>
              <a href={CONTACT.emailHref} className="flex items-center gap-2.5 hover:text-sop-yellow">
                <Mail className="h-4 w-4 text-sop-yellow" /> {CONTACT.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="sop-container flex flex-col items-center justify-between gap-3 py-6 text-sm text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} School of Play. All rights reserved.</p>
          <p>Ofsted-registered · Qualified teams · Purposeful play</p>
        </div>
      </div>
    </footer>
  );
}
