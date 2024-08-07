import type { Role, RoleResponse } from '../../roles/interfaces'

export interface Member {
  id: string
  object: 'member'
  name: string
  avatar: string | null
  email: string
  twoFactorEnabled: boolean
  hasFullAccess: boolean
  role: Omit<Role, 'permissions'>
  createdAt: number
  updatedAt: number
}

export interface MemberResponse {
  id: string
  object: 'member'
  name: string
  avatar: string | null
  email: string
  two_factor_enabled: boolean
  has_full_access: boolean
  role: Omit<RoleResponse, 'permissions'>
  created_at: number
  updated_at: number
}
