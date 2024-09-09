import fetch from 'jest-fetch-mock'
import { Blutui } from '@/blutui'
import { fetchOnce, fetchURL } from '@/utils/testing'

// import inviteFixture from './fixtures/invite.json'
import inviteListFixture from './fixtures/invite-list.json'

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
const blutui = new Blutui(accessToken)

describe('Invite', () => {
  beforeEach(() => fetch.resetMocks())

  describe('list', () => {
    it('can retrieve a list of invites', async () => {
      fetchOnce(inviteListFixture)
      const invites = await blutui.agency('foo').invites.list()

      expect(fetchURL()).toBe(`${blutui.baseURL}/v1/agencies/foo/invites`)
      expect(invites).toMatchObject({
        object: 'list',
      })
    })
  })
})
