import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://bruskapp.com"),
  title: "BRUSKAPP - Yapay Zeka Destekli İşletme Otomasyonu",
  description: "Web chat, sesli AI asistan, QR menü, sipariş ve müşteri yönetimini tek platformdan yönetin. AI destekli işletme çözümleri.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "BRUSKAPP - Yapay Zeka ile İşletmenizi Otomatikleştirin",
    description: "Web chat, sesli AI asistan, QR menü ve müşteri yönetimini tek platformdan yönetin.",
    url: "https://bruskapp.com",
    siteName: "BRUSKAPP",
    images: [{ url: "/og-image.svg", width: 1200, height: 630 }],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BRUSKAPP - Yapay Zeka ile İşletmenizi Otomatikleştirin",
    description: "Web chat, sesli AI asistan, QR menü ve müşteri yönetimini tek platformda birleştirin.",
    images: ["/og-image.svg"],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className={inter.className}>{children}</body>
    </html>
  )
}