import fetch from 'jest-fetch-mock'
import { Blutui } from '@/blutui'
import { fetchOnce, fetchURL } from '@/utils/testing'

import cassetteFixture from './fixtures/cassette.json'

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
const blutui = new Blutui(accessToken)

describe('Cassette', () => {
  beforeEach(() => fetch.resetMocks())

  describe('get', () => {
    it('can retireve a cassette', async () => {
      fetchOnce(cassetteFixture)
      const cassette = await blutui
        .agency('foo')
        .cassettes.get(cassetteFixture.id)

      expect(fetchURL()).toBe(
        `${blutui.baseURL}/v1/agencies/foo/cassettes/${cassetteFixture.id}`
      )
      expect(cassette).toMatchObject({
        object: 'cassette',
      })
    })
  })
})
