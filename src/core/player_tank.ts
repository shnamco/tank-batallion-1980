import { Direction, GameAsset, GameObject } from './game_types';
import { drawObject } from './helpers';

const playerTankAsset: GameAsset = {
  // SVG  path:
  path: 'M16 6L16 0L0 0V6H4V8H2L2 18H4V20H0V26H16L16 20H12V18H14V16H16L16 14L22 14V16H26V10H22V12L16 12V10H14V8L12 8V6L16 6Z',
  // Default fill
  fill: '#FFFD54',
  size: 26
};

export class PlayerTank implements GameObject {
  // Realtime positions
  public x: number;
  public y: number;

  // Controllable from outside
  public dir: Direction;
  public size: number;
  public fill: string;
  public collidedWithWall = false;

  constructor(private ctx: CanvasRenderingContext2D, private opts: GameObject) {
    // Initial positions
    this.x = opts.x;
    this.y = opts.y;
    this.dir = opts.dir ?? Direction.East;
    this.size = opts.size ?? playerTankAsset.size;
    this.fill = opts.fill ?? playerTankAsset.fill ?? 'magenta';
  }

  public draw(): void {
    const svgPath = new Path2D(playerTankAsset.path);
    drawObject(this.ctx, () => {
      const half = this.size / 2;
      this.ctx.fillStyle = this.fill;
      this.ctx.translate(this.x + half, this.y + half);
      this.ctx.rotate((this.dir * Math.PI) / 180);
      this.ctx.translate(-half, -half);
      this.ctx.fill(svgPath);
      this.ctx.resetTransform();
    });
  }

  public collideWithWall(): void {
    this.collidedWithWall = true;
  }
}
