import {
  HOLIDAY_CAMPS, FAQS, CLUBS_PARENTS, CLUBS_SCHOOLS, SCHOOLS, PE, SWIM,
  GSM, EXTRA_CURRICULAR, TOURNAMENTS, WHY_US, TEAM, HOME, IMAGES, CONTACT,
} from "@/lib/sopContent";
import { BookNowButton } from "@/components/sop/Primitives";
import {
  Sparkles, ArrowRight, Waves, Trophy, Dumbbell, Sunrise, Tent,
  Star, Phone, Mail, MapPin, Palette, Clock, Check, Ban, ListChecks,
} from "lucide-react";

const EY = {
  blue: "text-sop-blue", coral: "text-sop-coral", green: "text-sop-green",
  purple: "text-sop-purple", yellow: "text-[#8a6a00]", sky: "text-sop-sky",
};

function Frame({ banner, eyebrow, eyebrowColor = "blue", title, desc, children, footer }) {
  return (
    <div className="flex h-full flex-col">
      {banner}
      <div className={banner ? "mt-4" : ""}>
        {eyebrow && <span className={`font-display text-xs font-700 uppercase tracking-wide ${EY[eyebrowColor]}`}>{eyebrow}</span>}
        <h2 className="mt-1 font-display text-2xl font-700 leading-tight text-sop-ink sm:text-3xl">{title}</h2>
        {desc && <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-muted-foreground">{desc}</p>}
      </div>
      <div className="mt-4 min-h-0 flex-1">{children}</div>
      {footer && <div className="mt-3 flex flex-wrap items-center gap-2">{footer}</div>}
    </div>
  );
}

function AskCard({ title, subtitle, onAsk, prompt, goto }) {
  return (
    <button onClick={() => onAsk && onAsk(prompt, goto)} className="group flex w-full flex-col justify-between rounded-2xl bg-white/90 p-4 text-left shadow-play ring-1 ring-sop-border transition-all hover:-translate-y-0.5 hover:ring-sop-blue">
      <p className="font-display font-700 text-sop-ink">{title}</p>
      {subtitle && <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>}
      <ArrowRight className="mt-2 h-4 w-4 text-sop-blue/60 transition-transform group-hover:translate-x-1" />
    </button>
  );
}

function NavChip({ label, onAsk, prompt, goto }) {
  return (
    <button onClick={() => onAsk && onAsk(prompt || label, goto)} className="rounded-full bg-white/90 px-3.5 py-2 text-sm font-600 text-sop-ink shadow-play ring-1 ring-sop-border transition hover:-translate-y-0.5 hover:text-sop-blue">
      {label}
    </button>
  );
}

function Banner({ img, label, color = "blue", Icon = Sparkles }) {
  const grad = {
    blue: "from-sop-blue/85 to-sop-purple/85", coral: "from-sop-coral/85 to-sop-purple/85",
    green: "from-sop-green/85 to-sop-blue/85", sky: "from-sop-sky/85 to-sop-blue/85",
    purple: "from-sop-purple/85 to-sop-blue/85", yellow: "from-sop-yellow/90 to-sop-coral/85",
  }[color];
  return (
    <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-3xl shadow-play sm:h-40">
      {img && <img src={img} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />}
      <div className={`absolute inset-0 bg-gradient-to-br ${grad} mix-blend-multiply`} />
      <div className="absolute bottom-4 left-4 flex items-center gap-2 font-display text-sm font-700 uppercase tracking-wide text-white">
        <Icon className="h-4 w-4" /> {label}
      </div>
    </div>
  );
}

function TileGrid({ items, cols = "grid-cols-2 sm:grid-cols-3", tone = "white" }) {
  const cls = tone === "white"
    ? "bg-white/90 ring-1 ring-sop-border text-sop-ink"
    : tone;
  return (
    <div className={`grid gap-2.5 ${cols}`}>
      {items.map((it) => (
        <div key={it} className={`rounded-2xl p-3 text-sm font-600 ${cls}`}>{it}</div>
      ))}
    </div>
  );
}

/* ---------- views ---------- */

const VIEWS = {
  welcome: (onAsk) => (
    <Frame banner={<Banner img={IMAGES.heroKids} label="AI Experience" color="yellow" />}
      eyebrow="Play Assistant" eyebrowColor="coral" title="Welcome to School of Play"
      desc="Ask me anything about camps, clubs, PE and Swim:ED. This panel updates live as we chat — tap a card to dive in.">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <AskCard title="Holiday Camps" subtitle="Ages 3.5–11" onAsk={onAsk} prompt="Tell me about your holiday camps" goto="holiday_camps" />
        <AskCard title="After-School Clubs" subtitle="Wraparound care" onAsk={onAsk} prompt="Tell me about before and after school clubs for parents" goto="clubs_parents" />
        <AskCard title="PE & Sport" subtitle="For schools" onAsk={onAsk} prompt="Tell me about PE and sports provision for schools" goto="pe" />
        <AskCard title="Swim:ED" subtitle="On-site pool" onAsk={onAsk} prompt="Tell me about Swim:ED" goto="swim_ed" />
        <AskCard title="Tournaments" subtitle="Free to enter" onAsk={onAsk} prompt="Tell me about your free sports tournaments" goto="tournaments" />
        <AskCard title="Pricing" subtitle="Camps & schools" onAsk={onAsk} prompt="How much do the holiday camps cost?" goto="faqs_pricing" />
      </div>
    </Frame>
  ),

  /* ===== Holiday camps ===== */
  holiday_camps: (onAsk) => (
    <Frame banner={<Banner img={IMAGES.parachute} label={HOLIDAY_CAMPS.campaignTitle} color="coral" Icon={Tent} />}
      eyebrow="Holiday Camps" eyebrowColor="coral" title="Camp days for ages 3.5–11" desc={HOLIDAY_CAMPS.campaignBlurb}
      footer={<BookNowButton />}>
      <div className="grid grid-cols-2 gap-3">
        <AskCard title="Create Groups" subtitle="Ages 3.5–11" onAsk={onAsk} prompt="What do the Create groups do at holiday camp?" goto="camps_create" />
        <AskCard title="Multi-Sports" subtitle="Ages 5–11" onAsk={onAsk} prompt="What sports are in the multi-sports groups?" goto="camps_sports" />
        <AskCard title="Locations" subtitle="Across Manchester" onAsk={onAsk} prompt="Where are your holiday camp locations?" goto="camps_locations" />
        <AskCard title="What to bring" subtitle="Packing list" onAsk={onAsk} prompt="What should my child bring to holiday camp?" goto="camps_bring" />
      </div>
    </Frame>
  ),
  camps_create: (onAsk) => (
    <Frame eyebrow="Holiday Camps" eyebrowColor="coral" title={`Create Groups · ${HOLIDAY_CAMPS.createGroups.ages}`}
      desc="Arts, science, food, workshops and imaginative play for our youngest campers."
      footer={<><NavChip label="See multi-sports" onAsk={onAsk} prompt="What sports are in the multi-sports groups?" goto="camps_sports" /><BookNowButton /></>}>
      <div className="flex flex-wrap gap-2">
        {HOLIDAY_CAMPS.createGroups.items.map((a) => (
          <span key={a} className="rounded-full bg-sop-coral/8 px-3.5 py-2 text-sm font-600 text-sop-coral ring-1 ring-sop-coral/20">{a}</span>
        ))}
      </div>
    </Frame>
  ),
  camps_sports: (onAsk) => (
    <Frame eyebrow="Holiday Camps" eyebrowColor="blue" title={`Multi-Sports · ${HOLIDAY_CAMPS.multiSports.ages}`}
      desc="A huge range of sports to keep active campers busy all day."
      footer={<><NavChip label="See Create groups" onAsk={onAsk} prompt="What do the Create groups do?" goto="camps_create" /><BookNowButton /></>}>
      <div className="flex flex-wrap gap-2">
        {HOLIDAY_CAMPS.multiSports.items.map((a) => (
          <span key={a} className="rounded-full bg-sop-blue/8 px-3 py-1.5 text-[13px] font-600 text-sop-bluedeep ring-1 ring-sop-blue/15">{a}</span>
        ))}
      </div>
    </Frame>
  ),
  camps_locations: () => (
    <Frame eyebrow="Holiday Camps" eyebrowColor="purple" title="Camp locations" desc="Full-day camps in venues right across Greater Manchester." footer={<BookNowButton />}>
      <div className="flex flex-wrap gap-2">
        {HOLIDAY_CAMPS.locations.map((v) => (
          <span key={v} className="rounded-full bg-sop-purple/8 px-3.5 py-2 text-sm font-600 text-sop-purple ring-1 ring-sop-purple/20">{v}</span>
        ))}
      </div>
    </Frame>
  ),
  camps_bring: () => (
    <Frame eyebrow="Holiday Camps" eyebrowColor="green" title="What to bring (and not)">
      <div className="grid h-full grid-cols-2 gap-3">
        <div className="rounded-2xl bg-sop-green/8 p-4 ring-1 ring-sop-green/20">
          <p className="mb-2 flex items-center gap-2 font-display font-700 text-sop-ink"><Check className="h-4 w-4 text-sop-green" /> Bring</p>
          <ul className="space-y-1.5 text-[13px] text-sop-ink/85">
            {HOLIDAY_CAMPS.whatToBring.map((i) => <li key={i}>• {i}</li>)}
          </ul>
        </div>
        <div className="rounded-2xl bg-sop-coral/8 p-4 ring-1 ring-sop-coral/20">
          <p className="mb-2 flex items-center gap-2 font-display font-700 text-sop-ink"><Ban className="h-4 w-4 text-sop-coral" /> Please don't bring</p>
          <ul className="space-y-1.5 text-[13px] text-sop-ink/85">
            {HOLIDAY_CAMPS.whatNotToBring.map((i) => <li key={i}>• {i}</li>)}
          </ul>
        </div>
      </div>
    </Frame>
  ),

  faqs_pricing: () => (
    <Frame eyebrow="Pricing & FAQs" eyebrowColor="green" title="Day rates & essentials" footer={<BookNowButton />}>
      <div className="grid h-full grid-rows-[auto_1fr] gap-3">
        <div className="rounded-3xl bg-gradient-to-br from-sop-blue to-sop-purple p-5 text-white shadow-play">
          <p className="font-display text-xs font-700 uppercase tracking-wide text-white/70">Per day (venue dependent)</p>
          <p className="mt-1 font-display text-3xl font-800 sm:text-4xl">£25.49–£30.49</p>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-white/85"><Clock className="h-4 w-4" /> 09:00–17:00 · early 08:00 · late 18:00</p>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {FAQS.slice(0, 4).map((f) => (
            <div key={f.q} className="rounded-2xl bg-white/90 p-3 ring-1 ring-sop-border">
              <p className="text-sm font-700 text-sop-ink">{f.q}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  ),

  how_to_book: () => (
    <Frame eyebrow="How to book" eyebrowColor="blue" title="Booking is simple"
      desc="Create an account through iPal, add your child, and reserve a day. Card payments and childcare vouchers accepted."
      footer={<BookNowButton size="lg" />}>
      <div className="grid grid-cols-2 gap-2.5">
        {["Use the iPal system", "Add a child", "Pay monthly or by card", "Use childcare vouchers"].map((s, i) => (
          <div key={s} className="flex items-center gap-3 rounded-2xl bg-white/90 p-3.5 ring-1 ring-sop-border">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-sop-blue text-white font-display font-700">{i + 1}</span>
            <span className="text-sm font-600 text-sop-ink">{s}</span>
          </div>
        ))}
      </div>
    </Frame>
  ),

  clubs_parents: (onAsk) => (
    <Frame banner={<Banner img={IMAGES.playground} label="Wraparound care" color="blue" Icon={Sunrise} />}
      eyebrow="Parents" eyebrowColor="blue" title="Before & After School Clubs" desc={CLUBS_PARENTS.proposition}
      footer={<NavChip label="How to book" onAsk={onAsk} prompt="How do I book a club place?" goto="how_to_book" />}>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-white/90 p-3.5 ring-1 ring-sop-border">
          <p className="mb-1.5 text-sm font-700 text-sop-ink">Locations</p>
          <div className="flex flex-wrap gap-1.5">{CLUBS_PARENTS.locations.map((l) => <span key={l} className="rounded-full bg-sop-purple/8 px-2.5 py-1 text-xs font-600 text-sop-purple">{l}</span>)}</div>
        </div>
        <div className="rounded-2xl bg-white/90 p-3.5 ring-1 ring-sop-border">
          <p className="mb-1.5 text-sm font-700 text-sop-ink">Activities</p>
          <div className="flex flex-wrap gap-1.5">{CLUBS_PARENTS.activities.map((l) => <span key={l} className="rounded-full bg-sop-blue/8 px-2.5 py-1 text-xs font-600 text-sop-blue">{l}</span>)}</div>
        </div>
      </div>
    </Frame>
  ),

  sports_classes: (onAsk) => (
    <Frame eyebrow="Sports" eyebrowColor="green" title="Sports Classes" desc="Active sessions offered through our clubs and school provision.">
      <div className="grid grid-cols-2 gap-3">
        <AskCard title="After-School Clubs" onAsk={onAsk} prompt="Tell me about before and after school clubs" goto="clubs_parents" />
        <AskCard title="Extra-Curricular Clubs" onAsk={onAsk} prompt="Tell me about extra-curricular clubs for schools" goto="extra_curricular" />
      </div>
    </Frame>
  ),

  /* ===== Schools ===== */
  schools_overview: (onAsk) => (
    <Frame banner={<Banner img={IMAGES.peLesson} label="For Schools" color="blue" Icon={Dumbbell} />}
      eyebrow="For Schools" eyebrowColor="blue" title="Everything your school needs" desc={SCHOOLS.coreMessage}
      footer={<button onClick={() => onAsk("I'd like to book a 15-minute school suitability call", "contact")} className="inline-flex items-center gap-2 rounded-full bg-sop-blue px-6 py-3 font-display font-700 text-white shadow-play transition hover:bg-sop-bluedeep">Book a suitability call <ArrowRight className="h-4 w-4" /></button>}>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        <AskCard title="PE & Sport" onAsk={onAsk} prompt="Tell me about PE and sports provision" goto="pe" />
        <AskCard title="Swim:ED" onAsk={onAsk} prompt="Tell me about Swim:ED" goto="swim_ed" />
        <AskCard title="Tournaments" onAsk={onAsk} prompt="Tell me about free sports tournaments" goto="tournaments" />
        <AskCard title="Game, Set & MATHS" onAsk={onAsk} prompt="Tell me about Game, Set and Maths" goto="game_set_maths" />
        <AskCard title="Extra-Curricular" onAsk={onAsk} prompt="Tell me about extra-curricular clubs" goto="extra_curricular" />
        <AskCard title="Wraparound Care" onAsk={onAsk} prompt="Tell me about before and after school clubs for schools" goto="clubs_schools" />
      </div>
    </Frame>
  ),

  pe: (onAsk) => (
    <Frame banner={<Banner img={IMAGES.peLesson} label="PE & Sport" color="green" Icon={Dumbbell} />}
      eyebrow="For Schools" eyebrowColor="green" title="PE & Sports Provision" desc={PE.coreMessage}
      footer={<><NavChip label="Pricing & add-ons" onAsk={onAsk} prompt="What is the pricing for PE provision?" goto="pe_pricing" /><NavChip label="Lunchtime provision" onAsk={onAsk} prompt="Tell me about lunchtime sports provision" goto="pe_lunchtime" /></>}>
      <div className="grid grid-cols-3 gap-2.5">
        {PE.pricing.map((p) => (
          <div key={p.tier} className="rounded-2xl bg-white/90 p-3 text-center ring-1 ring-sop-border">
            <p className="font-display font-700 text-sop-ink">{p.tier}</p>
            <p className="text-xs text-muted-foreground">{p.detail}</p>
            <p className="mt-1 font-display text-lg font-800 text-sop-blue">{p.price}</p>
          </div>
        ))}
      </div>
    </Frame>
  ),
  pe_pricing: () => (
    <Frame eyebrow="PE & Sport" eyebrowColor="green" title="Pricing & add-ons">
      <div className="grid h-full grid-rows-[auto_1fr] gap-3">
        <div className="grid grid-cols-3 gap-2.5">
          {PE.pricing.map((p) => (
            <div key={p.tier} className="rounded-2xl bg-white/90 p-3 text-center ring-1 ring-sop-border">
              <p className="font-display font-700 text-sop-ink">{p.tier}</p>
              <p className="text-xs text-muted-foreground">{p.detail}</p>
              <p className="mt-1 font-display text-lg font-800 text-sop-blue">{p.price}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {PE.addons.map((a) => (
            <div key={a.label} className="flex items-center justify-between rounded-2xl bg-sop-mist/70 px-3.5 py-2.5">
              <span className="text-sm font-600 text-sop-ink">{a.label}</span>
              <span className="font-display text-sm font-700 text-sop-blue">{a.price}</span>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  ),
  pe_lunchtime: () => (
    <Frame eyebrow="PE & Sport" eyebrowColor="green" title="Lunchtime provision benefits">
      <div className="grid grid-cols-2 gap-2.5">
        {PE.lunchtimeBenefits.map((b) => (
          <div key={b} className="flex items-start gap-2 rounded-2xl bg-white/90 p-3.5 text-sm font-600 text-sop-ink ring-1 ring-sop-border">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-sop-green" strokeWidth={3} /> {b}
          </div>
        ))}
      </div>
    </Frame>
  ),

  /* ===== Swim:ED ===== */
  swim_ed: (onAsk) => (
    <Frame banner={<Banner img={IMAGES.swimGroup} label="Swim:ED" color="sky" Icon={Waves} />}
      eyebrow="Swim:ED" eyebrowColor="sky" title="Making Waves in Primary Education" desc={SWIM.proposition}
      footer={<>
        <NavChip label="Benefits" onAsk={onAsk} prompt="What are the benefits of Swim:ED?" goto="swim_ed_benefits" />
        <NavChip label="Features" onAsk={onAsk} prompt="What features does Swim:ED include?" goto="swim_ed_features" />
        <NavChip label="How it works" onAsk={onAsk} prompt="How does the Swim:ED process work?" goto="swim_ed_process" />
        <NavChip label="Pricing" onAsk={onAsk} prompt="What is the pricing for Swim:ED?" goto="swim_ed_pricing" />
      </>}>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <AskCard title="Benefits" onAsk={onAsk} prompt="What are the benefits of Swim:ED?" goto="swim_ed_benefits" />
        <AskCard title="Features" onAsk={onAsk} prompt="What features does Swim:ED include?" goto="swim_ed_features" />
        <AskCard title="How it works" onAsk={onAsk} prompt="How does the Swim:ED process work?" goto="swim_ed_process" />
        <AskCard title="Pricing" onAsk={onAsk} prompt="What is the pricing for Swim:ED?" goto="swim_ed_pricing" />
      </div>
    </Frame>
  ),
  swim_ed_benefits: (onAsk) => (
    <Frame eyebrow="Swim:ED" eyebrowColor="sky" title="Benefits"
      footer={<><NavChip label="Features" onAsk={onAsk} prompt="What features does Swim:ED include?" goto="swim_ed_features" /><NavChip label="How it works" onAsk={onAsk} prompt="How does Swim:ED work?" goto="swim_ed_process" /></>}>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {SWIM.benefits.map((b) => (
          <div key={b} className="flex items-start gap-2 rounded-2xl bg-white/90 p-3.5 text-sm font-600 text-sop-ink ring-1 ring-sop-border">
            <Star className="mt-0.5 h-4 w-4 shrink-0 text-sop-sky" /> {b}
          </div>
        ))}
      </div>
    </Frame>
  ),
  swim_ed_features: (onAsk) => (
    <Frame eyebrow="Swim:ED" eyebrowColor="sky" title="Features"
      footer={<><NavChip label="Benefits" onAsk={onAsk} prompt="What are the benefits of Swim:ED?" goto="swim_ed_benefits" /><NavChip label="Pricing" onAsk={onAsk} prompt="What is the pricing for Swim:ED?" goto="swim_ed_pricing" /></>}>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {SWIM.features.map((f) => (
          <div key={f} className="flex items-start gap-2 rounded-2xl bg-white/90 p-3.5 text-sm font-600 text-sop-ink ring-1 ring-sop-border">
            <ListChecks className="mt-0.5 h-4 w-4 shrink-0 text-sop-blue" /> {f}
          </div>
        ))}
      </div>
    </Frame>
  ),
  swim_ed_process: (onAsk) => (
    <Frame eyebrow="Swim:ED" eyebrowColor="sky" title="How it works — six steps"
      footer={<NavChip label="Pricing" onAsk={onAsk} prompt="What is the pricing for Swim:ED?" goto="swim_ed_pricing" />}>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {SWIM.process.map((s, i) => (
          <div key={s} className="flex items-center gap-3 rounded-2xl bg-white/90 p-3.5 ring-1 ring-sop-border">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-sop-sky/15 text-sop-blue font-display font-700">{i + 1}</span>
            <span className="font-display font-700 text-sop-ink">{s}</span>
          </div>
        ))}
      </div>
    </Frame>
  ),
  swim_ed_pricing: (onAsk) => (
    <Frame eyebrow="Swim:ED" eyebrowColor="sky" title="Pricing"
      footer={<button onClick={() => onAsk("I'd like to register interest in Swim:ED", "contact")} className="inline-flex items-center gap-2 rounded-full bg-sop-blue px-6 py-3 font-display font-700 text-white shadow-play">Register interest <ArrowRight className="h-4 w-4" /></button>}>
      <div className="grid grid-cols-2 gap-3">
        {SWIM.pricing.map((p) => (
          <div key={p.label} className="rounded-3xl bg-white/90 p-5 text-center ring-1 ring-sop-border">
            <p className="text-sm font-600 text-muted-foreground">{p.label}</p>
            <p className="mt-1 font-display text-2xl font-800 text-sop-blue">{p.price}</p>
          </div>
        ))}
      </div>
    </Frame>
  ),

  game_set_maths: (onAsk) => (
    <Frame eyebrow="Workshop" eyebrowColor="purple" title="Game, Set & MATHS" desc={GSM.proposition}
      footer={<button onClick={() => onAsk("I'd like to book a Game, Set & Maths workshop", "contact")} className="inline-flex items-center gap-2 rounded-full bg-sop-purple px-6 py-3 font-display font-700 text-white shadow-play">Book a workshop <ArrowRight className="h-4 w-4" /></button>}>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {GSM.pricing.map((p) => (
          <div key={p.label} className="rounded-2xl bg-white/90 p-3 text-center ring-1 ring-sop-border">
            <p className="text-xs font-600 text-muted-foreground">{p.label}</p>
            <p className="mt-1 font-display text-lg font-800 text-sop-purple">{p.price}</p>
          </div>
        ))}
      </div>
    </Frame>
  ),

  extra_curricular: () => (
    <Frame banner={<Banner img={IMAGES.soccer} label="Clubs" color="coral" Icon={Star} />}
      eyebrow="For Schools" eyebrowColor="coral" title="Extra-Curricular Clubs" desc={EXTRA_CURRICULAR.proposition}>
      <div className="flex flex-wrap gap-2">
        {EXTRA_CURRICULAR.activities.map((a) => (
          <span key={a} className="rounded-full bg-sop-coral/8 px-3.5 py-2 text-sm font-600 text-sop-coral ring-1 ring-sop-coral/20">{a}</span>
        ))}
      </div>
    </Frame>
  ),

  tournaments: () => (
    <Frame banner={<Banner img={IMAGES.tournament} label="Free to enter" color="green" Icon={Trophy} />}
      eyebrow="For Schools" eyebrowColor="green" title="Sports Tournaments" desc={TOURNAMENTS.proposition}>
      <TileGrid items={TOURNAMENTS.benefits} cols="grid-cols-2 sm:grid-cols-3" />
    </Frame>
  ),

  clubs_schools: () => (
    <Frame eyebrow="For Schools" eyebrowColor="blue" title="Wraparound care, no workload" desc={CLUBS_SCHOOLS.positioning}>
      <div className="grid h-full grid-rows-[auto_1fr] gap-3">
        <TileGrid items={CLUBS_SCHOOLS.benefits.slice(0, 6)} cols="grid-cols-2 sm:grid-cols-3" />
        <div className="flex flex-wrap content-start gap-2">
          {CLUBS_SCHOOLS.activities.map((a) => <span key={a} className="rounded-full bg-sop-purple/8 px-3 py-1.5 text-xs font-600 text-sop-purple">{a}</span>)}
        </div>
      </div>
    </Frame>
  ),

  venues: () => (
    <Frame eyebrow="Where we run" eyebrowColor="purple" title="Holiday camp venues">
      <div className="flex flex-wrap gap-2">
        {HOME.venues.map((v) => <span key={v} className="rounded-full bg-sop-purple/8 px-3.5 py-2 text-sm font-600 text-sop-purple ring-1 ring-sop-purple/20">{v}</span>)}
      </div>
    </Frame>
  ),

  why_us: () => (
    <Frame eyebrow="Why choose us" eyebrowColor="purple" title="Purposeful play, real impact" desc={WHY_US.vision}>
      <div className="flex flex-wrap gap-2">
        {WHY_US.values.map((v) => <span key={v} className="rounded-full bg-sop-green/10 px-3.5 py-2 text-sm font-600 text-sop-green ring-1 ring-sop-green/20">{v}</span>)}
      </div>
    </Frame>
  ),

  team: () => (
    <Frame eyebrow="Our people" eyebrowColor="coral" title="Meet the Team">
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {TEAM.leadership.slice(0, 6).map((p) => (
          <div key={p.name} className="rounded-2xl bg-white/90 p-3 ring-1 ring-sop-border">
            <p className="text-sm font-700 text-sop-ink">{p.name}</p>
            <p className="text-xs text-sop-blue">{p.role}</p>
          </div>
        ))}
      </div>
    </Frame>
  ),

  contact: () => (
    <Frame eyebrow="Get in touch" eyebrowColor="blue" title="Talk to the team"
      desc="Share your name, email and enquiry in the chat and I'll pass it straight to the team.">
      <div className="grid gap-2.5">
        <a href={CONTACT.phoneHref} className="flex items-center gap-3 rounded-2xl bg-white/90 p-3.5 ring-1 ring-sop-border"><span className="grid h-10 w-10 place-items-center rounded-xl bg-sop-blue/10 text-sop-blue"><Phone className="h-5 w-5" /></span><span className="font-display font-700 text-sop-ink">{CONTACT.phone}</span></a>
        <a href={CONTACT.emailHref} className="flex items-center gap-3 rounded-2xl bg-white/90 p-3.5 ring-1 ring-sop-border"><span className="grid h-10 w-10 place-items-center rounded-xl bg-sop-coral/12 text-sop-coral"><Mail className="h-5 w-5" /></span><span className="font-display font-700 text-sop-ink">{CONTACT.email}</span></a>
        <div className="flex items-center gap-3 rounded-2xl bg-white/90 p-3.5 ring-1 ring-sop-border"><span className="grid h-10 w-10 place-items-center rounded-xl bg-sop-green/12 text-sop-green"><MapPin className="h-5 w-5" /></span><span className="text-sm font-600 text-sop-ink">{CONTACT.address}</span></div>
      </div>
    </Frame>
  ),

  booking: () => (
    <Frame eyebrow="Book now" eyebrowColor="coral" title="Reserve a place"
      desc="Bookings are handled securely through our iPal portal." footer={<BookNowButton size="lg" />}>
      <div className="grid h-full place-items-center"><Palette className="h-20 w-20 text-sop-coral/30" /></div>
    </Frame>
  ),
};

export default function DynamicCanvas({ view = "welcome", onAsk }) {
  const render = VIEWS[view] || VIEWS.welcome;
  return <div className="h-full">{render(onAsk)}</div>;
}
