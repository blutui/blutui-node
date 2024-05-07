export interface BlutuiOptions {}

// Request Options

export interface GetOptions {
  query?: { [key: string]: any }
}

export interface PostOptions {
  query?: { [key: string]: any }
}

// Response Error

export interface BlutuiResponseError {
  message: string
  type: string
}
