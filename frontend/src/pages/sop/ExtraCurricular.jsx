import PageHero from "@/components/sop/PageHero";
import { EXTRA_CURRICULAR, IMAGES } from "@/lib/sopContent";
import { Reveal, SectionHeading, CTALink, ChipList } from "@/components/sop/Primitives";

export default function ExtraCurricular() {
  return (
    <div>
      <PageHero
        eyebrow="For Schools"
        color="coral"
        title="Extra-Curricular Clubs"
        subtitle={EXTRA_CURRICULAR.proposition}
      >
        <CTALink to="/contact" variant="yellow" size="lg">Enquire Today</CTALink>
      </PageHero>

      <section className="sop-container grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <img src={IMAGES.soccer} alt="Children taking part in a coach-led sports club" className="aspect-[4/3] w-full rounded-3xl object-cover shadow-play-lg" loading="lazy" />
        </Reveal>
        <Reveal delay={0.1}>
          <SectionHeading eyebrow="Activities" eyebrowColor="coral" title="Coach-led clubs, admin handled" subtitle="We handle the administration so your school can simply enjoy the sessions." />
          <div className="mt-6"><ChipList items={EXTRA_CURRICULAR.activities} color="coral" /></div>
        </Reveal>
      </section>
    </div>
  );
}
