'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

interface CartItem {
  product: any
  qty: number
}

function MenuContent({ params }: { params: { slug: string } }) {
  const searchParams = useSearchParams()
  const masa = searchParams.get('masa')

  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [qty, setQty] = useState(1)
  const [cart, setCart] = useState<CartItem[]>([])
  const [showCart, setShowCart] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', address: '', payment: 'Kapıda Ödeme' })
  const [submitting, setSubmitting] = useState(false)
  const [orderResult, setOrderResult] = useState<any>(null)
  const [justAdded, setJustAdded] = useState<string | null>(null)
  const [cartBump, setCartBump] = useState(0)

  useEffect(() => {
    fetch(`/api/storefront/${params.slug}`, { cache: 'no-store' }).then(r => r.ok ? r.json() : null).then(d => {
      setData(d)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [params.slug])

  const addToCart = (product: any, count = 1) => {
    if (product.status === 'soldout' || product.status === 'preparing') return
    setCart(prev => {
      const found = prev.find(i => i.product.id === product.id)
      if (found) return prev.map(i => i.product.id === product.id ? { ...i, qty: i.qty + count } : i)
      return [...prev, { product, qty: count }]
    })
    setJustAdded(product.id)
    setCartBump(b => b + 1)
    setTimeout(() => setJustAdded(null), 1400)
    if (selectedProduct) {
      setTimeout(() => { setSelectedProduct(null); setQty(1) }, 450)
    } else {
      setQty(1)
    }
  }

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(i => i.product.id !== productId))
  }

  const updateQty = (productId: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.product.id !== productId) return i
      const next = i.qty + delta
      return { ...i, qty: next <= 0 ? 1 : next }
    }))
  }

  const cartCount = cart.reduce((a, i) => a + i.qty, 0)
  const cartTotal = cart.reduce((a, i) => a + (parseFloat(i.product.price) || 0) * i.qty, 0)

  const openCheckout = () => {
    setShowCart(false)
    setCheckoutOpen(true)
    setOrderResult(null)
  }

  const submitOrder = async () => {
    if (!form.name.trim() || !form.phone.trim()) return
    if (!masa && !form.address.trim()) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenantId: data.id,
          platform: masa ? 'Masa' : 'QR Menü',
          customerName: form.name.trim(),
          customerContact: form.phone.trim(),
          products: cart.map(i => ({ name: i.product.name, price: parseFloat(i.product.price) || 0, quantity: i.qty })),
          totalAmount: Math.round(cartTotal * 100) / 100,
          note: 'Ödeme: ' + form.payment + (masa ? '' : ' | Adres: ' + form.address.trim()),
          tableNumber: masa ? parseInt(masa) : null,
        }),
      })
      const order = await res.json()
      if (!res.ok) throw new Error(order?.message || 'Sipariş alınamadı')
      setOrderResult(order)
      setCart([])
      setForm({ name: '', phone: '', address: '', payment: 'Kapıda Ödeme' })
    } catch (e: any) {
      alert('Sipariş gönderilemedi: ' + (e?.message || 'Lütfen tekrar deneyin'))
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-[#eef4ff] flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!data) return (
    <div className="min-h-screen bg-[#eef4ff] flex items-center justify-center px-4">
      <div className="text-center animate-pop-in">
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </div>
        <p className="text-gray-500 text-sm font-medium">Menü bulunamadı</p>
      </div>
    </div>
  )

  const categories = Array.from(new Set((data.products || []).map((p: any) => p.category).filter(Boolean))) as string[]
  const filtered = selectedCategory ? data.products.filter((p: any) => p.category === selectedCategory) : data.products
  const payments = ['Kapıda Ödeme', 'Kapıda Banka/Kredi Kartı']

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#dbe9ff] via-[#eef4ff] to-[#e3eeff] pb-24">
      {/* Banner - tam görünür */}
      {data.bannerUrl ? (
        <div className="relative w-full md:h-80 lg:h-96 overflow-hidden bg-gradient-to-b from-blue-100 to-transparent animate-fade-in">
          <img src={data.bannerUrl} className="w-full h-auto md:h-full md:object-cover block animate-fade-in-up" style={{ animationDuration: '0.9s' }} alt="" />
        </div>
      ) : (
        <div className="w-full h-40 md:h-56 bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 flex items-center justify-center animate-fade-in">
          <div className="flex flex-col items-center gap-2">
            <svg className="w-12 h-12 text-white/80 animate-breathe" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" /></svg>
            <span className="text-white/70 text-[11px] md:text-sm font-semibold tracking-wide animate-fade-in-up" style={{ animationDuration: '0.7s' }}>Menümüz</span>
          </div>
        </div>
      )}

      {/* Masa + Sosyal Rozet */}
      {(masa || data.googleReviewUrl || data.instagramUrl) && (
        <div className="max-w-2xl mx-auto px-3 md:px-4 pt-4 flex items-center justify-between gap-3 flex-wrap animate-fade-in-up" style={{ animationDuration: '0.6s' }}>
          <div className="flex items-center gap-2">
            {masa ? (
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-700 text-white text-xs md:text-sm font-bold shadow-lg shadow-blue-700/20">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h2m4 0h2m-8 4h6a2 2 0 002-2v-7a2 2 0 00-2-2H7a2 2 0 00-2 2v7a2 2 0 002 2z" /></svg>
                Masa {masa}
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-blue-700 text-xs md:text-sm font-bold border border-blue-200 shadow-sm">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z" /></svg>
                Online Sipariş
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {data.googleReviewUrl && (
              <a href={data.googleReviewUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white border border-blue-100 text-gray-700 text-xs font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-blue-300 transition-all active:scale-95">
                <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 000 12c0 1.77.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                Google Yorum
              </a>
            )}
            {data.instagramUrl && (
              <a href={data.instagramUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white border border-blue-100 text-gray-700 text-xs font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-blue-300 transition-all active:scale-95">
                <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#E4405F" d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 3.36.23 1.23 2.37 1.07 6.07 1.01 7.35 1 7.76 1 11s.01 3.65.07 4.93c.16 3.7 2.29 5.84 5.98 6 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c3.69-.16 5.82-2.3 5.98-6 .06-1.28.07-1.69.07-4.93s-.01-3.65-.07-4.93C22.82 2.37 20.69.23 16.99.07 15.71.01 15.3 0 12.02 0h-.02z" /><path fill="#E4405F" d="M12 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8z" /><path fill="#E4405F" d="M19.85 5.59a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" /></svg>
                Instagram
              </a>
            )}
          </div>
        </div>
      )}

      {/* Kategoriler */}
      {categories.length > 0 && (
        <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-xl border-b border-blue-100 px-3 md:px-4 py-2.5 md:py-3 overflow-x-auto no-scrollbar mt-2 animate-fade-in shadow-sm" style={{ animationDuration: '0.5s' }}>
          <div className="flex gap-1.5 md:gap-2 max-w-2xl mx-auto">
            <button onClick={() => setSelectedCategory('')}
              className={'px-3 md:px-5 py-1.5 md:py-2 rounded-full text-[11px] md:text-xs font-semibold transition-all whitespace-nowrap ' + (!selectedCategory ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' : 'bg-white text-blue-700 border border-blue-200 hover:bg-blue-50 hover:border-blue-300')}>Tümü</button>
            {categories.map(c => (
              <button key={c} onClick={() => setSelectedCategory(c)}
                className={'px-3 md:px-5 py-1.5 md:py-2 rounded-full text-[11px] md:text-xs font-semibold transition-all whitespace-nowrap ' + (selectedCategory === c ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' : 'bg-white text-blue-700 border border-blue-200 hover:bg-blue-50 hover:border-blue-300')}>{c}</button>
            ))}
          </div>
        </div>
      )}

      {/* Ürünler */}
      <div className="max-w-2xl mx-auto px-3 md:px-4 py-4 md:py-6">
        {filtered.length === 0 && (
          <div className="text-center py-12 md:py-16 animate-fade-in">
            <p className="text-gray-500 text-xs md:text-sm">Bu kategoride ürün bulunamadı</p>
          </div>
        )}
        <div key={selectedCategory || 'all'} className="grid grid-cols-2 gap-2.5 md:gap-4 animate-fade-in">
          {filtered.map((p: any, idx: number) => {
            const isDiscounted = p.originalPrice && parseFloat(p.originalPrice) > parseFloat(p.price)
            const isSoldout = p.status === 'soldout'
            const isPreparing = p.status === 'preparing'
            return (
              <div key={p.id} style={{ animationDelay: `${Math.min(idx, 8) * 60}ms` }} onClick={() => { if (!isSoldout && !isPreparing) { setSelectedProduct(p); setQty(1) } }} className={'animate-fade-in-up flex flex-col rounded-xl md:rounded-2xl bg-white border shadow-sm transition-all overflow-hidden ' + (isSoldout || isPreparing ? 'opacity-60 border-blue-100 cursor-not-allowed' : 'border-blue-100 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-600/10 hover:-translate-y-1 cursor-pointer active:scale-[0.98]')}>
                <div className="relative">
                  {p.image && (
                    <div className="w-full aspect-square overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100/50">
                      <img src={p.image} className={'w-full h-full object-cover ' + (isSoldout ? 'grayscale' : 'hover:scale-105 transition-transform duration-300')} alt={p.name} />
                    </div>
                  )}
                  {isSoldout && (
                    <span className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-blue-900/80 backdrop-blur text-white text-[9px] md:text-[11px] font-bold uppercase tracking-wide">Tükendi</span>
                  )}
                  {isPreparing && (
                    <span className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-orange-500/90 backdrop-blur text-white text-[9px] md:text-[11px] font-bold uppercase tracking-wide">Hazırlıkta</span>
                  )}
                </div>
                <div className="p-2.5 md:p-4 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-1.5">
                    <h3 className={'font-semibold text-[11px] md:text-sm leading-tight flex-1 ' + (isSoldout ? 'text-gray-400 line-through' : 'text-gray-900')}>{p.name}</h3>
                    <div className="text-right flex-shrink-0">
                      {isDiscounted ? (
                        <div className="flex flex-col items-end">
                          <span className="text-blue-700 font-bold text-[11px] md:text-sm whitespace-nowrap">₺{p.price}</span>
                          <span className="text-gray-400 line-through text-[9px] md:text-[11px] whitespace-nowrap">₺{p.originalPrice}</span>
                        </div>
                      ) : (
                        <span className="text-blue-700 font-bold text-[11px] md:text-sm whitespace-nowrap">₺{p.price}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                    {p.weight && (
                      <span className="inline-flex items-center gap-1 px-1.5 md:px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[8px] md:text-[10px] font-semibold border border-blue-100">
                        <span className="w-1 h-1 rounded-full bg-blue-500" />
                        {p.weight.replace(/\D/g, '')} gram
                      </span>
                    )}
                    {isDiscounted && (
                      <span className="px-1.5 py-0.5 rounded-full bg-red-50 text-red-500 text-[8px] md:text-[10px] font-semibold border border-red-200/50">İndirimli</span>
                    )}
                  </div>
                  {p.description && (
                    <p className={'text-[9px] md:text-[11px] mt-1.5 leading-relaxed line-clamp-2 ' + (isSoldout ? 'text-gray-400' : 'text-gray-500')}>{p.description}</p>
                  )}
                  {isSoldout ? (
                    <div className="mt-2.5 w-full py-2 rounded-xl bg-gray-100 text-gray-400 text-[11px] md:text-xs font-semibold flex items-center justify-center gap-1.5 cursor-not-allowed">
                      Tükendi
                    </div>
                  ) : isPreparing ? (
                    <div className="mt-2.5 w-full py-2 rounded-xl bg-orange-50 text-orange-600 text-[11px] md:text-xs font-semibold flex items-center justify-center gap-1.5 cursor-not-allowed">
                      <span className="w-3 h-3 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
                      Hazırlıkta
                    </div>
                  ) : justAdded === p.id ? (
                    <button
                      onClick={(e) => { e.stopPropagation() }}
                      className="mt-2.5 w-full py-2 rounded-xl bg-green-600 text-white text-[11px] md:text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-green-600/30 animate-pop-in">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      Eklendi
                    </button>
                  ) : (
                    <button
                      onClick={(e) => { e.stopPropagation(); addToCart(p) }}
                      className="mt-2.5 w-full py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 active:scale-[0.98] transition-all text-white text-[11px] md:text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/30 shine">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 4.6a1 1 0 00.9 1.4H20M10 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" /></svg>
                      Sepete Ekle
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Ürün Detay Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4 bg-blue-950/50 backdrop-blur-sm animate-fade-in" onClick={() => { if (justAdded !== selectedProduct.id) setSelectedProduct(null) }}>
          <div className="relative w-full md:max-w-lg bg-white rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden transition-all duration-200 animate-slide-up" onClick={e => e.stopPropagation()}>
            <div className="md:hidden h-1.5 w-12 bg-blue-200 rounded-full mx-auto mt-3" />
            <button onClick={() => setSelectedProduct(null)} className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-blue-700 hover:bg-white shadow-sm transition-all active:scale-90">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            {selectedProduct.image && (
              <div className="w-full aspect-square md:aspect-video bg-gradient-to-br from-blue-50 to-blue-100/50">
                <img src={selectedProduct.image} className="w-full h-full object-cover" alt={selectedProduct.name} />
              </div>
            )}
            <div className="p-5 md:p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-gray-900 font-bold text-lg md:text-xl leading-tight">{selectedProduct.name}</h2>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    {selectedProduct.weight && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        {selectedProduct.weight.replace(/\D/g, '')} gram
                      </span>
                    )}
                    {(selectedProduct.originalPrice && parseFloat(selectedProduct.originalPrice) > parseFloat(selectedProduct.price)) && (
                      <span className="px-2.5 py-1 rounded-full bg-red-50 text-red-500 text-xs font-semibold border border-red-200/50">İndirimli</span>
                    )}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  {(selectedProduct.originalPrice && parseFloat(selectedProduct.originalPrice) > parseFloat(selectedProduct.price)) ? (
                    <div className="flex flex-col items-end">
                      <span className="text-blue-700 font-bold text-lg md:text-xl whitespace-nowrap">₺{selectedProduct.price}</span>
                      <span className="text-gray-400 line-through text-sm whitespace-nowrap">₺{selectedProduct.originalPrice}</span>
                    </div>
                  ) : (
                    <span className="text-blue-700 font-bold text-lg md:text-xl whitespace-nowrap">₺{selectedProduct.price}</span>
                  )}
                </div>
              </div>
              {selectedProduct.description && (
                <p className="text-sm md:text-base text-gray-500 mt-3 leading-relaxed pl-3 border-l-2 border-blue-200 font-medium">{selectedProduct.description}</p>
              )}

              {/* Miktar + Sepete Ekle */}
              <div className="flex items-center gap-3 mt-5">
                <div className="flex items-center gap-1 bg-blue-50 border border-blue-100 rounded-xl p-1">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-8 h-8 rounded-lg bg-white shadow-sm text-blue-700 font-bold text-lg hover:bg-blue-100 transition-colors active:scale-90">−</button>
                  <span className="w-8 text-center text-gray-900 font-bold text-sm">{qty}</span>
                  <button onClick={() => setQty(q => q + 1)} className="w-8 h-8 rounded-lg bg-white shadow-sm text-blue-700 font-bold text-lg hover:bg-blue-100 transition-colors active:scale-90">+</button>
                </div>
                {justAdded === selectedProduct.id ? (
                  <button
                    className="flex-1 py-3 rounded-xl bg-green-600 text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-md shadow-green-600/30 animate-pop-in">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    Eklendi
                  </button>
                ) : (
                  <button
                    onClick={() => addToCart(selectedProduct, qty)}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 active:scale-[0.98] transition-all text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-md shadow-blue-600/30 shine">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 4.6a1 1 0 00.9 1.4H20M10 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" /></svg>
                    Sepete Ekle — ₺{(parseFloat(selectedProduct.price) * qty).toFixed(2)}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sepet Çubuğu */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 px-3 md:px-4 pb-3 md:pb-4 pointer-events-none animate-fade-in-up" style={{ animationDuration: '0.4s' }}>
          <button
            onClick={() => setShowCart(true)}
            className="pointer-events-auto w-full max-w-2xl mx-auto flex items-center justify-between gap-3 px-4 md:px-5 py-3.5 rounded-2xl bg-gradient-to-r from-blue-800 to-blue-950 text-white shadow-2xl shadow-blue-900/40 hover:from-blue-700 hover:to-blue-900 active:scale-[0.99] transition-all">
            <div className="flex items-center gap-3">
              <span key={cartBump} className="relative animate-bump">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 4.6a1 1 0 00.9 1.4H20M10 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" /></svg>
                {cartCount > 0 && (
                  <span key={cartBump} className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center animate-bump">{cartCount}</span>
                )}
              </span>
              <span className="font-semibold text-sm md:text-base">Sepeti Gör</span>
            </div>
            <span className="font-bold text-sm md:text-base">₺{cartTotal.toFixed(2)}</span>
          </button>
        </div>
      )}

      {/* Sepet Modal */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4 bg-blue-950/50 backdrop-blur-sm animate-fade-in" onClick={() => setShowCart(false)}>
          <div className="relative w-full md:max-w-lg bg-white rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col transition-all duration-200 animate-slide-up" onClick={e => e.stopPropagation()}>
            <div className="md:hidden h-1.5 w-12 bg-blue-200 rounded-full mx-auto mt-3" />
            <div className="flex items-center justify-between px-5 md:px-6 pt-4 pb-3 border-b border-blue-100">
              <h2 className="text-gray-900 font-bold text-lg">Sepetim</h2>
              <button onClick={() => setShowCart(false)} className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 hover:bg-blue-100 transition-all active:scale-90">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 md:px-6 py-4 space-y-3">
              {cart.length === 0 && (
                <div className="text-center py-10 text-gray-400 text-sm">Sepetiniz boş</div>
              )}
              {cart.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3 bg-gradient-to-r from-blue-50/80 to-white border border-blue-100 rounded-2xl p-3 animate-fade-in-up" style={{ animationDuration: '0.35s' }}>
                  {item.product.image ? (
                    <img src={item.product.image} className="w-14 h-14 rounded-xl object-cover flex-shrink-0 border border-blue-100" alt={item.product.name} />
                  ) : (
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-400 text-lg font-bold">₺</span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 font-semibold text-sm truncate">{item.product.name}</p>
                    <p className="text-gray-500 text-xs mt-0.5">₺{(parseFloat(item.product.price) || 0).toFixed(2)} / adet</p>
                  </div>
                  <div className="flex items-center gap-1 bg-white border border-blue-200 rounded-lg p-0.5">
                    <button onClick={() => updateQty(item.product.id, -1)} className="w-7 h-7 rounded-md text-blue-700 font-bold hover:bg-blue-50 transition-colors active:scale-90">−</button>
                    <span className="w-7 text-center text-gray-900 font-bold text-sm">{item.qty}</span>
                    <button onClick={() => updateQty(item.product.id, 1)} className="w-7 h-7 rounded-md text-blue-700 font-bold hover:bg-blue-50 transition-colors active:scale-90">+</button>
                  </div>
                  <div className="text-right flex-shrink-0 w-16">
                    <p className="text-blue-700 font-bold text-sm">₺{((parseFloat(item.product.price) || 0) * item.qty).toFixed(2)}</p>
                    <button onClick={() => removeFromCart(item.product.id)} className="text-gray-400 hover:text-red-500 text-[10px] font-medium mt-0.5 transition-colors">Kaldır</button>
                  </div>
                </div>
              ))}
            </div>

            {cart.length > 0 && (
              <div className="px-5 md:px-6 py-4 border-t border-blue-100 bg-white">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-500 text-sm">Toplam</span>
                  <span className="text-blue-700 font-bold text-xl">₺{cartTotal.toFixed(2)}</span>
                </div>
                <button
                  onClick={openCheckout}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 active:scale-[0.99] transition-all text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-600/30 shine">
                  Ödemeye Geç
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" /></svg>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Ödeme Modal */}
      {checkoutOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4 bg-blue-950/50 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full md:max-w-lg bg-white rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col transition-all duration-200 animate-slide-up">
            {orderResult ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4 animate-pop-in">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h2 className="text-gray-900 font-bold text-xl animate-fade-in-up">Siparişiniz Alındı!</h2>
                <p className="text-gray-500 text-sm mt-2">Sipariş numaranız: <span className="font-bold text-blue-700">#{orderResult.id}</span></p>
                {masa && <p className="text-gray-500 text-xs mt-1">Masa {masa} numaralı masanıza en kısa sürede servis edilecektir.</p>}
                {!masa && <p className="text-gray-500 text-xs mt-1">İşletme siparişinizi en kısa sürede hazırlayacaktır.</p>}
                <button
                  onClick={() => { setCheckoutOpen(false); setOrderResult(null) }}
                  className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 active:scale-[0.99] transition-all text-white font-semibold text-sm shadow-md shadow-blue-600/30 shine">
                  Menüye Dön
                </button>
              </div>
            ) : (
              <>
                <div className="md:hidden h-1.5 w-12 bg-blue-200 rounded-full mx-auto mt-3" />
                <div className="flex items-center justify-between px-5 md:px-6 pt-4 pb-3 border-b border-blue-100">
                  <h2 className="text-gray-900 font-bold text-lg">Sipariş Bilgileri</h2>
                  <button onClick={() => setCheckoutOpen(false)} className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 hover:bg-blue-100 transition-all active:scale-90">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto px-5 md:px-6 py-4 space-y-4">
                  {/* Sipariş Özeti */}
                  <div className="bg-gradient-to-r from-blue-50/80 to-white border border-blue-100 rounded-2xl p-4 animate-fade-in-up" style={{ animationDuration: '0.35s' }}>
                    <p className="text-blue-700 text-[11px] font-semibold uppercase tracking-wide mb-2">Sipariş Özeti</p>
                    <div className="space-y-1.5">
                      {cart.map((item) => (
                        <div key={item.product.id} className="flex justify-between text-sm">
                          <span className="text-gray-700">{item.qty} × {item.product.name}</span>
                          <span className="text-gray-900 font-semibold">₺{((parseFloat(item.product.price) || 0) * item.qty).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-sm mt-3 pt-3 border-t border-blue-100">
                      <span className="text-gray-500">Toplam</span>
                      <span className="text-blue-700 font-bold text-base">₺{cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* İletişim Bilgileri */}
                  <div className="animate-fade-in-up" style={{ animationDuration: '0.4s' }}>
                    <p className="text-blue-700 text-[11px] font-semibold uppercase tracking-wide mb-2">İletişim Bilgileri</p>
                    <div className="space-y-3">
                      <input
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="Ad Soyad *"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-gray-900 text-sm placeholder:text-gray-400 transition-all"
                      />
                      <input
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        placeholder="Telefon Numarası *"
                        inputMode="tel"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-gray-900 text-sm placeholder:text-gray-400 transition-all"
                      />
                      {!masa && (
                        <textarea
                          value={form.address}
                          onChange={e => setForm({ ...form, address: e.target.value })}
                          placeholder="Teslimat Adresi *"
                          rows={3}
                          className="w-full px-4 py-3 rounded-xl bg-white border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-gray-900 text-sm placeholder:text-gray-400 transition-all resize-none"
                        />
                      )}
                      {masa && (
                        <p className="text-xs text-blue-700 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 flex items-center gap-2">
                          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h2m4 0h2m-8 4h6a2 2 0 002-2v-7a2 2 0 00-2-2H7a2 2 0 00-2 2v7a2 2 0 002 2z" /></svg>
                          Siparişiniz Masa {masa}'ya teslim edilecek.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Ödeme Yöntemi */}
                  <div className="animate-fade-in-up" style={{ animationDuration: '0.45s' }}>
                    <p className="text-blue-700 text-[11px] font-semibold uppercase tracking-wide mb-2">Ödeme Yöntemi</p>
                    <div className="grid grid-cols-1 gap-2">
                      {payments.map((p) => (
                        <label key={p} onClick={() => setForm({ ...form, payment: p })}
                          className={'flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all ' + (form.payment === p ? 'bg-blue-50 border-blue-600 ring-2 ring-blue-100' : 'bg-white border-blue-200 hover:border-blue-300')}>
                          <span className={'w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ' + (form.payment === p ? 'border-blue-600' : 'border-gray-300')}>
                            {form.payment === p && <span className="w-2 h-2 rounded-full bg-blue-600 animate-pop-in" />}
                          </span>
                          <span className="text-gray-900 text-sm font-medium">{p}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-5 md:px-6 py-4 border-t border-blue-100 bg-white">
                  <button
                    onClick={submitOrder}
                    disabled={submitting || !form.name.trim() || !form.phone.trim() || (!masa && !form.address.trim())}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 active:scale-[0.99] transition-all text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-600/30 disabled:opacity-40 disabled:cursor-not-allowed shine">
                    {submitting ? (
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      'Siparişi Tamamla — ₺' + cartTotal.toFixed(2)
                    )}
                  </button>
                  <p className="text-center text-[10px] text-gray-400 mt-2">{masa ? 'Ödeme masada teslim sırasında yapılacaktır.' : 'Ödeme teslimat sırasında yapılacaktır.'}</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {/* Footer */}
      <footer className="w-full py-6 md:py-8 mt-2">
        <div className="max-w-2xl mx-auto px-3 md:px-4 flex flex-col items-center gap-2 animate-fade-in-up" style={{ animationDuration: '0.8s' }}>
          <div className="flex items-center">
            <img src="/logo.svg" alt="BRUSKAPP" className="h-5 md:h-6" />
            <span className="text-sm md:text-base font-black tracking-tight leading-none whitespace-nowrap">
              <span className="text-gray-900">BRUSK</span><span className="text-blue-600">APP QR</span>
            </span>
          </div>
          <p className="text-[10px] md:text-[11px] text-gray-400 font-medium">QR Menü ile dijital sipariş</p>
        </div>
      </footer>
    </div>
  )
}

export default function MenuPage({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#eef4ff] flex items-center justify-center"><div className="w-10 h-10 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>}>
      <MenuContent params={params} />
    </Suspense>
  )
}
