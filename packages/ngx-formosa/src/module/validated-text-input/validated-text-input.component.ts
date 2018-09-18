import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Field } from 'formosa/models';

import { FormService } from '../service/form.service';

@Component({
  selector: 'formosa-validated-text-input',
  templateUrl: './validated-text-input.component.html',
  styleUrls: ['./validated-text-input.component.css']
})
export class ValidatedTextInputComponent implements OnInit, OnDestroy {
  onDestory: () => void;
  @Input('name') name: string;
  @Input('validation') validation: any;
  field: Field;

  constructor(public formService: FormService) { }

  ngOnInit() {
    if (! this.name) {
      throw new Error(`All inputs must have a name`);
    }
    if (! this.validation) {
      throw new Error(`All inputs must have a validation`);
    }

    this.field = new Field(this.validation, '');
    this.onDestory = this.formService.form.registerField(this.name, this.field);
  }

  ngOnDestroy(): void {
    this.onDestory();
  }

  changed(event: any) {
    this.field.input = event.target.value;
  }
}
