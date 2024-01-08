import { Component, OnInit } from '@angular/core';
import { Snake } from '../snake.interface';
import { GameService } from '../game.service';
import { Ladder } from '../ladder.interface';
@Component({
  selector: 'app-boardone',
  templateUrl: './boardone.component.html',
  styleUrl: './boardone.component.scss'
})
export class BoardoneComponent implements OnInit {
  matrix: number[][];
  paths: number[][][] = []; 
  ladderPaths: number[][][] = [];
  ladders!: Ladder[];
  snakes!: Snake[]; 
  heads: { x: number; y: number }[] = [];
  tails: { x: number; y: number }[] = [];
  tops: { x: number; y: number }[] = [];
  diceValue: number = 0;
  bottoms: { x: number; y: number }[] = [];

  playerPosition = 1;
  noOfPlayer = 1;
  players = ['Player1'];
  playerPos = [1];
  currentPlayer = 0;
  rollValue: number = 0;

  isExists(cell: number) {
    const index = this.playerPos.indexOf(cell);
    if (index != -1) {
      return this.players[index];
    }
    return '';
  }
 
movePlayer() {
const currentPlayerHead = this.heads.find(head => {
  const v = this.playerPos[this.currentPlayer];
  const row = Math.floor((v - 1) / 10);
  const isEvenRow = row % 2 === 0;
  const col = isEvenRow ? (v - 1) % 10 : 9 - (v - 1) % 10;
  return head.x === row && head.y === col;
});


const currentPlayerBottom = this.bottoms.find(bottom => {
  const v = this.playerPos[this.currentPlayer];
  const row = Math.floor((v - 1) / 10);
  const isEvenRow = row % 2 === 0;
  const col = isEvenRow ? (v - 1) % 10 : 9 - (v - 1) % 10;
  return bottom.x === row && bottom.y === col;
});

if (currentPlayerHead) {
  console.log("Snake found");
  console.log("Head coordinates: " + currentPlayerHead.x + "," + currentPlayerHead.y);
  const index = this.heads.findIndex(head => head.x === currentPlayerHead.x && head.y === currentPlayerHead.y);
  const currentTail = this.tails[index];
  console.log('Tail coordinates:', currentTail);
  const tailX = currentTail.x;
  const tailY = currentTail.y;

  // Adjusted the formula for zigzag matrix
  const tailPosition = tailX * 10 + (tailX % 2 === 0 ? tailY : 9 - tailY) + 1;

  console.log("Tail position:", tailPosition);

  this.playerPos[this.currentPlayer] = tailPosition;
  if(this.playerPos[this.currentPlayer] >= 100){
    alert(this.currentPlayer + ' won');
  }
  this.currentPlayer = (this.currentPlayer + 1) % this.noOfPlayer;
}

  else if (currentPlayerBottom) {
    console.log("Ladder found");
  console.log("Top coordinates: " + currentPlayerBottom.x + "," + currentPlayerBottom.y);
  const index = this.bottoms.findIndex(bottom => bottom.x === currentPlayerBottom.x && bottom.y === currentPlayerBottom.y);
  const currentTop = this.tops[index];
  console.log('Tail coordinates:', currentTop);
  const topX = currentTop.x;
  const topY = currentTop.y;

  // Adjusted the formula for zigzag matrix
  const topPosition = topX * 10 + (topX % 2 === 0 ? topY : 9 - topY) + 1;

  console.log("Top position:", topPosition);

  this.playerPos[this.currentPlayer] = topPosition;
  if(this.playerPos[this.currentPlayer] >= 100){
    alert(this.currentPlayer + ' won');
  }
  this.currentPlayer = (this.currentPlayer + 1) % this.noOfPlayer;
} else {
  if(this.playerPos[this.currentPlayer] >= 100){
    alert(this.currentPlayer + ' won');
  }
}

}
  
  
  getPlayerIcon(player: string): string {
    return `assets/${player.toLowerCase()}.jpg`;
  }
  

  constructor(private gameService: GameService) {
    this.matrix = this.initializeMatrix();
    console.log(this.matrix);
  }

  ngOnInit() {
    // Generate an array of snakes using the GameService
    this.snakes = this.gameService.generateSnakes(3);
    this.heads = this.gameService.getHeads();
    this.tails = this.gameService.getTails();
    this.paths = this.snakes.map(snake => this.gameService.findPath(10, snake));
    this.ladders = this.gameService.generateLadders(2);
    this.ladderPaths = this.ladders.map(ladder => this.gameService.findLadderPath(10, ladder));
    this.tops = this.gameService.getTops();
    this.bottoms = this.gameService.getBottoms();

    console.log('Heads:', this.heads);
    console.log('Tails:', this.tails);

    // Print paths for each snake
   this.snakes.forEach((snake, index) => {
      const path = this.gameService.findPath(10, snake); // Assuming boardSize is 10 for testing
      console.log(`Path for Snake ${index + 1}:`, path);
    });

    // Print tops and bottoms of ladders
    // const tops = this.gameService.getTops();
    // const bottoms = this.gameService.getBottoms();
    console.log('Tops of Ladders:', this.tops);
    console.log('Bottoms of Ladders:',this.bottoms);

    // Print ladder paths
    this.ladders.forEach((ladder, index) => {
      const ladderPath = this.gameService.findLadderPath(10, ladder); // Assuming boardSize is 10 for testing
      console.log(`Path for Ladder ${index + 1}:`, ladderPath);
    });


 }

  returnIndex(row: number, col: number) {
    // console.log(this.matrix[row][col], row, col);
    return this.matrix[row][col];
  }

  getRow(row: number[]) {
    // console.log(this.matrix.indexOf(row));
    return this.matrix.indexOf(row);
  }

  cellClicked(row: number, col: number) {
    // Handle the click event for a specific cell
    console.log(`Cell clicked: Row ${row}, Column ${col}, Value: ${this.matrix[row][col]}`);
  }

  private initializeMatrix(): number[][] {
    const matrix: number[][] = [];
  
    for (let i = 0; i < 10; i++) {
      const rowValues: number[] = [];
  
      for (let j = 0; j < 10; j++) {
        const index = i * 10 + j + 1;
  
        if (i % 2 === 1) {
          // Odd row
          const reversedIndex = (i + 1) * 10 - j;
          rowValues.push(reversedIndex);
        } else {
          // Even row
          rowValues.push(index);
        }
      }
  
      matrix.push(rowValues);
    }
  
    return matrix;
  }
  


  // Helper method to check if a cell is on any of the paths
  isPath(row: number, col: number): boolean {
    return this.paths.some(path =>
      path.some(([pathRow, pathCol]) => row === pathRow && col === pathCol)
    );
  }

  isHead(row: number, col: number): boolean {
    return this.heads.some(head => head.x === row && head.y === col);
  }

  isTail(row: number, col: number): boolean {
    return this.tails.some(tail => tail.x === row && tail.y === col);
  }

  isLadderPath(row: number, col: number): boolean {
    return this.ladderPaths.some(path =>
      path.some(([pathRow, pathCol]) => row === pathRow && col === pathCol)
    );
  }

  isLadderStart(row: number, col: number): boolean {
    return this.tops.some(top => top.x === row && top.y === col);
  }

  isLadderEnd(row: number, col: number): boolean {
    return this.bottoms.some(bottom => bottom.x === row && bottom.y === col);
  }




  rollDice(): void {
    // Generate a random number between 1 and 6
    this.diceValue = Math.floor(Math.random() * 6) + 1;
    this.rollValue = this.diceValue;
    

    this.playerPos[this.currentPlayer] += this.diceValue; //
    this.playerPosition = this.playerPos[this.currentPlayer];
    // console.log(this.matrix[row][col]);
 
    console.log("moving....."+this.playerPosition+" by ..."+this.currentPlayer);
    this.currentPlayer = (this.currentPlayer + 1) % this.noOfPlayer;
    this.movePlayer();
  }


}