import { Brand, BrandResponse } from '../interfaces'

export const deserializeBrand = (brand: BrandResponse): Brand =>
  brand
    ? {
        id: brand.id,
        object: brand.object,
        logo: brand.logo,
        primaryColor: brand.primary_color,
        secondaryColor: brand.secondary_color,
        createdAt: brand.created_at,
        updatedAt: brand.updated_at,
      }
    : {
        id: '',
        object: 'brand',
        logo: '',
        primaryColor: '',
        secondaryColor: '',
        createdAt: 0,
        updatedAt: 0,
      }
