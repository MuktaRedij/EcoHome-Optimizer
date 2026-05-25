"""
⚠️  DEPRECATED - ML Module (No longer used)

This module is deprecated as of Phase 3 refactoring.
The system has been migrated from ML-based predictions to deterministic Fuzzy Logic.

Use fuzzy_logic.py instead for energy estimation.

Legacy content preserved for reference only - DO NOT USE.
"""

from typing import Dict, List, Optional, Tuple
import os
import sys
import pickle
import traceback
import numpy as np

try:
    import joblib
    ML_AVAILABLE = True
except ImportError:
    ML_AVAILABLE = False
    print("⚠️  joblib not installed")


# Global ML model instance
ml_model = None

# ============================================================================
# DIAGNOSTIC FUNCTIONS
# ============================================================================

def print_environment_info():
    """Print diagnostic information about environment."""
    print("\n" + "="*70)
    print("📊 ENVIRONMENT DIAGNOSTIC INFO")
    print("="*70)
    print(f"Python version: {sys.version}")
    print(f"NumPy version: {np.__version__}")
    print(f"NumPy location: {np.__file__}")
    
    try:
        import scikit_learn
        print(f"Scikit-learn version: {scikit_learn.__version__}")
    except:
        print(f"Scikit-learn: NOT INSTALLED")
    
    try:
        import joblib
        print(f"Joblib version: {joblib.__version__}")
    except:
        print(f"Joblib: NOT INSTALLED")
    
    print("="*70 + "\n")


def load_ml_model():
    """
    Load the trained energy model from pickle file.
    
    Uses: energy_model_fixed.pkl (recently re-saved model)
    
    Enhanced with:
    - Correct model file (energy_model_fixed.pkl)
    - Detailed error logging
    - NumPy version checking
    - Robust path resolution using os.path.abspath
    - Test prediction verification
    - Clear success/failure messages
    """
    print("\n📦 LOADING ML MODEL...")
    print("-" * 70)
    
    # Print environment info on first load
    print_environment_info()
    
    try:
        # Try multiple paths for energy_model_fixed.pkl
        possible_paths = [
            os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "energy_model_fixed.pkl")),
            os.path.abspath(os.path.join(os.path.dirname(__file__), "energy_model_fixed.pkl")),
            "energy_model_fixed.pkl",
            os.path.join(os.getcwd(), "energy_model_fixed.pkl"),
        ]
        
        model_path = None
        for path in possible_paths:
            if os.path.exists(path):
                model_path = os.path.abspath(path)
                print(f"✅ Model file found at: {model_path}")
                break
        
        if not model_path:
            print(f"❌ Model file 'energy_model_fixed.pkl' not found")
            print(f"   Searched locations:")
            for path in possible_paths:
                print(f"   - {path}")
            print("\n⚠️  FAIL LOUDLY: System will operate in GA-only mode (no ML predictions)")
            return None
        
        # Try to load with joblib
        print(f"\n🔄 Loading model with joblib from: {model_path}")
        print(f"NumPy version during load: {np.__version__}")
        
        try:
            model = joblib.load(model_path)
            print(f"✅ ML Model loaded successfully!")
            print(f"📌 Model type: {type(model)}")
            print(f"   - Model class: {type(model).__name__}")
            print(f"   - Model file: {os.path.basename(model_path)}")
            print(f"   - File size: {os.path.getsize(model_path) / 1024:.1f} KB")
            
            # Verify model works - CRITICAL TEST
            print(f"\n🧪 Testing model prediction...")
            test_input = np.array([[1, 3, 2, 1, 0.5, 0, 0.0, 1.0]], dtype=np.float32)
            print(f"   Test input: {test_input}")
            
            try:
                test_pred = model.predict(test_input)
                print(f"✅ Test prediction successful!")
                print(f"🧠 Test prediction: {test_pred}")
                print(f"\n✅ ML model loaded AND working correctly!")
                return model
            except Exception as pred_error:
                print(f"❌ Model predict() failed: {str(pred_error)}")
                print(f"   - Model loaded but cannot make predictions")
                print(f"   - Error type: {type(pred_error).__name__}")
                print(f"   - Traceback: {traceback.format_exc()}")
                return None
            
        except AttributeError as e:
            print(f"❌ AttributeError during model load: {str(e)}")
            print(f"   This often indicates numpy._core compatibility issue")
            print(f"   - Current numpy: {np.__version__}")
            print(f"   - Try: pip install numpy==1.23.5")
            print(f"   - Full error: {traceback.format_exc()}")
            return None
            
        except (pickle.UnpicklingError, EOFError) as e:
            print(f"❌ Model file corrupted: {str(e)}")
            print(f"   - Model pickle/joblib file is invalid")
            print(f"   - File may be truncated or damaged")
            print(f"   - Regenerate the model file")
            print(f"   - Full error: {traceback.format_exc()}")
            return None
            
        except Exception as e:
            print(f"❌ Unexpected error loading model: {str(e)}")
            print(f"   - Error type: {type(e).__name__}")
            print(f"   - Full error: {traceback.format_exc()}")
            return None
            
    except Exception as e:
        print(f"❌ CRITICAL ERROR in load_ml_model(): {str(e)}")
        print(f"   - Error type: {type(e).__name__}")
        print(f"   - System will operate in GA-only mode")
        print(f"   - Full traceback: {traceback.format_exc()}")
        return None
    
    finally:
        print("-" * 70 + "\n")


def initialize_ml_model():
    """
    Initialize ML model at application startup.
    
    Enhanced with:
    - Clear status messages
    - Error handling
    - Fallback indication
    """
    global ml_model
    
    print("\n🚀 INITIALIZING ML SYSTEM...")
    
    if not ML_AVAILABLE:
        print("⚠️  joblib not installed")
        print("   Run: pip install joblib scikit-learn numpy")
        ml_model = None
        return
    
    ml_model = load_ml_model()
    
    if ml_model is None:
        print("⚠️  ML MODEL UNAVAILABLE - Falling back to GA-only mode")
        print("   Energy optimization will work but without ML guidance")
    else:
        print("✅ ML MODEL READY - Full hybrid optimization enabled")


def extract_features(appliances: List[str], appliance_configs: Dict, 
                     family_size: int = 4, hour_offset: int = 0) -> np.ndarray:
    """
    Convert appliance list and metadata into 8D feature vector for ML model.
    
    Features:
    1. Number of appliances
    2. Family size
    3. Total energy consumption
    4. Peak hour energy
    5. Flexibility score
    6. EV charging presence (binary)
    7. Hour offset (sin encoding)
    8. Hour offset (cos encoding)
    
    Returns: np.ndarray of shape (8,)
    """
    num_appliances = len(appliances)
    
    total_energy = sum(appliance_configs[a].energy_kwh for a in appliances if a in appliance_configs)
    
    peak_energy = sum(
        appliance_configs[a].energy_kwh * 1.5
        for a in appliances
        if a in appliance_configs and a in ("Heater", "EV Charger")
    )
    
    flexibility = sum(
        1 for a in appliances
        if a in appliance_configs and 
           (appliance_configs[a].preferred_end - appliance_configs[a].preferred_start > 10)
    )
    
    has_ev = 1.0 if "EV Charger" in appliances else 0.0
    
    hour_sin = np.sin(2 * np.pi * hour_offset / 24.0)
    hour_cos = np.cos(2 * np.pi * hour_offset / 24.0)
    
    features = np.array([
        float(num_appliances),
        float(family_size),
        total_energy,
        peak_energy,
        float(flexibility),
        has_ev,
        hour_sin,
        hour_cos
    ], dtype=np.float32)
    
    return features


def get_ml_predictions(appliances: List[str], appliance_configs: Dict, 
                       family_size: int = 4) -> Dict[str, float]:
    """
    Get ML predictions for appliance schedule optimization.
    
    Enhanced with:
    - Error logging and diagnosis
    - Fallback to defaults if model unavailable
    - Clear indication of model status
    
    Returns dict with:
    - predicted_load: Expected load factor (0-1)
    - predicted_peak_load: Predicted peak load (kW)
    - load_factor: Load intensity
    - model_available: Whether model is available
    """
    result = {
        "predicted_load": 0.5,
        "predicted_peak_load": 5.0,
        "load_factor": 0.5,
        "model_available": False,
    }
    
    if not ML_AVAILABLE:
        print("⚠️  ML not available: joblib not installed")
        return result
    
    if ml_model is None:
        print("⚠️  ML not available: Model not loaded")
        print("   Using GA-only optimization (no ML guidance)")
        return result
    
    try:
        features = extract_features(appliances, appliance_configs, family_size)
        
        try:
            predictions = ml_model.predict([features])[0]
        except AttributeError as e:
            print(f"❌ ML prediction AttributeError: {str(e)}")
            print(f"   This may indicate numpy/scikit-learn version mismatch")
            print(f"   Model trained with different numpy version")
            return result
        except Exception as e:
            print(f"❌ ML prediction error: {type(e).__name__}: {str(e)}")
            return result
        
        if isinstance(predictions, (list, tuple, np.ndarray)):
            if len(predictions) >= 2:
                predicted_load = float(predictions[0])
                predicted_peak_load = float(predictions[1])
            else:
                predicted_load = float(predictions[0])
                predicted_peak_load = float(predictions[0]) * 1.2
        else:
            predicted_load = float(predictions)
            predicted_peak_load = float(predictions) * 1.2
        
        result["predicted_load"] = np.clip(predicted_load, 0.1, 2.0)
        result["predicted_peak_load"] = np.clip(predicted_peak_load, 0.5, 10.0)
        result["load_factor"] = result["predicted_load"]
        result["model_available"] = True
        
        print(f"✅ ML predictions successful:")
        print(f"   - Predicted load: {result['predicted_load']:.3f}")
        print(f"   - Predicted peak: {result['predicted_peak_load']:.3f}")
        
    except Exception as e:
        print(f"❌ Unexpected error in get_ml_predictions(): {type(e).__name__}: {str(e)}")
        import traceback
        print(f"   Traceback: {traceback.format_exc()}")
    
    return result


def get_predicted_peak_hours(ml_predictions: Dict[str, float], 
                             predicted_peak_hours_set: Optional[set] = None) -> set:
    """
    Determine predicted peak hours based on ML predictions.
    
    Returns set of predicted peak hours (e.g., {18, 19, 20, 21, 22})
    """
    if predicted_peak_hours_set is None:
        predicted_peak_hours_set = {18, 19, 20, 21, 22}
    
    return predicted_peak_hours_set


def calculate_load_distribution_error(schedule_peak: float, 
                                     predicted_peak: float,
                                     schedule_loads: List[float],
                                     appliance_configs: Dict) -> float:
    """
    Calculate how well schedule load distribution matches ML predictions.
    
    Compares:
    - Peak load alignment
    - Off-peak load distribution
    
    Returns: Error score (0 = perfect match, higher = worse)
    """
    if predicted_peak <= 0:
        return 0.0
    
    peak_deviation = abs(schedule_peak - predicted_peak) / predicted_peak
    
    # Average load in off-peak hours
    off_peak_hours = list(set(range(24)) - {18, 19, 20, 21, 22})
    if off_peak_hours:
        expected_off_peak_load = predicted_peak * 0.3
        actual_off_peak_avg = sum(schedule_loads[h] for h in off_peak_hours) / len(off_peak_hours)
        off_peak_deviation = abs(actual_off_peak_avg - expected_off_peak_load) / max(expected_off_peak_load, 0.1)
    else:
        off_peak_deviation = 0.0
    
    # Combined error: 70% peak, 30% off-peak
    error = 0.7 * peak_deviation + 0.3 * off_peak_deviation
    
    return min(error, 5.0)  # Cap at 5.0


def calculate_time_slot_matching(schedule_loads: List[float],
                                predicted_peak: float) -> float:
    """
    Measure how well schedule respects predicted peak/off-peak patterns.
    
    Returns: Matching score (1.0 = perfect, 0.0 = terrible)
    """
    if not schedule_loads or predicted_peak <= 0:
        return 0.5
    
    peak_hours = {18, 19, 20, 21, 22}
    off_peak_hours = set(range(24)) - peak_hours
    
    # Calculate average loads
    peak_avg = sum(schedule_loads[h] for h in peak_hours) / len(peak_hours) if peak_hours else 0
    off_peak_avg = sum(schedule_loads[h] for h in off_peak_hours) / len(off_peak_hours) if off_peak_hours else 0
    
    # Expected ratio: peak should be higher if predicted peak is high
    expected_peak = predicted_peak
    expected_off_peak = predicted_peak * 0.3
    
    # Calculate matching
    peak_match = 1.0 - min(abs(peak_avg - expected_peak) / max(expected_peak, 0.1), 1.0)
    off_peak_match = 1.0 - min(abs(off_peak_avg - expected_off_peak) / max(expected_off_peak, 0.1), 1.0)
    
    # Combined score: 60% peak, 40% off-peak
    matching_score = 0.6 * peak_match + 0.4 * off_peak_match
    
    return max(0.0, min(1.0, matching_score))


def calculate_comprehensive_ml_component(schedule_peak: float,
                                        predicted_peak: float,
                                        schedule_loads: List[float],
                                        appliance_configs: Dict,
                                        ml_predictions: Dict[str, float]) -> Tuple[float, Dict[str, float]]:
    """
    Calculate comprehensive ML component with multiple factors:
    
    1. Peak alignment error (30% weight)
    2. Load distribution similarity (40% weight)  
    3. Time-slot matching (30% weight)
    
    Returns: (ml_component_value, component_breakdown)
    """
    if not ml_predictions.get("model_available", False):
        return 0.0, {"peak_error": 0.0, "distribution_error": 0.0, "matching": 0.5}
    
    # Component 1: Peak alignment error
    peak_error = abs(schedule_peak - predicted_peak) / max(predicted_peak, 0.1)
    peak_component = 20.0 * peak_error  # 20.0 max penalty
    
    # Component 2: Load distribution error
    distribution_error = calculate_load_distribution_error(
        schedule_peak, predicted_peak, schedule_loads, appliance_configs
    )
    distribution_component = 15.0 * distribution_error  # 15.0 max penalty
    
    # Component 3: Time-slot matching
    matching_score = calculate_time_slot_matching(schedule_loads, predicted_peak)
    matching_component = -10.0 * matching_score  # -10.0 to 0 (bonus for good matching)
    
    # Weighted combination
    ml_component = (
        0.3 * peak_component +
        0.4 * distribution_component +
        0.3 * matching_component
    )
    
    breakdown = {
        "peak_error": round(peak_component, 2),
        "distribution_error": round(distribution_component, 2),
        "matching": round(matching_component, 2),
    }
    
    return max(0.0, ml_component), breakdown


def calculate_normalized_fitness(cost: float,
                                penalty: float,
                                ml_component: float,
                                max_cost: float = 200.0,
                                max_penalty: float = 100.0,
                                max_ml: float = 50.0) -> float:
    """
    Calculate normalized fitness with equal weighting of components.
    
    All components normalized to 0-1 scale:
    - normalized_cost = cost / max_cost
    - normalized_penalty = penalty / max_penalty
    - normalized_ml = ml_component / max_ml
    
    Fitness = 0.5 * norm_cost + 0.2 * norm_penalty + 0.3 * norm_ml
    
    Lower fitness = better (GA minimizes)
    """
    norm_cost = min(cost / max(max_cost, 0.1), 2.0)  # Cap at 2.0
    norm_penalty = min(penalty / max(max_penalty, 0.1), 2.0)
    norm_ml = min(ml_component / max(max_ml, 0.1), 2.0)
    
    fitness = (
        0.5 * norm_cost +
        0.2 * norm_penalty +
        0.3 * norm_ml
    )
    
    return max(fitness, 0.01)


def apply_ml_hard_constraint(schedule_peak: float,
                            predicted_peak: float,
                            ml_predictions: Dict[str, float]) -> float:
    """
    Apply hard ML constraint: penalize schedules with excessive peak.
    
    If schedule_peak > predicted_peak:
        penalty = (schedule_peak - predicted_peak) * 20
    
    Returns: Penalty value (0 if constraint met)
    """
    if not ml_predictions.get("model_available", False):
        return 0.0
    
    if schedule_peak > predicted_peak:
        # Strong penalty for exceeding predicted peak
        excess = schedule_peak - predicted_peak
        return excess * 20.0  # 20 per unit excess
    
    return 0.0


def get_ml_preferred_start_hour(appliance: str,
                               ml_predictions: Dict[str, float],
                               appliance_configs: Dict,
                               default_start: int) -> int:
    """
    Get ML-preferred start hour for appliance based on predictions.
    
    If high load predicted:
    - Flexible appliances → prefer flexible hours
    If low load predicted:
    - Use off-peak hours
    
    Returns: Recommended start hour
    """
    load_factor = ml_predictions.get("load_factor", 0.5)
    
    if load_factor > 0.7:
        # High load: prefer flexible times (outside peak 18-22)
        cfg = appliance_configs.get(appliance)
        if cfg:
            pref_start = int(cfg.preferred_start) % 24
            pref_end = int(cfg.preferred_end) % 24
            
            # Check if preferred range avoids peak
            if not (18 <= pref_start < 23 or 18 <= pref_end <= 23):
                return pref_start
    else:
        # Low load: prefer off-peak (0-7 or 23)
        import random
        return random.choice(list(range(0, 7)) + [23])
    
    return default_start


def is_peak_hour_avoided_by_prediction(hour: int, ml_predictions: Dict[str, float]) -> bool:
    """
    Check if hour should be avoided based on ML predictions.
    
    Returns: True if hour is predicted to be peak
    """
    if not ml_predictions.get("model_available", False):
        return False
    
    # ML suggests these are typically peak hours
    peak_hours = {18, 19, 20, 21, 22}
    
    if ml_predictions.get("load_factor", 0.5) > 0.8:
        # Strong peak prediction, should avoid peak hours
        return hour in peak_hours
    elif ml_predictions.get("load_factor", 0.5) > 0.6:
        # Moderate peak prediction, slightly prefer non-peak
        return hour in {19, 20, 21}
    
    return False


def calculate_ml_alignment_score(schedule_peak: float,
                                predicted_peak: float,
                                schedule_loads: List[float],
                                appliance_configs: Dict) -> float:
    """
    Calculate comprehensive ML alignment score (0-1).
    
    1.0 = Perfect alignment with ML predictions
    0.5 = Moderate alignment
    0.0 = Complete misalignment
    
    Takes into account:
    - Peak load matching
    - Off-peak load distribution
    - Time-slot pattern matching
    """
    if predicted_peak <= 0:
        return 0.5
    
    # Peak alignment (40% weight)
    peak_error = abs(schedule_peak - predicted_peak) / predicted_peak
    peak_score = max(0.0, 1.0 - peak_error)
    
    # Time-slot matching (60% weight)
    matching = calculate_time_slot_matching(schedule_loads, predicted_peak)
    
    # Combined alignment
    alignment = 0.4 * peak_score + 0.6 * matching
    
    return max(0.0, min(1.0, alignment))
