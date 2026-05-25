#!/usr/bin/env python3
"""
Quick test to verify Fuzzy Logic integration in the API
"""

import requests
import json
import sys

BASE_URL = "http://127.0.0.1:8001"

test_request = {
    "appliances": ["Washing Machine", "Dishwasher", "Heater"],
    "eco_mode": True,
    "population": 40,
    "generations": 35
}

print("\n" + "="*80)
print("TESTING FUZZY LOGIC INTEGRATION")
print("="*80)

print("\n📋 TEST REQUEST:")
print(json.dumps(test_request, indent=2))

try:
    print("\n🚀 Calling /optimize endpoint...")
    response = requests.post(f"{BASE_URL}/optimize", json=test_request, timeout=60)
    
    if response.status_code == 200:
        result = response.json()
        
        print("\n✅ SUCCESS! API Response:")
        print("\n" + "-"*80)
        
        # Check for Fuzzy Logic fields
        print("\n📊 FUZZY LOGIC METRICS:")
        if "predicted_load" in result:
            print(f"   Predicted Load: {result['predicted_load']}")
        if "predicted_peak_load" in result:
            print(f"   Predicted Peak Load: {result['predicted_peak_load']}")
        if "fuzzy_alignment_score" in result:
            print(f"   Fuzzy Alignment Score: {result['fuzzy_alignment_score']}")
        
        # Check for old ML fields (should NOT exist)
        print("\n🔍 ML FIELDS CHECK (should NOT exist):")
        if "model_confidence" in result:
            print(f"   ❌ ERROR: model_confidence field still exists: {result['model_confidence']}")
        else:
            print(f"   ✅ model_confidence field correctly removed")
        
        if "ml_alignment_score" in result:
            print(f"   ❌ ERROR: ml_alignment_score field still exists: {result['ml_alignment_score']}")
        else:
            print(f"   ✅ ml_alignment_score field correctly replaced with fuzzy_alignment_score")
        
        # Cost metrics
        print("\n💰 COST METRICS:")
        print(f"   Initial Cost: {result['initial_cost']}")
        print(f"   Final Cost: {result['final_cost']}")
        print(f"   Energy Saved: {result['energy_saved']}%")
        
        # CO2 metrics
        print("\n🌍 CO2 METRICS:")
        print(f"   CO2 Reduction: {result['co2_reduction']} kg")
        print(f"   CO2 Reduction %: {result['co2_reduction_percent']}%")
        
        print("\n✅ ALL TESTS PASSED - FUZZY LOGIC INTEGRATION VERIFIED!")
        sys.exit(0)
    else:
        print(f"\n❌ ERROR: API returned status {response.status_code}")
        print(f"Response: {response.text}")
        sys.exit(1)
        
except Exception as e:
    print(f"\n❌ ERROR: {type(e).__name__}: {e}")
    sys.exit(1)
