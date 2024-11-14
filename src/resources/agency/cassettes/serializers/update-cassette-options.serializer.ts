import type {
  SerializedUpdateCassetteOptions,
  UpdateCassetteOptions,
} from '../interfaces'

export const serializeUpdateCassetteOptions = (
  options: UpdateCassetteOptions
): SerializedUpdateCassetteOptions => ({
  name: options.name,
})
