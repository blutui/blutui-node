import type { Project, ProjectResponse } from '../../projects/interfaces'

export interface Domain {
  id: string
  object: 'domain'
  name: string
  token: string
  project: string | null | Project
  verifiedAt: number | null
  createdAt: number
  updatedAt: number
}

export interface DomainResponse {
  id: string
  object: 'domain'
  name: string
  token: string
  project: string | null | ProjectResponse
  verified_at: number | null
  created_at: number
  updated_at: number
}
