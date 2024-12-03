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
import type { GetOptions, PostOptions } from './types'

export class Agency {
  readonly brand = new Brand(this)
  readonly cassettes = new Cassettes(this)
  readonly domains = new Domains(this)
  readonly invites = new Invites(this)
  readonly members = new Members(this)
  readonly projects = new Projects(this)
  readonly roles = new Roles(this)

  constructor(
    public username: string,
    private readonly blutui: Blutui
  ) {}

  async get<Result>(path: string, options: GetOptions = {}) {
    return await this.blutui.get<Result>(this.getAgencyPath(path), options)
  }

  async post<Result, Entity>(
    path: string,
    entity: Entity,
    options: PostOptions = {}
  ) {
    return await this.blutui.post<Result, Entity>(
      this.getAgencyPath(path),
      entity,
      options
    )
  }

  async patch<Result, Entity>(
    path: string,
    entity: Entity,
    options: PostOptions = {}
  ) {
    return await this.blutui.patch<Result, Entity>(
      this.getAgencyPath(path),
      entity,
      options
    )
  }

  async delete<Result>(path: string, options: PostOptions = {}) {
    return await this.blutui.delete<Result>(this.getAgencyPath(path), options)
  }

  /**
   * Get the path for the current agency.
   */
  private getAgencyPath(path: string): string {
    const newPath = path.startsWith('/') ? path.replace('/', '') : path

    return `/agencies/${this.username}/${newPath}`
  }
}
