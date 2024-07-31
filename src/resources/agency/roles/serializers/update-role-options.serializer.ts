import type {
  SerializedUpdateRoleOptions,
  UpdateRoleOptions,
} from '../interfaces'

export const serializeUpdateRoleOptions = (
  options: UpdateRoleOptions
): SerializedUpdateRoleOptions => ({
  name: options.name,
  description: options.description,
  permissions: options.permissions,
})
