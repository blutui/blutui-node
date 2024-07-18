import { Blutui } from '@/blutui'

import {
  Agency,
  AgencyResponse,
  SerializedUpdateAgencyOptions,
  UpdateAgencyOptions,
} from './interfaces'
import {
  deserializeAgency,
  deserializeAgencyList,
  serializeUpdateAgencyOptions,
} from './serializers'
import { List, ListResponse, PaginationOptions } from '@/types'

export class Agencies {
  constructor(private readonly blutui: Blutui) {}

  /**
   * Retrieve a list of agencies you belong to.
   */
  async list(options?: PaginationOptions): Promise<List<Agency>> {
    const { data } = await this.blutui.get<ListResponse<AgencyResponse>>(
      'agencies',
      { query: options }
    )

    return deserializeAgencyList(data)
  }

  /**
   * Get an agency you belong to, by ID.
   */
  async get(id: string): Promise<Agency> {
    const { data } = await this.blutui.get<AgencyResponse>(`agencies/${id}`)

    return deserializeAgency(data)
  }

  /**
   * Update an agency you belong to, by ID.
   */
  async update(id: string, payload: UpdateAgencyOptions): Promise<Agency> {
    const { data } = await this.blutui.patch<
      AgencyResponse,
      SerializedUpdateAgencyOptions
    >(`agencies/${id}`, serializeUpdateAgencyOptions(payload))

    return deserializeAgency(data)
  }
}
