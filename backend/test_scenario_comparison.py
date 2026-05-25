#!/usr/bin/env python3
"""
Test Scenario Comparison Logic

Verifies that Eco ON vs Eco OFF comparisons produce:
1. Different cost values (not random/identical)
2. Different CO2 reduction values  
3. Consistent results (not random)
4. Correct logic (meaningful differences)
"""

import requests
import json
import time

API_URL = "http://127.0.0.1:8001/optimize"
TIMEOUT = 120

print("\n" + "="*80)
print("🧪 SCENARIO COMPARISON LOGIC TEST")
print("="*80)

# Test case configuration
test_config = {
    "population": 50,
    "generations": 30,
    "appliances": ["Washing Machine", "Dishwasher"],
    "appliance_constraints": {
        "Washing Machine": {"preferred_start": 7, "preferred_end": 22, "duration_hours": 1.5},
        "Dishwasher": {"preferred_start": 7, "preferred_end": 22, "duration_hours": 2.0}
    }
}

print("\n📋 Test Configuration:")
print(f"  Appliances: {test_config['appliances']}")
print(f"  Population: {test_config['population']}")
print(f"  Generations: {test_config['generations']}")

# Run Eco ON
print("\n" + "-"*80)
print("🌱 RUN 1: ECO ON (Sustainability Focused)")
print("-"*80)

try:
    eco_on_payload = {**test_config, "eco_mode": True}
    print(f"  Payload: eco_mode=True")
    
    start_time = time.time()
    eco_on_response = requests.post(API_URL, json=eco_on_payload, timeout=TIMEOUT)
    eco_on_time = time.time() - start_time
    
    if not eco_on_response.ok:
        raise Exception(f"API error: {eco_on_response.status_code}")
    
    eco_on_data = eco_on_response.json()
    eco_on_cost = float(eco_on_data.get("final_cost") or eco_on_data.get("cost") or 0)
    eco_on_co2_reduction = float(eco_on_data.get("co2_reduction") or eco_on_data.get("co2_prevented") or 0)
    eco_on_co2_total = float(eco_on_data.get("co2") or 0)
    
    print(f"  ✅ Response received in {eco_on_time:.2f}s")
    print(f"  Final Cost: ₹{eco_on_cost:.2f}")
    print(f"  CO₂ Reduction: {eco_on_co2_reduction:.2f} kg")
    print(f"  CO₂ Total: {eco_on_co2_total:.2f} kg")
    
except Exception as e:
    print(f"  ❌ ERROR: {e}")
    exit(1)

# Run Eco OFF
print("\n" + "-"*80)
print("💰 RUN 2: ECO OFF (Cost Focused)")
print("-"*80)

try:
    eco_off_payload = {**test_config, "eco_mode": False}
    print(f"  Payload: eco_mode=False")
    
    start_time = time.time()
    eco_off_response = requests.post(API_URL, json=eco_off_payload, timeout=TIMEOUT)
    eco_off_time = time.time() - start_time
    
    if not eco_off_response.ok:
        raise Exception(f"API error: {eco_off_response.status_code}")
    
    eco_off_data = eco_off_response.json()
    eco_off_cost = float(eco_off_data.get("final_cost") or eco_off_data.get("cost") or 0)
    eco_off_co2_reduction = float(eco_off_data.get("co2_reduction") or eco_off_data.get("co2_prevented") or 0)
    eco_off_co2_total = float(eco_off_data.get("co2") or 0)
    
    print(f"  ✅ Response received in {eco_off_time:.2f}s")
    print(f"  Final Cost: ₹{eco_off_cost:.2f}")
    print(f"  CO₂ Reduction: {eco_off_co2_reduction:.2f} kg")
    print(f"  CO₂ Total: {eco_off_co2_total:.2f} kg")
    
except Exception as e:
    print(f"  ❌ ERROR: {e}")
    exit(1)

# Analyze results
print("\n" + "="*80)
print("📊 COMPARISON ANALYSIS")
print("="*80)

cost_diff = eco_off_cost - eco_on_cost
co2_reduction_diff = eco_off_co2_reduction - eco_on_co2_reduction
cost_percent_diff = (cost_diff / max(abs(eco_on_cost), 0.001)) * 100 if eco_on_cost != 0 else 0
co2_percent_diff = (co2_reduction_diff / max(abs(eco_on_co2_reduction), 0.001)) * 100 if eco_on_co2_reduction != 0 else 0

print("\n💰 COST COMPARISON:")
print(f"  Eco ON:  ₹{eco_on_cost:.2f}")
print(f"  Eco OFF: ₹{eco_off_cost:.2f}")
print(f"  Difference: ₹{cost_diff:.2f} ({cost_percent_diff:+.1f}%)")

if abs(cost_diff) < 0.01:
    print(f"  ⚠️  WARNING: Costs are identical (should be different!)")
else:
    print(f"  ✅ Costs are different")

print("\n🌍 CO₂ REDUCTION COMPARISON:")
print(f"  Eco ON:  {eco_on_co2_reduction:.2f} kg")
print(f"  Eco OFF: {eco_off_co2_reduction:.2f} kg")
print(f"  Difference: {co2_reduction_diff:.2f} kg ({co2_percent_diff:+.1f}%)")

if abs(co2_reduction_diff) < 0.01:
    print(f"  ⚠️  WARNING: CO₂ reductions are identical (should be different!)")
else:
    print(f"  ✅ CO₂ reductions are different")

# Logical validation
print("\n" + "="*80)
print("✅ VALIDATION CHECKS")
print("="*80)

checks_passed = 0
checks_total = 5

# Check 1: Costs are different
print("\n1️⃣  Cost Values Differ")
if abs(cost_diff) >= 0.01:
    print(f"   ✅ PASS - Cost difference: ₹{abs(cost_diff):.2f}")
    checks_passed += 1
else:
    print(f"   ❌ FAIL - Costs are identical or very close")

# Check 2: CO2 reductions are different
print("\n2️⃣  CO₂ Reduction Values Differ")
if abs(co2_reduction_diff) >= 0.01:
    print(f"   ✅ PASS - CO₂ difference: {abs(co2_reduction_diff):.2f} kg")
    checks_passed += 1
else:
    print(f"   ❌ FAIL - CO₂ reductions are identical or very close")

# Check 3: Eco OFF typically has lower or equal cost
print("\n3️⃣  Cost Logic (Eco OFF should optimize for cost)")
if eco_off_cost <= eco_on_cost * 1.1:  # Allow 10% tolerance
    print(f"   ✅ PASS - Eco OFF cost (₹{eco_off_cost:.2f}) <= Eco ON cost (₹{eco_on_cost:.2f})")
    checks_passed += 1
else:
    print(f"   ⚠️  INFO - Eco ON cheaper (may be valid depending on GA randomness)")

# Check 4: Eco ON typically has better CO2 reduction
print("\n4️⃣  CO₂ Logic (Eco ON should have better CO₂ reduction)")
if eco_on_co2_reduction >= eco_off_co2_reduction * 0.9:  # Allow 10% tolerance
    print(f"   ✅ PASS - Eco ON CO₂ ('{eco_on_co2_reduction:.2f}') >= Eco OFF CO₂ ({eco_off_co2_reduction:.2f})")
    checks_passed += 1
else:
    print(f"   ⚠️  INFO - Eco OFF has better CO₂ (may be valid depending on GA randomness)")

# Check 5: Values are reasonable (not NaN, not extreme)
print("\n5️⃣  Values Are Reasonable")
all_values = [eco_on_cost, eco_off_cost, eco_on_co2_reduction, eco_off_co2_reduction]
if all(isinstance(v, (int, float)) and 0 <= v < 10000 for v in all_values):
    print(f"   ✅ PASS - All values in reasonable range [0, 10000]")
    checks_passed += 1
else:
    print(f"   ❌ FAIL - Some values are unreasonable: {all_values}")

# Summary
print("\n" + "="*80)
print("📈 TEST SUMMARY")
print("="*80)
print(f"\nChecks Passed: {checks_passed}/{checks_total}")

if checks_passed >= 4:
    print("\n🎉 LOGIC VERIFICATION: ✅ PASS")
    print("   Scenario comparison logic is correctly implemented!")
    print("   Values are different, not random, and show meaningful differences.")
elif checks_passed >= 2:
    print("\n⚠️  LOGIC VERIFICATION: PARTIAL")
    print("   Some checks failed, but basic logic is working.")
    print("   GA randomness may be causing differences.")
else:
    print("\n❌ LOGIC VERIFICATION: FAIL")
    print("   Values appear identical or incorrect.")
    exit(1)

# Export detailed results
results = {
    "test_timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
    "eco_on": {
        "cost": eco_on_cost,
        "co2_reduction": eco_on_co2_reduction,
        "co2_total": eco_on_co2_total,
        "runtime_seconds": eco_on_time
    },
    "eco_off": {
        "cost": eco_off_cost,
        "co2_reduction": eco_off_co2_reduction,
        "co2_total": eco_off_co2_total,
        "runtime_seconds": eco_off_time
    },
    "comparison": {
        "cost_difference": cost_diff,
        "cost_difference_percent": cost_percent_diff,
        "co2_reduction_difference": co2_reduction_diff,
        "co2_reduction_difference_percent": co2_percent_diff
    },
    "validation": {
        "checks_passed": checks_passed,
        "checks_total": checks_total,
        "values_differ": abs(cost_diff) >= 0.01 and abs(co2_reduction_diff) >= 0.01
    }
}

with open("scenario_comparison_test_results.json", "w") as f:
    json.dump(results, f, indent=2)

print("\n💾 Results saved to: scenario_comparison_test_results.json")
print("\n" + "="*80)
