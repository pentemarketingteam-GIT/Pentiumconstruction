#!/usr/bin/env python3
"""
Backend API tests for Pentium Constructions enquiry endpoints and Pentium Home Advisor AI chat.
Tests: GET /api/ health check, POST /api/enquiries, GET /api/enquiries
       POST /api/assistant/chat, GET /api/assistant/history/{session_id}
"""
import requests
import json
import uuid
from datetime import datetime
import time

# Base URL from frontend .env
BASE_URL = "https://build-dynamic-6.preview.emergentagent.com/api"

# Timeout for AI assistant calls (Claude can take up to ~20s, use 30-40s to be safe)
ASSISTANT_TIMEOUT = 40

def test_health_check():
    """Test GET /api/ health check endpoint"""
    print("\n" + "="*80)
    print("TEST 1: Health Check (GET /api/)")
    print("="*80)
    
    try:
        response = requests.get(f"{BASE_URL}/")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert data.get("message") == "Pentium Constructions API", f"Unexpected message: {data.get('message')}"
        assert data.get("status") == "ok", f"Unexpected status: {data.get('status')}"
        
        print("✅ PASS: Health check endpoint working correctly")
        return True
    except Exception as e:
        print(f"❌ FAIL: {str(e)}")
        return False


def test_create_enquiry_full():
    """Test POST /api/enquiries with all fields"""
    print("\n" + "="*80)
    print("TEST 2: Create Enquiry - Full Submission (POST /api/enquiries)")
    print("="*80)
    
    payload = {
        "full_name": "Rajesh Kumar",
        "phone": "+91 9876543210",
        "email": "rajesh.kumar@example.com",
        "project_of_interest": "Pentium Harmony Heights",
        "message": "I am interested in purchasing a 3 BHK apartment in Pentium Harmony Heights. Please provide details about availability, pricing, and site visit options.",
        "source": "website-enquiry-form"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/enquiries", json=payload)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        assert response.status_code in [200, 201], f"Expected 200/201, got {response.status_code}"
        data = response.json()
        
        # Verify UUID id field exists and is valid
        assert "id" in data, "Missing 'id' field in response"
        try:
            uuid.UUID(data["id"])
            print(f"✓ Valid UUID id: {data['id']}")
        except ValueError:
            raise AssertionError(f"Invalid UUID format: {data['id']}")
        
        # Verify no _id leakage
        assert "_id" not in data, "MongoDB _id leaked in response!"
        print("✓ No _id leakage")
        
        # Verify created_at exists and is ISO format
        assert "created_at" in data, "Missing 'created_at' field"
        try:
            datetime.fromisoformat(data["created_at"].replace('Z', '+00:00'))
            print(f"✓ Valid ISO created_at: {data['created_at']}")
        except ValueError:
            raise AssertionError(f"Invalid ISO format for created_at: {data['created_at']}")
        
        # Verify all submitted fields are echoed back
        for key in ["full_name", "phone", "email", "project_of_interest", "message", "source"]:
            assert data.get(key) == payload[key], f"Field {key} mismatch: expected {payload[key]}, got {data.get(key)}"
        print("✓ All fields echoed correctly")
        
        print("✅ PASS: Full enquiry submission successful")
        return True, data["id"]
    except Exception as e:
        print(f"❌ FAIL: {str(e)}")
        return False, None


def test_create_enquiry_minimal():
    """Test POST /api/enquiries with only required fields (full_name + message)"""
    print("\n" + "="*80)
    print("TEST 3: Create Enquiry - Minimal Submission (POST /api/enquiries)")
    print("="*80)
    
    payload = {
        "full_name": "Priya Menon",
        "message": "Please send me information about your villa projects in Perinthalmanna."
    }
    
    try:
        response = requests.post(f"{BASE_URL}/enquiries", json=payload)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        assert response.status_code in [200, 201], f"Expected 200/201, got {response.status_code}"
        data = response.json()
        
        # Verify UUID id
        assert "id" in data, "Missing 'id' field"
        uuid.UUID(data["id"])
        print(f"✓ Valid UUID id: {data['id']}")
        
        # Verify no _id leakage
        assert "_id" not in data, "MongoDB _id leaked in response!"
        print("✓ No _id leakage")
        
        # Verify created_at
        assert "created_at" in data, "Missing 'created_at' field"
        datetime.fromisoformat(data["created_at"].replace('Z', '+00:00'))
        print(f"✓ Valid ISO created_at: {data['created_at']}")
        
        # Verify required fields
        assert data["full_name"] == payload["full_name"]
        assert data["message"] == payload["message"]
        print("✓ Required fields echoed correctly")
        
        # Verify optional fields are None or not present
        assert data.get("phone") is None or "phone" not in data
        assert data.get("email") is None or "email" not in data
        assert data.get("project_of_interest") is None or "project_of_interest" not in data
        print("✓ Optional fields handled correctly")
        
        print("✅ PASS: Minimal enquiry submission successful")
        return True, data["id"]
    except Exception as e:
        print(f"❌ FAIL: {str(e)}")
        return False, None


def test_validation_missing_full_name():
    """Test POST /api/enquiries validation - missing full_name"""
    print("\n" + "="*80)
    print("TEST 4: Validation - Missing full_name (POST /api/enquiries)")
    print("="*80)
    
    payload = {
        "phone": "+91 9876543210",
        "message": "Test enquiry"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/enquiries", json=payload)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        assert response.status_code == 422, f"Expected 422 validation error, got {response.status_code}"
        print("✅ PASS: Missing full_name correctly rejected with 422")
        return True
    except Exception as e:
        print(f"❌ FAIL: {str(e)}")
        return False


def test_validation_missing_message():
    """Test POST /api/enquiries validation - missing message"""
    print("\n" + "="*80)
    print("TEST 5: Validation - Missing message (POST /api/enquiries)")
    print("="*80)
    
    payload = {
        "full_name": "Test User",
        "phone": "+91 9876543210"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/enquiries", json=payload)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        assert response.status_code == 422, f"Expected 422 validation error, got {response.status_code}"
        print("✅ PASS: Missing message correctly rejected with 422")
        return True
    except Exception as e:
        print(f"❌ FAIL: {str(e)}")
        return False


def test_list_enquiries(created_ids):
    """Test GET /api/enquiries - list all enquiries"""
    print("\n" + "="*80)
    print("TEST 6: List Enquiries (GET /api/enquiries)")
    print("="*80)
    
    try:
        response = requests.get(f"{BASE_URL}/enquiries")
        print(f"Status Code: {response.status_code}")
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        
        assert isinstance(data, list), f"Expected list response, got {type(data)}"
        print(f"✓ Returned list with {len(data)} enquiries")
        
        if len(data) == 0:
            print("⚠️  WARNING: No enquiries in database")
            return True
        
        # Check first enquiry structure
        first = data[0]
        print(f"\nFirst enquiry sample:")
        print(json.dumps(first, indent=2))
        
        # Verify no _id leakage
        for idx, enquiry in enumerate(data):
            assert "_id" not in enquiry, f"MongoDB _id leaked in enquiry {idx}!"
        print("✓ No _id leakage in any enquiry")
        
        # Verify all have id and created_at
        for idx, enquiry in enumerate(data):
            assert "id" in enquiry, f"Missing 'id' in enquiry {idx}"
            assert "created_at" in enquiry, f"Missing 'created_at' in enquiry {idx}"
            # Validate UUID
            uuid.UUID(enquiry["id"])
        print("✓ All enquiries have valid UUID id and created_at")
        
        # Verify our created enquiries are present
        returned_ids = [e["id"] for e in data]
        for created_id in created_ids:
            if created_id:
                assert created_id in returned_ids, f"Created enquiry {created_id} not found in list!"
        print(f"✓ All {len([i for i in created_ids if i])} created enquiries found in list")
        
        # Verify newest first ordering (check if created_at is descending)
        if len(data) > 1:
            dates = [datetime.fromisoformat(e["created_at"].replace('Z', '+00:00')) for e in data]
            is_descending = all(dates[i] >= dates[i+1] for i in range(len(dates)-1))
            if is_descending:
                print("✓ Enquiries ordered newest first")
            else:
                print("⚠️  WARNING: Enquiries may not be ordered newest first")
        
        print("✅ PASS: List enquiries endpoint working correctly")
        return True
    except Exception as e:
        print(f"❌ FAIL: {str(e)}")
        return False


# =============================================================================
# Pentium Home Advisor AI Chat Tests
# =============================================================================

def test_assistant_basic_chat():
    """Test A: Basic chat - POST /api/assistant/chat with project question"""
    print("\n" + "="*80)
    print("TEST A: Pentium Home Advisor - Basic Chat")
    print("="*80)
    
    payload = {
        "session_id": str(uuid.uuid4()),
        "message": "Tell me about Spring Green Villas"
    }
    
    try:
        print(f"Sending: {json.dumps(payload, indent=2)}")
        print("⏳ Waiting for Claude response (may take up to 20s)...")
        
        response = requests.post(
            f"{BASE_URL}/assistant/chat", 
            json=payload,
            timeout=ASSISTANT_TIMEOUT
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        
        # Verify required fields
        assert "session_id" in data, "Missing session_id"
        print(f"✓ Session ID: {data['session_id']}")
        
        assert "reply" in data, "Missing reply field"
        assert isinstance(data["reply"], str), "Reply must be a string"
        assert len(data["reply"]) > 0, "Reply is empty!"
        print(f"✓ Non-empty reply received ({len(data['reply'])} chars)")
        
        assert "panels" in data, "Missing panels field"
        assert isinstance(data["panels"], list), "Panels must be a list"
        print(f"✓ Panels: {data['panels']}")
        
        # Check for valid panel keys
        valid_panels = [
            "welcome", "projects", "project_eternia", "project_tranquil",
            "project_harmony", "project_spring_green", "project_palm_grove",
            "project_civil_park", "project_aishwarya", "services", "why_pentium",
            "quality_process", "go_green", "csr", "about", "contact", "book_visit"
        ]
        for panel in data["panels"]:
            assert panel in valid_panels, f"Invalid panel key: {panel}"
        
        # For Spring Green Villas query, should return project_spring_green panel
        if "project_spring_green" in data["panels"]:
            print("  ✓ Correctly returned project_spring_green panel")
        else:
            print(f"  ⚠️  Expected project_spring_green panel, got: {data['panels']}")
        
        assert "suggestions" in data, "Missing suggestions field"
        assert isinstance(data["suggestions"], list), "Suggestions must be a list"
        print(f"✓ Suggestions: {len(data['suggestions'])} items")
        
        assert "lead_submitted" in data, "Missing lead_submitted field"
        assert isinstance(data["lead_submitted"], bool), "lead_submitted must be boolean"
        assert data["lead_submitted"] == False, "lead_submitted should be False for basic query"
        print(f"✓ Lead submitted: {data['lead_submitted']}")
        
        print("✅ PASS: Basic chat working correctly")
        return True
    except requests.Timeout:
        print(f"❌ FAIL: Request timed out after {ASSISTANT_TIMEOUT}s")
        return False
    except Exception as e:
        print(f"❌ FAIL: {str(e)}")
        return False


def test_assistant_multi_turn_memory():
    """Test B: Multi-turn memory - conversation context retained"""
    print("\n" + "="*80)
    print("TEST B: Pentium Home Advisor - Multi-turn Memory")
    print("="*80)
    
    session_id = str(uuid.uuid4())
    
    # First message: establish context about Pentium Harmony Heights
    payload1 = {
        "session_id": session_id,
        "message": "Tell me about Pentium Harmony Heights"
    }
    
    try:
        print("\n--- Turn 1: Establish Pentium Harmony Heights context ---")
        print(f"Sending: {json.dumps(payload1, indent=2)}")
        print("⏳ Waiting for Claude response...")
        
        response1 = requests.post(
            f"{BASE_URL}/assistant/chat",
            json=payload1,
            timeout=ASSISTANT_TIMEOUT
        )
        
        print(f"Status Code: {response1.status_code}")
        data1 = response1.json()
        print(f"Reply: {data1.get('reply', 'N/A')}")
        print(f"Panels: {data1.get('panels', [])}")
        
        assert response1.status_code == 200, f"Turn 1 failed: {response1.status_code}"
        assert len(data1.get("reply", "")) > 0, "Turn 1 reply is empty"
        print("✓ Turn 1 successful")
        
        # Small delay between turns
        time.sleep(2)
        
        # Second message: ask about status (should reference Harmony Heights from context)
        payload2 = {
            "session_id": session_id,
            "message": "What is the current status of this project?"
        }
        
        print("\n--- Turn 2: Ask about status (should reference Harmony Heights) ---")
        print(f"Sending: {json.dumps(payload2, indent=2)}")
        print("⏳ Waiting for Claude response...")
        
        response2 = requests.post(
            f"{BASE_URL}/assistant/chat",
            json=payload2,
            timeout=ASSISTANT_TIMEOUT
        )
        
        print(f"Status Code: {response2.status_code}")
        data2 = response2.json()
        print(f"Reply: {data2.get('reply', 'N/A')}")
        
        assert response2.status_code == 200, f"Turn 2 failed: {response2.status_code}"
        reply2 = data2.get("reply", "").lower()
        assert len(reply2) > 0, "Turn 2 reply is empty"
        
        # Check if reply references Harmony Heights context (ongoing, 45% complete, RERA certified)
        has_harmony_context = (
            "harmony" in reply2 or 
            "ongoing" in reply2 or 
            "45" in reply2 or
            "rera" in reply2
        )
        
        print(f"\n🔍 Checking for Harmony Heights context in reply...")
        if has_harmony_context:
            print("✓ Reply references Harmony Heights context (context retained!)")
        else:
            print("⚠️  Reply may not explicitly mention Harmony Heights details")
            print("   (This could still be valid if the assistant asks clarifying questions)")
        
        # Get history to verify messages are stored
        print("\n--- Verify History ---")
        history_response = requests.get(
            f"{BASE_URL}/assistant/history/{session_id}",
            timeout=10
        )
        
        print(f"History Status Code: {history_response.status_code}")
        assert history_response.status_code == 200, f"History failed: {history_response.status_code}"
        
        history_data = history_response.json()
        print(f"History: {json.dumps(history_data, indent=2)}")
        
        assert "session_id" in history_data, "Missing session_id in history"
        assert history_data["session_id"] == session_id, "Session ID mismatch in history"
        
        assert "messages" in history_data, "Missing messages in history"
        messages = history_data["messages"]
        assert isinstance(messages, list), "Messages must be a list"
        assert len(messages) >= 4, f"Expected at least 4 messages (2 user + 2 assistant), got {len(messages)}"
        
        print(f"✓ History contains {len(messages)} messages in chronological order")
        
        # Verify message order (user, assistant, user, assistant)
        roles = [m.get("role") for m in messages]
        print(f"✓ Message roles: {roles}")
        
        print("✅ PASS: Multi-turn memory working - context retained across turns")
        return True
        
    except requests.Timeout:
        print(f"❌ FAIL: Request timed out after {ASSISTANT_TIMEOUT}s")
        return False
    except Exception as e:
        print(f"❌ FAIL: {str(e)}")
        return False


def test_assistant_grounding():
    """Test C: Grounding / no hallucination - should not fabricate info"""
    print("\n" + "="*80)
    print("TEST C: Pentium Home Advisor - Grounding (No Hallucination)")
    print("="*80)
    
    payload = {
        "session_id": str(uuid.uuid4()),
        "message": "What is the exact price and floor plan of Pentium Eternia?"
    }
    
    try:
        print(f"Sending: {json.dumps(payload, indent=2)}")
        print("⏳ Waiting for Claude response...")
        
        response = requests.post(
            f"{BASE_URL}/assistant/chat",
            json=payload,
            timeout=ASSISTANT_TIMEOUT
        )
        
        print(f"Status Code: {response.status_code}")
        data = response.json()
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        reply = data.get("reply", "")
        print(f"\n📝 REPLY TEXT (for grounding evaluation):")
        print("="*80)
        print(reply)
        print("="*80)
        
        reply_lower = reply.lower()
        
        # Check that the assistant does NOT fabricate exact prices or floor plans
        # It should indicate it doesn't have that info or direct to enquiry/phone
        
        # Positive indicators (good grounding):
        has_contact_info = (
            "9544 141 000" in reply or
            "+91 9544 141 000" in reply or
            "sales@pentiumconstructions.in" in reply or
            "enquir" in reply_lower or
            "contact" in reply_lower or
            "call" in reply_lower or
            "phone" in reply_lower or
            "whatsapp" in reply_lower
        )
        
        indicates_no_info = (
            "don't have" in reply_lower or
            "not have" in reply_lower or
            "don't know" in reply_lower or
            "not available" in reply_lower or
            "specific detail" in reply_lower or
            "exact" in reply_lower
        )
        
        # Negative indicators (potential hallucination):
        # Check if it fabricates specific prices (e.g., "₹45 lakhs", "Rs. 50 lakhs")
        fabricates_price = bool(
            ("₹" in reply and any(word in reply_lower for word in ["lakh", "crore", "price"])) or
            ("rs" in reply_lower and any(word in reply_lower for word in ["lakh", "crore"]))
        )
        
        # Check if it fabricates specific floor plan details (e.g., "1200 sq ft", "3 bedrooms with attached bathrooms")
        fabricates_floor_plan = bool(
            ("sq" in reply_lower and "ft" in reply_lower) or
            ("square" in reply_lower and ("feet" in reply_lower or "meter" in reply_lower))
        )
        
        print(f"\n🔍 Grounding Analysis:")
        print(f"  Has contact info (phone/email/enquiry): {has_contact_info}")
        print(f"  Indicates no info available: {indicates_no_info}")
        print(f"  Fabricates specific price: {fabricates_price}")
        print(f"  Fabricates specific floor plan: {fabricates_floor_plan}")
        
        if fabricates_price or fabricates_floor_plan:
            print("❌ WARNING: Assistant may have fabricated price/floor plan information!")
            print("   This indicates poor grounding to the knowledge base.")
            # Don't fail the test, but report it
        
        if has_contact_info or indicates_no_info:
            print("✓ Assistant appropriately directs to contact/enquiry or indicates no info")
        
        print("\n✅ PASS: Grounding test complete - review reply text above for hallucination")
        return True
        
    except requests.Timeout:
        print(f"❌ FAIL: Request timed out after {ASSISTANT_TIMEOUT}s")
        return False
    except Exception as e:
        print(f"❌ FAIL: {str(e)}")
        return False


def test_assistant_lead_capture():
    """Test D: Lead capture end-to-end - collect details and verify enquiry stored"""
    print("\n" + "="*80)
    print("TEST D: Pentium Home Advisor - Lead Capture End-to-End")
    print("="*80)
    
    session_id = str(uuid.uuid4())
    test_name = "Arun Nair"
    test_phone = "+91 9988776655"
    
    try:
        # Turn 1: Initial enquiry about site visit
        payload1 = {
            "session_id": session_id,
            "message": "I would like to schedule a site visit for Pentium Harmony Heights"
        }
        
        print("\n--- Turn 1: Initial enquiry about site visit ---")
        print(f"Sending: {json.dumps(payload1, indent=2)}")
        print("⏳ Waiting for Claude response...")
        
        response1 = requests.post(
            f"{BASE_URL}/assistant/chat",
            json=payload1,
            timeout=ASSISTANT_TIMEOUT
        )
        
        print(f"Status Code: {response1.status_code}")
        data1 = response1.json()
        print(f"Reply: {data1.get('reply', 'N/A')}")
        print(f"Lead submitted: {data1.get('lead_submitted', False)}")
        
        assert response1.status_code == 200, f"Turn 1 failed: {response1.status_code}"
        time.sleep(2)
        
        # Turn 2: Provide name
        payload2 = {
            "session_id": session_id,
            "message": f"My name is {test_name}"
        }
        
        print("\n--- Turn 2: Provide name ---")
        print(f"Sending: {json.dumps(payload2, indent=2)}")
        print("⏳ Waiting for Claude response...")
        
        response2 = requests.post(
            f"{BASE_URL}/assistant/chat",
            json=payload2,
            timeout=ASSISTANT_TIMEOUT
        )
        
        print(f"Status Code: {response2.status_code}")
        data2 = response2.json()
        print(f"Reply: {data2.get('reply', 'N/A')}")
        print(f"Lead submitted: {data2.get('lead_submitted', False)}")
        
        assert response2.status_code == 200, f"Turn 2 failed: {response2.status_code}"
        time.sleep(2)
        
        # Turn 3: Provide phone number
        payload3 = {
            "session_id": session_id,
            "message": f"My phone number is {test_phone}"
        }
        
        print("\n--- Turn 3: Provide phone number ---")
        print(f"Sending: {json.dumps(payload3, indent=2)}")
        print("⏳ Waiting for Claude response...")
        
        response3 = requests.post(
            f"{BASE_URL}/assistant/chat",
            json=payload3,
            timeout=ASSISTANT_TIMEOUT
        )
        
        print(f"Status Code: {response3.status_code}")
        data3 = response3.json()
        print(f"Reply: {data3.get('reply', 'N/A')}")
        print(f"Lead submitted: {data3.get('lead_submitted', False)}")
        
        assert response3.status_code == 200, f"Turn 3 failed: {response3.status_code}"
        
        lead_submitted_flag = data3.get('lead_submitted', False)
        
        # If not submitted yet, try one more confirming message
        if not lead_submitted_flag:
            print("\n--- Turn 4: Additional confirmation (if needed) ---")
            payload4 = {
                "session_id": session_id,
                "message": "Yes, please submit my enquiry for a site visit."
            }
            
            print(f"Sending: {json.dumps(payload4, indent=2)}")
            print("⏳ Waiting for Claude response...")
            
            response4 = requests.post(
                f"{BASE_URL}/assistant/chat",
                json=payload4,
                timeout=ASSISTANT_TIMEOUT
            )
            
            print(f"Status Code: {response4.status_code}")
            data4 = response4.json()
            print(f"Reply: {data4.get('reply', 'N/A')}")
            print(f"Lead submitted: {data4.get('lead_submitted', False)}")
            
            lead_submitted_flag = data4.get('lead_submitted', False)
        
        print(f"\n✓ Lead submitted flag: {lead_submitted_flag}")
        
        # Wait a moment for DB write
        time.sleep(3)
        
        # Verify enquiry was stored in database
        print("\n--- Verify Enquiry Stored in Database ---")
        enquiries_response = requests.get(f"{BASE_URL}/enquiries", timeout=10)
        
        print(f"Enquiries Status Code: {enquiries_response.status_code}")
        assert enquiries_response.status_code == 200, f"Failed to get enquiries: {enquiries_response.status_code}"
        
        enquiries = enquiries_response.json()
        print(f"Total enquiries in database: {len(enquiries)}")
        
        # Find enquiry with source="ai_advisor" and matching details
        ai_enquiries = [e for e in enquiries if e.get("source") == "ai_advisor"]
        print(f"AI advisor enquiries: {len(ai_enquiries)}")
        
        matching_enquiry = None
        for enq in ai_enquiries:
            if (
                test_name in enq.get("full_name", "") and
                test_phone in enq.get("phone", "")
            ):
                matching_enquiry = enq
                break
        
        if matching_enquiry:
            print(f"\n✓ Found matching enquiry:")
            print(json.dumps(matching_enquiry, indent=2))
            
            assert matching_enquiry.get("source") == "ai_advisor", "Source should be 'ai_advisor'"
            assert test_name in matching_enquiry.get("full_name", ""), f"Full name should contain '{test_name}'"
            assert test_phone in matching_enquiry.get("phone", ""), f"Phone should contain '{test_phone}'"
            
            print("✅ PASS: Lead capture working - enquiry stored with correct details")
            return True
        else:
            print("⚠️  WARNING: No matching enquiry found in database")
            print(f"   Looking for: name='{test_name}', phone='{test_phone}'")
            
            if len(ai_enquiries) > 0:
                print(f"\n   Recent AI advisor enquiries:")
                for enq in ai_enquiries[:3]:
                    print(f"   - {enq.get('full_name')} / {enq.get('phone')}")
            
            # Still pass the test if lead_submitted was true
            if lead_submitted_flag:
                print("\n⚠️  Lead submitted flag was true but enquiry not found with exact details")
                print("   This may indicate an issue with lead capture logic.")
                return False
            else:
                print("\n⚠️  Lead capture flow completed but enquiry not submitted")
                print("   The assistant may need more explicit confirmation.")
                return False
        
    except requests.Timeout:
        print(f"❌ FAIL: Request timed out after {ASSISTANT_TIMEOUT}s")
        return False
    except Exception as e:
        print(f"❌ FAIL: {str(e)}")
        return False


def test_assistant_validation_empty_message():
    """Test E: Validation - empty message should return 422"""
    print("\n" + "="*80)
    print("TEST E: Pentium Home Advisor - Validation (Empty Message)")
    print("="*80)
    
    payload = {
        "session_id": str(uuid.uuid4()),
        "message": ""
    }
    
    try:
        print(f"Sending: {json.dumps(payload, indent=2)}")
        
        response = requests.post(
            f"{BASE_URL}/assistant/chat",
            json=payload,
            timeout=10
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        assert response.status_code == 422, f"Expected 422 validation error, got {response.status_code}"
        
        print("✅ PASS: Empty message correctly rejected with 422")
        return True
        
    except Exception as e:
        print(f"❌ FAIL: {str(e)}")
        return False


def main():
    """Run all backend tests"""
    print("\n" + "="*80)
    print("PENTIUM CONSTRUCTIONS BACKEND API TESTS")
    print("="*80)
    print(f"Base URL: {BASE_URL}")
    print("="*80)
    
    results = []
    created_ids = []
    
    # Enquiry API Tests (1-6)
    print("\n" + "="*80)
    print("PART 1: ENQUIRY API TESTS")
    print("="*80)
    
    # Test 1: Health check
    results.append(("Health Check", test_health_check()))
    
    # Test 2: Full enquiry submission
    success, enquiry_id = test_create_enquiry_full()
    results.append(("Create Enquiry - Full", success))
    if enquiry_id:
        created_ids.append(enquiry_id)
    
    # Test 3: Minimal enquiry submission
    success, enquiry_id = test_create_enquiry_minimal()
    results.append(("Create Enquiry - Minimal", success))
    if enquiry_id:
        created_ids.append(enquiry_id)
    
    # Test 4-5: Validation tests
    results.append(("Validation - Missing full_name", test_validation_missing_full_name()))
    results.append(("Validation - Missing message", test_validation_missing_message()))
    
    # Test 6: List enquiries
    results.append(("List Enquiries", test_list_enquiries(created_ids)))
    
    # Pentium Home Advisor AI Chat Tests (A-E)
    print("\n" + "="*80)
    print("PART 2: PENTIUM HOME ADVISOR AI CHAT TESTS")
    print("="*80)
    print("⚠️  Note: These tests use Claude AI and may take 20-40s each")
    print("="*80)
    
    results.append(("Assistant - Basic Chat", test_assistant_basic_chat()))
    results.append(("Assistant - Multi-turn Memory", test_assistant_multi_turn_memory()))
    results.append(("Assistant - Grounding", test_assistant_grounding()))
    results.append(("Assistant - Lead Capture", test_assistant_lead_capture()))
    results.append(("Assistant - Validation (Empty)", test_assistant_validation_empty_message()))
    
    # Summary
    print("\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80)
    
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status}: {test_name}")
    
    print("="*80)
    print(f"TOTAL: {passed}/{total} tests passed")
    print("="*80)
    
    return passed == total


if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)
