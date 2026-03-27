import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // GitHub Pages 프로젝트 페이지 배포 시 아래 주석을 해제하고 repo 이름을 입력하세요.
  // 예: github.com/username/taehylee-portfolio → basePath: '/taehylee-portfolio'
  // basePath: '/taehylee-portfolio',
}

export default nextConfig
