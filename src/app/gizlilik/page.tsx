import Navbar from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'

export default function GizlilikPage() {
  return (
    <main className="min-h-screen bg-[#03050a]">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-20 text-gray-300 text-sm leading-relaxed space-y-6">
        <h1 className="text-2xl font-bold text-white">Gizlilik Politikası</h1>
        <p>Son güncelleme: 8 Temmuz 2026</p>
        <p>
          BRUSKAPP ("biz", "bizim" veya "şirket") olarak, uygulamamızı kullanan
          kişilerin ("kullanıcı") gizliliğine saygı duymaktayız. Bu Gizlilik
          Politikası, hizmetlerimizi kullanırken topladığımız, kullandığımız ve
          koruduğumuz bilgileri açıklamaktadır.
        </p>
        <h2 className="text-lg font-semibold text-white">Topladığımız Bilgiler</h2>
        <p>
          Hizmetlerimizi sağlamak amacıyla ad, e-posta adresi, telefon numarası
          ve işletme bilgileri gibi kişisel verileri toplayabiliriz. Ayrıca
          WhatsApp ve Instagram gibi platformlar üzerinden gelen mesajları
          işleyebiliriz.
        </p>
        <h2 className="text-lg font-semibold text-white">Bilgilerin Kullanımı</h2>
        <p>
          Toplanan bilgiler, hizmetlerimizi sağlamak, iyileştirmek, müşteri
          desteği sunmak ve yasal yükümlülükleri yerine getirmek için kullanılır.
        </p>
        <h2 className="text-lg font-semibold text-white">Veri Güvenliği</h2>
        <p>
          Kişisel verilerinizin güvenliğini sağlamak için endüstri standardı
          şifreleme ve güvenlik önlemlerini kullanmaktayız.
        </p>
        <h2 className="text-lg font-semibold text-white">Üçüncü Taraf Paylaşımı</h2>
        <p>
          Kişisel verileriniz, yasal zorunluluk olmadıkça üçüncü taraflarla
          paylaşılmaz.
        </p>
        <h2 className="text-lg font-semibold text-white">İletişim</h2>
        <p>
          Gizlilik politikamız hakkında sorularınız için bizimle
          iletişime geçebilirsiniz.
        </p>
      </div>
      <Footer />
    </main>
  )
}
