export interface Project {
  id: string
  object: 'project'
  name: string
  description: string | null
  image: string | null
  handle: string
  password: string
  timezone: string
  subdomain: string
  primaryDomain: string | Record<string, unknown>
  published: boolean
  processed: boolean
  createdAt: number
  updatedAt: number
  deletedAt?: number
}

export interface ProjectResponse {
  id: string
  object: 'project'
  name: string
  description: string | null
  image: string | null
  handle: string
  password: string
  timezone: string
  subdomain: string
  primary_domain: string | Record<string, unknown>
  published: boolean
  processed: boolean
  created_at: number
  updated_at: number
  deleted_at?: number
}
