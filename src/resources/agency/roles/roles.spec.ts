import fetch from 'jest-fetch-mock'
import { Blutui } from '@/blutui'
import { fetchOnce, fetchURL } from '@/utils/testing'

import roleFixture from './fixtures/role.json'
import roleListFixture from './fixtures/role-list.json'

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
const blutui = new Blutui(accessToken)

describe('Role', () => {
  beforeEach(() => fetch.resetMocks())

  describe('list', () => {
    it('can retrieve a list of roles', async () => {
      fetchOnce(roleListFixture)
      const domains = await blutui.agency('foo').roles.list()

      expect(fetchURL()).toBe(`${blutui.baseURL}/v1/agencies/foo/roles`)
      expect(domains).toMatchObject({
        object: 'list',
      })
    })
  })

  describe('get', () => {
    it('can retrieve a role information', async () => {
      fetchOnce(roleFixture)
      const role = await blutui.agency('foo').roles.get(roleFixture.id)

      expect(fetchURL()).toBe(
        `${blutui.baseURL}/v1/agencies/foo/roles/${roleFixture.id}`
      )
      expect(role).toMatchObject({
        object: 'role',
      })
    })
  })

  describe('create', () => {
    it('can create a new role', async () => {
      fetchOnce(roleFixture)
      const role = await blutui.agency('foo').roles.create({
        name: 'Owner',
      })

      expect(fetchURL()).toBe(`${blutui.baseURL}/v1/agencies/foo/roles`)
      expect(role).toMatchObject({
        object: 'role',
        name: 'Owner',
      })
    })
  })

  describe('update', () => {
    it('can update an agency role', async () => {
      fetchOnce(roleFixture)
      const role = await blutui
        .agency('foo')
        .roles.update(roleFixture.id, { name: 'New Role Name' })

      expect(fetchURL()).toBe(
        `${blutui.baseURL}/v1/agencies/foo/roles/${roleFixture.id}`
      )
      expect(role).toMatchObject({
        object: 'role',
      })
    })
  })

  describe('remove', () => {
    it('can remove an role', async () => {
      fetchOnce(roleFixture)
      await blutui.agency('foo').roles.remove(roleFixture.id)

      expect(fetchURL()).toBe(
        `${blutui.baseURL}/v1/agencies/foo/roles/${roleFixture.id}`
      )
    })
  })
})
