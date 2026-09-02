import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin, CalendarCheck, Sparkles, ShieldCheck, Apple,
  ArrowRight, Users, School, Heart, Star,
} from "lucide-react";
import ParticleField from "@/components/sop/ParticleField";
import { HOME, CONTACT } from "@/lib/sopContent";
import {
  Reveal, SectionHeading, CTALink, BookNowButton, Eyebrow, ChipList,
} from "@/components/sop/Primitives";

const ICONS = { MapPin, CalendarCheck, Sparkles, ShieldCheck, Apple };
const PROG_COLOR = {
  coral: "from-sop-coral/15 to-sop-coral/5 ring-sop-coral/20 text-sop-coral",
  blue: "from-sop-blue/15 to-sop-blue/5 ring-sop-blue/20 text-sop-blue",
  green: "from-sop-green/15 to-sop-green/5 ring-sop-green/20 text-sop-green",
  sky: "from-sop-sky/15 to-sop-sky/5 ring-sop-sky/25 text-sop-sky",
  purple: "from-sop-purple/15 to-sop-purple/5 ring-sop-purple/20 text-sop-purple",
};

export default function Home() {
  return (
    <div>
      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden bg-play-mesh pb-16 pt-8">
        <div className="sop-container">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sop-yellow via-[#ffd35e] to-sop-yellow px-6 py-12 shadow-play-lg sm:px-10 sm:py-16">
            <ParticleField density={1.1} />
            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-sop-ink px-4 py-1.5 text-sm font-700 uppercase tracking-wide font-display text-white">
                <Sparkles className="h-4 w-4 text-sop-yellow" /> {HOME.campaign.badge}
              </span>
              <h1 className="mt-5 font-display text-4xl font-700 leading-[1.02] text-sop-ink text-balance sm:text-6xl">
                {HOME.campaign.title}
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-sop-ink/80 sm:text-xl">
                {HOME.campaign.blurb}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <BookNowButton size="lg" variant="coral" />
                <CTALink to="/parents/holiday-camps" variant="white" size="lg">
                  Activity Timetables
                </CTALink>
              </div>
              <p className="mt-5 text-sm font-600 text-sop-ink/70">
                <Star className="mr-1 inline h-4 w-4 text-sop-coral" /> {HOME.campaign.note}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== TWO-AUDIENCE ENTRY ===================== */}
      <section className="sop-container -mt-6">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              tag: "For Parents", to: "/parents", color: "coral", Icon: Users,
              title: "Camps, clubs & activities",
              desc: "Holiday camps, before & after-school care and active days full of friendships and fun.",
              cta: "Explore for Parents",
            },
            {
              tag: "For Schools", to: "/schools", color: "blue", Icon: School,
              title: "PE, Swim:ED & wraparound care",
              desc: "Reliable sport, swimming and wraparound provision that reduces admin and staffing pressure.",
              cta: "Explore for Schools",
            },
          ].map((c, i) => (
            <Reveal key={c.to} delay={i * 0.1}>
              <Link
                to={c.to}
                className={`group relative block overflow-hidden rounded-3xl bg-white p-8 shadow-play ring-1 ring-sop-border transition-all hover:-translate-y-1 hover:shadow-play-lg`}
              >
                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${c.color === "coral" ? "bg-sop-coral/12 text-sop-coral" : "bg-sop-blue/12 text-sop-blue"}`}>
                  <c.Icon className="h-7 w-7" />
                </div>
                <Eyebrow color={c.color}>{c.tag}</Eyebrow>
                <h3 className="mt-3 font-display text-2xl font-700 text-sop-ink">{c.title}</h3>
                <p className="mt-2 text-muted-foreground">{c.desc}</p>
                <span className={`mt-5 inline-flex items-center gap-2 font-display font-700 ${c.color === "coral" ? "text-sop-coral" : "text-sop-blue"}`}>
                  {c.cta} <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===================== PARENT PROPOSITION ===================== */}
      <section className="sop-container mt-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="absolute -left-4 -top-4 h-24 w-24 animate-sop-blob bg-sop-yellow/40" />
              <img
                src="https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5"
                alt="Children enjoying a group parachute activity at camp"
                className="relative aspect-[4/3] w-full rounded-3xl object-cover shadow-play-lg"
                loading="lazy"
              />
              <div className="absolute -bottom-5 -right-4 rounded-2xl bg-white p-4 shadow-play ring-1 ring-sop-border">
                <div className="flex items-center gap-2 font-display font-700 text-sop-ink">
                  <Heart className="h-5 w-5 text-sop-coral" /> “Can I Go Back?” Guarantee
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading
              eyebrow="Why parents choose us"
              eyebrowColor="coral"
              title="Active days, real friendships and qualified staff"
            />
            <ul className="mt-6 space-y-4">
              {HOME.parentProps.map((p) => (
                <li key={p} className="flex items-start gap-3 rounded-2xl bg-sop-mist/70 p-4">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sop-green/15 text-sop-green">
                    <Star className="h-4 w-4" />
                  </span>
                  <span className="text-[15px] leading-relaxed text-sop-ink/85">{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ===================== MAIN PROGRAMMES ===================== */}
      <section className="sop-container mt-24">
        <SectionHeading
          center
          eyebrow="What we do"
          title="Our main programmes"
          subtitle="From holiday camps to school sport — purposeful play for every child."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {HOME.programmes.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 0.08}>
              <Link
                to={p.to}
                className={`group flex h-full flex-col justify-between rounded-3xl bg-gradient-to-br p-6 ring-2 transition-all hover:-translate-y-1 ${PROG_COLOR[p.color]}`}
              >
                <h3 className="font-display text-xl font-700 text-sop-ink">{p.title}</h3>
                <span className="mt-6 inline-flex items-center gap-2 font-display font-700">
                  Learn More <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===================== BENEFITS ===================== */}
      <section className="mt-24 bg-play-mesh py-16">
        <div className="sop-container">
          <SectionHeading center eyebrow="Parent benefits" eyebrowColor="green" title="Everything set up for busy families" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {HOME.benefits.map((b, i) => {
              const Icon = ICONS[b.icon];
              return (
                <Reveal key={b.title} delay={i * 0.06}>
                  <div className="flex h-full flex-col items-center rounded-3xl bg-white p-6 text-center shadow-play ring-1 ring-sop-border">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-sop-blue/10 text-sop-blue">
                      <Icon className="h-7 w-7" />
                    </span>
                    <p className="mt-4 font-display font-600 text-sop-ink">{b.title}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== VENUES ===================== */}
      <section className="sop-container mt-24">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Holiday camp venues"
              eyebrowColor="purple"
              title="Camps across Greater Manchester"
              subtitle="On-site convenience wherever your family is based."
            />
            <BookNowButton size="lg" className="mt-6" />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-3xl bg-white p-6 shadow-play ring-1 ring-sop-border sm:p-8">
              <ChipList items={HOME.venues} color="purple" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== SCHOOL PROPOSITION ===================== */}
      <section className="sop-container mt-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sop-blue to-sop-bluedeep p-8 text-white shadow-play-lg sm:p-14">
          <div className="pointer-events-none absolute -right-10 top-0 h-52 w-52 rounded-full bg-sop-yellow/20 blur-3xl" />
          <div className="relative grid items-center gap-8 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-700 uppercase font-display ring-1 ring-white/30">
                For Schools
              </span>
              <h2 className="mt-4 font-display text-3xl font-700 leading-tight">Less admin. More active, inspired children.</h2>
              <p className="mt-4 max-w-xl text-white/85">{HOME.schoolProp}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <CTALink to="/schools" variant="yellow" size="lg">Explore School Services</CTALink>
                <CTALink to="/contact" variant="white" size="lg">See if this works for our school</CTALink>
              </div>
            </div>
            <motion.img
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              src="https://images.unsplash.com/photo-1706841534379-95682aac32d4?crop=entropy&cs=srgb&fm=jpg&q=85"
              alt="A PE coach leading a school sports session"
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-play-lg"
              loading="lazy"
            />
          </div>
        </div>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Call us on <a href={CONTACT.phoneHref} className="font-700 text-sop-blue">{CONTACT.phone}</a> · {CONTACT.email}
        </p>
      </section>
    </div>
  );
}
