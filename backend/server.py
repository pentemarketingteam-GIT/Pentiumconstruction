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
    "project_civil_park", "project_aishwarya", "services", "why_pentium",
    "quality_process", "go_green", "csr", "about", "contact", "book_visit",
]

# Knowledge base — drawn ONLY from Pentium Constructions' own website content.
KNOWLEDGE_BASE = """
PENTIUM CONSTRUCTIONS — KNOWLEDGE BASE (the ONLY source of truth; never invent beyond this)

ABOUT (panel "about"): Pentium Construction Pvt. Ltd. is a premium residential developer headquartered in
Calicut (Kozhikode), Kerala, since 1994 — 30+ years of building. Positions itself as a leading Kerala builder
specialising in premium apartments and villas across Calicut and Perinthalmanna (Malappuram), with developments
across Malappuram, Wayanad and beyond. Guiding principle: "Quality in everything we do."
Tagline: Responsible Building. Unmatched Craft. / Premium Living, Kerala.
Leadership: Mr. V. Gopinathan (Chairman & Managing Director); Mr. V. Sethu Madhavan (Director).
Stats: 2000+ Happy Clients; 23+ Completed/Landmark Projects; 3 Ongoing Projects; Established 1994.
Ethos: contemporary design blended with Kerala living traditions (passive ventilation, teakwood craftsmanship);
ethics and integrity with no shortcuts; customers welcomed into the "Pentium Family."

WHY PENTIUM (panel "why_pentium"): Choosing a construction partner matters most years after handover.
What matters: experienced teams across many projects; genuine end-to-end project management; uncompromising
quality; honest communication (including about problems); on-time track record; budget-sensible solutions;
modern construction methods; non-negotiable safety; sustainable practices where they add value; support that
continues after signing. Pillars of Excellence: Advanced Facilities (modern technology & infrastructure);
World-Class Amenities (swimming pools, gyms, clubhouses, landscaped gardens); Spacious Rooms (airy, generously
sized apartments and villas).

KEY DIFFERENTIATORS: Precision engineering to IS 800 standards; passive ventilation & climate-resilient layouts;
premium teakwood & granite finish palette chosen for coastal durability; RERA-certified, fully transparent
documentation; on-time delivery.

PROJECTS (panel "projects" for the list; use the specific project panel when a single project is discussed).
NOTE: Details beyond location/type/status are limited on the public site — never invent prices, availability,
exact unit counts, floor plans or launch dates that are not listed here. Point buyers to the enquiry form or
phone for specifics.
- PENTIUM HARMONY HEIGHTS (panel "project_harmony") — Apartments. Status: ONGOING, ~45% complete, RERA Certified.
- PENTIUM ETERNIA VERTICAL HOMES (panel "project_eternia") — Karaparamba, near Eranhipalam, Calicut.
  2 & 3 BHK high-rise apartments. Status: Delivered.
- PENTIUM TRANQUIL VERTICAL HOME (panel "project_tranquil") — Nellikavu, near Eranhipalam, Calicut.
  2 & 3 BHK apartments (28 units, G+4). Status: Completed / Ready to move.
- PENTIUM SPRING GREEN VILLAS (panel "project_spring_green") — Perinthalmanna, Malappuram.
  3, 4 & 5 BHK villas. Status: Delivered.
- PENTIUM PALM GROVE (panel "project_palm_grove") — Padippura, Malappuram. 2 BHK apartments. Status: Ready to move.
- PENTIUM CIVIL PARK (panel "project_civil_park") — Parammal, Calicut. 3 BHK apartments. Status: Ready to move.
- PENTIUM AISHWARYA (panel "project_aishwarya") — Status: Ready to move. (Other details not published.)

SERVICES (panel "services"): "Construction Solutions, Start to Finish" — residential, commercial, institutional
and industrial work delivered as one seamless process (no juggling multiple contractors). Services:
1) Residential Construction (custom homes, villas, apartments); 2) Commercial Construction (offices, retail,
mixed-use); 3) Industrial Construction (factories, warehouses, manufacturing); 4) Turnkey Projects (concept,
design, construction, handover by one team); 5) Renovation & Remodeling (structural upgrades, interiors,
restoration); 6) Project Management (scheduling, budgeting, quality oversight, site supervision);
7) Interior & Finishing Works (flooring, painting, electrical, plumbing, finishing).

QUALITY PROCESS (panel "quality_process"): "Getting It Right at Every Stage." Quality is built in, not just
checked at the end. Five stages: 1) Planning (scope review, design validation, resource planning, early risk
ID); 2) Procurement (approved vendors, on-site material inspection, certified materials); 3) Construction
(skilled crews, active supervision, process checks, safety compliance); 4) Inspection (structural & finishing
checks + final client walkthrough); 5) Handover (final quality review, documentation, completion report,
satisfaction check).

RESPONSIBLE BUILDER: "Building with Integrity" — transparency on timelines, safe sites, statutory/regulatory
compliance, respect for clients, suppliers and workers; client needs at the centre.

GO GREEN (panel "go_green"): "Building Responsibly, Not Just Efficiently." Energy-efficient design; water
conservation; responsible construction-waste management; eco-friendly materials; sustainability-minded site
operations; lower carbon footprint; efficient resource use; green landscaping.

CSR (panel "csr"): "Building Communities, Not Just Structures." Focus areas: education support; community
development; health & wellness outreach; environmental conservation; employee-led volunteering; disaster relief;
skill development & youth programmes.

CONTACT (panel "contact"): Response to enquiries within 24 hours on business days.
Primary Mobile: +91 9544 141 000 (WhatsApp: wa.me/919544141000). UAE Mobile: +971 56 724 1497.
Admin Office Phone: 0495 - 2768946. Sales Email: sales@pentiumconstructions.in. Admin Email:
admin@pentiumconstructions.in.
Admin Office: 2nd Floor, Mananchira Tower, A.G. Road, Kozhikode, Kerala.
Branch Office: 1st Floor, Lucia Tower 19/455 (2), Bypass Jn., Perinthalmanna - 679 322.
Regd. Office: No. 84/44, 2nd Floor, 2nd Main Road, Vinayaka Circle, Vyalikaval, Bangalore - 560003.

BOOKING / SITE VISIT (panel "book_visit"): There is no online booking portal — a site visit or consultation is
arranged by the Pentium team. Collect the visitor's details (name, phone, project of interest) via the enquiry
form / chat, or ask them to call +91 9544 141 000.

FAQ HIGHLIGHTS: Handles residential, commercial, industrial, institutional & turnkey work. In-house architects
& engineers for planning, design and estimates. Multi-stage inspections and experienced supervisors ensure
durability. Upfront planning and progress tracking support on-time delivery. Sustainability is built in.
For a quote: contact via form, email or phone for a consultation and tailored quotation. Renovation & remodelling
undertaken. What sets Pentium apart: straightforward communication, consistent quality, every project treated as
important.
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

STYLE: warm, premium, trustworthy and concise (2–5 short sentences). Indian English. No markdown headings, no
bullet symbols in the reply text.

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
Always choose the MOST SPECIFIC panel that matches the question so the visual panel changes with every reply:
- A single named project -> its own panel (e.g. Eternia -> project_eternia, Spring Green -> project_spring_green).
- Browsing/comparing multiple homes or "show me projects" -> projects.
- Company story/history/leadership -> about; why choose Pentium/quality of partner -> why_pentium.
- Construction services offered -> services; quality steps/process -> quality_process; sustainability -> go_green;
  community/csr -> csr; phone/address/email -> contact; site visit/consultation/enquire -> book_visit.
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
