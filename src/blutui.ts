import { NoAccessTokenProvidedException } from './exceptions'
import { Client } from './utils/client'

import { User } from './resources'

import type { BlutuiOptions, GetOptions, PostOptions } from './types'

const VERSION = '0.1.0'

const DEFAULT_HOSTNAME = 'api.blutui.com'

export class Blutui {
  readonly baseURL: string
  private readonly client: Client

  readonly user = new User(this)

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
  }

  /**
   * Get the current Blutui Node SDK version.
   */
  get version() {
    return VERSION
  }

  async get<Result = any>(
    path: string,
    options: GetOptions = {}
  ): Promise<{ data: Result }> {
    try {
      return await this.client.get(path, {})
    } catch (error) {
      throw error
    }
  }

  async post<Result = any, Entity = any>(
    path: string,
    entity: Entity,
    options: PostOptions = {}
  ): Promise<{ data: Result }> {
    try {
      return await this.client.post<Entity>(path, entity, {})
    } catch (error) {
      throw error
    }
  }
}
