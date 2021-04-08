import { CANVAS_SIZE, Direction, GameObject, PLAYER_SIZE } from './game_types';
import { containsKnownColor, detectObjectByDominatingColor, drawObject } from './helpers';
import { LevelBuilder } from './level_builder';

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

  private RValuesForPixelsInFront = (dir: Direction): number[] => {
    let res: number[] = [];

    if (dir === Direction.East) {
      res = Array.from(this.ctx.getImageData(this.trx, this.try, 1, this.size).data);
    }

    if (dir === Direction.West) {
      res = Array.from(this.ctx.getImageData(this.tlx - 1, this.try, 1, this.size).data);
    }

    if (dir === Direction.South) {
      res = Array.from(this.ctx.getImageData(this.blx, this.bly, this.size, 1).data);
    }

    if (dir === Direction.North) {
      res = Array.from(this.ctx.getImageData(this.tlx, this.tly - 1, this.size, 1).data);
    }

    return res.filter((_, idx) => idx % 4 === 0);
  };

  private containsKnownColorForPixelsInFront = (dir: Direction): boolean => {
    return containsKnownColor(this.RValuesForPixelsInFront(dir));
  };

  private detectHitObject = (): string => {
    return detectObjectByDominatingColor(this.RValuesForPixelsInFront(this.dir));
  };

  // dt is a delta taken from the main game loop
  public update(dt: number, lb: LevelBuilder): void {
    this.calculateCorners();

    // Bullet flies to the right
    if (this.dir === Direction.East) {
      this.x += dt * this.speed;
      if (this.containsKnownColorForPixelsInFront(this.dir)) {
        console.log(this.RValuesForPixelsInFront(this.dir));
        if (this.detectHitObject() === 'Wall') {
          const hitX = Math.floor(this.trx);
          const hitY = Math.floor(this.try);
          console.log(`Bam! Hit a ${this.detectHitObject()} at ${hitX}, ${hitY}`);
          // A "wall" may actually be an overlap of two Wall objects, so we use an array
          const hitWalls = lb.findWalls(hitX, hitY);
          hitWalls.forEach((hitWall) => hitWall.hit(hitX, this.firedBy.try!, this.dir));
          hitWalls.forEach((hitWall) => console.log('Wall hit at: ', hitWall.x, hitWall.y));
        }
        this.hot = false;
      }
      if (this.x > CANVAS_SIZE) this.hot = false;
    }

    // Bullet flies to the left
    if (this.dir === Direction.West) {
      this.x -= dt * this.speed;
      if (this.containsKnownColorForPixelsInFront(this.dir)) {
        console.log(this.RValuesForPixelsInFront(this.dir));
        if (this.detectHitObject() === 'Wall') {
          const hitX = Math.floor(this.tlx);
          const hitY = Math.floor(this.bly);
          console.log(`Bam! Hit a ${this.detectHitObject()} at ${hitX}, ${hitY}`);
          // A "wall" may actually be an overlap of two Wall objects, so we use an array
          const hitWalls = lb.findWalls(hitX, hitY);
          hitWalls.forEach((hitWall) => hitWall.hit(hitX, this.firedBy.tly!, this.dir));
          hitWalls.forEach((hitWall) => console.log('Wall hit at: ', hitWall.x, hitWall.y));
        }
        this.hot = false;
      }
      if (this.x < 0) this.hot = false;
    }

    // Bullet flies up
    if (this.dir === Direction.North) {
      this.y -= dt * this.speed;
      if (this.containsKnownColorForPixelsInFront(this.dir)) {
        console.log(this.RValuesForPixelsInFront(this.dir));
        if (this.detectHitObject() === 'Wall') {
          const hitX = Math.floor(this.blx + PLAYER_SIZE / 2);
          const hitY = Math.ceil(this.tly);
          console.log(`Bam! Hit a ${this.detectHitObject()} at ${hitX}, ${hitY}`);
          // A "wall" may actually be an overlap of two Wall objects, so we use an array
          const hitWalls = lb.findWalls(hitX, hitY);
          hitWalls.forEach((hitWall) => hitWall.hit(this.firedBy.tlx!, hitY, this.dir));
          hitWalls.forEach((hitWall) => console.log('Wall hit at: ', hitWall.x, hitWall.y));
        }
        this.hot = false;
      }
      if (this.y < 0) this.hot = false;
    }

    // Bullet flies down
    if (this.dir === Direction.South) {
      this.y += dt * this.speed;
      if (this.containsKnownColorForPixelsInFront(this.dir)) {
        console.log(this.RValuesForPixelsInFront(this.dir));
        if (this.detectHitObject() === 'Wall') {
          const hitX = Math.floor(this.blx + PLAYER_SIZE / 2);
          const hitY = Math.floor(this.bly);
          console.log(`Bam! Hit a ${this.detectHitObject()} at ${hitX}, ${hitY}`);
          // A "wall" may actually be an overlap of two Wall objects, so we use an array
          const hitWalls = lb.findWalls(hitX, hitY);
          hitWalls.forEach((hitWall) => hitWall.hit(this.firedBy.blx!, hitY, this.dir));
          hitWalls.forEach((hitWall) => console.log('Wall hit at: ', hitWall.x, hitWall.y));
        }
        this.hot = false;
      }
      if (this.y > CANVAS_SIZE) this.hot = false;
    }

    this.draw();
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
