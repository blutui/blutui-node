import type {
  CreateRedirectOptions,
  SerializedCreateRedirectOptions,
} from '../interfaces'

export const serializeCreateRedirectOptions = (
  options: CreateRedirectOptions
): SerializedCreateRedirectOptions => ({
  from: options.from,
  to: options.to,
})
