import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ROUTE } from '../../interfaces/route';
import { logOut } from '@store/auth/auth.thunks';
import { connect, ConnectedProps } from 'react-redux';
import './menu.pcss';

interface MenuState {
  cursor: number;
  menuList: MenuItem[];
}

interface MenuProps extends RouteComponentProps {
  logOut: () => unknown;
}

const connector = connect(null, { logOut });

type PropsFromRedux = ConnectedProps<typeof connector>;

class MenuComponent extends Component<PropsFromRedux & MenuProps, MenuState> {
  public state = {
    cursor: 0,
    menuList: this.menuActions
  };
  private handler: (() => void) | undefined;

  public get menuListIterable(): MenuAction[] {
    return this.state.menuList.filter((item) => item.route !== ROUTE.LOGIN);
  }

  public get logout(): MenuAction | undefined {
    return this.state.menuList.find((item) => item.route === ROUTE.LOGIN);
  }

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

      menuItem.action();
    }
  }

  private get menuActions(): MenuAction[] {
    return MENU_LIST.map((item) => {
      switch (item.route) {
        case ROUTE.LOGIN:
          return new MenuAction(item.id, item.name, item.route, this.logoutClicked.bind(this));
        default:
          return new MenuAction(item.id, item.name, item.route, this.itemClicked.bind(this, item.route));
      }
    });
  }

  private itemClicked(route: ROUTE): void {
    this.props.history.push(route);
  }

  private logoutClicked(): void {
    this.props.logOut();
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
      <div className="arcade__background arcade__background-all">
        <div className="arcade__background-content menu">
          <ul className="menu-list">
            {this.menuListIterable.map((item) => (
              <li
                onClick={item.action}
                tabIndex={-1}
                className={`menu-list__item ${this.state.cursor === item.id ? 'active' : null}`}
                key={item.id}
              >
                {item.name}
              </li>
            ))}
            <li
              onClick={this.logout?.action}
              tabIndex={-1}
              className={`menu-list__item ${this.state.cursor === this.logout?.id ? 'active' : null} logout`}
            >
              <span>{this.logout?.name}</span>
              <span className="logout__icon"></span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export const Menu = withRouter(connector(MenuComponent));

class MenuItem {
  constructor(public id: number, public name: string, public route: ROUTE) {}
}

class MenuAction extends MenuItem {
  constructor(public id: number, public name: string, public route: ROUTE, public action: () => void) {
    super(id, name, route);
  }
}

const MENU_LIST = [
  new MenuItem(0, 'PLAY', ROUTE.GAME),
  new MenuItem(1, 'PROFILE', ROUTE.PROFILE),
  new MenuItem(2, 'HIGH SCORES', ROUTE.SCORE),
  new MenuItem(4, 'LOG OUT', ROUTE.LOGIN)
];
