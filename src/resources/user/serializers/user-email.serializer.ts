import type { UserEmail, UserEmailResponse } from '../interfaces'

export const deserializeUserEmail = (
  userEmail: UserEmailResponse
): UserEmail => ({
  id: userEmail.id,
  object: userEmail.object,
  email: userEmail.email,
  verified: userEmail.verified,
})
