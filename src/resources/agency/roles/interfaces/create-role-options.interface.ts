export interface CreateRoleOptions {
  name: string
  description?: string | null
  permissions?: {
    [key: string]: boolean
  }
}

export interface SerializedCreateRoleOptions {
  name: string
  description?: string | null
  permissions?: {
    [key: string]: boolean
  }
}
