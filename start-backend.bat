@echo off
echo Starting Backend Server...
echo.
echo Make sure you have:
echo 1. Python installed
echo 2. NVIDIA_API_KEY environment variable set (or you'll be prompted)
echo 3. All dependencies installed (run: pip install -r backend/requirements.txt)
echo.
cd backend
python app.py
pause

