import { validate as uuidValidate } from 'uuid';

import { UniqueEntityId } from "./unique-entity-id.vo"
import { InvalidUuidError } from '../errors/invalid-uuid.error';

describe('UniqueEntityId unit tests', () => {
  it('should throw error when uuid is invalid', () => {
    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate')

    expect(() => {
      new UniqueEntityId('fake id')
    }).toThrow(new InvalidUuidError())
    expect(validateSpy).toHaveBeenCalled()
  })

  it('should accept a uuid passed in constructor', () => {
    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate')

    const uuid = 'c1d2f6e8-7b9a-4d3c-8e2e-6f9d1a7b8c0d'
    const vo = new UniqueEntityId(uuid)

    expect(vo.id).toBe(uuid)
    expect(validateSpy).toHaveBeenCalled()
  })

  it('should generate a uuid when not passed in constructor',()  => {
    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate')
    const vo = new UniqueEntityId()

    expect(vo.id).toBeDefined()
    expect(validateSpy).toHaveBeenCalled()
    expect(uuidValidate(vo.id)).toBe(true)
  })
})