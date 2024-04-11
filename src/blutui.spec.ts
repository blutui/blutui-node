import { Blutui } from './blutui'
import { NoAccessTokenProvidedException } from './exceptions'

describe('Blutui', () => {
  describe('contructor', () => {
    const OLD_ENV = process.env

    beforeEach(() => {
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
  })
})
