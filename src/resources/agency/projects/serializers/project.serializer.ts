import { deserializePaginationMeta } from '@/utils/serializers'

import type { Project, ProjectResponse } from '../interfaces'
import type { List, ListResponse } from '@/types'

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
  primaryDomain: project.primary_domain,
  published: project.published,
  processed: project.processed,
  createdAt: project.created_at,
  updatedAt: project.updated_at,
  deletedAt: project.deleted_at,
})

export const deserializeProjectList = (
  projects: ListResponse<ProjectResponse>
): List<Project> => ({
  object: 'list',
  data: projects.data.map(deserializeProject),
  meta: deserializePaginationMeta(projects.meta),
})
