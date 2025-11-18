#!/usr/bin/env python3
"""
Flask API server for stock analysis backend
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import sys

# Add Downloads directory to path to import Quadcode functions
# Adjust this path based on where Quadcode.py is located
downloads_path = os.path.join(os.path.expanduser('~'), 'Downloads')
sys.path.insert(0, downloads_path)

# Import analysis functions from Quadcode.py
try:
    from Quadcode import analyze_with_nvidia, parse_decision
except ImportError:
    # Fallback: try to import from current directory or parent
    sys.path.insert(0, os.path.dirname(__file__))
    from Quadcode import analyze_with_nvidia, parse_decision

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "ok", "message": "Backend is running"})

@app.route('/api/analyze', methods=['POST'])
def analyze_stock():
    """
    Analyze a stock ticker
    Expected JSON body: {"symbol": "AAPL", "days": 180}
    """
    try:
        print(f"[API] Received analyze request")
        data = request.get_json()
        if not data or 'symbol' not in data:
            return jsonify({"error": "Missing 'symbol' in request body"}), 400
        
        symbol = data.get('symbol', '').strip().upper()
        days = int(data.get('days', 180))
        
        if not symbol:
            return jsonify({"error": "Symbol cannot be empty"}), 400
        
        print(f"[API] Starting analysis for {symbol}...")
        
        # Run analysis with progress logging
        try:
            result = analyze_with_nvidia(symbol, days)
            print(f"[API] Analysis completed for {symbol}")
        except Exception as analysis_error:
            print(f"[API] Analysis error for {symbol}: {str(analysis_error)}")
            import traceback
            traceback.print_exc()
            return jsonify({"error": f"Analysis failed: {str(analysis_error)}"}), 500
        
        # Format response for frontend
        parsed = result.get('parsed', {})
        price_summary = result.get('price_summary', {})
        technicals = result.get('technical_indicators', {})
        
        # Map aggression score to confidence
        # Lower aggression score (closer to 0) = Higher confidence
        # Higher aggression score (closer to 100) = Lower confidence
        aggression_score = parsed.get('aggression_score', 50)
        if aggression_score is not None:
            # Invert the aggression score to get confidence
            # 0 (buy aggressively) -> 100 (high confidence)
            # 50 (neutral) -> 50 (medium confidence)
            # 100 (sell aggressively) -> 0 (low confidence)
            confidence = 100 - aggression_score
        else:
            confidence = 50
        
        recommendation = parsed.get('recommendation', 'HOLD')
        
        # Get company info
        try:
            import yfinance as yf
            ticker = yf.Ticker(symbol)
            info = ticker.info
            sector = info.get('sector', 'Unknown')
            industry = info.get('industry', 'Unknown')
            market_cap = info.get('marketCap', 0)
            pe_ratio = info.get('trailingPE', 0)
            
            # Format market cap
            if market_cap >= 1e12:
                market_cap_str = f"${market_cap/1e12:.2f}T"
            elif market_cap >= 1e9:
                market_cap_str = f"${market_cap/1e9:.2f}B"
            elif market_cap >= 1e6:
                market_cap_str = f"${market_cap/1e6:.2f}M"
            else:
                market_cap_str = f"${market_cap:,.0f}"
        except:
            sector = "Unknown"
            industry = "Unknown"
            market_cap_str = "N/A"
            pe_ratio = 0
        
        response = {
            "ticker": symbol,
            "recommendation": recommendation,
            "aiConfidence": int(confidence),
            "aggressionScore": aggression_score,
            "currentPrice": price_summary.get('last', 0),
            "targetPrice": price_summary.get('max', price_summary.get('last', 0) * 1.15),  # Estimate
            "stopLoss": price_summary.get('min', price_summary.get('last', 0) * 0.85),  # Estimate
            "timeframe": "3-6 Months",
            "sector": sector,
            "industry": industry,
            "marketCap": market_cap_str,
            "peRatio": pe_ratio if pe_ratio else 0,
            "nextEarnings": "N/A",  # Could be fetched from yfinance if needed
            "priceSummary": price_summary,
            "technicalIndicators": technicals,
            "news": result.get('news', []),
            "assistantText": result.get('assistant_text', ''),
            "rawAnalysis": result.get('raw', {})
        }
        
        return jsonify(response), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/quote', methods=['GET'])
def get_quote():
    """Get quick quote for a stock"""
    try:
        symbol = request.args.get('symbol', '').strip().upper()
        if not symbol:
            return jsonify({"error": "Missing 'symbol' parameter"}), 400
        
        import yfinance as yf
        ticker = yf.Ticker(symbol)
        info = ticker.info
        hist = ticker.history(period="1d")
        
        if hist.empty:
            return jsonify({"error": f"No data found for {symbol}"}), 404
        
        current_price = float(hist['Close'].iloc[-1])
        
        return jsonify({
            "symbol": symbol,
            "price": current_price,
            "name": info.get('longName') or info.get('shortName', symbol),
            "change": float(hist['Close'].iloc[-1] - hist['Open'].iloc[0]) if len(hist) > 0 else 0,
            "changePercent": float((hist['Close'].iloc[-1] / hist['Open'].iloc[0] - 1) * 100) if len(hist) > 0 else 0
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'
    app.run(host='0.0.0.0', port=port, debug=debug)

