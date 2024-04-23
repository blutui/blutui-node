import {
  GenericServerException,
  NoAccessTokenProvidedException,
  UnauthorizedException,
} from './exceptions'
import { Client } from './utils/client'

import { FetchException } from './exceptions'
import { User } from './resources'

import type {
  BlutuiOptions,
  BlutuiResponseError,
  GetOptions,
  PostOptions,
} from './types'

const VERSION = '0.1.1'

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
      return await this.client.get(path, {
        params: options.query,
      })
    } catch (error) {
      this.handleFetchError({ path, error })

      throw error
    }
  }

  async post<Result = any, Entity = any>(
    path: string,
    entity: Entity,
    options: PostOptions = {}
  ): Promise<{ data: Result }> {
    try {
      return await this.client.post<Entity>(path, entity, {
        params: options.query,
      })
    } catch (error) {
      this.handleFetchError({ path, error })

      throw error
    }
  }

  private handleFetchError({ path, error }: { path: string; error: unknown }) {
    const { response } = error as FetchException<BlutuiResponseError>

    if (response) {
      const { status } = response

      switch (status) {
        case 401: {
          throw new UnauthorizedException()
        }
        default: {
          throw new GenericServerException()
        }
      }
    }
  }
}
