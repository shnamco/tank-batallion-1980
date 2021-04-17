import { Direction, EMPTY_BLACK, GameState } from './game_types';
import { PlayerTank } from './player_tank';
import { LevelBuilder } from './level_builder';
import { ExplosionsController } from './explosions_controller';
import { EnemiesController } from './enemies_controller';
import { BulletsController } from './bullets_controller';
import { seesObjectInFront } from './helpers';
import { playerTankAsset } from './game_assets';
import LivesPanelController from './lives_panel_controller';
import ScorePanelController from './score_panel_controller';

export class TankBatallion {
  private lastTime!: number;
  private gameTimeInSeconds!: number;

  // main toggle
  private gameOn = true;
  // keep reference to gameClock to clearInterval
  private secondsClock!: NodeJS.Timeout | null;

  // Keypress states
  private leftPressed!: boolean;
  private rightPressed!: boolean;
  private upPressed!: boolean;
  private downPressed!: boolean;

  // Canvas
  private canvas: HTMLCanvasElement;
  private lowerCanvas: HTMLCanvasElement;
  private upperCanvas: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private lowerCtx!: CanvasRenderingContext2D;
  private upperCtx!: CanvasRenderingContext2D;

  // Controllers for in-game objects
  private player!: PlayerTank;
  private bullets!: BulletsController;
  private exploder!: ExplosionsController;
  private enemies!: EnemiesController;
  private livesPanel!: LivesPanelController;
  private scorePanel!: ScorePanelController;
  private levelBuilder!: LevelBuilder;

  // Number of the level, game has 22 levels, but only 8 unique maps
  private levelNo: number;

  constructor(canvas: HTMLCanvasElement, lowerCanvas: HTMLCanvasElement, upperCanvas: HTMLCanvasElement, public gameState: GameState) {
    if (!canvas) {
      throw new Error('Game must be initialized with a main canvas element');
    }
    if (!lowerCanvas) {
      throw new Error('Game must be initialized with a lower canvas element');
    }
    if (!upperCanvas) {
      throw new Error('Game must be initialized with an upper canvas element');
    }
    this.gameState = { ...gameState };
    this.levelNo = this.gameState.levelNo;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.lowerCanvas = lowerCanvas;
    this.lowerCtx = lowerCanvas.getContext('2d') as CanvasRenderingContext2D;
    this.upperCanvas = upperCanvas;
    this.upperCtx = upperCanvas.getContext('2d') as CanvasRenderingContext2D;
    this.initGameObjects();
  }

  private initGameObjects = () => {
    this.player = new PlayerTank(
      this.ctx,
      this.gameState,
      {
        x: 150,
        y: 340,
        dir: Direction.North,
        size: 26,
        speed: 0.8,
        name: 'Player'
      },
      playerTankAsset
    );

    this.levelBuilder = LevelBuilder.getInstance(this.ctx, this.levelNo);
    this.exploder = ExplosionsController.getInstance(this.ctx);
    this.enemies = EnemiesController.getInstance(this.ctx, this.gameState);
    this.bullets = BulletsController.getInstance(this.ctx, this.gameState, this.levelBuilder, this.enemies, this.exploder);
    this.livesPanel = LivesPanelController.getInstance(this.lowerCtx, this.gameState);
    this.scorePanel = ScorePanelController.getInstance(this.upperCtx, this.gameState);
  };

  private updatePlayer = () => {
    this.player.shouldStop = seesObjectInFront(this.ctx, this.player, this.player.dir);
    if (this.leftPressed) this.player.moveLeft();
    if (this.rightPressed) this.player.moveRight();
    if (this.upPressed) this.player.moveUp();
    if (this.downPressed) this.player.moveDown();
  };

  // Happens on every "tick"
  private updateWorld = (dt: number) => {
    // clear the animation frame and disable smoothing
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.filter = 'none';
    this.ctx.fillStyle = EMPTY_BLACK;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.levelBuilder.build();

    this.player.draw();
    this.enemies.draw();

    this.bullets.update(dt);
    this.exploder.update();
    this.enemies.update();
    this.updatePlayer();
    this.livesPanel.update();
    this.scorePanel.update();
  };

  private main = () => {
    if (!this.gameOn) return;

    const now = performance.now();
    const dt = (now - this.lastTime) / 1000.0;
    this.updateWorld(dt);
    this.lastTime = now;
    window.requestAnimationFrame(this.main);
  };

  public stop(): void {
    // Stop the game
    this.gameOn = false;
    if (this.secondsClock) clearInterval(this.secondsClock);
    // Remove all singleton controllers from memory
    this.levelBuilder.deleteInstance();
    this.exploder.deleteInstance();
    this.enemies.deleteInstance();
    this.bullets.deleteInstance();
    this.livesPanel.deleteInstance();
    this.scorePanel.deleteInstance();
  }

  public play: () => void = () => {
    console.log('this game has no name');

    // TODO: Make sure these listeners are not duplicated on re-render;
    document.addEventListener('keydown', this.keyDownHandler, false);
    document.addEventListener('keyup', this.keyUpHandler, false);

    // Counts seconds spent in game
    this.gameTimeInSeconds = 0;
    this.secondsClock = setInterval(() => {
      this.gameTimeInSeconds += 1;
      console.log(`Game seconds passed: ${this.gameTimeInSeconds}`);
      if (this.gameTimeInSeconds % 10 === 0) {
        this.enemies?.addEnemy();
      }
    }, 1000);

    // Set the clock
    this.lastTime = performance.now();
    // Start the show!
    this.main();
  };

  private keyDownHandler = (e: KeyboardEvent) => {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      this.rightPressed = true;
      this.leftPressed = this.upPressed = this.downPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      this.leftPressed = true;
      this.rightPressed = this.upPressed = this.downPressed = false;
    } else if (e.key === 'Up' || e.key === 'ArrowUp') {
      this.upPressed = true;
      this.leftPressed = this.rightPressed = this.downPressed = false;
    } else if (e.key === 'Down' || e.key === 'ArrowDown') {
      this.downPressed = true;
      this.upPressed = this.leftPressed = this.rightPressed = false;
    }
  };

  private keyUpHandler = (e: KeyboardEvent) => {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      this.rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      this.leftPressed = false;
    } else if (e.key === 'Up' || e.key === 'ArrowUp') {
      this.upPressed = false;
    } else if (e.key === 'Down' || e.key === 'ArrowDown') {
      this.downPressed = false;
    }

    if (e.key === ' ') {
      this.player.fire();
    }
  };
}
