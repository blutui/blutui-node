import { Brand, BrandResponse } from '../interfaces'

export const deserializeBrand = (brand: BrandResponse): Brand => ({
  id: brand.id,
  object: brand.object,
  logo: brand.logo,
  primaryColor: brand.primary_color,
  secondaryColor: brand.secondary_color,
  createdAt: brand.created_at,
  updatedAt: brand.updated_at,
})
