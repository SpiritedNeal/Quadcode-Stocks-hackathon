# Stock Analysis Application

A full-stack stock analysis application with AI-powered recommendations.

## Project Structure

```
.
├── backend/           # Flask API server
│   ├── app.py        # Main API server
│   └── requirements.txt
├── app/              # Next.js frontend
├── components/       # React components
└── Quadcode.py      # Stock analysis logic (should be in ~/Downloads/)
```

## Prerequisites

### Backend
- Python 3.8+
- NVIDIA API Key (get from https://build.nvidia.com)

### Frontend
- Node.js 18+
- pnpm (or npm)

## Setup Instructions

### 1. Backend Setup

1. **Install Python dependencies:**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Set up NVIDIA API Key:**
   - Option 1: Set environment variable
     ```bash
     # Windows PowerShell
     $env:NVIDIA_API_KEY="your-api-key-here"
     
     # Windows CMD
     set NVIDIA_API_KEY=your-api-key-here
     
     # Linux/Mac
     export NVIDIA_API_KEY="your-api-key-here"
   ```
   - Option 2: You'll be prompted when running the server

3. **Ensure Quadcode.py is accessible:**
   - The script expects `Quadcode.py` to be in `~/Downloads/` (Windows: `C:\Users\<YourUsername>\Downloads\`)
   - Or modify `backend/app.py` line 12-13 to point to the correct location

4. **Start the backend server:**
   ```bash
   cd backend
   python app.py
   ```
   Or use the batch file:
   ```bash
   start-backend.bat
   ```
   
   The backend will run on `http://localhost:5000`

### 2. Frontend Setup

1. **Install dependencies:**
   ```bash
   pnpm install
   ```
   Or if using npm:
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   pnpm dev
   ```
   Or use the batch file:
   ```bash
   start-frontend.bat
   ```
   
   The frontend will run on `http://localhost:3000`

## Running the Application

### Option 1: Use Batch Files (Windows)

1. Open two command prompts
2. In the first: Run `start-backend.bat`
3. In the second: Run `start-frontend.bat`

### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
python app.py
```

**Terminal 2 - Frontend:**
```bash
pnpm dev
```

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/analyze` - Analyze a stock
  ```json
  {
    "symbol": "AAPL",
    "days": 180
  }
  ```
- `GET /api/quote?symbol=AAPL` - Get quick quote

## Environment Variables

### Backend
- `NVIDIA_API_KEY` - Your NVIDIA API key (required)
- `PORT` - Backend port (default: 5000)
- `FLASK_DEBUG` - Enable debug mode (default: False)

### Frontend
- `NEXT_PUBLIC_API_URL` - Backend API URL (default: http://localhost:5000)

## Troubleshooting

### Backend Issues

1. **Import Error for Quadcode:**
   - Make sure `Quadcode.py` is in `~/Downloads/`
   - Or update the path in `backend/app.py` lines 12-13

2. **NVIDIA API Key Error:**
   - Set the `NVIDIA_API_KEY` environment variable
   - Or enter it when prompted

3. **Port Already in Use:**
   - Change the port in `backend/app.py` or set `PORT` environment variable

### Frontend Issues

1. **Cannot Connect to Backend:**
   - Make sure backend is running on port 5000
   - Check `NEXT_PUBLIC_API_URL` environment variable
   - Check CORS settings in `backend/app.py`

2. **Dependencies Not Found:**
   - Run `pnpm install` or `npm install`

## Notes

- The analysis may take 10-30 seconds as it fetches data and calls the NVIDIA API
- Make sure both servers are running before using the application
- The backend needs internet access to fetch stock data and news

