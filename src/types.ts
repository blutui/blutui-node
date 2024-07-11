export interface BlutuiOptions {}

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

export interface PaginationOptions {
  limit?: number
  page?: number
}

// Expand resources

export type Expandable<T = string> = { expand?: Array<T> }

// Request Options

export interface GetOptions {
  query?: { [key: string]: any }
}

export interface PostOptions {
  query?: { [key: string]: any }
}

export interface PatchOptions {
  query?: { [key: string]: any }
}

export interface DeleteOptions {
  query?: { [key: string]: any }
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
