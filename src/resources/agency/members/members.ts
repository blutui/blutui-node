import {
  deserializeMember,
  deserializeMemberList,
  serializeUpdateMemberOptions,
} from './serializers'

import type { Agency } from '@/agency'
import type {
  Member,
  MemberResponse,
  SerializedUpdateMemberOptions,
  UpdateMemberOptions,
} from './interfaces'
import type {
  DeletedResponse,
  List,
  ListResponse,
  PaginationOptions,
} from '@/types'

export class Members {
  constructor(private readonly agency: Agency) {}

  /**
   * Get a list of members for the current agency.
   */
  async list(options?: PaginationOptions): Promise<List<Member>> {
    const { data } = await this.agency.get<ListResponse<MemberResponse>>(
      'members',
      { query: options }
    )

    return deserializeMemberList(data)
  }

  /**
   * Get a member from the current agency.
   */
  async get(id: string): Promise<Member> {
    const { data } = await this.agency.get<MemberResponse>(`members/${id}`)

    return deserializeMember(data)
  }

  /**
   * Update a member of the current agency.
   */
  async update(id: string, payload: UpdateMemberOptions): Promise<Member> {
    const { data } = await this.agency.patch<
      MemberResponse,
      SerializedUpdateMemberOptions
    >(`members/${id}`, serializeUpdateMemberOptions(payload))

    return deserializeMember(data)
  }

  /**
   * Remove a member from the current agency.
   */
  async remove(id: string): Promise<DeletedResponse> {
    const { data } = await this.agency.delete<DeletedResponse>(`members/${id}`)

    return data
  }
}
