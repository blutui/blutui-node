import type { Project } from '@/project'
import type {
  DeletedResponse,
  Expandable,
  List,
  ListResponse,
  PaginationOptions,
} from '@/types'
import type {
  Menu,
  MenuResponse,
  CreateMenuOptions,
  SerializedCreateMenuOptions,
  UpdateMenuOptions,
  SerializedUpdateMenuOptions,
} from './interfaces'
import {
  deserializeMenu,
  deserializeMenuList,
  serializeCreateMenuOptions,
  serializeUpdateMenuOptions,
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
   * Get a menu's information by ID.
   */
  async get(id: string, options?: Expandable<'items'>): Promise<Menu> {
    const { data } = await this.project.get<MenuResponse>(`menus/${id}`, {
      query: options,
    })

    return deserializeMenu(data)
  }

  /**
   * Create a new menu for a project.
   *
   * @param payload - The values to create the menu
   */
  async create(payload: CreateMenuOptions): Promise<Menu> {
    const { data } = await this.project.post<
      MenuResponse,
      SerializedCreateMenuOptions
    >('menus', serializeCreateMenuOptions(payload))

    return deserializeMenu(data)
  }

  /**
   * Update the menu for the a project.
   *
   * @param payload - The values to update the menu
   */
  async update(id: string, payload: UpdateMenuOptions): Promise<Menu> {
    const { data } = await this.project.patch<
      MenuResponse,
      SerializedUpdateMenuOptions
    >(`menus/${id}`, serializeUpdateMenuOptions(payload))

    return deserializeMenu(data)
  }

  /**
   * Remove the menu for the current project.
   */
  async remove(id: string): Promise<DeletedResponse> {
    const { data } = await this.project.delete<DeletedResponse>(`menus/${id}`)

    return data
  }
}
