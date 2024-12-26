import {
  Brand,
  Cassettes,
  Domains,
  Invites,
  Members,
  Projects,
  Roles,
} from './resources/agency'

import type { Blutui } from './blutui'

import { Request } from './utils/request'

export class Agency extends Request {
  readonly brand = new Brand(this)
  readonly cassettes = new Cassettes(this)
  readonly domains = new Domains(this)
  readonly invites = new Invites(this)
  readonly members = new Members(this)
  readonly projects = new Projects(this)
  readonly roles = new Roles(this)

  constructor(
    public username: string,
    protected readonly blutui: Blutui
  ) {
    super(blutui)
  }

  protected getRequestPath(path: string): string {
    const newPath = path.startsWith('/') ? path.replace('/', '') : path

    return `/agencies/${this.username}/${newPath}`
  }
}
