'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function Navigation() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  const navLinkClass =
    'text-[18px] font-normal text-[#3d3e3f] leading-[24px] tracking-[-0.36px] hover:opacity-60 transition-opacity'

  return (
    <header className="w-full bg-white sticky top-0 z-50">
      <div className="w-full px-[64px] py-[24px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="hover:opacity-70 transition-opacity">
          <Image
            src={`${BASE}/images/logo_home.png`}
            alt="taehy"
            width={69}
            height={24}
            className="h-[24px] w-auto"
          />
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-[128px]">
          {isHome ? (
            <a href="#works" className={navLinkClass}>Works</a>
          ) : (
            <Link href="/#works" className={navLinkClass}>Works</Link>
          )}
          <Link href="/studies" className={navLinkClass}>Studies</Link>
          <Link href="/about" className={navLinkClass}>About</Link>
        </nav>
      </div>
    </header>
  )
}
