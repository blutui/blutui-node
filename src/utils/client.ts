import { FetchException } from '../exceptions'

const API_VERSION = 'v1'

export class Client {
  private readonly _fetchFn

  /**
   * Create a new client instance.
   */
  constructor(
    readonly baseURL: string,
    readonly options?: RequestInit,
    fetchFn?: typeof fetch
  ) {
    let newFetchFn = fetchFn

    if (!newFetchFn) {
      if (!globalThis.fetch) {
        throw new Error(
          'Fetch function not defined in the global scope and no replacement was provided.'
        )
      }
      newFetchFn = globalThis.fetch
    }

    this._fetchFn = newFetchFn
  }

  async get(
    path: string,
    options: { params?: Record<string, unknown>; headers?: HeadersInit }
  ) {
    const resourceURL = this.getResourceURL(path, options.params)
    return await this.fetch(resourceURL, {
      headers: options.headers,
    })
  }

  async post<Entity>(
    path: string,
    entity: Entity,
    options: { params?: Record<string, unknown>; headers?: HeadersInit }
  ) {
    const resourceURL = this.getResourceURL(path, options.params)

    return await this.fetch(resourceURL, {
      method: 'POST',
      headers: options.headers,
      body: getBody(entity),
    })
  }

  async patch<Entity>(
    path: string,
    entity: Entity,
    options: { params?: Record<string, unknown>; headers?: HeadersInit }
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
    options: { params?: Record<string, unknown>; headers?: HeadersInit }
  ) {
    const resourceURL = this.getResourceURL(path, options.params)

    return await this.fetch(resourceURL, {
      method: 'DELETE',
      headers: options.headers,
    })
  }

  private getResourceURL(path: string, params?: Record<string, unknown>) {
    const queryString = getQueryString(params)
    const url = new URL(
      [this.pathUsingVersion(path), queryString].filter(Boolean).join('?'),
      this.baseURL
    )
    return url.toString()
  }

  /**
   * Create a new version path.
   */
  private pathUsingVersion(
    path: string,
    version: string = API_VERSION
  ): string {
    const newPath = path.startsWith('/') ? path.replace('/', '') : path

    return `${version}/${newPath}`
  }

  private async fetch(url: string, options?: RequestInit) {
    const response = await this._fetchFn(url, {
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

function getQueryString(queryObj?: Record<string, unknown>) {
  if (!queryObj) return undefined

  const sanitizedQueryObj: string[][] = []

  for (const [param, value] of Object.entries(queryObj)) {
    if (Array.isArray(value)) {
      for (const element of value) {
        if (element !== '' && element !== undefined)
          sanitizedQueryObj.push([`${param}[]`, element])
      }
    } else if (value) {
      const newValue = String(value)
      sanitizedQueryObj.push([param, newValue])
    }
  }

  return new URLSearchParams(sanitizedQueryObj).toString()
}

function getBody<Entity>(entity: Entity): BodyInit | null | undefined {
  return JSON.stringify(entity)
}
