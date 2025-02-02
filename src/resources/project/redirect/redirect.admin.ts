import type { Project } from '@/project'
import type {
  DeletedResponse,
  Expandable,
  List,
  ListResponse,
  PaginationOptions,
} from '@/types'
import type {
  Redirect,
  RedirectResponse,
  CreateRedirectOptions,
  SerializedCreateRedirectOptions,
  UpdateRedirectOptions,
  SerializedUpdateRedirectOptions,
} from './interfaces'
import {
  deserializeRedirect,
  deserializeRedirectList,
  serializeCreateRedirectOptions,
  serializeUpdateRedirectOptions,
} from './serializers'
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
    const { data } = await this.project.get<RedirectResponse>(`redirects/${id}`, {
      query: options,
    })

    return deserializeRedirect(data)
  }

  /**
   * Create a new redirect for a project.
   *
   * @param payload - The values to create the redirect
   */
  async create(payload: CreateRedirectOptions): Promise<Redirect> {
    const { data } = await this.project.post<
      RedirectResponse,
      SerializedCreateRedirectOptions
    >('redirects', serializeCreateRedirectOptions(payload))

    return deserializeRedirect(data)
  }

  /**
   * Update the redirect for the a project.
   *
   * @param payload - The values to update the redirect
   */
  async update(id: string, payload: UpdateRedirectOptions): Promise<Redirect> {
    const { data } = await this.project.patch<
      RedirectResponse,
      SerializedUpdateRedirectOptions
    >(`redirects/${id}`, serializeUpdateRedirectOptions(payload))

    return deserializeRedirect(data)
  }

  /**
   * Remove the redirect for the current project.
   */
  async remove(id: string): Promise<DeletedResponse> {
    const { data } = await this.project.delete<DeletedResponse>(`redirects/${id}`)

    return data
  }
}
