import Navbar from '@/components/landing/navbar'
import Hero from '@/components/landing/hero'
import QRDemo from '@/components/landing/qrmenu-demo'
import Features from '@/components/landing/features'
import HowItWorks from '@/components/landing/how-it-works'
import Pricing from '@/components/landing/pricing'
import CTA from '@/components/landing/cta'
import Footer from '@/components/landing/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#03050a]">
      <Navbar />
      <Hero />
      <QRDemo />
      <Features />
      <HowItWorks />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  )
}