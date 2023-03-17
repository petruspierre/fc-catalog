import { ClassValidatorFields } from "../validators/class-validator-fields";
import { FieldsErrors } from "../validators/validator-fields-interface";
import expect from "expect";

type Expected = {
  validator: ClassValidatorFields<any>;
  data: any;
};

expect.extend({
  toContainErrorMessages(expected: Expected, received: FieldsErrors) {
    const { validator, data } = expected;

    const isValid = validator.validate(data);

    if (isValid) {
      return {
        pass: false,
        message: () => `Expected ${received.data} to be invalid.`,
      };
    }

    const isMatch = expect.objectContaining(received).asymmetricMatch(
      validator.errors
    );

    return isMatch
      ? { pass: true, message: () => "" }
      : {
          pass: false,
          message: () =>
            `The validation errors does not contain ${JSON.stringify(
              received, null, 2
            )}. Current: ${JSON.stringify(validator.errors, null, 2)}`,
        };
  },
});
