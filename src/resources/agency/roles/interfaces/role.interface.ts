export interface Role {
  id: string
  object: 'role'
  name: string
  description: string
  isSuper: boolean
  usersCount?: number
  permissions: { [key: string]: boolean }
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
  permissions: { [key: string]: boolean }
  created_at: number
  updated_at: number
}
