export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-medium">QR Menü & Sipariş</span>
              <span className="text-gray-500">Masa + Online</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
              QR Menü ile Siparişi{' '}
              <span className="text-gradient">Kendi</span>
              <br />
              SanalPOS'unuza Alın
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 leading-relaxed max-w-xl">
              Müşterileriniz masadan ya da online'dan siparişini verir, ödemeyi işletmenizin kendi SanalPOS'una yapar. Mutfak otomatik bildirim alır, fiş ve adisyon kendiliğinden çıkar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://wa.me/905442566476?text=Merhaba%2C%20BruskQR%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum." target="_blank" rel="noopener noreferrer" className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-2xl text-base font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-2">
                Hemen Başla
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
              <a href="#demo" className="px-8 py-4 glass text-white rounded-2xl text-base font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                Demoyu İncele
              </a>
            </div>

            <div className="grid grid-cols-3 gap-3 max-w-md">
              {[
                { v: 'Kurulum + Entegrasyon', l: 'SanalPOS dahil' },
                { v: 'Masa + Online', l: 'Tek panel' },
                { v: '7/24', l: 'Canlı Destek' },
              ].map((s, i) => (
                <div key={i} className="glass rounded-2xl p-4 text-center">
                  <p className="text-white font-bold text-sm leading-tight">{s.v}</p>
                  <p className="text-gray-500 text-[11px] mt-1">{s.l}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-56 sm:w-64 lg:w-72 h-[460px] sm:h-[520px] lg:h-[580px] rounded-[40px] glass neon-glow p-3 animate-float">
              <div className="w-full h-full rounded-[32px] bg-[#0a0e14] overflow-hidden flex flex-col">
                <div className="px-4 py-3 border-b border-[#1a2332] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xs font-bold">QR</div>
                  <div><p className="text-white text-sm font-medium">Cafe Arnavutköy</p><p className="text-emerald-400 text-xs">Open · QR Menü</p></div>
                </div>
                <div className="flex-1 p-3 space-y-3 overflow-hidden">
                  <div className="animate-message-in">
                    <div className="bg-[#1a2332] rounded-2xl rounded-tl-sm px-4 py-2.5"><p className="text-sm text-gray-300">Türk Kahvesi</p><p className="text-xs text-gray-500 mt-1">₺75,00</p><span className="mt-2 inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-blue-600 text-white text-[10px] font-bold">Sepete Ekle</span></div>
                  </div>
                  <div className="flex justify-end animate-message-out" style={{animationDelay:'0.7s'}}>
                    <div className="bg-blue-600 rounded-2xl rounded-br-sm px-4 py-2.5"><p className="text-sm text-white">Masa 5'e sipariş verildi ✓</p></div>
                  </div>
                  <div className="justify-start animate-message-in" style={{animationDelay:'1.4s'}}>
                    <div className="bg-[#1a2332] rounded-2xl rounded-bl-sm px-4 py-2.5 max-w-[85%]"><p className="text-sm text-gray-300">Fiş & adisyon mutfağa iletildi</p><p className="text-[10px] text-gray-500 mt-1.5">Kendi SanalPOS'unuzdan tahsil edildi</p></div>
                  </div>
                  <div className="flex justify-end animate-message-in" style={{animationDelay:'2s'}}>
                    <div className="bg-emerald-600 rounded-2xl rounded-br-sm px-4 py-2 flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-white animate-pulse" /><p className="text-sm text-white">Ödeme Alındı</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}