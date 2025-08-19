import type { Cassette, CassetteResponse } from '../../cassettes/interfaces'
import type { Domain, DomainResponse } from '../../domains/interfaces'
import type {
  ProjectBrand,
  ProjectBrandResponse,
} from './project-brand.interface'

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
  primaryDomain: string | null | Domain
  cassette: string | null | Cassette
  brand: string | null | ProjectBrand
  published: boolean
  processed: boolean
  createdAt: string
  updatedAt: string
  deletedAt?: string
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
  primary_domain: string | null | DomainResponse
  cassette: string | null | CassetteResponse
  brand: string | null | ProjectBrandResponse
  published: boolean
  processed: boolean
  created_at: string
  updated_at: string
  deleted_at?: string
}
