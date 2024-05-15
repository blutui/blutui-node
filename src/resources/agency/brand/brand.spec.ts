import fetch from 'jest-fetch-mock'

import { Blutui } from '@/blutui'
import { fetchOnce, fetchURL } from '@/utils/testing'

import brandFixture from './fixtures/brand.json'

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
const blutui = new Blutui(accessToken)

describe('Brand', () => {
  beforeEach(() => fetch.resetMocks())

  it('can handle aurhorization error', async () => {
    fetchOnce({}, { status: 401 })

    await expect(
      blutui.agency('foo').brand.get()
    ).rejects.toThrow('The request could not be authorized. Maybe your access token is invalid?')
  })

  it('can handle validation error', async () => {
    fetchOnce({}, { status: 422 })

    await expect(
      blutui.agency('foo').brand.create({
        primaryColor: '#NOT_VALID_COLOR',
        secondaryColor: '#NOT_VALID_COLOR',
      })
    ).rejects.toThrow('Validation failed.')
  })


  describe('get', () => {
    it('can get the agency brand', async () => {
      fetchOnce(brandFixture)
      const brand = await blutui.agency('foo').brand.get()

      expect(fetchURL()).toContain('/v1/agencies/foo/brand')
      expect(brand).toMatchObject({
        object: 'brand',
      })
    })

    it('return not found message when the agency do not have brand', async () => {
      const brand = await blutui.agency('foo').brand.get()
      expect(fetchURL()).toContain('/v1/agencies/foo/brand')
      expect(brand).toMatchObject({
        message: 'No brand found for this agency.',
      })
    })
  })

  describe('create', () => {
    it('can create a new agency brand', async () => {
      fetchOnce(brandFixture)
      const brand = await blutui.agency('foo').brand.create({
        primaryColor: '#6227FF',
        secondaryColor: '#333333',
      })

      expect(fetchURL()).toContain('/v1/agencies/foo/brand')
      expect(brand).toMatchObject({
        id: '9bfdb42b-1bf0-4510-978e-46aa329f8efa',
        object: 'brand',
        logo: 'https://cdn.blutui.com/uploads/assets/logo/youragency.svg',
        primaryColor: '#6227FF',
        secondaryColor: '#333333',
      })
    })
  })

  describe('update', () => {
    it('can update an agency brand', async () => {
      fetchOnce(brandFixture)
      const brand = await blutui.agency('foo').brand.update({
        primaryColor: '#6227FF',
      })

      expect(fetchURL()).toContain('/v1/agencies/foo/brand')
      expect(brand).toMatchObject({
        object: 'brand',
      })
    })
  })

  describe('remove', () => {
    it('can remove an agency brand', async () => {
      fetchOnce({
        id: '9bfdb42b-1bf0-4510-978e-46aa329f8efa',
        object: 'brand',
        deleted: true,
      })
      const brand = await blutui.agency('foo').brand.remove()

      expect(fetchURL()).toContain('/v1/agencies/foo/brand')
      expect(brand).toMatchObject({
        id: '9bfdb42b-1bf0-4510-978e-46aa329f8efa',
        object: 'brand',
        deleted: true,
      })
    })
  })
})
