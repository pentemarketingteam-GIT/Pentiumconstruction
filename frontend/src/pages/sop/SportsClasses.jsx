import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/sop/PageHero";
import { Reveal, CTALink, BookNowButton } from "@/components/sop/Primitives";

// Note: the content inventory lists \"Sports Classes\" as a Parents navigation/section
// label only, with no supporting service copy. This page therefore routes visitors
// into related, documented provision rather than inventing service details.
export default function SportsClasses() {
  return (
    <div>
      <PageHero
        eyebrow="Parents"
        color="green"
        title="Sports Classes"
        subtitle="Active sessions for children as part of our clubs and school provision."
      >
        <BookNowButton size="lg" variant="yellow" />
        <CTALink to="/contact" variant="white" size="lg">Enquire Now</CTALink>
      </PageHero>

      <section className="sop-container">
        <div className="grid gap-5 sm:grid-cols-2">
          {[
            { title: "Before & After School Clubs", desc: "Sports and activities woven through our wraparound care.", to: "/parents/clubs" },
            { title: "Extra-Curricular Clubs", desc: "Coach-led sports sessions delivered through schools.", to: "/schools/extra-curricular" },
          ].map((s, i) => (
            <Reveal key={s.to} delay={i * 0.08}>
              <Link to={s.to} className="group flex h-full flex-col rounded-3xl bg-white p-7 shadow-play ring-1 ring-sop-border transition-all hover:-translate-y-1 hover:shadow-play-lg">
                <h3 className="font-display text-xl font-700 text-sop-ink">{s.title}</h3>
                <p className="mt-2 flex-1 text-muted-foreground">{s.desc}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-display font-700 text-sop-green">Explore <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 rounded-3xl bg-sop-mist p-8 text-center">
          <h3 className="font-display text-2xl font-700 text-sop-ink">Looking for something specific?</h3>
          <p className="mt-2 text-muted-foreground">Get in touch and we\u2019ll point you to the right sessions for your child.</p>
          <CTALink to="/contact" size="lg" className="mt-5">Enquire Today</CTALink>
        </div>
      </section>
    </div>
  );
}
