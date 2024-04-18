import { FetchException } from '../exceptions'

export class Client {
  constructor(
    readonly baseURL: string,
    readonly options?: RequestInit
  ) {}

  async get(
    path: string,
    options: { params?: Record<string, any>; headers?: HeadersInit }
  ) {
    const resourceURL = this.getResourceURL(path, options.params)

    return await this.fetch(resourceURL, {
      headers: options.headers,
    })
  }

  async post<Entity = any>(
    path: string,
    entity: Entity,
    options: { params?: Record<string, any>; headers?: HeadersInit }
  ) {
    const resourceURL = ''

    return await this.fetch(resourceURL, {
      method: 'POST',
      headers: options.headers,
      body: getBody(entity),
    })
  }

  private getResourceURL(path: string, params?: Record<string, any>) {
    const queryString = params
    const url = new URL(
      [path, queryString].filter(Boolean).join('?'),
      this.baseURL
    )

    return url.toString()
  }

  private async fetch(url: string, options?: RequestInit) {
    const response = await fetch(url, {
      ...options,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    })

    if (!response.ok) {
      throw new FetchException({
        message: response.statusText,
        response: {
          status: response.status,
          headers: response.headers,
          data: await response.json(),
        },
      })
    }

    const contentType = response.headers.get('content-type')
    const isJsonResponse = contentType?.includes('application/json')

    if (isJsonResponse) {
      return { data: await response.json() }
    }

    return { data: null }
  }
}

function getBody(entity: any): BodyInit | null | undefined {
  return JSON.stringify(entity)
}
