import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import GlobeWidget from '@/components/GlobeWidget'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || ''

const works = [
  {
    id: 1,
    image: `${BASE}/images/LVLM.jpg`,
    title: 'MR Shopping with LVLM-based AI',
    description: '[2026] Thesis Research',
  },
  {
    id: 2,
    image: `${BASE}/images/DRT.jpg`,
    title: 'Improving DRT call service: Shucle App',
    description: '[2025] Personal Project  |  Interview(100%), Service Planning(100%)',
  },
  {
    id: 3,
    image: `${BASE}/images/DX.jpg`,
    title: 'Reorganizing New Product Development Process for DX',
    description: '[2024-2025] Industry-Academic Collaboration(NDA)  |  Interview(40%), Guide Writing(60%)',
  },
  {
    id: 4,
    image: `${BASE}/images/TW.jpg`,
    title: 'Facilitating Social Pay payment sessions: Travel Wallet App',
    description: '[2024] Class-Corporate Partnership(Travel Wallet)  |  UX Design(100%)',
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* ── Hero ── */}
      <section className="relative w-full px-4 sm:px-8 lg:px-[64px] pt-[80px] sm:pt-[120px] lg:pt-[180px] pb-8 sm:pb-10 lg:pb-[60px]">
        <GlobeWidget />
        <div className="flex flex-col gap-[16px]">
          <h1 className="text-[#12254d] font-[900] text-[40px] leading-[48px] sm:text-[64px] sm:leading-[76px] lg:text-[96px] lg:leading-[112px] tracking-[-1.92px]">
            UX Researcher
          </h1>
          <p className="text-[#12254d] font-normal text-[15px] leading-[24px] sm:text-[20px] sm:leading-[32px] lg:text-[28px] lg:leading-[40px] tracking-[-0.56px]">
            who have been researching HCI in hardware and Augmented Reality,{' '}
            <br className="hidden sm:inline" />
            extending beyond mobile and the web.
          </p>
        </div>
      </section>

      {/* ── Works Grid ── */}
      <section
        id="works"
        className="w-full px-4 sm:px-8 lg:px-[64px] pb-8 sm:pb-10 lg:pb-[64px] grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-[40px]"
      >
        {works.map((work) => (
          <div key={work.id} className="flex flex-col gap-[16px] cursor-pointer group">
            <div className="relative w-full h-[220px] sm:h-[340px] lg:h-[478px] overflow-hidden">
              <Image
                src={work.image}
                alt={work.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col gap-[8px]">
              <h3 className="text-[#1e1e1e] font-bold text-[18px] leading-[26px] sm:text-[20px] sm:leading-[28px] lg:text-[24px] lg:leading-[32px] tracking-[-0.48px]">
                {work.title}
              </h3>
              <p className="text-[#5c5e60] font-normal text-[13px] leading-[20px] sm:text-[16px] sm:leading-[24px] lg:text-[20px] lg:leading-[28px] tracking-[-0.4px]">
                {work.description}
              </p>
            </div>
          </div>
        ))}
      </section>

      <Footer />
    </main>
  )
}
