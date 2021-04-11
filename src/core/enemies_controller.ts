import { EnemyTank } from './enemy_tank';
import { CANVAS_SIZE, Direction, PLAYER_SIZE } from './game_types';
import { getRandomInt, randomFromArray } from './helpers';

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
      // TODO: Fix bug with several tanks in a row disappearing
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
