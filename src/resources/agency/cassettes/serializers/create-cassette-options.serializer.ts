import type {
  CreateCassetteOptions,
  SerializedCreateCassetteOptions,
} from '../interfaces'

export const serializeCreateCassetteOptions = (
  options: CreateCassetteOptions
): SerializedCreateCassetteOptions => ({
  handle: options.handle,
  name: options.name,
  project: options.project,
})
