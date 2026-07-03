const features = [
  { icon: '💬', title: 'Web Chat & Sohbet', desc: 'Web sitenize entegre chat widget ile müşterilerinizle anında iletişim kurun.' },
  { icon: '🎙️', title: 'Sesli AI Asistan', desc: 'Yapay zeka destekli sesli asistan ile gelen çağrıları karşılayın, sipariş alın.' },
  { icon: '🤝', title: 'AI Satın Alma Danışmanı', desc: 'Yapay zeka destekli satış asistanı ile müşteri deneyimini iyileştirin.' },
  { icon: '📅', title: 'Randevu Sistemi', desc: 'Online randevu alın, otomatik hatırlatmalar gönderin, takvim yönetin.' },
  { icon: '📱', title: 'Dijital QR Menü', desc: 'QR kod ile menüsü oluşturun, mobil uyumlu dijital menü sunun.' },
  { icon: '👥', title: 'CRM Yönetimi', desc: 'Müşteri ilişkilerinizi yönetin, satış takibi yapın.' },
  { icon: '💳', title: 'Kasa Takip', desc: 'Günlük kasa hareketlerini kaydedin, raporları görüntüleyin.' },
  { icon: '👔', title: 'Personel Yönetimi', desc: 'Personel vardiya, izin ve performans yönetimini kolayca yapın.' },
]

export default function Features() {
  return (
    <section id="özellikler" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-gradient text-sm font-semibold tracking-widest uppercase">Özellikler</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4">İşletmeniz İçin Her Şey</h2>
          <p className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto">Tek bir platformda tüm işletme süreçlerinizi yönetin</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <div key={i} className="group glass rounded-2xl p-6 hover:neon-glow transition-all duration-300 cursor-pointer animate-fade-in" style={{animationDelay: (i * 0.1) + 's'}}>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-xl text-blue-400 mb-4 group-hover:bg-blue-500/20 transition-all">{f.icon}</div>
              <h3 className="text-white font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
