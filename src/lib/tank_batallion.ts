// Compass - Grad
enum Direction {
  East = 0,
  South = 90,
  North = 270,
  West = 180
}

interface GameObject {
  pos: {
    x: number;
    y: number;
  };
  dir: Direction;
  size: number;
}

interface Bullet extends GameObject {
  speed: number;
  hot: boolean;
}

interface GameAsset {
  path: string;
  fill: string;
  size: number;
}

type Player = GameObject;

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
  private player!: Player;
  private bullet!: Bullet;
  private playerTank: GameAsset;

  constructor(canvas: HTMLCanvasElement) {
    if (!canvas) {
      throw new Error('Game must be initialized with a canvas element');
    }
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.playerTank = {
      // SVG format
      path:
        'M0 28V21.5385H8.61539V19.3846H6.46154V17.2308H4.30769V15.0769H2.15385V12.9231H4.30769V10.7692H6.46154V8.61539H8.61539V6.46154H0V0H21.5385V6.46154H17.2308V8.61539H19.3846V12.9231H23.6923V10.7692H28V17.2308H23.6923V15.0769H19.3846V19.3846H17.2308V21.5385H21.5385V28H0ZM15.0774 19.3847V17.2308H17.2312V10.7693H15.0774V8.61545H10.7697V10.7693H8.61583V12.9231H6.46199V15.077H8.61583V17.2308H10.7697V19.3847H15.0774Z',
      // Hex color or HTML name
      fill: '#55BEBF',
      // For square assets: side of a bounding rect
      size: 28
    };
  }

  private drawBullet = (color: string) => {
    let [x, y] = [0, 0];

    if (!this.bullet.hot) return;
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.fillStyle = color;

    if (this.bullet.dir === Direction.East) {
      x = this.bullet.pos.x + this.player.size;
      y = this.bullet.pos.y + this.player.size / 2 - this.bullet.size / 2;
    } else if (this.bullet.dir === Direction.West) {
      x = this.bullet.pos.x;
      y = this.bullet.pos.y + this.player.size / 2 - this.bullet.size / 2;
    } else if (this.bullet.dir === Direction.North) {
      x = this.bullet.pos.x + this.player.size / 2 - this.bullet.size / 2;
      y = this.bullet.pos.y;
    } else if (this.bullet.dir === Direction.South) {
      x = this.bullet.pos.x + this.player.size / 2 - this.bullet.size / 2;
      y = this.bullet.pos.y + this.player.size;
    }

    this.ctx.fillRect(x, y, this.bullet.size, this.bullet.size);
    this.ctx.closePath();
    this.ctx.restore();
  };

  private updateBullet = (dt: number) => {
    if (this.bullet.dir === Direction.East) {
      this.bullet.pos.x += dt * this.bullet.speed;
    } else if (this.bullet.dir === Direction.West) {
      this.bullet.pos.x -= dt * this.bullet.speed;
    } else if (this.bullet.dir === Direction.North) {
      this.bullet.pos.y -= dt * this.bullet.speed;
    } else if (this.bullet.dir === Direction.South) {
      this.bullet.pos.y += dt * this.bullet.speed;
    }
    this.drawBullet(this.playerTank.fill);
  };

  private fireBullet = () => {
    console.log('fire!');
    this.bullet.hot = true;
    this.bullet.pos = { ...this.player.pos };
    this.bullet.dir = this.player.dir;
  };

  private drawTank = (color: string, x: number, y: number, dir: Direction): void => {
    const svgPath = new Path2D(this.playerTank.path);

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.fillStyle = color;
    this.ctx.translate(x + this.player.size / 2, y + this.player.size / 2);
    this.ctx.rotate((dir * Math.PI) / 180);
    this.ctx.translate(-this.player.size / 2, -this.player.size / 2);
    this.ctx.fill(svgPath);
    this.ctx.translate(-x, -y);
    this.ctx.closePath();
    this.ctx.restore();
    // Another way to restore
    // this.ctx.setTransform(1, 0, 0, 1, 0, 0);
  };

  private updatePlayer = () => {
    if (this.rightPressed) {
      if (this.player.pos.x < this.canvas.width - this.player.size) this.player.pos.x++;
      this.player.dir = Direction.East;
    }
    if (this.leftPressed) {
      if (this.player.pos.x > 0) this.player.pos.x--;
      this.player.dir = Direction.West;
    }
    if (this.upPressed) {
      if (this.player.pos.y > 0) this.player.pos.y--;
      this.player.dir = Direction.North;
    }
    if (this.downPressed) {
      if (this.player.pos.y < this.canvas.height - this.player.size) this.player.pos.y++;
      this.player.dir = Direction.South;
    }
    this.drawTank(this.playerTank.fill, this.player.pos.x, this.player.pos.y, this.player.dir);
  };

  private update = (dt: number) => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.updatePlayer();
    this.updateBullet(dt);
  };

  private main = () => {
    const now = performance.now();
    const dt = (now - this.lastTime) / 1000.0;
    this.update(dt);
    this.lastTime = now;
    window.requestAnimationFrame(this.main);
  };

  public play: () => void = () => {
    console.log('this game has no name');

    // TODO: Make sure these listeners are not duplicated on re-render;
    document.addEventListener('keydown', this.keyDownHandler, false);
    document.addEventListener('keyup', this.keyUpHandler, false);

    this.player = {
      pos: { x: 0, y: 0 },
      dir: Direction.East,
      size: this.playerTank.size
    };

    this.bullet = {
      hot: false,
      pos: { x: 0, y: 0 },
      dir: Direction.East,
      size: 4,
      speed: 150
    };

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
