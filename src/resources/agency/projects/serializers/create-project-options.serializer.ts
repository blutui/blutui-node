import type {
  CreateProjectOptions,
  SerializedCreateProjectOptions,
} from '../interfaces'

export const serializeCreateProjectOptions = (
  options: CreateProjectOptions
): SerializedCreateProjectOptions => ({
  name: options.name,
  handle: options.handle,
  timezone: options.timezone,
  description: options.description,
  subdomain: options.subdomain,
})
