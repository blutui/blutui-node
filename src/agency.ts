import { Brand, Domains, Projects } from './resources/agency'

import type { Blutui } from './blutui'
import type { GetOptions, PostOptions } from './types'

export class Agency {
  readonly brand = new Brand(this)
  readonly domains = new Domains(this)
  readonly projects = new Projects(this)

  constructor(
    public username: string,
    private readonly blutui: Blutui
  ) {}

  async get<Result>(path: string, options: GetOptions = {}) {
    return this.blutui.get<Result>(this.getAgencyPath(path), options)
  }

  async post<Result, Entity>(
    path: string,
    entity: Entity,
    options: PostOptions = {}
  ) {
    return this.blutui.post<Result, Entity>(
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
    return this.blutui.patch<Result, Entity>(
      this.getAgencyPath(path),
      entity,
      options
    )
  }

  async delete<Result>(path: string, options: PostOptions = {}) {
    return this.blutui.delete<Result>(this.getAgencyPath(path), options)
  }

  /**
   * Get the path for the current agency.
   */
  private getAgencyPath(path: string): string {
    const newPath = path.startsWith('/') ? path.replace('/', '') : path

    return `/agencies/${this.username}/${newPath}`
  }
}
