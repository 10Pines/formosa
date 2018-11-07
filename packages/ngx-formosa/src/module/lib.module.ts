import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import * as validations from 'formosa/validations';

import { FormComponent } from './form/form.component';
import { ValidatedTextInputComponent } from './validated-text-input/validated-text-input.component';

// Export module's public API
export { FormService } from './service/form.service';

export class Validations { }

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    FormComponent,
    ValidatedTextInputComponent,
  ],
  declarations: [
    FormComponent,
    ValidatedTextInputComponent,
  ]
})
export class FormosaModule {
  static withValidations(): ModuleWithProviders {
    return {
      ngModule: FormosaModule,
      providers: [
        {provide: Validations, useValue: validations},
      ]
    };
  }
}
