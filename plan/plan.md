# Pentium Constructions — "Dynamic Part" (modelled on the School of Play reference)

## Confirmed decisions (locked)
- **Fresh build** in this workspace (Pentium repo not connected; School of Play
  is reference only). Styled to Pentium's premium dark/gold look.
- **AI model: Anthropic Claude** via the Emergent LLM key.
  Key provided by user: `sk-emergent-a9f3a4b833d4d37998` (to be stored in
  backend `.env` as `EMERGENT_LLM_KEY` during the build).
- **Lead capture: both** — mid-chat by the assistant AND via a normal enquiry
  form.
- **Notifications: none for now** — enquiries are stored and retrievable in-app;
  no email/WhatsApp (can be added later).

## What's being built (the dynamic part)
An AI-guided interactive experience for Pentium, mirroring the reference:

### "Pentium Home Advisor" (AI assistant)
- Conversational guide for buyers exploring premium homes in Kerala.
- Answers about **projects** (Eternia, Harmony Heights, Tranquil, Spring Green
  Villas, Palm Grove, Aishwarya, etc.), **services**, locations, RERA status,
  the company story, and how to enquire.
- **Strictly grounded** on Pentium's own content — never invents prices,
  availability or claims; points to the enquiry form / phone / WhatsApp when it
  doesn't know.

### Live visual panels (change per question) — interactive & eye-catching
The left canvas is the centrepiece, not plain text blocks. It swaps in relevant
content per question and is designed to feel premium and alive:
- **Smooth animated transitions** as panels change (fade/slide, staggered
  reveals) so each answer visibly transforms the canvas.
- **Rich visual cards** with real project imagery, image galleries/carousels,
  hover effects, RERA/status badges, and animated stat counters.
- **Interactive elements** the visitor can click inside the canvas — project
  tabs (Ongoing/Completed), thumbnails, "View gallery", and quick-action
  buttons (e.g. "Book a site visit", "Talk to us") that feed back into the chat.
- **Motion polish** — subtle parallax/ambient background, gold-accent
  highlights, glass/gradient surfaces matching Pentium's premium dark look.
- Respects reduced-motion preferences and stays clean on mobile.
Panel types: specific project card/gallery, services overview, why Pentium,
contact/offices map, and a book-a-site-visit prompt.

### Lead / enquiry capture
- Assistant collects Name, Phone, Email, Project of Interest and Message during
  the chat and saves it as an enquiry.
- A standard enquiry form does the same for visitors who prefer that.
- All enquiries stored and retrievable in-app.

### Entry point
A floating launcher (Pentium-styled) on a minimal branded shell page that opens
the Advisor experience.

## Out of scope (for this build)
- Full rebuild of static marketing pages (About, Services, Why Pentium, Quality
  Process, CSR, Go Green, FAQ copy, Terms/Privacy). Only a minimal Pentium-styled
  shell is added so the Advisor is usable and demoable in context.
- Email/WhatsApp notifications.

## Content source
Knowledge base seeded from the current pentiumconstructions.in content (projects,
services, about, contact, FAQs). Project details flagged "verify" on the live
site will use what's public and can be refined later.
