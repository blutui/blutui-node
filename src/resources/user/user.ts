import { deserializeUser, deserializeUserEmail } from './serializers'

import type { Blutui } from '@/blutui'
import type {
  UserEmail,
  UserEmailResponse,
  User as UserI,
  UserResponse,
} from './interfaces'

export class User {
  constructor(private readonly blutui: Blutui) {}

  /**
   * Get the current user.
   */
  async get(): Promise<UserI> {
    const { data } = await this.blutui.get<UserResponse>('user')

    return deserializeUser(data)
  }

  /**
   * Get the current user's email address.
   */
  async email(): Promise<UserEmail> {
    const { data } = await this.blutui.get<UserEmailResponse>('user/email')

    return deserializeUserEmail(data)
  }
}
