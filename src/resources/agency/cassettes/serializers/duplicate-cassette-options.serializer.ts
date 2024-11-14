import type {
  DuplicateCassetteOptions,
  SerializedDuplicateCassetteOptions,
} from '../interfaces'

export const serializeDuplicateCassetteOptions = (
  options: DuplicateCassetteOptions
): SerializedDuplicateCassetteOptions => ({
  handle: options.handle,
  name: options.name,
})
