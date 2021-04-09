import { CANVAS_SIZE, Direction, GameAsset, GameObject } from './game_types';
import {
  drawObject,
  containsKnownColor,
  randomFromArray,
  rotateClockwise,
  DIRECTIONS,
  getRandomInt,
  rotateCounterClockwise,
  rotateOpposite
} from './helpers';

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
  public tlx!: number;
  public tly!: number;
  public trx!: number;
  public try!: number;
  public blx!: number;
  public bly!: number;
  public brx!: number;
  public bry!: number;

  // Controllable from outside
  public dir: Direction;
  public speed: number;
  public size: number;
  public fill: string;
  public seesColor = false;

  // Debugging flip-switch,
  // adds outlines and pixel data
  public debug = false;

  // "AI"
  private currentDirection!: Direction;

  constructor(private ctx: CanvasRenderingContext2D, private opts: GameObject) {
    // Initial positions
    this._x = opts.x;
    this._y = opts.y;
    this.dir = opts.dir ?? Direction.East;
    this.size = opts.size ?? enemyTankAsset.size;
    this.fill = opts.fill ?? enemyTankAsset.fill ?? 'magenta';
    this.speed = 0.6;
    this.calculateCorners();
    this.currentDirection = randomFromArray(DIRECTIONS) as Direction;
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
    this.moveInRandomDirection();
  }

  private moveInRandomDirection(): void {
    switch (this.currentDirection) {
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

    if (this.seesColor) {
      const randomInt = getRandomInt(4);
      switch (randomInt) {
        case 1:
          this.currentDirection = rotateClockwise(this.currentDirection);
          break;
        case 2:
          this.currentDirection = rotateCounterClockwise(this.currentDirection);
          break;
        case 3:
          this.currentDirection = rotateOpposite(this.currentDirection);
          break;
      }
    }
  }

  public draw(): void {
    const svgPath = new Path2D(enemyTankAsset.path);
    drawObject(this.ctx, () => {
      const half = this.size / 2;
      this.ctx.fillStyle = this.fill;
      this.ctx.translate(this.x + half, this.y + half);
      this.ctx.rotate((this.dir * Math.PI) / 180);
      this.ctx.translate(-half, -half);
      this.ctx.fill(svgPath);
      this.ctx.resetTransform();

      this.handleDebugMode();
    });
  }

  private RValuesForPixelsInFront = (dir: Direction): number[] => {
    let res: number[] = [];

    if (dir === Direction.East) {
      res = Array.from(this.ctx.getImageData(this.trx + 1, this.try, 1, this.size).data);
    }

    if (dir === Direction.West) {
      res = Array.from(this.ctx.getImageData(this.tlx - 1, this.try, 1, this.size).data);
    }

    if (dir === Direction.South) {
      res = Array.from(this.ctx.getImageData(this.blx, this.bly + 1, this.size, 1).data);
    }

    if (dir === Direction.North) {
      res = Array.from(this.ctx.getImageData(this.tlx, this.tly - 1, this.size, 1).data);
    }

    return res.filter((_, idx) => idx % 4 === 0);
  };

  containsKnownColorForPixelsInFront = (dir: Direction): boolean => {
    return containsKnownColor(this.RValuesForPixelsInFront(dir));
  };

  public moveRight = (): void => {
    this.dir = Direction.East;
    this.seesColor = this.containsKnownColorForPixelsInFront(this.dir);
    if (this.x < CANVAS_SIZE - this.size && !this.seesColor) this.x += this.speed;
  };

  public moveLeft = (): void => {
    this.dir = Direction.West;
    this.seesColor = this.containsKnownColorForPixelsInFront(this.dir);
    if (this.x > 0 && !this.seesColor) this.x -= this.speed;
  };

  public moveDown = (): void => {
    this.dir = Direction.South;
    this.seesColor = this.containsKnownColorForPixelsInFront(this.dir);
    if (this.y < CANVAS_SIZE - this.size && !this.seesColor) this.y += this.speed;
  };

  public moveUp = (): void => {
    this.dir = Direction.North;
    this.seesColor = this.containsKnownColorForPixelsInFront(this.dir);
    if (this.y > 0 && !this.seesColor) this.y -= this.speed;
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
