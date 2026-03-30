import Image from 'next/image'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function Footer() {
  return (
    <footer className="w-full bg-white px-[64px] pt-[320px] pb-[64px]">
      <div className="flex items-center justify-between">
        {/* Social icons */}
        <div className="flex items-center gap-[40px]">
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/taehylee/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="relative w-[24px] h-[24px] opacity-100 hover:opacity-60 transition-opacity"
          >
            <Image
              src={`${BASE}/images/linkedin.jpg`}
              alt="LinkedIn"
              width={24}
              height={24}
              className="w-[24px] h-[24px] object-contain"
            />
          </a>
          {/* Email */}
          <a
            href="mailto:lth4997@gmail.com"
            aria-label="Email"
            className="relative w-[24px] h-[24px] opacity-100 hover:opacity-60 transition-opacity"
          >
            <Image
              src={`${BASE}/images/mail.jpg`}
              alt="Email"
              width={24}
              height={24}
              className="w-[24px] h-[24px] object-contain"
            />
          </a>
        </div>

        {/* Copyright */}
        <p className="font-normal text-[16px] leading-[24px] text-[#949697] tracking-[-0.32px]">
          © taehylee, 2026
        </p>
      </div>
    </footer>
  )
}
