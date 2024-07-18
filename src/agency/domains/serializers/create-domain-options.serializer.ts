import {
  CreateDomainOptions,
  SerializedCreateDomainOptions,
} from '../interfaces'

export const serializeCreateDomainOptions = (
  options: CreateDomainOptions
): SerializedCreateDomainOptions => ({
  name: options.name,
  project: options.project,
})
