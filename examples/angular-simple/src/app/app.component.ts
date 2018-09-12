import { Component } from '@angular/core';
import { Validations } from 'ngx-formosa';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(public v: Validations) {
  }

  doThings(o: any) {
    console.warn(o);
  }
}
