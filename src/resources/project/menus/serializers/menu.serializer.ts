import { deserializePaginationMeta } from '@/utils/serializers'

import type { List, ListResponse } from '@/types'
import type {
  Menu,
  MenuItem,
  MenuItemResponse,
  MenuResponse,
} from '../interfaces'

export const deserializeMenu = (menu: MenuResponse): Menu => ({
  id: menu.id,
  object: menu.object,
  name: menu.name,
  ...(menu.items !== undefined && { items: deserializeMenuItem(menu.items) }),
  createdAt: menu.created_at,
  updatedAt: menu.updated_at,
})

export const deserializeMenuItem = (items: MenuItemResponse[]): MenuItem[] => {
  return items.map((item) => ({
    id: item.id,
    object: item.object,
    label: item.label,
    url: item.url,
    active: item.active,
    isNewTab: item.is_new_tab,
    order: item.order,
    ...(item.items !== undefined && { items: deserializeMenuItem(item.items) }),
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  }))
}

export const deserializeMenuList = (
  menus: ListResponse<MenuResponse>
): List<Menu> => ({
  object: menus.object,
  data: menus.data.map(deserializeMenu),
  meta: deserializePaginationMeta(menus.meta),
})
