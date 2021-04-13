import { SMALL_EXPLOSION_BASE64 } from './small_explosion_base64';

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
      dx: x,
      dy: y,
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
  }
}
