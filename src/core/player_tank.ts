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
  private _x: number;
  private _y: number;

  // Helper positions (Top/Bottom-Left/Right)
  public tlx?: number;
  public tly?: number;
  public trx?: number;
  public try?: number;
  public blx?: number;
  public bly?: number;
  public brx?: number;
  public bry?: number;

  // Controllable from outside
  public dir: Direction;
  public speed: number;
  public size: number;
  public fill: string;
  public collidedWithWall = false;
  public pixelUnderGun = 0;
  public seesColor = false;

  // Debugging flip-switch,
  // adds outlines and pixel data
  public debug = false;

  constructor(private ctx: CanvasRenderingContext2D, private opts: GameObject) {
    // Initial positions
    this._x = opts.x;
    this._y = opts.y;
    this.dir = opts.dir ?? Direction.East;
    this.size = opts.size ?? playerTankAsset.size;
    this.fill = opts.fill ?? playerTankAsset.fill ?? 'magenta';
    this.speed = 1;
    this.calculateCorners();
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

      if (this.debug) {
        this.ctx.font = '9px monospace';
        this.ctx.fillStyle = 'magenta';
        this.ctx.strokeStyle = 'magenta';
        this.ctx.strokeRect(this.x, this.y, this.size, this.size);

        // Top left corner
        this.ctx.fillText(`x${this.tlx}`, this.x - 9, this.y - 6);
        this.ctx.fillText(`y${this.tly}`, this.x - 9, this.y);

        // Top right corner
        this.ctx.fillText(`x${this.x + this.size}`, this.x + this.size, this.y - 6);
        this.ctx.fillText(`y${this.y}`, this.x + this.size, this.y);

        // Bottom left corner
        this.ctx.fillText(`x${this.x}`, this.x - 9, this.y + this.size - 6);
        this.ctx.fillText(`y${this.y + this.size}`, this.x - 9, this.y + this.size);

        // Bottom right corner
        this.ctx.fillText(`x${this.x + this.size}`, this.x + this.size - 9, this.y + this.size - 6);
        this.ctx.fillText(`y${this.y + this.size}`, this.x + this.size - 9, this.y + this.size);
      }
    });
  }

  public erase = (): void => {
    this.ctx.clearRect(this.x, this.y, this.size, this.size);
  };

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
