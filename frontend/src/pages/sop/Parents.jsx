import { Link } from "react-router-dom";
import { ArrowRight, Tent, Sunrise, Activity, BookOpen, HelpCircle, Award, Handshake, BadgeCheck } from "lucide-react";
import PageHero from "@/components/sop/PageHero";
import { Reveal, SectionHeading, BookNowButton, CTALink } from "@/components/sop/Primitives";

const SECTIONS = [
  { title: "Holiday Camps", desc: "Active, themed camp days for ages 3.5\u201311.", to: "/parents/holiday-camps", Icon: Tent, color: "coral" },
  { title: "Before & After School Clubs", desc: "Reliable wraparound care across Greater Manchester.", to: "/parents/clubs", Icon: Sunrise, color: "blue" },
  { title: "Sports Classes", desc: "Active sessions that build skills and confidence.", to: "/parents/sports-classes", Icon: Activity, color: "green" },
  { title: "How To Book", desc: "Simple iPal booking tutorials, step by step.", to: "/parents/how-to-book", Icon: BookOpen, color: "purple" },
  { title: "Holiday Camp FAQs & Pricing", desc: "Hours, ages, pricing and everything you need to know.", to: "/parents/faqs", Icon: HelpCircle, color: "coral" },
];

const TRUST = [
  { label: "Ofsted Reports", Icon: Award },
  { label: "Our Partners", Icon: Handshake },
  { label: "Proudly Recognised", Icon: BadgeCheck },
];

const TONE = {
  coral: "bg-sop-coral/12 text-sop-coral",
  blue: "bg-sop-blue/12 text-sop-blue",
  green: "bg-sop-green/12 text-sop-green",
  purple: "bg-sop-purple/12 text-sop-purple",
};

export default function Parents() {
  return (
    <div>
      <PageHero
        eyebrow="For Parents"
        color="coral"
        title="Camps, clubs and active days your children will love"
        subtitle="Holiday and after-school care centred on active days, friendships and qualified staff."
      >
        <BookNowButton size="lg" variant="yellow" />
        <CTALink to="/contact" variant="white" size="lg">Enquire Now</CTALink>
      </PageHero>

      <section className="sop-container">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map((s, i) => (
            <Reveal key={s.to} delay={(i % 3) * 0.08}>
              <Link to={s.to} className="group flex h-full flex-col rounded-3xl bg-white p-6 shadow-play ring-1 ring-sop-border transition-all hover:-translate-y-1 hover:shadow-play-lg">
                <span className={`grid h-14 w-14 place-items-center rounded-2xl ${TONE[s.color]}`}><s.Icon className="h-7 w-7" /></span>
                <h3 className="mt-4 font-display text-xl font-700 text-sop-ink">{s.title}</h3>
                <p className="mt-2 flex-1 text-muted-foreground">{s.desc}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-display font-700 text-sop-blue">Explore <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="sop-container mt-20">
        <SectionHeading center eyebrow="Trusted by families" eyebrowColor="green" title="Recognised, registered and reviewed" />
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {TRUST.map((t) => (
            <div key={t.label} className="flex items-center gap-3 rounded-2xl bg-sop-mist/70 p-5">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-sop-blue shadow-play"><t.Icon className="h-6 w-6" /></span>
              <span className="font-display font-700 text-sop-ink">{t.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
