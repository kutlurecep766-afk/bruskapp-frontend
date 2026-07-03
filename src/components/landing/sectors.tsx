import { Sparkles, Building2, UtensilsCrossed, ShoppingCart, HeartPulse, Briefcase } from 'lucide-react'

const sectors = [
  { name: 'Güzellik Salonu', icon: Sparkles, color: 'from-pink-500 to-rose-500', desc: 'Randevu yönetimi, müşteri takibi ve online satış' },
  { name: 'Emlak Ofisi', icon: Building2, color: 'from-blue-600 to-indigo-600', desc: 'İlan yönetimi, müşteri ilişkileri ve takip sistemi' },
  { name: 'Restoran & Kafe', icon: UtensilsCrossed, color: 'from-orange-500 to-red-500', desc: 'QR menü, online sipariş ve masa yönetimi' },
  { name: 'E-Ticaret', icon: ShoppingCart, color: 'from-violet-600 to-purple-600', desc: 'Sipariş yönetimi, stok takibi, müşteri destek' },
  { name: 'Klinik', icon: HeartPulse, color: 'from-emerald-500 to-teal-500', desc: 'Hasta yönetimi, randevu sistemi, reçete takibi' },
  { name: 'Danışmanlık', icon: Briefcase, color: 'from-amber-500 to-orange-500', desc: 'Müşteri yönetimi, fatura takibi ve otomasyon' },
]

export default function Sectors() {
  return (
    <section id="sektörler" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-gradient text-sm font-semibold tracking-widest uppercase">Sektörler</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4">Her Sektöre Özel Çözümler</h2>
          <p className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto">İşletmenizin ihtiyaçlarına göre şekillenen akıllı çözümler</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((s, i) => (
            <div key={i} className="group glass rounded-2xl p-6 hover:neon-glow transition-all duration-300 cursor-pointer animate-fade-in" style={{animationDelay: (i * 0.15) + 's'}}>
              <div className={'w-14 h-14 rounded-2xl bg-gradient-to-br ' + s.color + ' flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300'}><s.icon className="w-6 h-6" /></div>
              <h3 className="text-white font-semibold text-lg mb-2">{s.name}</h3>
              <p className="text-gray-500 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
