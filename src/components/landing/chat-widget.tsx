'use client'
import { useState, useEffect, useRef, useCallback } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

function BruskappLogo({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="url(#blogo)"/>
      <rect x="2" y="2" width="28" height="28" rx="6" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
      <text x="16" y="23" fontFamily="'Inter','Segoe UI',Arial,sans-serif" fontSize="20" fontWeight="800" fill="white" textAnchor="middle">B</text>
      <defs>
        <linearGradient id="blogo" x1="0" y1="0" x2="32" y2="32">
          <stop offset="0%" stopColor="#2563eb"/>
          <stop offset="100%" stopColor="#7c3aed"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

function sanitizeContent(text: string): string {
  return text.replace(/https?:\/\/(?!bruskapp\.com|www\.bruskapp\.com)[^\s]+/gi, '[link]')
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId] = useState(() => 'default:web_' + Math.random().toString(36).slice(2, 10))
  const [welcome, setWelcome] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  const sendMessage = useCallback(async (text: string) => {
    setMessages(prev => [...prev, { role: 'user', content: text }])
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('/api/webchat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, message: text }),
      })
      if (res.ok) {
        const data = await res.json()
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
      }
    } catch {} finally {
      setLoading(false)
    }
  }, [sessionId])

  useEffect(() => {
    fetch('/api/webchat/config/public')
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (d?.welcomeMessage) setWelcome(d.welcomeMessage)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (open && welcome && messages.length === 0) {
      setMessages([{ role: 'assistant', content: welcome }])
    }
  }, [open, welcome, messages.length])

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 group"
        >
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 flex items-center justify-center rotate-3 hover:rotate-0">
              <BruskappLogo size={32} />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-[3px] border-[#0d1117]" />
            <div className="absolute -top-2 -right-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-2.5 py-0.5 text-[10px] text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              AI Asistan
            </div>
          </div>
        </button>
      )}

      {open && (
        <div className="fixed left-0 right-0 bottom-0 z-50 w-full max-w-[100vw] sm:bottom-6 sm:right-6 sm:left-auto sm:w-[400px] bg-[#0d1117] border border-[#1a2332] rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-fade-in" style={{ maxHeight: '80vh', height: 'auto', boxSizing: 'border-box', overflowX: 'hidden' }}>
          <div className="relative bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 px-4 py-3.5">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMjAiLz48Y2lyY2xlIGN4PSI1IiBjeT0iNSIgcj0iMyIvPjxjaXJjbGUgY3g9IjU1IiBjeT0iMTUiIHI9IjQiLz48Y2lyY2xlIGN4PSI0MCIgY3k9IjUwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
            <div className="relative flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center shadow-lg ring-1 ring-white/10">
                <BruskappLogo size={22} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-white font-semibold text-sm">Bruskapp AI</p>
                  <span className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full font-medium">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    Cevrimici
                  </span>
                </div>
                <p className="text-white/60 text-[11px] mt-0.5">Yapay zeka destekli işletme asistanı</p>
              </div>
              <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: '250px', maxHeight: '60vh', overflowX: 'hidden' }}>
            {messages.length === 0 && !loading && (
              <div className="flex flex-col items-center justify-center h-full text-center py-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/10 flex items-center justify-center mb-4">
                  <BruskappLogo size={28} />
                </div>
                <p className="text-gray-300 text-sm font-medium">Merhaba! Size nasil yardimci olabilirim?</p>
                <p className="text-gray-600 text-xs mt-2 max-w-[250px]">Buradan yazarak projeniz hakkinda tum bilgileri, her seyi halledebilirsiniz.</p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={'flex items-end gap-2.5 ' + (msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg ring-1 ring-white/5">
                    <BruskappLogo size={16} />
                  </div>
                )}
                <div className={'px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ' + (msg.role === 'user' ? 'bg-blue-600 text-white rounded-2xl rounded-br-sm max-w-[80%] shadow-lg shadow-blue-600/20' : 'bg-[#1a2332] text-gray-200 rounded-2xl rounded-bl-sm max-w-[80%] border border-[#243044]')}>
                  {sanitizeContent(msg.content)}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-end gap-2.5 justify-start">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg ring-1 ring-white/5">
                  <BruskappLogo size={16} />
                </div>
                <div className="bg-[#1a2332] rounded-2xl rounded-bl-sm px-5 py-3.5 flex items-center gap-1.5 border border-[#243044]">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="border-t border-[#1a2332] p-4">
            <div className="flex gap-2.5">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !loading && input.trim()) {
                    sendMessage(input.trim())
                  }
                }}
                placeholder="Mesajinizi yazin..."
                className="flex-1 bg-[#080b12] border border-[#1a2332] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 placeholder-gray-600 transition-all"
              />
              <button
                onClick={() => input.trim() && sendMessage(input.trim())}
                disabled={loading || !input.trim()}
                className="px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </button>
            </div>
            <p className="text-[10px] text-gray-700 text-center mt-2">Powered by Bruskapp AI &middot; DeepSeek</p>
          </div>
        </div>
      )}
    </>
  )
}
