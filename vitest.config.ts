/// <reference types='vitest' />

import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  build: {},
  test: {
    testTimeout: 10000,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'json-summary', 'html'],
      reportsDirectory: '../../coverage',
    },
  },
  plugins: [tsconfigPaths()],
})
