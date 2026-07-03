import StorefrontContent from '@/components/storefront/storefront-content'

interface Tenant {
  id: string
  name: string
  slug: string
  siteTitle: string
  primaryColor: string
  logoUrl: string
  isConfigured: boolean
}

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

async function getTenant(domain: string): Promise<Tenant | null> {
  try {
    const res = await fetch(`http://bruskapp-backend:4000/api/tenants/public?domain=${domain}`, {
      cache: 'no-store',
    })
    const data = await res.json()
    return data?.tenant || null
  } catch {
    return null
  }
}

async function getProducts(slug: string): Promise<Product[]> {
  try {
    const res = await fetch(`http://bruskapp-backend:4000/api/products/storefront/${slug}`, {
      cache: 'no-store',
    })
    if (!res.ok) return []
    const data = await res.json()
    return data?.products || []
  } catch {
    return []
  }
}

export default async function SitePage({ params }: { params: { slug: string[] } }) {
  const domain = params.slug[0]
  if (!domain) return <NotConfigured />

  const tenant = await getTenant(domain)

  if (!tenant || !tenant.isConfigured) {
    return <NotConfigured />
  }

  const products = await getProducts(tenant.slug)

  return <StorefrontContent tenant={tenant} products={products} />
}

function NotConfigured() {
  return (
    <main className="min-h-screen bg-[#fafafa] flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-black/[0.03] border border-black/[0.06] flex items-center justify-center">
          <svg className="w-8 h-8 text-black/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-xl font-semibold text-[#1a1a1a] mb-2">İşletme Bulunamadı</h1>
        <p className="text-sm text-black/40 leading-relaxed">Bu işletme henüz yapılandırılmamış veya mevcut değil.</p>
      </div>
    </main>
  )
}
