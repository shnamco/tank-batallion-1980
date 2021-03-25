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
  public x: number;
  public y: number;

  // Controllable from outside
  public dir: Direction;
  public size: number;
  public fill: string;
  public speed: number;
  public hot: boolean;
  public firedBy: GameObject;
  public collidedWithWall = false;

  constructor(private ctx: CanvasRenderingContext2D, private opts: Bulletable) {
    // Initial positions
    this.x = opts.x;
    this.y = opts.y;

    // Default values
    this.dir = opts.dir ?? Direction.East;
    this.size = opts.size ?? 6;
    this.hot = opts.hot ?? false;
    this.speed = opts.speed ?? 10;
    this.firedBy = opts.firedBy;
    this.fill = opts.fill ?? this.firedBy.fill ?? 'magenta';
  }

  public draw = (): void => {
    let [x, y] = [0, 0];
    if (!this.hot) return;

    drawObject(this.ctx, () => {
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
    if (this.dir === Direction.East) {
      this.x += dt * this.speed;
    } else if (this.dir === Direction.West) {
      this.x -= dt * this.speed;
    } else if (this.dir === Direction.North) {
      this.y -= dt * this.speed;
    } else if (this.dir === Direction.South) {
      this.y += dt * this.speed;
    }
    this.draw();
  }

  public collideWithWall(): void {
    this.collidedWithWall = true;
  }
}
