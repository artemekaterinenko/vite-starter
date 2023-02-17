/// <reference types="vitest" />
import eslintPlugin from '@nabla/vite-plugin-eslint'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => ({
  optimizeDeps: {
    disabled: false
  },
  build: {
    commonjsOptions: {
      include: []
    }
  },
  test: {
    css: false,
    include: ['src/**/__tests__/*'],
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests.ts',
    clearMocks: true,
    coverage: {
      provider: 'istanbul',
      enabled: true,
      '100': true,
      reporter: ['text', 'lcov'],
      reportsDirectory: 'coverage'
    }
  },
  plugins: [
    tsconfigPaths(),
    react(),
    excludeMsw(),
    ...(mode === 'test' ? [] : [eslintPlugin()])
  ]
}))

function excludeMsw() {
  return {
    name: 'exclude-msw',
    resolveId(source: string) {
      return source === 'virtual-module' ? source : null
    },
    renderStart(outputOptions: any) {
      const outDir = outputOptions.dir
      const msWorker = path.resolve(outDir, 'mockServiceWorker.js')
      fs.rm(msWorker, () => console.log(`Deleted ${msWorker}`))
    }
  }
}
