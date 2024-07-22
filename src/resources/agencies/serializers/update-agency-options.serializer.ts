import type {
  SerializedUpdateAgencyOptions,
  UpdateAgencyOptions,
} from '../interfaces'

export const serializeUpdateAgencyOptions = (
  options: UpdateAgencyOptions
): SerializedUpdateAgencyOptions => ({
  name: options.name,
  description: options.description,
  email: options.email,
  location: options.location,
  url: options.url,
  timezone: options.timezone,
  avatar: options.avatar,
})
