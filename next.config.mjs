import { mergeConfig } from 'next/dist/server/config-shared'

let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {}

const baseConfig = {
  output: 'export',
  distDir: 'out',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true, 
    parallelServerCompiles: true,
  }
}

export default userConfig ? mergeConfig(baseConfig, userConfig) : baseConfig
