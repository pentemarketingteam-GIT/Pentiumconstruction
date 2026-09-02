import PageHero from "@/components/sop/PageHero";
import { TOURNAMENTS, IMAGES } from "@/lib/sopContent";
import { Reveal, SectionHeading, CTALink, TickList } from "@/components/sop/Primitives";

export default function Tournaments() {
  return (
    <div>
      <PageHero
        eyebrow="For Schools"
        color="green"
        title="Free Sports Tournaments"
        subtitle={TOURNAMENTS.proposition}
      >
        <CTALink to="/contact" variant="yellow" size="lg">Register Interest</CTALink>
      </PageHero>

      <section className="sop-container grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <img src={IMAGES.tournament} alt="Primary school children competing in a sports tournament" className="aspect-[4/3] w-full rounded-3xl object-cover shadow-play-lg" loading="lazy" />
        </Reveal>
        <Reveal delay={0.1}>
          <SectionHeading eyebrow="Benefits" eyebrowColor="green" title="Competition, made easy and free" />
          <div className="mt-6"><TickList items={TOURNAMENTS.benefits} color="green" className="sm:grid-cols-1" /></div>
          <CTALink to="/contact" size="lg" className="mt-7">Register Interest</CTALink>
        </Reveal>
      </section>
    </div>
  );
}
