import type { Blutui } from '../blutui'
import type { GetOptions, PostOptions } from '../types'

export abstract class Request {
  async get<Result>(path: string, options: GetOptions = {}) {
    return await this.getBlutui().get<Result>(
      this.getRequestPath(path),
      options
    )
  }

  async post<Result, Entity>(
    path: string,
    entity: Entity,
    options: PostOptions = {}
  ) {
    return await this.getBlutui().post<Result, Entity>(
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
    return await this.getBlutui().patch<Result, Entity>(
      this.getRequestPath(path),
      entity,
      options
    )
  }

  async delete<Result>(path: string, options: PostOptions = {}) {
    return await this.getBlutui().delete<Result>(
      this.getRequestPath(path),
      options
    )
  }

  /**
   * Get the path for the current request.
   */
  protected abstract getRequestPath(path: string): string

  protected abstract getBlutui(): Blutui
}
