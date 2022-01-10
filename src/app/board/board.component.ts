import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.newGame();
  }

  rows: number = 16;

  boardCells: string[] = Array(this.rows*this.rows).fill('');

  bombs: number = 24;

  newGame() {
    this.placeBombs();
    this.fillSafePositions();
  }


  placeBombs(): void {
    for( let i = 0; i <= this.bombs; i++) {
      let cell = Math.floor(Math.random() * 16*16);
      this.boardCells[cell] = '💣';
    }
  }
  

  checkSurroundings(bombPosition: number): number[] {
    let safePositions: number[] = [];

    // Bomb is on Left border
    if (bombPosition%16 === 0) {

      this.boardCells[bombPosition+1] !== '💣' && safePositions.push(bombPosition+1);

      // Bomb is on Upper border
      if (bombPosition-16 < 0) {
        this.boardCells[bombPosition+16] !== '💣' && safePositions.push(bombPosition+16);
        this.boardCells[bombPosition+17] !== '💣' && safePositions.push(bombPosition+17);
      }

      // Bomb is on Lower border
      else if (bombPosition+16 > this.rows*this.rows) {
        this.boardCells[bombPosition-16] !== '💣' && safePositions.push(bombPosition-16);
        this.boardCells[bombPosition-15] !== '💣' && safePositions.push(bombPosition-15);
      }

      else {
        this.boardCells[bombPosition-16] !== '💣' && safePositions.push(bombPosition-16);
        this.boardCells[bombPosition-15] !== '💣' && safePositions.push(bombPosition-15);
        this.boardCells[bombPosition+16] !== '💣' && safePositions.push(bombPosition+16);
        this.boardCells[bombPosition+17] !== '💣' && safePositions.push(bombPosition+17);
      }
    }
    
    // Bomb is on Right border
    else if ((bombPosition-15)%16 === 0) {

      this.boardCells[bombPosition-1] !== '💣' && safePositions.push(bombPosition-1);

      // Bomb is on Upper border
      if (bombPosition-16 < 0) {
        this.boardCells[bombPosition+15] !== '💣' && safePositions.push(bombPosition+15);
        this.boardCells[bombPosition+16] !== '💣' && safePositions.push(bombPosition+16);
      }

      // Bomb is on Lower border
      else if (bombPosition+16 > this.rows*this.rows) {
        this.boardCells[bombPosition-17] !== '💣' && safePositions.push(bombPosition-17);
        this.boardCells[bombPosition-16] !== '💣' && safePositions.push(bombPosition-16);
      }

      else {
        this.boardCells[bombPosition-17] !== '💣' && safePositions.push(bombPosition-17);
        this.boardCells[bombPosition-16] !== '💣' && safePositions.push(bombPosition-16);
        this.boardCells[bombPosition+15] !== '💣' && safePositions.push(bombPosition+15);
        this.boardCells[bombPosition+16] !== '💣' && safePositions.push(bombPosition+16);
      }
    }

    else {
      this.boardCells[bombPosition-1] !== '💣' && safePositions.push(bombPosition-1);
      this.boardCells[bombPosition+1] !== '💣' && safePositions.push(bombPosition+1);

      // Bomb is on Upper border
      if (bombPosition-16 < 0) {
        this.boardCells[bombPosition+15] !== '💣' && safePositions.push(bombPosition+15);
        this.boardCells[bombPosition+16] !== '💣' && safePositions.push(bombPosition+16);
        this.boardCells[bombPosition+17] !== '💣' && safePositions.push(bombPosition+17);
      }

      // Bomb is on Lower border
      else if (bombPosition+16 > this.rows*this.rows) {
        this.boardCells[bombPosition-17] !== '💣' && safePositions.push(bombPosition-17);
        this.boardCells[bombPosition-16] !== '💣' && safePositions.push(bombPosition-16);
        this.boardCells[bombPosition-15] !== '💣' && safePositions.push(bombPosition-15);
      }

      else {
        this.boardCells[bombPosition-17] !== '💣' && safePositions.push(bombPosition-17);
        this.boardCells[bombPosition-16] !== '💣' && safePositions.push(bombPosition-16);
        this.boardCells[bombPosition-15] !== '💣' && safePositions.push(bombPosition-15);
        this.boardCells[bombPosition+15] !== '💣' && safePositions.push(bombPosition+15);
        this.boardCells[bombPosition+16] !== '💣' && safePositions.push(bombPosition+16);
        this.boardCells[bombPosition+17] !== '💣' && safePositions.push(bombPosition+17);
      }
    }

    return safePositions;
  }


  fillSafePositions(): void {
    let bombPositions: number[] = [];

    for (let [index, cell] of this.boardCells.entries()) {
      if (cell === '💣') {
        bombPositions.push(index);
      }
    }
    
    let safePositions: number[] = [];
    for (let bomb of bombPositions) {
      safePositions.push(...this.checkSurroundings(bomb));
    }
    safePositions.sort((a, b) => a-b);
    
    for (let sp of safePositions) {
      this.boardCells[sp] = String(Number(this.boardCells[sp])+1);
    }
    
    
  }

  getCellPosition(index: number): void {

  } 
}
