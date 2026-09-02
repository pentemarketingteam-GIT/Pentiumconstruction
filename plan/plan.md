# School of Play — Website Build Plan

A brand-new **School of Play** website, built on the proven technical foundation of the
imported Careplus codebase. Careplus is treated as scaffolding only — its architecture and
reusable building blocks are kept, but its entire visual identity, copy, imagery and
healthcare-specific features are discarded. The result should read as a genuinely new site,
not a recoloured Careplus.

Source of truth for structure, services, messaging, CTAs and forms:
`School_of_Play_Website_Content.md`. Nothing outside that inventory will be invented — no
new services, prices or claims.

---

## 1. What gets reused vs. rebuilt (the summary you asked for)

**Reused from Careplus (technical foundation, invisible to visitors):**
- The overall project framework and structure (React front-end, Python/API back-end, database).
- The header / navigation / footer architecture (adapted to new menus).
- The page-routing setup and multi-page layout shell.
- The responsive/mobile system and the animation/interaction engine.
- The library of low-level UI building blocks (buttons, cards, inputs, dropdowns, accordions,
  tabs, dialogs, form validation).
- The form-submission and data-storage pattern (used for enquiry/contact forms).
- The existing particle-canvas component as a starting point, rebuilt to the new spec.

**Rebuilt / discarded (everything a visitor sees):**
- Discarded: Careplus colours, fonts, logo, imagery, layout, copy, and all healthcare content.
- Discarded: the AI chat/intake, voice mode, dual "static/dynamic" modes, and Google sign-in —
  these are Careplus features not relevant to School of Play.
- Rebuilt: a distinctive School of Play design system (below) and every page, laid out around
  the two audiences (Parents and Schools) rather than the Careplus page order.
- Rebuilt: the interactive mouse-responsive particle effect as a real, functional interaction.

---

## 2. Look and feel (School of Play design system)

The site should feel **playful, energetic, modern and child-friendly, yet premium and
trustworthy** for parents and schools.

- **Colour palette:** a bright, confident multi-colour scheme — a strong primary plus energetic
  accents (blue, green, yellow, pink/red) used as playful highlights, balanced with clean
  neutrals and generous white space so it stays credible for schools. (These specific hues are
  a proposed choice; open to a brand colour reference if one exists.)
- **Typography:** a friendly, rounded display style for headings paired with a clean, highly
  readable body font.
- **Buttons, cards, spacing, sections:** rounded, tactile, colourful cards; clear primary CTA
  buttons (Book Now / Enquire Today / Register Interest); roomy, well-spaced sections.
- **Hero treatments & animation:** bold hero areas with subtle motion (gentle reveals, floating
  shapes, confetti on form success), kept tasteful and fast.
- **Imagery:** bright, active, child-focused photography sourced to fit the brand (no Careplus
  imagery reused).

---

## 3. Two-audience information architecture

The navigation and homepage route visitors quickly into one of two journeys:

- **Parents** — holiday camps, before & after-school clubs, sports classes, how to book,
  FAQs/pricing, and booking (which hands off to the external iPal booking portal).
- **Schools** — PE & sports provision, Swim:ED, wraparound care, Game Set & MATHS,
  extra-curricular clubs, sports tournaments, and a "see if this works for our school" enquiry.

A clear top navigation with Parents / Schools / About / Contact, plus a persistent primary
call-to-action, will anchor the whole site.

---

## 4. Pages built in this first phase (core structure)

Per the request to establish the core structure first (not every possible page at once):

**Global**
- Header + two-audience navigation, footer with contact details, address, key links.
- The interactive particle hero interaction.

**Parents journey**
- Homepage (current summer campaign, dual-audience entry, key propositions, venue list, benefits).
- Parents hub.
- Holiday Camps (theme, ages, activities, what to bring / not bring, locations).
- Before & After School Clubs (parents view).
- Sports Classes.
- How To Book (tutorial list + booking CTA to iPal).
- Holiday Camp FAQs & Pricing (published price ranges and hours from the inventory).

**Schools journey**
- Schools hub (service list + "15-minute school suitability call" CTA).
- PE & Sports Provision (incl. published tier pricing).
- Swim:ED (benefits, features, six-step process, pricing, CTAs).
- Game, Set & MATHS.
- Extra-Curricular Clubs.
- Sports Tournaments.
- Before & After School Clubs (schools view).

**About & Contact**
- Why Choose Us (vision, mission, values, themes, trust).
- Meet the Team.
- Contact Us (address, phone, email, full enquiry form with Parent/School/Other + service picker).

**Deferred to a later phase (acknowledged, not built now):** individual venue pages, full
policy/safeguarding/terms detail pages, blog, photo/video galleries, careers detail, offers page,
feedback/referral forms, partner enquiry form, meet-the-team full roster expansions. These are
noted in the inventory as extra content and will be added after the core is approved.

---

## 5. Forms and booking behaviour

- **Enquiry / Contact forms** (parent, school, partnership-style enquiries) will submit and be
  stored, with a friendly success confirmation. **Assumption:** no automated email notifications
  in this phase — submissions are captured and reviewable; email delivery (e.g. to
  info@schoolofplay.org.uk) can be added later if wanted.
- **Booking** ("Book Now") links out to the real external iPal booking portal
  (`https://schoolofplay.ipalbookings.com/`) rather than rebuilding a booking system.
- **Phone/email/address** shown site-wide: 0161 726 5022, info@schoolofplay.org.uk,
  Warren Bruce Court, Warren Bruce Road, Trafford Park, M17 1LB.

---

## 6. The interactive particle effect

Built as a genuine, lightweight interaction (not a static image):
- A soft cloud-like graphic against a bright background in the hero/navigation area.
- Multiple small floating square/confetti particles of varied sizes, positions and colours
  (blue, green, yellow, pink/red, white).
- Particles subtly follow the cursor with smooth easing / parallax movement.
- Kept lightweight so it never slows navigation.
- Sensible fallback on touch/mobile devices (gentle ambient motion or a stable composition,
  no cursor dependency).

---

## 6b. Development approach (confirmed with you)

- Careplus is a **technical foundation only**. Its architecture, routing, back-end/API and
  data-storage patterns are retained where genuinely present and useful; nothing is assumed
  that isn't in the imported repo.
- Even where a Careplus component is reused technically, its **visual treatment and composition
  are redesigned** for School of Play — heroes, cards, navigation, sections, typography, spacing,
  colour and interactions are designed specifically for this brand. No "swap colours and text".
- What's technically reused (confirmed against the repo): React app shell + client routing,
  the header/footer/layout structure, the shadcn/Radix UI primitive library (buttons, cards,
  inputs, accordions, tabs, select, dialogs, form validation), the FastAPI + MongoDB
  form-submission/storage pattern, and the existing particle component as a starting point.
- What's removed as not relevant to School of Play: the AI chat/intake, voice/TTS, dual
  static/dynamic modes and Google sign-in.

**Sports Classes:** the inventory lists "Sports Classes" only as a Parents navigation/section
label with no supporting service detail or copy. It will therefore appear as a
navigation/section entry that routes into the relevant existing content (e.g. clubs/enquiry),
**not** a fully written service page — no service details or copy will be invented.

**Forms:** implemented on the existing submission/storage pattern, using **only** the fields in
the inventory's Contact enquiry form — Full Name, Email, Phone, audience (Parent/School/Other),
Service (Wraparound Care / Holiday Camps / Sports Provision / PE / Extra-Curricular Sports
Classes / Other), School name & location, Enquiry message, and the mailing-list opt-in. No extra
fields are added. School CTAs (Enquire Today / Register Interest / suitability call) route into
this same enquiry form.

## 7. Assumptions (open to change)

- Colour palette and fonts are a proposed playful-but-premium direction; if there is an existing
  brand colour/logo reference, it can be matched instead.
- Forms store submissions without sending emails in this phase.
- "Book Now" links out to the existing iPal portal.
- Core pages above are built first; the deferred set follows after approval.
- All content is drawn only from the supplied inventory; nothing is invented.
