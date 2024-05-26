export interface Domain {
  id: string
  object: 'domain'
  name: string
  token: string
  project: string | Record<string, unknown>
  verifiedAt: number
  createdAt: number
  updatedAt: number
}

export interface DomainResponse {
  id: string
  object: 'domain'
  name: string
  token: string
  project: string | Record<string, unknown>
  verified_at: number
  created_at: number
  updated_at: number
}
