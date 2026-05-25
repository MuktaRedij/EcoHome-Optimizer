"""
Fuzzy Logic Module for Energy Optimization System

Provides deterministic, explainable energy estimation using fuzzy logic rules
instead of ML-based predictions. Suitable for appliance scheduling optimization.

Features:
- Input normalization (0-1 scale)
- Rule-based weighted fuzzy estimation
- No external ML dependencies
- Fully deterministic and explainable
"""

from typing import Dict, List, Tuple


def fuzzy_energy_estimation(
    family_size: int,
    appliance_count: int,
    total_energy: float,
    flexibility: float,
) -> Tuple[float, float]:
    """
    Estimate energy load and peak using fuzzy logic rules.

    Inputs:
        family_size: Number of family members (0-10)
        appliance_count: Number of appliances (0-10)
        total_energy: Total energy consumption in kWh (0-20)
        flexibility: Schedule flexibility score (0-1, where 1 is most flexible)

    Returns:
        Tuple of (predicted_load, predicted_peak_load)
        Both normalized to 0-1 scale
    """
    
    # ============================================================================
    # STEP 1: Normalize inputs to 0-1 scale
    # ============================================================================
    
    # Family size normalization: max 5 people considered "high"
    size_score = min(family_size / 5.0, 1.0)
    size_score = max(0.0, size_score)
    
    # Appliance count normalization: max 5 appliances considered "high"
    appliance_score = min(appliance_count / 5.0, 1.0)
    appliance_score = max(0.0, appliance_score)
    
    # Total energy normalization: max 10 kWh considered "high"
    energy_score = min(total_energy / 10.0, 1.0)
    energy_score = max(0.0, energy_score)
    
    # Flexibility: already in 0-1 scale, clamp to ensure bounds [0, 1]
    flexibility_score = min(max(flexibility, 0.0), 1.0)
    
    # ============================================================================
    # STEP 2: Apply fuzzy logic rules for load prediction
    # ============================================================================
    # 
    # Rule 1: Higher family size → higher energy load (PRIMARY driver)
    # Rule 2: More appliances → higher energy load
    # Rule 3: Higher total energy → higher energy load
    # Rule 4: Higher flexibility → can shift load away from peak → lower effective load
    #
    # Combined weighted formula with enhanced contrast:
    # - Increased family_size weight (40% → primary driver of household load)
    # - Maintained appliance and energy weights (30% each)
    # - Maintained flexibility penalty (20% reduction)
    predicted_load = (
        0.4 * size_score +        # 40% weight: family size influence (increased for contrast)
        0.3 * appliance_score +   # 30% weight: number of appliances
        0.3 * energy_score +      # 30% weight: total energy consumption
        -0.2 * flexibility_score  # -20% weight: flexibility reduces load pressure
    )
    
    # Clamp to valid range [0, 1]
    predicted_load = max(0.0, min(predicted_load, 1.0))
    
    # Apply non-linearity to improve contrast between low and high loads
    # Power function amplifies differences: low values stay low, high values increase more
    # Exponent 1.2 provides optimal contrast while maintaining stability
    predicted_load = predicted_load ** 1.2
    
    # ============================================================================
    # STEP 3: Calculate peak load prediction
    # ============================================================================
    #
    # Peak load depends on:
    # - Base predicted load (how much energy is needed)
    # - Flexibility (can spread load to reduce peak, or concentrated if inflexible)
    #
    # Higher flexibility → load can be spread → lower peak
    # Lower flexibility → load concentrated → higher peak
    #
    predicted_peak = predicted_load * (1.0 - flexibility_score)
    
    # Clamp to valid range [0, 1]
    predicted_peak = max(0.0, min(predicted_peak, 1.0))
    
    return predicted_load, predicted_peak


def get_fuzzy_predictions(
    appliances: List[str],
    appliance_configs: Dict,
    family_size: int = 4,
) -> Dict[str, float]:
    """
    Get fuzzy logic energy predictions for a set of appliances.

    Returns a dict with predicted load, peak, and other metrics.
    """
    
    # Extract appliance features
    appliance_count = len(appliances)
    
    total_energy = sum(
        appliance_configs[a].energy_kwh
        for a in appliances
        if a in appliance_configs
    )
    
    # Calculate flexibility score
    # Flexible appliances: those with large time windows (e.g., EV Charger, Heater)
    flexible_count = sum(
        1 for a in appliances
        if a in appliance_configs and 
           (appliance_configs[a].preferred_end - appliance_configs[a].preferred_start > 10)
    )
    
    flexibility = min(flexible_count / max(appliance_count, 1), 1.0)
    
    # Call fuzzy estimation
    predicted_load, predicted_peak_load = fuzzy_energy_estimation(
        family_size=family_size,
        appliance_count=appliance_count,
        total_energy=total_energy,
        flexibility=flexibility,
    )
    
    # Scale predictions to realistic ranges
    # predicted_load: 0-1 normalized, scale to load factor 0-1
    # predicted_peak_load: 0-1 normalized, scale to kW (assume max 10 kW peak)
    predicted_peak_kw = predicted_peak_load * 10.0
    
    return {
        "predicted_load": float(predicted_load),
        "predicted_peak_load": float(predicted_peak_kw),
        "load_factor": float(predicted_load),
        "model_available": True,  # Fuzzy logic is always available
        "flexibility": float(flexibility),
        "appliance_count": int(appliance_count),
        "total_energy": float(total_energy),
    }


def calculate_fuzzy_alignment(
    schedule_peak: float,
    predicted_peak: float,
    overlap_counter: List[float],
    appliance_configs: Dict,
) -> float:
    """
    Calculate how well the schedule aligns with fuzzy predictions (0-1 scale).

    Factors:
    - Schedule peak vs predicted peak (lower diff = better alignment)
    - Peak hour distribution (how well spread out)
    """
    
    if predicted_peak <= 0:
        return 1.0  # Perfect alignment if no peak predicted
    
    # Calculate peak alignment score
    # If schedule_peak equals predicted_peak: score = 1.0
    # If schedule_peak >> predicted_peak: score approaches 0
    peak_diff_ratio = abs(schedule_peak - predicted_peak) / max(predicted_peak, 0.1)
    peak_score = max(0.0, 1.0 - peak_diff_ratio)
    peak_score = min(peak_score, 1.0)
    
    # Calculate distribution score
    # Prefer distributed load vs concentrated
    peak_hours = {18, 19, 20, 21, 22}
    off_peak_hours = set(range(24)) - peak_hours
    
    peak_load = sum(overlap_counter[h] for h in peak_hours)
    off_peak_load = sum(overlap_counter[h] for h in off_peak_hours)
    
    total_load = peak_load + off_peak_load
    
    if total_load > 0:
        peak_ratio = peak_load / total_load
        # Ideal: 20-30% during peak, 70-80% off-peak
        # Penalize if too much during peak
        if peak_ratio <= 0.3:
            distribution_score = 1.0
        elif peak_ratio <= 0.5:
            distribution_score = 0.8
        else:
            distribution_score = max(0.0, 1.0 - (peak_ratio - 0.5) * 2)
    else:
        distribution_score = 1.0
    
    # Combined fuzzy alignment score
    fuzzy_alignment_score = (
        0.6 * peak_score +           # 60% weight on peak alignment
        0.4 * distribution_score     # 40% weight on distribution
    )
    
    return min(max(fuzzy_alignment_score, 0.0), 1.0)


def apply_fuzzy_constraint(
    schedule_peak: float,
    predicted_peak: float,
    fuzzy_predictions: Dict[str, float],
) -> float:
    """
    Apply fuzzy logic constraint penalty.

    If schedule exceeds predicted peak, penalize.
    """
    
    if schedule_peak <= predicted_peak:
        return 0.0  # No penalty if within prediction
    
    # Penalty increases with how much over predicted peak
    excess = schedule_peak - predicted_peak
    penalty = excess * 20.0  # 20x penalty per unit excess
    
    return penalty


def calculate_fuzzy_component(
    schedule_peak: float,
    predicted_peak: float,
    overlap_counter: List[float],
    appliance_configs: Dict,
    fuzzy_predictions: Dict[str, float],
) -> Tuple[float, float]:
    """
    Calculate comprehensive fuzzy logic component for fitness.

    Returns (fuzzy_component, alignment_score)
    """
    
    # Peak loading component
    # How well does schedule respect predicted peak?
    peak_component = 1.0 - min(
        abs(schedule_peak - predicted_peak) / max(predicted_peak, 1.0),
        1.0
    )
    peak_component = max(0.0, peak_component)
    
    # Distribution component
    # Is load well distributed across the day?
    peak_hours = {18, 19, 20, 21, 22}
    peak_load = sum(overlap_counter[h] for h in peak_hours)
    total_load = sum(overlap_counter)
    
    if total_load > 0:
        peak_ratio = peak_load / total_load
        # Prefer: 20-30% during peak
        if peak_ratio <= 0.3:
            distribution_component = 1.0
        else:
            distribution_component = max(0.0, 1.0 - (peak_ratio - 0.3) * 3)
    else:
        distribution_component = 1.0
    
    # Matching component
    # How well does schedule match predicted behavior?
    alignment_score = calculate_fuzzy_alignment(
        schedule_peak, predicted_peak, overlap_counter, appliance_configs
    )
    matching_component = alignment_score
    
    # Weighted fuzzy component
    fuzzy_component = (
        0.3 * peak_component +
        0.4 * distribution_component +
        0.3 * matching_component
    )
    
    return fuzzy_component, alignment_score


def normalize_fuzzy_fitness(
    cost: float,
    penalty: float,
    fuzzy_component: float,
    max_cost: float = 200.0,
    max_penalty: float = 100.0,
    max_fuzzy: float = 50.0,
) -> float:
    """
    Calculate normalized fitness with fuzzy guidance.

    Weights:
    - 50% cost component
    - 20% penalty component
    - 30% fuzzy component
    """
    
    # Normalize each component to 0-1 scale
    normalized_cost = min(cost / max_cost, 1.0) if max_cost > 0 else 0.0
    normalized_penalty = min(penalty / max_penalty, 1.0) if max_penalty > 0 else 0.0
    normalized_fuzzy = min(fuzzy_component / max_fuzzy, 1.0) if max_fuzzy > 0 else 0.0
    
    # Weighted combination
    fitness = (
        0.5 * normalized_cost +      # Cost has 50% weight
        0.2 * normalized_penalty +   # Penalty has 20% weight
        0.3 * normalized_fuzzy       # Fuzzy has 30% weight
    )
    
    return fitness
