export interface CreateMenuOptions {
  handle: string
  name: string
  items?: CreateMenuItemOptions[]
}

export interface SerializedCreateMenuOptions {
  handle: string
  name: string
  items?: CreateMenuItemOptions[]
}

export interface CreateMenuItemOptions {
  label: string
  url: string
  isNewTab: boolean
  active: boolean
  items?: CreateMenuItemOptions[]
}
