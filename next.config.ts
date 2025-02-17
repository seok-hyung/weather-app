import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['openweathermap.org'], // 여기에 외부 도메인 추가
  },
}

export default nextConfig
