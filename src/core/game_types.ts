// COLOR CONSTANTS
export const EMPTY_BLACK = '#080000';
export const TANK_BLACK = '#040000';
export const ALMOST_WHITE = '#fdffff';

// COMMON CONSTANTS
export const CANVAS_SIZE = 416;
export const AUX_CANVAS_HEIGHT = 40;
export const PLAYER_SIZE = 26;
export const BULLET_SIZE = 6;
export const WALL_SIZE = 36;

// ==== GAME STATE ===========================

export const MAX_ENEMIES = 20;
export const HIT_SCORES = [30, 60, 150, 300, 800];

export interface GameState {
  levelNo: number;
  playerLives?: number;
  enemiesLeft?: number;
  playerScore?: number;
}

// ==== COMMON TYPES FOR GAME ENTITIES =======

export interface CornerCalculatable {
  tlx: number;
  tly: number;
  trx: number;
  try: number;
  blx: number;
  bly: number;
  brx: number;
  bry: number;
}

// Any interactive object in a game
export interface GameObject {
  // Initial place where to draw on canvas
  // Position before any of the updates.
  x: number;
  y: number;
  dir: Direction;
  // side of a bounding rect
  size: number;
  // override default fill if necessary
  fill?: string | undefined;
  speed?: number;
  name?: string;
}

// Compass - Grad
export enum Direction {
  East = 0,
  South = 90,
  North = 270,
  West = 180
}
