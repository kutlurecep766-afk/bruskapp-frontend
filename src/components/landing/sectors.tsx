import { MessageCircle, Instagram, Facebook, Send, Globe, ShoppingBag, BarChart3, Database, MessageSquare, ClipboardList, CalendarCheck, Users, Tag, Bell, FileText, Clock } from 'lucide-react'

const services = [
  {
    title: '7/24 AI Chatbot',
    icon: MessageSquare,
    color: 'from-blue-500 to-cyan-500',
    items: ['WhatsApp, Instagram, Messenger', 'Telegram, Trendyol, Hepsiburada', 'n11, Web Chat entegrasyonu'],
  },
  {
    title: 'Akıllı Bilgi Havuzu',
    icon: Database,
    color: 'from-violet-500 to-purple-500',
    items: ['Ürün/hizmet bilgi tabanı', 'SSS otomatik cevaplama', 'Müşteri bağlamında yanıtlar'],
  },
  {
    title: 'Lead & CRM Yönetimi',
    icon: Users,
    color: 'from-emerald-500 to-teal-500',
    items: ['Otomatik müşteri takibi', 'Lead toplama ve segmentasyon', 'Müşteri geçmişi kaydı'],
  },
  {
    title: 'Sipariş & Rezervasyon',
    icon: ClipboardList,
    color: 'from-orange-500 to-red-500',
    items: ['Sipariş yönetimi paneli', 'Randevu & rezervasyon sistemi', 'Otomatik hatırlatma şablonları'],
  },
  {
    title: 'Kampanya & Bildirim',
    icon: Bell,
    color: 'from-pink-500 to-rose-500',
    items: ['Chatbot kampanya modülü', 'Telegram anlık bildirim', 'Toplu mesaj ve duyuru'],
  },
  {
    title: 'Analiz & Raporlama',
    icon: BarChart3,
    color: 'from-amber-500 to-yellow-500',
    items: ['Gün sonu raporu (Telegram)', 'Kullanım istatistikleri', 'Müşteri davranış analizi'],
  },
]

export default function Sectors() {
  return (
    <section id="sektörler" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-gradient text-sm font-semibold tracking-widest uppercase">Çözümler</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4">Tüm Sektöre Özel Çözümler</h2>
          <p className="text-gray-400 text-lg mt-4 max-w-3xl mx-auto">Mesaj alan her işletmeye uygundur — galerici, butik, restoran, emlakçı, klinik, danışmanlık, e-ticaret ve daha fazlası</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={i} className="group glass rounded-2xl p-6 hover:neon-glow transition-all duration-300 cursor-pointer animate-fade-in" style={{animationDelay: (i * 0.15) + 's'}}>
              <div className={'w-14 h-14 rounded-2xl bg-gradient-to-br ' + s.color + ' flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300'}><s.icon className="w-6 h-6" /></div>
              <h3 className="text-white font-semibold text-lg mb-3">{s.title}</h3>
              <ul className="space-y-1.5">
                {s.items.map((item, j) => (
                  <li key={j} className="text-gray-500 text-sm flex items-start gap-2">
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
