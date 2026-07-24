import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Unmount rendered trees between tests. Testing Library's automatic cleanup only
// registers itself when Vitest globals are enabled; this project keeps globals off
// (explicit imports in every test), so cleanup is wired up here instead.
afterEach(() => {
  cleanup()
})
