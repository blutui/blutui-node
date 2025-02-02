import type {
  SerializedUpdateRedirectOptions,
  UpdateRedirectOptions,
} from '../interfaces'

export const serializeUpdateRedirectOptions = (
  options: UpdateRedirectOptions
): SerializedUpdateRedirectOptions => ({
  from: options.from,
  to: options.to,
})
