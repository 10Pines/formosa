// @flow
import R from 'ramda';
import { extendObservable, computed, observe } from 'mobx';

export class Field {
  constructor(validation, initialInput) {
    extendObservable(this, {
      input: initialInput,
      wasTouched: false
    });
    observe(this, 'input', (change) => {
      this.wasTouched = true;
    });
    this.validation = validation;
  }

  @computed get validationResult() {
    return this.validation.validate(this.input);
  }

  @computed get isValid() {
    return this.validationResult.isValid;
  }

  @computed get value() {
    return this.validationResult.value;
  }

  @computed get errorMessage() {
    return this.validationResult.errorMessage;
  }
}
