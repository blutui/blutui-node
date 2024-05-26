import { Blutui } from './blutui'

import { Brand, Domains } from './resources/agency'
import type { GetOptions, PostOptions } from './types'

export class Agency {
  readonly brand = new Brand(this)
  readonly domains = new Domains(this)

  constructor(
    public username: string,
    private readonly blutui: Blutui
  ) {}

  async get<Result = any>(path: string, options: GetOptions = {}) {
    return this.blutui.get<Result>(this.getAgencyPath(path), options)
  }

  async post<Result = any, Entity = any>(
    path: string,
    entity?: Entity,
    options: PostOptions = {}
  ) {
    return this.blutui.post<Result, Entity>(
      this.getAgencyPath(path),
      entity,
      options
    )
  }

  async patch<Result = any, Entity = any>(
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

  async delete<Result = any>(path: string, options: PostOptions = {}) {
    return this.blutui.delete<Result>(this.getAgencyPath(path), options)
  }

  private getAgencyPath(path: string): string {
    path = path.startsWith('/') ? path.replace('/', '') : path

    return `/agencies/${this.username}/${path}`
  }
}
