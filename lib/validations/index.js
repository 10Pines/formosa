// @flow
import R from 'ramda';

// export type ValidationSuccess<T> = {
//   isValid: true,
//   value: T
// }

// export type ValidationError = {
//   isValid: false,
//   errorMessage: string
// }

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
export class Validation<S, R> {
  validate(originalValue: S): ValidationResult<R> {
    throw new Error(`This is an abstract method, every subclass of Validation should override this`);
  };

  then(validation: Validation<R, T>): Validation<S, T> {
    return new PipeValidation(this, validation);
  };

  and(otherValidation: Validation<S, R>): Validation<S, R> {
    return new BothValidation(this, otherValidation);
  };

  withError(errorMessage: string): Validation<S, R> {
    return new WithErrorValidation(this, errorMessage);
  };
};

export class WithErrorValidation<S, R> extends Validation<S, R> {
  errorMessage: string;
  validation: Validation<S, R>;

  constructor(validation: Validation<S, R>, errorMessage: string) {
    super();
    this.errorMessage = errorMessage;
    this.validation = validation;
  }

  validate(originalValue: S): ValidationResult<R> {
    const result: ValidationResult<R> = this.validation.validate(originalValue);
    if (!result.isValid) {
      return error(this.errorMessage);
    } else {
      return result;
    }
  }
}

export class CustomValidation<S, R> extends Validation<S, R> {
  validation: (originalValue: S) => ValidationResult<R>

  constructor(validation: (originalValue: S) => ValidationResult<R>) {
    super();
    this.validation = validation;
  }
}

export class BothValidation<S, R> extends Validation<S, R> {
  firstValidation: Validation<S, R>;
  secondValidation: Validation<S, R>;

  constructor(
    firstValidation: Validation<S, R>,
    secondValidation: Validation<S, R>
  ) {
    super();
    this.firstValidation = firstValidation;
    this.secondValidation = secondValidation;
  }

  validate(originalValue: S): ValidationResult<R> {
    const result: ValidationResult<R> = this.firstValidation.validate(originalValue);

    if (!result.isValid) {
      return result;
    } else {
      return this.secondValidation.validate(originalValue);
    }
  };

}

export class NullValidation<S> extends Validation<S, S> {
  validate(originalValue: S): ValidationResult<S> {
    return success(originalValue);
  };
}

export class NaziValidation extends Validation<*, *> {
  validate(originalValue: *): ValidationResult<*> {
    return error('This field will never be valid');
  }
}

export class AlphaValidation extends Validation<string, string> {
  validate(originalValue: string): ValidationResult<string> {
    if (!/^[a-zA-Z]*$/.test(originalValue)) {
      return error('This field should have only letters');
    } else {
      return success(originalValue);
    }
  }
}

export class NotEmptyValidation extends Validation<string, string> {
  validate(originalValue: string): ValidationResult<string> {
    if (originalValue === '') {
      return error(`This field can't be empty`);
    } else {
      return success(originalValue);
    }
  }
}

export class FloatValidation extends Validation<string, number> {
  validate(originalValue: string): ValidationResult<number> {
    let number = Number(originalValue);
    if(Number.isNaN(number)) {
      return error('The input muest be a number')
    } else {
      return success(number);
    }
  }
}

export class FormValidation extends Validation {
  validate(values) {
    if (R.values(values).length !== 0 && R.all(R.prop('isValid'), R.values(values))) {
      return success(R.map(R.prop('value'), values));
    } else {
      return error('Something went wrong');
    }
  }
}

export class PipeValidation extends Validation<S, T> {
  firstValidation: Validation<S, K>;
  secondValidation: Validation<K, T>;

  constructor(firstValidation: Validation<S, K>, secondValidation: Validation<K, T>) {
    super();
    this.firstValidation = firstValidation;
    this.secondValidation = secondValidation;
  }

  validate(value: S): ValidationResult<T> {
    let validationResult = this.firstValidation.validate(value);
    if (! validationResult.isValid) {
      return validationResult;
    } else {
      return this.secondValidation.validate(validationResult.value);
    }
  }
}

export const never: Validation<*, *> = new NaziValidation();
export const alpha: Validation<string, string> = new AlphaValidation();
export const noop: Validation<any, any> = new NullValidation();
export const notEmpty: Validation<string, string> = new NotEmptyValidation();
export const number: Validation<string, number> = new FloatValidation();
export const formValidation = new FormValidation();
