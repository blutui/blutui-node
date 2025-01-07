export interface CreateMenuOptions {
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

export interface SerializedCreateMenuOptions {
  handle: string
  name: string
  items?: SerializedCreateMenuItemOptions[]
}

export interface SerializedCreateMenuItemOptions {
  label: string
  url: string
  is_new_tab: boolean
  active: boolean
  items?: SerializedCreateMenuItemOptions[]
}
