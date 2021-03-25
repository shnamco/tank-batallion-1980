import { Direction, GameObject } from './game_types';
import { drawObject, between } from './helpers';
import { WALL_BASE64_SVG } from './wall_base64';

export interface Wallable {
  x: number;
  y: number;
  w: number;
  h: number;
  checkCollisions: ((gameObjects: GameObject[]) => void) | (() => never);
}

export class Wall implements Wallable {
  public static SIDE = 36;

  public x = 0;
  public y = 0;
  public w = Wall.SIDE;
  public h = Wall.SIDE;

  constructor(private ctx: CanvasRenderingContext2D, opts: Wallable) {
    this.x = opts.x;
    this.y = opts.y;
    this.w = opts.w;
    this.h = opts.h;
  }

  public draw = (): void => {
    drawObject(this.ctx, () => {
      const bricks = new Image();
      bricks.src = WALL_BASE64_SVG;
      const pattern = this.ctx.createPattern(bricks, 'repeat');
      this.ctx.fillStyle = pattern as CanvasPattern;
      this.ctx.fillRect(this.x, this.y, this.w, this.h);
    });
  };

  // Walls are responsible for checking collisions with and bullets tanks
  public checkCollisions = (gameObjects: GameObject[]): void => {
    gameObjects.forEach((go) => {
      let collided = false;
      // margin of error delta
      const d = 0;
      if (go.dir === Direction.South) {
        collided =
          (between(go.y + go.size, this.y - d, this.y + d) && between(go.x / 2, this.x - d, this.x + this.w + d)) ||
          (between(go.y + go.size, this.y - d, this.y + d) && between(go.x + go.size / 2, this.x - d, this.x + this.w + d));
        if (collided) {
          console.log(`collided with ${go.constructor.name} heading South!`);
          if (go.collideWithWall) go.collideWithWall();
        }
      }
      if (go.dir === Direction.North) {
        collided =
          (between(go.y, this.y + this.h - d, this.y + this.h + d) && between(go.x / 2, this.x - d, this.x + this.w + d)) ||
          (between(go.y, this.y + this.h - d, this.y + this.h + d) && between(go.x + go.size / 2, this.x - d, this.x + this.w + d));
        if (collided) {
          console.log(`collided with ${go.constructor.name} heading North!`);
          if (go.collideWithWall) go.collideWithWall();
        }
      }
      if (go.dir === Direction.West) {
        collided =
          (between((go.x + go.size - go.x) / 2, this.x + this.w - d, this.x + this.w + d) &&
            between(go.y / 2, this.y - d, this.y + this.h + d)) ||
          (between(go.x, this.x + this.w - d, this.x + this.w + d) && between(go.y + go.size / 2, this.y - d, this.y + this.h + d));
        if (collided) {
          console.log(`collided with ${go.constructor.name} heading West!`);
          if (go.collideWithWall) go.collideWithWall();
        }
      }
      if (go.dir === Direction.East) {
        collided =
          (between(go.x + go.size / 2, this.x - d, this.x + d) && between(go.y / 2, this.y - d, this.y + d)) ||
          (between(go.x + go.size / 2, this.x - d, this.x + d) && between(go.y + go.size / 2, this.y + this.h - d, this.y + this.h + d));
        if (collided) {
          console.log(`collided with ${go.constructor.name} heading East!`);
          if (go.collideWithWall) go.collideWithWall();
        }
      }
    });
  };
}
