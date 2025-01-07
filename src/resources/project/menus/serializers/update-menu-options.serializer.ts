import type {
  SerializedUpdateMenuItemOptions,
  SerializedUpdateMenuOptions,
  UpdateMenuItemOptions,
  UpdateMenuOptions,
} from '../interfaces'

export const serializeUpdateMenuOptions = (
  options: UpdateMenuOptions
): SerializedUpdateMenuOptions => ({
  name: options.name,
  handle: options.handle,
  ...(options.items !== undefined && {
    items: serializeUpdateMenuItemOptions(options.items),
  }),
})

export const serializeUpdateMenuItemOptions = (
  items: UpdateMenuItemOptions[]
): SerializedUpdateMenuItemOptions[] => {
  return items.map((item) => ({
    label: item.label,
    url: item.url,
    is_new_tab: item.isNewTab,
    active: item.active,
    ...(item.items !== undefined && {
      items: serializeUpdateMenuItemOptions(item.items),
    }),
  }))
}
