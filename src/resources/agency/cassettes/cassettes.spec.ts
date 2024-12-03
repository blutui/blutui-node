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

  describe('create', () => {
    it('can create a new cassette', async () => {
      fetchOnce(cassetteFixture)
      const cassette = await blutui.agency('foo').cassettes.create({
        handle: 'default',
        name: 'Default',
        project: 'project-id',
      })

      expect(fetchURL()).toBe(`${blutui.baseURL}/v1/agencies/foo/cassettes`)
      expect(cassette).toMatchObject({
        object: 'cassette',
        name: 'Default',
      })
    })
  })

  describe('update', () => {
    it('can update an existing cassette', async () => {
      fetchOnce(cassetteFixture)
      const cassette = await blutui
        .agency('foo')
        .cassettes.update(cassetteFixture.id, {
          name: 'Default',
        })

      expect(fetchURL()).toBe(
        `${blutui.baseURL}/v1/agencies/foo/cassettes/${cassetteFixture.id}`
      )
      expect(cassette).toMatchObject({
        object: 'cassette',
        name: 'Default',
      })
    })
  })

  describe('remove', () => {
    it('can remove a cassette', async () => {
      fetchOnce({ id: cassetteFixture.id, object: 'cassette', deleted: true })
      const cassette = await blutui
        .agency('foo')
        .cassettes.remove(cassetteFixture.id)

      expect(fetchURL()).toBe(
        `${blutui.baseURL}/v1/agencies/foo/cassettes/${cassetteFixture.id}`
      )
      expect(cassette).toMatchObject({
        object: 'cassette',
        deleted: true,
      })
    })
  })

  describe('duplicate', () => {
    it('can duplicate an existing cassette', async () => {
      fetchOnce(cassetteFixture)
      const cassette = await blutui
        .agency('foo')
        .cassettes.duplicate(cassetteFixture.id, {
          name: 'Default',
          handle: 'default',
        })

      expect(fetchURL()).toBe(
        `${blutui.baseURL}/v1/agencies/foo/cassettes/${cassetteFixture.id}/duplicate`
      )
      expect(cassette).toMatchObject({
        object: 'cassette',
      })
    })
  })
})
