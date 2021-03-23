import { Wall } from './wall';

// Each entry is a sequence of stretches: E for empty canvas, W for a wall pattern
const LEVEL_MAPS: { [key in number]: string[][] } = {
  1: [
    ['E448', '', '', '', '', ''],
    ['E36', 'W86', 'E32', 'W56', 'E32', 'W38', 'E34', 'W103', 'E34'],
    ['E36', 'W36', 'E170', 'W38', 'E34', 'W38'],
    ['E36', 'W36', 'E34', 'W102']
  ]
};

export class LevelBuilder {
  constructor(private ctx: CanvasRenderingContext2D, private level: number) {}

  public build = (): void => {
    const currentLevel = LEVEL_MAPS[this.level];
    currentLevel.forEach((layer, layerNo) => {
      let currentX = 0;
      layer.forEach((entry) => {
        if (entry.startsWith('E')) {
          currentX += Number(entry.slice(1));
        } else if (entry.startsWith('W')) {
          new Wall(this.ctx, {
            y: layerNo === 0 ? 0 : layerNo * Wall.SIDE,
            x: currentX,
            height: Wall.SIDE,
            width: Number(entry.slice(1))
          }).draw();
          currentX += Number(entry.slice(1));
        }
      });
    });
  };
}
