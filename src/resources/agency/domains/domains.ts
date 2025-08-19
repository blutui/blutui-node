import type { Agency } from '@/agency'
import type {
  DeletedResponse,
  Expandable,
  List,
  ListResponse,
  PaginationOptions,
} from '@/types'
import type {
  CreateDomainOptions,
  Domain,
  DomainResponse,
  DomainVerifyResponse,
  SearchDomainOptions,
  SerializedCreateDomainOptions,
  SerializedSearchDomainOptions,
  SerializedUpdateDomainOptions,
  UpdateDomainOptions,
} from './interfaces'
import {
  deserializeDomain,
  deserializeDomainList,
  serializeCreateDomainOptions,
  serializeUpdateDomainOptions,
} from './serializers'

export class Domains {
  constructor(private readonly agency: Agency) {}

  /**
   * Get the domains list for the current agency.
   */
  async list(options?: PaginationOptions): Promise<List<Domain>> {
    const { data } = await this.agency.get<ListResponse<DomainResponse>>(
      'domains',
      { query: options }
    )

    return deserializeDomainList(data)
  }

  /**
   * Get a domain's information by ID.
   */
  async get(id: string, options?: Expandable<'project'>): Promise<Domain> {
    const { data } = await this.agency.get<DomainResponse>(`domains/${id}`, {
      query: options,
    })

    return deserializeDomain(data)
  }

  /**
   * Add a domain to your agency.
   */
  async create(payload: CreateDomainOptions): Promise<Domain> {
    const { data } = await this.agency.post<
      DomainResponse,
      SerializedCreateDomainOptions
    >('domains', serializeCreateDomainOptions(payload))

    return deserializeDomain(data)
  }

  /**
   * Update a domain for the current agency.
   *
   * @param payload - The values to update the domain
   */
  async update(id: string, payload: UpdateDomainOptions): Promise<Domain> {
    const { data } = await this.agency.patch<
      DomainResponse,
      SerializedUpdateDomainOptions
    >(`domains/${id}`, serializeUpdateDomainOptions(payload))

    return deserializeDomain(data)
  }

  /**
   * Remove a domain for the current agency.
   */
  async remove(id: string): Promise<DeletedResponse> {
    const { data } = await this.agency.delete<DeletedResponse>(`domains/${id}`)

    return data
  }

  /**
   * Refresh the verification token for a domain from your agency.
   */
  async refresh(id: string): Promise<Domain> {
    const { data } = await this.agency.post<
      DomainResponse,
      Record<string, never>
    >(`domains/${id}/refresh`, {})

    return deserializeDomain(data)
  }

  /**
   * Check the verification status for a domain in your agency.
   */
  async verify(id: string): Promise<DomainVerifyResponse> {
    const { data } = await this.agency.post<
      DomainVerifyResponse,
      Record<string, never>
    >(`domains/${id}/verify`, {})
    return data
  }

  /**
   * Search for domains in your agency.
   */
  async search(payload: SearchDomainOptions): Promise<List<Domain>> {
    const { data } = await this.agency.post<
      ListResponse<DomainResponse>,
      SerializedSearchDomainOptions
    >('domains/search', payload)

    return deserializeDomainList(data)
  }
}
