 
import { Injectable } from '@angular/core';
import { Snake } from './snake.interface';
import { Ladder } from './ladder.interface';
@Injectable({
  providedIn: 'root',
})

export class GameService {
   heads: { x: number; y: number }[] = [];
   tails: { x: number; y: number }[] = [];
   tops: { x: number; y: number }[] = [];
  bottoms: { x: number; y: number }[] = [];

  generateSnakes(numSnakes: number): Snake[] {
    const snakes: Snake[] = [];

    for (let i = 0; i < numSnakes; i++) {
      const head: { x: number; y: number } = {
        x: Math.floor((Math.random() * 5)+5),
    y: Math.floor(Math.random() * 5),
      };
  const tail: { x: number; y: number } = {
    x: Math.floor(Math.random() * 5),
    y: Math.floor(Math.random() * 5),
   
  };

      this.heads.push(head);
      this.tails.push(tail);

      const snake: Snake = { head, tail };
      snakes.push(snake);
    }
  console.log("snakes:"+snakes);
    return snakes;
  }

  getHeads(): { x: number; y: number }[] {
    console.log("heads of snakes:"+this.heads);
    return this.heads;
  }

  getTails(): { x: number; y: number }[] {
    console.log("tails of snakes: "+this.tails);
    return this.tails;
  }

  

generateLadders(numLadders: number): Ladder[] {
  const ladders: Ladder[] = [];
  for (let i = 0; i < numLadders; i++) {
    const top: { x: number; y: number } = {
      x: Math.floor(Math.random() * 5),
      y: Math.floor((Math.random() * 5)+5),
    };
const bottom: { x: number; y: number } = {
  x: Math.floor((Math.random() * 5)+5),
  y: Math.floor((Math.random() * 5)+5),
};

    this.tops.push(top);
    this.bottoms.push(bottom);

    const ladder: Ladder = { top, bottom};

    ladders.push(ladder);
  }
  return ladders;
}



  getTops(): { x: number; y: number }[] {
    return this.tops;
  }

  getBottoms(): { x: number; y: number }[] {
    return this.bottoms;
  }



  findPath(boardSize: number, snake: Snake): number[][] {
    const path: number[][] = [];
    const headX = snake.head.x;
    const headY = snake.head.y;
    const tailX = snake.tail.x;
    const tailY = snake.tail.y;

    let currX = headX;
    let currY = headY;

    while (currX !== tailX || currY !== tailY) {
      path.push([currX, currY]);

      if (currX < tailX) {
        currX++;
      } else if (currX > tailX) {
        currX--;
      }
      if (currY < tailY) {
        currY++;
      } else if (currY > tailY) {
        currY--;
      }
    }

    path.push([currX, currY]);
    return path;
  }


  findLadderPath(boardSize: number, ladder: Ladder): number[][] {
    const path: number[][] = [];
    const topX = ladder.top.x;
    const topY = ladder.top.y;
    const bottomX = ladder.bottom.x;
    const bottomY = ladder.bottom.y;
  
    let currX = topX;
    let currY = topY;
  
    while (currX !== bottomX || currY !== bottomY) {
      path.push([currX, currY]);
  
      if (currX < bottomX) {
        currX++;
      } else if (currX > bottomX) {
        currX--;
      }
      if (currY < bottomY) {
        currY++;
      } else if (currY > bottomY) {
        currY--;
      }
    }
  
    path.push([currX, currY]);

    return path;
  }
  
}
