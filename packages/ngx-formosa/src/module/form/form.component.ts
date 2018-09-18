import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Form } from 'formosa/models';
import { formValidation } from 'formosa/validations';
import { FormService } from '../service/form.service';

@Component({
  selector: 'formosa-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [
    FormService,
  ],
})
export class FormComponent implements OnInit {

  @Output('submit') submit = new EventEmitter<any>();

  constructor(public formService: FormService) { }

  ngOnInit() { }

  get form(): any {
    return this.formService.form;
  }

  doSubmit(e: any) {
    e.preventDefault();
    e.stopPropagation();
    this.submit.emit(this.formService.form.value);
  }
}
