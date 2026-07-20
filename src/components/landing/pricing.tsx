import { MessageCircle, CheckCircle, ShoppingCart, ShoppingBag, Package, Store, Star } from 'lucide-react'
import type { ElementType } from 'react'

const platforms: { name: string; img?: string; icon?: ElementType }[] = [
  { name: 'Instagram', img: 'https://cdn.simpleicons.org/instagram/ffffff' },
  { name: 'WhatsApp', img: 'https://cdn.simpleicons.org/whatsapp/ffffff' },
  { name: 'Messenger', img: 'https://cdn.simpleicons.org/messenger/ffffff' },
  { name: 'Telegram', img: 'https://cdn.simpleicons.org/telegram/ffffff' },
  { name: 'Web Chat', img: 'https://cdn.simpleicons.org/googlechat/ffffff' },
  { name: 'Trendyol', icon: ShoppingBag },
  { name: 'Hepsiburada', icon: Package },
  { name: 'n11', icon: Store },
]

const plans = [
  {
    nameBase: 'Brusk',
    nameSuffix: 'Go',
    subtitle: 'BAŞLANGIÇ PAKETİ',
    price: '2.499',
    priceDecimal: ',00',
    period: 'Ay',
    popular: false,
    messageLimit: '20.000',
    platformLabel: '2 Platform Seçim Hakkı',
    platformDesc: 'WhatsApp, Instagram, Messenger, Telegram vb. 8 platform arasından 2 tanesini seçebilirsiniz.',
    features: [
      'Haftalık Çark ile Ekstra Mesaj Hakkı',
      'Chatbot Bilgi Havuzu',
      'Lead Yönetimi & CRM',
      'Mesajları Tek Ekrandan Yönetme',
      'Sipariş, Randevu & Rezervasyon Modülü',
      'Gün Sonu Raporu & Analiz',
      'Çoklu Dil Desteği (Otomatik Algılar)',
      'Canlı Sohbet Devralma',
      'Kişiselleştirilmiş Müşteri Karşılama',
      'Yapay Zeka Mesajlaşma Motoru',
      'Yapay Zeka Eğitim & Kurulum Desteği',
      '7/24 Kurulum & Öncelikli Destek',
    ],
    waMsg: 'Merhaba, BruskGo paketi (2.499 TL/ay) hakkında bilgi almak istiyorum.',
    checkoutUrl: null,
  },
  {
    nameBase: 'Brusk',
    nameSuffix: 'Pro',
    subtitle: 'PROFESYONEL PAKET',
    price: '4.999',
    priceDecimal: ',00',
    period: 'Ay',
    popular: true,
    messageLimit: '50.000',
    platformLabel: 'Tüm Platformlar Dahil',
    platformDesc: 'WhatsApp, Instagram, Messenger, Telegram, Pazaryerleri & Web Chat',
    features: [
      'Anlık Telegram Bildirim Modülü',
      'Haftalık Çark ile Ekstra Mesaj Hakkı',
      'Chatbot Bilgi Havuzu',
      'Lead Yönetimi & CRM',
      'Mesajları Tek Ekrandan Yönetme',
      'Sipariş, Randevu & Rezervasyon Modülü',
      'Gün Sonu Raporu & Analiz',
      'Çoklu Dil Desteği (Otomatik Algılar)',
      'Canlı Sohbet Devralma',
      'Kişiselleştirilmiş Müşteri Karşılama',
      'Yapay Zeka Mesajlaşma Motoru',
      'Yapay Zeka Eğitim & Kurulum Desteği',
      '7/24 Kurulum & VIP Öncelikli Destek',
    ],
    waMsg: 'Merhaba, BruskPro paketi (4.999 TL/ay) hakkında bilgi almak istiyorum.',
    checkoutUrl: null,
  },
  {
    nameBase: 'Brusk',
    nameSuffix: 'Max',
    subtitle: 'SINIRSIZ GÜÇ PAKETİ',
    price: '7.999',
    priceDecimal: ',00',
    period: 'Ay',
    popular: false,
    messageLimit: '150.000',
    platformLabel: 'Tüm Platformlar',
    platformDesc: 'Tüm platformları sınırsız kullanabilirsiniz.',
    features: [
      'Anlık Telegram Bildirim Modülü',
      'Haftalık Çark ile Ekstra Mesaj Hakkı',
      'Chatbot Bilgi Havuzu',
      'Lead Yönetimi & CRM',
      'Mesajları Tek Ekrandan Yönetme',
      'Sipariş, Randevu & Rezervasyon Modülü',
      'Gün Sonu Raporu & Analiz',
      'Çoklu Dil Desteği (Otomatik Algılar)',
      'Canlı Sohbet Devralma',
      'Kişiselleştirilmiş Müşteri Karşılama',
      'Yapay Zeka Mesajlaşma Motoru',
      'Yapay Zeka Eğitim & Kurulum Desteği',
      '7/24 Birebir Özel Danışmanlık & VIP Destek',
    ],
    waMsg: 'Merhaba, BruskMax paketi (7.999 TL/ay) hakkında bilgi almak istiyorum.',
    checkoutUrl: null,
  },
]

export default function Pricing() {
  return (
    <section id="fiyatlandırma" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-1/3 -left-48 w-96 h-96 bg-blue-500/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 -right-48 w-80 h-80 bg-purple-500/8 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <span className="text-blue-400 text-sm font-semibold tracking-[0.2em] uppercase">Fiyatlandırma</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4">Her İşletmeye Uygun Planlar</h2>
          <p className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto">
            Aşağıdaki platformlardan ihtiyacınıza göre seçim yapın
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-14 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {platforms.map((p, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-2.5 hover:bg-white/[0.08] hover:border-blue-500/20 transition-all duration-300 hover:scale-105"
            >
                    {p.img ? <img src={p.img} alt={p.name} className="w-5 h-5" /> : p.icon && <p.icon className="w-5 h-5 text-white" />}
              <span className="text-sm font-medium text-gray-300">{p.name}</span>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={'relative group bg-[#0d1117]/80 backdrop-blur-xl border rounded-2xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 animate-fade-in flex flex-col ' + (plan.popular ? 'border-blue-500/40 hover:border-blue-500/60 hover:shadow-blue-500/10 scale-[1.02] md:scale-105' : 'border-[#1a2332] hover:border-blue-500/30 hover:shadow-blue-500/5')}
              style={{ animationDelay: `${0.2 + i * 0.15}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                  <div className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-[10px] font-bold px-4 py-1.5 rounded-full tracking-[0.15em] shadow-lg shadow-blue-500/30">
                    <Star className="w-3 h-3 fill-white" /> EN POPÜLER
                  </div>
                </div>
              )}
              <div className="p-6 lg:p-8 flex flex-col flex-1">
                <div className="flex items-baseline gap-0.5 mb-1">
                  <span className="text-2xl lg:text-3xl font-bold text-white tracking-tight">{plan.nameBase}</span>
                  <span className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">{plan.nameSuffix}</span>
                </div>
                <p className="text-[11px] text-gray-500 tracking-[0.15em] mb-6">{plan.subtitle}</p>

                <div className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white text-center py-4 rounded-xl shadow-lg shadow-blue-500/20 mb-3">
                  <div className="flex items-baseline justify-center gap-0.5">
                    <span className="text-lg font-semibold text-white/80">₺</span>
                    <span className="font-bold text-2xl tracking-tight">{plan.price}{plan.priceDecimal}</span>
                  </div>
                  <p className="text-white/70 text-xs font-normal mt-0.5">/{plan.period} · Vergiler Dahil</p>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2.5">
                    <MessageCircle className="w-5 h-5 text-blue-400" />
                    <span className="font-bold text-sm text-white tracking-wide">{plan.messageLimit} MESAJ</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg viewBox="0 0 40 40" className="w-9 h-9 shrink-0">
                      <defs>
                        <linearGradient id="s1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#3b82f6"/><stop offset="1" stopColor="#1d4ed8"/></linearGradient>
                        <linearGradient id="s2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#8b5cf6"/><stop offset="1" stopColor="#6d28d9"/></linearGradient>
                        <linearGradient id="s3" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f59e0b"/><stop offset="1" stopColor="#d97706"/></linearGradient>
                        <linearGradient id="s4" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#10b981"/><stop offset="1" stopColor="#059669"/></linearGradient>
                        <linearGradient id="s5" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ef4444"/><stop offset="1" stopColor="#dc2626"/></linearGradient>
                        <linearGradient id="s6" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ec4899"/><stop offset="1" stopColor="#be185d"/></linearGradient>
                      </defs>
                      <g style={{transformOrigin: '20px 20px'}} className="transition-transform duration-[3000ms] group-hover:rotate-[360deg]">
                        <path d="M20 20 L20 2 A18 18 0 0 1 35.588 11 Z" fill="url(#s1)"/>
                        <path d="M20 20 L35.588 11 A18 18 0 0 1 35.588 29 Z" fill="url(#s2)"/>
                        <path d="M20 20 L35.588 29 A18 18 0 0 1 20 38 Z" fill="url(#s3)"/>
                        <path d="M20 20 L20 38 A18 18 0 0 1 4.412 29 Z" fill="url(#s4)"/>
                        <path d="M20 20 L4.412 29 A18 18 0 0 1 4.412 11 Z" fill="url(#s5)"/>
                        <path d="M20 20 L4.412 11 A18 18 0 0 1 20 2 Z" fill="url(#s6)"/>
                      </g>
                      <circle cx="20" cy="20" r="3.5" fill="#0f172a" stroke="#334155" strokeWidth="1"/>
                      <polygon points="20,0 17.5,6 22.5,6" fill="#fbbf24" stroke="#d97706" strokeWidth="0.5"/>
                    </svg>
                    <span className="text-[10px] text-gray-500 leading-tight text-right">
                      Her hafta mesaj<br />hakkı kazanma şansı!
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 mb-6 flex-1">
                  {plan.features.map((f, j) => (
                    <div key={j} className="flex items-start gap-2 text-gray-300 group/feat">
                      <CheckCircle className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5 transition-transform duration-200 group-hover/feat:scale-110" />
                      <span className="text-[13px] leading-snug">{f}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mt-auto">
                  <a
                    href={`https://wa.me/905442566476?text=${encodeURIComponent(plan.waMsg)}`}
                    className={"w-full text-white text-center py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg " + (plan.popular ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-blue-500/20 hover:shadow-blue-500/30' : 'bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 shadow-black/20 hover:shadow-black/30')}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Satın Al
                  </a>
                  <div className="text-center">
                    <a
                      href={`https://wa.me/905442566476?text=${encodeURIComponent(plan.waMsg)}`}
                      className="text-xs text-gray-500 hover:text-blue-400 transition-colors underline underline-offset-4 decoration-white/10 hover:decoration-blue-400/30"
                    >
                      WhatsApp'tan detaylı bilgi al
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#0F2C59] to-[#1a3a6a] rounded-b-2xl px-6 lg:px-8 py-5 text-center border-t border-white/5">
                <div className="text-white font-bold text-sm tracking-wide">{plan.platformLabel}</div>
                <div className="text-blue-200/60 text-[11px] mt-1">{plan.platformDesc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
