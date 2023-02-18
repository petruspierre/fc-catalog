import ValueObject from "../value-object"

class StubValueObject extends ValueObject {

}

describe('ValueObject Unit Tests', () => {
  it('should set value', () => {
    let vo = new StubValueObject('string value')
    expect(vo.value).toBe('string value')

    vo = new StubValueObject({ prop1: 'value1' })
    expect(vo.value).toStrictEqual({ prop1: 'value1' })
  })

  it('should convert to a string', () => {
    const date = new Date()
    let arrange = [
      { value: 'string value', expected: 'string value' },
      { value: { prop1: 'value1' }, expected: '{"prop1":"value1"}' },
      { value: null, expected: 'null' },
      { value: undefined, expected: 'undefined' },
      { value: date, expected: date.toString() },
      { value: 1, expected: '1' },
      { value: true, expected: 'true' },
      { value: false, expected: 'false' },
    ]

    arrange.forEach(({ value, expected }) => {
      const vo = new StubValueObject(value)
      expect(`${vo}`).toBe(expected)
    })
  })
})