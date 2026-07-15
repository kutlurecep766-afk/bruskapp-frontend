import StorefrontContent from '@/components/storefront/storefront-content'
import { QrCode } from 'lucide-react'

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

interface Tenant {
  id: string
  name: string
  slug: string
  siteTitle: string
  primaryColor: string
  secondaryColor?: string
  logoUrl: string
  isConfigured: boolean
  storefrontConfig?: any
}

async function getStorefront(slug: string): Promise<{ tenant: Tenant | null; products: Product[] }> {
  try {
    const res = await fetch(`http://bruskapp-backend:4000/api/products/storefront/${slug}`, {
      cache: 'no-store',
    })
    if (!res.ok) return { tenant: null, products: [] }
    return await res.json()
  } catch {
    return { tenant: null, products: [] }
  }
}

export default async function MasaPage({ params }: { params: { slug: string; masaNo: string } }) {
  const slug = params.slug
  const masaNo = params.masaNo
  if (!slug || !masaNo) return <NotConfigured />

  const { tenant, products } = await getStorefront(slug)
  if (!tenant) return <NotConfigured />

  const cfg = typeof tenant.storefrontConfig === 'string' ? JSON.parse(tenant.storefrontConfig) : (tenant.storefrontConfig || {})
  if (cfg.qrEnabled === false) return <QrDisabled />

  const allowedTables: number[] = cfg.masaNumbers || []
  const tableNum = parseInt(masaNo, 10)
  if (allowedTables.length > 0 && !allowedTables.includes(tableNum)) return <InvalidTable />

  return <StorefrontContent tenant={tenant} products={products} mode="qr" tableNumber={masaNo} />
}

function NotConfigured() {
  return (
    <main className="min-h-screen bg-[#080b12] flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
          <svg className="w-8 h-8 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-xl font-semibold text-[#f1f5f9] mb-2">Mağaza Bulunamadı</h1>
        <p className="text-sm text-white/40 leading-relaxed">Bu mağaza mevcut değil veya QR kod hatalı.</p>
      </div>
    </main>
  )
}

function QrDisabled() {
  return (
    <main className="min-h-screen bg-[#080b12] flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
          <QrCode className="w-8 h-8 text-white/30" />
        </div>
        <h1 className="text-xl font-semibold text-[#f1f5f9] mb-2">QR Menü Pasif</h1>
        <p className="text-sm text-white/40 leading-relaxed">Bu mağazanın QR menü özelliği şu anda aktif değil.</p>
      </div>
    </main>
  )
}

function InvalidTable() {
  return (
    <main className="min-h-screen bg-[#080b12] flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
          <QrCode className="w-8 h-8 text-white/30" />
        </div>
        <h1 className="text-xl font-semibold text-[#f1f5f9] mb-2">Geçersiz Masa</h1>
        <p className="text-sm text-white/40 leading-relaxed">Bu QR kod geçerli bir masaya ait değil. Lütfen işletme yetkilisiyle iletişime geçin.</p>
      </div>
    </main>
  )
}
