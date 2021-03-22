import React from 'react';
import './game.pcss';
import { TankBatallion } from '../../core/tank_batallion';

type GameProps = Record<string, unknown>;
type GameState = Record<string, unknown>;

export class Game extends React.Component<GameProps, GameState> {
  private canvas: React.RefObject<HTMLCanvasElement>;

  constructor(props: GameProps) {
    super(props);
    this.canvas = React.createRef();
  }

  componentDidMount(): void {
    if (this.canvas.current) {
      const tb = new TankBatallion(this.canvas.current);
      tb.play();
    }
  }

  render(): React.ReactNode {
    return (
      <React.Fragment>
        <div className="game__wrapper">
          <div className="game__centerpiece">
            <canvas id="game-canvas" ref={this.canvas} width={420} height={420}></canvas>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
