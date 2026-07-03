'use client'

import { useState, useEffect, useRef } from 'react'

interface Message {
  from: 'user' | 'bot'
  text: string
}

interface CartItem {
  name: string
  price: number
  qty: number
}

const products = [
  { name: 'Türk Kahvesi', price: 50, emoji: '☕' },
  { name: 'Latte', price: 60, emoji: '🥛' },
  { name: 'Burger Menü', price: 120, emoji: '🍔' },
  { name: 'Pizza', price: 150, emoji: '🍕' },
  { name: 'Tiramisu', price: 80, emoji: '🍰' },
  { name: 'Soğuk Çay', price: 35, emoji: '🥤' },
]

const chatScript: (Message & { delay: number })[] = [
  { from: 'bot', text: 'Merhaba! Bruskapp AI asistana hoş geldiniz. Sipariş vermek için menümüze göz atmak ister misiniz?', delay: 1200 },
  { from: 'user', text: 'Evet, menüyü görmek istiyorum', delay: 2500 },
]

const paymentScript: (Message & { delay: number })[] = [
  { from: 'user', text: 'Bağdat Cad. No:123, Kadıköy / İstanbul', delay: 2500 },
  { from: 'bot', text: 'Teşekkürler! Ödemenizi https://pay.bruskapp.com/demo-link adresinden yapabilirsiniz. (Kart ile ödeme)', delay: 3000 },
  { from: 'user', text: 'Ödemeyi yaptım ✅', delay: 3500 },
  { from: 'bot', text: 'Ödeme başarıyla alınmıştır! Siparişiniz 30-45 dakika içinde Bağdat Cad. No:123, Kadıköy adresine teslim edilecektir. Afiyet olsun! 🎉', delay: 3000 },
  { from: 'user', text: 'Teşekkür ederim!', delay: 2500 },
  { from: 'bot', text: 'Rica ederiz! Yeni siparişlerinizde tekrar bekleriz. Menüyü tekrar açmak için lütfen bekleyin...', delay: 3000 },
]

export default function ChatbotDemo() {
  const sectionRef = useRef<HTMLElement>(null)
  const [started, setStarted] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [step, setStep] = useState(0)
  const [typing, setTyping] = useState(false)
  const [phase, setPhase] = useState<'chat' | 'menu' | 'payment'>('chat')
  const [cart, setCart] = useState<CartItem[]>([])
  const [scriptDone, setScriptDone] = useState(false)
  const [menuAutoPhase, setMenuAutoPhase] = useState(0)

  // Start demo when scrolled into view
  useEffect(() => {
    const el = sectionRef.current
    if (!el || started) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setStarted(true)
        observer.disconnect()
      }
    }, { threshold: 0.3 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [started])

  // Auto-chat messages
  useEffect(() => {
    if (!started || phase !== 'chat') return
    const script = scriptDone ? paymentScript : chatScript
    if (step >= script.length) {
      if (!scriptDone) {
        setPhase('menu')
        setMenuAutoPhase(0)
      } else {
        setTimeout(() => {
          setScriptDone(false)
          setMessages([])
          setStep(0)
          setCart([])
          setMenuAutoPhase(0)
          setPhase('chat')
        }, 1000)
      }
      return
    }
    const item = script[step]
    setTyping(true)
    const t = setTimeout(() => {
      setMessages(prev => [...prev, { from: item.from, text: item.text }])
      setTyping(false)
      setStep(s => s + 1)
    }, item.delay)
    return () => clearTimeout(t)
  }, [step, phase, scriptDone, started])

  // Auto-menu: add items one by one, then pay
  useEffect(() => {
    if (!started || phase !== 'menu') return
    const autoSteps = [
      { action: 'add', name: 'Türk Kahvesi', price: 50, delay: 2000 },
      { action: 'add', name: 'Pizza', price: 150, delay: 2000 },
      { action: 'add', name: 'Soğuk Çay', price: 35, delay: 2000 },
      { action: 'pay', delay: 2500 },
    ]
    if (menuAutoPhase >= autoSteps.length) return
    const current = autoSteps[menuAutoPhase]
    const t = setTimeout(() => {
      if (current.action === 'add') {
        setCart(prev => {
          const existing = prev.find(c => c.name === current.name)
          if (existing) return prev.map(c => c.name === current.name ? { ...c, qty: c.qty + 1 } : c)
          return [...prev, { name: current.name!, price: current.price!, qty: 1 }]
        })
      } else {
        // Auto-pay
        const total = cart.reduce((s, c) => s + c.price * c.qty, 0)
        const items = cart.map(c => `${c.qty}x ${c.name}`).join(', ')
        setMessages(prev => [
          ...prev,
          { from: 'user', text: `${items} sipariş etmek istiyorum` },
          { from: 'bot', text: `${items}. Toplam: ${total} TL. Siparişiniz alınmıştır. Teslimat için adresinizi alabilir miyim?` },
        ])
        setPhase('chat')
        setStep(0)
        setScriptDone(true)
        return
      }
      setMenuAutoPhase(p => p + 1)
    }, current.delay)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuAutoPhase, phase, started])

  return (
    <section ref={sectionRef} id="demo" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <span className="text-gradient text-sm font-semibold tracking-widest uppercase">AI Web Chat + QR Menu</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4">Dijital Menü ile Sipariş<br />ve Yapay Zeka Desteği</h2>
          <p className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto">Menüden ürünleri seçin, sepete ekleyin, ödemeye geçin. AI asistan adres alır, ödeme linki gönderir ve siparişi tamamlar.</p>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-3xl overflow-hidden transition-all duration-500 animate-fade-in">
            <div className="px-5 py-4 border-b border-[#1a2332] flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="ml-3 text-sm text-gray-400">Bruskapp AI - Dijital Menü & Sohbet</span>
              {cart.length > 0 && phase === 'menu' && (
                <span className="ml-auto px-3 py-1 bg-blue-600/20 text-blue-400 rounded-lg text-xs">
                  Sepet ({cart.reduce((s, c) => s + c.qty, 0)})
                </span>
              )}
            </div>

            {phase === 'menu' ? (
              <div className="flex flex-col lg:flex-row">
                <div className="flex-1 p-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {products.map((p, i) => {
                      const inCart = cart.find(c => c.name === p.name)
                      return (
                        <div key={i} className={'bg-[#0a0e14] rounded-xl p-3 border transition-all ' + (inCart ? 'border-emerald-500/50' : 'border-[#1a2332]')}>
                          <div className="text-3xl mb-2">{p.emoji}</div>
                          <h4 className="text-white text-sm font-medium">{p.name}</h4>
                          <p className="text-blue-400 text-sm font-semibold mt-1">{p.price} TL</p>
                          <div className="mt-2">
                            {inCart ? (
                              <div className="flex items-center justify-center gap-1">
                                <span className="w-full py-1.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-lg text-center">{inCart.qty} adet</span>
                              </div>
                            ) : (
                              <div className="w-full py-1.5 bg-[#1a2332] text-gray-500 text-xs rounded-lg text-center">-</div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                {cart.length > 0 && (
                  <div className="lg:w-64 border-t lg:border-t-0 lg:border-l border-[#1a2332] p-4 bg-[#0a0e14]/50">
                    <h4 className="text-white text-sm font-semibold mb-3">Sepetiniz</h4>
                    <div className="space-y-2 mb-4">
                      {cart.map((c, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div>
                            <p className="text-white text-xs">{c.name}</p>
                            <p className="text-gray-500 text-xs">{c.qty} x {c.price} TL</p>
                          </div>
                          <p className="text-blue-400 text-xs font-semibold">{c.qty * c.price} TL</p>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-[#1a2332] pt-2">
                      <div className="flex justify-between">
                        <span className="text-white text-sm font-semibold">Toplam</span>
                        <span className="text-blue-400 text-sm font-bold">{cart.reduce((s, c) => s + c.price * c.qty, 0)} TL</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-4 space-y-3 min-h-[360px] max-h-[440px] overflow-y-auto">
                {messages.map((msg, i) => (
                  <div key={i} className={'flex animate-fade-in ' + (msg.from === 'user' ? 'justify-end' : 'justify-start')}>
                    <div className={'max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ' + (msg.from === 'user' ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-[#1a2332] text-gray-300 rounded-bl-sm')}>{msg.text}</div>
                  </div>
                ))}
                {typing && (
                  <div className="flex justify-start">
                    <div className="bg-[#1a2332] rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{animationDelay:'0s'}} />
                      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{animationDelay:'0.15s'}} />
                      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{animationDelay:'0.3s'}} />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <p className="text-center text-xs text-gray-600 mt-4">Siparişler ve konuşmalar backend API&apos;ye kaydedilir ve panelde görüntülenir.</p>
        </div>
      </div>
    </section>
  )
}
