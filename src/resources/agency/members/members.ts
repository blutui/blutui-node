import { deserializeMemberList } from './serializers'

import type { Agency } from '@/agency'
import type { Member, MemberResponse } from './interfaces'
import type { List, ListResponse, PaginationOptions } from '@/types'

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
}
