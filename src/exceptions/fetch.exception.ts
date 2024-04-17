export class FetchException<T> extends Error {
  readonly name: string = 'FetchException'
  readonly response: { status: number; headers: Headers; data: T }

  constructor({
    message,
    response,
  }: {
    message: string
    readonly response: FetchException<T>['response']
  }) {
    super(message)
    this.message = message
    this.response = response
  }
}
