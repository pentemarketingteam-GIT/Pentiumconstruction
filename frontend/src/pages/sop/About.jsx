import PageHero from "@/components/sop/PageHero";
import { WHY_US, IMAGES } from "@/lib/sopContent";
import { Reveal, SectionHeading, ChipList, CTALink } from "@/components/sop/Primitives";
import { ShieldCheck, Flame, Users, Lightbulb, Target, Eye, Award } from "lucide-react";

const VALUE_ICONS = [ShieldCheck, Flame, Users, Lightbulb];

export default function About() {
  return (
    <div>
      <PageHero
        eyebrow="About Us"
        color="purple"
        title="Why Choose Us?"
        subtitle="Purposeful play and physical activity that helps children lead unique, empowered and connected lives."
      >
        <CTALink to="/team" variant="yellow" size="lg">Meet the Team</CTALink>
        <CTALink to="/contact" variant="white" size="lg">Get in touch</CTALink>
      </PageHero>

      {/* Vision & Mission */}
      <section className="sop-container grid gap-6 lg:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-3xl bg-gradient-to-br from-sop-blue to-sop-purple p-8 text-white shadow-play-lg">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/20"><Eye className="h-6 w-6" /></span>
            <h2 className="mt-4 font-display text-2xl font-700">Our Vision</h2>
            <p className="mt-3 text-white/90 leading-relaxed">{WHY_US.vision}</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="h-full rounded-3xl bg-gradient-to-br from-sop-green to-sop-blue p-8 text-white shadow-play-lg">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/20"><Target className="h-6 w-6" /></span>
            <h2 className="mt-4 font-display text-2xl font-700">Our Mission</h2>
            <p className="mt-3 text-white/90 leading-relaxed">{WHY_US.mission}</p>
          </div>
        </Reveal>
      </section>

      {/* Values */}
      <section className="sop-container mt-20">
        <SectionHeading center eyebrow="Our values" title="What we stand for" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_US.values.map((v, i) => {
            const Icon = VALUE_ICONS[i];
            return (
              <Reveal key={v} delay={i * 0.07}>
                <div className="flex h-full flex-col items-center rounded-3xl bg-white p-6 text-center shadow-play ring-1 ring-sop-border">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-sop-coral/12 text-sop-coral"><Icon className="h-7 w-7" /></span>
                  <p className="mt-4 font-display font-700 text-sop-ink">{v}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Themes + image */}
      <section className="sop-container mt-20 grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <img src={IMAGES.running} alt="Children running and having fun outdoors" className="aspect-[4/3] w-full rounded-3xl object-cover shadow-play-lg" loading="lazy" />
        </Reveal>
        <Reveal delay={0.1}>
          <SectionHeading eyebrow="Our themes" eyebrowColor="green" title="Memories to last a lifetime" />
          <div className="mt-6"><ChipList items={WHY_US.themes} color="green" /></div>
        </Reveal>
      </section>

      {/* Trust */}
      <section className="sop-container mt-20">
        <div className="flex flex-col items-center gap-4 rounded-3xl bg-sop-mist p-8 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-sop-blue text-white"><Award className="h-7 w-7" /></span>
          <p className="max-w-2xl font-display text-lg font-600 text-sop-ink">{WHY_US.trust}</p>
        </div>
      </section>
    </div>
  );
}
