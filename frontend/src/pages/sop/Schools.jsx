import { Link } from "react-router-dom";
import { ArrowRight, Sunrise, Dumbbell, Waves, Trophy, Calculator, Tent, Star, Phone } from "lucide-react";
import PageHero from "@/components/sop/PageHero";
import { SCHOOLS, CONTACT } from "@/lib/sopContent";
import { Reveal, SectionHeading, CTALink, TickList } from "@/components/sop/Primitives";

const ICONS = { Sunrise, Dumbbell, Waves, Trophy, Calculator, Tent, Star };

export default function Schools() {
  return (
    <div>
      <PageHero
        eyebrow="For Schools"
        color="blue"
        title="Reliable sport, swimming and wraparound care"
        subtitle={SCHOOLS.coreMessage}
      >
        <CTALink to="/contact" variant="yellow" size="lg">Enquire Today</CTALink>
        <a href={CONTACT.phoneHref} className="inline-flex items-center justify-center gap-2 rounded-full bg-white/15 px-8 py-4 font-display font-600 text-white ring-2 ring-white/40 transition hover:bg-white/25"><Phone className="h-5 w-5" /> {CONTACT.phone}</a>
      </PageHero>

      <section className="sop-container">
        <SectionHeading center eyebrow="Our services" title="Everything your school needs, in one place" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SCHOOLS.services.map((s, i) => {
            const Icon = ICONS[s.icon];
            return (
              <Reveal key={s.to + s.title} delay={(i % 3) * 0.07}>
                <Link to={s.to} className="group flex h-full flex-col rounded-3xl bg-white p-6 shadow-play ring-1 ring-sop-border transition-all hover:-translate-y-1 hover:shadow-play-lg">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-sop-blue/10 text-sop-blue"><Icon className="h-7 w-7" /></span>
                  <h3 className="mt-4 font-display text-lg font-700 text-sop-ink">{s.title}</h3>
                  <span className="mt-5 inline-flex items-center gap-2 font-display font-700 text-sop-blue">Learn More <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" /></span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Suitability CTA */}
      <section className="sop-container mt-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sop-green to-sop-blue p-8 text-white shadow-play-lg sm:p-12">
          <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-sop-yellow/25 blur-3xl" />
          <div className="relative grid items-center gap-8 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-700">{SCHOOLS.suitability.title}</h2>
              <div className="mt-5"><TickList items={SCHOOLS.suitability.points} color="green" className="sm:grid-cols-1 [&_span:last-child]:text-white/90 [&_span:first-child]:bg-white/20 [&_span:first-child]:text-white" /></div>
              <CTALink to="/contact" variant="yellow" size="lg" className="mt-7">Book a suitability call</CTALink>
            </div>
            <div className="flex items-center gap-3 rounded-3xl bg-white/10 p-6 ring-1 ring-white/20">
              <Star className="h-8 w-8 text-sop-yellow" />
              <p className="font-display text-lg font-600">A quick, no-pressure chat about timetable, space, costs and outcomes.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
