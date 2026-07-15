import Navbar from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'

export default function KosullarPage() {
  return (
    <main className="min-h-screen bg-[#03050a]">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-20 text-gray-300 text-sm leading-relaxed space-y-6">
        <h1 className="text-2xl font-bold text-white">Kullanım Koşulları</h1>
        <p>Son güncelleme: 11 Temmuz 2026</p>
        <p>
          BRUSKAPP ("biz", "bizim" veya "şirket") olarak sunduğumuz hizmetleri
          kullanmadan önce bu kullanım koşullarını dikkatlice okumanızı rica ederiz.
          Hizmetlerimizi kullanarak bu koşulları kabul etmiş sayılırsınız.
        </p>
        <h2 className="text-lg font-semibold text-white">Hizmet Tanımı</h2>
        <p>
          BRUSKAPP, işletmelere yapay zeka destekli web chat, WhatsApp/Instagram
          entegrasyonu, sesli asistan, QR menü, sipariş yönetimi, pazaryeri
          entegrasyonu ve diğer otomasyon araçlarını sağlayan bir SaaS platformudur.
        </p>
        <h2 className="text-lg font-semibold text-white">Hesap ve Abonelik</h2>
        <p>
          Hizmetlerimize erişmek için bir hesap oluşturmanız gerekmektedir. Hesap
          bilgilerinizin gizliliğini korumak sizin sorumluluğunuzdadır. Abonelik
          planları fiyatlandırma sayfamızda belirtilmiştir ve ön ödemelidir.
        </p>
        <h2 className="text-lg font-semibold text-white">Teslimat ve Aktivasyon</h2>
        <p>
          Satın alma işleminiz tamamlandıktan sonra hesabınız aktive edilir
          ve sizinle iletişime geçilerek panel giriş bilgileriniz teslim edilir.
        </p>
        <h2 className="text-lg font-semibold text-white">Faturalandırma ve İade</h2>
        <p>
          Abonelik ücretleri seçilen plana göre aylık olarak USD cinsinden
          faturalandırılır. İptal politikamız hakkında detaylı bilgi için
          İade ve İptal Politikası sayfamızı ziyaret edebilirsiniz.
        </p>
        <h2 className="text-lg font-semibold text-white">Kullanıcı Sorumlulukları</h2>
        <p>
          Kullanıcılar, hizmetlerimizi yasalara uygun şekilde kullanmayı ve
          platformumuz aracılığıyla gönderdikleri içeriklerden kendilerinin
          sorumlu olduğunu kabul eder. Platformumuzu spam, yasa dışı faaliyetler
          veya başkalarının haklarını ihlal etmek için kullanamazsınız.
        </p>
        <h2 className="text-lg font-semibold text-white">Fikri Mülkiyet</h2>
        <p>
          BRUSKAPP platformu, logolar ve marka isimleri şirketimize aittir.
          Kullanıcılar tarafından yüklenen içeriklerin tüm hakları ilgili
          kullanıcıya aittir.
        </p>
        <h2 className="text-lg font-semibold text-white">Sınırlı Sorumluluk</h2>
        <p>
          BRUSKAPP, hizmetlerinin kesintisiz veya hatasız olacağını garanti
          etmez. Yürürlükteki yasaların izin verdiği azami ölçüde, BRUSKAPP
          doğrudan, dolaylı, arızi veya sonuçsal zararlardan sorumlu tutulamaz.
        </p>
        <h2 className="text-lg font-semibold text-white">İletişim</h2>
        <p>
          Kullanım koşullarımız hakkında sorularınız için bizimle
          bruskappdestek@gmail.com adresinden iletişime geçebilirsiniz.
        </p>
      </div>
      <Footer />
    </main>
  )
}
