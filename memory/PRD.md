# School of Play — Website (built on Careplus code foundation)

## What this is
A brand-new **School of Play** website (UK children's activity provider) built by reusing the
Careplus codebase as a *technical foundation only*. Careplus visual identity, copy, imagery and
its healthcare/AI features were fully discarded.

## Source of truth
`School_of_Play_Website_Content.md` (mirrored in `frontend/src/lib/sopContent.js`). Nothing outside
the inventory was invented — no new services, prices or claims.

## Architecture
- **Frontend**: React 19 + CRA/craco + React Router 7 + Tailwind + framer-motion + sonner + lucide-react + canvas-confetti.
- **Backend**: FastAPI + Motor (async MongoDB). Single enquiry API.
- **DB (schoolofplay)**: collection `enquiries`.

## Reused from Careplus (technical, invisible)
React app shell + client routing, layout/header/footer structure pattern, the full shadcn/Radix UI
primitive library (`src/components/ui/*`), the FastAPI+Mongo form-submission/storage pattern, and the
`AmbientParticles` idea (rebuilt into the new ParticleField).

## Discarded from Careplus
AI chat/intake, voice/TTS, dual static/dynamic modes, Google sign-in, Forest Apothecary palette,
all healthcare content, old pages/components.

## New design system
- Palette: royal blue primary + sky/yellow/green/coral/purple accents on clean neutrals (CSS vars in `index.css`, exposed as `sop-*` Tailwind colors).
- Type: Fredoka (display, rounded) + Nunito (body).
- Rounded tactile cards, colourful CTAs, generous spacing, playful float/blob animations.

## Interactive particle effect
`frontend/src/components/sop/ParticleField.jsx` — canvas confetti squares (varied size/colour/position)
over CSS cloud blobs; eased cursor parallax (depth-based), ambient drift, resize + DPR aware,
touch/reduced-motion fallback (no cursor dependency). Used in Home hero + every PageHero.

## Pages (core structure phase)
Home; Parents hub + Holiday Camps, Clubs (parents), Sports Classes, How To Book, FAQs & Pricing;
Schools hub + PE, Swim:ED, Game Set & MATHS, Extra-Curricular, Tournaments, Clubs (schools);
About (Why Choose Us), Meet the Team, Contact (enquiry form). Book Now links out to iPal portal.

## Forms
Single reusable EnquiryForm -> POST /api/enquiries. Fields exactly per inventory: full_name, email,
phone, audience (Parent/School/Other), service, school_name_location, enquiry, mailing_list. Confetti
on success. No emails sent in this phase (submissions stored + listable via GET /api/enquiries).

## Status
- Backend: 8/8 tests passed (enquiry create/validate/list).
- Frontend: built, home verified by screenshot; automated frontend testing not yet run (awaiting user).

## Deferred (per inventory "additional content"; not built yet)
Individual venue pages, full policy/safeguarding/terms pages, blog, photo/video galleries, careers
detail, offers page, feedback/referral forms, partnership enquiry form, timetables downloads.
