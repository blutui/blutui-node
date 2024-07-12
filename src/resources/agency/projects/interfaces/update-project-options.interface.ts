export interface UpdateProjectOptions {
  name?: string
  description?: string | null
  password?: string
  timezone?: string
  primaryDomain?: string | null
}

export interface SerializedUpdateProjectOptions {
  name?: string
  description?: string | null
  password?: string
  timezone?: string
  primary_domain?: string | null
}
