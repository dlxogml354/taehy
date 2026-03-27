export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-[#d9d9d9]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-12 sm:py-16 flex items-center justify-between">
        <a
          href="#"
          aria-label="LinkedIn"
          className="text-[#838383] hover:text-[#2b2f31] transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
        <p className="text-[#838383] font-normal text-[14px] sm:text-[16px] tracking-[-0.02em]">
          © 2026 taehylee
        </p>
      </div>
    </footer>
  )
}
