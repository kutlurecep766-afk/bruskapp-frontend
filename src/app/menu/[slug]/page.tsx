'use client'
import { useState, useEffect } from 'react'

interface CartItem {
  product: any
  qty: number
}

export default function MenuPage({ params }: { params: { slug: string } }) {
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

  useEffect(() => {
    fetch(`/api/storefront/${params.slug}`, { cache: 'no-store' }).then(r => r.ok ? r.json() : null).then(d => {
      setData(d)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [params.slug])

  const addToCart = (product: any, count = 1) => {
    setCart(prev => {
      const found = prev.find(i => i.product.id === product.id)
      if (found) return prev.map(i => i.product.id === product.id ? { ...i, qty: i.qty + count } : i)
      return [...prev, { product, qty: count }]
    })
    setSelectedProduct(null)
    setQty(1)
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
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenantId: data.id,
          platform: 'QR Menü',
          customerName: form.name.trim(),
          customerContact: form.phone.trim(),
          products: cart.map(i => ({ name: i.product.name, price: parseFloat(i.product.price) || 0, quantity: i.qty })),
          totalAmount: Math.round(cartTotal * 100) / 100,
          note: 'Ödeme: ' + form.payment + ' | Adres: ' + form.address.trim(),
          tableNumber: null,
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
    <div className="min-h-screen bg-[#f8f6f1] flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-amber-600 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!data) return (
    <div className="min-h-screen bg-[#f8f6f1] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-[#e8e4db] flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </div>
        <p className="text-gray-500 text-sm font-medium">Menü bulunamadı</p>
      </div>
    </div>
  )

  const categories = Array.from(new Set((data.products || []).map((p: any) => p.category).filter(Boolean))) as string[]
  const filtered = selectedCategory ? data.products.filter((p: any) => p.category === selectedCategory) : data.products
  const payments = ['Kapıda Ödeme', 'Kapıda Banka/Kredi Kartı']

  return (
    <div className="min-h-screen bg-[#f8f6f1] pb-24">
      {/* Banner - tam görünür */}
      {data.bannerUrl ? (
        <div className="relative w-full md:h-80 lg:h-96 overflow-hidden bg-[#f8f6f1]">
          <img src={data.bannerUrl} className="w-full h-auto md:h-full md:object-cover block" alt="" />
        </div>
      ) : (
        <div className="w-full h-40 md:h-56 bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center">
          <svg className="w-12 h-12 text-amber-300/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </div>
      )}

      {/* Kategoriler */}
      {categories.length > 0 && (
        <div className="sticky top-0 z-10 bg-[#f8f6f1]/95 backdrop-blur-xl border-b border-amber-100/50 px-3 md:px-4 py-2.5 md:py-3 overflow-x-auto">
          <div className="flex gap-1.5 md:gap-2 max-w-2xl mx-auto">
            <button onClick={() => setSelectedCategory('')}
              className={'px-3 md:px-5 py-1.5 md:py-2 rounded-full text-[11px] md:text-xs font-semibold transition-all whitespace-nowrap ' + (!selectedCategory ? 'bg-amber-600 text-white shadow-md' : 'text-amber-800 hover:text-amber-900 bg-amber-100/70 hover:bg-amber-200/70')}>Tümü</button>
            {categories.map(c => (
              <button key={c} onClick={() => setSelectedCategory(c)}
                className={'px-3 md:px-5 py-1.5 md:py-2 rounded-full text-[11px] md:text-xs font-semibold transition-all whitespace-nowrap ' + (selectedCategory === c ? 'bg-amber-600 text-white shadow-md' : 'text-amber-800 hover:text-amber-900 bg-amber-100/70 hover:bg-amber-200/70')}>{c}</button>
            ))}
          </div>
        </div>
      )}

      {/* Ürünler */}
      <div className="max-w-2xl mx-auto px-3 md:px-4 py-4 md:py-6">
        {filtered.length === 0 && (
          <div className="text-center py-12 md:py-16">
            <p className="text-amber-800/60 text-xs md:text-sm">Bu kategoride ürün bulunamadı</p>
          </div>
        )}
        <div className="grid grid-cols-2 gap-2.5 md:gap-4">
          {filtered.map((p: any) => {
            const isDiscounted = p.originalPrice && parseFloat(p.originalPrice) > parseFloat(p.price)
            return (
              <div key={p.id} onClick={() => { setSelectedProduct(p); setQty(1) }} className="flex flex-col rounded-xl md:rounded-2xl bg-white border border-amber-100/60 shadow-sm hover:shadow-md transition-shadow cursor-pointer active:scale-[0.98] transition-transform overflow-hidden">
                {p.image && (
                  <div className="w-full aspect-square overflow-hidden bg-[#f8f6f1]">
                    <img src={p.image} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" alt={p.name} />
                  </div>
                )}
                <div className="p-2.5 md:p-4 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-1.5">
                    <h3 className="text-amber-950 font-semibold text-[11px] md:text-sm leading-tight flex-1">{p.name}</h3>
                    <div className="text-right flex-shrink-0">
                      {isDiscounted ? (
                        <div className="flex flex-col items-end">
                          <span className="text-amber-900 font-bold text-[11px] md:text-sm whitespace-nowrap">₺{p.price}</span>
                          <span className="text-amber-400 line-through text-[9px] md:text-[11px] whitespace-nowrap">₺{p.originalPrice}</span>
                        </div>
                      ) : (
                        <span className="text-amber-900 font-bold text-[11px] md:text-sm whitespace-nowrap">₺{p.price}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                    {p.weight && (
                      <span className="inline-flex items-center gap-1 px-1.5 md:px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[8px] md:text-[10px] font-semibold border border-amber-200/60">
                        <span className="w-1 h-1 rounded-full bg-amber-400/70" />
                        {p.weight.replace(/\D/g, '')} gram
                      </span>
                    )}
                    {isDiscounted && (
                      <span className="px-1.5 py-0.5 rounded-full bg-red-50 text-red-500 text-[8px] md:text-[10px] font-semibold border border-red-200/50">İndirimli</span>
                    )}
                  </div>
                  {p.description && (
                    <p className="text-[9px] md:text-[11px] text-amber-800/70 mt-1.5 leading-relaxed line-clamp-2">{p.description}</p>
                  )}
                  <button
                    onClick={(e) => { e.stopPropagation(); addToCart(p) }}
                    className="mt-2.5 w-full py-2 rounded-xl bg-amber-600 hover:bg-amber-700 active:scale-[0.98] transition-all text-white text-[11px] md:text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 4.6a1 1 0 00.9 1.4H20M10 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" /></svg>
                    Sepete Ekle
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Ürün Detay Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedProduct(null)}>
          <div className="relative w-full md:max-w-lg bg-white rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden transition-all duration-200" onClick={e => e.stopPropagation()}>
            <div className="md:hidden h-1.5 w-12 bg-amber-200 rounded-full mx-auto mt-3" />
            <button onClick={() => setSelectedProduct(null)} className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-amber-800 hover:bg-white shadow-sm transition-all">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            {selectedProduct.image && (
              <div className="w-full aspect-square md:aspect-video bg-[#f8f6f1]">
                <img src={selectedProduct.image} className="w-full h-full object-cover" alt={selectedProduct.name} />
              </div>
            )}
            <div className="p-5 md:p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-amber-950 font-bold text-lg md:text-xl leading-tight">{selectedProduct.name}</h2>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    {selectedProduct.weight && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
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
                      <span className="text-amber-900 font-bold text-lg md:text-xl whitespace-nowrap">₺{selectedProduct.price}</span>
                      <span className="text-amber-400 line-through text-sm whitespace-nowrap">₺{selectedProduct.originalPrice}</span>
                    </div>
                  ) : (
                    <span className="text-amber-900 font-bold text-lg md:text-xl whitespace-nowrap">₺{selectedProduct.price}</span>
                  )}
                </div>
              </div>
              {selectedProduct.description && (
                <p className="text-sm md:text-base text-amber-800/80 mt-3 leading-relaxed pl-3 border-l-2 border-amber-300/40 font-medium italic">{selectedProduct.description}</p>
              )}

              {/* Miktar + Sepete Ekle */}
              <div className="flex items-center gap-3 mt-5">
                <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/70 rounded-xl p-1">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-8 h-8 rounded-lg bg-white shadow-sm text-amber-800 font-bold text-lg hover:bg-amber-100 transition-colors">−</button>
                  <span className="w-8 text-center text-amber-950 font-bold text-sm">{qty}</span>
                  <button onClick={() => setQty(q => q + 1)} className="w-8 h-8 rounded-lg bg-white shadow-sm text-amber-800 font-bold text-lg hover:bg-amber-100 transition-colors">+</button>
                </div>
                <button
                  onClick={() => addToCart(selectedProduct, qty)}
                  className="flex-1 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 active:scale-[0.98] transition-all text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-md">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 4.6a1 1 0 00.9 1.4H20M10 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" /></svg>
                  Sepete Ekle — ₺{(parseFloat(selectedProduct.price) * qty).toFixed(2)}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sepet Çubuğu */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 px-3 md:px-4 pb-3 md:pb-4 pointer-events-none">
          <button
            onClick={() => setShowCart(true)}
            className="pointer-events-auto w-full max-w-2xl mx-auto flex items-center justify-between gap-3 px-4 md:px-5 py-3.5 rounded-2xl bg-amber-950 text-amber-50 shadow-2xl hover:bg-amber-900 active:scale-[0.99] transition-all">
            <div className="flex items-center gap-3">
              <span className="relative">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 4.6a1 1 0 00.9 1.4H20M10 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" /></svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center">{cartCount}</span>
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
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowCart(false)}>
          <div className="relative w-full md:max-w-lg bg-white rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col transition-all duration-200" onClick={e => e.stopPropagation()}>
            <div className="md:hidden h-1.5 w-12 bg-amber-200 rounded-full mx-auto mt-3" />
            <div className="flex items-center justify-between px-5 md:px-6 pt-4 pb-3 border-b border-amber-100/60">
              <h2 className="text-amber-950 font-bold text-lg">Sepetim</h2>
              <button onClick={() => setShowCart(false)} className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-800 hover:bg-amber-100 transition-all">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 md:px-6 py-4 space-y-3">
              {cart.length === 0 && (
                <div className="text-center py-10 text-amber-800/50 text-sm">Sepetiniz boş</div>
              )}
              {cart.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3 bg-amber-50/60 border border-amber-100/60 rounded-2xl p-3">
                  {item.product.image ? (
                    <img src={item.product.image} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" alt={item.product.name} />
                  ) : (
                    <div className="w-14 h-14 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-amber-400 text-lg font-bold">₺</span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-amber-950 font-semibold text-sm truncate">{item.product.name}</p>
                    <p className="text-amber-700 text-xs mt-0.5">₺{(parseFloat(item.product.price) || 0).toFixed(2)} / adet</p>
                  </div>
                  <div className="flex items-center gap-1 bg-white border border-amber-200/70 rounded-lg p-0.5">
                    <button onClick={() => updateQty(item.product.id, -1)} className="w-7 h-7 rounded-md text-amber-800 font-bold hover:bg-amber-100 transition-colors">−</button>
                    <span className="w-7 text-center text-amber-950 font-bold text-sm">{item.qty}</span>
                    <button onClick={() => updateQty(item.product.id, 1)} className="w-7 h-7 rounded-md text-amber-800 font-bold hover:bg-amber-100 transition-colors">+</button>
                  </div>
                  <div className="text-right flex-shrink-0 w-16">
                    <p className="text-amber-900 font-bold text-sm">₺{((parseFloat(item.product.price) || 0) * item.qty).toFixed(2)}</p>
                    <button onClick={() => removeFromCart(item.product.id)} className="text-amber-400 hover:text-red-500 text-[10px] font-medium mt-0.5 transition-colors">Kaldır</button>
                  </div>
                </div>
              ))}
            </div>

            {cart.length > 0 && (
              <div className="px-5 md:px-6 py-4 border-t border-amber-100/60 bg-[#fdfbf7]">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-amber-800/70 text-sm">Toplam</span>
                  <span className="text-amber-950 font-bold text-xl">₺{cartTotal.toFixed(2)}</span>
                </div>
                <button
                  onClick={openCheckout}
                  className="w-full py-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 active:scale-[0.99] transition-all text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md">
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
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full md:max-w-lg bg-white rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col transition-all duration-200">
            {orderResult ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h2 className="text-amber-950 font-bold text-xl">Siparişiniz Alındı!</h2>
                <p className="text-amber-800/70 text-sm mt-2">Sipariş numaranız: <span className="font-bold text-amber-950">#{orderResult.id}</span></p>
                <p className="text-amber-800/70 text-xs mt-1">İşletme siparişinizi en kısa sürede hazırlayacaktır.</p>
                <button
                  onClick={() => { setCheckoutOpen(false); setOrderResult(null) }}
                  className="mt-6 w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 transition-all text-white font-semibold text-sm">
                  Menüye Dön
                </button>
              </div>
            ) : (
              <>
                <div className="md:hidden h-1.5 w-12 bg-amber-200 rounded-full mx-auto mt-3" />
                <div className="flex items-center justify-between px-5 md:px-6 pt-4 pb-3 border-b border-amber-100/60">
                  <h2 className="text-amber-950 font-bold text-lg">Sipariş Bilgileri</h2>
                  <button onClick={() => setCheckoutOpen(false)} className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-800 hover:bg-amber-100 transition-all">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto px-5 md:px-6 py-4 space-y-4">
                  {/* Sipariş Özeti */}
                  <div className="bg-amber-50/60 border border-amber-100/60 rounded-2xl p-4">
                    <p className="text-amber-800/70 text-[11px] font-semibold uppercase tracking-wide mb-2">Sipariş Özeti</p>
                    <div className="space-y-1.5">
                      {cart.map((item) => (
                        <div key={item.product.id} className="flex justify-between text-sm">
                          <span className="text-amber-900">{item.qty} × {item.product.name}</span>
                          <span className="text-amber-950 font-semibold">₺{((parseFloat(item.product.price) || 0) * item.qty).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-sm mt-3 pt-3 border-t border-amber-200/60">
                      <span className="text-amber-800/70">Toplam</span>
                      <span className="text-amber-950 font-bold text-base">₺{cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* İletişim Bilgileri */}
                  <div>
                    <p className="text-amber-800/70 text-[11px] font-semibold uppercase tracking-wide mb-2">İletişim Bilgileri</p>
                    <div className="space-y-3">
                      <input
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="Ad Soyad *"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-amber-200/70 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-amber-950 text-sm placeholder:text-amber-300 transition-all"
                      />
                      <input
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        placeholder="Telefon Numarası *"
                        inputMode="tel"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-amber-200/70 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-amber-950 text-sm placeholder:text-amber-300 transition-all"
                      />
                      <textarea
                        value={form.address}
                        onChange={e => setForm({ ...form, address: e.target.value })}
                        placeholder="Teslimat Adresi *"
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-amber-200/70 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-amber-950 text-sm placeholder:text-amber-300 transition-all resize-none"
                      />
                    </div>
                  </div>

                  {/* Ödeme Yöntemi */}
                  <div>
                    <p className="text-amber-800/70 text-[11px] font-semibold uppercase tracking-wide mb-2">Ödeme Yöntemi</p>
                    <div className="grid grid-cols-1 gap-2">
                      {payments.map((p) => (
                        <label key={p} onClick={() => setForm({ ...form, payment: p })}
                          className={'flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all ' + (form.payment === p ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-200' : 'bg-white border-amber-200/70 hover:border-amber-300')}>
                          <span className={'w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ' + (form.payment === p ? 'border-amber-600' : 'border-amber-200')}>
                            {form.payment === p && <span className="w-2 h-2 rounded-full bg-amber-600" />}
                          </span>
                          <span className="text-amber-950 text-sm font-medium">{p}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-5 md:px-6 py-4 border-t border-amber-100/60 bg-[#fdfbf7]">
                  <button
                    onClick={submitOrder}
                    disabled={submitting || !form.name.trim() || !form.phone.trim() || !form.address.trim()}
                    className="w-full py-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 active:scale-[0.99] transition-all text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md disabled:opacity-40 disabled:cursor-not-allowed">
                    {submitting ? (
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      'Siparişi Tamamla — ₺' + cartTotal.toFixed(2)
                    )}
                  </button>
                  <p className="text-center text-[10px] text-amber-400 mt-2">Ödeme teslimat sırasında yapılacaktır.</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
