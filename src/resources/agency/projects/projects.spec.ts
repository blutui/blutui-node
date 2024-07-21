import fetch from 'jest-fetch-mock'
import { Blutui } from '@/blutui'
import { fetchOnce, fetchURL } from '@/utils/testing'

import projectFixture from './fixtures/project.json'
import projectListFixture from './fixtures/project-list.json'
import domainListFixture from '../domains/fixtures/domain-list.json'

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
const blutui = new Blutui(accessToken)

describe('Project', () => {
  beforeEach(() => fetch.resetMocks())

  describe('list', () => {
    it('can retrieve a list of projects', async () => {
      fetchOnce(projectListFixture)
      const projects = await blutui.agency('foo').projects.list()

      expect(fetchURL()).toBe(`${blutui.baseURL}/v1/agencies/foo/projects`)
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
        encodeURI(
          `${blutui.baseURL}/v1/agencies/foo/projects?expand[]=primary_domain`
        )
      )
      expect(projects).toMatchObject({
        object: 'list',
      })
    })
  })

  describe('get', () => {
    it('can retrieve a project', async () => {
      fetchOnce(projectFixture)
      const project = await blutui.agency('foo').projects.get(projectFixture.id)

      expect(fetchURL()).toBe(
        `${blutui.baseURL}/v1/agencies/foo/projects/${projectFixture.id}`
      )
      expect(project).toMatchObject({
        id: '99bc147e-966c-4dd0-8def-de817c63cf41',
        object: 'project',
      })
    })

    it('can retrieve a project with an expanded primary domain', async () => {
      fetchOnce(projectFixture)
      const project = await blutui
        .agency('foo')
        .projects.get(projectFixture.id, { expand: ['primary_domain'] })

      expect(fetchURL()).toBe(
        encodeURI(
          `${blutui.baseURL}/v1/agencies/foo/projects/${projectFixture.id}?expand[]=primary_domain`
        )
      )
      expect(project).toMatchObject({
        id: '99bc147e-966c-4dd0-8def-de817c63cf41',
        object: 'project',
      })
    })
  })

  describe('create', () => {
    it('can create a new project', async () => {
      fetchOnce(projectFixture)
      const project = await blutui.agency('foo').projects.create({
        name: 'One',
      })

      expect(fetchURL()).toBe(`${blutui.baseURL}/v1/agencies/foo/projects`)
      expect(project).toMatchObject({
        object: 'project',
        name: 'One',
      })
    })
  })

  describe('update', () => {
    it('can update a project', async () => {
      fetchOnce(projectFixture)
      const project = await blutui
        .agency('foo')
        .projects.update(projectFixture.id, {
          primaryDomain: projectFixture.primary_domain,
        })

      expect(fetchURL()).toBe(
        `${blutui.baseURL}/v1/agencies/foo/projects/${projectFixture.id}`
      )
      expect(project).toMatchObject({
        object: 'project',
        primaryDomain: '9bfdb42b-1bf0-4510-978e-46aa329f8efa',
      })
    })
  })

  describe('remove', () => {
    it('can archive a project', async () => {
      fetchOnce({ id: projectFixture.id, object: 'project', deleted: true })
      const archivedProject = await blutui
        .agency('foo')
        .projects.remove(projectFixture.id)

      expect(fetchURL()).toBe(
        `${blutui.baseURL}/v1/agencies/foo/projects/${projectFixture.id}`
      )
      expect(archivedProject).toMatchObject({
        id: '99bc147e-966c-4dd0-8def-de817c63cf41',
        object: 'project',
        deleted: true,
      })
    })
  })

  describe('archived', () => {
    it('can retrieve a list of archived projects', async () => {
      fetchOnce(projectListFixture)
      const projects = await blutui
        .agency('foo')
        .projects.archived({ limit: 2 })

      expect(fetchURL()).toBe(
        encodeURI(`${blutui.baseURL}/v1/agencies/foo/projects/archived?limit=2`)
      )
      expect(projects).toMatchObject({
        object: 'list',
      })
    })
  })

  describe('restore', () => {
    it('can restore an archived project', async () => {
      fetchOnce(projectFixture)
      const project = await blutui
        .agency('foo')
        .projects.restore(projectFixture.id)

      expect(fetchURL()).toBe(
        `${blutui.baseURL}/v1/agencies/foo/projects/${projectFixture.id}/archived`
      )
      expect(project).toMatchObject({
        object: 'project',
        name: 'One',
      })
    })
  })

  describe('domains', () => {
    it('can retrieve a list of domains for a project', async () => {
      fetchOnce(domainListFixture)
      const domains = await blutui
        .agency('foo')
        .projects.domains(projectFixture.id)

      expect(fetchURL()).toBe(
        `${blutui.baseURL}/v1/agencies/foo/projects/${projectFixture.id}/domains`
      )
      expect(domains).toMatchObject({
        object: 'list',
      })
    })
  })

  describe('search', () => {
    it('can search for projects', async () => {
      fetchOnce(projectListFixture)
      const projects = await blutui
        .agency('foo')
        .projects.search({ name: 'One' })

      expect(fetchURL()).toBe(
        `${blutui.baseURL}/v1/agencies/foo/projects/search`
      )
      expect(projects).toMatchObject({
        object: 'list',
      })
    })
  })

  describe('publish', () => {
    it('can publish a project', async () => {
      fetchOnce(projectFixture)
      const project = await blutui
        .agency('foo')
        .projects.publish(projectFixture.id)

      expect(fetchURL()).toBe(
        `${blutui.baseURL}/v1/agencies/foo/projects/${projectFixture.id}/publish`
      )
      expect(project).toMatchObject({
        id: '99bc147e-966c-4dd0-8def-de817c63cf41',
        object: 'project',
      })
    })
  })

  describe('republish', () => {
    it('can republish a project', async () => {
      fetchOnce(projectFixture)
      const project = await blutui
        .agency('foo')
        .projects.republish(projectFixture.id)

      expect(fetchURL()).toBe(
        `${blutui.baseURL}/v1/agencies/foo/projects/${projectFixture.id}/republish`
      )
      expect(project).toMatchObject({
        id: '99bc147e-966c-4dd0-8def-de817c63cf41',
        object: 'project',
      })
    })
  })

  describe('unpublish', () => {
    it('can unpublish a project', async () => {
      fetchOnce(projectFixture)
      const project = await blutui
        .agency('foo')
        .projects.unpublish(projectFixture.id)

      expect(fetchURL()).toBe(
        `${blutui.baseURL}/v1/agencies/foo/projects/${projectFixture.id}/unpublish`
      )
      expect(project).toMatchObject({
        id: '99bc147e-966c-4dd0-8def-de817c63cf41',
        object: 'project',
      })
    })
  })
})
