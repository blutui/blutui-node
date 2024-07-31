export type Permission =
  | 'domain.delete'
  | 'domain.read'
  | 'domain.write'
  | 'organization.delete'
  | 'organization.read'
  | 'organization.write'
  | 'site.delete'
  | 'site.export'
  | 'site.publish'
  | 'site.read'
  | 'site.transfer'
  | 'site.write'
  | 'stripe'
  | 'user.admin'
  | 'user.delete'
  | 'user.invite'
  | 'user.read'

export interface Role {
  id: string
  object: 'role'
  name: string
  description: string
  isSuper: boolean
  usersCount?: number
  permissions: { [key in Permission]: boolean }
  createdAt: number
  updatedAt: number
}

export interface RoleResponse {
  id: string
  object: 'role'
  name: string
  description: string
  is_super: boolean
  users_count?: number
  permissions: { [key in Permission]: boolean }
  created_at: number
  updated_at: number
}
