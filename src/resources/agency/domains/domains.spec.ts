import fetch from 'jest-fetch-mock'
import { Blutui } from '@/blutui'
import { fetchOnce, fetchURL } from '@/utils/testing'

import domainFixture from './fixtures/domain.json'
import domainWithProjectFixture from './fixtures/domain-with-project.json'
import domainListFixture from './fixtures/domain-list.json'

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
const blutui = new Blutui(accessToken)

describe('Domain', () => {
  beforeEach(() => fetch.resetMocks())

  describe('list', () => {
    it('can retrieve a list of domains', async () => {
      fetchOnce(domainListFixture)
      const domains = await blutui.agency('foo').domains.list()

      expect(fetchURL()).toBe(`${blutui.baseURL}/v1/agencies/foo/domains`)
      expect(domains).toMatchObject({
        object: 'list',
      })
    })
  })

  describe('get', () => {
    it('can retrieve a domain information', async () => {
      fetchOnce(domainFixture)
      const domain = await blutui.agency('foo').domains.get(domainFixture.id)

      expect(fetchURL()).toBe(
        `${blutui.baseURL}/v1/agencies/foo/domains/${domainFixture.id}`
      )
      expect(domain).toMatchObject({
        object: 'domain',
      })
      expect(typeof domain.project).toBe('string')
    })

    it('can retrieve a domain information with project', async () => {
      fetchOnce(domainWithProjectFixture)
      const domain = await blutui
        .agency('foo')
        .domains.get(domainWithProjectFixture.id, {
          expand: ['project'],
        })
      expect(fetchURL()).toContain(
        encodeURI(
          `/v1/agencies/foo/domains/${domainWithProjectFixture.id}?expand[]=project`
        )
      )
      expect(domain).toMatchObject({
        object: 'domain',
      })
      expect(domain.project).toMatchObject({
        id: '99bc147e-966c-4dd0-8def-de817c63cf41',
        createdAt: 1720758022,
      })
    })
  })

  describe('create', () => {
    it('can create a new agency domain', async () => {
      fetchOnce(domainFixture)
      const domain = await blutui.agency('foo').domains.create({
        name: 'example.com',
      })

      expect(fetchURL()).toBe(`${blutui.baseURL}/v1/agencies/foo/domains`)
      expect(domain).toMatchObject({
        object: 'domain',
        name: 'example.com',
      })
    })
  })

  describe('update', () => {
    it('can update an agency domain', async () => {
      fetchOnce(domainFixture)
      const domain = await blutui
        .agency('foo')
        .domains.update(domainFixture.id, { project: 'project-uuid' })

      expect(fetchURL()).toBe(
        `${blutui.baseURL}/v1/agencies/foo/domains/${domainFixture.id}`
      )
      expect(domain).toMatchObject({
        object: 'domain',
      })
    })
  })

  describe('remove', () => {
    it('can remove an agency domain', async () => {
      fetchOnce(domainFixture)
      await blutui.agency('foo').domains.remove(domainFixture.id)

      expect(fetchURL()).toBe(
        `${blutui.baseURL}/v1/agencies/foo/domains/${domainFixture.id}`
      )
    })
  })

  describe('refresh', () => {
    it('can refresh domain token', async () => {
      fetchOnce(domainFixture)
      await blutui.agency('foo').domains.refresh(domainFixture.id)

      expect(fetchURL()).toBe(
        `${blutui.baseURL}/v1/agencies/foo/domains/${domainFixture.id}/refresh`
      )
    })
  })

  describe('verify', () => {
    it('can verify domain status', async () => {
      fetchOnce(domainFixture)
      await blutui.agency('foo').domains.verify(domainFixture.id)

      expect(fetchURL()).toBe(
        `${blutui.baseURL}/v1/agencies/foo/domains/${domainFixture.id}/verify`
      )
    })
  })

  describe('search', () => {
    it('can search for domains', async () => {
      fetchOnce(domainListFixture)
      await blutui.agency('foo').domains.search({ name: 'example.com' })

      expect(fetchURL()).toBe(
        `${blutui.baseURL}/v1/agencies/foo/domains/search`
      )
    })
  })
})
