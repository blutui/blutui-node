import type {
  SerializedUpdateInviteOptions,
  UpdateInviteOptions,
} from '../interfaces'

export const serializeUpdateInviteOptions = (
  options: UpdateInviteOptions
): SerializedUpdateInviteOptions => ({
  role: options.role,
})
