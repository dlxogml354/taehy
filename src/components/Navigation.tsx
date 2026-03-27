'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function Navigation() {
  const pathname = usePathname()

  const linkClass = (path: string) => {
    const isActive = path === '/' ? pathname === '/' : pathname.startsWith(path)
    return `text-base sm:text-lg tracking-[-0.02em] hover:opacity-70 transition-opacity ${
      isActive ? 'text-[#12254c] font-bold' : 'text-[#2b2f31] font-normal'
    }`
  }

  return (
    <header className="w-full bg-white sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 h-24 flex items-center justify-between">
        <Link href="/" className="hover:opacity-70 transition-opacity">
          <Image
            src={`${BASE}/images/logo_home.png`}
            alt="taehy"
            width={80}
            height={26}
            className="h-[26px] w-auto"
          />
        </Link>
        <nav className="flex items-center gap-6 sm:gap-8">
          <Link href="/" className={linkClass('/')}>Works</Link>
          <Link href="/studies" className={linkClass('/studies')}>Studies</Link>
          <Link href="/about" className={linkClass('/about')}>About</Link>
        </nav>
      </div>
    </header>
  )
}
