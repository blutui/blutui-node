import { Agency } from '@/agency'
import { Project } from './interfaces'
import { deserializeProjectList } from './serializers'
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
}
