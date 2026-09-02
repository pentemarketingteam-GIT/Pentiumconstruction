import PageHero from "@/components/sop/PageHero";
import { FAQS, PE } from "@/lib/sopContent";
import { SectionHeading, BookNowButton, PriceCard, Reveal } from "@/components/sop/Primitives";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Faqs() {
  return (
    <div>
      <PageHero
        eyebrow="Holiday Camps"
        color="purple"
        title="FAQs & Pricing"
        subtitle="Everything you need to know before you book \u2014 hours, ages, pricing and more."
      >
        <BookNowButton size="lg" variant="yellow" />
      </PageHero>

      <section className="sop-container grid gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <SectionHeading eyebrow="Good to know" title="Frequently asked questions" />
          <Accordion type="single" collapsible className="mt-6">
            {FAQS.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="mb-3 overflow-hidden rounded-2xl border-2 border-sop-border bg-white px-5">
                <AccordionTrigger className="py-4 text-left font-display text-base font-700 text-sop-ink hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="pb-4 text-[15px] leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div>
          <SectionHeading eyebrow="Pricing" eyebrowColor="green" title="Holiday camp day rates" />
          <Reveal>
            <div className="mt-6 rounded-3xl bg-gradient-to-br from-sop-blue to-sop-purple p-6 text-white shadow-play-lg">
              <p className="text-sm uppercase tracking-wide text-white/70 font-display font-700">Per day (venue dependent)</p>
              <p className="mt-2 font-display text-4xl font-800">\u00a325.49\u2013\u00a330.49</p>
              <p className="mt-2 text-white/85 text-sm">Standard hours 09:00\u201317:00. Early drop-off from 08:00 and late collection until 18:00 for an additional charge.</p>
            </div>
          </Reveal>
          <p className="mt-4 text-sm text-muted-foreground">Full-day sessions only. Childcare vouchers accepted.</p>
        </div>
      </section>

      {/* School sports pricing quick reference */}
      <section className="sop-container mt-20">
        <SectionHeading center eyebrow="For schools" eyebrowColor="blue" title="School sports provision pricing" />
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {PE.pricing.map((p, i) => (
            <PriceCard key={p.tier} tier={p.tier} detail={p.detail} price={p.price} highlight={i === 1} color={["yellow", "blue", "green"][i]} />
          ))}
        </div>
      </section>
    </div>
  );
}
