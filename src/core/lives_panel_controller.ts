import { playerLifeAsset, tankKillAsset } from './game_assets';
import { CANVAS_SIZE, EMPTY_BLACK, GameState, AUX_CANVAS_HEIGHT, PLAYER_SIZE } from './game_types';

export default class LivesPanelController {
  private static instance: LivesPanelController | null;

  private constructor(private ctx: CanvasRenderingContext2D, private state: GameState) {}

  public static getInstance(ctx: CanvasRenderingContext2D, state: GameState): LivesPanelController {
    if (!LivesPanelController.instance) {
      LivesPanelController.instance = new LivesPanelController(ctx, state);
    }
    return LivesPanelController.instance;
  }

  public deleteInstance(): void {
    LivesPanelController.instance = null;
  }

  public update(): void {
    this.draw();
  }

  public draw(): void {
    // clear the animation frame
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.filter = 'none';
    this.ctx.fillStyle = EMPTY_BLACK;
    this.ctx.fillRect(0, 0, CANVAS_SIZE, AUX_CANVAS_HEIGHT);
    this.drawKills();
    this.drawLives();
  }

  private drawKills(): void {
    const enemiesLeft = this.state.enemiesLeft;
    if (!enemiesLeft) return;
    const killPath = new Path2D(tankKillAsset.path);
    const my = 5;
    const mx = 2;
    this.ctx.fillStyle = tankKillAsset.fill as string;
    let displayed = 0;
    for (let i = 0; i <= Math.min(enemiesLeft / 2, 10); i++) {
      this.ctx.translate(CANVAS_SIZE - tankKillAsset.size * i - i * mx, my);
      this.ctx.fill(killPath, 'evenodd');
      this.ctx.resetTransform();
      displayed++;
    }
    for (let i = 0; i <= Math.min(enemiesLeft - displayed + 1, 10); i++) {
      this.ctx.translate(CANVAS_SIZE - tankKillAsset.size * i - i * mx, tankKillAsset.size + mx + my);
      this.ctx.fill(killPath, 'evenodd');
      this.ctx.resetTransform();
    }
  }

  private drawLives(): void {
    if (!this.state.playerLives) return;
    const lifePath = new Path2D(playerLifeAsset.path);
    const mg = 5;
    this.ctx.fillStyle = playerLifeAsset.fill as string;
    for (let i = 0; i < this.state.playerLives; i++) {
      this.ctx.translate(i * PLAYER_SIZE + i * mg, mg);
      this.ctx.fill(lifePath);
      this.ctx.resetTransform();
    }
  }
}
