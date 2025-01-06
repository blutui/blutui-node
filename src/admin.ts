import { Menus } from './resources/project/admin'

import type { Project } from './project'
import { Request } from './utils/request'

export class Admin extends Request {
  readonly menus = new Menus(this)

  constructor(private readonly project: Project) {
    super(project.blutui)
  }

  protected getRequestPath(path: string): string {
    const newPath = path.startsWith('/') ? path.replace('/', '') : path
    return `https://${this.project.handle}.blutui.com/admin/api/${newPath}`
  }
}
