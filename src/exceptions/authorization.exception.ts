export class AuthorizationException extends Error {
  readonly status = 403
  readonly name = 'AuthorizationException'
  readonly message: string
  readonly type?: string

  constructor({ message, type }: { message?: string; type?: string }) {
    super()
    this.type = type
    this.message =
      message ??
      `The request could not be authorized. Maybe your access token has invalid scopes?`
  }
}
