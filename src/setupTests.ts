import '@testing-library/jest-dom'

import { beforeAll } from 'vitest'

import server from '@/mocks/server'
import {
  DESKTOP_RESOLUTION_HEIGHT,
  DESKTOP_RESOLUTION_WIDTH
} from '@/testUtils'

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' })
  Object.defineProperty(window, 'resizeTo', {
    writable: true,
    value: (width: number, height: number) => {
      Object.assign(window, {
        innerWidth: width,
        innerHeight: height
      }).dispatchEvent(new Event('resize'))
    }
  })
})

beforeEach(() => {
  window.resizeTo(DESKTOP_RESOLUTION_WIDTH, DESKTOP_RESOLUTION_HEIGHT)
})

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})
