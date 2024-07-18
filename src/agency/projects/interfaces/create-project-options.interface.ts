export interface CreateProjectOptions {
  name: string
  handle?: string
  timezone?: string
  description?: string | null
  subdomain?: string
}

export interface SerializedCreateProjectOptions {
  name: string
  handle?: string
  timezone?: string
  description?: string | null
  subdomain?: string
}
