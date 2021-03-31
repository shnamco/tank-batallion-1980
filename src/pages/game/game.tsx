import React from 'react';
import { TankBatallion } from '@core/tank_batallion';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ROUTE } from '@utils/route';
import { keyPressHandler } from '@utils/use_key_press';
import './game.pcss';

interface GameProps extends RouteComponentProps {
  level: number;
}
type GameState = Record<string, unknown>;

class GameComponent extends React.Component<GameProps, GameState> {
  private readonly canvas: React.RefObject<HTMLCanvasElement>;
  private keyPressHandler: (() => void) | undefined;

  constructor(props: GameProps) {
    super(props);
    this.canvas = React.createRef();
  }

  public escapeHandler(): void {
    this.keyPressHandler = keyPressHandler('Escape', () => {
      this.props.history.push(ROUTE.MENU);
    });
  }

  public componentDidMount(): void {
    if (this.canvas.current) {
      const tb = new TankBatallion(this.canvas.current, 1);
      tb.play();
    }
    this.escapeHandler();
  }

  public componentWillUnmount(): void {
    if (this.keyPressHandler) {
      this.keyPressHandler();
    }
  }

  public render(): React.ReactNode {
    return (
      <React.Fragment>
        <div className="arcade__background arcade__background-game">
          <div className="game__centerpiece">
            <canvas id="game-canvas" ref={this.canvas} width={416} height={416}></canvas>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export const Game = withRouter(GameComponent);
