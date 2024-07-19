export interface BlutuiOptions {
  apiHostname?: string
}

// List

export interface List<T> {
  object: 'list'
  data: T[]
  meta: PaginationMeta
}

export interface ListResponse<T> {
  object: 'list'
  data: T[]
  meta: PaginationMetaResponse
}

// Pagination

export interface PaginationMeta {
  hasMore: boolean
  currentPage: number
  from: number
  to: number
  total: number
  perPage: number
  lastPage: number
}

export interface PaginationMetaResponse {
  has_more: boolean
  current_page: number
  from: number
  to: number
  total: number
  per_page: number
  last_page: number
}

export type PaginationOptions = {
  limit?: number
  page?: number
}

// Request Options

type QueryParams = string | string[] | number | null

export interface GetOptions {
  query?: { [key: string]: QueryParams }
}

export interface PostOptions {
  query?: { [key: string]: QueryParams }
}

export interface PatchOptions {
  query?: { [key: string]: QueryParams }
}

export interface DeleteOptions {
  query?: { [key: string]: QueryParams }
}

// Response

export interface DeletedResponse {
  id: string
  object: string
  deleted: boolean
}

// Response Error

export interface BlutuiResponseError {
  message: string
  type: string
  errors?: { [key: string]: string[] }
}

// Response Message

export interface BlutuiResponseMessage {
  message: string
}
