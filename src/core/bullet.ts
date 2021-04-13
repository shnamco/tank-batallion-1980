import { BULLET_SIZE, CANVAS_SIZE, Direction, GameObject } from './game_types';
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

  // Helper positions (Top/Bottom-Left/Right)
  public tlx!: number;
  public tly!: number;
  public trx!: number;
  public try!: number;
  public blx!: number;
  public bly!: number;
  public brx!: number;
  public bry!: number;

  // Debugging flip-switch,
  // adds outlines and pixel data
  public debug = false;

  constructor(private ctx: CanvasRenderingContext2D, private opts: Bulletable) {
    // Initial positions
    this._x = opts.x;
    this._y = opts.y;
    this.calculateCorners();

    // Default values
    this.dir = opts.dir ?? Direction.East;
    this.size = opts.size ?? BULLET_SIZE;
    this.hot = opts.hot ?? false;
    this.speed = opts.speed ?? 10;
    this.firedBy = opts.firedBy;
    this.fill = opts.fill ?? this.firedBy.fill ?? 'magenta';
  }

  get centerX(): number {
    return this.x + this.size / 2;
  }

  get centerY(): number {
    return this.y + this.size / 2;
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

  // dt is a delta taken from the main game loop
  public update(dt: number): void {
    this.calculateCorners();
    // Bullet flies to the right
    if (this.dir === Direction.East) {
      this.x += dt * this.speed;
      if (this.x > CANVAS_SIZE) this.hot = false;
    }
    // Bullet flies to the left
    if (this.dir === Direction.West) {
      this.x -= dt * this.speed;
      if (this.x < 0) this.hot = false;
    }
    // Bullet flies up
    if (this.dir === Direction.North) {
      this.y -= dt * this.speed;
      if (this.y < 0) this.hot = false;
    }
    // Bullet flies down
    if (this.dir === Direction.South) {
      this.y += dt * this.speed;
      if (this.y > CANVAS_SIZE) this.hot = false;
    }
    this.draw();
  }

  public draw = (): void => {
    drawObject(this.ctx, () => {
      this.ctx.fillStyle = this.fill;
      this.ctx.fillRect(this.x, this.y, this.size, this.size);

      this.handleDebug();
    });
  };

  private handleDebug = (): void => {
    if (this.debug) {
      this.ctx.font = '9px monospace';
      this.ctx.fillStyle = 'white';
      this.ctx.strokeStyle = 'white';
      this.ctx.strokeRect(this.x, this.y, this.size, this.size);

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
  };

  private calculateCorners = (): void => {
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
