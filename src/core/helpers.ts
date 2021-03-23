export function drawObject(ctx: CanvasRenderingContext2D, instructions: (...args: unknown[]) => void, ...args: unknown[]): void {
  ctx.save();
  ctx.beginPath();
  instructions(...args);
  ctx.closePath();
  ctx.restore();
}
