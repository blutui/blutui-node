import fetch from 'jest-fetch-mock'

import { Blutui } from '@/blutui'
import { fetchOnce, fetchURL } from '@/utils/testing'

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
const blutui = new Blutui(accessToken)

describe('User', () => {
  beforeEach(() => fetch.resetMocks())

  describe('get', () => {
    it('can get the current user', async () => {
      fetchOnce({ object: 'user' })
      const user = await blutui.user.get()

      expect(fetchURL()).toContain('/v1/user')
      expect(user).toMatchObject({
        object: 'user',
      })
    })
  })

  describe('email', () => {
    it('can get the current users email address', async () => {
      fetchOnce({ object: 'user_email' })
      const email = await blutui.user.email()

      expect(fetchURL()).toContain('/v1/user/email')
      expect(email).toMatchObject({
        object: 'user_email',
      })
    })
  })
})
