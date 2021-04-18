import { ALMOST_WHITE, AUX_CANVAS_HEIGHT, CANVAS_SIZE, EMPTY_BLACK, GameState, PLAYER_SIZE } from './game_types';

export default class ScorePanelController {
  private static instance: ScorePanelController | null;

  private constructor(private ctx: CanvasRenderingContext2D, private state: GameState) {}

  public static getInstance(ctx: CanvasRenderingContext2D, state: GameState): ScorePanelController {
    if (!ScorePanelController.instance) {
      ScorePanelController.instance = new ScorePanelController(ctx, state);
    }
    return ScorePanelController.instance;
  }

  public deleteInstance(): void {
    ScorePanelController.instance = null;
  }

  public update(): void {
    this.draw();
  }

  public draw(): void {
    // clear the animation frame
    this.ctx.filter = 'none';
    this.ctx.fillStyle = EMPTY_BLACK;
    this.ctx.fillRect(0, 0, CANVAS_SIZE, AUX_CANVAS_HEIGHT);
    this.ctx.fillStyle = ALMOST_WHITE;
    // TODO: Figure out how to remove antialiasing completely
    // https://medium.com/wdstack/fixing-html5-2d-canvas-blur-8ebe27db07da
    this.ctx.font = "16px 'Press Start 2P'";
    this.ctx.fillText('1UP', PLAYER_SIZE, 18);
    this.ctx.fillText((this.state.playerScore ?? 0).toString(), PLAYER_SIZE, 36);
    this.ctx.fillText('HIGH SCORE', 150, 18);
    this.ctx.fillText((this.state.playerScore ?? 0).toString(), 200, 36);
  }
}
