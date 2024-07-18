import { List, ListResponse } from '@/types'
import { Domain, DomainResponse } from '../interfaces'
import { deserializePaginationMeta } from '@/utils/serializers'

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
