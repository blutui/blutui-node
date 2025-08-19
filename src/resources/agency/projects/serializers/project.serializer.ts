import type { List, ListResponse } from '@/types'
import { deserializePaginationMeta } from '@/utils/serializers'
import { deserializeCassette } from '../../cassettes/serializers'
import { deserializeDomain } from '../../domains/serializers'
import type { Project, ProjectResponse } from '../interfaces'
import { deserializeProjectBrand } from './project-brand.serializer'

export const deserializeProject = (project: ProjectResponse): Project => ({
  id: project.id,
  object: project.object,
  name: project.name,
  description: project.description,
  image: project.image,
  handle: project.handle,
  password: project.password,
  timezone: project.timezone,
  subdomain: project.subdomain,
  primaryDomain:
    project.primary_domain instanceof Object
      ? deserializeDomain(project.primary_domain)
      : project.primary_domain,
  cassette:
    project.cassette instanceof Object
      ? deserializeCassette(project.cassette)
      : project.cassette,
  brand:
    project.brand instanceof Object
      ? deserializeProjectBrand(project.brand)
      : project.brand,
  published: project.published,
  processed: project.processed,
  createdAt: project.created_at,
  updatedAt: project.updated_at,
  deletedAt: project.deleted_at,
})

export const deserializeProjectList = (
  projects: ListResponse<ProjectResponse>
): List<Project> => ({
  object: projects.object,
  data: projects.data.map(deserializeProject),
  meta: deserializePaginationMeta(projects.meta),
})
