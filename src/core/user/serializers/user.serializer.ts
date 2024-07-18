import { User, UserResponse } from '../interfaces'

export const deserializeUser = (user: UserResponse): User => ({
  id: user.id,
  object: user.object,
  name: user.name,
  twoFactorEnabled: user.two_factor_enabled,
  createdAt: user.created_at,
  updatedAt: user.updated_at,
})
