from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


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
