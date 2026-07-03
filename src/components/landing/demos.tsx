const demoList = [
  { title: 'Cafe Linna', url: 'https://bruskapp.com/demo/jako', logo: 'https://bruskapp.com/demo/jako/images/logo.jpg', badge: 'Yeni' },
  { title: 'Now Güzellik', url: 'https://bruskapp.com/demo/beauty', logo: 'https://bruskapp.com/demo/beauty/images/logo.jpg', badge: 'Yenilendi' },
  { title: 'Kebapçı Recep Usta', url: 'https://bruskapp.com/demo/durumcu', logo: 'https://bruskapp.com/demo/durumcu/images/logo.jpg', badge: 'Aktif' },
  { title: 'Burger Usta', url: 'https://bruskapp.com/demo/burger', logo: 'https://bruskapp.com/demo/burger/images/logo.jpg', badge: 'Yeni' },
  { title: 'Luxury Estate', url: 'https://bruskapp.com/demo/luxury', logo: 'https://bruskapp.com/demo/luxury/images/logo-mark.svg', badge: 'Premium' },
  { title: 'XRA Motors', url: 'https://bruskapp.com/demo/xra-motors', logo: 'https://bruskapp.com/demo/xra-motors/images/logo.svg', badge: 'Lüks' },
  { title: 'YR Ayakkabı', url: 'https://bruskapp.com/demo/yr-ayakkabi', logo: 'https://bruskapp.com/demo/yr-ayakkabi/images/logo.svg?v=2', badge: '3D' },
  { title: 'Nalbantoğlu Deri', url: 'https://bruskapp.com/demo/deri', logo: 'https://bruskapp.com/demo/deri/images/logo.svg', badge: 'Yeni' },
  { title: 'Fresh Market', url: 'https://bruskapp.com/demo/market', logo: 'https://bruskapp.com/demo/market/images/logo.svg', badge: 'Yeni' },
]

export default function Demos() {
  return (
    <section id="demolar" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-4">
            Platformu{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Keşfedin</span>
          </h2>
          <p className="text-gray-500 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Farklı sektörlerden gerçek işletmeler için hazırlanmış çözümleri inceleyin
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {demoList.map((d, i) => (
            <a key={d.title} href={d.url} target="_blank" rel="noopener noreferrer"
               className="group relative bg-[#080b12] rounded-xl border border-[#1a2332] hover:border-blue-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/5"
               style={{ animationDelay: (i * 0.1) + 's' }}>
              <div className="p-5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0d1117] border border-[#1a2332] flex items-center justify-center shrink-0 overflow-hidden">
                    {d.logo ? (
                      <img src={d.logo} alt={d.title} className="w-full h-full object-contain p-1" />
                    ) : (
                      <span className="text-lg text-gray-500">{d.title[0]}</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-white font-medium text-base truncate">{d.title}</h3>
                    <span className="text-xs text-emerald-400">{d.badge}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-blue-400 group-hover:text-blue-300 transition-colors">
                  <span>Demoyu İncele</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}