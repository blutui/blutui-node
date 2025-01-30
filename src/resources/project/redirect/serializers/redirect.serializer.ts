import { deserializePaginationMeta } from '@/utils/serializers'

import type { List, ListResponse } from '@/types'
import type { Redirect, RedirectResponse } from '../interfaces'

export const deserializeRedirect = (redirect: RedirectResponse): Redirect => ({
  id: redirect.id,
  object: redirect.object,
  from: redirect.from,
  to: redirect.to,
  createdAt: redirect.created_at,
  updatedAt: redirect.updated_at,
})

export const deserializeRedirectList = (
  redirects: ListResponse<RedirectResponse>
): List<Redirect> => ({
  object: redirects.object,
  data: redirects.data.map(deserializeRedirect),
  meta: deserializePaginationMeta(redirects.meta),
})
