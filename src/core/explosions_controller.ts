import { BIG_EXPLOSION_BASE64, SMALL_EXPLOSION_BASE64 } from './game_assets';

const SMALL_EXPLOSION_TICKS_1 = 10;
const SMALL_EXPLOSION_TICKS_2 = 20;

const SMALL_EXPLOSION_1_SX = 30;
const SMALL_EXPLOSION_1_SY = 10;
const SMALL_EXPLOSION_1_WIDTH = 20;
const SMALL_EXPLOSION_1_HEIGHT = 26;

const SMALL_EXPLOSION_2_SX = 0;
const SMALL_EXPLOSION_2_SY = 0;
const SMALL_EXPLOSION_2_WIDTH = 30;
const SMALL_EXPLOSION_2_HEIGHT = 36;

const BIG_EXPLOSION_TICKS_1 = 10;
const BIG_EXPLOSION_TICKS_2 = 20;
const BIG_EXPLOSION_TICKS_3 = 30;
const BIG_EXPLOSION_TICKS_4 = 40;

const BIG_EXPLOSION_1_SX = 0;
const BIG_EXPLOSION_1_SY = 28;
const BIG_EXPLOSION_1_WIDTH = 32;
const BIG_EXPLOSION_1_HEIGHT = 32;

const BIG_EXPLOSION_2_SX = 32;
const BIG_EXPLOSION_2_SY = 0;
const BIG_EXPLOSION_2_WIDTH = 54;
const BIG_EXPLOSION_2_HEIGHT = 60;

const BIG_EXPLOSION_3_SX = 86;
const BIG_EXPLOSION_3_SY = 0;
const BIG_EXPLOSION_3_WIDTH = 54;
const BIG_EXPLOSION_3_HEIGHT = 60;

interface CanvasImageDrawable {
  sx: number;
  sy: number;
  sw: number;
  sh: number;
  dx: number;
  dy: number;
  dw: number;
  dh: number;
  duration: number;
}

interface CanvasImageAnimatable {
  image: HTMLImageElement;
  frames: CanvasImageDrawable[];
  createdAt: number;
  ticks: number;
}

export class ExplosionsController {
  private static instance: ExplosionsController;
  private wallExplosions: CanvasImageAnimatable[] = [];
  private tankExplosions: CanvasImageAnimatable[] = [];

  // Singleton
  private constructor(private ctx: CanvasRenderingContext2D) {}

  public static getInstance(ctx: CanvasRenderingContext2D): ExplosionsController {
    if (!ExplosionsController.instance) {
      ExplosionsController.instance = new ExplosionsController(ctx);
    }

    return ExplosionsController.instance;
  }

  public smallExplosion(x: number, y: number): void {
    const smallExplosion = new Image();
    smallExplosion.src = SMALL_EXPLOSION_BASE64;

    const smallExplosionFrame1 = {
      sx: SMALL_EXPLOSION_1_SX,
      sy: SMALL_EXPLOSION_1_SY,
      sw: SMALL_EXPLOSION_1_WIDTH,
      sh: SMALL_EXPLOSION_1_HEIGHT,
      dx: x + 5,
      dy: y + 5,
      dw: SMALL_EXPLOSION_1_WIDTH,
      dh: SMALL_EXPLOSION_1_HEIGHT,
      duration: SMALL_EXPLOSION_TICKS_1
    };

    const smallExplosionFrame2 = {
      sx: SMALL_EXPLOSION_2_SX,
      sy: SMALL_EXPLOSION_2_SY,
      sw: SMALL_EXPLOSION_2_WIDTH,
      sh: SMALL_EXPLOSION_2_HEIGHT,
      dx: x,
      dy: y,
      dw: SMALL_EXPLOSION_2_WIDTH,
      dh: SMALL_EXPLOSION_2_HEIGHT,
      duration: SMALL_EXPLOSION_TICKS_2
    };

    const smallExplosionAnimation = {
      image: smallExplosion,
      frames: [smallExplosionFrame1, smallExplosionFrame2],
      createdAt: performance.now(),
      ticks: 0
    };

    this.wallExplosions.push(smallExplosionAnimation);
  }

  public bigExplosion(x: number, y: number): void {
    const bigExplosion = new Image();
    bigExplosion.src = BIG_EXPLOSION_BASE64;

    const bigExplosionFrame1 = {
      sx: BIG_EXPLOSION_1_SX,
      sy: BIG_EXPLOSION_1_SY,
      sw: BIG_EXPLOSION_1_WIDTH,
      sh: BIG_EXPLOSION_1_HEIGHT,
      dx: x,
      dy: y,
      dw: BIG_EXPLOSION_1_WIDTH,
      dh: BIG_EXPLOSION_1_HEIGHT,
      duration: BIG_EXPLOSION_TICKS_1
    };

    const bigExplosionFrame2 = {
      sx: BIG_EXPLOSION_2_SX,
      sy: BIG_EXPLOSION_2_SY,
      sw: BIG_EXPLOSION_2_WIDTH,
      sh: BIG_EXPLOSION_2_HEIGHT,
      dx: x,
      dy: y,
      dw: BIG_EXPLOSION_2_WIDTH,
      dh: BIG_EXPLOSION_2_HEIGHT,
      duration: BIG_EXPLOSION_TICKS_2
    };

    const bigExplosionFrame3 = {
      sx: BIG_EXPLOSION_3_SX,
      sy: BIG_EXPLOSION_3_SY,
      sw: BIG_EXPLOSION_3_WIDTH,
      sh: BIG_EXPLOSION_3_HEIGHT,
      dx: x,
      dy: y,
      dw: BIG_EXPLOSION_3_WIDTH,
      dh: BIG_EXPLOSION_3_HEIGHT,
      duration: BIG_EXPLOSION_TICKS_3
    };

    const bigExplosionFrame4 = {
      sx: BIG_EXPLOSION_2_SX,
      sy: BIG_EXPLOSION_2_SY,
      sw: BIG_EXPLOSION_2_WIDTH,
      sh: BIG_EXPLOSION_2_HEIGHT,
      dx: x,
      dy: y,
      dw: BIG_EXPLOSION_2_WIDTH,
      dh: BIG_EXPLOSION_2_HEIGHT,
      duration: BIG_EXPLOSION_TICKS_4
    };

    const bigExplosionAnimation = {
      image: bigExplosion,
      frames: [bigExplosionFrame1, bigExplosionFrame2, bigExplosionFrame3, bigExplosionFrame4],
      createdAt: performance.now(),
      ticks: 0
    };

    this.tankExplosions.push(bigExplosionAnimation);
  }

  public update(): void {
    this.wallExplosions.forEach((we) => {
      if (we.ticks < SMALL_EXPLOSION_TICKS_1) {
        const f = we.frames[0];
        this.ctx.drawImage(we.image, f.sx, f.sy, f.sw, f.sh, f.dx, f.dy, f.dw, f.dh);
      }

      if (we.ticks > SMALL_EXPLOSION_TICKS_1 && we.ticks < SMALL_EXPLOSION_TICKS_2) {
        const f = we.frames[1];
        this.ctx.drawImage(we.image, f.sx, f.sy, f.sw, f.sh, f.dx, f.dy, f.dw, f.dh);
      }
      we.ticks++;
    });
    // clear explosions older than 10 seconds
    this.wallExplosions.filter((we) => we.createdAt < performance.now() - 10000);

    this.tankExplosions.forEach((we) => {
      if (we.ticks < BIG_EXPLOSION_TICKS_1) {
        const f = we.frames[0];
        this.ctx.drawImage(we.image, f.sx, f.sy, f.sw, f.sh, f.dx, f.dy, f.dw, f.dh);
      }

      if (we.ticks > BIG_EXPLOSION_TICKS_1 && we.ticks < BIG_EXPLOSION_TICKS_2) {
        const f = we.frames[1];
        this.ctx.drawImage(we.image, f.sx, f.sy, f.sw, f.sh, f.dx, f.dy, f.dw, f.dh);
      }

      if (we.ticks > BIG_EXPLOSION_TICKS_2 && we.ticks < BIG_EXPLOSION_TICKS_3) {
        const f = we.frames[2];
        this.ctx.drawImage(we.image, f.sx, f.sy, f.sw, f.sh, f.dx, f.dy, f.dw, f.dh);
      }

      if (we.ticks > BIG_EXPLOSION_TICKS_3 && we.ticks < BIG_EXPLOSION_TICKS_4) {
        const f = we.frames[3];
        this.ctx.drawImage(we.image, f.sx, f.sy, f.sw, f.sh, f.dx, f.dy, f.dw, f.dh);
      }
      we.ticks++;
    });

    this.tankExplosions.filter((we) => we.createdAt < performance.now() - 10000);
  }
}
