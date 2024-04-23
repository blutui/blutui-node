import fetch, { MockParams } from 'jest-fetch-mock'

export function fetchOnce(
  response: {} = {},
  { status = 200, headers, ...rest }: MockParams = {}
) {
  return fetch.once(JSON.stringify(response), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
    ...rest,
  })
}

export function fetchURL() {
  return fetch.mock.calls[0][0]
}

export function fetchHeaders() {
  return fetch.mock.calls[0][1]?.headers
}
