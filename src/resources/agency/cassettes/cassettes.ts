import type { Agency } from '@/agency'
import type { DeletedResponse, Expandable } from '@/types'
import type {
  Cassette,
  CassetteResponse,
  CreateCassetteOptions,
  DuplicateCassetteOptions,
  SerializedCreateCassetteOptions,
  SerializedDuplicateCassetteOptions,
  SerializedUpdateCassetteOptions,
  UpdateCassetteOptions,
} from './interfaces'
import {
  deserializeCassette,
  serializeCreateCassetteOptions,
  serializeDuplicateCassetteOptions,
  serializeUpdateCassetteOptions,
} from './serializers'

export class Cassettes {
  constructor(private readonly agency: Agency) {}

  /**
   * Retrieve a Cassette by ID.
   */
  async get(id: string, options?: Expandable<'project'>): Promise<Cassette> {
    const { data } = await this.agency.get<CassetteResponse>(
      `cassettes/${id}`,
      {
        query: options,
      }
    )

    return deserializeCassette(data)
  }

  /**
   * Create a new Cassette for a project your agency..
   */
  async create(payload: CreateCassetteOptions): Promise<Cassette> {
    const { data } = await this.agency.post<
      CassetteResponse,
      SerializedCreateCassetteOptions
    >('cassettes', serializeCreateCassetteOptions(payload))

    return deserializeCassette(data)
  }

  /**
   * Update a Cassette by ID.
   */
  async update(id: string, payload: UpdateCassetteOptions): Promise<Cassette> {
    const { data } = await this.agency.patch<
      CassetteResponse,
      SerializedUpdateCassetteOptions
    >(`cassettes/${id}`, serializeUpdateCassetteOptions(payload))

    return deserializeCassette(data)
  }

  /**
   * Remove a Cassette from a project in your agency.
   */
  async remove(id: string): Promise<DeletedResponse> {
    const { data } = await this.agency.delete<DeletedResponse>(
      `cassettes/${id}`
    )

    return data
  }

  /**
   * Duplicate a Cassette for a project your agency.
   */
  async duplicate(
    id: string,
    payload: DuplicateCassetteOptions
  ): Promise<Cassette> {
    const { data } = await this.agency.post<
      CassetteResponse,
      SerializedDuplicateCassetteOptions
    >(`cassettes/${id}/duplicate`, serializeDuplicateCassetteOptions(payload))

    return deserializeCassette(data)
  }
}
