import type { ProjectBrand, ProjectBrandResponse } from '../interfaces'

export const deserializeProjectBrand = (
  brand: ProjectBrandResponse
): ProjectBrand => ({
  id: brand.id,
  object: brand.object,
  defaultLogo: brand.default_logo,
  squareLogo: brand.square_logo,
  primaryColor: brand.primary_color,
  secondaryColor: brand.secondary_color,
  createdAt: brand.created_at,
  updatedAt: brand.updated_at,
})
