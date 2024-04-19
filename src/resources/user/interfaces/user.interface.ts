export interface User {
  id: string
  object: 'user'
  name: string
  twoFactorEnabled: boolean
  createdAt: number
  updatedAt: number
}

export interface UserResponse {
  id: string
  object: 'user'
  name: string
  two_factor_enabled: boolean
  created_at: number
  updated_at: number
}
