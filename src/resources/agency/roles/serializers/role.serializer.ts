import { deserializePaginationMeta } from '@/utils/serializers'

import type { List, ListResponse } from '@/types'
import type { Role, RoleResponse } from '../interfaces'

export const deserializeRole = (role: RoleResponse): Role => {
  const {
    id,
    object,
    name,
    description,
    is_super: isSuper,
    permissions,
    created_at: createdAt,
    updated_at: updatedAt,
    users_count: usersCount,
  } = role

  return {
    id,
    object,
    name,
    description,
    isSuper,
    permissions,
    createdAt,
    updatedAt,
    ...(usersCount !== undefined && { usersCount }),
  }
}

export const deserializeRoleList = (
  roles: ListResponse<RoleResponse>
): List<Role> => ({
  object: 'list',
  data: roles.data.map(deserializeRole),
  meta: deserializePaginationMeta(roles.meta),
})
