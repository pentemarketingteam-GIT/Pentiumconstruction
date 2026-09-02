import PageHero from "@/components/sop/PageHero";
import { GSM, CONTACT } from "@/lib/sopContent";
import { Reveal, SectionHeading, CTALink, TickList, PriceCard } from "@/components/sop/Primitives";
import { Phone } from "lucide-react";

export default function GameSetMaths() {
  return (
    <div>
      <PageHero
        eyebrow="For Schools"
        color="purple"
        title="Game, Set & MATHS"
        subtitle={GSM.proposition}
      >
        <CTALink to="/contact" variant="yellow" size="lg">Book Your Workshop</CTALink>
        <a href={CONTACT.phoneHref} className="inline-flex items-center justify-center gap-2 rounded-full bg-white/15 px-8 py-4 font-display font-600 text-white ring-2 ring-white/40 transition hover:bg-white/25"><Phone className="h-5 w-5" /> {CONTACT.phone}</a>
      </PageHero>

      <section className="sop-container grid gap-10 lg:grid-cols-2">
        <Reveal>
          <SectionHeading eyebrow="Benefits" eyebrowColor="green" title="Where tennis meets numbers" />
          <div className="mt-6"><TickList items={GSM.benefits} color="purple" className="sm:grid-cols-1" /></div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-3xl bg-white p-6 shadow-play ring-1 ring-sop-border sm:p-8">
            <h3 className="font-display text-xl font-700 text-sop-ink">What\u2019s included</h3>
            <div className="mt-5"><TickList items={GSM.included} color="blue" className="sm:grid-cols-1" /></div>
          </div>
        </Reveal>
      </section>

      <section className="sop-container mt-20">
        <SectionHeading center eyebrow="Pricing" eyebrowColor="yellow" title="Choose your workshop length" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {GSM.pricing.map((p, i) => (
            <PriceCard key={p.label} tier={p.label} price={p.price} highlight={i === 1} color={["yellow", "blue", "green", "purple"][i]} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <CTALink to="/contact" size="lg">Book Your Workshop</CTALink>
        </div>
      </section>
    </div>
  );
}
