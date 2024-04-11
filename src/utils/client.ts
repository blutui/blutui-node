export class Client {
  constructor(
    readonly baseURL: string,
    readonly options?: RequestInit
  ) {}

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
      console.error('Request error')
    }

    const contentType = response.headers.get('content-type')
    const isJsonResponse = contentType?.includes('application/json')

    if (isJsonResponse) {
      return { data: await response.json() }
    }

    return { data: null }
  }
}
