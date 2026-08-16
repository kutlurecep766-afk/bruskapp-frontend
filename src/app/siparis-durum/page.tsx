'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

const STATUS_STEPS: Record<string, { label: string; desc: string }> = {
  pending: { label: 'Sipariş Alındı', desc: 'Siparişiniz işletmeye iletildi' },
  preparing: { label: 'Hazırlanıyor', desc: 'İşletme siparişinizi hazırlıyor' },
  out_for_delivery: { label: 'Yola Çıktı', desc: 'Siparişiniz yola çıktı, dağıtımda' },
  delivered: { label: 'Teslim Edildi', desc: 'Siparişiniz teslim edildi' },
  completed: { label: 'Tamamlandı', desc: 'Siparişiniz tamamlandı' },
  cancelled: { label: 'İptal Edildi', desc: 'Siparişiniz iptal edildi' },
}

const STATUS_ORDER = ['pending', 'preparing', 'out_for_delivery', 'delivered', 'completed', 'cancelled']

function TrackContent() {
  const params = useSearchParams()
  const [code, setCode] = useState(params.get('kod') || '')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searched, setSearched] = useState(false)

  const search = async (e?: React.FormEvent) => {
    e?.preventDefault()
    const c = code.trim()
    if (!/^\d{6}$/.test(c)) {
      setError('Lütfen 6 haneli sipariş takip kodunu girin')
      setResult(null)
      setSearched(true)
      return
    }
    setLoading(true)
    setError('')
    setResult(null)
    setSearched(true)
    try {
      const res = await fetch('/api/orders/tracking/' + c)
      const data = await res.json()
      if (!res.ok) {
        setError(data?.message || 'Sipariş bulunamadı')
      } else {
        setResult(data)
      }
    } catch {
      setError('Sorgulama sırasında bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const c = params.get('kod')
    if (c) {
      setCode(c)
      search()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isOnline = result?.platform === 'QR Menü' || result?.platform === 'Online' || result?.platform === 'Online Sipariş'
  const steps = isOnline
    ? ['pending', 'preparing', 'out_for_delivery', 'delivered']
    : ['pending', 'preparing', 'delivered']
  const currentIndex = result ? steps.indexOf(result.status) : -1
  const isCancelled = result?.status === 'cancelled'
  const cancelledIndex = STATUS_ORDER.indexOf('cancelled')

  const StepBadge = ({ step, done, active, cancelled }: any) => {
    const meta = STATUS_STEPS[step]
    return (
      <div className="flex flex-col items-center flex-1 min-w-0">
        <div className={'w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-500 ' + (cancelled
          ? 'border-red-300 bg-red-50'
          : done
            ? 'border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-600/30'
            : active
              ? 'border-blue-600 bg-blue-50 text-blue-600 shadow-md shadow-blue-600/20 animate-pulse'
              : 'border-gray-200 bg-white text-gray-300')}>
          {cancelled ? (
            <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          ) : done ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          ) : (
            <span className="w-2 h-2 rounded-full bg-current" />
          )}
        </div>
        <p className={'mt-2 text-center text-[10px] md:text-xs font-bold ' + (cancelled ? 'text-red-500' : done ? 'text-blue-700' : active ? 'text-blue-700' : 'text-gray-400')}>{meta.label}</p>
      </div>
    )
  }

  const trackColor = result?.primaryColor || '#2563eb'
  const trackColor2 = result?.secondaryColor || '#1d4ed8'

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#dbe9ff] via-[#eef4ff] to-[#e3eeff] pb-24">
      <div className="max-w-xl mx-auto px-4 pt-8 md:pt-12" style={{ ['--tc' as any]: trackColor }}>
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-3xl" style={{ background: `linear-gradient(135deg, ${trackColor}, ${trackColor2})` }}>
            <svg className="w-8 h-8 mx-auto mt-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mt-4">Sipariş Takibi</h1>
          <p className="text-sm text-gray-500 mt-1">Siparişinizin anlık durumunu öğrenin</p>
        </div>

        {/* Search */}
        <form onSubmit={search} className="bg-white border border-blue-100 rounded-2xl shadow-lg shadow-blue-600/5 p-5 animate-fade-in-up" style={{ animationDuration: '0.4s' }}>
          <label className="block text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-2">6 Haneli Takip Kodu</label>
          <div className="flex gap-2">
            <input
              value={code}
              onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="Örn: 452819"
              inputMode="numeric"
              maxLength={6}
              className="flex-1 text-center text-xl tracking-[0.35em] font-bold text-gray-900 bg-blue-50/60 border border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 placeholder:text-gray-300 placeholder:text-base placeholder:tracking-normal"
            />
            <button type="submit" disabled={loading}
              className="px-6 py-3 rounded-xl text-white text-sm font-bold shadow-md transition-all hover:scale-105 active:scale-95 disabled:opacity-60"
              style={{ background: `linear-gradient(135deg, ${trackColor}, ${trackColor2})`, boxShadow: `0 10px 25px -5px ${trackColor}66` }}>
              {loading ? (
                <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : 'Sorgula'}
            </button>
          </div>
        </form>

        {/* Error */}
        {error && (
          <div className="mt-5 bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3 animate-fade-in-up" style={{ animationDuration: '0.3s' }}>
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /></svg>
            </div>
            <p className="text-sm text-red-600 font-medium flex-1">{error}</p>
          </div>
        )}

        {/* Empty state */}
        {!error && !result && searched && !loading && (
          <div className="mt-5 bg-white border border-blue-100 rounded-2xl p-6 text-center animate-fade-in-up" style={{ animationDuration: '0.3s' }}>
            <p className="text-gray-400 text-sm">Sorguladığınız koda ait sipariş yok.</p>
            <p className="text-gray-400 text-xs mt-1">Kodun doğru olduğundan emin olun veya işletmeyle iletişime geçin.</p>
          </div>
        )}
        {!error && !result && !searched && !loading && (
          <div className="mt-5 bg-white border border-blue-100 rounded-2xl p-6 text-center animate-fade-in-up" style={{ animationDuration: '0.3s' }}>
            <svg className="w-10 h-10 text-blue-200 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p className="text-gray-500 text-sm">Sipariş verdiğinizde size verilen takip kodunu girin.</p>
            <p className="text-gray-400 text-xs mt-1">Kod menüdeki sipariş onay ekranında görünür.</p>
          </div>
        )}

        {/* Result */}
        {result && !error && (
          <div className="mt-5 space-y-4 animate-fade-in-up" style={{ animationDuration: '0.4s' }}>
            <div className="bg-white border border-blue-100 rounded-2xl shadow-lg shadow-blue-600/5 overflow-hidden">
              <div className="p-4 md:p-5 flex items-center justify-between" style={{ background: `linear-gradient(135deg, ${trackColor}, ${trackColor2})` }}>
                <div className="text-center flex-1 min-w-0">
                  <p className="text-[10px] text-white/70 uppercase tracking-wider font-semibold">İşletme</p>
                  <p className="text-white font-bold text-xs md:text-sm mt-0.5 truncate">{result.businessName || 'İşletme'}</p>
                </div>
                <div className="text-center flex-1 min-w-0 border-x border-white/20">
                  <p className="text-[10px] text-white/70 uppercase tracking-wider font-semibold">Sipariş No</p>
                  <p className="text-white font-bold text-xs md:text-sm mt-0.5 truncate">#{result.id}</p>
                </div>
                <div className="text-center flex-1 min-w-0">
                  <p className="text-[10px] text-white/70 uppercase tracking-wider font-semibold">Takip Kodu</p>
                  <p className="text-white font-bold text-sm md:text-base mt-0.5 tracking-widest">{result.trackingCode}</p>
                </div>
              </div>

              {/* Timeline */}
              <div className="p-5">
                {isCancelled ? (
                  <div className="flex items-center">
                    {['pending', 'preparing'].map(step => (
                      <div key={step} className="flex items-center flex-1">
                        <StepBadge step={step} done={result && STATUS_ORDER.indexOf(result.status) > STATUS_ORDER.indexOf(step)} />
                        <div className="w-6 md:w-10 h-0.5 bg-gradient-to-r from-blue-600/40 to-red-300" />
                      </div>
                    ))}
                    <StepBadge step="cancelled" cancelled />
                  </div>
                ) : (
                  <div className="flex items-center">
                    {steps.map((step, i) => (
                      <div key={step} className="flex items-center flex-1 last:flex-none">
                        <StepBadge step={step} done={i < currentIndex} active={i === currentIndex} />
                        {i < steps.length - 1 && (
                          <div className="w-6 md:w-10 h-0.5 mx-1 rounded-full transition-all duration-500" style={{ background: i < currentIndex ? trackColor : '#e5e7eb' }} />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-5 text-center">
                  {isCancelled ? (
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 text-sm font-bold border border-red-200">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                      {STATUS_STEPS.cancelled.desc}
                    </span>
                  ) : (
                    <p className="text-gray-700 text-sm font-medium">
                      <span className="font-bold" style={{ color: trackColor }}>{STATUS_STEPS[result.status]?.label || 'Güncelleniyor'}</span>
                      <span className="text-gray-400"> — {STATUS_STEPS[result.status]?.desc || 'Sipariş alındı'}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Items */}
              {result.products && result.products.length > 0 && (
                <div className="px-5 pb-5">
                  <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-4">
                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-2">Sipariş İçeriği</p>
                    <div className="space-y-2">
                      {(result.products as any[]).map((p: any, i: number) => (
                        <div key={i} className="flex items-center justify-between gap-3 text-sm">
                          <span className="text-gray-700 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">{p.quantity || 1}×</span>
                            {p.name}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-sm mt-3 pt-3 border-t border-blue-100">
                      <span className="text-gray-500">Toplam</span>
                      <span className="text-blue-700 font-bold">₺{Number(result.totalAmount || 0).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Customer note from business */}
              {result.customerNote && (
                <div className="px-5 pb-5">
                  <div className="rounded-2xl p-4" style={{ background: trackColor + '14', border: `1px solid ${trackColor}40` }}>
                    <p className="text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: trackColor }}>
                      İşletme Notu
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed">{result.customerNote}</p>
                  </div>
                </div>
              )}
            </div>

            <button onClick={() => { setResult(null); setSearched(false); setError('') }}
              className="w-full py-3 rounded-xl bg-white border border-blue-200 text-blue-700 text-sm font-bold shadow-sm hover:bg-blue-50 hover:border-blue-300 transition-all active:scale-[0.99]">
              Yeni Sorgulama
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function OrderTrackingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-[#dbe9ff] via-[#eef4ff] to-[#e3eeff] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <TrackContent />
    </Suspense>
  )
}