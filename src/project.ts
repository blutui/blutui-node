import { Menus, Redirects } from './resources/project'

import type { Blutui } from './blutui'
import { Admin } from './admin'
import { Request } from './utils/request'

export class Project extends Request {
  readonly admin: Admin
  readonly menus = new Menus(this)
  readonly redirects = new Redirects(this)

  constructor(
    public handle: string,
    blutui: Blutui
  ) {
    super(blutui)
    this.admin = new Admin(this, blutui)
  }

  protected getRequestPath(path: string): string {
    const newPath = path.startsWith('/') ? path.replace('/', '') : path

    return `https://${this.handle}.blutui.com/api/${newPath}`
  }
}
