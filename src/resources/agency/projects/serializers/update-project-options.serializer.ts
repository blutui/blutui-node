import type {
  SerializedUpdateProjectOptions,
  UpdateProjectOptions,
} from '../interfaces'

export const serializeUpdateProjectOptions = (
  options: UpdateProjectOptions
): SerializedUpdateProjectOptions => ({
  name: options.name,
  description: options.description,
  password: options.password,
  timezone: options.timezone,
  primary_domain: options.primaryDomain,
})
