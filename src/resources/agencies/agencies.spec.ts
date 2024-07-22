import fetch from 'jest-fetch-mock'
import { Blutui } from '@/blutui'
import { fetchOnce, fetchURL } from '@/utils/testing'

import agencyFixture from './fixtures/agency.json'
import agencyListFixture from './fixtures/agency-list.json'

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
const blutui = new Blutui(accessToken)

describe('Agency', () => {
  beforeEach(() => fetch.resetMocks())

  describe('list', () => {
    it('can retrieve a list of agencies', async () => {
      fetchOnce(agencyListFixture)
      const agencies = await blutui.agencies.list()

      expect(fetchURL()).toBe(`${blutui.baseURL}/v1/agencies`)
      expect(agencies).toMatchObject({
        object: 'list',
      })
    })
  })

  describe('get', () => {
    it('can retrieve an agency', async () => {
      fetchOnce(agencyFixture)
      const agency = await blutui.agencies.get(agencyFixture.id)

      expect(fetchURL()).toBe(
        `${blutui.baseURL}/v1/agencies/${agencyFixture.id}`
      )
      expect(agency).toMatchObject({
        id: '9af3accc-1536-4336-8cc3-3b3b2a96c18a',
        object: 'agency',
        isAgency: false,
      })
    })
  })

  describe('update', () => {
    it('can update an agency', async () => {
      fetchOnce(agencyFixture)
      const agency = await blutui.agencies.update(agencyFixture.id, {
        name: 'Foo',
      })

      expect(fetchURL()).toBe(
        `${blutui.baseURL}/v1/agencies/${agencyFixture.id}`
      )
      expect(agency).toMatchObject({
        id: '9af3accc-1536-4336-8cc3-3b3b2a96c18a',
        object: 'agency',
        isAwsCustomer: false,
      })
    })
  })
})
