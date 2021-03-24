import { drawObject } from './helpers';
import { WALL_BASE64_SVG } from './wall_base64';

interface Wallable {
  x: number;
  y: number;
  w: number;
  h: number;
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
}
