import { Agency } from '@/agency'
import { Blutui } from '@/blutui'

export abstract class AgencyResource {
  protected readonly blutui: Blutui

  constructor(private readonly agency: Agency) {
    this.blutui = this.agency.blutui
  }

  protected path(path: string): string {
    path = path.startsWith('/') ? path.replace('/', '') : path
    return `/agencies/${this.agency.username}/${path}`
  }
}

export { Brand } from './brand/brand'
export { Domains } from './domains/domains'
