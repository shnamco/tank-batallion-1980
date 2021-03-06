import { inclusiveBetween } from './helpers';
import { Wall } from './wall';

// Values are copied from Figma's Level-x frames
// These are 1:1 pixel-perfect level designs from
// https://strategywiki.org/wiki/Tank_Battalion/Walkthrough
const LEVEL_WALLS: { [key in number]: { x: number; y: number; w: number; h: number }[] } = {
  1: [
    { x: 32, y: 32, w: 32, h: 110 },
    { x: 32, y: 32, w: 80, h: 32 },
    { x: 144, y: 32, w: 48, h: 32 },
    { x: 224, y: 32, w: 32, h: 80 },
    { x: 288, y: 32, w: 32, h: 110 },
    { x: 288, y: 32, w: 96, h: 30 },
    { x: 352, y: 96, w: 32, h: 46 },
    { x: 96, y: 96, w: 96, h: 48 },
    { x: 0, y: 176, w: 64, h: 30 },
    { x: 96, y: 176, w: 128, h: 30 },
    { x: 224, y: 144, w: 32, h: 126 },
    { x: 288, y: 176, w: 128, h: 30 },
    { x: 32, y: 240, w: 48, h: 30 },
    { x: 32, y: 304, w: 48, h: 78 },
    { x: 112, y: 240, w: 32, h: 142 },
    { x: 112, y: 240, w: 80, h: 30 },
    { x: 288, y: 240, w: 96, h: 30 },
    { x: 352, y: 240, w: 32, h: 78 },
    { x: 352, y: 352, w: 32, h: 30 },
    { x: 176, y: 304, w: 64, h: 30 },
    { x: 272, y: 304, w: 48, h: 78 },
    { x: 176, y: 368, w: 16, h: 46 },
    { x: 176, y: 368, w: 64, h: 14 },
    { x: 224, y: 368, w: 16, h: 46 }
  ]
};

export class LevelBuilder {
  private static instance: LevelBuilder | null;
  public walls: Wall[] = [];

  private constructor(private ctx: CanvasRenderingContext2D, private levelNo: number) {}

  public deleteInstance(): void {
    LevelBuilder.instance = null;
  }

  public static getInstance(ctx: CanvasRenderingContext2D, levelNo: number): LevelBuilder {
    if (!LevelBuilder.instance) {
      LevelBuilder.instance = new LevelBuilder(ctx, levelNo);
    }

    return LevelBuilder.instance;
  }

  public build = (): void => {
    const currentLevel = LEVEL_WALLS[this.levelNo];
    currentLevel.forEach((segment) => {
      let wall = this.walls.find((wall) => {
        return segment.x === wall.x && segment.y === wall.y && segment.w === wall.w && segment.h === wall.h;
      });
      if (!wall) {
        wall = new Wall(this.ctx, {
          ...segment
        });
        this.walls.push(wall);
      }
      wall.draw();
    });
  };

  public findWalls = (x: number, y: number): Wall[] => {
    return this.walls.filter((wall) => {
      return inclusiveBetween(x, wall.x - 1, wall.x + wall.w + 1) || inclusiveBetween(y, wall.y - 1, wall.y + wall.h + 1);
    });
  };
}
