import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: '/taehy',
  env: {
    NEXT_PUBLIC_BASE_PATH: '/taehy',
  },
}

export default nextConfig
