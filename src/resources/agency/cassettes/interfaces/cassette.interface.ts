import type { Project, ProjectResponse } from '../../projects/interfaces'

export interface Cassette {
  id: string
  object: 'cassette'
  handle: string
  name: string
  project: string | Project | null
  parent: string | Cassette | null
  createdAt: number
  updatedAt: number
}

export interface CassetteResponse {
  id: string
  object: 'cassette'
  handle: string
  name: string
  project: string | ProjectResponse | null
  parent: string | CassetteResponse | null
  created_at: number
  updated_at: number
}
