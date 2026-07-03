'use client'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ' + (scrolled ? 'bg-[#0d1117]/95 backdrop-blur-xl border-b border-[#1a2332] shadow-lg' : 'bg-transparent')}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="BRUSKAPP" className="h-9" />
          </div>
          <div className="hidden md:flex items-center gap-8">
            {['Özellikler', 'Demolar', 'Sektörler', 'Fiyatlandırma', 'İletişim'].map((item) => (
              <a key={item} href={'#' + item.toLowerCase()} className="text-sm text-gray-400 hover:text-white transition-colors">{item}</a>
            ))}
          </div>
          <button className="md:hidden p-2 text-gray-400 hover:text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} /></svg>
          </button>
        </div>
        {mobileOpen && (
          <div className="absolute top-full left-0 right-0 md:hidden bg-[#0d1117] border-b border-[#1a2332] shadow-2xl shadow-black/50">
            <div className="px-6 py-6 space-y-3">
              {['Özellikler', 'Demolar', 'Sektörler', 'Fiyatlandırma', 'İletişim'].map((item) => (
                <a key={item} href={'#' + item.toLowerCase()} onClick={() => setMobileOpen(false)}
                   className="block px-5 py-4 text-base font-medium text-gray-200 hover:text-white rounded-xl hover:bg-white/10 transition-all border border-white/10 hover:border-blue-500/30">{item}</a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}