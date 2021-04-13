import { CornerCalculatable, Direction, GameObject } from './game_types';

export const DIRECTIONS = [Direction.East, Direction.West, Direction.North, Direction.South];

// DRAWING WRAPPER
export function drawObject(ctx: CanvasRenderingContext2D, instructions: (...args: unknown[]) => void, ...args: unknown[]): void {
  ctx.save();
  ctx.beginPath();
  instructions(...args);
  ctx.closePath();
  ctx.restore();
}

// PIXEL COLOR VALUE BASED COLLISION DETECTION FOR TANKS

// Values for Red pixels for core game objects
// Based on the amount of Red in fills (e.g., #030000, #040000)
export enum GameableRValues {
  Wall = 174,
  WallBlack = 0,
  EnemyBlack = 3,
  EnemyTank = 85,
  PlayerTank = 255,
  PlayerBlack = 4
}

export const RValuesForPixelsInFront = (
  ctx: CanvasRenderingContext2D,
  go: GameObject & CornerCalculatable,
  dir: Direction,
  howFar?: number
): number[] => {
  let res: number[] = [];
  if (!howFar) howFar = 2;
  if (dir === Direction.East) {
    res = Array.from(ctx.getImageData(go.trx + howFar, go.try, 1, go.size).data);
  }
  if (dir === Direction.West) {
    res = Array.from(ctx.getImageData(go.tlx - howFar, go.try, 1, go.size).data);
  }
  if (dir === Direction.South) {
    res = Array.from(ctx.getImageData(go.blx, go.bly + howFar, go.size, 1).data);
  }
  if (dir === Direction.North) {
    res = Array.from(ctx.getImageData(go.tlx, go.tly - howFar, go.size, 1).data);
  }
  return res.filter((_, idx) => idx % 4 === 0);
};

export const containsKnownColor = (arr: number[]): boolean => {
  return arr.some((pix) => {
    return Object.values(GameableRValues).some((num) => {
      return pix === num;
    });
  });
};

export const seesObjectInFront = (
  ctx: CanvasRenderingContext2D,
  go: GameObject & CornerCalculatable,
  dir: Direction,
  howFar?: number
): boolean => {
  return containsKnownColor(RValuesForPixelsInFront(ctx, go, dir, howFar));
};

export const objectsByColor = (arr: number[]): string[] => {
  const res: string[] = [];
  arr.forEach((pix) => {
    Object.values(GameableRValues).forEach((num) => {
      if (pix === num) {
        res.push(GameableRValues[num]);
      }
    });
  });
  // unique
  return res.filter((item, i, ar) => ar.indexOf(item) === i);
};

// NAVIGATION

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

// RANDOMNESS

export const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * max);
};

export const randomFromArray = (arr: unknown[]): unknown => {
  return arr[Math.floor(Math.random() * arr.length)];
};

// ARITHMETICS

export function between(a: number, b: number, c: number): boolean {
  return a > b && a < c;
}

export function inclusiveBetween(a: number, b: number, c: number): boolean {
  return a >= b && a <= c;
}
