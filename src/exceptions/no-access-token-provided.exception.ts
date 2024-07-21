export class NoAccessTokenProvidedException extends Error {
  readonly status: number = 500
  readonly name: string = 'NoAccessTokenProvidedException'
  readonly message: string =
    `Missing access token. Pass it to the contructor (new Blutui("eyJhbGciOi...")) or define it in the BLUTUI_ACCESS_TOKEN environment variable.`
}
