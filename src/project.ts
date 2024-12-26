import { Menus } from './resources/project'

import type { Blutui } from './blutui'
import { Admin } from './admin'
import { Request } from './utils/request'

export class Project extends Request {
  readonly admin = new Admin(this, this.blutui)
  readonly menus = new Menus(this)

  constructor(
    public handle: string,
    protected readonly blutui: Blutui
  ) {
    super(blutui)
  }

  protected getRequestPath(path: string): string {
    const newPath = path.startsWith('/') ? path.replace('/', '') : path

    return `https://${this.handle}.blutui.com/api/${newPath}`
  }
}
