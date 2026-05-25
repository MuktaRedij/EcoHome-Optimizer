#!/usr/bin/env python3
"""
System Validation Suite for Fuzzy Logic + Genetic Algorithm Energy Optimization

Tests:
1. Fuzzy Logic sensitivity to different household sizes
2. Genetic Algorithm optimization effectiveness
3. Schedule differentiation based on load
4. Peak reduction and cost efficiency

Creates: validation_results.json with detailed results
"""

import requests
import json
import sys
from typing import Dict, Any, Tuple

# ============================================================================
# CONFIGURATION
# ============================================================================

API_URL = "http://127.0.0.1:8001"
API_ENDPOINT = f"{API_URL}/optimize"
TIMEOUT = 120  # seconds for API response

# Test Cases
TEST_CASES = {
    "Case A (Low Load)": {
        "family_size": 1,
        "appliances": ["Fan"],
        "flexibility": 0.9,
        "generations": 30,
        "population": 30,
        "eco_mode": True
    },
    "Case B (High Load)": {
        "family_size": 5,
        "appliances": ["Washing Machine", "Dishwasher", "Heater"],
        "flexibility": 0.2,
        "generations": 30,
        "population": 30,
        "eco_mode": False
    }
}

# ============================================================================
# HELPER FUNCTIONS
# ============================================================================

def call_api(test_case_config: Dict[str, Any]) -> Dict[str, Any]:
    """Call the /optimize API endpoint and return response."""
    print(f"\n  📡 Calling API: {API_ENDPOINT}")
    print(f"     Timeout: {TIMEOUT}s")
    
    try:
        response = requests.post(
            API_ENDPOINT,
            json=test_case_config,
            timeout=TIMEOUT
        )
        
        if response.status_code != 200:
            print(f"  ❌ API Error: Status {response.status_code}")
            print(f"     Response: {response.text}")
            return None
        
        return response.json()
    
    except requests.exceptions.Timeout:
        print(f"  ❌ API Timeout: No response within {TIMEOUT}s")
        return None
    except requests.exceptions.ConnectionError:
        print(f"  ❌ Connection Error: Cannot reach {API_URL}")
        print(f"     Ensure backend is running on {API_URL}")
        return None
    except Exception as e:
        print(f"  ❌ Unexpected Error: {type(e).__name__}: {e}")
        return None


def extract_metrics(response: Dict[str, Any]) -> Dict[str, Any]:
    """Extract important metrics from API response."""
    try:
        metrics = {
            "predicted_load": response.get("predicted_load", 0),
            "predicted_peak_load": response.get("predicted_peak_load", 0),
            "initial_cost": response.get("initial_cost", 0),
            "final_cost": response.get("final_cost", 0),
            "energy_saved_percent": response.get("energy_saved", 0),
            "co2_reduction": response.get("co2_reduction", 0),
            "co2_reduction_percent": response.get("co2_reduction_percent", 0),
            "peak_usage_reduction": response.get("peak_usage_reduction", 0),
            "fuzzy_alignment_score": response.get("fuzzy_alignment_score", 0),
            "generations": response.get("generations", 0),
            "schedule": response.get("schedule", {}),
        }
        return metrics
    except Exception as e:
        print(f"  ⚠️  Error extracting metrics: {e}")
        return None


def calculate_efficiency(metrics: Dict[str, Any]) -> float:
    """Calculate optimization efficiency percentage."""
    if metrics["initial_cost"] <= 0:
        return 0.0
    efficiency = ((metrics["initial_cost"] - metrics["final_cost"]) / 
                  metrics["initial_cost"] * 100)
    return max(0.0, efficiency)


def validate_results(case_a: Dict[str, Any], case_b: Dict[str, Any]) -> Dict[str, bool]:
    """Perform critical validation checks."""
    
    checks = {}
    
    # Check 1: Fuzzy sensitivity
    print("\n  ✓ Validation Check 1: Fuzzy Logic Sensitivity")
    print(f"    Case A predicted_load: {case_a['predicted_load']:.3f}")
    print(f"    Case B predicted_load: {case_b['predicted_load']:.3f}")
    check1 = case_b["predicted_load"] > case_a["predicted_load"]
    checks["Fuzzy Sensitivity"] = check1
    print(f"    Result: {'✅ PASS' if check1 else '❌ FAIL'} - Higher load → Higher prediction")
    
    # Check 2: Peak behavior
    print("\n  ✓ Validation Check 2: Peak Load Behavior")
    print(f"    Case A predicted_peak: {case_a['predicted_peak_load']:.3f} kW")
    print(f"    Case B predicted_peak: {case_b['predicted_peak_load']:.3f} kW")
    check2 = case_b["predicted_peak_load"] >= case_a["predicted_peak_load"]
    checks["Peak Behavior"] = check2
    print(f"    Result: {'✅ PASS' if check2 else '❌ FAIL'} - Higher household → Higher/equal peak")
    
    # Check 3: Optimization works
    print("\n  ✓ Validation Check 3: GA Optimization")
    print(f"    Case A: {case_a['initial_cost']:.2f} → {case_a['final_cost']:.2f} "
          f"(saved {case_a['final_cost'] - case_a['initial_cost']:.2f})")
    print(f"    Case B: {case_b['initial_cost']:.2f} → {case_b['final_cost']:.2f} "
          f"(saved {case_b['final_cost'] - case_b['initial_cost']:.2f})")
    check3a = case_a["final_cost"] < case_a["initial_cost"]
    check3b = case_b["final_cost"] < case_b["initial_cost"]
    check3 = check3a and check3b
    checks["GA Optimization"] = check3
    print(f"    Result: {'✅ PASS' if check3 else '❌ FAIL'} - Both cases reduce cost")
    
    # Check 4: High load gives stronger optimization
    print("\n  ✓ Validation Check 4: Load-Driven Optimization")
    efficiency_a = calculate_efficiency(case_a)
    efficiency_b = calculate_efficiency(case_b)
    print(f"    Case A efficiency: {efficiency_a:.2f}%")
    print(f"    Case B efficiency: {efficiency_b:.2f}%")
    check4 = efficiency_b >= efficiency_a * 0.8  # Allow some variance
    checks["Load-Driven Optimization"] = check4
    print(f"    Result: {'✅ PASS' if check4 else '❌ FAIL'} - Higher load optimization comparable or better")
    
    # Check 5: Schedule difference
    print("\n  ✓ Validation Check 5: Schedule Differentiation")
    print(f"    Case A schedule: {case_a['schedule']}")
    print(f"    Case B schedule: {case_b['schedule']}")
    check5 = case_a["schedule"] != case_b["schedule"]
    checks["Schedule Differentiation"] = check5
    print(f"    Result: {'✅ PASS' if check5 else '❌ FAIL'} - Different loads → Different schedules")
    
    return checks


# ============================================================================
# MAIN VALIDATION FLOW
# ============================================================================

def main():
    """Run complete system validation."""
    
    print("\n" + "="*80)
    print("🧪 FUZZY LOGIC + GENETIC ALGORITHM SYSTEM VALIDATION")
    print("="*80)
    
    print("\n📋 Test Configuration:")
    print(f"   API Endpoint: {API_ENDPOINT}")
    print(f"   Test Cases: {len(TEST_CASES)}")
    print(f"   Timeout: {TIMEOUT}s")
    
    # ========================================================================
    # RUN TESTS
    # ========================================================================
    
    results = {}
    
    for case_name, case_config in TEST_CASES.items():
        print(f"\n{'='*80}")
        print(f"Running: {case_name}")
        print(f"{'='*80}")
        
        print(f"\n  📝 Input Configuration:")
        print(f"     Family Size: {case_config.get('family_size')}")
        print(f"     Appliances: {case_config.get('appliances')}")
        print(f"     Flexibility: {case_config.get('flexibility')}")
        print(f"     Generations: {case_config.get('generations')}")
        
        # Call API
        response = call_api(case_config)
        if response is None:
            print(f"\n  ❌ {case_name} FAILED - Could not get API response")
            results[case_name] = {"status": "FAILED", "error": "API call failed"}
            continue
        
        # Extract metrics
        metrics = extract_metrics(response)
        if metrics is None:
            print(f"\n  ❌ {case_name} FAILED - Could not extract metrics")
            results[case_name] = {"status": "FAILED", "error": "Metric extraction failed"}
            continue
        
        # Calculate efficiency
        efficiency = calculate_efficiency(metrics)
        metrics["optimization_efficiency"] = efficiency
        
        results[case_name] = {
            "status": "SUCCESS",
            "metrics": metrics,
            "config": case_config
        }
        
        print(f"\n  ✅ {case_name} COMPLETE - Metrics extracted successfully")
    
    # ========================================================================
    # VALIDATION CHECKS
    # ========================================================================
    
    print(f"\n{'='*80}")
    print("🔍 VALIDATION CHECKS")
    print(f"{'='*80}")
    
    if all(r["status"] == "SUCCESS" for r in results.values()):
        case_a_metrics = results[list(results.keys())[0]]["metrics"]
        case_b_metrics = results[list(results.keys())[1]]["metrics"]
        
        checks = validate_results(case_a_metrics, case_b_metrics)
        
        # Store checks in results
        for case_name in results:
            if results[case_name]["status"] == "SUCCESS":
                results[case_name]["validation_checks"] = checks
    else:
        print("\n  ⚠️  Cannot run validation checks - one or more test cases failed")
    
    # ========================================================================
    # RESULTS REPORT
    # ========================================================================
    
    print(f"\n{'='*80}")
    print("📊 TEST RESULTS REPORT")
    print(f"{'='*80}\n")
    
    case_names = list(results.keys())
    
    for case_name in case_names:
        result = results[case_name]
        
        print(f"\n{case_name}:")
        print("-" * 40)
        
        if result["status"] == "FAILED":
            print(f"  Status: ❌ FAILED")
            print(f"  Error: {result.get('error', 'Unknown error')}")
            continue
        
        metrics = result["metrics"]
        efficiency = metrics["optimization_efficiency"]
        
        print(f"  Status: ✅ SUCCESS")
        print(f"\n  Fuzzy Logic Metrics:")
        print(f"    • Predicted Load: {metrics['predicted_load']:.3f}")
        print(f"    • Predicted Peak: {metrics['predicted_peak_load']:.3f} kW")
        print(f"    • Fuzzy Alignment Score: {metrics['fuzzy_alignment_score']:.3f}")
        
        print(f"\n  Cost Optimization:")
        print(f"    • Initial Cost: ${metrics['initial_cost']:.2f}")
        print(f"    • Final Cost: ${metrics['final_cost']:.2f}")
        print(f"    • Savings: ${metrics['initial_cost'] - metrics['final_cost']:.2f}")
        print(f"    • Efficiency: {efficiency:.2f}%")
        
        print(f"\n  Environmental Impact:")
        print(f"    • CO₂ Reduction: {metrics['co2_reduction']:.3f} kg")
        print(f"    • CO₂ Reduction %: {metrics['co2_reduction_percent']:.2f}%")
        print(f"    • Peak Usage Reduction: {metrics['peak_usage_reduction']:.2f}%")
        
        print(f"\n  GA Performance:")
        print(f"    • Generations Run: {metrics['generations']}")
        print(f"    • Energy Saved: {metrics['energy_saved_percent']:.2f}%")
    
    # ========================================================================
    # VALIDATION SUMMARY
    # ========================================================================
    
    if all(r["status"] == "SUCCESS" for r in results.values()):
        print(f"\n{'='*80}")
        print("✅ VALIDATION CHECKS SUMMARY")
        print(f"{'='*80}\n")
        
        checks = results[case_names[0]].get("validation_checks", {})
        
        passed = sum(1 for v in checks.values() if v)
        total = len(checks)
        
        for check_name, passed_flag in checks.items():
            status = "✅ PASS" if passed_flag else "❌ FAIL"
            print(f"  {status} - {check_name}")
        
        print(f"\n  Result: {passed}/{total} checks passed")
        
        if passed == total:
            print("\n  🎉 OVERALL SYSTEM: STRONG ✨")
        elif passed >= total * 0.8:
            print("\n  ⚠️  OVERALL SYSTEM: MODERATE (Some checks failed)")
        else:
            print("\n  ❌ OVERALL SYSTEM: WEAK (Critical issues detected)")
    
    # ========================================================================
    # SAVE RESULTS
    # ========================================================================
    
    print(f"\n{'='*80}")
    print("💾 SAVING RESULTS")
    print(f"{'='*80}\n")
    
    output_file = "validation_results.json"
    
    try:
        # Convert for JSON serialization
        json_results = {}
        for case_name, result in results.items():
            if result["status"] == "SUCCESS":
                json_results[case_name] = {
                    "status": result["status"],
                    "metrics": result["metrics"],
                    "validation_checks": result.get("validation_checks", {})
                }
            else:
                json_results[case_name] = result
        
        with open(output_file, "w") as f:
            json.dump(json_results, f, indent=2)
        
        print(f"  ✅ Results saved to: {output_file}")
    
    except Exception as e:
        print(f"  ❌ Error saving results: {e}")
    
    # ========================================================================
    # FINAL STATUS
    # ========================================================================
    
    print(f"\n{'='*80}")
    print("✅ VALIDATION SUITE COMPLETE")
    print(f"{'='*80}\n")
    
    success_count = sum(1 for r in results.values() if r["status"] == "SUCCESS")
    print(f"Results: {success_count}/{len(results)} test cases successful")
    
    if success_count == len(results):
        print("Status: ✅ All tests completed successfully")
        return 0
    else:
        print("Status: ⚠️  Some tests failed - check output above")
        return 1


if __name__ == "__main__":
    try:
        exit_code = main()
        sys.exit(exit_code)
    except KeyboardInterrupt:
        print("\n\n⚠️  Validation interrupted by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ Unexpected error: {e}")
        sys.exit(1)
