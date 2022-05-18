import { GameResultEnum } from '../enums/game-result.enum';
import { Cell } from './cell.model';

export class Board {
  cells: Cell[][] = [];
  private remainingCells = 0;
  private mineCount = 0;

  constructor(size: number, mines: number) {
    for (let y = 0; y < size; y++) {
      this.cells[y] = [];
      for (let x = 0; x < size; x++) {
        // Se crean las celdas
        this.cells[y][x] = new Cell(y, x);
      }
    }

    // Asigna minas a celdas
    for (let i = 0; i < mines; i++) {
      this.getRandomCell().mine = true;
    }

    const peers = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        let adjacentMines: number = 0;
        peers.forEach((peer) => {
          if (
            this.cells[y + peer[0]] &&
            this.cells[y + peer[0]][x + peer[1]] &&
            this.cells[y + peer[0]][x + peer[1]].mine
          ) {
            adjacentMines += 1;
          }
        });
        this.cells[y][x].proximityMines = adjacentMines;
        if (this.cells[y][x].mine) {
          this.mineCount++;
        }
      }
    }

    this.remainingCells = size * size - this.mineCount;
  }

  // Devuelve una celda aleatoria
  getRandomCell(): Cell {
    const y = Math.floor(Math.random() * this.cells.length);
    const x = Math.floor(Math.random() * this.cells[y].length);
    return this.cells[y][x];
  }

  onClickCell(cell: Cell): GameResultEnum | void {
    if (cell.status !== 'open') {
      return;
    } else if (cell.mine) {
      return GameResultEnum.LOST_GAME;
    } else {
      cell.status = 'clear';
      this.remainingCells -= 1;
      if (this.remainingCells == 0) {
        return GameResultEnum.WON_GAME;
      }
      return;
    }
  }
}
