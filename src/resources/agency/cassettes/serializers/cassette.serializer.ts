import { deserializeProject } from '../../projects/serializers'

import type { Cassette, CassetteResponse } from '../interfaces'

export const deserializeCassette = (cassette: CassetteResponse): Cassette => ({
  id: cassette.id,
  object: cassette.object,
  handle: cassette.handle,
  name: cassette.name,
  project:
    cassette.project instanceof Object
      ? deserializeProject(cassette.project)
      : cassette.project,
  parent:
    cassette.parent instanceof Object
      ? deserializeCassette(cassette.parent)
      : cassette.parent,
  createdAt: cassette.created_at,
  updatedAt: cassette.updated_at,
})
