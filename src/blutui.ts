import { Agency } from './agency'
import {
  FetchException,
  GenericServerException,
  NoAccessTokenProvidedException,
  NotFoundException,
  UnauthorizedException,
  ValidationException,
  AuthorizationException,
} from './exceptions'
import { Client } from './utils/client'

import { Agencies, User } from './resources'

import type {
  BlutuiOptions,
  BlutuiResponseError,
  DeleteOptions,
  GetOptions,
  PatchOptions,
  PostOptions,
} from './types'

const VERSION = '0.7.0'

const DEFAULT_HOSTNAME = 'api.blutui.com'

export class Blutui {
  readonly baseURL: string
  private readonly client: Client
  private readonly _agencies: Record<string, Agency> = {}

  readonly agencies = new Agencies(this)
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

    const useAgent: string = `blutui-node/${VERSION}`

    this.client = new Client(
      this.baseURL,
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'User-Agent': useAgent,
        },
      },
      options.request?.fetch
    )
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
    if (!this._agencies[username]) {
      this._agencies[username] = new Agency(username, this)
    }

    return this._agencies[username]
  }

  async get<Result>(
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

  async post<Result, Entity>(
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

  async patch<Result, Entity>(
    path: string,
    entity: Entity,
    options: PatchOptions = {}
  ): Promise<{ data: Result }> {
    try {
      return await this.client.patch<Entity>(path, entity, {
        params: options.query,
      })
    } catch (error) {
      this.handleFetchError({ path, error })

      throw error
    }
  }

  async delete<Result>(
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
    if (!(error instanceof FetchException)) {
      throw new Error(`Unexpected error: ${error}`)
    }

    const { response } = error as FetchException<BlutuiResponseError>

    if (response) {
      const { status, data } = response
      const { type, message, errors } = data

      switch (status) {
        case 401: {
          throw new UnauthorizedException()
        }
        case 403: {
          throw new AuthorizationException({ message, type })
        }
        case 422: {
          throw new ValidationException({ message, type, errors })
        }
        case 404: {
          throw new NotFoundException({ message, type, path })
        }
        default: {
          throw new GenericServerException()
        }
      }
    }
  }
}
