#!/usr/bin/env python3
"""
Backend API tests for School of Play enquiry endpoints.
Tests: GET /api/ health check, POST /api/enquiries, GET /api/enquiries
"""
import requests
import json
import uuid
from datetime import datetime

# Base URL from frontend .env
BASE_URL = "https://b4c37749-8c7e-4e0e-924c-8c7fe67d8961.preview.emergentagent.com/api"

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
        assert data.get("message") == "School of Play API", f"Unexpected message: {data.get('message')}"
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
        "full_name": "Sarah Johnson",
        "email": "sarah.johnson@example.com",
        "phone": "+44 7700 900123",
        "audience": "Parent",
        "service": "Holiday Camps",
        "school_name_location": "Greenfield Primary, Manchester",
        "enquiry": "I would like to know more about your holiday camps for children aged 7-9. What are the available dates for summer 2026?",
        "mailing_list": True,
        "source": "holiday-camps-page"
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
        for key in ["full_name", "email", "phone", "audience", "service", "school_name_location", "enquiry", "mailing_list", "source"]:
            assert data.get(key) == payload[key], f"Field {key} mismatch: expected {payload[key]}, got {data.get(key)}"
        print("✓ All fields echoed correctly")
        
        print("✅ PASS: Full enquiry submission successful")
        return True, data["id"]
    except Exception as e:
        print(f"❌ FAIL: {str(e)}")
        return False, None


def test_create_enquiry_minimal():
    """Test POST /api/enquiries with only required fields"""
    print("\n" + "="*80)
    print("TEST 3: Create Enquiry - Minimal Submission (POST /api/enquiries)")
    print("="*80)
    
    payload = {
        "full_name": "Michael Brown",
        "email": "michael.brown@example.com",
        "enquiry": "Please send me information about your sports provision services."
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
        assert data["email"] == payload["email"]
        assert data["enquiry"] == payload["enquiry"]
        
        # Verify defaults
        assert data["mailing_list"] == False, f"Expected mailing_list=False, got {data['mailing_list']}"
        print("✓ Default mailing_list=False applied")
        
        print("✅ PASS: Minimal enquiry submission successful with defaults")
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
        "email": "test@example.com",
        "enquiry": "Test enquiry"
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


def test_validation_missing_email():
    """Test POST /api/enquiries validation - missing email"""
    print("\n" + "="*80)
    print("TEST 5: Validation - Missing email (POST /api/enquiries)")
    print("="*80)
    
    payload = {
        "full_name": "Test User",
        "enquiry": "Test enquiry"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/enquiries", json=payload)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        assert response.status_code == 422, f"Expected 422 validation error, got {response.status_code}"
        print("✅ PASS: Missing email correctly rejected with 422")
        return True
    except Exception as e:
        print(f"❌ FAIL: {str(e)}")
        return False


def test_validation_missing_enquiry():
    """Test POST /api/enquiries validation - missing enquiry"""
    print("\n" + "="*80)
    print("TEST 6: Validation - Missing enquiry (POST /api/enquiries)")
    print("="*80)
    
    payload = {
        "full_name": "Test User",
        "email": "test@example.com"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/enquiries", json=payload)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        assert response.status_code == 422, f"Expected 422 validation error, got {response.status_code}"
        print("✅ PASS: Missing enquiry correctly rejected with 422")
        return True
    except Exception as e:
        print(f"❌ FAIL: {str(e)}")
        return False


def test_validation_invalid_email():
    """Test POST /api/enquiries validation - invalid email format"""
    print("\n" + "="*80)
    print("TEST 7: Validation - Invalid email format (POST /api/enquiries)")
    print("="*80)
    
    payload = {
        "full_name": "Test User",
        "email": "not-an-email",
        "enquiry": "Test enquiry"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/enquiries", json=payload)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        assert response.status_code == 422, f"Expected 422 validation error, got {response.status_code}"
        print("✅ PASS: Invalid email correctly rejected with 422")
        return True
    except Exception as e:
        print(f"❌ FAIL: {str(e)}")
        return False


def test_list_enquiries(created_ids):
    """Test GET /api/enquiries - list all enquiries"""
    print("\n" + "="*80)
    print("TEST 8: List Enquiries (GET /api/enquiries)")
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


def main():
    """Run all backend tests"""
    print("\n" + "="*80)
    print("SCHOOL OF PLAY BACKEND API TESTS")
    print("="*80)
    print(f"Base URL: {BASE_URL}")
    print("="*80)
    
    results = []
    created_ids = []
    
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
    
    # Test 4-7: Validation tests
    results.append(("Validation - Missing full_name", test_validation_missing_full_name()))
    results.append(("Validation - Missing email", test_validation_missing_email()))
    results.append(("Validation - Missing enquiry", test_validation_missing_enquiry()))
    results.append(("Validation - Invalid email", test_validation_invalid_email()))
    
    # Test 8: List enquiries
    results.append(("List Enquiries", test_list_enquiries(created_ids)))
    
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
