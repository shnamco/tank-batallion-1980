import { Direction } from './game_types';
import { PlayerTank } from './player_tank';
import { Bullet } from './bullet';
import { LevelBuilder } from './level_builder';
import { Wall } from './wall';

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
  private walls: Wall[] = [];
  private wallHits: Set<Wall> = new Set();

  // Number of the level, game has 22 levels, but only 8 unique maps
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
      x: 0,
      y: 0,
      dir: Direction.East,
      size: 26
    });
  };

  private fireBullet = () => {
    let x = this.player.x;
    let y = this.player.y;

    const halfTank = this.player.size / 2;
    const halfBullet = 3; // TODO: Make a bullet size a constant somewhere

    // Position the bullet at the tip of the tank's "gun"
    if (this.player.dir === Direction.East) {
      x = this.player.x + this.player.size;
      y = this.player.y + halfTank - halfBullet;
    } else if (this.player.dir === Direction.West) {
      y = this.player.y + halfTank - halfBullet;
    } else if (this.player.dir === Direction.North) {
      x = this.player.x + halfTank - halfBullet;
    } else if (this.player.dir === Direction.South) {
      x = this.player.x + halfTank - halfBullet;
      y = this.player.y + this.player.size - halfBullet;
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

    this.player.collidedWithWall = false;
    this.player.draw();
  };

  private updateWorld = (dt: number) => {
    // clear the animation frame
    this.ctx.fillStyle = '#111111';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // draw a level
    const level = new LevelBuilder(this.ctx, this.level);
    level.build();

    // Memoize
    if (this.walls.length === 0) this.walls = level.walls as Wall[];
    // All walls check for collisions
    this.walls.forEach((wall) => {
      wall.checkCollisions([this.player]);
    });

    // Draw hits
    this.wallHits.forEach((hit) => {
      hit.draw();
    });

    // Track bullets
    this.bullets.forEach((bullet) => {
      const [hitX, hitY] = bullet.update(dt);
      if (hitX > -1 && hitY > -1) {
        const hit = new Wall(this.ctx, {
          x: hitX,
          y: hitY,
          w: this.player.size + 20,
          h: this.player.size + 20,
          // TODO: Make sure we don't have to pass it just to make compiler happy
          checkCollisions: () => null,
          empty: true
        });
        console.log(hitX, hitY);
        this.wallHits.add(hit);
      }
    });

    // TODO: Remove collided bullets
    this.bullets = this.bullets.filter((bullet) => bullet.hot);

    // Draw, move player, shoot
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
      this.fireBullet();
    }
  };
}
