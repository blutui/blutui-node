import { FetchException } from '../exceptions'

const API_VERSION = 'v1'

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
    const resourceURL = this.getResourceURL(path, options.params)

    return await this.fetch(resourceURL, {
      method: 'POST',
      headers: options.headers,
      body: getBody(entity),
    })
  }

  async patch<Entity = any>(
    path: string,
    entity: Entity,
    options: { params?: Record<string, any>; headers?: HeadersInit }
  ) {
    const resourceURL = this.getResourceURL(path, options.params)

    return await this.fetch(resourceURL, {
      method: 'PATCH',
      headers: options.headers,
      body: getBody(entity),
    })
  }

  async delete(
    path: string,
    options: { params?: Record<string, any>; headers?: HeadersInit }
  ) {
    const resourceURL = this.getResourceURL(path, options.params)

    return await this.fetch(resourceURL, {
      method: 'DELETE',
      headers: options.headers,
    })
  }

  private getResourceURL(path: string, params?: Record<string, any>) {
    const queryString = getQueryString(params)
    const url = new URL(
      [this.pathUsingVersion(path), queryString].filter(Boolean).join('?'),
      this.baseURL
    )
    return url.toString()
  }

  private pathUsingVersion(path: string, version: string = API_VERSION) {
    path = path.startsWith('/') ? path.replace('/', '') : path
    return version + '/' + path
  }

  private async fetch(url: string, options?: RequestInit) {
    const response = await fetch(url, {
      ...this.options,
      ...options,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...this.options?.headers,
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

function getQueryString(queryObj?: Record<string, any>) {
  if (!queryObj) return undefined

  const sanitizedQueryObj: string[][] = []

  Object.entries(queryObj).forEach(([param, value]) => {
    if (Array.isArray(value)) {
      value.forEach((element) => {
        if (element !== '' && element !== undefined)
          sanitizedQueryObj.push([`${param}[]`, element])
      })
    } else if (value !== '' && value !== undefined)
      sanitizedQueryObj.push([param, value])
  })

  return new URLSearchParams(sanitizedQueryObj).toString()
}

function getBody(entity: any): BodyInit | null | undefined {
  return JSON.stringify(entity)
}
