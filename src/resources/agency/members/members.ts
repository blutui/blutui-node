import type { Agency } from '@/agency'
import type { Member } from './interfaces'
import type { List, PaginationOptions } from '@/types'

export class Members {
  constructor(private readonly agency: Agency) {}

  /**
   * Get a list of members for the current agency.
   */
  async list(options?: PaginationOptions): Promise<List<Member>> {
    const {} = await this.agency.get('members', { query: options })
  }
}
