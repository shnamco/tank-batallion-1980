import { Bullet } from './bullet';
import { EnemiesController } from './enemies_controller';
import { ExplosionsController } from './explosions_controller';
import { GameObject } from './game_types';
import { LevelBuilder } from './level_builder';

export class BulletsController {
  private static instance: BulletsController;
  private bullets: Bullet[] = [];

  // Singleton
  private constructor(
    private ctx: CanvasRenderingContext2D,
    private level?: LevelBuilder,
    private enemies?: EnemiesController,
    private explosions?: ExplosionsController
  ) {}

  public static getInstance(
    ctx: CanvasRenderingContext2D,
    level?: LevelBuilder,
    enemies?: EnemiesController,
    explosions?: ExplosionsController
  ): BulletsController {
    if (!BulletsController.instance) {
      BulletsController.instance = new BulletsController(ctx, level, enemies, explosions);
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

      // Check collisions with enemies
      this.enemies?.enemyTanks.forEach((t) => {
        if (t.containsPoint(bullet.centerX, bullet.centerY)) {
          console.log(`[PATH-BASED ]tank at ${t.x}, ${t.y} hit by bullet at ${bullet.centerX}, ${bullet.centerY}`);
          // bots can't kill each other
          if (bullet.firedBy.constructor.name !== 'PlayerTank') return;
          t.killed = true;
          this.explosions?.bigExplosion(t.x, t.y);
          bullet.hot = false;
        }
      });

      // Check collision with walls
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

          const [hitX, hitY] = wall.hit(bullet.centerX, bullet.centerY, bullet.dir);
          this.explosions?.smallExplosion(hitX, hitY);
          bullet.hot = false;
        }
      });
    });
  }
}
