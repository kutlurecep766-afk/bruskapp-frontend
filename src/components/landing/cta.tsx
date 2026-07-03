export default function CTA() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/10 to-transparent" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="glass rounded-3xl p-12 lg:p-16 neon-glow">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">İşletmenizi Yapay Zeka ile Büyütün</h2>
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">İşletmeler BRUSKAPP ile müşteri deneyimini dönüştürüyor. Siz de bugün başlayın.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/905442566476?text=Merhaba%2C%20Bruskapp%20paketleri%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum." target="_blank" rel="noopener noreferrer" className="px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-2xl text-base font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all">Hemen Başla</a>
            <a href="https://wa.me/905442566476?text=Merhaba%2C%20Bruskapp%20demolar%C4%B1n%C4%B1%20talep%20etmek%20istiyorum." target="_blank" rel="noopener noreferrer" className="px-10 py-4 glass text-white rounded-2xl text-base font-semibold hover:bg-white/10 transition-all">Demo Talep Et</a>
          </div>
        </div>
      </div>
    </section>
  )
}
