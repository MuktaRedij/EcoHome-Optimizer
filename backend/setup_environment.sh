#!/bin/bash
# Clean environment setup for ML + GA backend
# Run this to fix numpy/model loading issues

echo "🧹 Cleaning environment..."

# Remove virtual environment
if [ -d "venv" ]; then
    echo "Removing old venv..."
    rm -rf venv
fi

# Remove cached packages
if [ -d "__pycache__" ]; then
    echo "Removing __pycache__..."
    rm -rf __pycache__
fi

# Remove .pyc files
find . -type f -name "*.pyc" -delete

echo "✅ Environment cleaned"

echo ""
echo "📦 Creating fresh virtual environment..."
python -m venv venv

echo ""
echo "🔌 Activating virtual environment..."
# For Windows (PowerShell): .\venv\Scripts\Activate.ps1
# For Windows (CMD): venv\Scripts\activate.bat
# For Unix/Mac: source venv/bin/activate

echo "⚙️  Installing dependencies from requirements.txt..."
pip install --upgrade pip
pip install -r requirements.txt

echo ""
echo "✅ Environment setup complete!"
echo ""
echo "🔍 Verifying installation..."
python -c "import numpy; import scikit-learn; import joblib; print('✅ All imports successful')"
python -c "import numpy as np; print(f'✅ NumPy version: {np.__version__}')"

echo ""
echo "🚀 Ready to start backend!"
echo "Run: python -m uvicorn app:app --host 127.0.0.1 --port 8001"
