import type { Agency } from '@/agency'
import type { DeletedResponse } from '@/types'
import type {
  Brand as BrandI,
  BrandResponse,
  CreateBrandOptions,
  SerializedCreateBrandOptions,
  SerializedUpdateBrandOptions,
  UpdateBrandOptions,
} from './interfaces'
import { deserializeBrand, serializeCreateBrandOptions } from './serializers'
import { serializeUpdateBrandOptions } from './serializers/update-brand-options.serializer'

export class Brand {
  constructor(private readonly agency: Agency) {}

  /**
   * Get the brand for the current agency.
   */
  async get(): Promise<BrandI | null> {
    const { data } = await this.agency.get<BrandResponse>('brand')

    return data ? deserializeBrand(data) : null
  }

  /**
   * Create a new brand for the current agency.
   *
   * @param payload - The values to create the brand
   */
  async create(payload: CreateBrandOptions): Promise<BrandI> {
    const { data } = await this.agency.post<
      BrandResponse,
      SerializedCreateBrandOptions
    >('brand', serializeCreateBrandOptions(payload))

    return deserializeBrand(data)
  }

  /**
   * Update the brand for the current agency.
   *
   * @param payload - The values to update the brand
   */
  async update(payload: UpdateBrandOptions): Promise<BrandI> {
    const { data } = await this.agency.patch<
      BrandResponse,
      SerializedUpdateBrandOptions
    >('brand', serializeUpdateBrandOptions(payload))

    return deserializeBrand(data)
  }

  /**
   * Remove the brand for the current agency.
   */
  async remove(): Promise<DeletedResponse> {
    const { data } = await this.agency.delete<DeletedResponse>('brand')

    return data
  }
}
