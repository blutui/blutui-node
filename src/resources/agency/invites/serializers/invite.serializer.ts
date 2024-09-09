import { deserializePaginationMeta } from '@/utils/serializers'

import type { List, ListResponse } from '@/types'
import type { Invite, InviteResponse } from '../interfaces'

export const deserializeInvite = (invite: InviteResponse): Invite => ({
  id: invite.id,
  object: invite.object,
})

export const deserializeInviteList = (
  invites: ListResponse<InviteResponse>
): List<Invite> => ({
  object: 'list',
  data: invites.data.map(deserializeInvite),
  meta: deserializePaginationMeta(invites.meta),
})
