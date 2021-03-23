import { Direction, GameAsset, GameObject } from './game_types';
import { drawObject } from './helpers';

const playerTankAsset: GameAsset = {
  // SVG  path:
  path:
    'M-1.90735e-06 6.46154V0H17.2308V6.46154H12.9231V8.61539H15.0769V10.7692H17.2308V12.9231H23.6923V10.7692H28V17.2308H23.6923V15.0769H17.2308V17.2308H15.0769V19.3846H12.9231V21.5385H17.2308V28H-1.90735e-06V21.5385H4.30769V19.3846H2.15384V8.61539H4.30769V6.46154H-1.90735e-06Z',
  // Default fill
  fill: '#FFFD54',
  size: 28
};

export class PlayerTank implements GameObject {
  // Realtime positions
  public x: number;
  public y: number;

  // Controllable from outside
  public dir: Direction;
  public size: number;
  public fill: string;

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
      this.ctx.translate(-this.x, -this.y);
    });
  }
}
