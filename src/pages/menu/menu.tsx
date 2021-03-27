import React, { Component } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { ROUTE } from '@utils/route';
import bang from '../../assets/bang.svg';
import './menu.pcss';

interface MenuState {
  cursor: number;
  menuList: MenuItem[];
}

// eslint-disable-next-line @typescript-eslint/ban-types
class MenuComponent extends Component<RouteComponentProps, MenuState> {
  public route = ROUTE;
  public state = {
    cursor: 0,
    menuList: MENU_LIST
  };
  private handler: (() => void) | undefined;

  private onKeyDown(e: KeyboardEvent): void {
    const { cursor, menuList } = this.state;

    if (e.key === 'ArrowUp' && cursor > 0) {
      this.setState((prevState) => ({
        cursor: prevState.cursor - 1
      }));
    }
    if (e.key === 'ArrowDown' && cursor < menuList.length - 1) {
      this.setState((prevState) => ({
        cursor: prevState.cursor + 1
      }));
    }
    if (e.key === 'Enter') {
      const menuItem = menuList[cursor];
      this.props.history.push(menuItem.route);
    }
  }

  private keyPressHandler(): () => void {
    const handler = this.onKeyDown.bind(this);

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }

  public componentDidMount(): void {
    this.handler = this.keyPressHandler();
  }

  public componentWillUnmount(): void {
    if (this.handler) {
      this.handler();
    }
  }

  public render(): React.ReactElement {
    return (
      <div className="arcade__background arcade__background-all menu">
        <div className="menu-list">
          {this.state.menuList.map((item, i) => (
            <Link
              tabIndex={-1}
              className={`menu-list__item ${this.state.cursor === i ? 'active' : null} ${item.className}`}
              to={item.route}
              key={item.id}
            >
              {item.name}
              {item.route === this.route.LOGIN ? <img src={bang} alt="bang" className="logout__icon" /> : null}
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export const Menu = withRouter(MenuComponent);

class MenuItem {
  constructor(public id: number, public name: string, public route: ROUTE, public className?: string) {}
}

const MENU_LIST = [
  new MenuItem(1, 'PLAY', ROUTE.GAME),
  new MenuItem(2, 'PROFILE', ROUTE.PROFILE),
  new MenuItem(3, 'HIGH SCORES', ROUTE.SCORE),
  new MenuItem(4, 'FORUM', ROUTE.FORUMS),
  new MenuItem(5, 'LOG OUT', ROUTE.LOGIN, 'logout')
];
