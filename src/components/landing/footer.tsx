export default function Footer() {
  return (
    <footer id="iletişim" className="relative pt-20 pb-10 border-t border-[#1a2332]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.svg" alt="BRUSKAPP" className="h-9" />
            </div>
            <p className="text-gray-500 text-sm max-w-sm leading-relaxed">Yapay zeka destekli işletme otomasyon platformu. Çağrı merkezi, dijital menü ve daha fazlasını tek bir platformda birleştirin.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Ürün</h4>
            <ul className="space-y-2">
              <li><a href="#ozellikler" className="text-sm text-gray-500 hover:text-white transition-colors">Özellikler</a></li>
              <li><a href="#sektorler" className="text-sm text-gray-500 hover:text-white transition-colors">Sektörler</a></li>
              <li><a href="#fiyatlandirma" className="text-sm text-gray-500 hover:text-white transition-colors">Fiyatlandırma</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">İletişim</h4>
            <ul className="space-y-2">
              <li className="text-sm text-gray-500">bruskappdestek@gmail.com</li>
              <li className="text-sm text-gray-500">+90 544 256 64 76</li>
              <li className="flex items-center gap-3 mt-4">
                <a href="https://www.instagram.com/bruskapp" target="_blank" rel="noopener noreferrer" className="group">
                  <div className="w-9 h-9 rounded-xl bg-[#1a2332] flex items-center justify-center text-gray-400 hover:bg-blue-500/20 hover:text-blue-400 transition-all">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                    </svg>
                  </div>
                </a>
                <a href="https://wa.me/905442566476" target="_blank" rel="noopener noreferrer" className="group">
                  <div className="w-9 h-9 rounded-xl bg-[#1a2332] flex items-center justify-center text-gray-400 hover:bg-blue-500/20 hover:text-blue-400 transition-all">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </div>
                </a>
                <a href="tel:+905442566476" className="group">
                  <div className="w-9 h-9 rounded-xl bg-[#1a2332] flex items-center justify-center text-gray-400 hover:bg-blue-500/20 hover:text-blue-400 transition-all">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-[#1a2332] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">2026 BRUSKAPP. Tüm hakları saklıdır.</p>
          <div className="flex gap-6 text-sm text-gray-600"><a href="/gizlilik" className="hover:text-white">Gizlilik</a><a href="/kosullar" className="hover:text-white">Koşullar</a><a href="/iade" className="hover:text-white">İade</a></div>
        </div>
      </div>
    </footer>
  )
}