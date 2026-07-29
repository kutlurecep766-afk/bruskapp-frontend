'use client'
import { useState, useEffect } from 'react'

export default function MenuPage({ params }: { params: { slug: string } }) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
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

  return (
    <div className="min-h-screen bg-[#0a0e14]">
      {/* Banner */}
      {data.bannerUrl && (
        <div className="w-full h-48 md:h-64 overflow-hidden">
          <img src={data.bannerUrl} className="w-full h-full object-cover" alt="Banner" />
        </div>
      )}

      {/* Header */}
      <div className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${primary}, ${secondary})` }}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative px-6 py-12 text-center">
          {data.logoUrl && <img src={data.logoUrl} className="w-20 h-20 rounded-2xl mx-auto mb-4 object-cover shadow-lg" />}
          <h1 className="text-2xl font-bold text-white">{data.name}</h1>
          <p className="text-white/70 text-sm mt-1">Menü</p>
        </div>
      </div>

      {/* Kategoriler */}
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

      {/* Ürünler */}
      <div className="px-4 py-4 space-y-3 pb-12">
        {filtered.length === 0 && <p className="text-gray-500 text-center py-8">Bu kategoride ürün bulunamadı</p>}
        {filtered.map((p: any) => (
          <div key={p.id} className="flex items-center gap-4 p-4 rounded-2xl bg-[#0d1117]/80 border border-[#1a2332]">
            {p.image && <img src={p.image} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />}
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-medium text-sm">{p.name}</h3>
              {p.description && <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{p.description}</p>}
              <p className="text-emerald-400 font-bold text-sm mt-1">₺{p.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
