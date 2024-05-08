import { Agency } from '@/agency'

import { deserializeBrand, serializeCreateBrandOptions } from './serializers'

import { DeletedResponse } from '@/types'
import {
  BrandResponse,
  CreateBrandOptions,
  SerializedCreateBrandOptions,
  SerializedUpdateBrandOptions,
  UpdateBrandOptions,
  type Brand as BrandI,
} from './interfaces'
import { serializeUpdateBrandOptions } from './serializers/update-brand-options.serializer'

export class Brand {
  constructor(private readonly agency: Agency) {}

  async get(): Promise<BrandI> {
    const { data } = await this.agency.get<BrandResponse>('/brand')

    return deserializeBrand(data)
  }

  async create(payload: CreateBrandOptions): Promise<BrandI> {
    const { data } = await this.agency.post<
      BrandResponse,
      SerializedCreateBrandOptions
    >('/brand', serializeCreateBrandOptions(payload))

    return deserializeBrand(data)
  }

  async update(payload: UpdateBrandOptions): Promise<BrandI> {
    const { data } = await this.agency.patch<
      BrandResponse,
      SerializedUpdateBrandOptions
    >('/brand', serializeUpdateBrandOptions(payload))

    return deserializeBrand(data)
  }

  async remove(): Promise<DeletedResponse> {
    const { data } = await this.agency.delete<DeletedResponse>('/brand')

    return data
  }
}
