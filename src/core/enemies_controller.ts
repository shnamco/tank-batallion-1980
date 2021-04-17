import { EnemyTank } from './enemy_tank';
import { enemyTankAsset } from './game_assets';
import { CANVAS_SIZE, Direction, GameState, MAX_ENEMIES, PLAYER_SIZE } from './game_types';
import { getRandomInt, randomFromArray } from './helpers';

export class EnemiesController {
  private static instance: EnemiesController | null;
  public enemyTanks: EnemyTank[] = [];
  public enemiesKilled = 0;

  // Singleton
  private constructor(private ctx: CanvasRenderingContext2D, public state: GameState) {}

  public deleteInstance(): void {
    EnemiesController.instance = null;
  }

  public static getInstance(ctx: CanvasRenderingContext2D, state: GameState): EnemiesController {
    if (!EnemiesController.instance) {
      EnemiesController.instance = new EnemiesController(ctx, state);
    }

    return EnemiesController.instance;
  }

  public update(): void {
    // Add enemy if there are none
    if (this.enemyTanks.length === 0) {
      this.addEnemy();
    }

    this.enemyTanks = this.enemyTanks.filter((t) => !t.killed);

    this.enemyTanks.forEach((t) => {
      t.act();
    });
  }

  public draw(): void {
    this.enemyTanks.forEach((t) => {
      t.draw();
    });
  }

  public addEnemy(): void {
    if (this.enemyTanks.length === this.state.enemiesLeft ?? 0) {
      console.log(`Max number of ${MAX_ENEMIES} killed, can't create more enemies`);
      return;
    }

    this.enemyTanks.push(
      new EnemyTank(
        this.ctx,
        this.state,
        {
          x: getRandomInt(2) === 0 ? 2 : CANVAS_SIZE - PLAYER_SIZE - 2,
          y: 1,
          dir: randomFromArray([Direction.South, Direction.East]) as Direction,
          size: 26,
          speed: 0.5
        },
        enemyTankAsset
      )
    );
  }
}
