import { BULLET_SIZE, Direction, EMPTY_BLACK, PLAYER_SIZE } from './game_types';
import { drawObject } from './helpers';
import { WALL_BASE64_SVG } from './game_assets';

export interface Wallable {
  x: number;
  y: number;
  w: number;
  h: number;
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
  public debug = false;

  // Regions that were hit by bullets
  public hits: Set<Wall> = new Set();

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

  public containsPoint(x: number, y: number): boolean {
    this.ctx.translate(this.x, this.y);
    const outline = new Path2D();
    outline.rect(0, 0, this.w, this.h);
    const res = this.ctx.isPointInPath(outline, x, y);
    this.ctx.translate(-this.x, -this.y);
    return res;
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
      const bricks = new Image();
      bricks.src = WALL_BASE64_SVG;
      const pattern = this.ctx.createPattern(bricks, 'repeat');
      this.ctx.fillStyle = pattern as CanvasPattern;
      this.ctx.fillRect(this.x, this.y, this.w, this.h);

      this.ctx.fillStyle = EMPTY_BLACK;
      for (const hit of this.hits) {
        this.ctx.fillRect(hit.x, hit.y, hit.w, hit.h);
      }

      this.handleDebugMode();
    });
  };

  // This is fine-tuned manually with MAGIC NUMBERS
  // to have as little "wall shrapnel" as possible
  // Feel free to experiment manually to fine-tune
  public hit = (x: number, y: number, dir: Direction): [number, number] => {
    // margin
    const mg = 2;
    let hit: Wall | null = null;
    switch (dir) {
      case Direction.East:
        hit = new Wall(this.ctx, {
          x: x - BULLET_SIZE / 2 - mg,
          y: y - PLAYER_SIZE / 2 - mg,
          w: 24,
          h: 32
        });
        console.log(`Creating hit, x: ${hit.x}, y: ${hit.y}, w: ${hit.w}, h: ${hit.h}`);
        break;
      case Direction.West:
        hit = new Wall(this.ctx, {
          x: x - PLAYER_SIZE / 2 - BULLET_SIZE / 2 - mg,
          y: y - PLAYER_SIZE / 2 - mg,
          w: 24,
          h: 32
        });
        console.log(`Creating hit, x: ${hit.x}, y: ${hit.y}, w: ${hit.w}, h: ${hit.h}`);
        break;
      case Direction.South:
        hit = new Wall(this.ctx, {
          x: x - PLAYER_SIZE / 2,
          y: y - BULLET_SIZE / 2 + mg,
          w: 32,
          h: 16
        });
        console.log(`Creating hit, x: ${hit.x}, y: ${hit.y}, w: ${hit.w}, h: ${hit.h}`);
        break;
      case Direction.North:
        hit = new Wall(this.ctx, {
          x: x - PLAYER_SIZE / 2 - BULLET_SIZE / 2,
          y: y - BULLET_SIZE / 2 - 16 + 2 + mg,
          w: 32,
          h: 16
        });
        console.log(`Creating hit, x: ${hit.x}, y: ${hit.y}, w: ${hit.w}, h: ${hit.h}`);
        break;
    }
    this.hits.add(hit as Wall);
    return [hit.x, hit.y];
  };

  private handleDebugMode() {
    if (this.debug) {
      this.ctx.font = '9px monospace';
      this.ctx.fillStyle = 'white';
      this.ctx.strokeStyle = 'white';
      this.ctx.strokeRect(this.x, this.y, this.w, this.h);

      // Top left corner
      this.ctx.fillText(`x${Math.round(this.tlx)}`, this.tlx - 9, this.tly - 6);
      this.ctx.fillText(`y${Math.round(this.tly)}`, this.tlx - 9, this.tly);

      // Top right corner
      this.ctx.fillText(`x${Math.round(this.trx)}`, this.trx - 9, this.try - 6);
      this.ctx.fillText(`y${Math.round(this.try)}`, this.trx - 9, this.try);

      // Bottom left corner
      this.ctx.fillText(`x${Math.round(this.blx)}`, this.blx - 9, this.bly - 6);
      this.ctx.fillText(`y${Math.round(this.bly)}`, this.blx - 9, this.bly);

      // Bottom right corner
      this.ctx.fillText(`x${Math.round(this.brx)}`, this.brx - 9, this.bry - 6);
      this.ctx.fillText(`y${Math.round(this.bry)}`, this.brx - 9, this.bry);
    }
  }
}
