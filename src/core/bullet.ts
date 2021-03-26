import { Direction, GameObject } from './game_types';
import { drawObject } from './helpers';

interface Bulletable extends GameObject {
  speed: number;
  hot: boolean;
  size: number;
  firedBy: GameObject;
}

export class Bullet implements Bulletable {
  // Realtime positions
  public _x: number;
  public _y: number;

  // Controllable from outside
  public dir: Direction;
  public size: number;
  public fill: string;
  public speed: number;
  public hot: boolean;
  public firedBy: GameObject;
  public collidedWithWall = false;

  // Helper positions (Top/Bottom-Left/Right)
  public tlx!: number;
  public tly!: number;
  public trx!: number;
  public try!: number;
  public blx!: number;
  public bly!: number;
  public brx!: number;
  public bry!: number;

  constructor(private ctx: CanvasRenderingContext2D, private opts: Bulletable) {
    // Initial positions
    this._x = opts.x;
    this._y = opts.y;
    this.calculateCorners();

    // Default values
    this.dir = opts.dir ?? Direction.East;
    this.size = opts.size ?? 6;
    this.hot = opts.hot ?? false;
    this.speed = opts.speed ?? 10;
    this.firedBy = opts.firedBy;
    this.fill = opts.fill ?? this.firedBy.fill ?? 'magenta';
  }

  get x(): number {
    return this._x;
  }

  set x(value: number) {
    this._x = value;
    this.tlx = value;
    this.trx = value + this.size;
    this.blx = value;
    this.brx = value + this.size;
  }

  get y(): number {
    return this._y;
  }

  set y(value: number) {
    this._y = value;
    this.tly = value;
    this.try = value;
    this.bly = value + this.size;
    this.bry = value + this.size;
  }

  public draw = (): void => {
    let [x, y] = [0, 0];
    if (!this.hot) return;

    drawObject(this.ctx, () => {
      this.calculateCorners();
      this.ctx.fillStyle = this.fill;
      const halfTank = this.firedBy.size / 2;
      const halfBullet = this.size / 2;

      if (this.dir === Direction.East) {
        x = this.x + this.firedBy.size;
        y = this.y + halfTank - halfBullet;
      } else if (this.dir === Direction.West) {
        x = this.x;
        y = this.y + halfTank - halfBullet;
      } else if (this.dir === Direction.North) {
        x = this.x + halfTank - halfBullet;
        y = this.y;
      } else if (this.dir === Direction.South) {
        x = this.x + halfTank - halfBullet;
        y = this.y + this.firedBy.size;
      }

      this.ctx.fillRect(x, y, this.size, this.size);
    });
  };

  // dt is a delta taken from the main game loop
  public update(dt: number): void {
    if (!this.collidedWithWall) {
      this.draw();
    }
    if (this.dir === Direction.East) {
      this.x += dt * this.speed;
    } else if (this.dir === Direction.West) {
      this.x -= dt * this.speed;
    } else if (this.dir === Direction.North) {
      this.y -= dt * this.speed;
    } else if (this.dir === Direction.South) {
      this.y += dt * this.speed;
    }
  }

  public collideWithWall(): void {
    this.collidedWithWall = true;
  }

  private calculateCorners = (): void => {
    // Calculate helpers
    // Walls are static so we don't need accessors.
    // But we need to keep them updated, so
    // we calculate on every draw.
    this.tlx = this.x;
    this.tly = this.y;
    this.trx = this.x + this.size;
    this.try = this.y;
    this.blx = this.x;
    this.bly = this.y + this.size;
    this.brx = this.x + this.size;
    this.bry = this.y + this.size;
  };
}
