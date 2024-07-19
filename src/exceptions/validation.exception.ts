export class ValidationException extends Error {
  readonly status = 422
  readonly name = 'ValidationException'
  readonly message: string
  readonly errors?: { [key: string]: string[] }
  readonly type?: string

  constructor({
    message,
    type,
    errors,
  }: {
    message?: string
    type?: string
    errors?: { [key: string]: string[] }
  }) {
    super()
    this.type = type
    this.message = message ?? 'Validation failed.'
    this.errors = errors
  }
}
