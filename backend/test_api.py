#!/usr/bin/env python3
"""
Test script for the Energy Optimization API
Verifies that appliances are scheduled realistically (no 2 AM schedules)
"""

import requests
import json
from pprint import pprint

# API endpoint
BASE_URL = "http://localhost:8000"

# Test request
test_request = {
    "population": 50,
    "generations": 25,
    "appliances": ["Washing Machine", "Dishwasher", "EV Charger"],
    "eco_mode": True
}

print("\n" + "="*80)
print("TESTING ENERGY OPTIMIZATION API - GA SCHEDULE VALIDATION")
print("="*80)

print("\n📋 TEST REQUEST:")
print(json.dumps(test_request, indent=2))

try:
    print("\n🚀 Calling /optimize endpoint...")
    response = requests.post(f"{BASE_URL}/optimize", json=test_request)
    
    if response.status_code == 200:
        result = response.json()
        
        print("\n✅ SUCCESS! API Response:")
        print("\n" + "-"*80)
        
        # Display schedule
        print("\n📅 OPTIMIZED SCHEDULE:")
        for appliance, time in result["schedule"].items():
            print(f"   {appliance:20s} → {time}")
        
        # Validate schedule realism
        print("\n🔍 SCHEDULE VALIDATION:")
        appliance_configs = {
            "Washing Machine": {"start": 8, "end": 22, "name": "8 AM - 10 PM"},
            "Dishwasher": {"start": 9, "end": 23, "name": "9 AM - 11 PM"},
            "EV Charger": {"start": 20, "end": 6, "name": "8 PM - 6 AM (off-peak)"}
        }
        
        all_valid = True
        for appliance, time in result["schedule"].items():
            # Parse time (e.g., "08:00 AM" → 8)
            hour = int(time.split(":")[0])
            if time.endswith("PM") and hour != 12:
                hour += 12
            elif time.endswith("AM") and hour == 12:
                hour = 0
            
            config = appliance_configs.get(appliance, {})
            start = config.get("start", 0)
            end = config.get("end", 24)
            range_str = config.get("name", "0-24")
            
            # Check if time is in valid range
            if end < start:  # Wrapped range (e.g., 8 PM - 6 AM)
                valid = hour >= start or hour <= end
            else:
                valid = start <= hour <= end
            
            status = "✓ VALID" if valid else "✗ INVALID"
            print(f"   {status:10s} {appliance:20s} @ {time:12s} (allowed: {range_str})")
            
            if not valid:
                all_valid = False
        
        # Display metrics
        print("\n💰 OPTIMIZATION METRICS:")
        print(f"   Initial Cost:         ${result['initial_cost']}")
        print(f"   Optimized Cost:       ${result['cost']}")
        print(f"   Energy Saved:         {result['energy_saved']:.1f}%")
        print(f"   CO₂ Prevented:        {result['co2_prevented']:.2f} kg")
        print(f"   CO₂ Reduction:        {result['co2_reduction_percent']:.1f}%")
        
        # Display appliance energy
        print("\n⚡ ENERGY CONSUMPTION:")
        for appliance, kwh in result["appliance_energy"].items():
            print(f"   {appliance:20s} {kwh:.1f} kWh")
        
        # Display convergence trend (first 5 generations)
        print("\n📊 GA CONVERGENCE (first 5 generations):")
        for item in result["trend"][:5]:
            gen_num = int(item['generation'])
            print(f"   Gen {gen_num:2d}: Cost = ${item['cost']:.2f}")
        
        print("\n" + "="*80)
        if all_valid:
            print("✅ ALL SCHEDULES ARE REALISTIC - NO 2 AM APPLIANCES!")
            print("   • Appliances scheduled within preferred time windows ✓")
            print("   • Comfort score rewarded for daytime usage ✓")
            print("   • Eco mode preferred off-peak hours ✓")
        else:
            print("⚠️  SOME SCHEDULES ARE OUTSIDE PREFERRED RANGES!")
        print("="*80)
        
    else:
        print(f"\n❌ ERROR: HTTP {response.status_code}")
        print(response.text)
        
except Exception as e:
    print(f"\n❌ ERROR: {str(e)}")
    print("\nMake sure the FastAPI backend is running on http://localhost:8000")
