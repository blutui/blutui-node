import { deserializePaginationMeta } from '@/utils/serializers'
import { deserializeRole } from '../../roles/serializers'

import type { List, ListResponse } from '@/types'
import type { Member, MemberResponse } from '../interfaces'

export const deserializeMember = (member: MemberResponse): Member => ({
  id: member.id,
  object: member.object,
  name: member.name,
  avatarUrl: member.avatar_url,
  email: member.email,
  twoFactorEnabled: member.two_factor_enabled,
  hasFullAccess: member.has_full_access,
  role: deserializeRole(member.role),
  createdAt: member.created_at,
  updatedAt: member.updated_at,
})

export const deserializeMemberList = (
  members: ListResponse<MemberResponse>
): List<Member> => ({
  object: 'list',
  data: members.data.map(deserializeMember),
  meta: deserializePaginationMeta(members.meta),
})
