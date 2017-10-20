// @flow
import R from 'ramda';

export class Field<T> {
  currentValue: T ;
  validation: T => ?string;

  constructor(
    currentValue: T,
    validation: T => ?string = R.always(null),
    transform: string => T = R.identity) {
    this.currentValue = currentValue;
    this.validation = validation;
  }

  isValid(): boolean {
    return this.getError() === null;
  }

  getValue(): T {
    return this.currentValue;
  }

  getError(): ?string {
    return this.validation(this.currentValue);
  }
}
