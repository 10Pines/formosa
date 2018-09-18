import { Component } from '@angular/core';
import { validations } from 'formosa';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'app';
  noop = validations.noop;
  // constructor(public v: Validations) {
  // }

  doThings(o: any) {
    console.warn(o);
  }
}
