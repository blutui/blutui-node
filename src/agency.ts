import { Blutui } from './blutui'

export class Agency {
  constructor(
    public username: string,
    private readonly blutui: Blutui
  ) {}

  test() {
    this.blutui
  }
}
