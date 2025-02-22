import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '铃兰专页',
  description: 'for 铃兰',
  generator: 'love',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
