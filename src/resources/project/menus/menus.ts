import type { Project } from '@/project'
import type { Expandable, List, ListResponse, PaginationOptions } from '@/types'
import type {
  Menu,
  MenuResponse,
  CreateMenuOptions,
  SerializedCreateMenuOptions,
} from './interfaces'
import {
  deserializeMenu,
  deserializeMenuList,
  serializeCreateMenuOptions,
} from './serializers'
import type { Admin } from '@/admin'

export class Menus {
  constructor(private readonly project: Project | Admin) {}

  /**
   * Get the menu list for the current project.
   */
  async list(options?: PaginationOptions): Promise<List<Menu>> {
    const { data } = await this.project.get<ListResponse<MenuResponse>>(
      'menus',
      { query: options }
    )

    return deserializeMenuList(data)
  }

  /**
   * Get a domain's information by ID.
   */
  async get(id: string, options?: Expandable<'items'>): Promise<Menu> {
    const { data } = await this.project.get<MenuResponse>(`menus/${id}`, {
      query: options,
    })

    return deserializeMenu(data)
  }

  /**
   * Create a new brand for the current agency.
   *
   * @param payload - The values to create the brand
   */
  async create(payload: CreateMenuOptions): Promise<Menu> {
    const { data } = await this.project.post<
      MenuResponse,
      SerializedCreateMenuOptions
    >('menus', serializeCreateMenuOptions(payload))

    return deserializeMenu(data)
  }

  // /**
  //  * Update the brand for the current agency.
  //  *
  //  * @param payload - The values to update the brand
  //  */
  // async update(payload: UpdateBrandOptions): Promise<BrandI> {
  //   const { data } = await this.agency.patch<
  //     BrandResponse,
  //     SerializedUpdateBrandOptions
  //   >('brand', serializeUpdateBrandOptions(payload))

  //   return deserializeBrand(data)
  // }

  // /**
  //  * Remove the brand for the current agency.
  //  */
  // async remove(): Promise<DeletedResponse> {
  //   const { data } = await this.agency.delete<DeletedResponse>('brand')

  //   return data
  // }
}
