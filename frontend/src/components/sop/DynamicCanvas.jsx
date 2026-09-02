import {
  HOLIDAY_CAMPS, FAQS, CLUBS_PARENTS, CLUBS_SCHOOLS, SCHOOLS, PE, SWIM,
  GSM, EXTRA_CURRICULAR, TOURNAMENTS, WHY_US, TEAM, HOME, IMAGES, CONTACT,
} from "@/lib/sopContent";
import { ChipList, TickList, PriceCard, BookNowButton, CTALink, Eyebrow } from "@/components/sop/Primitives";
import { Waves, Trophy, Calculator, Dumbbell, Sunrise, Star, Phone, Mail, MapPin, Sparkles } from "lucide-react";

function Panel({ title, eyebrow, color = "blue", children }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-play ring-1 ring-sop-border">
      {eyebrow && <Eyebrow color={color}>{eyebrow}</Eyebrow>}
      {title && <h3 className="mt-2 font-display text-xl font-700 text-sop-ink">{title}</h3>}
      <div className="mt-4">{children}</div>
    </div>
  );
}

const PANELS = {
  welcome: () => (
    <Panel eyebrow="Welcome" color="coral" title="What can I help you with?">
      <p className="text-muted-foreground">
        Ask me anything about School of Play — holiday camps and clubs for your children, or PE, Swim:ED and wraparound care for your school.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-sop-coral/8 p-4 ring-1 ring-sop-coral/15">
          <p className="font-display font-700 text-sop-coral">For Parents</p>
          <p className="text-sm text-muted-foreground">Camps, clubs, activities & booking.</p>
        </div>
        <div className="rounded-2xl bg-sop-blue/8 p-4 ring-1 ring-sop-blue/15">
          <p className="font-display font-700 text-sop-blue">For Schools</p>
          <p className="text-sm text-muted-foreground">PE, Swim:ED, tournaments & more.</p>
        </div>
      </div>
    </Panel>
  ),

  holiday_camps: () => (
    <Panel eyebrow={HOLIDAY_CAMPS.campaignTitle} color="coral" title="Holiday Camps (ages 3.5–11)">
      <img src={IMAGES.parachute} alt="Children at a holiday camp" className="mb-4 aspect-[16/9] w-full rounded-2xl object-cover" loading="lazy" />
      <p className="text-muted-foreground">{HOLIDAY_CAMPS.campaignBlurb}</p>
      <p className="mt-3 text-sm font-700 text-sop-ink">Create Groups {HOLIDAY_CAMPS.createGroups.ages}</p>
      <div className="mt-2"><ChipList items={HOLIDAY_CAMPS.createGroups.items.slice(0, 6)} color="coral" /></div>
      <div className="mt-4"><BookNowButton /></div>
    </Panel>
  ),

  faqs_pricing: () => (
    <Panel eyebrow="Pricing & FAQs" color="green" title="Day rates & essentials">
      <div className="rounded-2xl bg-gradient-to-br from-sop-blue to-sop-purple p-5 text-white">
        <p className="text-sm uppercase tracking-wide font-700 text-white/70 font-display">Per day (venue dependent)</p>
        <p className="mt-1 font-display text-3xl font-800">£25.49–£30.49</p>
        <p className="mt-1 text-sm text-white/85">Hours 09:00–17:00 · early 08:00 · late 18:00</p>
      </div>
      <ul className="mt-4 space-y-2">
        {FAQS.slice(0, 4).map((f) => (
          <li key={f.q} className="rounded-2xl bg-sop-mist/70 p-3">
            <p className="font-700 text-sop-ink text-sm">{f.q}</p>
            <p className="text-sm text-muted-foreground">{f.a}</p>
          </li>
        ))}
      </ul>
    </Panel>
  ),

  how_to_book: () => (
    <Panel eyebrow="How to book" color="blue" title="Booking is simple">
      <p className="text-muted-foreground">Create an account through iPal, add your child, and reserve a day. Card payments and childcare vouchers accepted.</p>
      <div className="mt-4"><BookNowButton /></div>
    </Panel>
  ),

  clubs_parents: () => (
    <Panel eyebrow="Wraparound care" color="blue" title="Before & After School Clubs">
      <p className="text-muted-foreground">{CLUBS_PARENTS.proposition}</p>
      <p className="mt-3 text-sm font-700 text-sop-ink">Locations</p>
      <div className="mt-2"><ChipList items={CLUBS_PARENTS.locations} color="purple" /></div>
    </Panel>
  ),

  sports_classes: () => (
    <Panel eyebrow="Sports" color="green" title="Sports Classes">
      <p className="text-muted-foreground">Active sessions offered through our clubs and school provision.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <CTALink to="/parents/clubs" size="md" variant="ghost">Before & After Clubs</CTALink>
        <CTALink to="/schools/extra-curricular" size="md" variant="ghost">Extra-Curricular Clubs</CTALink>
      </div>
    </Panel>
  ),

  schools_overview: () => (
    <Panel eyebrow="For Schools" color="blue" title="Our school services">
      <p className="text-muted-foreground">{SCHOOLS.coreMessage}</p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {SCHOOLS.services.map((s) => (
          <div key={s.title} className="rounded-2xl bg-sop-blue/6 p-3 text-sm font-600 text-sop-ink ring-1 ring-sop-blue/12">{s.title}</div>
        ))}
      </div>
    </Panel>
  ),

  pe: () => (
    <Panel eyebrow="PE & Sport" color="green" title="PE & Sports Provision">
      <img src={IMAGES.peLesson} alt="PE lesson" className="mb-4 aspect-[16/9] w-full rounded-2xl object-cover" loading="lazy" />
      <div className="grid grid-cols-3 gap-3">
        {PE.pricing.map((p, i) => (
          <PriceCard key={p.tier} tier={p.tier} price={p.price} color={["yellow", "blue", "green"][i]} />
        ))}
      </div>
    </Panel>
  ),

  swim_ed: () => (
    <Panel eyebrow="Swim:ED" color="blue" title="Making Waves in Primary Education">
      <img src={IMAGES.swimGroup} alt="Children swimming" className="mb-4 aspect-[16/9] w-full rounded-2xl object-cover" loading="lazy" />
      <p className="text-muted-foreground">{SWIM.proposition}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {SWIM.process.map((s, i) => (
          <span key={s} className="rounded-full bg-sop-sky/12 px-3 py-1.5 text-sm font-600 text-sop-blue">{i + 1}. {s}</span>
        ))}
      </div>
    </Panel>
  ),

  game_set_maths: () => (
    <Panel eyebrow="Workshop" color="purple" title="Game, Set & MATHS">
      <p className="text-muted-foreground">{GSM.proposition}</p>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {GSM.pricing.map((p, i) => (
          <PriceCard key={p.label} tier={p.label} price={p.price} color={["yellow", "blue", "green", "purple"][i]} />
        ))}
      </div>
    </Panel>
  ),

  extra_curricular: () => (
    <Panel eyebrow="Clubs" color="coral" title="Extra-Curricular Clubs">
      <p className="text-muted-foreground">{EXTRA_CURRICULAR.proposition}</p>
      <div className="mt-3"><ChipList items={EXTRA_CURRICULAR.activities} color="coral" /></div>
    </Panel>
  ),

  tournaments: () => (
    <Panel eyebrow="Free to enter" color="green" title="Sports Tournaments">
      <p className="text-muted-foreground">{TOURNAMENTS.proposition}</p>
      <div className="mt-3"><TickList items={TOURNAMENTS.benefits.slice(0, 4)} color="green" className="sm:grid-cols-1" /></div>
    </Panel>
  ),

  clubs_schools: () => (
    <Panel eyebrow="For Schools" color="blue" title="Wraparound care for your school">
      <div className="mb-3"><TickList items={CLUBS_SCHOOLS.benefits.slice(0, 4)} color="blue" className="sm:grid-cols-1" /></div>
      <ChipList items={CLUBS_SCHOOLS.activities} color="purple" />
    </Panel>
  ),

  venues: () => (
    <Panel eyebrow="Where we run" color="purple" title="Holiday camp venues">
      <ChipList items={HOME.venues} color="purple" />
    </Panel>
  ),

  why_us: () => (
    <Panel eyebrow="Why choose us" color="purple" title="Purposeful play, real impact">
      <p className="text-muted-foreground"><span className="font-700 text-sop-ink">Vision:</span> {WHY_US.vision}</p>
      <div className="mt-3"><ChipList items={WHY_US.values} color="green" /></div>
    </Panel>
  ),

  team: () => (
    <Panel eyebrow="Our people" color="coral" title="Meet the Team">
      <div className="grid gap-2 sm:grid-cols-2">
        {TEAM.leadership.slice(0, 6).map((p) => (
          <div key={p.name} className="rounded-2xl bg-sop-mist/70 p-3">
            <p className="font-700 text-sop-ink text-sm">{p.name}</p>
            <p className="text-xs text-sop-blue">{p.role}</p>
          </div>
        ))}
      </div>
    </Panel>
  ),

  contact: () => (
    <Panel eyebrow="Get in touch" color="blue" title="Talk to the team">
      <ul className="space-y-2 text-sm">
        <li className="flex items-center gap-2 text-sop-ink"><Phone className="h-4 w-4 text-sop-blue" /> <a href={CONTACT.phoneHref} className="font-600">{CONTACT.phone}</a></li>
        <li className="flex items-center gap-2 text-sop-ink"><Mail className="h-4 w-4 text-sop-coral" /> <a href={CONTACT.emailHref} className="font-600">{CONTACT.email}</a></li>
        <li className="flex items-start gap-2 text-sop-ink"><MapPin className="mt-0.5 h-4 w-4 text-sop-green" /> {CONTACT.address}</li>
      </ul>
      <p className="mt-3 text-sm text-muted-foreground">You can share your name, email and enquiry with me and I'll pass it straight to the team.</p>
    </Panel>
  ),

  booking: () => (
    <Panel eyebrow="Book now" color="coral" title="Reserve a place">
      <p className="text-muted-foreground">Bookings are handled securely through our iPal portal.</p>
      <div className="mt-4"><BookNowButton size="lg" /></div>
    </Panel>
  ),
};

export default function DynamicCanvas({ panels = [] }) {
  const list = panels && panels.length ? panels : ["welcome"];
  return (
    <div className="space-y-5">
      {list.map((key) => {
        const Comp = PANELS[key];
        return Comp ? <div key={key}>{<Comp />}</div> : null;
      })}
      {!panels.length && (
        <div className="flex items-center gap-2 rounded-2xl bg-white/70 p-4 text-sm text-muted-foreground ring-1 ring-sop-border">
          <Sparkles className="h-4 w-4 text-sop-yellow" /> Ask a question on the left and I'll show the details here.
        </div>
      )}
    </div>
  );
}
