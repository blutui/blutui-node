import {
  deserializeInvite,
  deserializeInviteList,
  serializeUpdateInviteOptions,
} from './serializers'

import type { Agency } from '@/agency'
import type {
  Invite,
  InviteResponse,
  SerializedUpdateInviteOptions,
  UpdateInviteOptions,
} from './interfaces'
import type {
  DeletedResponse,
  Expandable,
  List,
  ListResponse,
  PaginationOptions,
} from '@/types'

export class Invites {
  constructor(private readonly agency: Agency) {}

  /**
   * Get a list of invites for the current agency.
   */
  async list(
    options?: PaginationOptions & Expandable<'role'>
  ): Promise<List<Invite>> {
    const { data } = await this.agency.get<ListResponse<InviteResponse>>(
      'invites',
      {
        query: options,
      }
    )

    return deserializeInviteList(data)
  }

  /**
   * Update a invite in the current agency.
   */
  async update(id: string, payload: UpdateInviteOptions): Promise<Invite> {
    const { data } = await this.agency.patch<
      InviteResponse,
      SerializedUpdateInviteOptions
    >(`invites/${id}`, serializeUpdateInviteOptions(payload))

    return deserializeInvite(data)
  }

  /**
   * Remove a invite from the current agency.
   */
  async remove(id: string): Promise<DeletedResponse> {
    const { data } = await this.agency.delete<DeletedResponse>(`invites/${id}`)

    return data
  }
}
