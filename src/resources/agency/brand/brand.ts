import { deserializeBrand, serializeCreateBrandOptions } from './serializers'

import { BlutuiResponseMessage, DeletedResponse } from '@/types'
import {
  BrandResponse,
  CreateBrandOptions,
  SerializedCreateBrandOptions,
  SerializedUpdateBrandOptions,
  UpdateBrandOptions,
  type Brand as BrandI,
} from './interfaces'
import { serializeUpdateBrandOptions } from './serializers/update-brand-options.serializer'
import { AgencyResource } from '..'

export class Brand extends AgencyResource {
  private noContent: BlutuiResponseMessage = {
    message: 'No brand found for this agency.',
  }

  /**
   * Get the brand for the current agency.
   */
  async get(): Promise<BrandI | BlutuiResponseMessage> {
    const { data } = await this.blutui.get<BrandResponse>(this.path('brand'))

    return data ? deserializeBrand(data) : this.noContent
  }

  /**
   * Create a new brand for the current agency.
   *
   * @param payload - The values to create the brand
   */
  async create(payload: CreateBrandOptions): Promise<BrandI> {
    const { data } = await this.blutui.post<
      BrandResponse,
      SerializedCreateBrandOptions
    >(this.path('brand'), serializeCreateBrandOptions(payload))

    return deserializeBrand(data)
  }

  /**
   * Update the brand for the current agency.
   *
   * @param payload - The values to update the brand
   */
  async update(payload: UpdateBrandOptions): Promise<BrandI> {
    const { data } = await this.blutui.patch<
      BrandResponse,
      SerializedUpdateBrandOptions
    >(this.path('brand'), serializeUpdateBrandOptions(payload))

    return deserializeBrand(data)
  }

  /**
   * Remove the brand for the current agency.
   */
  async remove(): Promise<DeletedResponse> {
    const { data } = await this.blutui.delete<DeletedResponse>(
      this.path('brand')
    )

    return data
  }
}
