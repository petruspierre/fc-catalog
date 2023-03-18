import { ClassValidatorFields } from "../validators/class-validator-fields";
import { FieldsErrors } from "../validators/validator-fields-interface";
import expect from "expect";
import { EntityValidationError } from "../errors/validation.error";

type Expected = {
  validator: ClassValidatorFields<any>;
  data: any;
} | (() => any);

expect.extend({
  toContainErrorMessages(expected: Expected, received: FieldsErrors) {
    if(typeof expected === 'function') {
      try {
        expected()
        return {
          pass: false,
          message: () => `Expected ${received.data} to be invalid.`,
        };
      } catch(e) {
        const error = e as EntityValidationError
        return assertContainsErrorsMessages(error.error, received)
      }
    } else {
      const { validator, data } = expected;

      const validated = validator.validate(data);
  
      if (validated) {
        return isValid();
      }

      return assertContainsErrorsMessages(validator.errors, received)
    }
  },
});

function isValid() {
  return {
    pass: true,
    message: () => "",
  };
}

function assertContainsErrorsMessages(expected: FieldsErrors, received: FieldsErrors) {
  const isMatch = expect.objectContaining(received).asymmetricMatch(
    expected
  );

  return isMatch
    ? { pass: true, message: () => "" }
    : {
        pass: false,
        message: () =>
          `The validation errors does not contain ${JSON.stringify(
            received, null, 2
          )}. Current: ${JSON.stringify(expected, null, 2)}`,
      };
}