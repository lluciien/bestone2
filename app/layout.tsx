import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '铃兰',
  description: 'for 铃兰',
  generator: 'love',
  icons: {
    icon: [
      // 常规图标
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon-16x16.png', sizes: '16x16' },
      { url: '/favicon-32x32.png', sizes: '32x32' },
    ],
    apple: [
      // 苹果设备专用图标
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
    // 其他可选配置
    shortcut: ['/favicon.ico'],
    other: [
      // SVG 格式图标（适用于现代浏览器）
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#5bbad5' }
    ]
  }
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