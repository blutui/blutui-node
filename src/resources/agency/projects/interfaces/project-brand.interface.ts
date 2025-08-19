export interface ProjectBrand {
  id: number
  object: 'project_brand'
  defaultLogo: string | null
  squareLogo: string | null
  primaryColor: string | null
  secondaryColor: string | null
  createdAt: string
  updatedAt: string
}

export interface ProjectBrandResponse {
  id: number
  object: 'project_brand'
  default_logo: string | null
  square_logo: string | null
  primary_color: string | null
  secondary_color: string | null
  created_at: string
  updated_at: string
}
