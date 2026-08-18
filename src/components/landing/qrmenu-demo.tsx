'use client'

import { useState, useEffect, useRef } from 'react'

const flowSteps = [
  {
    title: 'Menüye Erişim',
    icon: '🔎',
    color: 'from-blue-500 to-cyan-500',
    badge: 'bg-blue-500/10 text-blue-400 border-blue-500/10',
    desc: 'Müşteri QR kodu okutur, menüye, fiyatlara, Instagram ve Google yorumlarına tek ekrandan ulaşır.',
    items: ['Ürünler & fiyatlar', 'Instagram & Google Yorum', 'Konum & çalışma saatleri'],
  },
  {
    title: 'Masa veya Online Sipariş',
    icon: '🛒',
    color: 'from-violet-500 to-purple-500',
    badge: 'bg-purple-500/10 text-purple-400 border-purple-500/10',
    desc: 'Müşteri masadan ya da evinden sipariş verir, adresini ve konumunu tek tıkla gönderir.',
    items: ['Masa siparişi + garson çağır', 'Online sipariş + GPS konum', 'Sipariş takip kodu'],
  },
  {
    title: 'Kendi SanalPOS&apos;unuzda Tahsilat',
    icon: '💳',
    color: 'from-emerald-500 to-teal-500',
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/10',
    desc: 'Ödeme işletmenizin kendi sanalposuna düşer. Her sipariş için otomatik fiş ve adisyon çıkar.',
    items: ['Kendi sanalPOS entegrasyonu', 'Otomatik fiş & adisyon', 'Mutfak / tezgah anında bildirim'],
  },
]

const stats = [
  { value: '<5dk', label: 'Sipariş Süresi' },
  { value: '%100', label: 'Kendi POS&apos;unuza' },
  { value: '7/24', label: 'Canlı Sipariş' },
  { value: 'Otomatik', label: 'Fiş & Adisyon' },
]

const chips = [
  { icon: '📸', label: 'Instagram' },
  { icon: '⭐', label: 'Google Yorum' },
  { icon: '📍', label: 'Konum' },
  { icon: '💰', label: 'Fiyatlar' },
  { icon: '📋', label: 'Menü' },
  { icon: '🖨️', label: 'Fiş / Adisyon' },
]

export default function QRDemo() {
  const sectionRef = useRef<HTMLElement>(null)
  const [started, setStarted] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [showContent, setShowContent] = useState(false)
  const [showStats, setShowStats] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el || started) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setStarted(true); observer.disconnect() }
    }, { threshold: 0.2 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const t0 = setTimeout(() => setShowStats(true), 300)
    const t1 = setTimeout(() => setActiveStep(1), 1600)
    const t2 = setTimeout(() => setActiveStep(2), 3400)
    const t3 = setTimeout(() => setActiveStep(0), 5200)
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [started])

  useEffect(() => { setShowContent(false); const t = setTimeout(() => setShowContent(true), 120); return () => clearTimeout(t) }, [activeStep])

  const s = flowSteps[activeStep]

  return (
    <section ref={sectionRef} id="demo" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#080b12] via-transparent to-[#080b12]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-blue-500/3 rounded-full blur-[200px]" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-500/3 rounded-full blur-[150px]" />
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wider mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            QR Menü Akışı
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4 leading-tight">
            QR Okut, Sipariş Ver,<br />
            <span className="text-gradient">Para Kendi POS&apos;unuzda</span>
          </h2>
          <p className="text-gray-400 text-lg mt-4 max-w-3xl mx-auto leading-relaxed">
            Müşteri menüyü görür, masadan veya onlineden siparişini oluşturur,
            ödemeyi işletmenin kendi sanalposuna yapar. Mutfak bildirimi, fiş ve
            adisyon otomatik akar.
          </p>
        </div>

        <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-700 ${showStats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {stats.map((st, i) => (
            <div key={i} className="px-5 py-3 rounded-2xl bg-[#0d1117]/60 border border-[#1a2332] backdrop-blur-sm" style={{ transitionDelay: `${i * 100}ms` }}>
              <p className="text-white text-lg font-bold">{st.value}</p>
              <p className="text-gray-500 text-xs mt-0.5">{st.label}</p>
            </div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl bg-gradient-to-b from-[#0d1117] to-[#0a0e14] border border-[#1a2332] shadow-2xl shadow-black/50 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

            {/* Flow steps tabs */}
            <div className="flex items-center gap-2 px-6 pt-5 pb-4 border-b border-[#1a2332] overflow-x-auto no-scrollbar">
              {flowSteps.map((st, i) => {
                const active = i === activeStep
                return (
                  <button key={i}
                    onClick={() => setActiveStep(i)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-300 border whitespace-nowrap ${active ? st.badge : 'text-gray-500 border-transparent hover:text-gray-300'}`}>
                    <span>{st.icon}</span>
                    <span>{st.title}</span>
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />}
                  </button>
                )
              })}
              <div className="ml-auto hidden sm:block">
                <span className="text-xs text-gray-600">🔴 Canlı Demo</span>
              </div>
            </div>

            {/* Active step content */}
            <div className="p-6 lg:p-10">
              <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center transition-all duration-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <div>
                  <div className={`inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} items-center justify-center text-2xl shadow-lg mb-5`}>{s.icon}</div>
                  <h3 className="text-white text-2xl font-bold mb-3">{s.title}</h3>
                  <p className="text-gray-400 leading-relaxed mb-5">{s.desc}</p>
                  <ul className="space-y-2.5">
                    {s.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-3 text-gray-300">
                        <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visual */}
                <div className="relative rounded-2xl bg-[#0a0e14] border border-[#1a2332] p-6">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  {activeStep === 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between bg-[#0d1117] border border-[#1a2332] rounded-xl px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/5 border border-amber-500/20 flex items-center justify-center">☕</div>
                          <div><p className="text-white text-sm font-semibold">Türk Kahvesi</p><p className="text-gray-500 text-xs mt-0.5">₺75,00</p></div>
                        </div>
                        <span className="px-3 py-1.5 rounded-full text-[10px] font-bold bg-cyan-500/15 text-cyan-400 border border-cyan-500/20">Instagram'da Gör</span>
                      </div>
                      <div className="flex items-center justify-between bg-[#0d1117] border border-[#1a2332] rounded-xl px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500/20 to-red-500/5 border border-rose-500/20 flex items-center justify-center">🍰</div>
                          <div><p className="text-white text-sm font-semibold">Tiramisu</p><p className="text-gray-500 text-xs mt-0.5">₺120,00</p></div>
                        </div>
                        <span className="px-3 py-1.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/20">⭐ 4.8</span>
                      </div>
                      <div className="flex items-center gap-2 pt-2">
                        <span className="px-3 py-1.5 rounded-full text-[10px] font-semibold bg-white/5 border border-white/10 text-gray-400">📍 Konum</span>
                        <span className="px-3 py-1.5 rounded-full text-[10px] font-semibold bg-white/5 border border-white/10 text-gray-400">📸 Instagram</span>
                        <span className="px-3 py-1.5 rounded-full text-[10px] font-semibold bg-white/5 border border-white/10 text-gray-400">⭐ Yorumlar</span>
                      </div>
                    </div>
                  )}
                  {activeStep === 1 && (
                    <div className="space-y-3">
                      <div className="bg-[#0d1117] border border-[#1a2332] rounded-xl px-4 py-3">
                        <p className="text-white text-sm font-semibold mb-2.5">Masa 5 · Sipariş Kararı</p>
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-gray-300 text-xs">2× Türk Kahvesi</p><p className="text-gray-400 text-xs">₺150,00</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-gray-300 text-xs">1× Tiramisu</p><p className="text-gray-400 text-xs">₺120,00</p>
                        </div>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#1a2332]">
                          <p className="text-white text-xs font-bold">Toplam</p><p className="text-white text-sm font-bold">₺270,00</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <span className="flex-1 text-center px-3 py-2 rounded-full text-[11px] font-bold bg-blue-600 text-white">Masa Siparişi</span>
                        <span className="flex-1 text-center px-3 py-2 rounded-full text-[11px] font-bold bg-purple-600 text-white">Online + Konum</span>
                      </div>
                      <p className="text-center text-[11px] text-gray-500">Garson çağır · Sipariş takip kodu</p>
                    </div>
                  )}
                  {activeStep === 2 && (
                    <div className="space-y-3">
                      <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/5 border border-emerald-500/20 flex items-center justify-center">💳</div>
                          <div>
                            <p className="text-white text-sm font-semibold">Kendi SanalPOS&apos;unuz</p>
                            <p className="text-emerald-400 text-xs mt-0.5 font-bold">₺270,00 tahsil edildi</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-[#0d1117] border border-[#1a2332] rounded-xl px-4 py-3">
                        <span className="text-lg">🖨️</span>
                        <div><p className="text-white text-xs font-semibold">Fiş & Adisyon</p><p className="text-gray-500 text-[11px] mt-0.5">Otomatik çıktı · Mutfak bildirimi gönderildi</p></div>
                      </div>
                      <p className="text-center text-[11px] text-gray-500">Tezgah / mutfak ekranında anında görünür</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom chips */}
            <div className="px-6 py-3 border-t border-[#1a2332] bg-[#080b12]/50 flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2 flex-wrap">
                {chips.map((c, i) => (
                  <span key={i} className="flex items-center gap-1.5 text-[11px] text-gray-500 bg-[#0d1117] border border-[#1a2332] rounded-full px-3 py-1.5">
                    <span>{c.icon}</span>{c.label}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3">
                {flowSteps.map((_, i) => (
                  <button key={i} onClick={() => setActiveStep(i)}
                    className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${i === activeStep ? 'w-8 bg-blue-500' : 'w-1.5 bg-[#1a2332] hover:bg-[#2a3a4a]'}`} />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 rounded-xl bg-[#0d1117]/60 border border-[#1a2332] px-4 py-3">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h2m4 0h2M7 7h2m4 0h2M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              </span>
              <div>
                <p className="text-white text-xs font-semibold">Kendi Banka POS&apos;unuza</p>
                <p className="text-gray-500 text-[11px]">Ödemeler doğrudan size, komisyon yok</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-[#0d1117]/60 border border-[#1a2332] px-4 py-3">
              <span className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </span>
              <div>
                <p className="text-white text-xs font-semibold">Panelden Anlık Takip</p>
                <p className="text-gray-500 text-[11px]">Siparişlerinizi gerçek zamanlı izleyin</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-[#0d1117]/60 border border-[#1a2332] px-4 py-3">
              <span className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </span>
              <div>
                <p className="text-white text-xs font-semibold">Komisyonsuz</p>
                <p className="text-gray-500 text-[11px]">Her kuruş cebinize düşer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}