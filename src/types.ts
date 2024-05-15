export interface BlutuiOptions {}

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
}

// Response Message

export interface BlutuiResponseMessage {
  message: string
}
