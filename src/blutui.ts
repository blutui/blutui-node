import { NoAccessTokenProvidedException } from './exceptions'
import { Client } from './utils/client'

import type { BlutuiOptions } from './types'

const VERSION = '0.1.0'

const DEFAULT_HOSTNAME = 'api.blutui.com'

export class Blutui {
  readonly baseURL: string
  private readonly client: Client

  /**
   * Create a new Blutui instance
   */
  public constructor(
    readonly accessToken?: string,
    readonly options: BlutuiOptions = {}
  ) {
    if (!accessToken) {
      this.accessToken = process?.env.BLUTUI_ACCESS_TOKEN

      if (!this.accessToken) {
        throw new NoAccessTokenProvidedException()
      }
    }

    const apiHostname = DEFAULT_HOSTNAME
    this.baseURL = `https://${apiHostname}`

    let useAgent: string = `blutui-node/${VERSION}`

    this.client = new Client(this.baseURL, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'User-Agent': useAgent,
      },
    })
    // this.headers = new Headers({
    //   Authorization: `Bearer ${options.accessToken}`,
    //   'Content-Type': 'application/json',
    // })
  }

  /**
   * Get the current Blutui Node SDK version.
   */
  get version() {
    return VERSION
  }
}
