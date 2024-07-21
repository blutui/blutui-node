import type {
  SerializedUpdateBrandOptions,
  UpdateBrandOptions,
} from '../interfaces'

export const serializeUpdateBrandOptions = (
  options: UpdateBrandOptions
): SerializedUpdateBrandOptions => ({
  logo: options.logo,
  primary_color: options.primaryColor,
  secondary_color: options.secondaryColor,
})
