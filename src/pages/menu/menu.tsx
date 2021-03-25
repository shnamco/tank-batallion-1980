import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './menu.pcss';

export class Menu extends Component {
  public menuList = MENU_LIST;

  public render(): React.ReactElement {
    return (
      <div className="arcade__background arcade__background-all menu">
        <div className="menu-list">
          {this.menuList.map((item) => (
            <Link className="menu-list__item" to={item.route} key={item.id}>
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

enum ROUTE {
  PROFILE = 'profile',
  GAME = 'game',
  SCORE = 'score',
  FORUM = 'forum'
}

class MenuItem {
  constructor(public id: number, public name: string, public route: ROUTE) {}
}

const MENU_LIST = [
  new MenuItem(1, 'GAME', ROUTE.GAME),
  new MenuItem(2, 'PROFILE', ROUTE.PROFILE),
  new MenuItem(3, 'SCORE', ROUTE.SCORE),
  new MenuItem(4, 'FORUM', ROUTE.FORUM)
];
