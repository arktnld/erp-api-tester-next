import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  poweredByHeader: false,
  serverExternalPackages: ['@prisma/client', '@erp/db'],
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.clerk.accounts.dev https://*.nip.io https://clerk.com https://challenges.cloudflare.com",
              "style-src 'self' 'unsafe-inline' https://*.clerk.accounts.dev https://*.nip.io",
              "img-src 'self' data: blob: https://*.clerk.accounts.dev https://*.nip.io https://img.clerk.com",
              "font-src 'self' https://*.clerk.accounts.dev https://*.nip.io",
              "connect-src 'self' https: wss://*.clerk.accounts.dev wss://*.nip.io",
              "frame-src 'self' https://*.clerk.accounts.dev https://*.nip.io https://challenges.cloudflare.com",
              "frame-ancestors 'none'",
              "worker-src 'self' blob:",
            ].join('; '),
          },
        ],
      },
    ]
  },
}

export default nextConfig
