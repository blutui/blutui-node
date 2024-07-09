import { Agency } from '@/agency'
import { Project } from './interfaces'
import { deserializeProjectList } from './serializers'
import { List } from '@/types'

export class Projects {
  constructor(private readonly agency: Agency) {}

  /**
   * Get the projects list for the current agency.
   */
  async list(): Promise<List<Project>> {
    const { data } = await this.agency.get('projects')
    return deserializeProjectList(data)
  }
}
