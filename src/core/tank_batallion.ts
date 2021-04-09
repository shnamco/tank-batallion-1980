import { BULLET_SIZE, Direction } from './game_types';
import { PlayerTank } from './player_tank';
import { Bullet } from './bullet';
import { LevelBuilder } from './level_builder';
import { Exploder } from './exploder';
import { EnemyBrain } from './enemy_brain';

export class TankBatallion {
  // "Physics"
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
  private exploder!: Exploder;
  private enemies!: EnemyBrain;

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
      x: 0,
      y: 0,
      dir: Direction.East,
      size: 26
    });

    this.exploder = Exploder.getInstance(this.ctx);
    this.enemies = EnemyBrain.getInstance(this.ctx);
    this.enemies.addEnemy();
    this.enemies.addEnemy();
  };

  private fireBullet = () => {
    let x = this.player.x;
    let y = this.player.y;

    const halfTank = this.player.size / 2;
    const halfBullet = BULLET_SIZE / 2;

    // Position the bullet just behind the tip of the tank's "gun"
    if (this.player.dir === Direction.East) {
      x = this.player.x + this.player.size - 8;
      y = this.player.y + halfTank - halfBullet;
    } else if (this.player.dir === Direction.West) {
      x = this.player.tlx + halfBullet;
      y = this.player.y + halfTank - halfBullet;
    } else if (this.player.dir === Direction.North) {
      x = this.player.x + halfTank - halfBullet;
      y = this.player.tly + BULLET_SIZE;
    } else if (this.player.dir === Direction.South) {
      x = this.player.x + halfTank - halfBullet;
      y = this.player.bly - BULLET_SIZE;
    }

    const bullet = new Bullet(this.ctx, {
      hot: true,
      x,
      y,
      dir: this.player.dir,
      size: 6,
      speed: 100,
      firedBy: this.player,
      fill: '#55BEBF'
    });
    this.bullets.push(bullet);
  };

  private updatePlayer = () => {
    if (this.leftPressed) this.player.moveLeft();
    if (this.rightPressed) this.player.moveRight();
    if (this.upPressed) this.player.moveUp();
    if (this.downPressed) this.player.moveDown();

    this.player.draw();
  };

  // Happens on every "tick"
  private updateWorld = (dt: number) => {
    // clear the animation frame
    // TODO: Define as constant!
    this.ctx.fillStyle = '#080402';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // draw a level
    // memoize levelBuilder
    if (!this.levelBuilder) {
      this.levelBuilder = new LevelBuilder(this.ctx, this.level);
    }
    this.levelBuilder.build();

    // TODO: Remove collided bullets
    this.bullets = this.bullets.filter((bullet) => bullet.hot);

    // Track bullets
    this.bullets.forEach((bullet) => {
      bullet.update(dt, this.levelBuilder);
    });

    this.exploder.update();

    this.enemies.update();

    // Draw, move player, shoot. MUST come last!
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
      // Disallow firing >1 bullet at a time. TODO: CHEATCODE to turn this restriction off.
      const playerBullet = this.bullets.find((bullet) => bullet.firedBy.constructor.name === 'PlayerTank');
      if (!playerBullet) this.fireBullet();
    }
  };
}
