import type {
  SerializedUpdateMemberOptions,
  UpdateMemberOptions,
} from '../interfaces'

export const serializeUpdateMemberOptions = (
  options: UpdateMemberOptions
): SerializedUpdateMemberOptions => ({
  role: options.role,
  has_full_access: options.hasFullAccess,
})
