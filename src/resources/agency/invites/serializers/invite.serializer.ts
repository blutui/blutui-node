import { deserializePaginationMeta } from '@/utils/serializers'
import { deserializeRole } from '../../roles/serializers'

import type { List, ListResponse } from '@/types'
import type { Invite, InviteResponse } from '../interfaces'

export const deserializeInvite = (invite: InviteResponse): Invite => ({
  id: invite.id,
  object: invite.object,
  email: invite.email,
  role:
    invite.role instanceof Object ? deserializeRole(invite.role) : invite.role,
  createdAt: invite.created_at,
  updatedAt: invite.updated_at,
})

export const deserializeInviteList = (
  invites: ListResponse<InviteResponse>
): List<Invite> => ({
  object: 'list',
  data: invites.data.map(deserializeInvite),
  meta: deserializePaginationMeta(invites.meta),
})
