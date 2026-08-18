import { QrCode, CheckCircle, Star, Rocket } from 'lucide-react'

const plan = {
  name: 'BruskQR',
  subtitle: 'QR Menü + Masa & Online Sipariş + Kendi SanalPOS&apos;unuz',
  price: '5.999',
  priceDecimal: ',00',
  period: 'Ay',
  setupFee: '7.500',
  popular: true,
  checkoutUrl: '', // Ödeme linki buraya eklenecek
  features: [
    'QR Menü & Dijital Menü (Masa + Online)',
    'Masa Siparişi & Garson Çağır',
    'Online Sipariş + Tek Tıkla Konum',
    'Kendi SanalPOS&apos;unuza Entegrasyon',
    'Otomatik Fiş & Adisyon Çıktısı',
    'Mutfak / Tezgah Anında Bildirim',
    'Instagram, Google Yorum & Konum Modülü',
    'Sipariş Takip Kodu & Anlık Durum',
    'Yönetim Paneli & Gün Sonu Raporu',
    '7/24 Destek & Panel Eğitimi',
  ],
  setup: [
    'QR Menü Kurulumu',
    'SanalPOS Entegrasyonu',
    'Panel Eğitimi',
    '7/24 Öncelikli Destek',
  ],
}

export default function Pricing() {
  const checkoutUrl =
    plan.checkoutUrl ||
    'https://wa.me/905442566476?text=' +
      encodeURIComponent(
        'Merhaba, BruskQR paketi (5.999 TL/ay + 7.500 TL kurulum) hakkında bilgi almak istiyorum.'
      )

  return (
    <section id="fiyatlandırma" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-1/3 -left-48 w-96 h-96 bg-blue-500/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 -right-48 w-80 h-80 bg-purple-500/8 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-widest mb-6">
            <Rocket className="w-3.5 h-3.5" />
            TEK PAKET, TÜM ÖZELLİKLER
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4">Her İşletmeye Uygun Plan</h2>
          <p className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto">
            Komisyonsuz, kendi sanalpos&apos;unuzla sipariş almanın en kolay yolu
          </p>
        </div>

        <div className="flex justify-center">
          <div className="relative group bg-[#0d1117]/80 backdrop-blur-xl border border-blue-500/40 rounded-2xl hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 w-full max-w-lg">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
              <div className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-[10px] font-bold px-4 py-1.5 rounded-full tracking-[0.15em] shadow-lg shadow-blue-500/30 whitespace-nowrap">
                <Star className="w-3 h-3 fill-white" /> EN POPÜLER
              </div>
            </div>
            <div className="p-6 lg:p-8">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
                  Brusk<span className="bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">QR</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white text-[9px] font-bold tracking-widest ml-1">
                  <QrCode className="w-3 h-3" /> YENİ
                </span>
              </div>
              <p className="text-[11px] text-gray-500 tracking-[0.1em] mb-6">{plan.subtitle}</p>

              <div className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white text-center py-5 rounded-xl shadow-lg shadow-blue-500/20 mb-3">
                <div className="flex items-baseline justify-center gap-0.5">
                  <span className="text-lg font-semibold text-white/80">₺</span>
                  <span className="font-bold text-3xl tracking-tight">{plan.price}{plan.priceDecimal}</span>
                  <span className="text-white/70 text-sm">/ay</span>
                </div>
                <p className="text-white/70 text-xs font-normal mt-1">Tüm özellikler dahil · Vergiler dahil</p>
              </div>

              <div className="flex items-center justify-center gap-2 rounded-xl bg-amber-500/10 border border-amber-500/20 px-4 py-3.5 mb-6">
                <span className="text-amber-300 font-bold text-sm">+ ₺{plan.setupFee}</span>
                <span className="text-amber-200/70 text-xs">tek seferlik kurulum ücreti</span>
              </div>

              <div className="space-y-1.5 mb-6">
                {plan.features.map((f, j) => (
                  <div key={j} className="flex items-start gap-2 text-gray-300 group/feat">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5 transition-transform duration-200 group-hover/feat:scale-110" />
                    <span className="text-[13px] leading-snug">{f}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-xl bg-[#0a0e14] border border-[#1a2332] p-4 mb-6">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2.5">Kuruluma Dahildir</p>
                <div className="flex flex-wrap gap-2">
                  {plan.setup.map((s, j) => (
                    <span key={j} className="inline-flex items-center gap-1.5 text-[11px] text-gray-300 bg-[#1a2332] rounded-full px-3 py-1.5 border border-white/5">
                      <QrCode className="w-3 h-3 text-blue-400" /> {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3 mt-auto">
                <a
                  href={checkoutUrl}
                  target={plan.checkoutUrl ? '_blank' : undefined}
                  rel={plan.checkoutUrl ? 'noopener noreferrer' : undefined}
                  className="w-full flex items-center justify-center gap-2.5 text-white text-center py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
                >
                  <ShoppingCartIcon /> Hemen Başla
                </a>
                <div className="text-center">
                  <a
                    href="https://wa.me/905442566476?text=Merhaba%2C%20BruskQR%20paketi%20ve%20kurulum%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
                    className="text-xs text-gray-500 hover:text-blue-400 transition-colors underline underline-offset-4 decoration-white/10 hover:decoration-blue-400/30"
                  >
                    WhatsApp&apos;tan detaylı bilgi al
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#0F2C59] to-[#1a3a6a] rounded-b-2xl px-6 lg:px-8 py-5 text-center border-t border-white/5">
              <div className="text-white font-bold text-sm tracking-wide">Yakında: YemekSepeti Tarzı Pazar Yeri</div>
              <div className="text-blue-200/60 text-[11px] mt-1">Şehirdeki tüm işletmeler ve müşterilerin tek platformda buluştuğu büyük güncelleme</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ShoppingCartIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 4.6a1 1 0 00.9 1.4H20M10 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />
    </svg>
  )
}