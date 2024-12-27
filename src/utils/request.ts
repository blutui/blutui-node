import type { Blutui } from '../blutui'
import type { GetOptions, PostOptions } from '../types'

export abstract class Request {
  constructor(protected readonly blutui: Blutui) {}

  async get<Result>(path: string, options: GetOptions = {}) {
    return await this.blutui.get<Result>(this.getRequestPath(path), options)
  }

  async post<Result, Entity>(
    path: string,
    entity: Entity,
    options: PostOptions = {}
  ) {
    return await this.blutui.post<Result, Entity>(
      this.getRequestPath(path),
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
      this.getRequestPath(path),
      entity,
      options
    )
  }

  async delete<Result>(path: string, options: PostOptions = {}) {
    return await this.blutui.delete<Result>(this.getRequestPath(path), options)
  }

  /**
   * Get the path for the current request.
   */
  protected abstract getRequestPath(path: string): string
}
