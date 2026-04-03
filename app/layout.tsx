import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Status — 93.fyi',
  description: 'Real-time uptime and status for the 93.fyi ecosystem.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{ backgroundColor: '#0f0808', margin: 0 }}
      >
        {children}
      </body>
    </html>
  )
}
