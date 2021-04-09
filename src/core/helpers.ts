import { Direction } from './game_types';

// Values for Red pixels for core game objects
export enum Colors {
  Wall = 174,
  WallBlack = 0,
  EnemyTank = 85
}

export const DIRECTIONS = [Direction.East, Direction.West, Direction.North, Direction.South];

export const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * max);
};

export const randomFromArray = (arr: unknown[]): unknown => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const containsKnownColor = (arr: number[]): boolean => {
  return arr.some((pix) => {
    return Object.values(Colors).some((num) => {
      return pix === num;
    });
  });
};

export const objectsByColor = (arr: number[]): string[] => {
  const res: string[] = [];
  arr.forEach((pix) => {
    Object.values(Colors).forEach((num) => {
      if (pix === num) {
        res.push(Colors[num]);
      }
    });
  });
  // unique
  return res.filter((item, i, ar) => ar.indexOf(item) === i);
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
  console.log('Dominating R Value:', dominatingRValue, 'color of', Colors[dominatingRValue]);

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

export function rotateClockwise(dir: Direction): Direction {
  let rotated: Direction = Direction.North;
  switch (dir) {
    case Direction.East:
      rotated = Direction.South;
      break;
    case Direction.West:
      rotated = Direction.North;
      break;
    case Direction.North:
      rotated = Direction.East;
      break;
    case Direction.South:
      rotated = Direction.West;
      break;
  }
  return rotated;
}

export function rotateCounterClockwise(dir: Direction): Direction {
  let rotated: Direction = Direction.North;
  switch (dir) {
    case Direction.East:
      rotated = Direction.North;
      break;
    case Direction.West:
      rotated = Direction.South;
      break;
    case Direction.North:
      rotated = Direction.West;
      break;
    case Direction.South:
      rotated = Direction.East;
      break;
  }
  return rotated;
}

export function rotateOpposite(dir: Direction): Direction {
  let rotated: Direction = Direction.North;
  switch (dir) {
    case Direction.East:
      rotated = Direction.West;
      break;
    case Direction.West:
      rotated = Direction.East;
      break;
    case Direction.North:
      rotated = Direction.South;
      break;
    case Direction.South:
      rotated = Direction.North;
      break;
  }
  return rotated;
}
