import { List, ListResponse } from '@/types'
import { Project, ProjectResponse } from '../interfaces'
import { deserializePaginationMeta } from '@/utils/serializers'

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
  object: projects.object,
  data: projects.data.map(deserializeProject),
  meta: deserializePaginationMeta(projects.meta),
})
