// @flow
import R from 'ramda';

import { Field } from './';

export class Form {
  fields: { [string]: Field };

  constructor() {
    this.fields = {};
  }

  registerField<T>(name: string, field: Field<T>): FieldHandle<T> {
    if (this.fields[name]) {
      console.warn(`A field with name ${name} is already registered, registering agian`);
    }

    this.updateField(name, field);

    return (field) => {
      this.updateField(name, field);
    }
  }

  updateField<T>(name: string, field: Field<T>) {
    this.fields[name] = field;
  }

  getState(): any {
    return R.map(field => field.getValue(), this.fields)
  }

  isValid(): boolean {
    return R.all(field => field.isValid(), R.values(this.fields));
  }
}
