import { Component } from '@angular/core';
import { Board } from './models/board';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'buscaminas';
  board = new Board(10, 2);
}
