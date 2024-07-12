import { Agency } from '@/agency'
import {
  CreateProjectOptions,
  Project,
  ProjectResponse,
  SerializedCreateProjectOptions,
  SerializedUpdateProjectOptions,
} from './interfaces'
import {
  deserializeProject,
  deserializeProjectList,
  serializeCreateProjectOptions,
  serializeUpdateProjectOptions,
} from './serializers'
import { Expandable, List, PaginationOptions } from '@/types'

export class Projects {
  constructor(private readonly agency: Agency) {}

  /**
   * Get the projects list for the current agency.
   */
  async list(
    options?: PaginationOptions & Expandable<'primary_domain'>
  ): Promise<List<Project>> {
    const { data } = await this.agency.get('projects', {
      query: options,
    })

    return deserializeProjectList(data)
  }

  /**
   * Get a project's information by ID.
   */
  async get(
    id: string,
    options: Expandable<'primary_domain'>
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
  async update(id: string, payload: {}): Promise<Project> {
    const { data } = await this.agency.patch<
      ProjectResponse,
      SerializedUpdateProjectOptions
    >(`projects/${id}`, serializeUpdateProjectOptions(payload))

    return deserializeProject(data)
  }
}
