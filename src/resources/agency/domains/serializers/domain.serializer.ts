import { deserializePaginationMeta } from '@/utils/serializers'

import type { List, ListResponse } from '@/types'
import type { Domain, DomainResponse } from '../interfaces'

export const deserializeDomain = (domain: DomainResponse): Domain => ({
  id: domain.id,
  object: domain.object,
  name: domain.name,
  token: domain.token,
  project: domain.project,
  verifiedAt: domain.verified_at,
  createdAt: domain.created_at,
  updatedAt: domain.updated_at,
})

export const deserializeDomainList = (
  domains: ListResponse<DomainResponse>
): List<Domain> => ({
  object: 'list',
  data: domains.data.map(deserializeDomain),
  meta: deserializePaginationMeta(domains.meta),
})
