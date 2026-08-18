const features = [
  { icon: '📱', title: 'QR Menü & Dijital Menü', desc: 'Ürünleriniz ve fiyatlarınız tek QR ile. Anında güncelleme, güncel menü her zaman müşteri cebinde.' },
  { icon: '🪑', title: 'Masa Siparişi', desc: 'Müşteri masadan direkt sipariş verir, garson beklemeden mutfağa iletilir.' },
  { icon: '🛵', title: 'Online Sipariş', desc: 'Adres ve tek tıkla konum bilgisi ile evden sipariş. Sipariş takip kodu ile anlık durum.' },
  { icon: '💳', title: 'Kendi SanalPOS&apos;unuz', desc: 'Ödemeler doğrudan işletmenizin kendi banka sanalposuna düşer, komisyonsuz.' },
  { icon: '🖨️', title: 'Otomatik Fiş & Adisyon', desc: 'Her sipariş için fiş ve adisyon kendiliğinden çıkar, muhasebeniz düzenli kalır.' },
  { icon: '🏗️', title: 'Mutfak / Tezgah Bildirimi', desc: 'Sipariş mutfak ve tezgah ekranına anında düşer, yetişmesi gereken iş hiç aksaklığa uğramaz.' },
  { icon: '🔔', title: 'Garson Çağır', desc: 'Masadan tek dokunuşla garson çağrısı, servis talepleri anında ekranınızda.' },
  { icon: '📸', title: 'Instagram & Google Yorum', desc: 'Menüde Instagram, Google yorumları, konum ve çalışma saatleri tek ekranda birleşir.' },
]

export default function Features() {
  return (
    <section id="özellikler" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-gradient text-sm font-semibold tracking-widest uppercase">Özellikler</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4">İşletmeniz İçin Her Şey Dahil</h2>
          <p className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto">
            QR menü, masa & online sipariş, kendi sanalpos&apos;unuz ve otomatik fiş/adisyon tek pakette
          </p>
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