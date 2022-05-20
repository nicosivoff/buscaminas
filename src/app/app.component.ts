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
  title: string = 'buscaminas';
  size: number = 15;
  mines: number = 3;
  board: Board = new Board(this.size, this.mines);
  constructor() {}

  ngOnInit(): void {}

  onClickCell(cell: Cell) {
    const result = this.board.onClickCell(cell);
    if (result == GameResultEnum.LOST_GAME) {
      // Loser
      alert('LOSER');
    } else if (result == GameResultEnum.WON_GAME) {
      // Winner
      alert('WINNER');
    }
  }

  onRightClickCell(cell: Cell, event: any) {
    event.preventDefault();
    if (cell.status == 'flag') {
      cell.status = 'open';
    } else {
      cell.status = 'flag';
    }
  }

  getProximityNumberClass(proximity: number): string {
    if (proximity == 1) {
      return 'text-primary';
    } else if (proximity == 2) {
      return 'text-success';
    } else {
      return 'text-danger';
    }
  }

  restartGame(): void {
    this.board = new Board(this.size, this.mines);
  }
}
