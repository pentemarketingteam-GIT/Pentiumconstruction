import PageHero from "@/components/sop/PageHero";
import { SWIM, IMAGES } from "@/lib/sopContent";
import { Reveal, SectionHeading, CTALink, TickList, PriceCard, ChipList } from "@/components/sop/Primitives";

export default function SwimEd() {
  return (
    <div>
      <PageHero
        eyebrow="Swim:ED"
        color="sky"
        title="Making Waves in Primary Education"
        subtitle={SWIM.proposition}
      >
        <CTALink to="/contact" variant="yellow" size="lg">Register Interest</CTALink>
        <CTALink to="/contact" variant="white" size="lg">Take the Primary School Swimming Review</CTALink>
      </PageHero>

      <section className="sop-container grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <img src={IMAGES.swimGroup} alt="Children learning to swim in an on-site pool" className="aspect-[4/3] w-full rounded-3xl object-cover shadow-play-lg" loading="lazy" />
        </Reveal>
        <Reveal delay={0.1}>
          <SectionHeading eyebrow="Benefits" eyebrowColor="blue" title="Swimming that comes to you" />
          <div className="mt-6"><TickList items={SWIM.benefits} color="blue" className="sm:grid-cols-1" /></div>
        </Reveal>
      </section>

      <section className="sop-container mt-20">
        <div className="rounded-3xl bg-white p-6 shadow-play ring-1 ring-sop-border sm:p-10">
          <SectionHeading eyebrow="Features" eyebrowColor="green" title="A complete, curriculum-aligned programme" />
          <div className="mt-6"><ChipList items={SWIM.features} color="green" /></div>
        </div>
      </section>

      {/* Six-step process */}
      <section className="sop-container mt-20">
        <SectionHeading center eyebrow="How it works" eyebrowColor="purple" title="Six simple steps" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SWIM.process.map((step, i) => (
            <Reveal key={step} delay={(i % 3) * 0.07}>
              <div className="flex items-center gap-4 rounded-3xl bg-gradient-to-br from-sop-sky/10 to-sop-blue/5 p-5 ring-2 ring-sop-sky/20">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-sop-blue text-white font-display text-lg font-700">{i + 1}</span>
                <span className="font-display text-lg font-700 text-sop-ink">{step}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="sop-container mt-20">
        <SectionHeading center eyebrow="Pricing" eyebrowColor="yellow" title="Transparent, cost-efficient provision" />
        <div className="mx-auto mt-8 grid max-w-2xl gap-5 sm:grid-cols-2">
          {SWIM.pricing.map((p) => (
            <PriceCard key={p.label} tier={p.label} price={p.price} color="sky" />
          ))}
        </div>
        <div className="mt-10 text-center">
          <CTALink to="/contact" size="lg">Register Interest</CTALink>
        </div>
      </section>
    </div>
  );
}
