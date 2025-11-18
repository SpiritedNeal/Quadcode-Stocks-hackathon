'use client'

interface BuySellMeterProps {
  aggressionScore: number // 0-100, where 0 = buy aggressively, 100 = sell aggressively
}

// Keep the export name for compatibility, but it's now a Buy/Sell meter
export default function ConfidenceSpeedometer({ aggressionScore }: BuySellMeterProps) {
  const clampedScore = Math.min(Math.max(aggressionScore, 0), 100)
  
  // Convert aggression score to meter position
  // 0 (buy) -> -90 degrees (left), 50 (neutral) -> 0 degrees (center), 100 (sell) -> 90 degrees (right)
  const needleRotation = -90 + (clampedScore / 100) * 180

  const getMeterColor = (score: number) => {
    if (score <= 50) return '#10b981' // Green for buy (0-50)
    return '#ef4444' // Red for sell (50-100)
  }

  const getMeterLabel = (score: number) => {
    if (score <= 20) return 'Strong Buy'
    if (score <= 40) return 'Buy'
    if (score <= 60) return 'Hold'
    if (score <= 80) return 'Sell'
    return 'Strong Sell'
  }

  const getMeterIntensity = (score: number) => {
    if (score <= 20) return 'Very High'
    if (score <= 40) return 'High'
    if (score <= 60) return 'Medium'
    if (score <= 80) return 'High'
    return 'Very High'
  }

  const needleColor = getMeterColor(clampedScore)
  const isBuy = clampedScore < 50
  const isSell = clampedScore > 50
  const isNeutral = clampedScore >= 45 && clampedScore <= 55

  return (
    <div className="premium-card rounded-2xl p-8 flex flex-col items-center bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-slate-900/50 border border-slate-700/50 backdrop-blur-xl shadow-2xl">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-1 h-6 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"></div>
        <p className="text-cyan-300/90 text-xs font-bold tracking-[0.2em] uppercase">Buy / Sell Meter</p>
        <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full"></div>
      </div>
      
      <div className="relative w-72 h-44 mb-6">
        <svg viewBox="0 0 280 160" className="w-full h-full drop-shadow-2xl">
          <defs>
            {/* Gradient definitions for smoother colors */}
            <linearGradient id="buyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="1" />
              <stop offset="50%" stopColor="#22c55e" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="holdGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="1" />
              <stop offset="50%" stopColor="#f97316" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#fb923c" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="sellGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="1" />
              <stop offset="50%" stopColor="#f87171" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#fca5a5" stopOpacity="0.9" />
            </linearGradient>
            {/* Glow filter for needle */}
            <filter id="needleGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Outer shadow arc for depth */}
          <path
            d="M 35 135 A 105 105 0 0 1 245 135"
            stroke="rgba(0, 0, 0, 0.3)"
            strokeWidth="22"
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Main gauge arc background */}
          <path
            d="M 35 135 A 105 105 0 0 1 245 135"
            stroke="rgba(100, 160, 210, 0.15)"
            strokeWidth="20"
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Buy zone with gradient (left side) */}
          <path
            d="M 35 135 A 105 105 0 0 1 140 10"
            stroke="url(#buyGradient)"
            strokeWidth="18"
            fill="none"
            strokeLinecap="round"
            opacity="0.95"
          />
          
          {/* Neutral transition zone (center) - gray/neutral */}
          <path
            d="M 125 15 A 105 105 0 0 1 155 15"
            stroke="rgba(148, 163, 184, 0.6)"
            strokeWidth="18"
            fill="none"
            strokeLinecap="round"
            opacity="0.8"
          />
          
          {/* Sell zone with gradient (right side) */}
          <path
            d="M 140 10 A 105 105 0 0 1 245 135"
            stroke="url(#sellGradient)"
            strokeWidth="18"
            fill="none"
            strokeLinecap="round"
            opacity="0.95"
          />
          
          {/* Tick marks for better readability */}
          {[0, 25, 50, 75, 100].map((value, idx) => {
            const tickRotation = -90 + (value / 100) * 180
            const isMajor = value === 0 || value === 50 || value === 100
            return (
              <g key={idx} transform={`translate(140, 135) rotate(${tickRotation})`}>
                <line
                  x1="0"
                  y1={isMajor ? "-105" : "-108"}
                  x2="0"
                  y2={isMajor ? "-95" : "-102"}
                  stroke="rgba(255, 255, 255, 0.4)"
                  strokeWidth={isMajor ? "2" : "1"}
                  strokeLinecap="round"
                />
              </g>
            )
          })}
          
          {/* Zone labels with better styling */}
          <text 
            x="50" 
            y="125" 
            fill="#10b981" 
            fontSize="13" 
            fontWeight="700" 
            textAnchor="middle"
            className="drop-shadow-lg"
            style={{ filter: 'drop-shadow(0 0 4px rgba(16, 185, 129, 0.6))' }}
          >
            BUY
          </text>
          <text 
            x="140" 
            y="125" 
            fill="#94a3b8" 
            fontSize="13" 
            fontWeight="700" 
            textAnchor="middle"
            style={{ filter: 'drop-shadow(0 0 4px rgba(148, 163, 184, 0.5))' }}
          >
            HOLD
          </text>
          <text 
            x="230" 
            y="125" 
            fill="#ef4444" 
            fontSize="13" 
            fontWeight="700" 
            textAnchor="middle"
            style={{ filter: 'drop-shadow(0 0 4px rgba(239, 68, 68, 0.6))' }}
          >
            SELL
          </text>
          
          {/* Enhanced needle with better styling */}
          <g transform={`translate(140, 135) rotate(${needleRotation})`} style={{ transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
            {/* Needle shadow */}
            <line
              x1="0"
              y1="2"
              x2="0"
              y2="-92"
              stroke="rgba(0, 0, 0, 0.4)"
              strokeWidth="8"
              strokeLinecap="round"
              opacity="0.5"
            />
            {/* Main needle */}
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="-95"
              stroke={needleColor}
              strokeWidth="5"
              strokeLinecap="round"
              filter="url(#needleGlow)"
              style={{ filter: `drop-shadow(0 0 8px ${needleColor}) drop-shadow(0 0 4px ${needleColor})` }}
            />
            {/* Needle tip accent */}
            <circle cx="0" cy="-95" r="3" fill={needleColor} opacity="0.9" />
          </g>
          
          {/* Enhanced center pivot */}
          <circle 
            cx="140" 
            cy="135" 
            r="14" 
            fill="rgba(0, 0, 0, 0.3)" 
            opacity="0.8"
          />
          <circle 
            cx="140" 
            cy="135" 
            r="11" 
            fill={needleColor} 
            opacity="0.95"
            style={{ filter: `drop-shadow(0 0 10px ${needleColor})` }}
          />
          <circle 
            cx="140" 
            cy="135" 
            r="7" 
            fill="white" 
            opacity="1"
          />
          <circle 
            cx="140" 
            cy="135" 
            r="3" 
            fill={needleColor} 
            opacity="0.8"
          />
        </svg>
      </div>

      <div className="text-center w-full space-y-3">
        <div>
          <p className={`text-6xl font-black bg-clip-text text-transparent mb-2 tracking-tight ${
            isBuy ? 'bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500' :
            isSell ? 'bg-gradient-to-r from-red-400 via-red-500 to-red-600' :
            'bg-gradient-to-r from-slate-400 via-slate-500 to-slate-600'
          }`} style={{ 
            textShadow: isBuy 
              ? '0 0 20px rgba(16, 185, 129, 0.3)' 
              : isSell 
              ? '0 0 20px rgba(239, 68, 68, 0.3)' 
              : '0 0 20px rgba(148, 163, 184, 0.3)'
          }}>
            {clampedScore}
          </p>
          <p className="text-xs text-slate-400 font-medium tracking-wider uppercase">Aggression Score</p>
        </div>
        
        <div className={`inline-flex items-center gap-2 px-7 py-3 rounded-xl backdrop-blur-md border-2 font-bold text-sm transition-all duration-300 shadow-xl ${
          clampedScore <= 20 ? 'bg-gradient-to-r from-emerald-500/25 to-green-500/20 text-emerald-200 border-emerald-400/60 shadow-emerald-500/30' :
          clampedScore <= 40 ? 'bg-gradient-to-r from-green-500/25 to-emerald-500/20 text-green-200 border-green-400/60 shadow-green-500/30' :
          clampedScore <= 50 ? 'bg-gradient-to-r from-slate-500/25 to-slate-600/20 text-slate-300 border-slate-400/60 shadow-slate-500/30' :
          clampedScore <= 60 ? 'bg-gradient-to-r from-slate-500/25 to-slate-600/20 text-slate-300 border-slate-400/60 shadow-slate-500/30' :
          clampedScore <= 80 ? 'bg-gradient-to-r from-red-500/25 to-red-600/20 text-red-200 border-red-400/60 shadow-red-500/30' :
          'bg-gradient-to-r from-red-500/25 to-red-600/20 text-red-200 border-red-400/60 shadow-red-500/30'
        }`}>
          <span className="text-base">{getMeterLabel(clampedScore)}</span>
          <span className="text-xs opacity-75">•</span>
          <span className="text-xs opacity-90">{getMeterIntensity(clampedScore)}</span>
        </div>
      </div>
    </div>
  )
}
