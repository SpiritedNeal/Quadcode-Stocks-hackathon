'use client'

import { Moon, Sun } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const theme = localStorage.getItem('theme') || 'dark'
    setIsDark(theme === 'dark')
  }, [])

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark'
    setIsDark(!isDark)
    localStorage.setItem('theme', newTheme)
    
    const html = document.documentElement
    if (newTheme === 'dark') {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
  }

  if (!mounted) {
    return <div className="w-12 h-8 rounded-full bg-slate-700 animate-pulse" />
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-between w-12 h-7 px-1 bg-gradient-to-r from-slate-800 to-slate-700 border border-slate-600/50 rounded-full hover:border-slate-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/20"
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <div className={`absolute left-1 top-1/2 -translate-y-1/2 transition-all duration-300 ${isDark ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
        <Moon className="w-4 h-4 text-blue-300" />
      </div>
      <div className={`absolute right-1 top-1/2 -translate-y-1/2 transition-all duration-300 ${!isDark ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
        <Sun className="w-4 h-4 text-amber-300" />
      </div>
      <div className={`w-5 h-5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full shadow-lg transition-all duration-300 ${isDark ? 'translate-x-0' : 'translate-x-5'}`} />
    </button>
  )
}
