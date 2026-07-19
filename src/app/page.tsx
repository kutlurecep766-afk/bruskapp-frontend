import Navbar from '@/components/landing/navbar'
import Hero from '@/components/landing/hero'
import ChatbotDemo from '@/components/landing/chatbot-demo'
import Features from '@/components/landing/features'
import Sectors from '@/components/landing/sectors'
import Pricing from '@/components/landing/pricing'
import CTA from '@/components/landing/cta'
import Footer from '@/components/landing/footer'
import ChatWidget from '@/components/landing/chat-widget-client'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#03050a]">
      <Navbar />
      <Hero />
      <ChatbotDemo />
      <Features />
      <Sectors />
      <Pricing />
      <CTA />
      <Footer />
          <ChatWidget />
    </main>
  )
}