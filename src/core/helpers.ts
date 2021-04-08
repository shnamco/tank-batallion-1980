// Values for Red pixels for core game objects
export enum Colors {
  Wall = 174
}

export const containsKnownColor = (arr: number[]): boolean => {
  return arr.some((pix) => {
    return Object.values(Colors).some((num) => {
      return pix === num;
    });
  });
};

export const detectObjectByDominatingColor = (arr: number[]): string => {
  const dominatingRValue = (arr || []).reduce(
    (acc, el) => {
      acc.k[el] = acc.k[el] ? acc.k[el] + 1 : 1;
      acc.max = acc.max ? (acc.max < acc.k[el] ? el : acc.max) : el;
      return acc;
    },
    { k: {} as { [key in number]: number }, max: 0 }
  ).max;

  return Colors[dominatingRValue];
};

export function drawObject(ctx: CanvasRenderingContext2D, instructions: (...args: unknown[]) => void, ...args: unknown[]): void {
  ctx.save();
  ctx.beginPath();
  instructions(...args);
  ctx.closePath();
  ctx.restore();
}

export function between(a: number, b: number, c: number): boolean {
  return a > b && a < c;
}

export function inclusiveBetween(a: number, b: number, c: number): boolean {
  return a >= b && a <= c;
}
