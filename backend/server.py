from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import json
import re
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from emergentintegrations.llm.chat import LlmChat, UserMessage


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Pentium Constructions API")
api_router = APIRouter(prefix="/api")

logger = logging.getLogger("pentium")
logging.basicConfig(level=logging.INFO)


# ---------- Models ----------
class EnquiryCreate(BaseModel):
    """Pentium enquiry / consultation request."""
    full_name: str
    phone: Optional[str] = None
    email: Optional[str] = None
    project_of_interest: Optional[str] = None
    message: str
    source: Optional[str] = None            # which page/CTA the enquiry came from


class EnquirySubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    full_name: str
    phone: Optional[str] = None
    email: Optional[str] = None
    project_of_interest: Optional[str] = None
    message: str
    source: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Pentium Constructions API", "status": "ok"}


@api_router.post("/enquiries", response_model=EnquirySubmission)
async def create_enquiry(payload: EnquiryCreate):
    obj = EnquirySubmission(**payload.model_dump())
    doc = obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.enquiries.insert_one(doc)
    logger.info("New enquiry from %s (project: %s)", obj.full_name, obj.project_of_interest)
    return obj


@api_router.get("/enquiries", response_model=List[EnquirySubmission])
async def list_enquiries():
    rows = await db.enquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for r in rows:
        if isinstance(r.get('created_at'), str):
            r['created_at'] = datetime.fromisoformat(r['created_at'])
    return rows


# =============================================================================
# Pentium Home Advisor — Claude-powered dynamic experience (grounded on content)
# =============================================================================

# Valid content panels the assistant may surface on the dynamic canvas.
VALID_PANELS = [
    "welcome", "projects", "project_eternia", "project_tranquil",
    "project_harmony", "project_spring_green", "project_palm_grove",
    "project_civil_avenue", "project_vrindavan", "project_dream_city",
    "project_aishwarya", "services", "why_pentium", "quality_process",
    "go_green", "csr", "about", "faqs", "contact", "book_visit",
]

# Knowledge base — drawn ONLY from Pentium Constructions' own website content.
KNOWLEDGE_BASE = """
PENTIUM CONSTRUCTIONS — KNOWLEDGE BASE (the ONLY source of truth; never invent beyond this)

ABOUT (panel "about"): Pentium Construction Pvt. Ltd., a premium residential developer headquartered in Calicut
(Kozhikode), Kerala since 1994 (30+ years). Premium apartments and villas across Calicut and Perinthalmanna
(Malappuram), with developments across Malappuram, Wayanad and beyond. Guiding principle: "Quality in everything
we do." Tagline: Responsible Building. Unmatched Craft. Leadership: Mr. V. Gopinathan (Chairman & MD),
Mr. V. Sethu Madhavan (Director). Stats: 2000+ happy clients; 23+ completed projects; 3 ongoing; est. 1994.

WHY PENTIUM (panel "why_pentium"): experienced teams; genuine end-to-end project management; uncompromising
quality; honest communication; on-time delivery; budget-sensible solutions; modern methods; non-negotiable
safety; sustainable practice; after-handover support. Pillars: Advanced Facilities; World-Class Amenities
(pools, gyms, clubhouses, gardens); Spacious Rooms. Differentiators: IS 800 precision engineering; passive
ventilation & climate-resilient layouts; teakwood & granite palette; RERA-certified transparent documentation;
on-time delivery.

ONGOING PROJECTS
1) HARMONY HEIGHTS (panel "project_harmony") — Perinthalmanna, Malappuram. Luxury Apartments, 2 & 3 BHK,
   18 floors, 60 apartments. Area 1,494–2,133 sq ft. Land 2,396.50 sq m. RERA K-RERA/PRJ/MPM/232/2024.
   Website status: Ongoing ~45% complete; construction started 1 Jan 2025, expected completion 31 Dec 2028.
   44 amenities (incl. swimming pool, rooftop yoga/meditation, AC indoor games, co-working space, EV charging,
   3 high-speed lifts, generator backup, solar, STP, biogas). Full technical specs published (flooring, kitchen,
   toilet, electrical, doors/windows, painting, elevators, generators, water, parking, security, fire safety,
   waste, finance). Blueprints: Basement, Ground, First, Typical, Type A–D.
2) TRANQUIL VERTICAL HOME (panel "project_tranquil") — Nellikavu, Eranhipalam, Calicut. Luxury Apartments,
   2 & 3 BHK, Ground + 4 floors, 28 homes. Area 1,314–1,863 sq ft. RERA K-RERA/PRJ/KKD/063/2021.
   Website status: Ongoing — nearing completion (exact % not published). 18 amenities. Full technical specs
   published. Blueprints: Ground, Type A–G, Typical.
3) SPRING GREEN VILLAS (panel "project_spring_green") — Perinthalmanna, Malappuram. Luxury Villas, 3, 4 & 5 BHK,
   37 units. Area 1,296–2,604 sq ft. RERA K-RERA/PRJ/MPM/172/2021. 20 amenities (gated community, basement
   multi-level parking, pool, shuttle court, AC indoor games, billiards, etc.). NOTE: detailed technical specs
   and blueprint set are NOT published on the site — say "available on request" and route to sales.

COMPLETED PROJECTS (panels): ETERNIA VERTICAL HOMES (project_eternia) — Karaparamba, Calicut, 2 & 3 BHK,
14 floors, 52 units, RERA K-RERA/PRJ/259/2020. PALM GROVE (project_palm_grove) — Perinthalmanna, Malappuram,
luxury apartments. AISHWARYA (project_aishwarya) — Calicut, luxury apartments. VRINDAVAN (project_vrindavan) —
Eranhipalam, Calicut. CIVIL AVENUE (project_civil_avenue) — Calicut. DREAM CITY (project_dream_city) — Calicut.
For completed projects beyond type/location/RERA, other details are "available on request".

SERVICES (panel "services"): Residential, Commercial, Industrial, Turnkey, Renovation & Remodeling, Project
Management, Interior & Finishing — delivered as one seamless process.

QUALITY PROCESS (panel "quality_process"): Planning, Procurement, Construction, Inspection, Handover.
GO GREEN (panel "go_green"): energy-efficient design, water conservation, waste management, eco materials,
lower carbon footprint, green landscaping.
CSR (panel "csr"): education, community development, health outreach, environment, volunteering, disaster relief,
skill development.

FAQs (panel "faqs"): handles residential/commercial/industrial/institutional/turnkey; in-house architects &
engineers; multi-stage inspections; on-time delivery via planning & tracking; sustainability built in; quotes via
consultation; renovation undertaken; differentiator = straightforward communication & consistent quality.

CONTACT (panel "contact"): replies within 24 hours on business days. Primary +91 9544 141 000
(WhatsApp wa.me/919544141000); UAE +971 56 724 1497; Admin office 0495-2768946; sales@pentiumconstructions.in;
admin@pentiumconstructions.in. Offices: Admin — 2nd Floor, Mananchira Tower, A.G. Road, Kozhikode;
Branch — 1st Floor, Lucia Tower, Bypass Jn., Perinthalmanna 679322; Regd. — Vyalikaval, Bangalore 560003.
Home-loan assistance available; projects approved by major banks/financial institutions for long-term loans.

BOOKING / SITE VISIT (panel "book_visit"): no online booking portal — a site visit/consultation is arranged by
the team. Collect name, phone and project of interest via chat or the enquiry form, or ask them to call/WhatsApp.
""".strip()

SYSTEM_RULES = """
You are the "Pentium Home Advisor" — the warm, knowledgeable concierge for the Pentium Constructions website,
guiding buyers who are exploring premium homes (apartments and villas) in Kerala.

STRICT GROUNDING:
- Use ONLY the KNOWLEDGE BASE. NEVER invent prices, availability, unit counts, floor plans, dimensions, launch
  dates, RERA numbers, amenities or claims that are not explicitly listed.
- If asked for something not covered (exact price, availability, brochure, floor plan, a specific date), say you
  don't have that detail and offer to connect them with the team — direct them to the enquiry form (panel
  "contact" or "book_visit") or phone +91 9544 141 000 / WhatsApp. Do NOT guess.
- You cannot book or reserve anything directly; a site visit/consultation is arranged by the team.

STYLE: warm, premium and trustworthy. Keep replies ULTRA SHORT — 1 to 2 plain sentences in simple, 7th-grade
Indian English. NEVER put long lists, specifications, amenities or tables in the chat text: the LEFT canvas
carries ALL the detail. If the user asks to "list", "show all", "full details", amenities, specs or blueprints,
reply briefly (for example: "Sure — I've put the full details on the left for you.") and select the matching
panel. When a value is not published (e.g. price, exact availability, or Spring Green specs/blueprints), say it's
"available on request" and offer to connect them with sales. No markdown, no bullet symbols in the reply.

LEAD CAPTURE: when the visitor wants to enquire, book a site visit, request a call-back, or get a quote/brochure,
collect their Name, Phone, and a short Message over the conversation (Email and Project of Interest are helpful
but optional). Only set lead.ready_to_submit=true once you have a valid full_name AND phone AND message.
Never fabricate these values. Confirm back what you captured.

OUTPUT FORMAT — respond with ONE valid JSON object ONLY (no prose outside it, no code fences):
{
  "reply": "<your conversational answer>",
  "panels": [<zero or more panel keys to display on the canvas>],
  "suggestions": [<2-4 short quick-reply chip texts>],
  "lead": {
    "capture": <true if currently collecting enquiry details>,
    "full_name": <string or null>,
    "phone": <string or null>,
    "email": <string or null>,
    "project_of_interest": <string or null>,
    "message": <string or null>,
    "ready_to_submit": <true only when full_name, phone and message are all present>
  }
}
VALID panel keys: """ + ", ".join(VALID_PANELS) + """.
Always choose the MOST SPECIFIC panel so the canvas changes with every reply:
- A single named project -> its own panel (Harmony Heights -> project_harmony, Tranquil -> project_tranquil,
  Spring Green -> project_spring_green, Eternia -> project_eternia, Palm Grove -> project_palm_grove,
  Aishwarya -> project_aishwarya, Vrindavan -> project_vrindavan, Civil Avenue -> project_civil_avenue,
  Dream City -> project_dream_city). Amenities/specs/blueprints of a project still use that project's panel.
- Browsing/comparing homes or "show me projects" -> projects.
- Company story/history/leadership -> about; why choose Pentium -> why_pentium; common questions -> faqs;
  services -> services; quality steps -> quality_process; sustainability -> go_green; community -> csr;
  phone/address/email/offices -> contact; site visit/consultation/enquire/call-back -> book_visit.
Return the single best panel. Never repeat a generic panel when a specific one fits.
""".strip()


class AssistantMessage(BaseModel):
    session_id: str
    message: str


def _extract_json(text: str) -> dict:
    """Best-effort extraction of a single JSON object from model output."""
    if not text:
        return {}
    text = text.strip()
    text = re.sub(r"^```(?:json)?|```$", "", text.strip(), flags=re.MULTILINE).strip()
    try:
        return json.loads(text)
    except Exception:
        pass
    start = text.find("{")
    end = text.rfind("}")
    if start != -1 and end != -1 and end > start:
        snippet = text[start:end + 1]
        try:
            return json.loads(snippet)
        except Exception:
            return {}
    return {}


@api_router.post("/assistant/chat")
async def assistant_chat(payload: AssistantMessage):
    api_key = os.environ.get("EMERGENT_LLM_KEY")
    if not api_key:
        raise HTTPException(status_code=503, detail="Assistant not configured")

    sid = payload.session_id or str(uuid.uuid4())
    user_text = (payload.message or "").strip()
    if not user_text:
        raise HTTPException(status_code=422, detail="Empty message")

    # persist user message
    await db.chat_messages.insert_one({
        "id": str(uuid.uuid4()), "session_id": sid, "role": "user",
        "content": user_text, "created_at": datetime.now(timezone.utc).isoformat(),
    })

    # load recent history for multi-turn context
    history = await db.chat_messages.find(
        {"session_id": sid}, {"_id": 0, "role": 1, "content": 1}
    ).sort("created_at", 1).to_list(20)
    transcript = "\n".join(
        f"{m['role'].upper()}: {m['content']}" for m in history[-12:]
    )

    system_message = (
        f"{SYSTEM_RULES}\n\n=== KNOWLEDGE BASE ===\n{KNOWLEDGE_BASE}\n\n"
        f"=== CONVERSATION SO FAR ===\n{transcript}"
    )

    try:
        chat = LlmChat(
            api_key=api_key,
            session_id=sid,
            system_message=system_message,
        ).with_model("anthropic", "claude-sonnet-4-6")
        raw = await chat.send_message(UserMessage(text=user_text))
    except Exception as e:
        logger.exception("Assistant chat failed: %s", e)
        raise HTTPException(status_code=502, detail="Assistant is unavailable right now")

    data = _extract_json(raw if isinstance(raw, str) else str(raw))
    reply = data.get("reply") or "Sorry, I didn't quite catch that — could you rephrase?"
    panels = [p for p in (data.get("panels") or []) if p in VALID_PANELS][:3]
    suggestions = [s for s in (data.get("suggestions") or []) if isinstance(s, str)][:4]
    lead = data.get("lead") or {}

    # auto-submit lead when ready and valid
    lead_submitted = False
    if isinstance(lead, dict) and lead.get("ready_to_submit"):
        fn = (lead.get("full_name") or "").strip()
        ph = (lead.get("phone") or "").strip()
        msg = (lead.get("message") or "").strip()
        if fn and ph and msg:
            try:
                obj = EnquirySubmission(
                    full_name=fn, phone=ph, email=(lead.get("email") or None),
                    project_of_interest=lead.get("project_of_interest"),
                    message=msg, source="ai_advisor",
                )
                doc = obj.model_dump()
                doc["created_at"] = doc["created_at"].isoformat()
                await db.enquiries.insert_one(doc)
                lead_submitted = True
            except Exception as e:
                logger.warning("Lead auto-submit skipped: %s", e)

    # persist assistant message
    await db.chat_messages.insert_one({
        "id": str(uuid.uuid4()), "session_id": sid, "role": "assistant",
        "content": reply, "panels": panels,
        "created_at": datetime.now(timezone.utc).isoformat(),
    })

    return {
        "session_id": sid,
        "reply": reply,
        "panels": panels,
        "suggestions": suggestions,
        "lead_submitted": lead_submitted,
    }


@api_router.get("/assistant/history/{session_id}")
async def assistant_history(session_id: str):
    rows = await db.chat_messages.find(
        {"session_id": session_id}, {"_id": 0}
    ).sort("created_at", 1).to_list(200)
    return {"session_id": session_id, "messages": rows}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
