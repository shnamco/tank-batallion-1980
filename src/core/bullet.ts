import { EnemiesController } from './enemies_controller';
import { ExplosionsController } from './explosions_controller';
import { BULLET_SIZE, CANVAS_SIZE, Direction, GameObject, PLAYER_SIZE } from './game_types';
import { containsKnownColor, drawObject, objectsByColor } from './helpers';
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

  private RValuesForPixelsInFront = (dir: Direction, howFar = 2): number[] => {
    let res: number[] = [];

    if (dir === Direction.East) {
      res = Array.from(this.ctx.getImageData(this.trx + howFar, this.try, 1, this.size).data);
    }

    if (dir === Direction.West) {
      res = Array.from(this.ctx.getImageData(this.tlx - howFar, this.try, 1, this.size).data);
    }

    if (dir === Direction.South) {
      res = Array.from(this.ctx.getImageData(this.blx, this.bly + howFar, this.size, 1).data);
    }

    if (dir === Direction.North) {
      res = Array.from(this.ctx.getImageData(this.tlx, this.tly - howFar, this.size, 1).data);
    }

    return res.filter((_, idx) => idx % 4 === 0);
  };

  private containsKnownColorForPixelsInFront = (dir: Direction, howFar = 2): boolean => {
    return containsKnownColor(this.RValuesForPixelsInFront(dir, howFar));
  };

  private didHitWall = (): boolean => {
    const rVals = this.RValuesForPixelsInFront(this.dir);
    return objectsByColor(rVals).includes('Wall') || objectsByColor(rVals).includes('WallBlack');
  };

  private didHitEnemy = (): boolean => {
    const rVals = this.RValuesForPixelsInFront(this.dir);
    return objectsByColor(rVals).includes('EnemyTank') || objectsByColor(rVals).includes('EnemyBlack');
  };

  // dt is a delta taken from the main game loop
  public update(dt: number, lb: LevelBuilder): void {
    this.calculateCorners();

    // Bullet flies to the right
    if (this.dir === Direction.East) {
      this.x += dt * this.speed;
      this.processHits(
        lb,
        -this.size,
        Math.floor(this.trx - this.size),
        Math.floor(this.try),
        undefined,
        Math.floor(this.try - PLAYER_SIZE / 2)
      );
      if (this.x > CANVAS_SIZE) this.hot = false;
    }

    // Bullet flies to the left
    if (this.dir === Direction.West) {
      this.x -= dt * this.speed;
      this.processHits(
        lb,
        2,
        Math.floor(this.tlx),
        Math.floor(this.tly),
        Math.floor(this.tlx - PLAYER_SIZE / 2 - BULLET_SIZE / 2),
        Math.floor(this.try) - PLAYER_SIZE / 2
      );
      if (this.x < 0) this.hot = false;
    }

    // Bullet flies up
    if (this.dir === Direction.North) {
      this.y -= dt * this.speed;
      this.processHits(lb, 2, Math.floor(this.blx - PLAYER_SIZE / 2), Math.floor(this.tly), undefined, Math.floor(this.tly - 16));
      if (this.y < 0) this.hot = false;
    }

    // Bullet flies down
    if (this.dir === Direction.South) {
      this.processHits(
        lb,
        2,
        Math.floor(this.blx + PLAYER_SIZE / 2),
        Math.floor(this.bly),
        Math.floor(this.blx - PLAYER_SIZE / 2),
        Math.floor(this.bly + 2)
      );
      this.y += dt * this.speed;
      if (this.y > CANVAS_SIZE) this.hot = false;
    }

    this.draw();
  }

  private processHits = (
    lb: LevelBuilder,
    lookAheadAdjustment: number,
    hitX: number,
    hitY: number,
    hitAreaX: number = hitX,
    hitAreaY: number = hitY
  ): void => {
    if (this.containsKnownColorForPixelsInFront(this.dir, lookAheadAdjustment)) {
      console.log(this.RValuesForPixelsInFront(this.dir));
      if (this.didHitWall()) {
        console.log(`Bam! Hit a ${objectsByColor(this.RValuesForPixelsInFront(this.dir))} at ${hitX}, ${hitY}`);
        // A "wall" may actually be an overlap of two Wall objects, so we use an array
        const hitWalls = lb.findWalls(hitX, hitY);
        hitWalls.forEach((hitWall) => hitWall.hit(hitAreaX, hitAreaY, this.dir));
        hitWalls.forEach((hitWall) => console.log('Wall hit at: ', hitWall.x, hitWall.y));
      }
      if (this.didHitEnemy()) {
        console.log(`Bam! Killed enemy tank at ${hitX}, ${hitY}`);
        // TODO: Change to explodeTank logic when ready
        ExplosionsController.getInstance(this.ctx).explodeWall(hitX, hitY);
        EnemiesController.getInstance(this.ctx).processKilled(hitX, hitY);
      }
      this.hot = false;
    }
  };

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
