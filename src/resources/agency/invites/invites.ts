import { deserializeInviteList } from './serializers'

import type { Agency } from '@/agency'
import type { Invite, InviteResponse } from './interfaces'
import type { List, ListResponse, PaginationOptions } from '@/types'

export class Invites {
  constructor(private readonly agency: Agency) {}

  /**
   * Get a list of invites for the current agency.
   */
  async list(options?: PaginationOptions): Promise<List<Invite>> {
    const { data } = await this.agency.get<ListResponse<InviteResponse>>(
      'invites',
      {
        query: options,
      }
    )

    return deserializeInviteList(data)
  }
}
