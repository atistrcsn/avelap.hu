import packageJson from "./package.json" with { type: "json" };
import type { NextConfig } from 'next'


const version = packageJson.version

const nextConfig: NextConfig = {
  turbopack: {},
  generateEtags: false,
  env: {
    version: version,
    apiBaseURL: process.env.API_BASEURL || '',
    googleTagId: process.env.GOOGLETAG_ID || ''
  },
  logging: {    
    fetches: {
      fullUrl: true
    }
  },
  serverExternalPackages: ['pino', 'pino-pretty'],
  crossOrigin: "anonymous",
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
      },
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
      },
    ],
  },
  async redirects() {
    return ["true", "1"].includes(process.env.NEXT_PUBLIC_MAINTENANCE || '') ?
      [
        {
          source: "/((?!maintenance).*)",
          destination: "/maintenance",
          permanent: false,
        },
      ] : [
        {
          source: "/maintenance",
          destination: "/",
          permanent: false,
        },
        {
          source: '/index/kikvagyunk.html',
          destination: "/kik-vagyunk",
          permanent: true,
        },
        {
          source: '/index/tanitasok.html',
          destination: "/tanitasok",
          permanent: true,
        },
        {
          source: '/egyedulallok/tanusagtetelek.html',
          destination: "/tanusagtetelek",
          permanent: true,
        },
        {
          source: '/index/hasznos_cimek.html',
          destination: '/hasznos-cimek',
          permanent: true,
        },
        {
          source: '/index/programjaink.html',
          destination: '/programjaink',
          permanent: true,
        },
        {
          source: '/egyedulallok/ave_kurzus_bovebben.html',
          destination: '/programjaink/ave-kurzus',
          permanent: true,
        },
        {
          source: '/egyedulallok/kerdeslista.html',
          destination: '/programjaink',
          permanent: true,
        },
        {
          source: '/index/kapcsolat.html',
          destination: '/kapcsolat',
          permanent: true,
        },
        {
          source: '/mediatar/:path*',
          destination: "/tanusagtetelek",
          permanent: true,
        }
      ]
  },
}

export default nextConfig
