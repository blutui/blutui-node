export interface UpdateRoleOptions {
  name?: string
  description?: string | null
  permissions?: {
    [key: string]: boolean
  }
}

export interface SerializedUpdateRoleOptions {
  name?: string
  description?: string | null
  permissions?: {
    [key: string]: boolean
  }
}
