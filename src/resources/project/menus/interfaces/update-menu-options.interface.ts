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
  isNewTab: boolean
  active: boolean
  items?: UpdateMenuItemOptions[]
}
