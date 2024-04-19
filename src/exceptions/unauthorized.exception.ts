export class UnauthorizedException extends Error {
  readonly status: number = 401
  readonly name: string = 'UnauthorizedException'
  readonly message: string = `The request could not be authorized. Maybe your access token is invalid?`
}
