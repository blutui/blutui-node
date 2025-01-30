import type { Project } from '@/project'
import type { Expandable, List, ListResponse, PaginationOptions } from '@/types'
import type { Redirect, RedirectResponse } from './interfaces'
import { deserializeRedirect, deserializeRedirectList } from './serializers'
import type { Admin } from '@/admin'

export class Redirects {
  constructor(private readonly project: Project | Admin) {}

  /**
   * Get the redirect list for the current project.
   */
  async list(options?: PaginationOptions): Promise<List<Redirect>> {
    const { data } = await this.project.get<ListResponse<RedirectResponse>>(
      'redirects',
      { query: options }
    )

    return deserializeRedirectList(data)
  }

  /**
   * Get a redirect's information by ID.
   */
  async get(id: string, options?: Expandable<'items'>): Promise<Redirect> {
    const { data } = await this.project.get<RedirectResponse>(
      `redirects/${id}`,
      {
        query: options,
      }
    )

    return deserializeRedirect(data)
  }
}
