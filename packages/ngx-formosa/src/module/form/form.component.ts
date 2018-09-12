import { Component, OnInit, Output, EventEmitter, FactoryProvider } from '@angular/core';
import { Form } from 'formosa/models';
import { formValidation } from 'formosa/validations';

export const formFactory = () => new Form(formValidation);

// @dynamic
@Component({
  selector: 'formosa-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [
    // new Provider(Form, formFactory),
    {
      provide: Form,
      useFactory: formFactory,
    },
  ]
})
export class FormComponent implements OnInit {

  @Output('submit') submit = new EventEmitter<any>();

  constructor(public form: Form) { }

  ngOnInit() { }

  doSubmit(e: any) {
    e.preventDefault();
    e.stopPropagation();
    this.submit.emit(this.form.value);
  }
}
