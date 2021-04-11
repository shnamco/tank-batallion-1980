import { EnemyTank } from './enemy_tank';
import { Direction } from './game_types';
import { inclusiveBetween, randomFromArray } from './helpers';

export class EnemiesController {
  private static instance: EnemiesController;
  private enemyTanks: EnemyTank[] = [];

  // Singleton
  private constructor(private ctx: CanvasRenderingContext2D) {}

  public static getInstance(ctx: CanvasRenderingContext2D): EnemiesController {
    if (!EnemiesController.instance) {
      EnemiesController.instance = new EnemiesController(ctx);
    }

    return EnemiesController.instance;
  }

  public update(): void {
    // TODO: Change to not more than 20 tanks per level as seen in original rules
    // Add enemy if there are none
    if (this.enemyTanks.length === 0) {
      this.addEnemy();
    }

    this.enemyTanks.forEach((t) => {
      t.act();
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
      return !inclusiveBetween(x, t.tlx - margin, t.trx - margin) && !inclusiveBetween(y, t.tly - margin, t.bly - margin);
    });
  }

  public addEnemy(): void {
    this.enemyTanks.push(
      new EnemyTank(this.ctx, {
        x: 30,
        y: 0,
        dir: randomFromArray([Direction.South, Direction.East]) as Direction,
        size: 26
      })
    );
  }
}
