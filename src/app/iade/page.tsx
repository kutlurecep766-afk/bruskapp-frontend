import Navbar from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'

export default function IadePage() {
  return (
    <main className="min-h-screen bg-[#03050a]">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-20 text-gray-300 text-sm leading-relaxed space-y-6">
        <h1 className="text-2xl font-bold text-white">İade ve İptal Politikası</h1>
        <p>Son güncelleme: 11 Temmuz 2026</p>
        <p>
          BRUSKAPP ("biz", "bizim" veya "şirket") olarak, abonelik tabanlı SaaS
          hizmetimiz için iade ve iptal koşullarımız aşağıda belirtilmiştir.
        </p>
        <h2 className="text-lg font-semibold text-white">Abonelik İptali</h2>
        <p>
           Aboneliğinizi istediğiniz zaman iptal edebilirsiniz. İptal işlemi
           hesap ayarlarınızdan veya bizimle iletişime geçerek yapılabilir.
           İptal durumunda kullanılmamış günlerin ücreti iade edilir.
        </p>
        <h2 className="text-lg font-semibold text-white">İade Politikası</h2>
        <p>
          Aboneliğinizi iptal etmeniz durumunda, fatura döneminizdeki
          kullanılmamış günler için ücret iadesi yapılır. İade tutarı,
          abonelik ücretinin kalan günlere oranlanmasıyla hesaplanır ve
          iptal talebini takiben 7 iş günü içinde ödeme yönteminize
          yansıtılır.
        </p>
        <h2 className="text-lg font-semibold text-white">Deneme Süresi</h2>
        <p>
          Yeni kullanıcılara sunulan ücretsiz deneme süresi boyunca herhangi
          bir ücret alınmaz. Deneme süresi sonunda abonelik başlatılmak
          istenmezse, hesap ayarlarından iptal edilebilir.
        </p>
        <h2 className="text-lg font-semibold text-white">Hizmet Kesintisi</h2>
        <p>
          Planlı bakım veya mücbir sebepler dışında hizmet kesintisi
          yaşanması durumunda, kesinti süresine orantılı olarak hizmet
          süreniz uzatılır veya tarafınıza kredi tanımlanır.
        </p>
        <h2 className="text-lg font-semibold text-white">İletişim</h2>
        <p>
          İade ve iptal politikamız hakkında sorularınız için bizimle
          bruskappdestek@gmail.com adresinden iletişime geçebilirsiniz.
        </p>
      </div>
      <Footer />
    </main>
  )
}
