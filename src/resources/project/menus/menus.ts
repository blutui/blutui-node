import type { Project } from '@/project'
import type { Expandable, List, ListResponse, PaginationOptions } from '@/types'
import type { Menu, MenuResponse } from './interfaces'
import { deserializeMenu, deserializeMenuList } from './serializers'
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
}
