'use client'

import { useState, useEffect } from 'react'

const steps = [
  { speaker: 'ai', text: 'Merhaba, Bruskapp AI asistanıyım. Size nasıl yardımcı olabilirim?' },
  { speaker: 'user', text: 'Randevu almak istiyorum.' },
  { speaker: 'ai', text: 'Tabii ki, hangi tarih için randevu düşünüyorsunuz?' },
  { speaker: 'user', text: 'Yarın 14.00\'da randevu oluşturmak istiyorum.' },
  { speaker: 'ai', text: 'Yarın 14.00 randevunuzu oluşturdum. Size SMS ile hatırlatma göndereceğiz.' },
  { speaker: 'user', text: 'Teşekkür ederim.' },
  { speaker: 'ai', text: 'Rica ederim, iyi günler dileriz.' },
]

export default function VoiceAI() {
  const [phase, setPhase] = useState(0)
  const [stepIdx, setStepIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [timer, setTimer] = useState(0)

  useEffect(() => {
    if (phase === 3) {
      const id = window.setInterval(() => setTimer(t => t + 1), 1000)
      return () => window.clearInterval(id)
    }
    setTimer(0)
  }, [phase])

  useEffect(() => {
    if (phase === 3) {
      if (stepIdx < steps.length) {
        const current = steps[stepIdx]
        if (charIdx < current.text.length) {
          const t = setTimeout(() => setCharIdx(c => c + 1), 40)
          return () => clearTimeout(t)
        } else {
          const t = setTimeout(() => {
            setStepIdx(s => s + 1)
            setCharIdx(0)
          }, 1200)
          return () => clearTimeout(t)
        }
      }
    }
  }, [phase, stepIdx, charIdx])

  useEffect(() => {
    const timings = [4000, 2500, 2000, 28000, 3000]
    const t = setTimeout(() => {
      if (phase === 4) {
        setPhase(0)
        setStepIdx(0)
        setCharIdx(0)
      } else {
        setPhase(p => p + 1)
      }
    }, timings[phase])
    return () => clearTimeout(t)
  }, [phase])

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  const barHeights = [6, 20, 10, 28, 14, 22, 8, 26, 12, 18, 24, 8]
  const current = phase === 3 && stepIdx < steps.length ? steps[stepIdx] : null

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 lg:order-1 flex justify-center">
            <div className="relative w-72 h-[420px]">
              <div className="absolute inset-0 glass rounded-[48px] neon-glow animate-glow-pulse" />
              <div className="relative w-full h-full rounded-[48px] bg-[#0a0e14]/90 backdrop-blur-sm border border-white/[0.06] flex flex-col items-center justify-center p-6 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none" />
                <div className="relative z-10 flex flex-col items-center">
                  <div className="relative mb-5">
                    {phase === 1 && (
                      <>
                        <div className="absolute -inset-8 rounded-full border-2 border-blue-400/30 animate-ring-expand" />
                        <div className="absolute -inset-8 rounded-full border-2 border-blue-400/20" style={{ animation: 'ring-expand 2s ease-out 1s infinite' }} />
                      </>
                    )}
                    {phase === 2 && (
                      <div className="absolute -inset-6 rounded-full border-2 border-transparent border-t-blue-400/60 border-r-blue-400/30 animate-spin-slow" />
                    )}
                    {phase === 3 && (
                      <div className="absolute -inset-6 rounded-full animate-wave-ring" style={{ border: '1px solid rgba(0,102,255,0.2)' }} />
                    )}
                    {phase === 4 && (
                      <div className="absolute -inset-6 rounded-full border-2 border-red-400/20 animate-voice-ring" />
                    )}
                    <div className={`relative w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center ${phase === 0 ? 'animate-breathe' : ''} ${phase === 1 ? 'animate-voice-ring' : ''} ${phase === 4 ? 'opacity-60 scale-90 transition-all duration-700' : ''} shadow-lg shadow-blue-500/20`}>
                      {phase === 2 ? (
                        <svg className="w-8 h-8 text-white animate-spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                      ) : phase === 4 ? (
                        <svg className="w-9 h-9 text-white rotate-[135deg] transition-transform duration-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                      ) : (
                        <svg className="w-9 h-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                      )}
                    </div>
                  </div>
                  {phase === 3 && (
                    <div className="flex items-center justify-center gap-[3px] h-8 mb-3">
                      {barHeights.map((h, i) => (
                        <div key={i} className="w-[3px] bg-gradient-to-t from-blue-500/60 to-blue-400 rounded-full animate-equalizer" style={{ height: h + 'px', animationDelay: (i * 0.08) + 's' }} />
                      ))}
                    </div>
                  )}
                  <p className="text-white font-semibold text-lg mb-1">AI Sesli Asistan</p>
                  <p className={`text-sm font-medium ${
                    phase === 0 ? 'text-emerald-400' :
                    phase === 1 ? 'text-amber-400' :
                    phase === 2 ? 'text-blue-400' :
                    phase === 4 ? 'text-red-400' :
                    'text-emerald-400'
                  }`}>
                    {phase === 0 && 'Hazır • Beklemede'}
                    {phase === 1 && 'Çağrı geliyor...'}
                    {phase === 2 && 'Bağlanıyor...'}
                    {phase === 3 && `Görüşme aktif • ${formatTime(timer)}`}
                    {phase === 4 && 'Görüşme sonlandı'}
                  </p>
                </div>
                {phase === 3 && current && (
                  <div key={stepIdx} className="relative z-10 w-full mt-4 min-h-[80px] flex flex-col items-center animate-fade-in-up">
                    <div className={`flex items-center gap-2 mb-2 ${current.speaker === 'ai' ? 'self-start ml-2' : 'self-end mr-2'}`}>
                      <span className={`text-[10px] font-semibold uppercase tracking-wider ${current.speaker === 'ai' ? 'text-blue-400' : 'text-emerald-400'}`}>
                        {current.speaker === 'ai' ? '🤖 Asistan' : '👤 Müşteri'}
                      </span>
                    </div>
                    <div className={`w-full rounded-2xl px-4 py-3 ${current.speaker === 'ai' ? 'bg-[#1a2332]' : 'bg-blue-600/80'}`}>
                      <p className="text-sm leading-relaxed text-gray-100 text-center">
                        {current.text.slice(0, charIdx)}
                        {charIdx < current.text.length && (
                          <span className="inline-block w-[2px] h-4 bg-blue-400 ml-0.5 animate-timer-pulse" />
                        )}
                      </p>
                    </div>
                  </div>
                )}
                {phase === 4 && (
                  <div className="relative z-10 w-full mt-4 flex flex-col items-center animate-fade-in">
                    <div className="w-full rounded-2xl px-4 py-3 bg-red-950/30 border border-red-500/20">
                      <p className="text-sm text-red-300 text-center">📞 Görüşme sonlandırıldı</p>
                    </div>
                  </div>
                )}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    phase === 0 ? 'bg-emerald-500' :
                    phase === 1 ? 'bg-amber-500 animate-timer-pulse' :
                    phase === 2 ? 'bg-blue-500 animate-timer-pulse' :
                    phase === 4 ? 'bg-red-500' :
                    'bg-emerald-500 animate-timer-pulse'
                  }`} />
                  <span className="text-[10px] text-gray-600">
                    {phase === 0 && 'Çevrimiçi'}
                    {phase === 1 && 'Gelen çağrı'}
                    {phase === 2 && 'Bağlanıyor'}
                    {phase === 3 && 'Aktif'}
                    {phase === 4 && 'Kapandı'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 space-y-6 animate-fade-in">
            <span className="text-gradient text-sm font-semibold tracking-widest uppercase">Voice AI</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">Yapay Zeka Destekli<br />Telefon Asistanı</h2>
            <p className="text-gray-400 text-lg leading-relaxed">Gelen çağrılara yapay zeka ile yanıt verin. Müşterilerinizle doğal bir şekilde konuşan, randevu alan, sipariş alan akıllı telefon asistanı.</p>
            <ul className="space-y-3">
              {['Gelen çağrılara anında yanıt', 'Doğal dil ile konuşma', 'Randevu ve sipariş yönetimi', 'Müşteri bilgisi sorgulama', '7/24 kesintisiz hizmet'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300"><span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">✓</span>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
