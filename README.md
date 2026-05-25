# 🌱 EcoHome Optimizer

An AI-powered intelligent home energy optimization platform that uses **Fuzzy Logic** and **Genetic Algorithms** to help households reduce energy costs, lower carbon emissions, and optimize appliance scheduling.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Python](https://img.shields.io/badge/python-3.8+-blue)
![React](https://img.shields.io/badge/react-19-blue)

---

## 🎯 Key Features

- **⚡ Intelligent Scheduling** - Genetic Algorithm optimizes appliance usage to minimize costs and carbon footprint
- **🧠 Fuzzy Logic Predictions** - AI-powered energy consumption estimation based on household characteristics
- **💰 Cost Optimization** - Save up to 30% on electricity bills by shifting usage to off-peak hours
- **🌍 Carbon Reduction** - Reduce CO₂ emissions by 30-40% through intelligent scheduling
- **📊 Real-Time Analytics** - Visual dashboards with cost trends, heatmaps, and detailed metrics
- **🎛️ Dual Modes** - Choose between cost-focused or eco-focused optimization
- **📱 Responsive UI** - Works seamlessly on desktop, tablet, and mobile devices
- **⚙️ Flexible Constraints** - Adjust appliance schedules based on your lifestyle and preferences

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│           EcoHome Optimizer Platform                │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Frontend (React 19 + Vite)    Backend (FastAPI)   │
│  ├─ Dashboard                  ├─ API Routes       │
│  ├─ Analytics                  ├─ Fuzzy Logic      │
│  ├─ Scheduling                 ├─ Genetic Algo     │
│  └─ Settings                   └─ Calculations     │
│                                                     │
│  Communication: REST API (HTTP)                    │
│  Data Format: JSON                                 │
└─────────────────────────────────────────────────────┘
```

### System Components

#### 1. **Fuzzy Logic Engine** (Backend)
- Rule-based estimation of household energy patterns
- Inputs: Family size, appliance count, total power, flexibility
- Outputs: Predicted load profile and peak demand prediction
- Deterministic & explainable (no ML model dependencies)

#### 2. **Genetic Algorithm Optimizer** (Backend)
- Evolutionary optimization of appliance schedules
- 100+ generations of population-based search
- Fitness function balances: Cost (50%) + Peak penalties (20%) + Fuzzy alignment (30%)
- Produces optimal schedule with metrics

#### 3. **React Dashboard** (Frontend)
- Real-time cost trend visualization
- Schedule heatmaps showing optimal appliance timing
- CO₂ reduction metrics and comparisons
- Scenario comparison (Eco mode vs Standard mode)

---

## 📋 Tech Stack

### Backend
- **Python 3.8+** - Language
- **FastAPI** - REST API framework
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation
- **NumPy** - Numerical computations

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool & dev server
- **Tailwind CSS 4** - Styling
- **Recharts** - Data visualization
- **Axios** - HTTP client

### DevOps
- **Git** - Version control
- **Docker** - Containerization (optional)

---

## 🚀 Quick Start

### Prerequisites
- Python 3.8+ 
- Node.js 18+
- npm or yarn

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/ecohome-optimizer.git
cd ecohome-optimizer
```

#### 2. Setup Backend

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

#### 3. Setup Frontend

```bash
cd ../energy-ui

# Install dependencies
npm install

# or with yarn
yarn install
```

---

## 🏃 Running the Project

### Start Backend Server

```bash
cd backend

# Activate virtual environment (if not already active)
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Run development server with auto-reload
uvicorn app:app --reload --port 8001
```

Backend will be available at: `http://127.0.0.1:8001`

**API Documentation**: `http://127.0.0.1:8001/docs` (Swagger UI)

### Start Frontend Development Server

```bash
cd energy-ui

# Start Vite dev server with HMR
npm run dev

# or
yarn dev
```

Frontend will typically be available at: `http://localhost:5173`

---

## 📁 Project Structure

```
ecohome-optimizer/
│
├── backend/                          # FastAPI Backend
│   ├── app.py                       # Main application & routes
│   ├── fuzzy_logic.py              # Fuzzy Logic engine
│   ├── ml.py                        # Genetic Algorithm
│   ├── requirements.txt             # Python dependencies
│   ├── setup_environment.sh         # Setup script
│   ├── README.md                    # Backend documentation
│   │
│   ├── tests/                       # Test files
│   │   ├── test_api.py
│   │   ├── test_fuzzy_logic.py
│   │   ├── test_ga.py
│   │   └── ...
│   │
│   └── venv/                        # Virtual environment (gitignored)
│
├── energy-ui/                       # React Frontend
│   ├── src/
│   │   ├── components/              # React components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── About.jsx
│   │   │   ├── ResultsPanel.jsx
│   │   │   ├── ChartSection.jsx
│   │   │   └── ...
│   │   ├── context/                 # React Context (state management)
│   │   │   └── ThemeContext.jsx
│   │   ├── hooks/                   # Custom React hooks
│   │   │   └── useTheme.js
│   │   ├── utils/                   # Utility functions
│   │   │   ├── currency.js
│   │   │   └── debug.js
│   │   ├── App.jsx                  # Main app component
│   │   ├── main.jsx                 # Entry point
│   │   ├── App.css
│   │   └── index.css
│   │
│   ├── public/                      # Static assets
│   ├── package.json                 # Dependencies & scripts
│   ├── vite.config.js              # Vite configuration
│   ├── tailwind.config.js           # Tailwind configuration
│   ├── README.md                    # Frontend documentation
│   └── node_modules/               # Node packages (gitignored)
│
├── README.md                        # This file
├── .gitignore
└── LICENSE
```

---

## 🔌 API Endpoints

### Optimize Energy Usage
```http
POST /optimize
Content-Type: application/json

{
  "family_size": 3,
  "num_appliances": 5,
  "total_energy_kwh": 25.5,
  "flexibility_factor": 0.7,
  "eco_mode": false,
  "appliances": ["Washing Machine", "Dryer", "Dishwasher"],
  "constraints": {
    "Washing Machine": {"earliest": 5, "latest": 22},
    "Dryer": {"earliest": 5, "latest": 22}
  }
}
```

**Response:**
```json
{
  "cost_trend": [15.81, 15.21, 14.92, ...],
  "initial_cost": 15.81,
  "final_cost": 13.80,
  "generations": 100,
  "schedule": [
    {
      "appliance": "Washing Machine",
      "start_hour": 5,
      "start_time": "05:00",
      "end_time": "07:00",
      "duration_hours": 1.5
    }
  ],
  "co2_reduction": 2.145,
  "co2_reduction_percent": 35.2,
  "peak_usage_reduction": 8.26,
  "energy_saved": 12.71,
  "insights": [
    "Save $2.01 (12.7%) by optimizing your schedule",
    "Reduce CO2 emissions by 35.2% (2.145 kg)",
    "Shift 8.26% of usage away from peak hours (6-10 PM)"
  ]
}
```

### Health Check
```http
GET /health
```

---

## 🧠 How It Works

### Step 1: Input Household Data
User provides:
- Family size (1-5+)
- Number of appliances
- Daily power consumption
- Flexibility preferences
- Specific appliance constraints

### Step 2: Fuzzy Logic Analysis
- System analyzes household characteristics
- Predicts energy consumption patterns
- Estimates peak demand timing
- Generates baseline schedule

### Step 3: Genetic Algorithm Optimization
```
Initial Population (random schedules)
         ↓
    Evaluate Fitness
    (cost, CO₂, peaks)
         ↓
  Tournament Selection
         ↓
    Crossover & Mutation
         ↓
    100+ Generations
         ↓
    Optimal Schedule
```

### Step 4: Results & Insights
- Cost savings estimate (%)
- CO₂ reduction (kg)
- Peak load reduction (%)
- Detailed schedule with times
- Actionable insights

---

## 📊 Sample Results

```
Input:
  - Family size: 3
  - Appliances: Washing Machine, Dryer, Dishwasher
  - Total daily energy: 25.5 kWh
  - Flexibility: 0.7

Output:
  💰 Cost Savings: $2.01 (12.7%)
  🌍 CO₂ Reduction: 2.145 kg (35.2%)
  ⚡ Peak Reduction: 8.26%
  
  Recommended Schedule:
  - Washing Machine: 05:00 - 07:00 (off-peak)
  - Dishwasher: 06:00 - 07:30 (off-peak)
  - Dryer: 22:00 - 23:30 (super off-peak)
```

---

## 🧪 Testing

### Backend Tests
```bash
cd backend

# Run all tests
pytest

# Run specific test
pytest tests/test_api.py -v

# Run with coverage
pytest --cov=. --cov-report=html
```

### Frontend Tests
```bash
cd energy-ui

# Run tests (if configured)
npm test
```

---

## 📝 Configuration

### Backend Configuration
Edit `backend/app.py` to adjust:
- `POPULATION_SIZE` - Genetic algorithm population
- `GENERATIONS` - Optimization iterations
- `MUTATION_RATE` - Evolution mutation probability
- Peak hour definitions (6 PM - 10 PM by default)

### Frontend Configuration
Edit `energy-ui/src/App.jsx`:
- API endpoint URL
- Theme preferences
- Chart configurations

---

## 🔒 Security & Privacy

- No user authentication required for demo
- All calculations performed locally on backend
- No data stored or transmitted to external services
- CORS enabled for development (`http://localhost:5173`)
- Input validation on all API endpoints

---

## 📈 Performance

- **Backend Response Time**: < 500ms for optimization (100 generations)
- **Frontend Load Time**: < 2s (with Vite)
- **Fuzzy Logic**: O(1) deterministic calculation
- **Genetic Algorithm**: O(n*m) where n=population, m=generations

---

## 🚢 Deployment

### Docker (Optional)

```bash
# Build Docker image
docker build -f backend/Dockerfile -t ecohome-backend .

# Run container
docker run -p 8001:8001 ecohome-backend
```

### Heroku / Cloud Deployment

```bash
# Create Procfile for backend
web: uvicorn app:app --host 0.0.0.0 --port $PORT

# Deploy
git push heroku main
```

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style
- Backend: PEP 8 (Python)
- Frontend: ESLint + Prettier (JavaScript)

---

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

---

## 🙋 Support & Questions

- 📧 Email: support@ecohomeoptimizer.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/ecohome-optimizer/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/ecohome-optimizer/discussions)

---

## 🎯 Future Roadmap

- [ ] Real-time electricity price integration
- [ ] Weather-based optimization
- [ ] Machine learning model for better predictions
- [ ] Mobile app (React Native)
- [ ] Integration with smart home systems (Alexa, Google Home)
- [ ] User authentication and data persistence
- [ ] Historical usage tracking
- [ ] Automated recommendations via email/SMS

---

## 📚 Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Genetic Algorithm Basics](https://en.wikipedia.org/wiki/Genetic_algorithm)
- [Fuzzy Logic](https://en.wikipedia.org/wiki/Fuzzy_logic)

---

## 👥 Authors

- **Your Name** - Initial work

---

## 🙏 Acknowledgments

- Inspired by smart home energy optimization research
- Built with modern AI and optimization techniques
- Community feedback and contributions

---

**Made with ❤️ for sustainable living** 🌱
