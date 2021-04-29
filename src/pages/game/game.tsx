import React from 'react';
import { TankBatallion } from '@core/tank_batallion';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ROUTE } from '../../interfaces/route';
import { keyPressHandler } from '@utils/use_key_press';
import './game.pcss';
import { CANVAS_SIZE, AUX_CANVAS_HEIGHT, GameState } from '@core/game_types';

interface GameProps extends RouteComponentProps, GameState {}

class GameComponent extends React.Component<GameProps, GameState> {
  private readonly mainCanvas: React.RefObject<HTMLCanvasElement>;
  private readonly lowerCanvas: React.RefObject<HTMLCanvasElement>;
  private readonly upperCanvas: React.RefObject<HTMLCanvasElement>;
  private tb!: TankBatallion | null;
  private escPressHandler: (() => void) | undefined;
  private fPressHandler: (() => void) | undefined;

  constructor(props: GameProps) {
    super(props);
    this.mainCanvas = React.createRef();
    this.lowerCanvas = React.createRef();
    this.upperCanvas = React.createRef();
  }

  public escapeHandler(): void {
    this.escPressHandler = keyPressHandler('Escape', () => {
      this.props.history.push(ROUTE.MENU);
    });

    this.fPressHandler = keyPressHandler('f', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    });
  }

  public componentDidMount(): void {
    if (this.mainCanvas.current && this.lowerCanvas.current && this.upperCanvas.current) {
      this.tb = new TankBatallion(this.mainCanvas.current, this.lowerCanvas.current, this.upperCanvas.current, { ...this.props });
      this.tb.play();
    }
    this.escapeHandler();
  }

  public componentWillUnmount(): void {
    this.tb?.stop();
    if (this.escPressHandler) {
      this.escPressHandler();
    }
    if (this.fPressHandler) {
      this.fPressHandler();
    }
  }

  public render(): React.ReactNode {
    return (
      <React.Fragment>
        <div className="arcade__background arcade__background-game">
          <div className="game__centerpiece">
            <canvas id="upper-canvas" ref={this.upperCanvas} width={CANVAS_SIZE} height={AUX_CANVAS_HEIGHT}></canvas>
            <div className="game__checkers-wrapper">
              <canvas id="game-canvas" ref={this.mainCanvas} width={CANVAS_SIZE} height={CANVAS_SIZE}></canvas>
            </div>
            <canvas id="lower-canvas" ref={this.lowerCanvas} width={CANVAS_SIZE} height={AUX_CANVAS_HEIGHT}></canvas>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export const Game = withRouter(GameComponent);
