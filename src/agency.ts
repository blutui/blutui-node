import { Blutui } from './blutui'

import { Brand } from './resources/agency'

export class Agency {
  readonly brand = new Brand(this)
  // readonly domains = new Domains(this)

  constructor(
    public username: string,
    public readonly blutui: Blutui
  ) {}
}
