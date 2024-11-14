import { deserializeCassette } from './serializers'

import type { Agency } from '@/agency'
import type { CassetteResponse, Cassette } from './interfaces'

export class Cassettes {
  constructor(private readonly agency: Agency) {}

  /**
   * Retrieve a Cassette by ID.
   */
  async get(id: string): Promise<Cassette> {
    const { data } = await this.agency.get<CassetteResponse>(`cassettes/${id}`)

    return deserializeCassette(data)
  }
}
