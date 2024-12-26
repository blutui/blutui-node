import type {
  SerializedUpdateMenuOptions,
  UpdateMenuOptions,
} from '../interfaces'

export const serializeUpdateMenuOptions = (
  options: UpdateMenuOptions
): SerializedUpdateMenuOptions => ({
  name: options.name,
  handle: options.handle,
  items: options.items,
})
