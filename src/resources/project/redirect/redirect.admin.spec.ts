import fetch from 'jest-fetch-mock'
import { Blutui } from '@/blutui'
import { fetchOnce, fetchURL } from '@/utils/testing'

import redirectListFixture from './fixtures/redirect-list.json'
import redirectFixture from './fixtures/redirect.json'

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
const blutui = new Blutui(accessToken)

describe('Redirect', () => {
  beforeEach(() => fetch.resetMocks())

  describe('list', () => {
    it('can retrieve a list of redirects', async () => {
      fetchOnce(redirectListFixture)
      const redirects = await blutui.project('foo').admin.redirects.list()

      expect(fetchURL()).toBe('https://foo.blutui.com/admin/api/redirects')
      expect(redirects).toMatchObject({
        object: 'list',
      })
    })
  })

  describe('get', () => {
    it('can retrieve a redirect information', async () => {
      fetchOnce(redirectFixture)
      const redirect = await blutui
        .project('foo')
        .admin.redirects.get(redirectFixture.id)

      expect(fetchURL()).toBe(
        `https://foo.blutui.com/admin/api/redirects/${redirectFixture.id}`
      )

      expect(redirect).toMatchObject({
        object: 'redirect',
      })
    })
  })

  describe('create', () => {
    it('can create a new redirect', async () => {
      fetchOnce(redirectFixture)
      const redirect = await blutui.project('foo').admin.redirects.create({
        from: '/contact',
        to: '/contact-us',
      })

      expect(fetchURL()).toBe('https://foo.blutui.com/admin/api/redirects')
      expect(redirect).toMatchObject({
        object: 'redirect',
      })
    })
  })

  describe('update', () => {
    it('can update a redirect', async () => {
      fetchOnce(redirectFixture)
      const redirect = await blutui
        .project('foo')
        .admin.redirects.update(redirectFixture.id, {
          from: '/contact',
          to: '/contact-us',
        })

      expect(fetchURL()).toBe(
        `https://foo.blutui.com/admin/api/redirects/${redirectFixture.id}`
      )
      expect(redirect).toMatchObject({
        object: 'redirect',
      })
    })
  })

  describe('remove', () => {
    it('can remove a redirect', async () => {
      fetchOnce(redirectFixture)
      await blutui.project('foo').admin.redirects.remove(redirectFixture.id)

      expect(fetchURL()).toBe(
        `https://foo.blutui.com/admin/api/redirects/${redirectFixture.id}`
      )
    })
  })
})
