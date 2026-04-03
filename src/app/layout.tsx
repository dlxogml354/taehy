import type { Metadata } from 'next'
import './globals.css'
import VisitorTracker from '@/components/VisitorTracker'

export const metadata: Metadata = {
  title: 'taehy space',
  description: 'UX연구자 이태희의 포트폴리오 — 모바일, 웹, 하드웨어, 확장현실(MR) HCI 연구',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="bg-white text-dark antialiased">
        <VisitorTracker />
        {children}
      </body>
    </html>
  )
}
