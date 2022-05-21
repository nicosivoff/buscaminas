import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DialogResultComponent } from './dialogs/dialog-result/dialog-result.component';
import { DialogData } from './dialogs/models/dialog-data.model';
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
  size: number = 10;
  mines: number = 7;
  board: Board = new Board(this.size, this.mines);
  counter: number = 0;
  displayTime: any = '00:00';
  interval: any;
  firstClick: boolean = false;
  constructor(public dialog: MatDialog) {}

  onClickCell(cell: Cell) {
    const result = this.board.onClickCell(cell);
    if (!this.firstClick) {
      this.startCountDown();
      this.firstClick = true;
    }
    if (result == GameResultEnum.LOST_GAME) {
      const result: DialogData = new DialogData();
      result.title = '¡ Perdiste !';
      result.time = this.displayTime;
      result.win = false;
      this.openDialog(result);

      clearInterval(this.interval);
    } else if (result == GameResultEnum.WON_GAME) {
      const result: DialogData = new DialogData();
      result.title = '¡ Ganaste !';
      result.time = this.displayTime;
      result.win = true;
      this.openDialog(result);

      clearInterval(this.interval);
    }
  }

  onRightClickCell(cell: Cell, event: any) {
    event.preventDefault();
    if (cell.status !== 'clear') {
      if (cell.status == 'flag') {
        cell.status = 'open';
      } else {
        cell.status = 'flag';
      }
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
    this.counter = 0;
    this.displayTime = '00:00';
    clearInterval(this.interval);
    this.firstClick = false;
    this.board = new Board(this.size, this.mines);
  }

  startCountDown() {
    this.counter = 0;
    this.interval = setInterval(() => {
      if (this.counter === 0) {
        this.counter++;
      } else {
        this.counter++;
      }
      this.displayTime = this.transform(this.counter);
    }, 1000);
  }

  transform(value: number): string {
    var minutes: any = Math.floor(value / 60);
    var seconds: any = value - minutes * 60;
    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;
    return minutes + ':' + seconds;
  }

  openDialog(data: DialogData): void {
    this.dialog.open(DialogResultComponent, {
      width: '400px',
      height: '200px',
      data: { title: data.title, time: data.time, win: data.win },
    });
  }
}
