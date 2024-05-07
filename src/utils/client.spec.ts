import fetch from 'jest-fetch-mock'

import { Blutui } from '../blutui'
import { fetchHeaders, fetchURL } from './testing'

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
const blutui = new Blutui(accessToken)

describe('Client', () => {
  beforeEach(() => fetch.resetMocks())

  describe('fetch', () => {
    it('get should always include proper header', async () => {
      await blutui.get('v1/any')
      expect(fetchURL()).toContain('/v1/any')
      expect(fetchHeaders()).toHaveProperty(
        'Authorization',
        `Bearer ${accessToken}`
      )
    })

    it('post should always include proper header', async () => {
      await blutui.post('v1/any', {})
      expect(fetchURL()).toContain('/v1/any')
      expect(fetchHeaders()).toHaveProperty(
        'Authorization',
        `Bearer ${accessToken}`
      )
    })
  })
})
