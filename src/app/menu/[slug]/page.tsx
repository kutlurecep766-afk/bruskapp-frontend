'use client'
import { useState, useEffect } from 'react'

export default function MenuPage({ params }: { params: { slug: string } }) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  useEffect(() => {
    fetch(`/api/storefront/${params.slug}`, { cache: 'no-store' }).then(r => r.ok ? r.json() : null).then(d => {
      setData(d)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [params.slug])

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

  return (
    <div className="min-h-screen bg-[#f8f6f1]">
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
      <div className="max-w-2xl mx-auto px-3 md:px-4 py-4 md:py-6 space-y-2.5 md:space-y-3 pb-16">
        {filtered.length === 0 && (
          <div className="text-center py-12 md:py-16">
            <p className="text-amber-800/60 text-xs md:text-sm">Bu kategoride ürün bulunamadı</p>
          </div>
        )}
        {filtered.map((p: any) => {
          const isDiscounted = p.originalPrice && parseFloat(p.originalPrice) > parseFloat(p.price)
          return (
            <div key={p.id} onClick={() => setSelectedProduct(p)} className="flex items-center gap-4 md:gap-5 p-4 md:p-5 rounded-xl md:rounded-2xl bg-white border border-amber-100/60 shadow-sm hover:shadow-md transition-shadow cursor-pointer active:scale-[0.99] transition-transform">
              {p.image && (
                <div className="w-36 h-36 md:w-52 md:h-52 rounded-xl md:rounded-2xl overflow-hidden flex-shrink-0 bg-[#f8f6f1] shadow-inner">
                  <img src={p.image} className="w-full h-full object-cover" alt={p.name} />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 md:gap-3">
                  <div className="min-w-0">
                    <h3 className="text-amber-950 font-semibold text-sm md:text-base leading-tight">{p.name}</h3>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      {p.weight && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-[10px] md:text-[11px] font-semibold border border-amber-200/60 shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400/70" />
                          {p.weight.replace(/\D/g, '')} gram
                        </span>
                      )}
                      {isDiscounted && (
                        <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-500 text-[9px] md:text-[10px] font-semibold border border-red-200/50">İndirimli</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    {isDiscounted ? (
                      <div className="flex flex-col items-end">
                        <span className="text-amber-900 font-bold text-sm md:text-base whitespace-nowrap">₺{p.price}</span>
                        <span className="text-amber-400 line-through text-[10px] md:text-xs whitespace-nowrap">₺{p.originalPrice}</span>
                      </div>
                    ) : (
                      <span className="text-amber-900 font-bold text-sm md:text-base whitespace-nowrap">₺{p.price}</span>
                    )}
                  </div>
                </div>
                {p.description && (
                  <p className="text-[11px] md:text-[13px] text-amber-800/80 mt-2 leading-relaxed pl-2.5 border-l-2 border-amber-300/30 font-medium italic">{p.description}</p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Ürün Detay Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedProduct(null)}>
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-200" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedProduct(null)} className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-amber-800 hover:bg-white shadow-sm transition-all">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            {selectedProduct.image && (
              <div className="w-full aspect-square bg-[#f8f6f1]">
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
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
