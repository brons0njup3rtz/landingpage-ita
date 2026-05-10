import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const tailwindcssPkg = path.join(__dirname, 'node_modules', 'tailwindcss')

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  turbopack: {
    resolveAlias: {
      tailwindcss: tailwindcssPkg,
    },
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      tailwindcss: tailwindcssPkg,
    }
    return config
  },
}

export default nextConfig
