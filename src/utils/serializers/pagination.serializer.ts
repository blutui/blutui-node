import type { PaginationMeta, PaginationMetaResponse } from '@/types'

export const deserializePaginationMeta = (
  meta: PaginationMetaResponse
): PaginationMeta => ({
  hasMore: meta.has_more,
  currentPage: meta.current_page,
  from: meta.from,
  to: meta.to,
  total: meta.total,
  perPage: meta.per_page,
  lastPage: meta.last_page,
})
