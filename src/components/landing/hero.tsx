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
              <span className="text-emerald-400 font-medium">AI Destekli</span>
              <span className="text-gray-500">İşletme Otomasyonu</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
              İşletmenizi{' '}
              <span className="text-gradient">Yapay Zeka</span>
              <br />
              ile Otomatikleştirin
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 leading-relaxed max-w-xl">
              8 platformda AI chatbot, sipariş ve müşteri yönetimini tek panelden yönetin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#demo" className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-2xl text-base font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-2">
                Demoyu İncele
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
              <a href="https://wa.me/905442566476?text=Merhaba%2C%20Bruskapp%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum." target="_blank" rel="noopener noreferrer" className="px-8 py-4 glass text-white rounded-2xl text-base font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                Ücretsiz Başla
              </a>
            </div>

          </div>
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-56 sm:w-64 lg:w-72 h-[460px] sm:h-[520px] lg:h-[580px] rounded-[40px] glass neon-glow p-3 animate-float">
              <div className="w-full h-full rounded-[32px] bg-[#0a0e14] overflow-hidden flex flex-col">
                <div className="px-4 py-3 border-b border-[#1a2332] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-xs font-bold">AI</div>
                  <div><p className="text-white text-sm font-medium">AI Asistan</p><p className="text-emerald-400 text-xs">Çevrimiçi</p></div>
                </div>
                <div className="flex-1 p-3 space-y-3 overflow-hidden">
                  <div className="flex justify-start animate-message-in">
                    <div className="bg-[#1a2332] rounded-2xl rounded-bl-sm px-4 py-2.5 max-w-[85%]"><p className="text-sm text-gray-300">Merhaba! Size nasil yardımcı olabilirim?</p></div>
                  </div>
                  <div className="flex justify-end animate-message-out" style={{animationDelay:'0.5s'}}>
                    <div className="bg-blue-600 rounded-2xl rounded-br-sm px-4 py-2.5 max-w-[85%]"><p className="text-sm text-white">Merhaba, fiyat bilgisi almak istiyorum</p></div>
                  </div>
                  <div className="flex justify-start animate-message-in" style={{animationDelay:'1s'}}>
                    <div className="bg-[#1a2332] rounded-2xl rounded-bl-sm px-4 py-2.5 max-w-[85%]"><p className="text-sm text-gray-300">Tabii ki! Hangi paketimizle ilgileniyorsunuz? Size özel bir fiyatlandırma sunabiliriz.</p></div>
                  </div>
                  <div className="flex justify-start animate-message-in" style={{animationDelay:'1.5s'}}>
                    <div className="bg-[#1a2332] rounded-2xl rounded-bl-sm px-4 py-2.5 max-w-[60%] flex items-center gap-2">
                      <div className="flex gap-1"><div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay:'0s'}} /><div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay:'0.15s'}} /><div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay:'0.3s'}} /></div>
                    </div>
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
