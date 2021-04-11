import { Direction } from './game_types';
import { PlayerTank } from './player_tank';
import { LevelBuilder } from './level_builder';
import { ExplosionsController } from './explosions_controller';
import { EnemiesController } from './enemies_controller';
import { BulletsController } from './bullets_controller';

export class TankBatallion {
  // "Physics"
  private lastTime!: number;

  // Game time
  private gameTimeInSeconds!: number;

  // Keypress states
  private leftPressed!: boolean;
  private rightPressed!: boolean;
  private upPressed!: boolean;
  private downPressed!: boolean;

  // Canvas
  private canvas: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;

  // States for game objects
  // should be set in play() method
  private player!: PlayerTank;
  private bullets!: BulletsController;
  private exploder!: ExplosionsController;
  private enemies!: EnemiesController;

  // Number of the level, game has 22 levels, but only 8 unique maps
  private level: number;
  private levelBuilder!: LevelBuilder;

  constructor(canvas: HTMLCanvasElement, level: number) {
    if (!canvas) {
      throw new Error('Game must be initialized with a canvas element');
    }
    this.level = level;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.initGameObjects();
  }

  private initGameObjects = () => {
    this.player = new PlayerTank(this.ctx, {
      x: 150,
      y: 340,
      dir: Direction.North,
      size: 26
    });

    this.exploder = ExplosionsController.getInstance(this.ctx);
    this.bullets = BulletsController.getInstance(this.ctx);
    this.enemies = EnemiesController.getInstance(this.ctx);
    this.enemies.addEnemy();
  };

  private updatePlayer = () => {
    if (this.leftPressed) this.player.moveLeft();
    if (this.rightPressed) this.player.moveRight();
    if (this.upPressed) this.player.moveUp();
    if (this.downPressed) this.player.moveDown();
  };

  // Happens on every "tick"
  private updateWorld = (dt: number) => {
    // clear the animation frame
    // TODO: Define as constant!
    this.ctx.fillStyle = '#080000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // draw a level
    // memoize levelBuilder
    if (!this.levelBuilder) {
      this.levelBuilder = new LevelBuilder(this.ctx, this.level);
    }
    this.levelBuilder.build();

    this.player.draw();
    this.enemies.draw();

    this.bullets.update(dt, this.levelBuilder);
    this.exploder.update();
    this.enemies.update();
    this.updatePlayer();
  };

  private main = () => {
    const now = performance.now();
    const dt = (now - this.lastTime) / 1000.0;
    this.updateWorld(dt);
    this.lastTime = now;

    window.requestAnimationFrame(this.main);
  };

  public play: () => void = () => {
    console.log('this game has no name');

    // TODO: Make sure these listeners are not duplicated on re-render;
    document.addEventListener('keydown', this.keyDownHandler, false);
    document.addEventListener('keyup', this.keyUpHandler, false);

    // Counts seconds spent in game
    this.gameTimeInSeconds = 0;
    setInterval(() => {
      this.gameTimeInSeconds += 1;
      if (this.gameTimeInSeconds % 10 === 0) {
        this.enemies.addEnemy();
      }
    }, 1000);

    // Set the clock
    this.lastTime = performance.now();
    // Start the show
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
