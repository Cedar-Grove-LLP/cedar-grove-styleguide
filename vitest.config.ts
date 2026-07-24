import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// Standalone Vitest config (Vitest prefers this over vite.config.ts when both exist).
// jsdom environment + the same `@` alias the app uses, so component tests can import
// from `@/components/ui/*`. Tailwind is intentionally NOT wired in here — these tests
// assert on class *names* and accessibility, not on computed styles. Visual/token
// correctness is covered by Storybook, not by this suite.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: false,
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
  },
})
