export enum Colors {
  WallRed = 174,
  WallBlack = 0
}

export function drawObject(ctx: CanvasRenderingContext2D, instructions: (...args: unknown[]) => void, ...args: unknown[]): void {
  ctx.save();
  ctx.beginPath();
  instructions(...args);
  ctx.closePath();
  ctx.restore();
}

export function collides(x: number, y: number, r: number, b: number, x2: number, y2: number, r2: number, b2: number): boolean {
  return !(r <= x2 || x > r2 || b <= y2 || y > b2);
}

export function boxCollides(x1: number, y1: number, size: number, x2: number, y2: number, size2: number): boolean {
  return collides(x1, y1, x1 + size, x1 + size, x2, y2, x2 + size2, y2 + size2);
}

export function between(a: number, b: number, c: number): boolean {
  return a > b && a < c;
}
