export interface CreateMenuOptions {
  handle: string
  name: string
  items?: CreateMenuItemOptions[]
}

export interface SerializedCreateMenuOptions {
  handle: string
  name: string
  items?: string | null
}

export interface CreateMenuItemOptions {
  label: string
  url: string
  is_new_tab: boolean
  active: boolean
  items?: CreateMenuItemOptions[]
}
