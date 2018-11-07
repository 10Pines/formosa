import { Injectable } from '@angular/core';
import { Form } from 'formosa/models';
import { formValidation } from 'formosa/validations';

@Injectable()
export class FormService {
  public form: any
  constructor() {
    this.form = new Form(formValidation)
    console.log(this.form);
  }
}
