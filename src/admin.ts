import { Menus } from './resources/project/admin'

import type { Blutui } from './blutui'
import type { Project } from './project'
import { Request } from './request'

export class Admin extends Request {
  readonly menus = new Menus(this)

  constructor(
    private readonly project: Project,
    protected readonly blutui: Blutui
  ) {
    super(blutui)
  }

  protected getRequestPath(path: string): string {
    const newPath = path.startsWith('/') ? path.replace('/', '') : path
    return `https://${this.project.handle}.blutui.com/admin/api/${newPath}`
  }
}
