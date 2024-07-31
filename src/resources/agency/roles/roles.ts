import {
  deserializeRole,
  deserializeRoleList,
  serializeCreateRoleOptions,
  serializeUpdateRoleOptions,
} from './serializers'

import type { Agency } from '@/agency'
import type {
  CreateRoleOptions,
  Role,
  RoleResponse,
  SerializedCreateRoleOptions,
  SerializedUpdateRoleOptions,
  UpdateRoleOptions,
} from './interfaces'
import type {
  DeletedResponse,
  List,
  ListResponse,
  PaginationOptions,
} from '@/types'

export class Roles {
  constructor(private readonly agency: Agency) {}

  /**
   * Get a list of roles for the current agency.
   */
  async list(options?: PaginationOptions): Promise<List<Role>> {
    const { data } = await this.agency.get<ListResponse<RoleResponse>>(
      'roles',
      { query: options }
    )

    return deserializeRoleList(data)
  }

  /**
   * Get a role's information by ID.
   */
  async get(id: string): Promise<Role> {
    const { data } = await this.agency.get<RoleResponse>(`roles/${id}`)

    return deserializeRole(data)
  }

  /**
   * Add a role to your agency.
   */
  async create(payload: CreateRoleOptions): Promise<Role> {
    const { data } = await this.agency.post<
      RoleResponse,
      SerializedCreateRoleOptions
    >('roles', serializeCreateRoleOptions(payload))

    return deserializeRole(data)
  }

  /**
   * Update a rle for the current agency.
   *
   * @param payload - The values to update the role
   */
  async update(id: string, payload: UpdateRoleOptions): Promise<Role> {
    const { data } = await this.agency.patch<
      RoleResponse,
      SerializedUpdateRoleOptions
    >(`roles/${id}`, serializeUpdateRoleOptions(payload))

    return deserializeRole(data)
  }

  /**
   * Remove a role for the current agency.
   */
  async remove(id: string): Promise<DeletedResponse> {
    const { data } = await this.agency.delete<DeletedResponse>(`roles/${id}`)

    return data
  }
}
