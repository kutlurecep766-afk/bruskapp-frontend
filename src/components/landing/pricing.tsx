const DODO_CHECKOUT_URL = 'https://test.checkout.dodopayments.com/buy/pdt_0NisD0fIY6VpqQLWE2UDh?quantity=1&redirect_url=https://bruskapp.com'

const plans = [
  {
    name: 'Starter',
    price: '999',
    desc: 'Küçük işletmeler için ideal başlangıç paketi',
    features: ['1 Web Chat', '2.500 mesaj/ay', 'QR Menu', 'Temel müşteri yönetimi', 'E-posta destek'],
    popular: false,
    waMsg: 'Merhaba, Bruskapp Starter paketi (999 TL/ay) hakkında bilgi almak istiyorum. İlgi alanlarım: 1 Web Chat, 2.500 mesaj/ay, QR Menu, Temel müşteri yönetimi, E-posta destek',
    checkoutUrl: null,
  },
  {
    name: 'Professional',
    price: '2.999',
    desc: 'Büyüyen işletmeler için profesyonel çözüm',
    features: ['Web Chat + AI Asistan', 'WhatsApp & Instagram AI', 'Pazaryeri Entegrasyonu', 'Stok & Fiyat Senkronizasyonu', 'Kargo Entegrasyonu', 'Sesli AI asistan', 'Öncelikli destek'],
    popular: true,
    waMsg: 'Merhaba, Bruskapp Professional paketi (2.999 TL/ay) hakkında bilgi almak istiyorum.',
    checkoutUrl: DODO_CHECKOUT_URL,
  },
  {
    name: 'Enterprise',
    price: '4.999',
    desc: 'Kurumsal işletmeler için tam kapsamlı çözüm',
    features: ['Sınırsız AI Chatbot', '10.000 mesaj', 'Sesli AI asistan', 'QR Menu + Online Sipariş', 'CRM + Kasa + Personel', 'Randevu + Takvim', 'Özel entegrasyon', '7/24 destek'],
    popular: false,
    waMsg: 'Merhaba, Bruskapp Enterprise paketi (4.999 TL/ay) hakkında bilgi almak istiyorum.',
    checkoutUrl: null,
  },
]

export default function Pricing() {
  return (
    <section id="fiyatlandırma" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[150px]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-gradient text-sm font-semibold tracking-widest uppercase">Fiyatlandırma</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4">Her Ölçeğe Uygun Planlar</h2>
          <p className="text-gray-400 text-lg mt-4">Aylık 999 TL'den başlayan fiyatlarla başlayın, büyüdükçe genişletin</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <div key={i} className={'relative rounded-3xl p-8 transition-all duration-500 animate-fade-in ' + (plan.popular ? 'neon-glow scale-100 md:scale-105 lg:scale-110 z-10' : 'glass hover:neon-glow')} style={{animationDelay: (i * 0.15) + 's'}}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full text-xs text-white font-medium">En Popüler</div>
              )}
              <div className={plan.popular ? '' : ''} style={plan.popular ? {background:'rgba(13,17,23,0.9)', backdropFilter:'blur(20px)', border:'1px solid rgba(26,35,50,0.5)', borderRadius:'24px', padding:'32px'} : {}}>
                <h3 className="text-white text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-gray-500 text-sm mb-6">{plan.desc}</p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl sm:text-5xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-500">TL/ay</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-gray-300"><span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>{f}</li>
                  ))}
                </ul>
                {plan.checkoutUrl ? (
                  <div className="space-y-2">
                    <a href={plan.checkoutUrl} target="_blank" className={'block w-full py-3 rounded-2xl text-center text-sm font-semibold transition-all bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/25'}>Hemen Satın Al</a>
                    <a href={`https://wa.me/905442566476?text=${encodeURIComponent(plan.waMsg)}`} className="block w-full py-2 rounded-2xl text-center text-xs text-gray-400 hover:text-white transition-all border border-[#1a2332] hover:border-gray-600">WhatsApp'tan sorun</a>
                  </div>
                ) : (
                  <a href={`https://wa.me/905442566476?text=${encodeURIComponent(plan.waMsg)}`} className={'block w-full py-3 rounded-2xl text-center text-sm font-semibold transition-all ' + (plan.popular ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/25' : 'glass text-white hover:bg-white/10')}>Başlayın</a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
