import packageJson from "./package.json" with { type: "json" };
import type { NextConfig } from 'next'

const r2Hostname = process.env.R2_PUBLIC_URL ? new URL(process.env.R2_PUBLIC_URL).hostname : '';


const version = packageJson.version

const nextConfig: NextConfig = {
  output: 'export',
  turbopack: {},
  generateEtags: false,
  env: {
    version: version,
    apiBaseURL: process.env.API_BASEURL || '',
    googleTagId: process.env.GOOGLETAG_ID || ''
  },
  crossOrigin: "anonymous",
  images: {
    // unoptimized is required for static export — Next.js image optimisation
    // relies on a server runtime that does not exist in output: 'export'.
    unoptimized: true,
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
      ...(r2Hostname ? [{ protocol: 'https' as const, hostname: r2Hostname, port: '' }] : []),
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
      },
    ],
  },
}

export default nextConfig
