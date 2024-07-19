export class GenericServerException extends Error {
  readonly name: string = 'GenericServerException'
  readonly message: string = 'The request could not be completed'
}
