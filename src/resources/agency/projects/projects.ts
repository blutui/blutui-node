import {
  deserializeProject,
  deserializeProjectList,
  serializeCreateProjectOptions,
  serializeUpdateProjectOptions,
} from './serializers'
import { deserializeDomainList } from '../domains/serializers'

import type { Agency } from '@/agency'
import type {
  CreateProjectOptions,
  Project,
  ProjectResponse,
  SearchProjectOptions,
  SerializedCreateProjectOptions,
  SerializedSearchProjectOptions,
  SerializedUpdateProjectOptions,
  UpdateProjectOptions,
} from './interfaces'
import type { Domain, DomainResponse } from '../domains/interfaces'
import type { Cassette, CassetteResponse } from '../cassettes/interfaces'
import type {
  DeletedResponse,
  Expandable,
  List,
  ListResponse,
  PaginationOptions,
} from '@/types'
import { deserializeCassetteList } from '../cassettes/serializers'

export class Projects {
  constructor(private readonly agency: Agency) {}

  /**
   * Get the projects list for the current agency.
   */
  async list(
    options?: PaginationOptions & Expandable<'primary_domain'>
  ): Promise<List<Project>> {
    const { data } = await this.agency.get<ListResponse<ProjectResponse>>(
      'projects',
      {
        query: options,
      }
    )

    return deserializeProjectList(data)
  }

  /**
   * Get a project's information by ID.
   */
  async get(
    id: string,
    options?: Expandable<'primary_domain'>
  ): Promise<Project> {
    const { data } = await this.agency.get<ProjectResponse>(`projects/${id}`, {
      query: options,
    })

    return deserializeProject(data)
  }

  /**
   * Add a project to your agency.
   */
  async create(payload: CreateProjectOptions): Promise<Project> {
    const { data } = await this.agency.post<
      ProjectResponse,
      SerializedCreateProjectOptions
    >('projects', serializeCreateProjectOptions(payload))

    return deserializeProject(data)
  }

  /**
   * Update a project in your agency.
   */
  async update(id: string, payload: UpdateProjectOptions): Promise<Project> {
    const { data } = await this.agency.patch<
      ProjectResponse,
      SerializedUpdateProjectOptions
    >(`projects/${id}`, serializeUpdateProjectOptions(payload))

    return deserializeProject(data)
  }

  /**
   * Archive a project in your agency.
   */
  async remove(id: string): Promise<DeletedResponse> {
    const { data } = await this.agency.delete<DeletedResponse>(`projects/${id}`)

    return data
  }

  /**
   * Retrieve a list of archived projects in your agency.
   */
  async archived(options?: PaginationOptions): Promise<List<Project>> {
    const { data } = await this.agency.get<ListResponse<ProjectResponse>>(
      'projects/archived',
      { query: options }
    )

    return deserializeProjectList(data)
  }

  /**
   * Restore a project with the given ID in your agency.
   */
  async restore(id: string): Promise<Project> {
    const { data } = await this.agency.delete<ProjectResponse>(
      `projects/${id}/archived`
    )

    return deserializeProject(data)
  }

  /**
   * Retrieve the domains for a project in your agency.
   */
  async domains(
    id: string,
    options?: PaginationOptions
  ): Promise<List<Domain>> {
    const { data } = await this.agency.get<ListResponse<DomainResponse>>(
      `projects/${id}/domains`,
      { query: options }
    )

    return deserializeDomainList(data)
  }

  /**
   * Retrieve the Cassettes for a project in your agency.
   */
  async cassettes(
    id: string,
    options?: PaginationOptions
  ): Promise<List<Cassette>> {
    const { data } = await this.agency.get<ListResponse<CassetteResponse>>(
      `projects/${id}/cassettes`,
      { query: options }
    )

    return deserializeCassetteList(data)
  }

  /**
   * Search for projects in your agency.
   */
  async search(
    payload: SearchProjectOptions,
    options?: PaginationOptions & Expandable<'primary_domain'>
  ): Promise<List<Project>> {
    const { data } = await this.agency.post<
      ListResponse<ProjectResponse>,
      SerializedSearchProjectOptions
    >('projects/search', payload, {
      query: options,
    })

    return deserializeProjectList(data)
  }

  /**
   * Publish a project with the given ID.
   *
   * NOTE: An active Blutui subscription is required to perform this action.
   */
  async publish(id: string): Promise<Project> {
    const { data } = await this.agency.post<
      ProjectResponse,
      Record<string, never>
    >(`projects/${id}/publish`, {})

    return deserializeProject(data)
  }

  /**
   * Republish a project with the given ID.
   */
  async republish(id: string): Promise<Project> {
    const { data } = await this.agency.post<
      ProjectResponse,
      Record<string, never>
    >(`projects/${id}/republish`, {})

    return deserializeProject(data)
  }

  /**
   * Unpublish a project with the given ID.
   */
  async unpublish(id: string): Promise<Project> {
    const { data } = await this.agency.post<
      ProjectResponse,
      Record<string, never>
    >(`projects/${id}/unpublish`, {})

    return deserializeProject(data)
  }
}
