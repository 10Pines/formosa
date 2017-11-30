// export type ValidationSuccess<T> = {
//   isValid: true,
//   value: T
// }
//
// export type ValidationError = {
//   isValid: false,
//   errorMessage: string
// }
//
// export type ValidationResult<T> = ValidationSuccess<T>|ValidationError;

export const success = /*<T>*/(x/*: T*/)/*: ValidationSuccess<T>*/ => ({
  isValid: true,
  value: x
});

export const error = (errorMessage/*: string */)/*: ValidationError*/ => ({
  isValid: false,
  errorMessage: errorMessage
});

// Here only to implement utility methods with nice syntax
export class Validation {
  validate(originalValue) {
    throw new Error(`This is an abstract method, every subclass of Validation should override it`);
  };

  then(validation) {
    return new PipeValidation(this, validation);
  };

  and(otherValidation) {
    return new BothValidation(this, otherValidation);
  };

  withError(errorMessage) {
    return new WithErrorValidation(this, errorMessage);
  };
};

export class WithErrorValidation extends Validation {
  constructor(validation, errorMessage) {
    super();
    this.errorMessage = errorMessage;
    this.validation = validation;
  }

  validate(originalValue) {
    const result = this.validation.validate(originalValue);
    if (!result.isValid) {
      return error(this.errorMessage);
    } else {
      return result;
    }
  }
}

export class CustomValidation extends Validation {
  constructor(validation) {
    super();
    this.validation = validation;
  }

  validate(value) {
    return this.validation(value);
  }
}

export class BothValidation extends Validation {
  constructor(firstValidation, secondValidation) {
    super();
    this.firstValidation = firstValidation;
    this.secondValidation = secondValidation;
  }

  validate(originalValue) {
    const result = this.firstValidation.validate(originalValue);

    if (!result.isValid) {
      return result;
    } else {
      return this.secondValidation.validate(originalValue);
    }
  };

}

export class NullValidation extends Validation {
  validate(originalValue) {
    return success(originalValue);
  };
}

export class NaziValidation extends Validation {
  validate(originalValue) {
    return error('This field will never be valid');
  }
}

export class AlphaValidation extends Validation {
  validate(originalValue) {
    if (!/^[a-zA-Z]*$/.test(originalValue)) {
      return error('This field should have only letters');
    } else {
      return success(originalValue);
    }
  }
}

export class NotEmptyValidation extends Validation<string, string> {
  validate(originalValue) {
    if (originalValue === '') {
      return error(`This field can't be empty`);
    } else {
      return success(originalValue);
    }
  }
}

export class FloatValidation extends Validation {
  validate(originalValue) {
    let number = Number(originalValue);
    if (Number.isNaN(number)) {
      return error('The input muest be a number');
    } else {
      return success(number);
    }
  }
}

export class FormValidation extends Validation {
  validate(values) {
    let finalValue = {};

    for (const [name, field] of values) {
      if (field.isValid) {
        finalValue[name] = field.value;
      } else {
        return error(`Field ${name} is not valid`);
      }
    }

    if (values.size <= 0) {
      return error('There are no fields');
    }

    return success(finalValue);
  }
}

export class PipeValidation extends Validation {
  constructor(firstValidation, secondValidation) {
    super();
    this.firstValidation = firstValidation;
    this.secondValidation = secondValidation;
  }

  validate(value) {
    let validationResult = this.firstValidation.validate(value);
    if (! validationResult.isValid) {
      return validationResult;
    } else {
      return this.secondValidation.validate(validationResult.value);
    }
  }
}

export const never = new NaziValidation();
export const alpha = new AlphaValidation();
export const noop = new NullValidation();
export const notEmpty = new NotEmptyValidation();
export const number = new FloatValidation();
export const formValidation = new FormValidation();
