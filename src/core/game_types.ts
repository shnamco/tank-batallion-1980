// COMMON CONSTANTS
export const CANVAS_SIZE = 416;
export const PLAYER_SIZE = 26;
export const BULLET_SIZE = 6;
export const WALL_SIZE = 36;

// ==== COMMON TYPES FOR GAME ENTITIES =======

// Describes the media source of the game asset,
// can be used to build a game object if it requires
// external media.
export interface GameAsset {
  // for SVG d-paths
  path?: string;
  // for base64-encoded images
  base64?: string;
  fill?: string;
  // side of a bounding rect
  size: number;
}

// Any interactive object in a game
export interface GameObject {
  // Initial place where to draw on canvas
  // Position before any of the updates.
  x: number;
  y: number;

  tlx?: number;
  tly?: number;
  trx?: number;
  try?: number;
  blx?: number;
  bly?: number;
  brx?: number;
  bry?: number;

  dir: Direction;
  // side of a bounding rect
  size: number;
  // override default fill if necessary
  fill?: string | undefined;
  collideWithWall?: () => void;

  speed?: number;
}

// Compass - Grad
export enum Direction {
  East = 0,
  South = 90,
  North = 270,
  West = 180
}
