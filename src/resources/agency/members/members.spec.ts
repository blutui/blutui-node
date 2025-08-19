import fetch from 'jest-fetch-mock'
import { Blutui } from '@/blutui'
import { ValidationException } from '@/exceptions'
import { fetchOnce, fetchURL } from '@/utils/testing'
import memberFixture from './fixtures/member.json'
import memberListFixture from './fixtures/member-list.json'

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
const blutui = new Blutui(accessToken)

describe('Member', () => {
  beforeEach(() => fetch.resetMocks())

  describe('list', () => {
    it('can retrieve a list of members', async () => {
      fetchOnce(memberListFixture)
      const members = await blutui.agency('foo').members.list()

      expect(fetchURL()).toBe(`${blutui.baseURL}/v1/agencies/foo/members`)
      expect(members).toMatchObject({
        object: 'list',
        data: [{ hasFullAccess: true }],
      })
    })
  })

  describe('get', () => {
    it('can retrieve a member', async () => {
      fetchOnce(memberFixture)
      const member = await blutui.agency('foo').members.get(memberFixture.id)

      expect(fetchURL()).toBe(
        `${blutui.baseURL}/v1/agencies/foo/members/${memberFixture.id}`
      )
      expect(member).toMatchObject({
        object: 'member',
      })
    })
  })

  describe('update', () => {
    it('can update a member', async () => {
      fetchOnce(memberFixture)
      const member = await blutui
        .agency('foo')
        .members.update(memberFixture.id, { role: 2 })

      expect(fetchURL()).toBe(
        `${blutui.baseURL}/v1/agencies/foo/members/${memberFixture.id}`
      )
      expect(member).toMatchObject({
        object: 'member',
      })
    })

    it('can not update the current users member information', async () => {
      fetchOnce(
        { message: 'You can not update your own agency access.' },
        { status: 422 }
      )

      await expect(
        blutui.agency('foo').members.update('my-id', { role: 2 })
      ).rejects.toThrow(ValidationException)
    })
  })

  describe('remove', () => {
    it('can remove a member from an agency', async () => {
      fetchOnce({ id: memberFixture.id, object: 'member', deleted: true })
      const removedMember = await blutui
        .agency('foo')
        .members.remove(memberFixture.id)

      expect(fetchURL()).toBe(
        `${blutui.baseURL}/v1/agencies/foo/members/${memberFixture.id}`
      )
      expect(removedMember).toMatchObject({
        object: 'member',
      })
    })
  })
})
