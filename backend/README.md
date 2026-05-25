# 🔌 Energy Optimization Backend API

FastAPI backend for the Smart Home Energy Optimization System using Fuzzy Logic Energy Estimation and Genetic Algorithm optimization.

## 🏗️ System Architecture

This system uses a hybrid approach combining deterministic fuzzy logic with evolutionary optimization:

### Fuzzy Logic Layer
- **Purpose**: Rule-based estimation of household energy usage and peak load prediction
- **Inputs**: Family size, appliance count, total energy consumption, flexibility factor
- **Outputs**: Predicted load (0-1 normalized), predicted peak load (kW)
- **Advantages**: 
  - Deterministic (no model serialization issues)
  - Fully explainable (all rules visible in code)
  - No external ML dependencies
  - Consistent across environments

### Genetic Algorithm Layer
- **Purpose**: Evolves optimal appliance schedules to minimize cost and CO₂ emissions
- **Population-based search**: Uses fuzzy logic outputs as guidance
- **Operators**: Tournament selection, crossover, adaptive mutation
- **Fitness function**: Weighted combination of cost (50%), peak penalties (20%), and fuzzy alignment (30%)
- **Output**: Optimal schedule with cost savings and CO₂ reduction metrics

## 📋 Prerequisites

- Python 3.8+
- pip (Python package manager)

## ⚙️ Installation

### 1. Create Virtual Environment (Recommended)

```bash
# On Windows
python -m venv venv
venv\Scripts\activate

# On macOS/Linux
python -m venv venv
source venv/bin/activate
```

### 2. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

## 🚀 Running the Server

```bash
python app.py
```

The API will start at: `http://127.0.0.1:8001`

You can view the interactive API documentation at: `http://127.0.0.1:8001/docs`

## 📡 API Endpoints

### Health Check
- **GET** `/` - Returns API status

### Optimization
- **POST** `/optimize` - Run energy optimization

**Request Body:**
```json
{
  "population": 50,
  "generations": 50,
  "appliances": ["Washing Machine", "Dishwasher"],
  "eco_mode": true
}
```

**Response:**
```json
{
  "schedule": {
    "Washing Machine": "02:00 AM",
    "Dishwasher": "03:30 AM"
  },
  "cost": 15.75,
  "energy_saved": 35.2,
  "co2": 42.15,
  "predicted_load": 0.479,
  "predicted_peak_load": 1.596,
  "fuzzy_alignment_score": 0.4,
  "trend": [
    {"generation": 1, "cost": 25.5},
    {"generation": 2, "cost": 23.2},
    ...
  ]
}
```

## 🔌 CORS Support

The API has CORS middleware enabled to accept requests from the React frontend at any origin.

## 📊 Performance

- Optimization takes approximately 2-3 seconds
- Handles concurrent requests
- Designed for low latency responses

## 🛠️ Future Enhancements

- Fine-tune fuzzy logic weights based on real-world usage
- Implement advanced multi-objective optimization
- Add database persistence for historical schedules
- Add authentication and rate limiting
- Add detailed logging and analytics
- Integration with real smart home systems