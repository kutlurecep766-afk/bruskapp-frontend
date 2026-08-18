import { QrCode, ShoppingCart, Banknote } from 'lucide-react'

const steps = [
  {
    no: '01',
    title: 'Menünüz QR ile Canlanır',
    icon: QrCode,
    color: 'from-blue-500 to-cyan-500',
    desc: 'Masa ve online QR&apos;larınız oluşturulur, POS entegrasyonu tamamlanır. Ekibimiz panel kurulumu ve eğitimini üstlenir.',
    items: ['QR menü kurulumu', 'POS entegrasyonu', 'Panel eğitimi & 7/24 destek'],
  },
  {
    no: '02',
    title: 'Müşteri Sipariş Verir',
    icon: ShoppingCart,
    color: 'from-violet-500 to-purple-500',
    desc: 'Müşteri QR okutur, menüyü inceler, Instagram ve yorumları görür. Masadan veya (konum + adres ile) evden siparişini oluşturur, garson çağırabilir.',
    items: ['Masa & online sipariş', 'GPS konum ile adres', 'Sipariş takip kodu'],
  },
  {
    no: '03',
    title: 'Para Kendi POS&apos;unuza, Fiş Otomatik',
    icon: Banknote,
    color: 'from-emerald-500 to-teal-500',
    desc: 'Ödeme işletmenin kendi SanalPOS&apos;una düşer, komisyon yok. Sipariş mutfağa/tezgaha anında düşer, fiş ve adisyon otomatik çıkar.',
    items: ['Kendi POS&apos;unuza tahsilat', 'Mutfak / tezgah bildirimi', 'Otomatik fiş & adisyon'],
  },
]

export default function HowItWorks() {
  return (
    <section id="nasıl-çalışır" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-gradient text-sm font-semibold tracking-widest uppercase">Nasıl Çalışır</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4">3 Adımda Dijital Sipariş</h2>
          <p className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto">Kurulumdan tahsilata kadar her şey otomatik akar</p>
        </div>

        <div className="relative grid lg:grid-cols-3 gap-6">
          <div className="hidden lg:block absolute top-16 left-[16%] right-[16%] h-px bg-gradient-to-r from-blue-500/40 via-purple-500/40 to-emerald-500/40" />
          {steps.map((s, i) => (
            <div key={i} className="relative group glass rounded-2xl p-7 hover:neon-glow transition-all duration-300 animate-fade-in" style={{ animationDelay: (i * 0.15) + 's' }}>
              <div className="flex items-center justify-between mb-5">
                <div className={'w-14 h-14 rounded-2xl bg-gradient-to-br ' + s.color + ' flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300'}>
                  <s.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-4xl font-black text-white/5">{s.no}</span>
              </div>
              <h3 className="text-white font-semibold text-lg mb-3">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
              <ul className="space-y-2">
                {s.items.map((item, j) => (
                  <li key={j} className="text-gray-400 text-sm flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}