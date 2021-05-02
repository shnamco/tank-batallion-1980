import React from 'react';
import './score.pcss';
import { Link, RouteComponentProps } from 'react-router-dom';
import { ROUTE } from '../../interfaces/route';
import { RootState } from '@store/core/store';
import { selectProfile, selectProfileError } from '@store/profile/profile.selectors';
import { ThunkDispatch } from 'redux-thunk';
import { ProfileAction } from '@store/profile/profile.actions';
import { Profile } from '@services/profile_api';
import { connect } from 'react-redux';
import { getLeaderboard } from '@store/leaderbord/leaderboard.thunks';

type ScoreType = {
  name: string;
  score: number;
  level: number;
  active: boolean;
};

interface ScoreProps extends RouteComponentProps {
  profile: Profile;
  error: null | string;
  getLeaderboard: () => void;
}

type ListenerType = () => void;

interface ScoreState {
  leaders: ScoreType[];
}

class ScoreComponent extends React.Component<ScoreProps, ScoreState> {
  public state = {
    leaders: [
      {
        name: 'MARIO99',
        score: 90000,
        level: 22,
        active: true
      },
      {
        name: 'LUIGIxx',
        score: 32600,
        level: 14,
        active: false
      },
      {
        name: 'PR1NCESS_Lea',
        score: 10000,
        level: 7,
        active: false
      }
    ]
  };

  public listeners: ListenerType[] = [];

  public componentDidMount(): void {
    this.props.getLeaderboard();

    const listener = this.keyListener();

    this.listeners.push(listener);
  }

  public componentWillUnmount(): void {
    this.listeners.forEach((listener) => listener());
  }

  public keyListener = (): ListenerType => {
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        const leaders = this.state.leaders;
        let activeIndx = leaders.findIndex((forum) => forum.active);

        leaders[activeIndx].active = false;

        if (activeIndx === 0) {
          activeIndx = leaders.length - 1;
        } else {
          activeIndx -= 1;
        }

        leaders[activeIndx].active = true;

        this.setState({ leaders });
      }

      if (e.key === 'ArrowDown') {
        const leaders = this.state.leaders;

        let activeIndx = leaders.findIndex((forum) => forum.active);

        leaders[activeIndx].active = false;

        if (activeIndx === leaders.length - 1) {
          activeIndx = 0;
        } else {
          activeIndx += 1;
        }

        leaders[activeIndx].active = true;

        this.setState({ leaders });
      }

      if (e.key === 'Escape') {
        this.props.history.push(ROUTE.MENU);
      }
    };

    window.addEventListener('keydown', keyHandler);

    return () => window.removeEventListener('keydown', keyHandler);
  };

  public get renderForums(): React.ReactNode {
    const profileName = 'MARIO99';

    return this.state.leaders.map((player) => {
      return (
        <tr className="forums__row" key={player.name}>
          <td className={player.active ? 'forums__title active' : 'forums__title'}>
            <span className={player.name === profileName ? 'eagle-after' : ''}>{player.name}</span>
          </td>
          <td>
            <div className="forums__topic">{player.score}</div>
          </td>
          <td>
            <div className="forum__replies">{player.level}</div>
          </td>
        </tr>
      );
    });
  }

  render(): React.ReactElement {
    return (
      <div className="arcade__background arcade__background-all">
        <div className="arcade__background-content score">
          <table className="forums__table">
            <thead>
              <tr className="forums__table-header">
                <th className="forum__title-col">
                  <div className="forums__header-name">PLAYER</div>
                </th>
                <th className="forums__topics-col">
                  <div className="forums__header-name">SCORE</div>
                </th>
                <th className="forums__replies-col">
                  <div className="forums__header-name">LEVEL</div>
                </th>
              </tr>
            </thead>
            <tbody>{this.renderForums}</tbody>
          </table>
          <div className="forums__footer">
            <Link to={`/${ROUTE.MENU}`} className="forums__link">
              BACK TO THE MAIN MENU
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    profile: selectProfile(state),
    error: selectProfileError(state)
  };
}

function mapDispatchToProps(dispatch: ThunkDispatch<RootState, void, ProfileAction>) {
  return {
    getLeaderboard: () => dispatch(getLeaderboard())
  };
}

export const Score = connect(mapStateToProps, mapDispatchToProps)(ScoreComponent);
