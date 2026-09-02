import PageHero from "@/components/sop/PageHero";
import { PE, IMAGES } from "@/lib/sopContent";
import { Reveal, SectionHeading, CTALink, TickList, PriceCard } from "@/components/sop/Primitives";

export default function PEProvision() {
  return (
    <div>
      <PageHero
        eyebrow="For Schools"
        color="green"
        title="PE & Sports Provision"
        subtitle={PE.coreMessage}
      >
        <CTALink to="/contact" variant="yellow" size="lg">Register Your Interest</CTALink>
      </PageHero>

      <section className="sop-container grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <img src={IMAGES.peLesson} alt="A PE coach leading a primary school sports session" className="aspect-[4/3] w-full rounded-3xl object-cover shadow-play-lg" loading="lazy" />
        </Reveal>
        <Reveal delay={0.1}>
          <SectionHeading eyebrow="More than PE" eyebrowColor="blue" title="Additional provision" />
          <div className="mt-5"><TickList items={PE.additional} color="blue" className="sm:grid-cols-1" /></div>
          <h3 className="mt-8 font-display text-xl font-700 text-sop-ink">Lunchtime benefits</h3>
          <div className="mt-4"><TickList items={PE.lunchtimeBenefits} color="green" className="sm:grid-cols-1" /></div>
        </Reveal>
      </section>

      <section className="sop-container mt-20">
        <SectionHeading center eyebrow="Pricing" eyebrowColor="yellow" title="Flexible packages for every school" />
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {PE.pricing.map((p, i) => (
            <PriceCard key={p.tier} tier={p.tier} detail={p.detail} price={p.price} highlight={i === 1} color={["yellow", "blue", "green"][i]} />
          ))}
        </div>
        <div className="mt-6 rounded-3xl bg-white p-6 shadow-play ring-1 ring-sop-border">
          <h3 className="font-display text-lg font-700 text-sop-ink">Add-ons</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {PE.addons.map((a) => (
              <div key={a.label} className="flex items-center justify-between rounded-2xl bg-sop-mist/70 px-4 py-3">
                <span className="font-600 text-sop-ink">{a.label}</span>
                <span className="font-display font-700 text-sop-blue">{a.price}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 text-center">
          <CTALink to="/contact" size="lg">Register Your Interest</CTALink>
        </div>
      </section>
    </div>
  );
}
