import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const works = [
  {
    id: 1,
    image: '/images/LVLM.jpg',
    title: 'LVLM기반 AI와 함께 쇼핑하기',
    description:
      'AI가 나의 시선과 행동을 모두 이해하는 미래는 어떤 세상일까요?\n본 연구는 MR공간인터페이스 상호작용 설계방식을 제시합니다.',
    meta: '2025.07 ~ 2025.10  /  학위논문연구(SCI 저널 심사 중)',
    href: '#',
  },
  {
    id: 2,
    image: '/images/DRT.jpg',
    title: 'DRT호출 서비스 개선: 셔클 앱',
    description:
      '대중교통 사각지대 사용자들의 행태를 연구하고\n음성안내 신규 서비스를 제시합니다.',
    meta: '2025.08  /  개인프로젝트(셔클)',
    href: '#',
  },
  {
    id: 3,
    image: '/images/DX.jpg',
    title: 'DX를 위한 신제품개발 프로세스 개편',
    description:
      "기획한 제품을 '고객데이터'로부터 검증하기 위한 가이드라인을 제시하였습니다.\n제품 스펙 결정 전, 마지막으로 잠재고객과 만나는 단계에서 활용되고 있습니다.",
    meta: '2024.05 ~ 2024.10  /  산학협력(NDA)',
    href: '#',
  },
  {
    id: 4,
    image: '/images/TW.jpg',
    title: '소셜페이 결제세션 촉진: 트래블월렛',
    description:
      '신규서비스 사용자들의 문제를 연구하고\n지도기반 가맹점 정보제공 서비스를 고객데이터를 기반으로 제시합니다.',
    meta: '2024.11  /  수업-기업연계(트래블월렛)',
    href: '#',
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* ── Hero ── */}
      <section className="w-full bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-16 sm:py-20 lg:py-24 min-h-[320px] lg:min-h-[384px] flex items-center">
          <div>
            <h1 className="text-[#2b2f31] font-bold text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.35] tracking-[-0.02em] mb-4 sm:mb-5">
              UX연구자 이태희입니다.
            </h1>
            <p className="text-[#2b2f31] font-normal text-base sm:text-lg lg:text-[20px] leading-[1.6] tracking-[-0.02em]">
              고객 제품 사용현장에서의 문제를 발견합니다.
              <br />
              모바일, 웹을 넘어 하드웨어, 확장현실(MR) 에서의 HCI를 연구해왔습니다.
            </p>
          </div>
        </div>
      </section>

      {/* ── Works ── */}
      <section id="works" className="w-full bg-white">
        {/* Section header */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 pt-4 pb-6 sm:pb-8">
          <h2 className="text-[#2b2f31] font-semibold text-[20px] sm:text-[22px] lg:text-[24px] tracking-[-0.02em]">
            Works
          </h2>
        </div>

        {/* Cards */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 pb-20 flex flex-col gap-6 sm:gap-8">
          {works.map((work) => (
            <article
              key={work.id}
              className="w-full border border-[#d9d9d9] rounded-2xl overflow-hidden flex flex-col lg:flex-row hover:shadow-md transition-shadow duration-200"
            >
              {/* Image */}
              <div className="relative w-full lg:w-[43%] aspect-[4/3] sm:aspect-video lg:aspect-auto lg:min-h-[418px] flex-shrink-0">
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 43vw"
                />
              </div>

              {/* Content */}
              <div className="flex-1 flex items-center p-6 sm:p-8 lg:p-12">
                <div className="flex flex-col gap-3 sm:gap-4">
                  <h3 className="text-[#2b2f31] font-bold text-[22px] sm:text-[26px] lg:text-[32px] leading-[1.45] tracking-[-0.02em]">
                    {work.title}
                  </h3>
                  <p className="text-[#2b2f31] font-normal text-[15px] sm:text-[17px] lg:text-[20px] leading-[1.65] tracking-[-0.02em] whitespace-pre-line">
                    {work.description}
                  </p>
                  <p className="text-[#838383] font-normal text-[13px] sm:text-[14px] tracking-[-0.02em]">
                    {work.meta}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
