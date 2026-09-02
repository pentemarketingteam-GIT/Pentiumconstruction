import { ShieldCheck, Palette, Trophy, PackageCheck, Ban } from "lucide-react";
import PageHero from "@/components/sop/PageHero";
import { HOLIDAY_CAMPS, IMAGES } from "@/lib/sopContent";
import { Reveal, SectionHeading, BookNowButton, CTALink, ChipList, TickList, Eyebrow } from "@/components/sop/Primitives";

export default function HolidayCamps() {
  const c = HOLIDAY_CAMPS;
  return (
    <div>
      <PageHero
        eyebrow={c.campaignTitle}
        color="coral"
        title="Holiday Camps for ages 3.5\u201311"
        subtitle={c.campaignBlurb}
      >
        <BookNowButton size="lg" variant="yellow" />
        <CTALink to="/parents/faqs" variant="white" size="lg">FAQs & Pricing</CTALink>
      </PageHero>

      {/* Safety banner */}
      <section className="sop-container">
        <div className="flex flex-col items-center gap-4 rounded-3xl bg-gradient-to-br from-sop-green to-sop-blue p-6 text-center text-white shadow-play sm:flex-row sm:text-left">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/20"><ShieldCheck className="h-8 w-8" /></span>
          <p className="font-display text-lg font-600">{c.safety}</p>
        </div>
      </section>

      {/* Image + locations */}
      <section className="sop-container mt-16 grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <img src={IMAGES.parachute} alt="Children playing together at a holiday camp" className="aspect-[4/3] w-full rounded-3xl object-cover shadow-play-lg" loading="lazy" />
        </Reveal>
        <Reveal delay={0.1}>
          <SectionHeading eyebrow="Where we run" eyebrowColor="purple" title="Camp locations" subtitle="Full-day camps in venues right across the region." />
          <div className="mt-6"><ChipList items={c.locations} color="purple" /></div>
        </Reveal>
      </section>

      {/* Create groups */}
      <section className="sop-container mt-20">
        <div className="rounded-3xl bg-white p-6 shadow-play ring-1 ring-sop-border sm:p-10">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sop-coral/12 text-sop-coral"><Palette className="h-6 w-6" /></span>
            <div>
              <h2 className="font-display text-2xl font-700 text-sop-ink">Create Groups</h2>
              <Eyebrow color="coral">{c.createGroups.ages}</Eyebrow>
            </div>
          </div>
          <div className="mt-6"><ChipList items={c.createGroups.items} color="coral" /></div>
        </div>
      </section>

      {/* Multi-sports */}
      <section className="sop-container mt-8">
        <div className="rounded-3xl bg-white p-6 shadow-play ring-1 ring-sop-border sm:p-10">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sop-blue/12 text-sop-blue"><Trophy className="h-6 w-6" /></span>
            <div>
              <h2 className="font-display text-2xl font-700 text-sop-ink">Multi-Sports Groups</h2>
              <Eyebrow color="blue">{c.multiSports.ages}</Eyebrow>
            </div>
          </div>
          <div className="mt-6"><ChipList items={c.multiSports.items} color="blue" /></div>
        </div>
      </section>

      {/* Bring / not bring */}
      <section className="sop-container mt-20 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl bg-sop-green/8 p-6 ring-2 ring-sop-green/20 sm:p-8">
          <div className="flex items-center gap-2 font-display text-xl font-700 text-sop-ink"><PackageCheck className="h-6 w-6 text-sop-green" /> What to bring</div>
          <TickList items={c.whatToBring} color="green" className="mt-5 sm:grid-cols-1" />
        </div>
        <div className="rounded-3xl bg-sop-coral/8 p-6 ring-2 ring-sop-coral/20 sm:p-8">
          <div className="flex items-center gap-2 font-display text-xl font-700 text-sop-ink"><Ban className="h-6 w-6 text-sop-coral" /> What not to bring</div>
          <ul className="mt-5 space-y-3">
            {c.whatNotToBring.map((i) => (
              <li key={i} className="flex items-start gap-3"><span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sop-coral/15 text-sop-coral"><Ban className="h-3.5 w-3.5" strokeWidth={3} /></span><span className="text-[15px] text-sop-ink/85">{i}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sop-container mt-16 text-center">
        <div className="rounded-3xl bg-sop-mist p-8">
          <h3 className="font-display text-2xl font-700 text-sop-ink">Ready to book?</h3>
          <p className="mt-2 text-muted-foreground">Create an account through iPal to reserve your child\u2019s place.</p>
          <BookNowButton size="lg" className="mt-5" />
        </div>
      </section>
    </div>
  );
}
