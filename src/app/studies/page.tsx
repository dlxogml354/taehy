import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function Studies() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* ── Writing ── */}
      <section className="w-full bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-10 sm:py-14 lg:py-16">
          {/* Date + Title */}
          <div className="mb-10 sm:mb-14">
            <p className="text-[#838383] font-normal text-[18px] sm:text-[20px] lg:text-[24px] leading-[1.5] tracking-[-0.02em] mb-3">
              2026.03.26 (THU)
            </p>
            <h1 className="text-[#2b2f31] font-bold text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.35] tracking-[-0.02em]">
              AI랑 작업중...
            </h1>
          </div>

          {/* Body */}
          <div className="text-[#2b2f31] font-normal text-[16px] sm:text-[18px] lg:text-[20px] leading-[1.65] tracking-[-0.02em] whitespace-pre-line pb-16 sm:pb-20">
            {`Claude code랑 Cursor, Figma와 함께 이 페이지를 만들고 있다.
석사과정 졸업하고 어언 한달이 지났다.
지금까지 40개의 기업 중 2개의 기업에서 서비스기획자 포지션의 면접을 봤다.

그러면서 내 정체성에 조금은 어지러움이 생겼다.
동시에, 다음을 빠르게 다질 수 있는 계기가 생겼다.
나는 누구인지? 그래서 뭘 할줄 아는 인간인지? 결국 우리 회사에서 당신이 무엇을 해줄 수 있는지?
그것을 구체화하려고 지금 이짓거리를 하고 있는거다.

예전에 내가 포트폴리오 페이지를 만들려면 HTML부터 CSS까지 일일이 다 VS code에 쓰고, 폴더를 만들고 별짓을 다 했어야 했다면,
좀 지나서는 Photoshop과 Zeplin을 연결시켜서 개발자에게 공유하기 좋게 작업을 했다.
좀 지나서는 Framer, Figma Site 등의 기능이 등장하기 시작했다. 이로써 개발자에게 이 중 하나만 보여줘도 어느정도 구현이 가능했다.
이제는 AI가 tool 자체가 되면서 이것들을 전부 보조하고 있다.
참으로 놀라운 세상 아닌가?

그런데 사실, 면접볼 때 이것들을 쓸 줄 아느냐 아니냐는 크게 중요하지 않다.
도구들일 뿐이니까.
제일 중요한 것은 결국 당신은 어떤 사람이며, 어떤 가치를 포지셔닝 함으로써 우리 회사에 기여할 것이며,
결국 우리 회사에 있는 사람들과 어떻게 일할 수 있느냐를 보여주는 것이 가장 중요하다.
여기서 조금이나마 보여주면서, 면접 연습을 하려고 한다.`}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
