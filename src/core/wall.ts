/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Bullet } from './bullet';
import { Direction, GameObject } from './game_types';
import { drawObject, between } from './helpers';
import { WALL_BASE64_SVG } from './wall_base64';

export interface Wallable {
  x: number;
  y: number;
  w: number;
  h: number;
  checkCollisions: ((gameObjects: GameObject[]) => void) | (() => never);
  empty?: boolean;
}

export class Wall implements Wallable {
  public static SIDE = 36;

  public x = 0;
  public y = 0;
  public w = Wall.SIDE;
  public h = Wall.SIDE;

  // Helper positions (Top/Bottom-Left/Right)
  public tlx = 0;
  public tly = 0;
  public trx = 0;
  public try = 0;
  public blx = 0;
  public bly = 0;
  public brx = 0;
  public bry = 0;

  // Debugging flip-switch,
  // adds outlines and pixel data
  public debug = true;

  // Regions that were hit by bullets
  public hits: Wall[] = [];

  // If true, wall will appear as a black square (for hits)
  public empty;

  constructor(private ctx: CanvasRenderingContext2D, opts: Wallable) {
    this.x = opts.x;
    this.y = opts.y;
    this.w = opts.w;
    this.h = opts.h;
    this.calculateCorners();
    this.empty = opts.empty ?? false;
  }

  private calculateCorners = (): void => {
    // Calculate helpers
    // Walls are static so we don't need accessors.
    // But we need to keep them updated, so
    // we calculate on every draw.
    this.tlx = this.x;
    this.tly = this.y;
    this.trx = this.x + this.w;
    this.try = this.y;
    this.blx = this.x;
    this.bly = this.y + this.h;
    this.brx = this.x + this.w;
    this.bry = this.y + this.h;
  };

  public draw = (): void => {
    this.calculateCorners();

    drawObject(this.ctx, () => {
      if (!this.empty) {
        const bricks = new Image();
        bricks.src = WALL_BASE64_SVG;
        const pattern = this.ctx.createPattern(bricks, 'repeat');
        this.ctx.fillStyle = pattern as CanvasPattern;
      }

      if (this.empty) {
        this.ctx.fillStyle = 'black';
      }

      this.ctx.fillRect(this.x, this.y, this.w, this.h);

      if (this.debug) {
        this.ctx.font = '9px monospace';
        this.ctx.fillStyle = 'white';
        this.ctx.strokeStyle = 'white';
        this.ctx.strokeRect(this.x, this.y, this.w, this.h);

        // Top left corner
        this.ctx.fillText(`x${this.tlx}`, this.tlx - 9, this.tly - 6);
        this.ctx.fillText(`y${this.tly}`, this.tlx - 9, this.tly);

        // Top right corner
        this.ctx.fillText(`x${this.trx}`, this.trx - 9, this.try - 6);
        this.ctx.fillText(`y${this.try}`, this.trx - 9, this.try);

        // Bottom left corner
        this.ctx.fillText(`x${this.blx}`, this.blx - 9, this.bly - 6);
        this.ctx.fillText(`y${this.bly}`, this.blx - 9, this.bly);

        // Bottom right corner
        this.ctx.fillText(`x${this.brx}`, this.brx - 9, this.bry - 6);
        this.ctx.fillText(`y${this.bry}`, this.brx - 9, this.bry);
      }
    });
  };

  // Walls are responsible for checking collisions with bullets and tanks
  public checkCollisions = (gameObjects: GameObject[]): void => {
    gameObjects.forEach((go) => {
      let collided = false;
      if (go.dir === Direction.East) {
        collided =
          go.trx! >= this.x && !(go.trx! >= this.brx) && (between(go.try!, this.tly, this.bly) || between(go.bry!, this.tly, this.bly));
        if (collided) {
          console.log(`${go.constructor.name} collided with wall at ${this.x},${this.y} heading East!`);
          if (go.collideWithWall) go.collideWithWall();
        }
      }
      if (go.dir === Direction.West) {
        collided =
          go.tlx! <= this.trx && !(go.tlx! <= this.tlx) && (between(go.tly!, this.try, this.bry) || between(go.bly!, this.try, this.bry));
        if (collided) {
          console.log(`${go.constructor.name} collided with wall at ${this.x},${this.y} heading West!`);
          if (go.collideWithWall) go.collideWithWall();
        }
      }

      if (go.dir === Direction.South) {
        collided =
          go.bly! >= this.y && !(go.bly! >= this.bly) && (between(go.blx!, this.tlx, this.trx) || between(go.brx!, this.tlx, this.trx));

        if (collided) {
          console.log(`${go.constructor.name} collided with ${this.empty ? 'EMPTY' : 'BRICK'} wall at ${this.x},${this.y} heading South!`);
          if (go.collideWithWall) go.collideWithWall();
        }

        // Destroy the segment of the wall on bullet collision
        if (collided && go.constructor.name === 'Bullet') {
          console.log(`Bam! (${go.constructor.name} x: ${go.blx!} y: ${go.bly!})`);
          const bullet = go as Bullet;
          const hitRegion: Wallable = {
            x: bullet.firedBy.blx!,
            y: bullet.bly!,
            w: 36,
            h: 20,
            checkCollisions: () => null,
            empty: true
          };
          this.hits.push(new Wall(this.ctx, { ...hitRegion }));
        }
      }

      if (go.dir === Direction.North) {
        collided =
          go.tly! <= this.bly && !(go.tly! <= this.tly) && (between(go.trx!, this.blx, this.brx) || between(go.tlx!, this.blx, this.brx));
        if (collided) {
          console.log(`${go.constructor.name} collided with wall at ${this.x},${this.y} heading North!`);
          if (go.collideWithWall) go.collideWithWall();
        }
      }
    });
  };
}
