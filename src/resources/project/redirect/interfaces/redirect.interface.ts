export interface Redirect {
  id: string
  object: 'redirect'
  from: string
  to: string
  createdAt: string
  updatedAt: string
  deletedAt?: string
}

export interface RedirectResponse {
  id: string
  object: 'redirect'
  from: string
  to: string
  created_at: string
  updated_at: string
  deleted_at?: string
}
