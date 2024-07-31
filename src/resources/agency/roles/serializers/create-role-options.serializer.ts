import type {
  CreateRoleOptions,
  SerializedCreateRoleOptions,
} from '../interfaces'

export const serializeCreateRoleOptions = (
  options: CreateRoleOptions
): SerializedCreateRoleOptions => ({
  name: options.name,
  description: options.description,
  permissions: options.permissions,
})
