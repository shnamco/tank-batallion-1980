import { Direction, GameObject } from './game_types';
import { Colors, drawObject } from './helpers';

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
  public collidedWithWall = false;

  // Helper positions (Top/Bottom-Left/Right)
  public tlx!: number;
  public tly!: number;
  public trx!: number;
  public try!: number;
  public blx!: number;
  public bly!: number;
  public brx!: number;
  public bry!: number;

  public pixelColorUnder?: number;

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
    this.size = opts.size ?? 6;
    this.hot = opts.hot ?? false;
    this.speed = opts.speed ?? 10;
    this.firedBy = opts.firedBy;
    this.fill = opts.fill ?? this.firedBy.fill ?? 'magenta';
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

  private containsKnownColor = (arr: number[]): boolean => {
    return arr.some((pix) => {
      return Object.values(Colors).some((num) => {
        return pix === num;
      });
    });
  };

  // TODO: hit detection stripes and hit squares are off, figure out magic numbers and unify

  private RValuesForPixelsInFront = (dir: Direction): number[] => {
    let res: number[] = [];

    if (dir === Direction.East) {
      res = Array.from(this.ctx.getImageData(this.trx + 1, this.try - 10, 1, this.size + 10).data);
    }

    if (dir === Direction.West) {
      res = Array.from(this.ctx.getImageData(this.tlx - 1, this.try - 10, 1, this.size + 10).data);
    }

    if (dir === Direction.South) {
      res = Array.from(this.ctx.getImageData(this.blx, this.bly + 1, this.size, 1).data);
    }

    if (dir === Direction.North) {
      res = Array.from(this.ctx.getImageData(this.tlx, this.tly - 1, this.size, 1).data);
    }

    return res.filter((_, idx) => idx % 4 === 0);
  };

  private containsKnownColorForPixelsInFront = (dir: Direction): boolean => {
    return this.containsKnownColor(this.RValuesForPixelsInFront(dir));
  };

  // dt is a delta taken from the main game loop
  public update(dt: number): [number, number] {
    if (!this.hot) return [-1, -1];
    this.calculateCorners();
    let hitX = -1;
    let hitY = -1;

    // Bullet flies to the right
    if (this.dir === Direction.East) {
      this.x += dt * this.speed;
      if (this.containsKnownColorForPixelsInFront(this.dir)) {
        console.log(`Bam! at ${this.trx}, ${this.try}`);
        this.hot = false;
        hitX = this.trx - dt * this.speed - this.size; // TODO: const for magic number
        hitY = this.try - 20; // TODO: const for magic number
      }
    }

    // Bullet flies to the left
    if (this.dir === Direction.West) {
      this.x -= dt * this.speed;
      if (this.containsKnownColorForPixelsInFront(this.dir)) {
        console.log(`Bam! at ${this.tlx}, ${this.tly}`);
        this.hot = false;
        hitX = this.tlx - dt * this.speed - this.size * 2;
        hitY = this.tly - 20;
      }
    }

    // Bullet flies up
    if (this.dir === Direction.North) {
      this.y -= dt * this.speed;
      if (this.containsKnownColorForPixelsInFront(this.dir)) {
        console.log(`Bam!`);
        this.hot = false;
        hitX = this.tlx - 10;
        hitY = this.tly - dt * this.speed - this.size * 2;
      }
    }

    // Bullet flies down
    if (this.dir === Direction.South) {
      this.y += dt * this.speed;
      if (this.containsKnownColorForPixelsInFront(this.dir)) {
        console.log(`Bam!`);
        this.hot = false;
        hitX = this.tlx - 10;
        hitY = this.tly + dt * this.speed - this.size;
      }
    }
    this.draw();
    return [hitX, hitY];
  }

  public draw = (): void => {
    drawObject(this.ctx, () => {
      this.ctx.fillStyle = this.fill;
      this.ctx.fillRect(this.x, this.y, this.size, this.size);

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
    });
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
}
