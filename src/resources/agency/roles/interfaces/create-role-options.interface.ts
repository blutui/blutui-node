import type { Permission } from './role.interface'

export interface CreateRoleOptions {
  name: string
  description?: string | null
  permissions?: {
    [key in Permission]: boolean
  }
}

export interface SerializedCreateRoleOptions {
  name: string
  description?: string | null
  permissions?: {
    [key in Permission]: boolean
  }
}
