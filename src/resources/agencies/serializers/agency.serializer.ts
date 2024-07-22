import { deserializePaginationMeta } from '@/utils/serializers'

import type { List, ListResponse } from '@/types'
import type { Agency, AgencyResponse } from '../interfaces'

export const deserializeAgency = (agency: AgencyResponse): Agency => ({
  id: agency.id,
  object: agency.object,
  name: agency.name,
  email: agency.email,
  slug: agency.slug,
  url: agency.url,
  location: agency.location,
  timezone: agency.timezone,
  avatar: agency.avatar,
  description: agency.description,
  trialMode: agency.trial_mode,
  isAgency: agency.is_agency,
  isAwsCustomer: agency.is_aws_customer,
  createdAt: agency.created_at,
  updatedAt: agency.updated_at,
  deletedAt: agency.deleted_at,
})

export const deserializeAgencyList = (
  agencies: ListResponse<AgencyResponse>
): List<Agency> => ({
  object: agencies.object,
  data: agencies.data.map(deserializeAgency),
  meta: deserializePaginationMeta(agencies.meta),
})
