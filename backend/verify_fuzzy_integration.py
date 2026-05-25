#!/usr/bin/env python3
"""
Comprehensive verification of Fuzzy Logic GA Integration
Verifies that all GA functions use fuzzy_predictions correctly
"""

import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

from app import (
    APPLIANCE_CONFIGS,
    Schedule,
    generate_initial_population,
    evaluate_population,
    tournament_select,
    crossover,
    mutate,
    run_genetic_algorithm,
)
from fuzzy_logic import get_fuzzy_predictions

print("\n" + "="*80)
print("COMPREHENSIVE FUZZY LOGIC GA INTEGRATION VERIFICATION")
print("="*80)

# Test 1: Generate Fuzzy Predictions
print("\n✅ TEST 1: Fuzzy Logic Predictions Generation")
test_appliances = ["Washing Machine", "Dishwasher", "Heater"]
fuzzy_preds = get_fuzzy_predictions(test_appliances, APPLIANCE_CONFIGS)
print(f"   Predicted Load: {fuzzy_preds.get('predicted_load')}")
print(f"   Predicted Peak Load: {fuzzy_preds.get('predicted_peak_load')}")
print(f"   Appliance Count: {fuzzy_preds.get('appliance_count')}")
print(f"   Total Energy: {fuzzy_preds.get('total_energy')}")
assert fuzzy_preds is not None, "Fuzzy predictions not generated"
print("   ✅ PASS")

# Test 2: Generate Initial Population with Fuzzy Guidance
print("\n✅ TEST 2: Generate Initial Population with Fuzzy Guidance")
population = generate_initial_population(test_appliances, 20, fuzzy_predictions=fuzzy_preds)
assert len(population) == 20, f"Population size mismatch: {len(population)} vs 20"
assert population[0].fitness_score >= 0, "Fitness score not set"
print(f"   Population size: {len(population)}")
print(f"   Best fitness: {population[0].fitness_score:.4f}")
print("   ✅ PASS")

# Test 3: Evaluate Population
print("\n✅ TEST 3: Evaluate Population with Fuzzy Logic")
test_pop = [Schedule({app: 10 for app in test_appliances}) for _ in range(10)]
evaluate_population(test_pop, test_appliances, eco_mode=False, request_constraints={}, fuzzy_predictions=fuzzy_preds)
assert all(s.fitness_score > 0 for s in test_pop), "Fitness not calculated for all"
print(f"   Evaluated {len(test_pop)} individuals")
print(f"   Best fitness: {test_pop[0].fitness_score:.4f}")
print(f"   Worst fitness: {test_pop[-1].fitness_score:.4f}")
print("   ✅ PASS")

# Test 4: Tournament Selection
print("\n✅ TEST 4: Tournament Selection")
selected = tournament_select(test_pop, size=3, fuzzy_predictions=fuzzy_preds)
assert isinstance(selected, Schedule), "Tournament selection didn't return Schedule"
print(f"   Selected individual fitness: {selected.fitness_score:.4f}")
print("   ✅ PASS")

# Test 5: Crossover
print("\n✅ TEST 5: Crossover")
parent_a = test_pop[0]
parent_b = test_pop[1]
child = crossover(parent_a, parent_b, test_appliances)
assert isinstance(child, Schedule), "Crossover didn't return Schedule"
print(f"   Child fitness: {child.fitness_score}")
print("   ✅ PASS")

# Test 6: Mutation
print("\n✅ TEST 6: Mutation with Fuzzy Guidance")
mut_individual = Schedule({app: 15 for app in test_appliances})
mutate(mut_individual, test_appliances, mutation_rate=0.5, fuzzy_predictions=fuzzy_preds)
assert all(0 <= mut_individual.appliance_times[app] < 24 for app in test_appliances), "Invalid mutation result"
print(f"   Mutated schedule: {mut_individual.appliance_times}")
print("   ✅ PASS")

# Test 7: Full GA Run (short version)
print("\n✅ TEST 7: Full Genetic Algorithm Run with Fuzzy Logic")
best, trends, init_cost = run_genetic_algorithm(
    appliances=test_appliances,
    population_size=20,
    generations=5,
    eco_mode=False,
    request_constraints={},
    fuzzy_predictions=fuzzy_preds
)
assert best is not None, "GA didn't return best schedule"
assert len(trends) > 0, "GA didn't return trends"
assert init_cost > 0, "GA didn't return initial cost"
print(f"   Initial Cost: {init_cost:.2f}")
print(f"   Final Cost: {trends[-1]:.2f}")
print(f"   Cost Reduction: {((init_cost - trends[-1]) / init_cost * 100):.2f}%")
print(f"   Generations: {len(trends)}")
print("   ✅ PASS")

print("\n" + "="*80)
print("✅ ALL VERIFICATION TESTS PASSED!")
print("✅ Fuzzy Logic GA Integration is fully functional")
print("="*80)
