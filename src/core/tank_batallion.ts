import { Direction } from './game_types';
import { PlayerTank } from './player_tank';
import { Bullet } from './bullet';
import { Wall } from './wall';
import { LevelBuilder } from './level_builder';

// TODO: Array of bullets

export class TankBatallion {
  // Physics
  private lastTime!: number;

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
  private bullets: Bullet[] = [];

  // Number of the level, game has 22 levels
  private level: number;

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
      x: 200,
      y: 200,
      dir: Direction.East,
      size: 28
    });
  };

  private fireBullet = () => {
    const bullet = new Bullet(this.ctx, {
      hot: true,
      x: this.player.x,
      y: this.player.y,
      dir: this.player.dir,
      size: 6,
      speed: 150,
      firedBy: this.player,
      fill: '#55BEBF'
    });
    this.bullets.push(bullet);
  };

  private updatePlayer = () => {
    if (this.rightPressed) {
      if (this.player.x < this.canvas.width - this.player.size) this.player.x++;
      this.player.dir = Direction.East;
    }
    if (this.leftPressed) {
      if (this.player.x > 0) this.player.x--;
      this.player.dir = Direction.West;
    }
    if (this.upPressed) {
      if (this.player.y > 0) this.player.y--;
      this.player.dir = Direction.North;
    }
    if (this.downPressed) {
      if (this.player.y < this.canvas.height - this.player.size) this.player.y++;
      this.player.dir = Direction.South;
    }
    this.player.draw();
  };

  private updateWorld = (dt: number) => {
    // clear the animation frame
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // draw a level
    new LevelBuilder(this.ctx, this.level).build();

    // Draw, move player, shoot
    this.updatePlayer();

    // Track bullets
    this.bullets.forEach((bullet) => {
      bullet.update(dt);
    });
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
      this.fireBullet();
    }
  };
}
