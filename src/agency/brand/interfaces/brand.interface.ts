export interface Brand {
  id: string
  object: 'brand'
  logo: string | null
  primaryColor: string | null
  secondaryColor: string | null
  createdAt: number
  updatedAt: number
}

export interface BrandResponse {
  id: string
  object: 'brand'
  logo: string | null
  primary_color: string | null
  secondary_color: string | null
  created_at: number
  updated_at: number
}
