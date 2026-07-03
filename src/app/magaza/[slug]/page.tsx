import StorefrontContent from '@/components/storefront/storefront-content'

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
  logoUrl: string
  isConfigured: boolean
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

export default async function MagazaPage({ params }: { params: { slug: string } }) {
  const slug = params.slug
  if (!slug) return <NotConfigured />

  const { tenant, products } = await getStorefront(slug)

  if (!tenant) return <NotConfigured />

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
        <h1 className="text-xl font-semibold text-[#1a1a1a] mb-2">Mağaza Bulunamadı</h1>
        <p className="text-sm text-black/40 leading-relaxed">Bu mağaza mevcut değil veya henüz yapılandırılmamış.</p>
      </div>
    </main>
  )
}
