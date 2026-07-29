'use client'

import { useState, useEffect, useRef } from 'react'

function WAIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
}
function IGAcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
}
function TGIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
}
function MsgrIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 4.975 0 11.111c0 3.497 1.745 6.616 4.472 8.652V24l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.974 12-11.111C24 4.975 18.627 0 12 0zm1.193 14.963l-3.056-3.259-5.963 3.259L10.732 8.2l3.131 3.259L19.752 8.2l-6.559 6.763z"/></svg>
}
function WebIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M3.6 9h16.8M3.6 15h16.8M12 3a15.5 15.5 0 010 18 15.5 15.5 0 010-18z"/></svg>
}

const platforms = [
  { id: 'whatsapp', label: 'WhatsApp', color: 'text-[#25D366]', bg: 'bg-[#25D366]/10', border: 'border-[#25D366]/20', hover: 'hover:bg-[#25D366]/20', icon: WAIcon },
  { id: 'instagram', label: 'Instagram', color: 'text-[#E4405F]', bg: 'bg-[#E4405F]/10', border: 'border-[#E4405F]/20', hover: 'hover:bg-[#E4405F]/20', icon: IGAcon },
  { id: 'messenger', label: 'Messenger', color: 'text-[#0084FF]', bg: 'bg-[#0084FF]/10', border: 'border-[#0084FF]/20', hover: 'hover:bg-[#0084FF]/20', icon: MsgrIcon },
  { id: 'telegram', label: 'Telegram', color: 'text-[#0088CC]', bg: 'bg-[#0088CC]/10', border: 'border-[#0088CC]/20', hover: 'hover:bg-[#0088CC]/20', icon: TGIcon },
  { id: 'webchat', label: 'Web Chat', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', hover: 'hover:bg-emerald-500/20', icon: WebIcon },
]

const demos = [
  { platform: 'whatsapp', from: 'Ahmet Y.', message: '2 adet kahve ve 1 dilim pasta lütfen', resultType: 'Sipariş', resultId: '#1024', resultDetail: '2x Türk Kahvesi, 1x Tiramisu — 180 TL', resultIcon: '🛒', resultLabel: 'Sipariş Oluştu', resultBadge: 'bg-blue-500/10 text-blue-400' },
  { platform: 'instagram', from: 'Zeynep K.', message: 'Yarın 14:00\'te randevu almak istiyorum', resultType: 'Randevu', resultId: '#58', resultDetail: '14 Temmuz 14:00 — 1 kişi', resultIcon: '📅', resultLabel: 'Randevu Oluştu', resultBadge: 'bg-purple-500/10 text-purple-400' },
  { platform: 'webchat', from: 'Mehmet T.', message: '2 kişilik masa akşam 20:00\'de', resultType: 'Rezervasyon', resultId: '#37', resultDetail: '20:00 — 2 kişi, giriş kat', resultIcon: '👥', resultLabel: 'Rezervasyon Oluştu', resultBadge: 'bg-emerald-500/10 text-emerald-400' },
  { platform: 'telegram', from: 'Ali Rıza', message: '1 adet büyük boy pizza siparişi', resultType: 'Sipariş', resultId: '#1025', resultDetail: '1x Büyük Boy Pizza — 150 TL', resultIcon: '🛒', resultLabel: 'Sipariş Oluştu', resultBadge: 'bg-blue-500/10 text-blue-400' },
  { platform: 'messenger', from: 'Elif D.', message: 'Cuma günü 15:00\'te kuaför randevusu', resultType: 'Randevu', resultId: '#59', resultDetail: '18 Temmuz 15:00 — Saç & Makyaj', resultIcon: '📅', resultLabel: 'Randevu Oluştu', resultBadge: 'bg-purple-500/10 text-purple-400' },
]

const stats = [
  { value: '50K+', label: 'Aylık Mesaj' },
  { value: '5', label: 'Platform Entegrasyonu' },
  { value: '%99', label: 'AI Doğruluk Oranı' },
  { value: '3sn', label: 'Ortalama Dönüşüm' },
]

export default function ChatbotDemo() {
  const sectionRef = useRef<HTMLElement>(null)
  const [started, setStarted] = useState(false)
  const [currentDemo, setCurrentDemo] = useState(0)
  const [showMessage, setShowMessage] = useState(false)
  const [showResult, setShowResult] = useState(false)
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
    const t1 = setTimeout(() => setShowMessage(true), 900)
    const t2 = setTimeout(() => setShowResult(true), 3200)
    const t3 = setTimeout(() => setCurrentDemo(c => (c + 1) % demos.length), 6000)
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [started, currentDemo])

  const d = demos[currentDemo]
  const p = platforms.find(x => x.id === d.platform)!
  const Icon = p.icon

  return (
    <section ref={sectionRef} id="demo" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#080b12] via-transparent to-[#080b12]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-blue-500/3 rounded-full blur-[200px]" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/3 rounded-full blur-[150px]" />
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wider mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Çok Kanallı AI Gelen Kutusu
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4 leading-tight">
            Her Kanaldan Gelen Mesaj,<br />
            <span className="text-gradient">AI ile İşleme Dönüşsün</span>
          </h2>
          <p className="text-gray-400 text-lg mt-4 max-w-3xl mx-auto leading-relaxed">
            WhatsApp, Instagram, Messenger, Telegram ve Web Chat&apos;ten gelen mesajlar
            yapay zeka tarafından analiz edilir, otomatik olarak{' '}
            <span className="text-blue-400 font-medium">sipariş</span>,
            <span className="text-purple-400 font-medium"> randevu</span> veya
            <span className="text-emerald-400 font-medium"> rezervasyon</span>
            &apos;a dönüştürülür ve panelde anlık görüntülenir.
          </p>
        </div>

        {/* Stats Row */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-700 ${showStats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {stats.map((s, i) => (
            <div key={i} className="px-5 py-3 rounded-2xl bg-[#0d1117]/60 border border-[#1a2332] backdrop-blur-sm" style={{ transitionDelay: `${i * 100}ms` }}>
              <p className="text-white text-lg font-bold">{s.value}</p>
              <p className="text-gray-500 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Main Card */}
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-3xl bg-gradient-to-b from-[#0d1117] to-[#0a0e14] border border-[#1a2332] shadow-2xl shadow-black/50 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

            {/* Platform Tabs */}
            <div className="flex items-center gap-1.5 px-6 pt-5 pb-4 border-b border-[#1a2332] overflow-x-auto">
              {platforms.map((pl, i) => {
                const PlIcon = pl.icon
                const isActive = pl.id === d.platform && showMessage
                return (
                  <button key={pl.id}
                    onClick={() => { setCurrentDemo(i); setShowMessage(false); setShowResult(false) }}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-300 border ${
                      isActive
                        ? `${pl.bg} ${pl.border} ${pl.color}`
                        : 'text-gray-500 border-transparent hover:text-gray-300'
                    } ${pl.hover}`}
                  >
                    <PlIcon className="w-4 h-4" />
                    <span>{pl.label}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />}
                  </button>
                )
              })}
              <div className="ml-auto hidden sm:block">
                <span className="text-xs text-gray-600">🔴 Canlı</span>
              </div>
            </div>

            {/* Flow Content */}
            <div className="p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-8">

                {/* Left: Incoming Message */}
                <div className="flex-1">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-7 h-7 rounded-lg bg-red-500/15 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                    </div>
                    <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Gelen Mesaj</span>
                  </div>
                  <div className={`transition-all duration-700 ease-out ${showMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                    <div className={`${p.bg} ${p.border} border rounded-2xl p-4 lg:p-5`}>
                      <div className="flex items-center gap-2.5 mb-3">
                        <div className={`w-9 h-9 rounded-xl ${p.bg} flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 ${p.color}`} />
                        </div>
                        <div>
                          <p className={`text-sm font-semibold ${p.color}`}>{p.label}</p>
                          <p className="text-xs text-gray-500">{d.from}</p>
                        </div>
                        <span className="ml-auto text-[10px] text-gray-600">2dk önce</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center text-xs text-white font-medium shrink-0 shadow-lg">
                          {d.from.split(' ').map(w => w[0]).join('').slice(0, 2)}
                        </div>
                        <div className="bg-[#0a0e14] rounded-2xl rounded-tl-sm px-4 py-3 flex-1 border border-[#1a2332]">
                          <p className="text-gray-200 text-sm leading-relaxed">{d.message}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-[10px] text-gray-600">Az önce</span>
                            <span className="text-[10px] text-gray-600">·</span>
                            <span className="text-[10px] text-[#25D366]">📱 Mobil</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center: AI Pipeline */}
                <div className={`flex items-center justify-center transition-all duration-700 delay-300 ${showMessage ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 flex items-center justify-center shadow-xl shadow-blue-500/20">
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" /></svg>
                      </div>
                      <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </div>
                    </div>
                    <div className="mt-2.5 text-[10px] text-gray-500 font-semibold text-center tracking-wider uppercase">
                      <div>AI</div>
                      <div className="text-blue-400">Analiz & Dönüşüm</div>
                    </div>
                    <div className="mt-2 w-px h-8 bg-gradient-to-b from-blue-500/40 via-purple-500/20 to-transparent" />
                    {showResult && (
                      <div className="mt-2 flex items-center gap-1 text-[10px] text-emerald-400 animate-fade-in">
                        <span className="w-1 h-1 rounded-full bg-emerald-400" />
                        <span>Başarılı</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Result */}
                <div className="flex-1">
                  <div className="flex items-center gap-2.5 mb-4 justify-end">
                    <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Oluşan İşlem</span>
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/15 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                  </div>
                  <div className={`transition-all duration-700 ease-out delay-500 ${showResult ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                    <div className="bg-gradient-to-b from-[#0a0e14] to-[#080b12] border border-[#1a2332] rounded-2xl p-4 lg:p-5 shadow-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/5 flex items-center justify-center text-xl border border-emerald-500/10">
                          {d.resultIcon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-white font-semibold text-sm">{d.resultType}</span>
                            <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-mono font-medium border border-blue-500/10">{d.resultId}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">AI tarafından otomatik oluşturuldu</p>
                        </div>
                        <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/10 whitespace-nowrap">✓ Onaylandı</span>
                      </div>
                      <div className="bg-[#080b12] rounded-xl p-3.5 border border-[#1a2332]">
                        <p className="text-gray-200 text-sm font-medium">{d.resultDetail}</p>
                      </div>
                      <div className="mt-3.5 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3 text-gray-500">
                          <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> Panelde Gör</span>
                          <span className="text-gray-700">·</span>
                          <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Anlık</span>
                        </div>
                        <span className="text-emerald-500/60 text-[10px]">AI ile oluşturuldu</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Bar */}
            <div className="px-6 py-3 border-t border-[#1a2332] bg-[#080b12]/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-1.5">
                  {platforms.slice(0, 5).map((pl, i) => {
                    const PlIcon = pl.icon
                    return (
                      <div key={pl.id} className={`w-6 h-6 rounded-full ${pl.bg} border border-[#0d1117] flex items-center justify-center`}
                        style={{ zIndex: 5 - i }}>
                        <PlIcon className={`w-3 h-3 ${pl.color}`} />
                      </div>
                    )
                  })}
                </div>
                <span className="text-xs text-gray-600">Tüm platformlar entegre</span>
              </div>
              <div className="flex items-center gap-3">
                {demos.map((_, i) => (
                  <button key={i} onClick={() => { setCurrentDemo(i); setShowMessage(false); setShowResult(false) }}
                    className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                      i === currentDemo
                        ? 'w-8 bg-blue-500'
                        : 'w-1.5 bg-[#1a2332] hover:bg-[#2a3a4a]'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6 text-xs text-gray-600">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
              Tüm mesajlar ve işlemler backend API'ye kaydedilir
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
              Admin panelinde anlık görüntülenir
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
