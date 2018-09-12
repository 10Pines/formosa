import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormosaModule } from 'ngx-formosa';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormosaModule.withValidations(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
