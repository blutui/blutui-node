import { Menus } from './resources/project'

import type { Blutui } from './blutui'
import type { GetOptions, PostOptions } from './types'
import type { Project } from './project'

export class Admin {
  readonly menus = new Menus(this)

  constructor(
    private readonly project: Project,
    private readonly blutui: Blutui
  ) {}

  async get<Result>(path: string, options: GetOptions = {}) {
    return await this.blutui.get<Result>(this.getProjectPath(path), options)
  }

  async post<Result, Entity>(
    path: string,
    entity: Entity,
    options: PostOptions = {}
  ) {
    return await this.blutui.post<Result, Entity>(
      this.getProjectPath(path),
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
      this.getProjectPath(path),
      entity,
      options
    )
  }

  async delete<Result>(path: string, options: PostOptions = {}) {
    return await this.blutui.delete<Result>(this.getProjectPath(path), options)
  }

  /**
   * Get the path for the current agency.
   */
  private getProjectPath(path: string): string {
    const newPath = path.startsWith('/') ? path.replace('/', '') : path
    return `https://${this.project.handle}.blutui.com/admin/api/${newPath}`
  }
}
