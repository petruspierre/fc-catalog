import ValidationError from "../../errors/validation.error"
import ValidatorRules from "../validator-rules"

type Values = {
  value: any;
  property?: string;
}

type ExpectedRule = {
  value: any;
  property: string;
  rule: keyof ValidatorRules;
  error: ValidationError;
  params?: any[];
}

function assertInvalid(expected: ExpectedRule) {
  expect(() => {
    runRule(expected)
  }).toThrow(expected.error)
}

function assertValid(expected: ExpectedRule) {
  expect(() => {
    runRule(expected)
  }).not.toThrow(expected.error)
}

function runRule({ value, property, rule, params = [] }: Omit<ExpectedRule, 'error'>) {
  const validator = ValidatorRules.values(value, property)
  const method = validator[rule]
  method.apply(validator, params)
}

describe('ValidatorRules Unit Tests', () => {
  test('values method', () => {
    const validator = ValidatorRules.values('value', 'property')

    expect(validator).toBeInstanceOf(ValidatorRules)
    expect(validator['value']).toBe('value')
    expect(validator['property']).toBe('property')
  })

  test('required validation rule', () => {
    const property = 'property'
    const rule = 'required'
    const error = new ValidationError(`${property} is required.`)

    const validCases: Values[] = [
      { value: 'value' },
      { value: 0 },
      { value: false },
      { value: 5 },
      { value: { prop1: 'value1' } },
    ]

    const invalidCases: Values[] = [
      { value: '' },
      { value: null },
      { value: undefined },
    ]

    validCases.forEach((validCase) => {
      assertValid({
        value: validCase.value,
        property: validCase.property || property,
        rule,
        error
      })
    })

    invalidCases.forEach((invalidCase) => {
      assertInvalid({
        value: invalidCase.value,
        property: invalidCase.property || property,
        rule,
        error
      })
    })
  })

  test('string validation rule', () => {
    const property = 'property'
    const rule = 'string'
    const error = new ValidationError(`${property} must be a string.`)

    const validCases: Values[] = [
      { value: 'value' },
      { value: '' },
      { value: null },
      { value: undefined },
    ]

    const invalidCases: Values[] = [
      { value: 5 },
      { value: {} },
      { value: false },
    ]

    validCases.forEach((validCase) => {
      assertValid({
        value: validCase.value,
        property: validCase.property || property,
        rule,
        error
      })
    })

    invalidCases.forEach((invalidCase) => {
      assertInvalid({
        value: invalidCase.value,
        property: invalidCase.property || property,
        rule,
        error
      })
    })
  })

  test('boolean validation rule', () => {
    const property = 'property'
    const rule = 'boolean'
    const error = new ValidationError(`${property} must be a boolean.`)

    const validCases: Values[] = [
      { value: true },
      { value: false },
      { value: null },
      { value: undefined },
    ]

    const invalidCases: Values[] = [
      { value: 5 },
      { value: {} },
      { value: 'false' },
    ]

    validCases.forEach((validCase) => {
      assertValid({
        value: validCase.value,
        property: validCase.property || property,
        rule,
        error
      })
    })

    invalidCases.forEach((invalidCase) => {
      assertInvalid({
        value: invalidCase.value,
        property: invalidCase.property || property,
        rule,
        error
      })
    })
  })

  test('maxLength validation rule', () => {
    const property = 'property'
    const max = 5
    const rule = 'maxLength'
    const error = new ValidationError(`${property} must be less or equal than ${max} characters.`)

    const validCases: Values[] = [
      { value: '12345' },
      { value: '' },
      { value: null },
      { value: undefined },
    ]

    const invalidCases: Values[] = [
      { value: '123456' },
    ]

    validCases.forEach((validCase) => {
      assertValid({
        value: validCase.value,
        property: validCase.property || property,
        rule,
        params: [max],
        error
      })
    })

    invalidCases.forEach((invalidCase) => {
      assertInvalid({
        value: invalidCase.value,
        property: invalidCase.property || property,
        rule,
        params: [max],
        error
      })
    })
  })

  it('should throw a validation error when combining two or more rules', () => {
    let validator = ValidatorRules.values(null, 'field')

    expect(() => {
      validator.required().string()
    }).toThrow(new ValidationError('field is required.'))

    validator = ValidatorRules.values(5, 'field')
    expect(() => {
      validator.required().string().maxLength(5)
    }).toThrow(new ValidationError('field must be a string.'))

    validator = ValidatorRules.values("123456", 'field')
    expect(() => {
      validator.required().string().maxLength(5)
    }).toThrow(new ValidationError('field must be less or equal than 5 characters.'))

    validator = ValidatorRules.values(null, 'field')
    expect(() => {
      validator.required().boolean()
    }).toThrow(new ValidationError('field is required.'))
  })
})