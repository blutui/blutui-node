import { CreateBrandOptions, SerializedCreateBrandOptions } from '../interfaces'

export const serializeCreateBrandOptions = (
  options: CreateBrandOptions
): SerializedCreateBrandOptions => ({
  logo: options.logo,
  primary_color: options.primaryColor,
  secondary_color: options.secondaryColor,
})
