import React from 'react';
import { TankBatallion } from '@core/tank_batallion';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ROUTE } from '../../interfaces/route';
import { keyPressHandler } from '@utils/use_key_press';
import './game.pcss';
import { CANVAS_SIZE, AUX_CANVAS_HEIGHT, GameState } from '@core/game_types';
import { RootState } from '@store/core/store';
import { ThunkDispatch } from 'redux-thunk';
import { ProfileAction } from '@store/profile/profile.actions';
import { newLeader } from '@store/leaderbord/leaderboard.thunks';
import { connect } from 'react-redux';
import { NewLeaderRequest } from '@services/leaderboard_api';
import { selectProfile } from '@store/auth/auth.selectors';
import { Profile } from '@services/profile_api';

interface GameProps extends RouteComponentProps, GameState {
  profile: Profile | null;
  newLeader: (data: NewLeaderRequest) => void;
}

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
    this.props.newLeader({
      data: {
        battalionId: this.props.profile?.id ?? 0,
        name: this.props.profile?.display_name ?? 'player',
        score: this.tb?.gameState.playerScore ?? 0,
        level: this.tb?.gameState.levelNo ?? 0,
        active: true
      },
      ratingFieldName: 'battalionId'
    });

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

function mapStateToProps(state: RootState) {
  return {
    profile: selectProfile(state)
  };
}

function mapDispatchToProps(dispatch: ThunkDispatch<RootState, void, ProfileAction>) {
  return {
    newLeader: (data: NewLeaderRequest) => dispatch(newLeader(data))
  };
}

export const Game = connect(mapStateToProps, mapDispatchToProps)(withRouter(GameComponent));
