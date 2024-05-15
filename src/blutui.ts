import { Agency } from './agency'
import {
  FetchException,
  GenericServerException,
  NoAccessTokenProvidedException,
  NotFoundException,
  UnauthorizedException,
  ValidationException,
} from './exceptions'
import { Client } from './utils/client'

import { User } from './resources'

import type {
  BlutuiOptions,
  BlutuiResponseError,
  DeleteOptions,
  GetOptions,
  PatchOptions,
  PostOptions,
} from './types'

const VERSION = '0.2.0'

const DEFAULT_HOSTNAME = 'api.blutui.com'

export class Blutui {
  readonly baseURL: string
  private readonly client: Client

  readonly agencies: Record<string, Agency> = {}
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

  /**
   * Get a Blutui Agency instance for the given agency.
   *
   * @param username - The agency's username
   */
  agency(username: string): Agency {
    if (!this.agencies[username]) {
      this.agencies[username] = new Agency(username, this)
    }

    return this.agencies[username]
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

  async patch<Result = any, Entity = any>(
    path: string,
    entity: Entity,
    options: PatchOptions = {}
  ): Promise<{ data: Result }> {
    try {
      return this.client.patch<Entity>(path, entity, {
        params: options.query,
      })
    } catch (error) {
      this.handleFetchError({ path, error })

      throw error
    }
  }

  async delete<Result = any>(
    path: string,
    options: DeleteOptions = {}
  ): Promise<{ data: Result }> {
    try {
      return await this.client.delete(path, {
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
      const { status, data } = response
      const { type, message } = data

      switch (status) {
        case 422: {
          throw new ValidationException({ message, type })
        }
        case 401: {
          throw new UnauthorizedException()
        }
        case 404: {
          throw new NotFoundException({ message, type, path })
        }
        default: {
          console.error('Unhandled error:', data, status)
          throw new GenericServerException()
        }
      }
    }
  }
}
