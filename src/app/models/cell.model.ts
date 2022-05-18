export class Cell {
  status: 'open' | 'clear' | 'flag' = 'open';
  mine: boolean = false;
  proximityMines: number = 0;

  constructor(public row: number, public column: number) {}
}
