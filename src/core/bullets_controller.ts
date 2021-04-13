import { Bullet } from './bullet';
import { GameObject } from './game_types';
import { LevelBuilder } from './level_builder';

export class BulletsController {
  private static instance: BulletsController;
  private bullets: Bullet[] = [];

  // Singleton
  private constructor(private ctx: CanvasRenderingContext2D, private level?: LevelBuilder) {}

  public static getInstance(ctx: CanvasRenderingContext2D, level?: LevelBuilder): BulletsController {
    if (!BulletsController.instance) {
      BulletsController.instance = new BulletsController(ctx, level);
    }

    return BulletsController.instance;
  }

  get all(): Bullet[] {
    return this.bullets;
  }

  public track(bullet: Bullet): void {
    this.bullets.push(bullet);
  }

  public canFire(go: GameObject): boolean {
    // Disallow firing >1 bullet at a time
    return !this.bullets.find((bullet) => bullet.firedBy === go);
  }

  public update(dt: number): void {
    // Remove collided bullets
    this.bullets = this.bullets.filter((bullet) => bullet.hot);
    // Update the rest
    this.bullets.forEach((bullet) => {
      bullet.update(dt);
      this.level?.walls.forEach((wall) => {
        if (wall.containsPoint(bullet.centerX, bullet.centerY)) {
          let bulletCrossedHitRegion = false;
          wall.hits.forEach((hit) => {
            if (hit.containsPoint(bullet.centerX, bullet.centerY)) {
              bulletCrossedHitRegion = true;
            }
          });
          if (bulletCrossedHitRegion) return;
          console.log(`[PATH-BASED] Hit wall at ${wall.x}, ${wall.y}`);
          wall.hit(bullet.centerX, bullet.centerY, bullet.dir);
          bullet.hot = false;
        }
      });
    });
  }
}
