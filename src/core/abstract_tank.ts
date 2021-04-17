import { Bullet } from './bullet';
import { BulletsController } from './bullets_controller';
import { BULLET_SIZE, CANVAS_SIZE, Direction, GameObject, GameState, TANK_BLACK } from './game_types';
import { drawObject } from './helpers';
import { GameAsset } from './game_assets';

export abstract class AbstractTank implements GameObject {
  // Realtime positions
  private _x: number;
  private _y: number;

  // Helper positions (Top/Bottom-Left/Right)
  // Init with empty values and call
  // this.calculateCorners() in constructor
  public tlx = 0;
  public tly = 0;
  public trx = 0;
  public try = 0;
  public blx = 0;
  public bly = 0;
  public brx = 0;
  public bry = 0;

  // Controllable from outside
  public dir: Direction;
  public speed: number;
  public size: number;
  public fill: string;
  public shouldStop = false;

  // Debugging flip-switch,
  // adds outlines and pixel data
  public debug = false;

  public killed = false;

  constructor(protected ctx: CanvasRenderingContext2D, public state: GameState, protected opts: GameObject, private asset: GameAsset) {
    // Initial positions
    this._x = opts.x;
    this._y = opts.y;
    this.dir = opts.dir ?? Direction.East;
    this.size = opts.size ?? asset.size;
    this.fill = opts.fill ?? asset.fill ?? 'magenta';
    this.speed = opts.speed ?? 1;
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
    // debug
    // console.log(this.RValuesForPixelsInFront(this.dir));
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
    // debug
    // console.log(this.RValuesForPixelsInFront(this.dir));
  }

  public kill(): void {
    this.killed = true;
  }

  public fire(): void {
    let x = this.x;
    let y = this.y;

    const halfTank = this.size / 2;
    const halfBullet = BULLET_SIZE / 2;

    // Position the bullet behind the tip of the tank's gun
    if (this.dir === Direction.East) {
      x = this.x + this.size - BULLET_SIZE;
      y = this.y + halfTank - halfBullet;
    } else if (this.dir === Direction.West) {
      x = this.x;
      y = this.y + halfTank - halfBullet;
    } else if (this.dir === Direction.North) {
      x = this.x + halfTank - halfBullet;
      y = this.tly;
    } else if (this.dir === Direction.South) {
      x = this.x + halfTank - halfBullet;
      y = this.bly - BULLET_SIZE;
    }
    const bullet = new Bullet(this.ctx, {
      hot: true,
      x,
      y,
      dir: this.dir,
      size: 6,
      speed: 100,
      firedBy: this,
      fill: '#55BEBF'
    });
    const bc = BulletsController.getInstance(this.ctx, this.state);
    if (bc.canFire(this)) bc.track(bullet);
  }

  public containsPoint(x: number, y: number): boolean {
    this.ctx.translate(this.x, this.y);
    const outline = new Path2D();
    outline.rect(0, 0, this.size, this.size);
    const res = this.ctx.isPointInPath(outline, x, y);
    this.ctx.translate(-this.x, -this.y);
    return res;
  }

  public draw(): void {
    const svgPath = new Path2D(this.asset.path);
    drawObject(this.ctx, () => {
      const half = this.size / 2;
      this.ctx.translate(this.x + half, this.y + half);
      this.ctx.rotate((this.dir * Math.PI) / 180);
      this.ctx.translate(-half, -half);
      this.ctx.fillStyle = TANK_BLACK;
      this.ctx.fillRect(0, 0, this.size, this.size);
      this.ctx.globalCompositeOperation = 'source-atop';
      this.ctx.fillStyle = this.fill;
      this.ctx.fill(svgPath);
      this.ctx.resetTransform();

      this.handleDebugMode();
    });
  }

  public moveRight = (): void => {
    this.dir = Direction.East;
    if (this.x < CANVAS_SIZE - this.size && !this.shouldStop) this.x += this.speed;
  };

  public moveLeft = (): void => {
    this.dir = Direction.West;
    if (this.x > 0 && !this.shouldStop) this.x -= this.speed;
  };

  public moveDown = (): void => {
    this.dir = Direction.South;
    if (this.y < CANVAS_SIZE - this.size && !this.shouldStop) this.y += this.speed;
  };

  public moveUp = (): void => {
    this.dir = Direction.North;
    if (this.y > 0 && !this.shouldStop) this.y -= this.speed;
  };

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

  private handleDebugMode() {
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
  }
}
