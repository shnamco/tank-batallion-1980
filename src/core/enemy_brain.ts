import { EnemyTank } from './enemy_tank';
import { Direction } from './game_types';
import { randomFromArray } from './helpers';

export class EnemyBrain {
  private static instance: EnemyBrain;
  private enemyTanks: EnemyTank[] = [];

  // Singleton
  private constructor(private ctx: CanvasRenderingContext2D) {}

  public static getInstance(ctx: CanvasRenderingContext2D): EnemyBrain {
    if (!EnemyBrain.instance) {
      EnemyBrain.instance = new EnemyBrain(ctx);
    }

    return EnemyBrain.instance;
  }

  public update(): void {
    this.enemyTanks.forEach((t) => {
      t.draw();
      t.act();
    });
  }

  public addEnemy(): void {
    this.enemyTanks.push(
      new EnemyTank(this.ctx, {
        x: 0,
        y: 0,
        dir: randomFromArray([Direction.South, Direction.East]) as Direction,
        size: 26
      })
    );
  }
}
