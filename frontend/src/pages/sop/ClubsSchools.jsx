import PageHero from "@/components/sop/PageHero";
import { CLUBS_SCHOOLS } from "@/lib/sopContent";
import { Reveal, SectionHeading, CTALink, TickList, ChipList } from "@/components/sop/Primitives";

export default function ClubsSchools() {
  const c = CLUBS_SCHOOLS;
  return (
    <div>
      <PageHero
        eyebrow="For Schools"
        color="blue"
        title="Before & After School Clubs"
        subtitle={c.positioning}
      >
        <CTALink to="/contact" variant="yellow" size="lg">Enquire Today</CTALink>
      </PageHero>

      <section className="sop-container">
        <SectionHeading eyebrow="Benefits for schools" title="Wraparound care without the workload" />
        <div className="mt-6 rounded-3xl bg-white p-6 shadow-play ring-1 ring-sop-border sm:p-8">
          <TickList items={c.benefits} color="blue" />
        </div>
      </section>

      <section className="sop-container mt-16">
        <div className="rounded-3xl bg-gradient-to-br from-sop-blue/8 to-sop-purple/8 p-6 ring-2 ring-sop-blue/15 sm:p-10">
          <SectionHeading eyebrow="Example activities" eyebrowColor="purple" title="Always something to look forward to" />
          <div className="mt-6"><ChipList items={c.activities} color="purple" /></div>
        </div>
      </section>

      <section className="sop-container mt-16 text-center">
        <CTALink to="/contact" size="lg">Enquire Today</CTALink>
      </section>
    </div>
  );
}
