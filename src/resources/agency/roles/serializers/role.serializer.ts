import { deserializePaginationMeta } from '@/utils/serializers'

import type { List, ListResponse } from '@/types'
import type { Role, RoleResponse } from '../interfaces'

export const deserializeRole = (role: RoleResponse): Role => ({
  id: role.id,
  object: role.object,
  name: role.name,
  description: role.description,
  isSuper: role.is_super,
  ...(role.users_count !== undefined && { usersCount: role.users_count }),
  ...(role.permissions !== undefined && { permissions: role.permissions }),
  createdAt: role.created_at,
  updatedAt: role.updated_at,
})

export const deserializeRoleList = (
  roles: ListResponse<RoleResponse>
): List<Role> => ({
  object: 'list',
  data: roles.data.map(deserializeRole),
  meta: deserializePaginationMeta(roles.meta),
})
