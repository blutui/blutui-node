import type { Role, RoleResponse } from '../../roles/interfaces'

export interface Invite {
  id: string
  object: 'invite'
  email: string
  role: string | Role
  createdAt: number
  updatedAt: number
}

export interface InviteResponse {
  id: string
  object: 'invite'
  email: string
  role: string | RoleResponse
  created_at: number
  updated_at: number
}
