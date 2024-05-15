export class ValidationException extends Error {
  readonly status = 422
  readonly name = 'ValidationException'
  readonly message: string
  readonly type?: string

  constructor({
    message,
    type,
  }: {
    message?: string
    type?: string
  }) {
    super()
    this.type = type
    this.message = message ?? `Validation failed.`
  }
}
