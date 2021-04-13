import { BulletsController } from './bullets_controller';
import { EnemyTank } from './enemy_tank';
import { CANVAS_SIZE, Direction, PLAYER_SIZE } from './game_types';
import { getRandomInt, randomFromArray } from './helpers';

export class EnemiesController {
  private static instance: EnemiesController;
  private enemyTanks: EnemyTank[] = [];

  // Singleton
  private constructor(private ctx: CanvasRenderingContext2D, private bullets?: BulletsController) {}

  public static getInstance(ctx: CanvasRenderingContext2D, bullets?: BulletsController): EnemiesController {
    if (!EnemiesController.instance) {
      EnemiesController.instance = new EnemiesController(ctx, bullets);
    }

    return EnemiesController.instance;
  }

  public update(): void {
    // Add enemy if there are none
    if (this.enemyTanks.length === 0) {
      this.addEnemy();
    }

    this.enemyTanks.forEach((t) => {
      t.act();
      this.bullets?.all.forEach((b) => {
        if (b.firedBy.constructor.name === 'PlayerTank' && t.containsPoint(b.x, b.y)) console.log('Enemy hit by player!');
      });
    });
  }

  public draw(): void {
    this.enemyTanks.forEach((t) => {
      t.draw();
    });
  }

  public processKilled(x: number, y: number): void {
    const margin = 10;
    this.enemyTanks = this.enemyTanks.filter((t) => {
      return !(x >= t.tlx - margin && x <= t.trx + margin && y >= t.tly - margin && y <= t.bly + margin);
    });
  }

  public addEnemy(): void {
    if (this.enemyTanks.length >= 20) return;
    this.enemyTanks.push(
      new EnemyTank(this.ctx, {
        x: getRandomInt(2) === 0 ? 2 : CANVAS_SIZE - PLAYER_SIZE - 2,
        y: 1,
        dir: randomFromArray([Direction.South, Direction.East]) as Direction,
        size: 26
      })
    );
  }
}
