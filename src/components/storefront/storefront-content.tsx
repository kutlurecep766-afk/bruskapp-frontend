'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { ShoppingBag, X, Plus, Minus, Trash2, Search, SlidersHorizontal, ChevronDown, MapPin, Clock } from 'lucide-react'

interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  category: string
  stock: number
  active: boolean
}

interface StorefrontConfig {
  headerStyle?: 'light' | 'brand' | 'dark'
  bgColor?: string
  bannerImage?: string
  heroTitle?: string
  heroSubtitle?: string
  headerSubtitle?: string
}

interface Tenant {
  id: string
  name: string
  slug: string
  siteTitle: string
  primaryColor: string
  secondaryColor?: string
  logoUrl: string
  isConfigured: boolean
  storefrontConfig?: StorefrontConfig
}

interface CartItem {
  product: Product
  quantity: number
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(price)
}

export default function StorefrontContent({ tenant, products, mode, tableNumber }: { tenant: Tenant; products: Product[]; mode?: 'delivery' | 'qr'; tableNumber?: string }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'name'>('default')
  const [showSort, setShowSort] = useState(false)
  const [customerName, setCustomerName] = useState('')
  const [orderPlacing, setOrderPlacing] = useState(false)
  const [orderError, setOrderError] = useState('')
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [paying, setPaying] = useState(false)
  const [payError, setPayError] = useState('')
  const [sessionExpired, setSessionExpired] = useState(false)
  const [geoError, setGeoError] = useState('')
  const [geoChecking, setGeoChecking] = useState(false)
  const [timeLeft, setTimeLeft] = useState<number>(15 * 60)
  const [lockedTable, setLockedTable] = useState<string | undefined>(undefined)
  const lastActivityRef = useRef<number>(Date.now())
  const searchInputRef = useRef<HTMLInputElement>(null)
  const sortRef = useRef<HTMLDivElement>(null)

  const pc = tenant.primaryColor || '#6366f1'
  const sc = tenant.secondaryColor || '#0f0f1a'
  const cfg = (typeof tenant.storefrontConfig === 'string' ? JSON.parse(tenant.storefrontConfig) : tenant.storefrontConfig) || {}
  const headerStyle = cfg.headerStyle || 'dark'
  const bgColor = cfg.bgColor || '#080b12'
  const heroTitle = cfg.heroTitle || null
  const heroSubtitle = cfg.heroSubtitle || null
  const bannerImage = cfg.bannerImage || null
  const headerSubtitle = cfg.headerSubtitle || null

  useEffect(() => {
    const saved = localStorage.getItem(`cart-${tenant.slug}`)
    if (saved) try { setCart(JSON.parse(saved)) } catch {}
  }, [tenant.slug])

  useEffect(() => {
    localStorage.setItem(`cart-${tenant.slug}`, JSON.stringify(cart))
  }, [cart, tenant.slug])

  useEffect(() => {
    if (mobileSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [mobileSearchOpen])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setShowSort(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => {
    if (mode !== 'qr' || !tableNumber) return
    const storageKey = `qr-table-${tenant.slug}`
    const stored = sessionStorage.getItem(storageKey)
    if (!stored) {
      sessionStorage.setItem(storageKey, tableNumber)
      setLockedTable(tableNumber)
    } else {
      setLockedTable(stored)
      if (stored !== tableNumber) {
        setOrderError(`Bu QR kod Masa ${stored}'a ait. Lütfen doğru QR kodu okutun.`)
      }
    }
  }, [mode, tenant.slug])

  const updateActivity = useCallback(() => {
    lastActivityRef.current = Date.now()
    setSessionExpired(false)
  }, [])

  useEffect(() => {
    if (mode !== 'qr') return
    const handler = () => updateActivity()
    window.addEventListener('mousedown', handler)
    window.addEventListener('touchstart', handler)
    window.addEventListener('scroll', handler, { passive: true })
    window.addEventListener('keydown', handler)
    return () => {
      window.removeEventListener('mousedown', handler)
      window.removeEventListener('touchstart', handler)
      window.removeEventListener('scroll', handler)
      window.removeEventListener('keydown', handler)
    }
  }, [mode, updateActivity])

  useEffect(() => {
    if (mode !== 'qr') return
    updateActivity()
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - lastActivityRef.current) / 1000)
      const remaining = 15 * 60 - elapsed
      setTimeLeft(Math.max(0, remaining))
      if (remaining <= 0) {
        setSessionExpired(true)
        setCart([])
        localStorage.removeItem(`cart-${tenant.slug}`)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [mode, tenant.slug, updateActivity])

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id)
      if (existing) return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      return [...prev, { product, quantity: 1 }]
    })
    setCartOpen(true)
  }, [])

  const updateQuantity = useCallback((productId: string, delta: number) => {
    setCart(prev => prev.map(item => item.product.id === productId ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item).filter(item => item.quantity > 0))
  }, [])

  const removeFromCart = useCallback((productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId))
  }, [])

  const checkGeoAndPlace = useCallback(async (attemptGeo = true) => {
    if (cart.length === 0) return
    if (mode === 'qr' && !customerName.trim()) {
      setOrderError('Lütfen adınızı girin')
      return
    }

    updateActivity()

    if (sessionExpired) {
      setOrderError('Oturum süreniz doldu. Lütfen sayfayı yenileyin.')
      return
    }

    const restLat = cfg.latitude
    const restLng = cfg.longitude

    if (mode === 'qr' && restLat && restLng && attemptGeo) {
      setGeoChecking(true)
      setGeoError('')
      try {
        const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000,
          })
        })
        const dist = getDistance(
          pos.coords.latitude,
          pos.coords.longitude,
          restLat,
          restLng
        )
        if (dist > 200) {
          setGeoError('Sipariş vermek için işletmeye yakın olmalısınız. (Uzaklık: ' + Math.round(dist) + 'm)')
          setGeoChecking(false)
          return
        }
      } catch (e: any) {
        if (e.code === 1) {
          setGeoError('Konum izni vermezseniz sipariş veremezsiniz. Lütfen konum iznini açın.')
          setGeoChecking(false)
          return
        }
      }
      setGeoChecking(false)
    }

    setOrderPlacing(true)
    setOrderError('')
    try {
      const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
      const body: any = {
        tenantId: tenant.id,
        platform: mode === 'qr' ? 'Masa' : 'Web Mağaza',
        customerName: customerName.trim() || 'Müşteri',
        products: cart.map(item => ({ productId: item.product.id, name: item.product.name, price: item.product.price, quantity: item.quantity })),
        totalAmount: total,
        currency: 'TRY',
        note: mode === 'qr' ? `Masa ${lockedTable || tableNumber}` : '',
        status: 'pending',
      }
      const activeTable = lockedTable || tableNumber
      if (activeTable) body.tableNumber = parseInt(activeTable, 10)
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error('Sipariş oluşturulamadı')
      setCart([])
      setCartOpen(false)
      setOrderSuccess(true)
    } catch (e: any) {
      setOrderError(e.message || 'Bir hata oluştu')
    } finally {
      setOrderPlacing(false)
    }
  }, [cart, customerName, mode, tableNumber, lockedTable, tenant.id, sessionExpired, updateActivity, cfg.latitude, cfg.longitude])

  const placeOrder = useCallback(() => {
    checkGeoAndPlace(true)
  }, [checkGeoAndPlace])

  function getDistance(lat1: number, lng1: number, lat2: number, lng2: number) {
    const R = 6371000
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLng = (lng2 - lng1) * Math.PI / 180
    const a = Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng / 2) ** 2
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  }

  const payWithCard = async () => {
    setPaying(true)
    setPayError('')
    try {
      const res = await fetch('/api/payments/storefront/paytr/init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tenantSlug: tenant.slug, amount: cartTotal, description: `${tenant.siteTitle || tenant.name} - Sipariş` }),
      })
      if (res.ok) {
        const data = await res.json()
        if (data.url) window.location.href = data.url
        else setPayError('Ödeme bağlantısı oluşturulamadı')
      } else {
        const err = await res.json().catch(() => ({}))
        setPayError(err.message || 'Ödeme alınamıyor. İşletme henüz Sanal POS ayarları yapmamış.')
      }
    } catch {
      setPayError('Bağlantı hatası')
    } finally {
      setPaying(false)
    }
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const categories = Array.from(new Set(products.map(p => p.category).filter(Boolean)))

  let filteredProducts = products.filter(p => {
    if (!p.active) return false
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase()) && !p.description?.toLowerCase().includes(searchQuery.toLowerCase())) return false
    if (selectedCategory && p.category !== selectedCategory) return false
    return true
  })

  if (sortBy === 'price-asc') filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price)
  else if (sortBy === 'price-desc') filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price)
  else if (sortBy === 'name') filteredProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name))

  const sortOptions = [
    { value: 'default', label: 'Önerilen' },
    { value: 'price-asc', label: 'En Düşük Fiyat' },
    { value: 'price-desc', label: 'En Yüksek Fiyat' },
    { value: 'name', label: 'Ad (A-Z)' },
  ] as const

  const headerBg = '#0a0e1a'
  const headerText = '#f1f5f9'
  const headerMuted = 'rgba(148,163,184,0.6)'
  const headerBorder = 'rgba(148,163,184,0.08)'

  return (
    <div className="min-h-screen" style={{ backgroundColor: bgColor }}>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b" style={{ backgroundColor: 'rgba(10,14,26,0.92)', borderColor: headerBorder }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center gap-3">
              {tenant.logoUrl ? (
                <img src={tenant.logoUrl} alt="" className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl object-cover ring-1 ring-white/10" />
              ) : (
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg" style={{ backgroundColor: pc }}>
                  {(tenant.siteTitle || tenant.name || 'M')[0].toUpperCase()}
                </div>
              )}
              <div>
                <h1 className="text-sm sm:text-base font-semibold leading-tight" style={{ color: headerText }}>{tenant.siteTitle || tenant.name}</h1>
                <p className="text-[10px] sm:text-xs" style={{ color: headerMuted }}>{mode === 'qr' ? `Masa ${lockedTable || tableNumber} · QR Sipariş` : (headerSubtitle || 'Çevrimiçi mağaza')}</p>
              </div>
            </div>

            <div className="hidden md:flex items-center flex-1 max-w-md mx-6 lg:mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: headerMuted }} />
                <input
                  type="text"
                  placeholder="Ürün ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all border"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    borderColor: 'rgba(148,163,184,0.1)',
                    color: headerText,
                  }}
                />
              </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setMobileSearchOpen(true)}
                className="md:hidden p-2 rounded-xl transition-colors hover:bg-white/5"
                style={{ color: headerText }}
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 rounded-xl transition-colors hover:bg-white/5"
                style={{ color: headerText }}
              >
                <ShoppingBag className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-lg" style={{ backgroundColor: pc }}>
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {mobileSearchOpen && (
          <div className="md:hidden px-4 pb-4" style={{ borderTop: `1px solid ${headerBorder}` }}>
            <div className="relative w-full mt-3">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: headerMuted }} />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Ürün ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl text-sm outline-none border"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  borderColor: 'rgba(148,163,184,0.1)',
                  color: headerText,
                }}
              />
              <button
                onClick={() => { setMobileSearchOpen(false); setSearchQuery('') }}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: headerMuted }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="pt-16 sm:pt-20">
        {products.length > 0 && (
          <section className="relative overflow-hidden">
            {bannerImage ? (
              <div className="absolute inset-0">
                <img src={bannerImage} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${bgColor}dd 0%, ${bgColor}88 50%, ${bgColor}44 100%)` }} />
              </div>
            ) : (
              <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${sc} 0%, ${bgColor} 50%, ${pc}08 100%)` }} />
            )}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
              <div className="flex items-center gap-4 sm:gap-8">
                <div className="flex-1 min-w-0">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium mb-4 border" style={{ borderColor: 'rgba(148,163,184,0.15)', color: headerMuted, backgroundColor: 'rgba(255,255,255,0.03)' }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: pc }} />
                    {products.length} ürün
                  </div>
                  <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight" style={{ color: '#f1f5f9' }}>
                    {heroTitle || tenant.siteTitle || tenant.name}
                    {mode === 'qr' && (lockedTable || tableNumber) && (
                      <span className="inline-block ml-3 sm:ml-4 px-2.5 py-1 rounded-lg text-sm sm:text-base font-medium align-middle" style={{ backgroundColor: `${pc}20`, color: pc }}>Masa {lockedTable || tableNumber}</span>
                    )}
                  </h2>
                  <p className="mt-3 sm:mt-4 text-sm sm:text-base max-w-lg leading-relaxed" style={{ color: headerMuted }}>
                    {heroSubtitle || (mode === 'qr' ? 'Sepetinize ekleyin, siparişinizi oluşturun.' : 'Tüm ürünlerimizi keşfedin, beğendiklerinizi sepete ekleyin.')}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {(categories.length > 1 || products.length > 0) && (
          <div className="sm:hidden sticky z-40" style={{ top: '64px', backgroundColor: bgColor }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-none border-b" style={{ borderColor: 'rgba(148,163,184,0.08)' }}>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="shrink-0 px-4 py-1.5 rounded-lg text-xs font-medium transition-all border"
                  style={{
                    backgroundColor: selectedCategory === null ? pc : 'rgba(255,255,255,0.04)',
                    borderColor: selectedCategory === null ? pc : 'rgba(148,163,184,0.1)',
                    color: selectedCategory === null ? '#fff' : headerMuted,
                  }}
                >
                  Tümü
                </button>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className="shrink-0 px-4 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all border"
                    style={{
                      backgroundColor: selectedCategory === cat ? pc : 'rgba(255,255,255,0.04)',
                      borderColor: selectedCategory === cat ? pc : 'rgba(148,163,184,0.1)',
                      color: selectedCategory === cat ? '#fff' : headerMuted,
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
          {/* Toolbar: filters + sort (desktop) */}
          <div className="hidden sm:flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setSelectedCategory(null)}
                className="shrink-0 px-4 py-2 rounded-xl text-xs font-medium transition-all border"
                style={{
                  backgroundColor: selectedCategory === null ? pc : 'rgba(255,255,255,0.04)',
                  borderColor: selectedCategory === null ? pc : 'rgba(148,163,184,0.1)',
                  color: selectedCategory === null ? '#fff' : headerMuted,
                }}
              >
                Tümü
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="shrink-0 px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all border"
                  style={{
                    backgroundColor: selectedCategory === cat ? pc : 'rgba(255,255,255,0.04)',
                    borderColor: selectedCategory === cat ? pc : 'rgba(148,163,184,0.1)',
                    color: selectedCategory === cat ? '#fff' : headerMuted,
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative" ref={sortRef}>
              <button
                onClick={() => setShowSort(!showSort)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium border transition-all"
                style={{ borderColor: 'rgba(148,163,184,0.1)', color: headerMuted, backgroundColor: 'rgba(255,255,255,0.03)' }}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                {sortOptions.find(o => o.value === sortBy)?.label || 'Sırala'}
                <ChevronDown className={`w-3 h-3 transition-transform ${showSort ? 'rotate-180' : ''}`} />
              </button>
              {showSort && (
                <div className="absolute right-0 top-full mt-2 w-44 rounded-xl border shadow-2xl z-50 overflow-hidden" style={{ backgroundColor: '#0f1322', borderColor: 'rgba(148,163,184,0.1)' }}>
                  {sortOptions.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => { setSortBy(opt.value); setShowSort(false) }}
                      className="w-full text-left px-4 py-2.5 text-xs font-medium transition-colors hover:bg-white/5"
                      style={{ color: sortBy === opt.value ? pc : headerMuted }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile sort + filter bar */}
          <div className="flex sm:hidden items-center gap-2 pb-4 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1.5 shrink-0 px-3.5 py-2 rounded-xl text-xs font-medium border"
              style={{ borderColor: 'rgba(148,163,184,0.1)', color: headerMuted, backgroundColor: 'rgba(255,255,255,0.03)' }}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Kategori
            </button>
            <div className="relative shrink-0" ref={sortRef}>
              <button
                onClick={() => setShowSort(!showSort)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium border"
                style={{ borderColor: 'rgba(148,163,184,0.1)', color: headerMuted, backgroundColor: 'rgba(255,255,255,0.03)' }}
              >
                {sortOptions.find(o => o.value === sortBy)?.label || 'Sırala'}
                <ChevronDown className={`w-3 h-3 transition-transform ${showSort ? 'rotate-180' : ''}`} />
              </button>
              {showSort && (
                <div className="absolute left-0 top-full mt-2 w-40 rounded-xl border shadow-2xl z-50 overflow-hidden" style={{ backgroundColor: '#0f1322', borderColor: 'rgba(148,163,184,0.1)' }}>
                  {sortOptions.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => { setSortBy(opt.value); setShowSort(false) }}
                      className="w-full text-left px-4 py-2.5 text-xs font-medium transition-colors hover:bg-white/5"
                      style={{ color: sortBy === opt.value ? pc : headerMuted }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="shrink-0 px-3 py-2 rounded-xl text-xs font-medium"
                style={{ backgroundColor: pc, color: '#fff' }}
              >
                {selectedCategory} ×
              </button>
            )}
          </div>

          {/* Mobile category filter panel */}
          {showFilters && (
            <div className="sm:hidden mb-4 p-4 rounded-xl border" style={{ backgroundColor: '#0a0e1a', borderColor: 'rgba(148,163,184,0.1)' }}>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => { setSelectedCategory(null); setShowFilters(false) }}
                  className="px-3.5 py-2 rounded-lg text-xs font-medium transition-all border"
                  style={{
                    backgroundColor: selectedCategory === null ? pc : 'rgba(255,255,255,0.04)',
                    borderColor: selectedCategory === null ? pc : 'rgba(148,163,184,0.1)',
                    color: selectedCategory === null ? '#fff' : headerMuted,
                  }}
                >
                  Tümü
                </button>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => { setSelectedCategory(cat); setShowFilters(false) }}
                    className="px-3.5 py-2 rounded-lg text-xs font-medium transition-all border"
                    style={{
                      backgroundColor: selectedCategory === cat ? pc : 'rgba(255,255,255,0.04)',
                      borderColor: selectedCategory === cat ? pc : 'rgba(148,163,184,0.1)',
                      color: selectedCategory === cat ? '#fff' : headerMuted,
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 sm:py-24">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center border" style={{ borderColor: 'rgba(148,163,184,0.1)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                <Search className="w-6 h-6" style={{ color: headerMuted }} />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#f1f5f9' }}>
                {searchQuery ? 'Ürün bulunamadı' : 'Henüz ürün yok'}
              </h3>
              <p className="text-sm" style={{ color: headerMuted }}>
                {searchQuery ? 'Aramanızla eşleşen ürün bulunmuyor.' : 'Bu mağazaya henüz ürün eklenmemiş.'}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 text-sm font-medium underline underline-offset-4 transition-opacity hover:opacity-70"
                  style={{ color: pc }}
                >
                  Aramayı temizle
                </button>
              )}
            </div>
          ) : (
            <>
              <p className="text-xs mb-4 sm:hidden" style={{ color: headerMuted }}>
                {filteredProducts.length} ürün
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
                {filteredProducts.map((product, i) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                    accentColor={pc}
                    index={i}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      <footer className="border-t" style={{ borderColor: 'rgba(148,163,184,0.08)', backgroundColor: '#0a0e1a' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs" style={{ color: headerMuted }}>Bruskapp — Tüm hakları saklıdır. © {new Date().getFullYear()}</p>
          </div>
        </div>
      </footer>

      {cartOpen && (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
          <div className="absolute top-0 right-0 bottom-0 w-full max-w-md flex flex-col animate-slide-in-right" style={{ backgroundColor: '#0a0e1a' }}>
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 border-b shrink-0" style={{ borderColor: 'rgba(148,163,184,0.08)' }}>
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5" style={{ color: '#f1f5f9' }} />
                <h2 className="text-base font-semibold" style={{ color: '#f1f5f9' }}>Sepet</h2>
                <span className="text-xs" style={{ color: headerMuted }}>({cartCount} ürün)</span>
              </div>
              <button onClick={() => setCartOpen(false)} className="p-1.5 rounded-lg hover:bg-white/5 transition-colors">
                <X className="w-5 h-5" style={{ color: 'rgba(148,163,184,0.5)' }} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4 sm:py-5">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 border" style={{ borderColor: 'rgba(148,163,184,0.1)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                    <ShoppingBag className="w-6 h-6" style={{ color: 'rgba(148,163,184,0.3)' }} />
                  </div>
                  <p className="text-sm font-semibold mb-1" style={{ color: '#f1f5f9' }}>Sepetin boş</p>
                  <p className="text-xs" style={{ color: headerMuted }}>Ürün eklemek için ürünlere göz atın.</p>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {cart.map(item => (
                    <div key={item.product.id} className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border" style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(148,163,184,0.08)' }}>
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden shrink-0 border" style={{ borderColor: 'rgba(148,163,184,0.08)' }}>
                        {item.product.images?.[0] ? (
                          <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs font-medium" style={{ color: 'rgba(148,163,184,0.3)' }}>—</div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium truncate" style={{ color: '#f1f5f9' }}>{item.product.name}</h4>
                        <p className="text-sm font-bold mt-0.5" style={{ color: pc }}>{formatPrice(item.product.price)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, -1)}
                            className="w-6 h-6 rounded-lg flex items-center justify-center border transition-colors hover:bg-white/5"
                            style={{ borderColor: 'rgba(148,163,184,0.15)' }}
                          >
                            <Minus className="w-3 h-3" style={{ color: 'rgba(148,163,184,0.5)' }} />
                          </button>
                          <span className="text-xs font-semibold w-5 text-center" style={{ color: '#f1f5f9' }}>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, 1)}
                            className="w-6 h-6 rounded-lg flex items-center justify-center border transition-colors hover:bg-white/5"
                            style={{ borderColor: 'rgba(148,163,184,0.15)' }}
                          >
                            <Plus className="w-3 h-3" style={{ color: 'rgba(148,163,184,0.5)' }} />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="ml-auto p-1 rounded-lg hover:bg-red-500/10 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" style={{ color: '#f43f5e' }} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t shrink-0 px-5 sm:px-6 py-4 sm:py-5 space-y-3" style={{ borderColor: 'rgba(148,163,184,0.08)' }}>
                {mode === 'qr' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs" style={{ color: headerMuted }}>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Oturum: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
                      </div>
                      {cfg.latitude && cfg.longitude && (
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>Konum korumalı</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="text-xs font-medium mb-1.5 block" style={{ color: headerMuted }}>Adınız</label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Adınızı girin"
                        className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none border"
                        style={{
                          backgroundColor: 'rgba(255,255,255,0.04)',
                          borderColor: 'rgba(148,163,184,0.1)',
                          color: '#f1f5f9',
                        }}
                      />
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: headerMuted }}>Toplam</span>
                  <span className="text-lg font-bold" style={{ color: '#f1f5f9' }}>{formatPrice(cartTotal)}</span>
                </div>
                {geoError && (
                  <p className="text-xs text-amber-400 text-center flex items-center justify-center gap-1">
                    <MapPin className="w-3 h-3" /> {geoError}
                  </p>
                )}
                {orderError && (
                  <p className="text-xs text-rose-400 text-center">{orderError}</p>
                )}
                <button
                  onClick={placeOrder}
                  disabled={orderPlacing || geoChecking}
                  className="w-full py-3 sm:py-3.5 rounded-xl text-sm font-semibold text-white shadow-lg active:scale-[0.98] transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: pc }}
                >
                  {geoChecking ? 'Konum doğrulanıyor...' : (orderPlacing ? 'Sipariş oluşturuluyor...' : 'Siparişi Tamamla')}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {sessionExpired && mode === 'qr' && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative w-full max-w-sm rounded-2xl border p-8 text-center shadow-2xl animate-scale-in" style={{ backgroundColor: '#0a0e1a', borderColor: 'rgba(148,163,184,0.1)' }}>
            <div className="w-16 h-16 mx-auto mb-5 rounded-full flex items-center justify-center" style={{ backgroundColor: '#f59e0b20' }}>
              <Clock className="w-8 h-8 text-amber-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#f1f5f9' }}>Oturum Süreniz Doldu</h3>
            <p className="text-sm mb-6" style={{ color: headerMuted }}>Güvenliğiniz için oturumunuz 15 dakika sonunda sıfırlandı. Lütfen QR kodu tekrar okutun.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg transition-all hover:opacity-90"
              style={{ backgroundColor: '#f59e0b' }}
            >
              Sayfayı Yenile
            </button>
          </div>
        </div>
      )}

      {orderSuccess && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOrderSuccess(false)} />
          <div className="relative w-full max-w-sm rounded-2xl border p-8 text-center shadow-2xl animate-scale-in" style={{ backgroundColor: '#0a0e1a', borderColor: 'rgba(148,163,184,0.1)' }}>
            <div className="w-16 h-16 mx-auto mb-5 rounded-full flex items-center justify-center" style={{ backgroundColor: `${pc}20` }}>
              <svg className="w-8 h-8" style={{ color: pc }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#f1f5f9' }}>Sipariş Alındı</h3>
            <p className="text-sm mb-6" style={{ color: headerMuted }}>Siparişiniz başarıyla oluşturuldu. Kısa süre içinde hazırlanacaktır.</p>
            <button
              onClick={() => setOrderSuccess(false)}
              className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg transition-all hover:opacity-90"
              style={{ backgroundColor: pc }}
            >
              Kapat
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes scale-in {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in {
          animation: scale-in 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  )
}

function ProductCard({
  product,
  onAddToCart,
  accentColor,
  index,
}: {
  product: Product
  onAddToCart: (product: Product) => void
  accentColor: string
  index: number
}) {
  const [imgError, setImgError] = useState(false)
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    onAddToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }

  return (
    <div
      className="group relative flex flex-col rounded-xl overflow-hidden border transition-all duration-300 ease-out hover:border-transparent hover:shadow-2xl"
      style={{
        backgroundColor: '#0f1322',
        borderColor: 'rgba(148,163,184,0.08)',
        animation: `card-fade-in 0.4s ease ${index * 0.04}s both`,
      }}
    >
      <div className="relative aspect-square overflow-hidden" style={{ backgroundColor: '#0a0e1a' }}>
        {product.images?.[0] && !imgError ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingBag className="w-8 h-8" style={{ color: 'rgba(148,163,184,0.15)' }} />
          </div>
        )}
        {product.stock <= 0 && (
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-rose-500/90 text-white text-[10px] font-semibold shadow-lg backdrop-blur-sm">
            Tükendi
          </div>
        )}
        {product.stock > 0 && product.stock <= 5 && (
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-amber-500/90 text-white text-[10px] font-semibold shadow-lg backdrop-blur-sm">
            Son {product.stock}
          </div>
        )}

        {product.stock > 0 && (
          <button
            onClick={handleAdd}
            className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shadow-xl transition-all duration-300 ease-out sm:opacity-0 sm:translate-y-2 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 active:scale-90"
            style={{ backgroundColor: accentColor, color: '#fff' }}
          >
            {added ? (
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
            ) : (
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>
        )}

        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      </div>

      <div className="flex flex-col p-3 sm:p-4 min-h-[90px]">
        {product.category && (
          <span className="text-[10px] font-medium tracking-wider uppercase mb-0.5" style={{ color: `rgba(148,163,184,0.4)` }}>
            {product.category}
          </span>
        )}
        <h3 className="text-xs sm:text-sm font-semibold leading-snug line-clamp-2" style={{ color: '#e2e8f0' }}>
          {product.name}
        </h3>
        {product.description && (
          <p className="text-[10px] sm:text-xs mt-1 line-clamp-1 leading-relaxed" style={{ color: 'rgba(148,163,184,0.4)' }}>
            {product.description}
          </p>
        )}
        <div className="mt-auto pt-2 sm:pt-3 flex items-center justify-between">
          <span className="text-sm sm:text-base font-bold" style={{ color: '#f1f5f9' }}>
            {formatPrice(product.price)}
          </span>
        </div>
      </div>

      <style>{`
        @keyframes card-fade-in {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
