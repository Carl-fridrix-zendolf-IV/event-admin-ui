import { Component } from '@angular/core';


@Component({
  selector: 'my-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
    // static API_URL: string = 'http://localhost:3100';
    static API_URL: string = 'https://digital-wall.herokuapp.com';

    constructor () {}
}
