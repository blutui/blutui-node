import fetch from 'jest-fetch-mock'
import { Blutui } from '@/blutui'
import { fetchOnce, fetchURL } from '@/utils/testing'

// import projectFixture from './fixtures/project.json'
import projectListFixture from './fixtures/project-list.json'

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
const blutui = new Blutui(accessToken)

describe('Project', () => {
  beforeEach(() => fetch.resetMocks())

  describe('list', () => {
    it('can retrieve a list of projects', async () => {
      fetchOnce(projectListFixture)
      const projects = await blutui.agency('foo').projects.list()

      expect(fetchURL()).toBe(blutui.baseURL + `/v1/agencies/foo/projects`)
      expect(projects).toMatchObject({
        object: 'list',
      })
    })

    it('can retrieve a list of projects with an expanded primary domain', async () => {
      fetchOnce(projectListFixture)
      const projects = await blutui
        .agency('foo')
        .projects.list({ expand: ['primary_domain'] })

      expect(fetchURL()).toBe(
        blutui.baseURL + `/v1/agencies/foo/projects?expand%5B%5D=primary_domain`
      )
      expect(projects).toMatchObject({
        object: 'list',
      })
    })
  })
})
