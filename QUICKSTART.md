# Quick Start Guide

## 🚀 Running the Application

### Step 1: Install Backend Dependencies

Open Command Prompt or PowerShell and run:

```bash
cd backend
pip install -r requirements.txt
```

### Step 2: Set NVIDIA API Key (Required)

**Option A: Set Environment Variable (Recommended)**

In PowerShell:
```powershell
$env:NVIDIA_API_KEY="your-api-key-here"
```

In CMD:
```cmd
set NVIDIA_API_KEY=your-api-key-here
```

**Option B: Enter when prompted**
The backend will ask for it when you start it.

### Step 3: Install Frontend Dependencies

Open a NEW Command Prompt/PowerShell window:

```bash
pnpm install
```

(If you don't have pnpm, install it first: `npm install -g pnpm`)

### Step 4: Start Both Servers

**Terminal 1 - Backend:**
```bash
cd backend
python app.py
```
You should see: `Running on http://0.0.0.0:5000`

**Terminal 2 - Frontend:**
```bash
pnpm dev
```
You should see: `Local: http://localhost:3000`

### Step 5: Open Browser

Go to: **http://localhost:3000**

Enter a stock ticker (e.g., AAPL, MSFT, TSLA) and click "Analyze"

---

## ⚡ Quick Commands (Windows)

**Using Batch Files:**

1. Double-click `start-backend.bat` (in one terminal)
2. Double-click `start-frontend.bat` (in another terminal)

---

## 🔧 Troubleshooting

**Backend won't start:**
- Make sure `Quadcode.py` is in `C:\Users\Asus\Downloads\`
- Check Python is installed: `python --version`
- Install dependencies: `pip install -r backend/requirements.txt`

**Frontend won't start:**
- Install Node.js from nodejs.org
- Install pnpm: `npm install -g pnpm`
- Install dependencies: `pnpm install`

**"Cannot connect to backend" error:**
- Make sure backend is running on port 5000
- Check backend terminal for errors
- Verify NVIDIA_API_KEY is set

**Analysis takes too long:**
- This is normal! Analysis can take 10-30 seconds
- It fetches stock data, news, and calls AI API

---

## 📝 Notes

- Keep both terminals open while using the app
- Backend must be running before frontend can analyze stocks
- First analysis may be slower (API initialization)

