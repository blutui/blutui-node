export interface UpdateMenuOptions {
  handle?: string
  name?: string
  items?: UpdateMenuItemOptions[]
}

export interface SerializedUpdateMenuOptions {
  handle?: string
  name?: string
  items?: UpdateMenuItemOptions[]
}

export interface UpdateMenuItemOptions {
  label: string
  url: string
  is_new_tab: boolean
  active: boolean
  items?: UpdateMenuItemOptions[]
}
