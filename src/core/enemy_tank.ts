import { Direction } from './game_types';

import { rotateClockwise, getRandomInt, rotateCounterClockwise, seesObjectInFront } from './helpers';
import { AbstractTank } from './abstract_tank';

export class EnemyTank extends AbstractTank {
  public act(): void {
    this.shouldStop = seesObjectInFront(this.ctx, this, this.dir);

    this.moveInRandomDirection();
    // Fire with a certain probability
    const rand = getRandomInt(200);
    if (rand === 1) {
      this.fire();
    }
  }

  // Make a turn to where available with some probability
  private canMakeTurn = (dir: Direction): Direction | null => {
    let availableDirs: Direction[] = [];

    switch (dir) {
      case Direction.North:
        availableDirs = [Direction.West, Direction.East];
        break;
      case Direction.East:
        availableDirs = [Direction.South];
        break;
      case Direction.South:
        availableDirs = [Direction.West, Direction.East];
        break;
      case Direction.West:
        availableDirs = [Direction.South];
        break;
    }

    let dirToGo = null;
    availableDirs.forEach((ad) => {
      if (!seesObjectInFront(this.ctx, this, ad, 10)) {
        if (getRandomInt(5) === 4) {
          dirToGo = ad;
        }
      }
    });
    return dirToGo;
  };

  private moveInRandomDirection(): void {
    const possibleDir = this.canMakeTurn(this.dir);
    if (possibleDir) {
      const rand = getRandomInt(5);
      if (rand === 4) {
        this.dir = possibleDir;
      }
    }
    switch (this.dir) {
      case Direction.East:
        this.moveRight();
        break;
      case Direction.West:
        this.moveLeft();
        break;
      case Direction.North:
        this.moveUp();
        break;
      case Direction.South:
        this.moveDown();
        break;
    }
    if (this.shouldStop) {
      // The more the range here, the likelier tank is going to "stop and think" instead of jitter around
      const randomInt = getRandomInt(50);
      switch (randomInt) {
        case 0:
          this.dir = rotateClockwise(this.dir);
          break;
        case 1:
          this.dir = rotateCounterClockwise(this.dir);
          break;
      }
    }
  }
}
