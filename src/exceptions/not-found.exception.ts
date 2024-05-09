export class NotFoundException extends Error {
  readonly status = 404
  readonly name = 'NotFoundException'
  readonly message: string
  readonly type?: string

  constructor({
    message,
    type,
    path,
  }: {
    message?: string
    type?: string
    path: string
  }) {
    super()
    this.type = type
    this.message = message ?? `The requested path '${path}' could not be found.`
  }
}
