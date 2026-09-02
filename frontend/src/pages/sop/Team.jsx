import PageHero from "@/components/sop/PageHero";
import { TEAM } from "@/lib/sopContent";
import { Reveal, SectionHeading } from "@/components/sop/Primitives";

const GRAD = [
  "from-sop-blue to-sop-purple", "from-sop-coral to-sop-purple", "from-sop-green to-sop-blue",
  "from-sop-yellow to-sop-coral", "from-sop-sky to-sop-blue", "from-sop-purple to-sop-blue",
];

function initials(name) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

function PersonGrid({ people }) {
  return (
    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {people.map((p, i) => (
        <Reveal key={p.name + p.role} delay={(i % 4) * 0.05}>
          <div className="flex flex-col items-center rounded-3xl bg-white p-6 text-center shadow-play ring-1 ring-sop-border">
            <span className={`grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br ${GRAD[i % GRAD.length]} font-display text-2xl font-700 text-white shadow-play`}>{initials(p.name)}</span>
            <p className="mt-4 font-display text-lg font-700 text-sop-ink">{p.name}</p>
            <p className="text-sm font-600 text-sop-blue">{p.role}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export default function Team() {
  return (
    <div>
      <PageHero
        eyebrow="About Us"
        color="coral"
        title="Meet the Team"
        subtitle="The passionate, qualified people behind every camp, club and school session."
      />

      <section className="sop-container">
        <SectionHeading eyebrow="Senior Leadership & Office" title="Leading with purpose" />
        <PersonGrid people={TEAM.leadership} />
      </section>

      <section className="sop-container mt-20">
        <SectionHeading eyebrow="Setting Leaders" eyebrowColor="green" title="On the ground, every day" subtitle="Additional locations coming soon." />
        <PersonGrid people={TEAM.settingLeaders} />
      </section>

      <section className="sop-container mt-20">
        <SectionHeading eyebrow="PE Educators & Coaches" eyebrowColor="purple" title="Inspiring active children" />
        <PersonGrid people={TEAM.coaches} />
      </section>
    </div>
  );
}
