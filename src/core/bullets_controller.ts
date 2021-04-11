import { Bullet } from './bullet';
import { GameObject } from './game_types';
import { LevelBuilder } from './level_builder';

export class BulletsController {
  private static instance: BulletsController;
  private bullets: Bullet[] = [];

  // Singleton
  private constructor(private ctx: CanvasRenderingContext2D) {}

  public static getInstance(ctx: CanvasRenderingContext2D): BulletsController {
    if (!BulletsController.instance) {
      BulletsController.instance = new BulletsController(ctx);
    }

    return BulletsController.instance;
  }

  public track(bullet: Bullet): void {
    this.bullets.push(bullet);
  }

  public canFire(go: GameObject): boolean {
    // Disallow firing >1 bullet at a time
    return !this.bullets.find((bullet) => bullet.firedBy === go);
  }

  public update(dt: number, lb: LevelBuilder): void {
    // Remove collided bullets
    this.bullets = this.bullets.filter((bullet) => bullet.hot);
    // Update the rest
    this.bullets.forEach((bullet) => {
      bullet.update(dt, lb);
    });
  }
}
