import { drawObject } from './helpers';
import { WALL_BASE64_SVG } from './wall_base64';

interface Wallable {
  x: number;
  y: number;
  width: number;
  height: number;
}

export class Wall implements Wallable {
  public static SIDE = 36;

  public x = 0;
  public y = 0;
  public width = Wall.SIDE;
  public height = Wall.SIDE;

  constructor(private ctx: CanvasRenderingContext2D, opts: Wallable) {
    this.x = opts.x;
    this.y = opts.y;
    this.width = opts.width;
    this.height = opts.height;
  }

  public draw = (): void => {
    drawObject(this.ctx, () => {
      const bricks = new Image();
      bricks.src = WALL_BASE64_SVG;
      const pattern = this.ctx.createPattern(bricks, 'repeat');
      this.ctx.fillStyle = pattern as CanvasPattern;
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
    });
  };
}
