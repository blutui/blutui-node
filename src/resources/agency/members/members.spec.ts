import fetch from 'jest-fetch-mock'
import { Blutui } from '@/blutui'
import { fetchOnce, fetchURL } from '@/utils/testing'

// import memberFixture from './fixtures/member.json'
import memberListFixture from './fixtures/member-list.json'

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
const blutui = new Blutui(accessToken)

describe('Member', () => {
  beforeEach(() => fetch.resetMocks())

  describe('list', () => {
    it('can retrieve a list of', async () => {
      fetchOnce(memberListFixture)
      const members = await blutui.agency('foo').members.list()

      expect(fetchURL()).toBe(`${blutui.baseURL}/v1/agencies/foo/members`)
      expect(members).toMatchObject({
        object: 'list',
        data: [{ hasFullAccess: true }],
      })
    })
  })
})
