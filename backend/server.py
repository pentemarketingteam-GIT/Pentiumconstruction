from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import json
import re
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone
from emergentintegrations.llm.chat import LlmChat, UserMessage


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="School of Play API")
api_router = APIRouter(prefix="/api")

logger = logging.getLogger("schoolofplay")
logging.basicConfig(level=logging.INFO)


# ---------- Models ----------
class EnquiryCreate(BaseModel):
    """Matches the School of Play contact enquiry form fields only."""
    full_name: str
    email: EmailStr
    phone: Optional[str] = None
    audience: Optional[str] = None          # Parent / School / Other
    service: Optional[str] = None           # Wraparound Care / Holiday Camps / Sports Provision / PE / Extra-Curricular Sports Classes / Other
    school_name_location: Optional[str] = None
    enquiry: str
    mailing_list: bool = False
    source: Optional[str] = None            # which page/CTA the enquiry came from


class EnquirySubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    full_name: str
    email: EmailStr
    phone: Optional[str] = None
    audience: Optional[str] = None
    service: Optional[str] = None
    school_name_location: Optional[str] = None
    enquiry: str
    mailing_list: bool = False
    source: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "School of Play API", "status": "ok"}


@api_router.post("/enquiries", response_model=EnquirySubmission)
async def create_enquiry(payload: EnquiryCreate):
    obj = EnquirySubmission(**payload.model_dump())
    doc = obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.enquiries.insert_one(doc)
    logger.info("New enquiry from %s (%s / %s)", obj.full_name, obj.audience, obj.service)
    return obj


@api_router.get("/enquiries", response_model=List[EnquirySubmission])
async def list_enquiries():
    rows = await db.enquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for r in rows:
        if isinstance(r.get('created_at'), str):
            r['created_at'] = datetime.fromisoformat(r['created_at'])
    return rows


# =============================================================================
# Play Assistant — Claude-powered dynamic AI experience (grounded on inventory)
# =============================================================================

# Valid content panels the assistant may surface on the dynamic canvas.
VALID_PANELS = [
    "welcome", "holiday_camps", "clubs_parents", "how_to_book", "faqs_pricing",
    "sports_classes", "schools_overview", "pe", "swim_ed", "game_set_maths",
    "extra_curricular", "tournaments", "clubs_schools", "venues", "why_us",
    "team", "contact", "booking",
]

# Knowledge base — drawn ONLY from the supplied School of Play content inventory.
KNOWLEDGE_BASE = """
SCHOOL OF PLAY — KNOWLEDGE BASE (the ONLY source of truth; never invent beyond this)

ABOUT: UK children's activity provider (Greater Manchester). Purposeful play & physical activity.
Vision: positively impact 1 million children through purposeful play & physical activity by 2035.
Values: Safety First; Delivering with Passion; Working Together; Thinking Differently.
Contact: phone 0161 726 5022; email info@schoolofplay.org.uk; address Warren Bruce Court, Warren Bruce Road, Trafford Park, M17 1LB.
Booking is done via the external iPal portal: https://schoolofplay.ipalbookings.com/ (panel key "booking").

CURRENT CAMPAIGN: Summer Bookings Now Live — Summer Camp 2026 "Summer of Nations": WOW activities, inflatables, multi-sports, crafts, games, friendships, feel-good memories.

PARENTS SERVICES:
- HOLIDAY CAMPS (panel "holiday_camps"): ages 3.5–11. Theme "Summer of Nations": country-themed sports, creative challenges, games, WOW experiences. 100% pass rate across Ofsted inspections for holiday-camp settings.
  Create Groups (ages 3y6m–11): Arts & crafts, Science experiments, Food creation, Theme workshops, Character visits, Outdoor activities, Nature trails, Construction play, Imaginative play.
  Multi-Sports Groups (ages 5–11): Football, Dodgeball, Hockey, Archery, Kwik-cricket, Mini-tennis, Tri-golf, Rounders, Kickball, Badminton, Volleyball, Disc golf, Lacrosse, Athletics, Basketball, Hoopball, Ultimate frisbee, Netball, Skittleball.
  Locations: Urmston, Chorlton, Davyhulme, Eccles, Altrincham, Timperley, Sale, Macclesfield, Cheadle, Flixton, Wythenshawe, Reddish. (Venues panel "venues": Chorlton, Branwood (Monton), Urmston, St Hugh's (Timperley), Prestbury (Macclesfield), Broadheath (Altrincham), Templemoor (Sale), Oak Tree (Cheadle), St Michael's CE (Flixton), Button Lane HAF (Wythenshawe)).
  What to bring: packed lunch; morning & afternoon snacks; drink; weather-appropriate clothing; suitable footwear; sun lotion in summer; required medication where applicable.
  What NOT to bring: nuts/nut foods; sesame foods; whole grapes; phones/tablets/electronic devices; toys.
- FAQs & PRICING (panel "faqs_pricing"): approx £25.49–£30.49 per day depending on venue. Standard hours 09:00–17:00. Early drop-off from 08:00, late collection until 18:00 (additional charge). Full-day sessions only. Create groups ages 3y6m–11; sports groups ages 5–11. Children must be toilet trained. Childcare vouchers accepted.
- HOW TO BOOK (panel "how_to_book"): iPal tutorials — use the iPal booking system; add a child; pay monthly; pay with childcare vouchers; pay by card; find & pay an outstanding payment; cancel a booked day. Then book via iPal.
- BEFORE & AFTER SCHOOL CLUBS (parents) (panel "clubs_parents"): Ofsted-registered, across Greater Manchester. Locations: Urmston, Davyhulme, Prestbury, Stretford, Wythenshawe, Rusholme. Activities: sports, creative projects, workshops, special experiences.
- SPORTS CLASSES (panel "sports_classes"): active sessions offered via clubs and school provision (no standalone detail — route to clubs/extra-curricular or enquiry).
Parent guarantees: free first day / first-day guarantee; "Can I Go Back?" guarantee (refund for relevant day/booked sessions if a child is unhappy).

SCHOOLS SERVICES (panel "schools_overview" for the list). Core: reduce school admin & staffing pressure while keeping children safe, active and inspired. Suitability: "See if this works for our school" — 15-minute suitability call to discuss timetable, space, costs and outcomes.
- PE & SPORTS PROVISION (panel "pe"): PE develops pupil skills through engaging, supportive, exploratory learning. Also Breakfast/After School Clubs, Lunchtime Sports Provision. Lunchtime benefits: better behaviour management; more structured activity; team & individual challenges; smaller-group support. Pricing: Bronze half day £121/day; Silver full day £196/day; Gold 2+ full days £178/day. Add-ons: Sports Coach £41/hr; PE Teacher £46/hr; Lunch provision £47 (1hr)/£59.40 (2hr); After School Club cover £47/hr.
- SWIM:ED (panel "swim_ed"): "Making Waves in Primary Education" — on-site pop-up swimming pool programme reducing travel/logistics. Benefits: more learning time; reduced transport/logistics; pupil progress data; safety-focused; inclusive; cost-efficient. Features: heated pop-up pool; temporary modular structure; qualified instructors & lifeguards; progress reporting; curriculum-aligned swimming & water safety; secure set-up; inclusive access. Pricing: on-site swimming from £11,104; temporary changing rooms from £258. Six steps: Apply, Site Visit, Sign Up, Set-up, Delivery, Impact. CTAs: Register Interest; Take the Primary School Swimming Review.
- GAME, SET & MATHS (panel "game_set_maths"): workshop combining tennis, movement and mathematics. Benefits: cross-curricular learning; high female participation; lifelong participation in sport; fundamental movement skills. Pricing: half day £270; 1 day £330; 2 days £600; 3 days £810. Included: workshop; prize-draw entry for £100 of tennis equipment; interactive assembly; six weeks of extra-curricular tennis lesson plans.
- EXTRA-CURRICULAR CLUBS (panel "extra_curricular"): flexible provision by qualified coaches, admin handled by School of Play. Activities: Football/Futsal, Gymnastics, Dance, Mini Golf, Mini Tennis, Hockey, Kwik-Cricket, Lacrosse.
- SPORTS TOURNAMENTS (panel "tournaments"): free-to-enter primary tournaments at indoor/all-weather facilities. Benefits: supports School Games Mark; free participation; managed logistics; all-weather facilities; regular competition; prizes & awards.
- BEFORE & AFTER SCHOOL CLUBS (schools) (panel "clubs_schools"): wraparound care tailored to each school. Benefits: remove staffing headaches; reduce pressure on teaching staff; enriching activities; support school reputation; Ofsted-approved; online booking management. Example activities: multi-sports; glow-in-the-dark games; science experiments; arts & crafts; fencing; radio-controlled cars; laser tag.

ABOUT (panel "why_us"): themes — Memories to Last a Lifetime; Keeping Kids Moving; child wellbeing; physical activity; creative exploration; confidence & life skills. Trust: Ofsted inspections & parent feedback. (panel "team" = Meet the Team.)
CONTACT / ENQUIRY (panel "contact"): enquiry form fields — Full Name, Email, Phone, audience (Parent/School/Other), Service (Wraparound Care / Holiday Camps / Sports Provision / PE / Extra-Curricular Sports Classes / Other), School name & location, Enquiry, mailing-list opt-in.
""".strip()

SYSTEM_RULES = """
You are the "Play Assistant" — the conversational guide for the School of Play website.
You serve TWO audiences in one place: PARENTS (camps, clubs, activities, bookings) and SCHOOLS
(PE, Swim:ED, wraparound care, tournaments, workshops).

STRICT GROUNDING:
- Use ONLY the KNOWLEDGE BASE. Never invent services, prices, dates, venues, policies or claims.
- If asked something not covered (e.g. an exact per-venue price, a specific policy detail, availability),
  say you don't have that detail and direct them to the enquiry form (panel "contact") or phone 0161 726 5022 / info@schoolofplay.org.uk. Do NOT guess.
- Booking is only via iPal — never claim to book directly; surface panel "booking".

STYLE: warm, upbeat, playful yet trustworthy and concise (2–5 short sentences). British English. No markdown headings.

PERSONALISATION: detect whether the user is a parent or a school and tailor answers/panels. If unclear, gently ask or offer both.

LEAD CAPTURE: when a user wants to be contacted / enquire / register interest / book a suitability call,
collect Full Name, Email and a short Enquiry over the conversation. Only set lead.ready_to_submit=true
once you have a valid full_name AND a valid email AND an enquiry. Never fabricate these values.

OUTPUT FORMAT — respond with ONE valid JSON object ONLY (no prose outside it, no code fences):
{
  "reply": "<your conversational answer>",
  "audience": "parent" | "school" | "unknown",
  "panels": [<zero or more panel keys to display on the canvas>],
  "suggestions": [<2-4 short quick-reply chip texts>],
  "lead": {
    "capture": <true if currently collecting enquiry details>,
    "full_name": <string or null>,
    "email": <string or null>,
    "phone": <string or null>,
    "service": <one of the Service options or null>,
    "school_name_location": <string or null>,
    "enquiry": <string or null>,
    "ready_to_submit": <true only when full_name, email and enquiry are all present>
  }
}
VALID panel keys: """ + ", ".join(VALID_PANELS) + """.
Choose the most relevant 1–3 panels for the user's need (e.g. holiday_camps, swim_ed, pe, faqs_pricing, contact, booking).
""".strip()


class AssistantMessage(BaseModel):
    session_id: str
    message: str


def _extract_json(text: str) -> dict:
    """Best-effort extraction of a single JSON object from model output."""
    if not text:
        return {}
    text = text.strip()
    # strip code fences if present
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
    audience = data.get("audience") if data.get("audience") in ("parent", "school", "unknown") else "unknown"
    panels = [p for p in (data.get("panels") or []) if p in VALID_PANELS][:3]
    suggestions = [s for s in (data.get("suggestions") or []) if isinstance(s, str)][:4]
    lead = data.get("lead") or {}

    # auto-submit lead when ready and valid
    lead_submitted = False
    if isinstance(lead, dict) and lead.get("ready_to_submit"):
        fn = (lead.get("full_name") or "").strip()
        em = (lead.get("email") or "").strip()
        enq = (lead.get("enquiry") or "").strip()
        if fn and em and enq and re.match(r"^[^@\s]+@[^@\s]+\.[^@\s]+$", em):
            try:
                obj = EnquirySubmission(
                    full_name=fn, email=em, phone=lead.get("phone"),
                    audience=("Parent" if audience == "parent" else "School" if audience == "school" else "Other"),
                    service=lead.get("service"), school_name_location=lead.get("school_name_location"),
                    enquiry=enq, mailing_list=False, source="ai_assistant",
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
        "audience": audience,
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
