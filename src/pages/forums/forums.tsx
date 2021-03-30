import React from 'react';
import './forums.pcss';
import { Link, RouteComponentProps } from 'react-router-dom';
import { ROUTE } from '@utils/route';

type ForumsType = {
  title: string;
  topics: number;
  replies: number;
  active: boolean;
  link: string;
};

type ListenerType = () => void;

interface ForumsState {
  forums: ForumsType[];
}

export class Forums extends React.Component<RouteComponentProps, ForumsState> {
  public state = {
    forums: [
      {
        title: 'NEW GAMES',
        topics: 222,
        replies: 345,
        active: true,
        link: '/forum/new_games'
      },
      {
        title: 'GAME DESIGNERS',
        topics: 5,
        replies: 14,
        active: false,
        link: '/forum/game_designers'
      },
      {
        title: 'OLD ARCADES',
        topics: 590,
        replies: 895,
        active: false,
        link: '/forum/old_arcades'
      }
    ]
  };

  public listeners: ListenerType[] = [];

  public componentDidMount(): void {
    const listener = this.keyListener();

    this.listeners.push(listener);
  }

  public componentWillUnmount(): void {
    this.listeners.forEach((listener) => listener());
  }

  public keyListener = (): ListenerType => {
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        const forums = this.state.forums;
        let activeIndx = forums.findIndex((forum) => forum.active);

        forums[activeIndx].active = false;

        if (activeIndx === 0) {
          activeIndx = forums.length - 1;
        } else {
          activeIndx -= 1;
        }

        forums[activeIndx].active = true;

        this.setState({ forums });
      }

      if (e.key === 'ArrowDown') {
        const forums = this.state.forums;

        let activeIndx = forums.findIndex((forum) => forum.active);

        forums[activeIndx].active = false;

        if (activeIndx === forums.length - 1) {
          activeIndx = 0;
        } else {
          activeIndx += 1;
        }

        forums[activeIndx].active = true;

        this.setState({ forums });
      }

      if (e.key === 'Enter') {
        const activeIndx = this.state.forums.findIndex((forum) => forum.active);

        this.props.history.push(this.state.forums[activeIndx].link);
      }

      if (e.key === 'Escape') {
        this.props.history.push(ROUTE.MENU);
      }
    };

    window.addEventListener('keydown', keyHandler);

    return () => window.removeEventListener('keydown', keyHandler);
  };

  public get renderForums(): React.ReactNode {
    return this.state.forums.map((forum) => {
      return (
        <tr className="forums__row" key={forum.link}>
          <td className={forum.active ? 'forums__title active' : 'forums__title'}>
            <Link to={forum.link}>{forum.title}</Link>
          </td>
          <td>
            <div className="forums__topic">
              {forum.topics}
              <span className="forums__topic-new">NEW</span>
            </div>
          </td>
          <td>
            <div className="forum__replies">{forum.replies}</div>
          </td>
        </tr>
      );
    });
  }

  render(): React.ReactElement {
    return (
      <div className="page-background">
        <div className="container">
          <main className="forums">
            <table className="forums__table">
              <thead>
                <tr className="forums__table-header">
                  <th className="forums__title-col">
                    <div className="forums__header-name">FORUMS</div>
                  </th>
                  <th className="forums__topics-col">
                    <div className="forums__header-name">TOPICS</div>
                  </th>
                  <th className="forums__replies-col">
                    <div className="forums__header-name">REPLIES</div>
                  </th>
                </tr>
              </thead>
              <tbody>{this.renderForums}</tbody>
            </table>
          </main>
        </div>
      </div>
    );
  }
}
