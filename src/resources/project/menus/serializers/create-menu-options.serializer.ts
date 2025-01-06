import type {
  CreateMenuItemOptions,
  CreateMenuOptions,
  SerializedCreateMenuItemOptions,
  SerializedCreateMenuOptions,
} from '../interfaces'

export const serializeCreateMenuOptions = (
  options: CreateMenuOptions
): SerializedCreateMenuOptions => ({
  name: options.name,
  handle: options.handle,
  ...(options.items !== undefined && {
    items: serializeCreateMenuItemOptions(options.items),
  }),
})

export const serializeCreateMenuItemOptions = (
  items: CreateMenuItemOptions[]
): SerializedCreateMenuItemOptions[] => {
  return items.map((item) => ({
    label: item.label,
    url: item.url,
    is_new_tab: item.isNewTab,
    active: item.active,
    ...(item.items !== undefined && {
      items: serializeCreateMenuItemOptions(item.items),
    }),
  }))
}
