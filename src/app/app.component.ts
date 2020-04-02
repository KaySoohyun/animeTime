import { Component } from '@angular/core';
import { Observable } from 'rxjs-compat';
import { map } from 'rxjs-compat/operators/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'animeTime';
  
  constructor() { 
  }
}