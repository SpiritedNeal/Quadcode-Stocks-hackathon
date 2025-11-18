# Setup Complete - Next Steps

## ✅ Node.js is installed!

Now follow these steps to get everything running:

---

## Step 1: Install pnpm (Package Manager)

Open CMD and run:
```cmd
npm install -g pnpm
```

This installs pnpm globally. Wait for it to complete.

---

## Step 2: Navigate to Frontend Folder

```cmd
cd C:\Users\Asus\Downloads\frontend_code
```

---

## Step 3: Install Frontend Dependencies

```cmd
pnpm install
```

This will take a few minutes. It downloads all the React/Next.js packages.

**If pnpm doesn't work, use npm instead:**
```cmd
npm install
```

---

## Step 4: Set Up Backend (in a NEW CMD window)

**Open a NEW CMD window** and run:

1. **Set NVIDIA API Key:**
   ```cmd
   set NVIDIA_API_KEY=your-api-key-here
   ```

2. **Navigate to backend:**
   ```cmd
   cd C:\Users\Asus\Downloads\frontend_code\backend
   ```

3. **Install Python dependencies:**
   ```cmd
   pip install -r requirements.txt
   ```

4. **Start backend server:**
   ```cmd
   python app.py
   ```

   You should see: `Running on http://0.0.0.0:5000`

   **Keep this window open!**

---

## Step 5: Start Frontend (in the FIRST CMD window)

Go back to your first CMD window (where you ran `pnpm install`) and run:

```cmd
pnpm dev
```

Or if pnpm didn't work:
```cmd
npm run dev
```

You should see: `Local: http://localhost:3000`

**Keep this window open too!**

---

## Step 6: Open in Browser

Open your web browser and go to:
```
http://localhost:3000
```

---

## 🎉 You're Done!

You should now see the stock analysis dashboard. Try entering a stock ticker like "AAPL" or "MSFT" and click "Analyze".

---

## Quick Reference

**Terminal 1 (Backend):**
```cmd
cd C:\Users\Asus\Downloads\frontend_code\backend
set NVIDIA_API_KEY=your-key
python app.py
```

**Terminal 2 (Frontend):**
```cmd
cd C:\Users\Asus\Downloads\frontend_code
pnpm dev
```

---

## Troubleshooting

**"pnpm is not recognized":**
- Use `npm install` and `npm run dev` instead

**"pip is not recognized":**
- Python might not be installed or not in PATH
- Try `python -m pip install -r requirements.txt`

**Backend won't start:**
- Make sure NVIDIA_API_KEY is set
- Make sure Quadcode.py is in C:\Users\Asus\Downloads\

**Frontend shows "Cannot connect to backend":**
- Make sure backend is running on port 5000
- Check backend CMD window for errors

