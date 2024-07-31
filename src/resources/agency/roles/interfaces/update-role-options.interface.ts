import type { Permission } from './role.interface'

export interface UpdateRoleOptions {
  name?: string
  description?: string | null
  permissions?: {
    [key in Permission]: boolean
  }
}

export interface SerializedUpdateRoleOptions {
  name?: string
  description?: string | null
  permissions?: {
    [key in Permission]: boolean
  }
}
