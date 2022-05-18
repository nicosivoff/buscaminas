import { Component } from '@angular/core';
import { GameResultEnum } from './enums/game-result.enum';
import { Board } from './models/board';
import { Cell } from './models/cell.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'buscaminas';
  board: Board = new Board(3, 2);
  constructor() {}

  ngOnInit(): void {}

  onClickCell(cell: Cell) {
    const result = this.board.onClickCell(cell);
    if (result == GameResultEnum.LOST_GAME) {
      // Loser
    } else if (result == GameResultEnum.WON_GAME) {
      // Winner
    }
  }
}
