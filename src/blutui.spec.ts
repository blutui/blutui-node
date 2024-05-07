import fetch from 'jest-fetch-mock'
import fs from 'fs/promises'

import { Agency } from './agency'
import { Blutui } from './blutui'
import { NoAccessTokenProvidedException, NotFoundException } from './exceptions'

import { fetchOnce } from './utils/testing'

describe('Blutui', () => {
  beforeEach(() => fetch.resetMocks())

  describe('contructor', () => {
    const OLD_ENV = process.env

    beforeEach(() => {
      jest.resetModules()
      process.env = { ...OLD_ENV }
      delete process.env.NODE_ENV
    })

    afterEach(() => {
      process.env = OLD_ENV
    })

    describe('when no access token is provided', () => {
      it('throws a NoAccessTokenProvidedException error', async () => {
        expect(() => new Blutui()).toThrow(NoAccessTokenProvidedException)
      })
    })

    describe('when access token is provided with environment variable', () => {
      it('initalizes', async () => {
        // Example from JWT.io
        process.env.BLUTUI_ACCESS_TOKEN =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
        expect(() => new Blutui()).not.toThrow()
      })
    })

    describe('when access token is provided with constructor', () => {
      it('initalizes', async () => {
        // Example from JWT.io
        const token =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
        expect(() => new Blutui(token)).not.toThrow()
      })
    })

    describe('version', () => {
      it('matches the version in `package.json`', async () => {
        const blutui = new Blutui('eyJhbGciOi')

        const packageJson = JSON.parse(
          await fs.readFile('package.json', 'utf-8')
        )

        expect(blutui.version).toBe(packageJson.version)
      })
    })

    describe('agency', () => {
      it('can create and get a new agency instance', () => {
        const blutui = new Blutui('eyJhbGciOi')

        const fooAgency = blutui.agency('foo')

        expect(fooAgency).toBeInstanceOf(Agency)
        expect(fooAgency.username).toBe('foo')
      })
    })

    describe('get', () => {
      describe('when the API responds with a 404 error', () => {
        it('throws a NotFoundException', async () => {
          const message = "The requested resource doesn't exist."
          const type = 'invalid_request_error'
          fetchOnce(
            {
              message,
              type,
            },
            { status: 404 }
          )

          const blutui = new Blutui('eyJhbGciOi')

          await expect(blutui.get('/path')).rejects.toStrictEqual(
            new NotFoundException({ message, type, path: '/path' })
          )
        })
      })
    })

    describe('post', () => {
      describe('when the API responds with a 404 error', () => {
        it('throws a NotFoundException', async () => {
          const message = "The requested resource doesn't exist."
          const type = 'invalid_request_error'
          fetchOnce(
            {
              message,
              type,
            },
            { status: 404 }
          )

          const blutui = new Blutui('eyJhbGciOi')

          await expect(blutui.post('/path', {})).rejects.toStrictEqual(
            new NotFoundException({ message, type, path: '/path' })
          )
        })
      })
    })
  })
})
