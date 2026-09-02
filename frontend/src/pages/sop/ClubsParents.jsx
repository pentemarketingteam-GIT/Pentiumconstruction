import PageHero from "@/components/sop/PageHero";
import { CLUBS_PARENTS, IMAGES } from "@/lib/sopContent";
import { Reveal, SectionHeading, BookNowButton, CTALink, ChipList, TickList } from "@/components/sop/Primitives";

export default function ClubsParents() {
  const c = CLUBS_PARENTS;
  return (
    <div>
      <PageHero
        eyebrow="Parents"
        color="blue"
        title="Before & After School Clubs"
        subtitle={c.proposition}
      >
        <BookNowButton size="lg" variant="yellow" />
        <CTALink to="/contact" variant="white" size="lg">Enquire Now</CTALink>
      </PageHero>

      <section className="sop-container grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <img src={IMAGES.playground} alt="Children active at a before and after school club" className="aspect-[4/3] w-full rounded-3xl object-cover shadow-play-lg" loading="lazy" />
        </Reveal>
        <Reveal delay={0.1}>
          <SectionHeading eyebrow="What they do" eyebrowColor="green" title="Active bodies, creative minds" subtitle="A varied programme that keeps children engaged before and after the school day." />
          <div className="mt-6"><TickList items={c.activities} color="blue" className="sm:grid-cols-2" /></div>
        </Reveal>
      </section>

      <section className="sop-container mt-20">
        <div className="rounded-3xl bg-white p-6 shadow-play ring-1 ring-sop-border sm:p-10">
          <SectionHeading eyebrow="Locations" eyebrowColor="purple" title="Clubs across Greater Manchester" />
          <div className="mt-6"><ChipList items={c.locations} color="purple" /></div>
        </div>
      </section>
    </div>
  );
}
