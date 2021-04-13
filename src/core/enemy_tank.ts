import { Bullet } from './bullet';
import { BulletsController } from './bullets_controller';

import { BULLET_SIZE, CANVAS_SIZE, Direction, GameAsset, GameObject } from './game_types';

import { drawObject, rotateClockwise, getRandomInt, rotateCounterClockwise, seesObjectInFront } from './helpers';
const enemyTankAsset: GameAsset = {
  // SVG  path:
  path:
    'M0 26V20H8V18H6V16H4V14H2V12H4V10H6V8H8V6H0V0H20V6H16V8H18V12H22V10H26V16H22V14H18V18H16V20H20V26H0ZM14.0003 18.0001V16.0001H16.0003V10.0001H14.0003V8.00007H10.0003V10.0001H8.00027V12.0001H6.00027V14.0001H8.00027V16.0001H10.0003V18.0001H14.0003Z',
  fill: '#55BEBF',
  size: 26
};

export class EnemyTank implements GameObject {
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

  constructor(private ctx: CanvasRenderingContext2D, private opts: GameObject) {
    // Initial positions
    this._x = opts.x;
    this._y = opts.y;
    this.dir = opts.dir ?? Direction.East;
    this.size = opts.size ?? enemyTankAsset.size;
    this.fill = opts.fill ?? enemyTankAsset.fill ?? 'magenta';
    this.speed = 0.5;
    this.calculateCorners();
  }

  public containsPoint(x: number, y: number): boolean {
    this.ctx.translate(this.x, this.y);
    const outline = new Path2D();
    outline.rect(0, 0, this.size, this.size);
    const res = this.ctx.isPointInPath(outline, x, y);
    this.ctx.translate(-this.x, -this.y);
    return res;
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

  public act(): void {
    this.shouldStop = seesObjectInFront(this.ctx, this, this.dir);
    this.moveInRandomDirection();
    // Fire with a certain probability
    const rand = getRandomInt(200);
    if (rand === 1) {
      this.fire();
    }
  }

  public fire(): void {
    let x = this.x;
    let y = this.y;

    const halfTank = this.size / 2;
    const halfBullet = BULLET_SIZE / 2;

    // Position the bullet at the tip of the tank's gun
    if (this.dir === Direction.East) {
      x = this.x + this.size;
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
      speed: 70,
      firedBy: this,
      fill: '#55BEBF'
    });
    const bc = BulletsController.getInstance(this.ctx);
    if (bc.canFire(this)) bc.track(bullet);
  }

  public draw(): void {
    const svgPath = new Path2D(enemyTankAsset.path);
    drawObject(this.ctx, () => {
      const half = this.size / 2;
      this.ctx.translate(this.x + half, this.y + half);
      this.ctx.rotate((this.dir * Math.PI) / 180);
      this.ctx.translate(-half, -half);
      // TODO: Refactor into constants;
      this.ctx.fillStyle = '#030000';
      this.ctx.fillRect(0, 0, this.size, this.size);
      this.ctx.globalCompositeOperation = 'source-atop';
      this.ctx.fillStyle = this.fill;
      this.ctx.fill(svgPath);
      this.ctx.resetTransform();

      this.handleDebugMode();
    });
  }

  public moveRight = (): void => {
    if (this.x < CANVAS_SIZE - this.size && !this.shouldStop) this.x += this.speed;
  };

  public moveLeft = (): void => {
    if (this.x > 0 && !this.shouldStop) this.x -= this.speed;
  };

  public moveDown = (): void => {
    if (this.y < CANVAS_SIZE - this.size && !this.shouldStop) this.y += this.speed;
  };

  public moveUp = (): void => {
    if (this.y > 0 && !this.shouldStop) this.y -= this.speed;
  };

  // Make a turn to where available with some probability
  private canMakeTurn = (dir: Direction): Direction | null => {
    let availableDirs: Direction[] = [];

    switch (dir) {
      case Direction.North:
        availableDirs = [Direction.West, Direction.East];
        break;
      case Direction.East:
        availableDirs = [Direction.South];
        break;
      case Direction.South:
        availableDirs = [Direction.West, Direction.East];
        break;
      case Direction.West:
        availableDirs = [Direction.South];
        break;
    }

    let dirToGo = null;
    availableDirs.forEach((ad) => {
      if (!seesObjectInFront(this.ctx, this, ad, 10)) {
        if (getRandomInt(5) === 4) {
          dirToGo = ad;
        }
      }
    });
    return dirToGo;
  };

  private moveInRandomDirection(): void {
    const possibleDir = this.canMakeTurn(this.dir);
    if (possibleDir) {
      const rand = getRandomInt(5);
      if (rand === 4) {
        this.dir = possibleDir;
      }
    }
    switch (this.dir) {
      case Direction.East:
        this.moveRight();
        break;
      case Direction.West:
        this.moveLeft();
        break;
      case Direction.North:
        this.moveUp();
        break;
      case Direction.South:
        this.moveDown();
        break;
    }
    if (this.shouldStop) {
      // The more the range here, the likelier tank is going to "stop and think" instead of jitter around
      const randomInt = getRandomInt(50);
      switch (randomInt) {
        case 0:
          this.dir = rotateClockwise(this.dir);
          break;
        case 1:
          this.dir = rotateCounterClockwise(this.dir);
          break;
      }
    }
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
