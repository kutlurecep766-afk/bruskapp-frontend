'use client'

import { useState, useEffect, useRef } from 'react'

const platforms = [
  { id: 'whatsapp', label: 'WhatsApp', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20', icon: '💬' },
  { id: 'instagram', label: 'Instagram', color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20', icon: '📷' },
  { id: 'messenger', label: 'Messenger', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', icon: '💠' },
  { id: 'telegram', label: 'Telegram', color: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/20', icon: '✈️' },
  { id: 'webchat', label: 'Web Chat', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: '🌐' },
]

const demos = [
  { platform: 'whatsapp', from: 'Ahmet Y.', message: '2 adet kahve ve 1 dilim pasta lütfen', resultType: 'Sipariş', resultId: '#1024', resultDetail: '2x Türk Kahvesi, 1x Tiramisu — 180 TL', resultIcon: '🛒', resultColor: 'text-blue-400' },
  { platform: 'instagram', from: 'Zeynep K.', message: 'Yarın 14:00\'te randevu almak istiyorum', resultType: 'Randevu', resultId: '#58', resultDetail: '14 Temmuz 14:00 — 1 kişi', resultIcon: '📅', resultColor: 'text-purple-400' },
  { platform: 'webchat', from: 'Mehmet T.', message: '2 kişilik masa akşam 20:00\'de', resultType: 'Rezervasyon', resultId: '#37', resultDetail: '20:00 — 2 kişi, giriş kat', resultIcon: '👥', resultColor: 'text-emerald-400' },
  { platform: 'telegram', from: 'Ali Rıza', message: '1 adet büyük boy pizza siparişi', resultType: 'Sipariş', resultId: '#1025', resultDetail: '1x Büyük Boy Pizza — 150 TL', resultIcon: '🛒', resultColor: 'text-blue-400' },
  { platform: 'messenger', from: 'Elif D.', message: 'Cuma günü 15:00\'te kuaför randevusu', resultType: 'Randevu', resultId: '#59', resultDetail: '18 Temmuz 15:00 — Saç & Makyaj', resultIcon: '📅', resultColor: 'text-purple-400' },
]

export default function ChatbotDemo() {
  const sectionRef = useRef<HTMLElement>(null)
  const [started, setStarted] = useState(false)
  const [currentDemo, setCurrentDemo] = useState(0)
  const [showMessage, setShowMessage] = useState(false)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el || started) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setStarted(true); observer.disconnect() }
    }, { threshold: 0.3 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const demo = demos[currentDemo]
    setShowMessage(false)
    setShowResult(false)
    const t1 = setTimeout(() => setShowMessage(true), 600)
    const t2 = setTimeout(() => setShowResult(true), 2800)
    const t3 = setTimeout(() => setCurrentDemo(c => (c + 1) % demos.length), 5500)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [started, currentDemo])

  const d = demos[currentDemo]
  const p = platforms.find(x => x.id === d.platform)!

  return (
    <section ref={sectionRef} id="demo" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[150px]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <span className="text-gradient text-sm font-semibold tracking-widest uppercase">Çok Kanallı Gelen Kutusu</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4">Her Kanaldan Gelen Mesaj,<br />AI ile İşleme Dönüşsün</h2>
          <p className="text-gray-400 text-lg mt-4 max-w-3xl mx-auto">WhatsApp, Instagram, Messenger, Telegram ve Web Chat&apos;ten gelen mesajlar AI tarafından analiz edilir, otomatik olarak sipariş, randevu veya rezervasyona dönüştürülür ve admin panelinde anlık görüntülenir.</p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="glass rounded-3xl overflow-hidden transition-all duration-500 animate-fade-in p-6 lg:p-8">
            {/* Flow Container */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10">

              {/* Left: Incoming Message */}
              <div className="flex-1 w-full">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center text-xs">📥</span>
                  <span className="text-sm text-gray-400 font-medium">Gelen Mesaj</span>
                </div>
                <div className={`transition-all duration-700 ${showMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <div className={`${p.bg} ${p.border} border rounded-2xl p-4`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{p.icon}</span>
                      <span className={`text-sm font-semibold ${p.color}`}>{p.label}</span>
                      <span className="text-xs text-gray-500 ml-auto">{d.from}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#1a2332] flex items-center justify-center text-xs text-gray-400 shrink-0">{d.from[0]}</div>
                      <div className="bg-[#0a0e14] rounded-2xl rounded-tl-sm px-4 py-3 flex-1">
                        <p className="text-gray-200 text-sm">{d.message}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center: AI Conversion Arrow */}
              <div className={`transition-all duration-700 delay-300 ${showMessage ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" /></svg>
                  </div>
                  <div className="mt-2 text-xs text-gray-500 font-medium text-center">
                    <div>AI</div>
                    <div>Dönüşüm</div>
                  </div>
                  <div className="mt-1 w-px h-6 bg-gradient-to-b from-blue-500/50 to-transparent" />
                </div>
              </div>

              {/* Right: Result */}
              <div className="flex-1 w-full">
                <div className="flex items-center gap-2 mb-4 justify-end">
                  <span className="text-sm text-gray-400 font-medium">Oluşan İşlem</span>
                  <span className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-xs">📦</span>
                </div>
                <div className={`transition-all duration-700 delay-500 ${showResult ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <div className="bg-[#0a0e14] border border-[#1a2332] rounded-2xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center text-lg">{d.resultIcon}</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-semibold text-sm">{d.resultType}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-medium">{d.resultId}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">AI tarafından oluşturuldu</p>
                      </div>
                      <span className={`ml-auto text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400`}>Onaylandı</span>
                    </div>
                    <div className="bg-[#080b12] rounded-xl p-3 border border-[#1a2332]">
                      <p className="text-gray-300 text-sm">{d.resultDetail}</p>
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                      <span>📋 Panelde görüntüle</span>
                      <span className="text-gray-600">·</span>
                      <span>Anlık senkronize</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Platform Dots */}
            <div className="flex items-center justify-center gap-3 mt-8">
              {demos.map((_, i) => (
                <button key={i} onClick={() => { setCurrentDemo(i); setShowMessage(false); setShowResult(false) }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${i === currentDemo ? 'bg-blue-500 w-8' : 'bg-[#1a2332] hover:bg-[#2a3a4a]'}`}
                />
              ))}
            </div>
          </div>

          <p className="text-center text-xs text-gray-600 mt-4">Tüm mesajlar, siparişler, randevular ve rezervasyonlar backend API&apos;ye kaydedilir ve admin panelinde anlık görüntülenir.</p>
        </div>
      </div>
    </section>
  )
}
