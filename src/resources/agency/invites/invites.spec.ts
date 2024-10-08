import fetch from 'jest-fetch-mock'
import { Blutui } from '@/blutui'
import { fetchOnce, fetchURL } from '@/utils/testing'

import inviteFixture from './fixtures/invite.json'
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

    it('can retrieve a list of invites with an expanded role', async () => {
      fetchOnce(inviteListFixture)
      const invites = await blutui
        .agency('foo')
        .invites.list({ expand: ['role'] })

      expect(fetchURL()).toBe(
        encodeURI(`${blutui.baseURL}/v1/agencies/foo/invites?expand[]=role`)
      )

      expect(invites).toMatchObject({
        object: 'list',
      })
      expect(invites.data[0].role).toMatchObject({
        object: 'role',
      })
    })
  })

  describe('update', () => {
    it('can update an agency invite', async () => {
      fetchOnce(inviteFixture)
      const invite = await blutui
        .agency('foo')
        .invites.update(inviteFixture.id, { role: 3 })

      expect(fetchURL()).toBe(
        `${blutui.baseURL}/v1/agencies/foo/invites/${inviteFixture.id}`
      )
      expect(invite).toMatchObject({
        object: 'invite',
      })
    })
  })

  describe('remove', () => {
    it('can remove an invite', async () => {
      fetchOnce(inviteFixture)
      await blutui.agency('foo').invites.remove(inviteFixture.id)

      expect(fetchURL()).toBe(
        `${blutui.baseURL}/v1/agencies/foo/invites/${inviteFixture.id}`
      )
    })
  })
})
