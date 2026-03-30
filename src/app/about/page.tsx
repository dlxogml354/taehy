import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function About() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* ── Hero ── */}
      <section className="w-full px-[64px] pt-[132px] pb-[108px] flex items-center justify-between">
        {/* Title */}
        <h1 className="text-[#12254d] font-[900] text-[96px] leading-[112px] tracking-[-1.92px] w-[300px]">
          About
        </h1>
        {/* Profile photo */}
        <div className="relative w-[286px] h-[286px] flex-shrink-0 overflow-hidden rounded-[12px]">
          <Image
            src={`${BASE}/images/Profile.jpg`}
            alt="이태희 프로필 사진"
            fill
            className="object-cover object-top"
            sizes="286px"
          />
        </div>
      </section>

      {/* ── Border ── */}
      <div className="w-full px-[64px] pb-[48px]">
        <hr className="border-0 border-t border-[#d9d9d9]" />
      </div>

      {/* ── Contents 1: Discover problems ── */}
      <section className="w-full px-[64px] pb-[48px]">
        <div className="flex flex-col gap-[24px]">
          <h2 className="text-[#1e1e1e] font-bold text-[32px] leading-[40px] tracking-[-0.64px]">
            🤔 Discover problems in real field where products are used.
          </h2>
          <div className="text-[#5c5e60] font-normal text-[18px] leading-[24px] tracking-[-0.36px]">
            <p>I'm an UX Designer with over two years of experience.</p>
            <p>I believe in going beyond discovering user problems through data — observing the full user experience(UX) firsthand in the environments where products are actually used.</p>
            <p>I have broad experience across mobile, web, hardware, and mixed reality (MR).</p>
            <p>Specialize in IDIs, FGIs, PRDs, functional specifications, wireframes, and prototyping. Cross-functional collaboration is essential to all of this.</p>
            <p>&nbsp;</p>
            <p>We are surviving in a wave of technology.</p>
            <p>The thought of delivering better value to users through rapidly evolving technology excites me.</p>
            <p>I look forward to the day I can stand before a large audience and present a product I contributed build.</p>
          </div>
        </div>
      </section>

      {/* ── Contents 2: Ability ── */}
      <section className="w-full px-[64px] pb-[48px]">
        <div className="flex flex-col gap-[24px]">
          <h2 className="text-[#1e1e1e] font-bold text-[32px] leading-[40px] tracking-[-0.64px]">
            🛠️ Ability:
          </h2>
          <div className="text-[#5c5e60] font-normal text-[18px] leading-[24px] tracking-[-0.36px]">
            <p>[Design]</p>
            <p>Product Requirement Document, Functional Specification, Survey Design, Experimental Design, User Research,</p>
            <p>User flow, Journey Mapping, A/B Testing, Wireframing, Prototyping, Low-High Fidelity Mockups</p>
            <p>&nbsp;</p>
            <p>[Tools]</p>
            <p>Figma, Framer, Adobe Photoshop, Adobe Illustrator, Adobe After effects, Unity,</p>
            <p>MS Office, Notion, Slack, Confluence, MCP, Manyfast, Claude, Cursor, Antigravity</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
