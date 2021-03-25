import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ROUTE } from '../../models/route';
import bang from '../../assets/bang.svg';
import './menu.pcss';

export class Menu extends Component {
  public menuList = MENU_LIST;
  public logout = LOGOUT;
  public setRef: HTMLDivElement | null = null;

  public componentDidMount(): void {
    if (this.setRef) {
      (this.setRef.firstChild as HTMLLinkElement).focus();
    }
  }

  public render(): React.ReactElement {
    return (
      <div className="arcade__background arcade__background-all menu">
        <div ref={(ref) => (this.setRef = ref)} className="menu-list">
          {this.menuList.map((item) => (
            <Link className="menu-list__item" to={item.route} key={item.id}>
              {item.name}
            </Link>
          ))}
          <Link className="menu-list__item logout" to={this.logout.route} key={this.logout.id}>
            <span>{this.logout.name}</span>
            <img src={bang} alt="bang" className="logout__icon" />
          </Link>
        </div>
      </div>
    );
  }
}

class MenuItem {
  constructor(public id: number, public name: string, public route: ROUTE) {}
}

const MENU_LIST = [
  new MenuItem(1, 'GAME', ROUTE.GAME),
  new MenuItem(2, 'PROFILE', ROUTE.PROFILE),
  new MenuItem(3, 'HIGH SCORES', ROUTE.SCORE),
  new MenuItem(4, 'FORUM', ROUTE.FORUM)
];

const LOGOUT = new MenuItem(5, 'LOG OUT', ROUTE.LOGIN);
