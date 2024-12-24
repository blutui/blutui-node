import type {
  CreateMenuOptions,
  SerializedCreateMenuOptions,
} from '../interfaces'

export const serializeCreateMenuOptions = (
  options: CreateMenuOptions
): SerializedCreateMenuOptions => ({
  name: options.name,
  handle: options.handle,
  items: options.items,
})
