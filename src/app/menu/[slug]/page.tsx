'use client'
import { useState, useEffect } from 'react'

export default function MenuPage({ params }: { params: { slug: string } }) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('')

  useEffect(() => {
    fetch(`/api/storefront/${params.slug}`, { cache: 'no-store' }).then(r => r.ok ? r.json() : null).then(d => {
      setData(d)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [params.slug])

  if (loading) return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0a0e14] flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!data) return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0a0e14] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-[#1a2332] flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </div>
        <p className="text-gray-500 text-sm font-medium">Menü bulunamadı</p>
      </div>
    </div>
  )

  const primary = data.primaryColor || '#10b981'
  const secondary = data.secondaryColor || '#065f46'
  const categories = Array.from(new Set((data.products || []).map((p: any) => p.category).filter(Boolean))) as string[]
  const filtered = selectedCategory ? data.products.filter((p: any) => p.category === selectedCategory) : data.products

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0a0e14]">
      {/* Banner */}
      {data.bannerUrl ? (
        <div className="relative w-full h-48 md:h-72 overflow-hidden">
          <img src={data.bannerUrl} className="w-full h-full object-cover" alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6">
            <h1 className="text-xl md:text-4xl font-bold text-white drop-shadow-lg">{data.name}</h1>
          </div>
        </div>
      ) : (
        <div className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${primary}, ${secondary})` }}>
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative px-4 md:px-6 py-12 md:py-20 text-center">
            <h1 className="text-2xl md:text-4xl font-bold text-white drop-shadow-sm">{data.name}</h1>
            <p className="text-white/80 text-xs md:text-sm mt-2 font-medium tracking-wide">MENÜ</p>
          </div>
        </div>
      )}

      {/* Kategoriler */}
      {categories.length > 0 && (
        <div className="sticky top-0 z-10 bg-white/95 dark:bg-[#0a0e14]/95 backdrop-blur-xl border-b border-gray-200 dark:border-[#1a2332] px-3 md:px-4 py-2.5 md:py-3 overflow-x-auto">
          <div className="flex gap-1.5 md:gap-2 max-w-2xl mx-auto">
            <button onClick={() => setSelectedCategory('')}
              className={'px-3 md:px-5 py-1.5 md:py-2 rounded-full text-[11px] md:text-xs font-semibold transition-all whitespace-nowrap ' + (!selectedCategory ? 'text-white shadow-md' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-[#1a2332] hover:bg-gray-200 dark:hover:bg-[#253040]')}
              style={!selectedCategory ? { background: primary } : {}}>Tümü</button>
            {categories.map(c => (
              <button key={c} onClick={() => setSelectedCategory(c)}
                className={'px-3 md:px-5 py-1.5 md:py-2 rounded-full text-[11px] md:text-xs font-semibold transition-all whitespace-nowrap ' + (selectedCategory === c ? 'text-white shadow-md' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-[#1a2332] hover:bg-gray-200 dark:hover:bg-[#253040]')}
                style={selectedCategory === c ? { background: primary } : {}}>{c}</button>
            ))}
          </div>
        </div>
      )}

      {/* Ürünler */}
      <div className="max-w-2xl mx-auto px-3 md:px-4 py-4 md:py-6 space-y-2.5 md:space-y-3 pb-16">
        {filtered.length === 0 && (
          <div className="text-center py-12 md:py-16">
            <p className="text-gray-400 text-xs md:text-sm">Bu kategoride ürün bulunamadı</p>
          </div>
        )}
        {filtered.map((p: any) => (
          <div key={p.id} className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl md:rounded-2xl bg-white dark:bg-[#0d1117]/80 border border-gray-100 dark:border-[#1a2332] shadow-sm hover:shadow-md transition-shadow">
            {p.image && (
              <div className="w-14 h-14 md:w-20 md:h-20 rounded-lg md:rounded-xl overflow-hidden flex-shrink-0 bg-gray-50 dark:bg-[#080b12]">
                <img src={p.image} className="w-full h-full object-cover" alt={p.name} />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 md:gap-3">
                <div>
                  <h3 className="text-gray-900 dark:text-white font-medium text-xs md:text-sm leading-tight">{p.name}</h3>
                  {p.weight && (
                    <span className="inline-block mt-1 px-1.5 md:px-2 py-0.5 rounded-md bg-gray-100 dark:bg-[#1a2332] text-gray-500 dark:text-gray-400 text-[9px] md:text-[10px] font-medium tracking-tight">{p.weight}</span>
                  )}
                </div>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold text-xs md:text-sm whitespace-nowrap">₺{p.price}</span>
              </div>
              {p.description && (
                <p className="text-[11px] md:text-xs text-gray-500 dark:text-gray-500 mt-1 md:mt-1.5 line-clamp-2 leading-relaxed">{p.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
