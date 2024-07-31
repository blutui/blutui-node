import type { Member, MemberResponse } from '../interfaces'

export const deserializeMember = (member: MemberResponse): Member => ({
  id: member.id,
})
