import {
  SerializedUpdateDomainOptions,
  UpdateDomainOptions,
} from '../interfaces'

export const serializeUpdateDomainOptions = (
  options: UpdateDomainOptions
): SerializedUpdateDomainOptions => ({
  project: options.project,
})
