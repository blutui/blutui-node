export interface UpdateAgencyOptions {
  name?: string
  description?: string | null
  email?: string
  location?: string
  url?: string | null
  timezone?: string
  avatar?: string | null
}

export interface SerializedUpdateAgencyOptions {
  name?: string
  description?: string | null
  email?: string
  location?: string
  url?: string | null
  timezone?: string
  avatar?: string | null
}
