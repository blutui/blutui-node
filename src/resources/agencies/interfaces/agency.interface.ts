export interface Agency {
  id: string
  object: 'agency'
  name: string
  email: string
  slug: string
  url: string | null
  location: string
  timezone: string
  avatar: string | null
  description: string | null
  trialMode: boolean
  isAgency: boolean
  isAwsCustomer: boolean
  createdAt: number
  updatedAt: number
  deletedAt?: number
}

export interface AgencyResponse {
  id: string
  object: 'agency'
  name: string
  email: string
  slug: string
  url: string | null
  location: string
  timezone: string
  avatar: string | null
  description: string | null
  trial_mode: boolean
  is_agency: boolean
  is_aws_customer: boolean
  created_at: number
  updated_at: number
  deleted_at?: number
}
