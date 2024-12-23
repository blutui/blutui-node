export interface Menu {
  id: string
  object: 'menu'
  name: string
  items?: MenuItem[]
  createdAt: number
  updatedAt: number
}

export interface MenuResponse {
  id: string
  object: 'menu'
  name: string
  items?: MenuItemResponse[]
  created_at: number
  updated_at: number
}

export interface MenuItem {
  id: string
  object: 'menu_item'
  label: string
  url: string
  active: boolean
  isNewTab: boolean
  order: number
  items?: MenuItem[]
  createdAt: number
  updatedAt: number
}

export interface MenuItemResponse {
  id: string
  object: 'menu_item'
  label: string
  url: string
  active: boolean
  is_new_tab: boolean
  order: number
  items?: MenuItemResponse[]
  created_at: number
  updated_at: number
}
