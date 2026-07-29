'use client'
import { useState, useEffect } from 'react'
import { Minus, Plus } from 'lucide-react'

export default function MenuPage({ params }: { params: { slug: string } }) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useState<Record<string, number>>({})
  const [selectedCategory, setSelectedCategory] = useState('')

  useEffect(() => {
    fetch(`/api/storefront/${params.slug}`).then(r => r.ok ? r.json() : null).then(d => {
      setData(d)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [params.slug])

  if (loading) return <div className="min-h-screen bg-[#0a0e14] flex items-center justify-center"><div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" /></div>
  if (!data) return <div className="min-h-screen bg-[#0a0e14] flex items-center justify-center"><p className="text-gray-500">Menü bulunamadı</p></div>

  const primary = data.primaryColor || '#10b981'
  const secondary = data.secondaryColor || '#065f46'
  const categories = Array.from(new Set((data.products || []).map((p: any) => p.category).filter(Boolean))) as string[]
  const filtered = selectedCategory ? data.products.filter((p: any) => p.category === selectedCategory) : data.products
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0)

  return (
    <div className="min-h-screen bg-[#0a0e14]">
      {/* Header */}
      <div className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${primary}, ${secondary})` }}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative px-6 py-12 text-center">
          {data.logoUrl && <img src={data.logoUrl} className="w-20 h-20 rounded-2xl mx-auto mb-4 object-cover shadow-lg" />}
          <h1 className="text-2xl font-bold text-white">{data.name}</h1>
          <p className="text-white/70 text-sm mt-1">Dijital Menü</p>
        </div>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="sticky top-0 z-10 bg-[#0a0e14]/95 backdrop-blur-xl border-b border-[#1a2332] px-4 py-3 overflow-x-auto">
          <div className="flex gap-2">
            <button onClick={() => setSelectedCategory('')}
              className={'px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ' + (!selectedCategory ? 'text-white' : 'text-gray-500 hover:text-white')}
              style={!selectedCategory ? { background: primary } : {}}>Tümü</button>
            {categories.map(c => (
              <button key={c} onClick={() => setSelectedCategory(c)}
                className={'px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ' + (selectedCategory === c ? 'text-white' : 'text-gray-500 hover:text-white')}
                style={selectedCategory === c ? { background: primary } : {}}>{c}</button>
            ))}
          </div>
        </div>
      )}

      {/* Products */}
      <div className="px-4 py-4 space-y-3 pb-24">
        {filtered.length === 0 && <p className="text-gray-500 text-center py-8">Bu kategoride ürün bulunamadı</p>}
        {filtered.map((p: any) => (
          <div key={p.id} className="flex items-center gap-4 p-4 rounded-2xl bg-[#0d1117]/80 border border-[#1a2332]">
            {p.image && <img src={p.image} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />}
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-medium text-sm">{p.name}</h3>
              {p.description && <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{p.description}</p>}
              <p className="text-emerald-400 font-bold text-sm mt-1">₺{p.price}</p>
            </div>
            {cart[p.id] ? (
              <div className="flex items-center gap-2 bg-[#080b12]/60 rounded-xl border border-[#1a2332] p-1">
                <button onClick={() => { const c = { ...cart }; if (c[p.id] <= 1) delete c[p.id]; else c[p.id]--; setCart(c) }} className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-white rounded-lg"><Minus size={14} /></button>
                <span className="text-white text-sm font-medium w-5 text-center">{cart[p.id]}</span>
                <button onClick={() => setCart({ ...cart, [p.id]: (cart[p.id] || 0) + 1 })} className="w-7 h-7 flex items-center justify-center text-white rounded-lg" style={{ background: primary }}><Plus size={14} /></button>
              </div>
            ) : (
              <button onClick={() => setCart({ ...cart, [p.id]: 1 })} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-white text-xs font-medium" style={{ background: primary }}>
                <Plus size={14} /> Sepet
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Cart Bar */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-20 p-4 bg-[#0a0e14]/95 backdrop-blur-xl border-t border-[#1a2332]">
          <div className="max-w-lg mx-auto flex items-center justify-between">
            <p className="text-white text-sm font-medium">{totalItems} ürün</p>
            <button disabled className="px-6 py-2.5 rounded-xl text-white text-sm font-semibold opacity-60" style={{ background: primary }}>
              Sipariş Ver (Yakında)
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
