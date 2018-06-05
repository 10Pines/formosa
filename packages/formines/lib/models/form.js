import { action, extendObservable, observable, computed } from 'mobx';


export class Form {

  constructor(validation) {
    this.validation = validation;
    extendObservable(this, {
      fields: observable.map()
    });
  }

  @action registerField(name, newField) {
    if (this.fields.has(name)) {
      console.warn(`A field with name '${name}' is already registered, registering agian`);
    }

    newField.delete = () => {
      this.fields.delete(name);
    };

    this.fields.set(name, newField);
    return newField;
  }

  @computed get validationResult() {
    return this.validation.validate(this.fields);
  }

  @computed get wasTouched() {
    if (this.fields.size <= 0) {
      return false;
    }

    for (const [name, field] of this.fields) {
      if (! field.wasTouched) {
        return false;
      } 
    }

    return true;
  }

  @computed get value() {
    return this.validationResult.value;
  }

  @computed get isValid() {
    return this.validationResult.isValid;
  }

  @computed get errorMessage() {
    return this.validationResult.errorMessage;
  }
}
