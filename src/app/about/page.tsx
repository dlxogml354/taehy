import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || ''

const Divider = () => <hr className="border-t border-[#d9d9d9] my-12 sm:my-16" />

export default function About() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* ── Hero ── */}
      <section className="w-full bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-10 sm:py-14 lg:py-16">
          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-8">
            {/* Text */}
            <div className="flex-1">
              <h1 className="text-[#2b2f31] font-bold text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.35] tracking-[-0.02em] mb-4 sm:mb-5">
                지금은 구직중입니다.
              </h1>
              <p className="text-[#2b2f31] font-normal text-[15px] sm:text-[16px] lg:text-[18px] leading-[1.65] tracking-[-0.02em]">
                2026년 02월, 기술경영학과 석사과정을 졸업하였습니다.
                <br />
                현재는 서비스기획자로 성장하기 위해 고군분투 하고 있습니다.
              </p>
            </div>
            {/* Profile photo */}
            <div className="relative w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] lg:w-[286px] lg:h-[286px] flex-shrink-0 rounded-2xl overflow-hidden self-center sm:self-start">
              <Image
                src={`${BASE}/images/Profile.jpg`}
                alt="이태희 프로필 사진"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 180px, (max-width: 1024px) 220px, 286px"
              />
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── Section 1: 제품사용 현장 ── */}
      <section className="w-full bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <h2 className="text-[#2b2f31] font-semibold text-[20px] sm:text-[22px] lg:text-[24px] leading-[1.5] tracking-[-0.02em] mb-5">
            제품사용 현장에서 문제를 발견합니다.
          </h2>
          <p className="text-[#2b2f31] font-normal text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.7] tracking-[-0.02em] whitespace-pre-line">
            {`저는 2년 이상의 경력을 가진 서비스기획자 입니다.
데이터에서 사용자가 겪는 문제를 발견하는 것을 넘어, 제품을 사용하는 현장에서 사용자경험(UX)을 총체적으로 관찰하는 것을 중요하게 생각합니다.

모바일, 웹 뿐만 아니라 하드웨어나 혼합현실(MR) 분야에서 폭넓은 경험을 가지고 있습니다.
서비스기획자로서 IDI, FGI를 넘어 PRD, 기능명세서 작성, 와이어프레임, 프로토타입 제작에 특화되어 있습니다.
나아가 다양한 부서와의 협업을 통해 원활한 사용자경험을 설계합니다.
2년의 석사과정 기간동안 HCI분야에 전문성을 쌓아왔습니다.
제품 정체성과 사용자 심리를 복합적으로 고려하고 디지털서비스의 전반적인 사용성과 흐름을 개선하기 위해 노력합니다.

우리는 기술의 파도 속에서 생존하고 있습니다.
급격히 변화하는 기술로 사용자에게 더 나은 가치를 제공하는 것은 마음을 설레게합니다.
언젠가, 많은 사람들 앞에서 기여한 제품을 대표로 발표하는 날이 오길 고대합니다.`}
          </p>
        </div>
      </section>

      <Divider />

      {/* ── Section 2: 이런것들을 할줄 알아요 ── */}
      <section className="w-full bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <h2 className="text-[#2b2f31] font-semibold text-[20px] sm:text-[22px] lg:text-[24px] leading-[1.5] tracking-[-0.02em] mb-6">
            이런것들을 할줄 알아요
          </h2>
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-[#2b2f31] font-bold text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.5] tracking-[-0.02em] mb-1">
                Design
              </p>
              <p className="text-[#2b2f31] font-normal text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.7] tracking-[-0.02em]">
                Product Requirement Document, Functional Specification, Survey Design, Experimental Design, User Research
                <br />
                User flow, Journey Mapping, A/B Testing, Wireframing, Prototyping, Low-High Fidelity Mockups
              </p>
            </div>
            <div>
              <p className="text-[#2b2f31] font-bold text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.5] tracking-[-0.02em] mb-1">
                Tools
              </p>
              <p className="text-[#2b2f31] font-normal text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.7] tracking-[-0.02em]">
                Figma, Framer, Adobe Photoshop, Adobe Illustrator, Adobe After effects, Unity
                <br />
                MS Office, Notion, Slack, Confluence, Manyfast, Claude, Cursor, Antigravity
              </p>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── Section 3: 인류를 미소짓게 ── */}
      <section className="w-full bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 pb-16 sm:pb-20">
          <h2 className="text-[#2b2f31] font-semibold text-[20px] sm:text-[22px] lg:text-[24px] leading-[1.5] tracking-[-0.02em] mb-5">
            인류를 미소짓게 만들고 싶습니다
          </h2>
          <p className="text-[#2b2f31] font-normal text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.7] tracking-[-0.02em] whitespace-pre-line">
            {`음식을 먹는다는 것은 우리 생활에 빠질 수 없는 요소입니다. 내가 음식을 먹는다는 것은, 누군가가 계획하고 맛있게 디자인한 음식을 대접해 준 것이죠.
그런 의미에서 매몰된 심신을 잠시 회복시켜 주는 것이 요리를 하는 것입니다.
제한된 시간에 계획대로 재료를 손질하고, 점검하고, 기다리고, 마침내 음식이 사랑하는 누군가의 상에 올라갑니다.
그 웃는 모습을 보면 그간의 피로가 모두 날아가는 느낌이 들죠.`}
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
