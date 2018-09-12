import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import * as validations from 'formosa/validations';

import { LibComponent } from './component/lib.component';
import { LibService } from './service/lib.service';
import { FormComponent } from './form/form.component';
import { ValidatedTextInputComponent } from './validated-text-input/validated-text-input.component';

// Export module's public API
export { LibComponent } from './component/lib.component';
export { LibService } from './service/lib.service';

export class Validations { }

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    LibComponent,
    FormComponent,
    ValidatedTextInputComponent,
  ],
  declarations: [
    LibComponent,
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
