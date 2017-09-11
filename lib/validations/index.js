export function makeValidation(nakedValidation) {
  let validation = (input) => nakedValidation(input);

  validation.and = 
    (otherValidation) => makeValidation((input) => (nakedValidation(input) || otherValidation(input)));
  
  validation.withError = 
    (errorMessage) => makeValidation((input) => {
      const error = nakedValidation(input);
      return error === null ? null : errorMessage;
    });
  
  return validation;
};

export const never = makeValidation(
  (input) => 'This field will never be valid');

export const alpha = makeValidation(
  (input) => !/^[a-zA-Z]*$/.test(input) ? 'This field should have only letters' : null);

export const noop = makeValidation(
  (input) => null);

export const notEmpty = makeValidation(
  (input) => input === '' ? `This field can't be empty` : null);
