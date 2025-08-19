import type { Brand, BrandResponse } from '../../brand/interfaces'
import type { Domain, DomainResponse } from '../../domains/interfaces'

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
  brand: string | null | Brand
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
  primary_domain: string | null | DomainResponse
  brand: string | null | BrandResponse
  published: boolean
  processed: boolean
  created_at: number
  updated_at: number
  deleted_at?: number
}
