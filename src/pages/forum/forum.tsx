import React from 'react';
import './forum.pcss';
import { Link, RouteComponentProps } from 'react-router-dom';
import { ROUTE } from '../../interfaces/route';

type ForumType = {
  title: string;
  author: string;
  repl: number;
  active: boolean;
  link: string;
};

type ListenerType = () => void;

type RouteParams = {
  id: string;
};

interface ForumState {
  topics: ForumType[];
}

export class Forum extends React.Component<RouteComponentProps<RouteParams>, ForumState> {
  public state = {
    topics: [
      {
        title: 'TANK BATALLION 1980, OMG!!!',
        author: 'MARIO99',
        repl: 55,
        active: true,
        link: '/forum/new_games/topic_1'
      },
      {
        title: 'WHEN’S THE PART II?',
        author: 'LUIGIxx',
        repl: 22,
        active: false,
        link: '/forum/new_games/topic_2'
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
        const topics = this.state.topics;
        let activeIndx = topics.findIndex((topic) => topic.active);

        topics[activeIndx].active = false;

        if (activeIndx === 0) {
          activeIndx = topics.length - 1;
        } else {
          activeIndx -= 1;
        }

        topics[activeIndx].active = true;

        this.setState({ topics });
      }

      if (e.key === 'ArrowDown') {
        const topics = this.state.topics;

        let activeIndx = topics.findIndex((topic) => topic.active);

        topics[activeIndx].active = false;

        if (activeIndx === topics.length - 1) {
          activeIndx = 0;
        } else {
          activeIndx += 1;
        }

        topics[activeIndx].active = true;

        this.setState({ topics });
      }

      if (e.key === 'Enter') {
        const activeIndx = this.state.topics.findIndex((forum) => forum.active);

        this.props.history.push(this.state.topics[activeIndx].link);
      }

      if (e.key === 'Escape') {
        this.props.history.push(`/${ROUTE.FORUMS}`);
      }
    };

    window.addEventListener('keydown', keyHandler);

    return () => window.removeEventListener('keydown', keyHandler);
  };

  public get renderTopics(): React.ReactNode {
    return this.state.topics.map((topic) => {
      return (
        <tr className="forums__row" key={topic.link}>
          <td className={topic.active ? 'forums__title active' : 'forums__title'}>
            <Link to={topic.link}>{topic.title}</Link>
          </td>
          <td>
            <div className="forums__topic">{topic.author}</div>
          </td>
          <td>
            <div className="forum__replies">{topic.repl}</div>
          </td>
        </tr>
      );
    });
  }

  render(): React.ReactElement {
    return (
      <div className="arcade__background arcade__background-all">
        <div className="arcade__background-content forums">
          <table className="forums__table">
            <thead>
              <tr className="forums__table-header">
                <th className="forum__title-col">
                  <div className="forums__header-name">NEW GAMES</div>
                </th>
                <th className="forums__topics-col">
                  <div className="forums__header-name">AUTHOR</div>
                </th>
                <th className="forums__replies-col">
                  <div className="forums__header-name">REPL</div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="forums__row forum__new-topic">
                <td className="forums__title">
                  <Link className="eagle-after" to={`/forum/${this.props.match.params.id}/new_topic`}>
                    NEW TOPIC
                  </Link>
                </td>
                <td>
                  <div className="forums__topic">YOU!</div>
                </td>
                <td>
                  <div className="forum__replies">?</div>
                </td>
              </tr>
              {this.renderTopics}
            </tbody>
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
