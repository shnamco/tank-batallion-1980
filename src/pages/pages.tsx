import React, { Component } from 'react';
import { Route, Switch, Redirect, RouteComponentProps, withRouter } from 'react-router-dom';
import { Login } from '@pages/login/login';
import { Signup } from '@pages/signup/signup';
import { Game } from '@pages/game/game';
import { Profile } from '@pages/profile/profile';
import { Forums } from '@pages/forums/forums';
import { Forum } from '@pages/forum/forum';
import { Score } from '@pages/score/score';
import { Menu } from '@pages/menu/menu';
import { Private } from '@components/private_route/private_route';
import { AuthService } from '@service/auth_service';
import { authApi } from '@service/auth_api';
import { ROUTE } from '@utils/route';

// eslint-disable-next-line @typescript-eslint/ban-types
class PagesComponent extends Component<RouteComponentProps, {}> {
  private authService = new AuthService();

  public componentDidMount(): void {
    authApi.getProfile().then((res) => {
      if (res.status === 200) {
        this.authService.auth = true;
      } else {
        this.authService.auth = false;
        this.props.history.push(`${ROUTE.LOGIN}`);
      }
    });
  }

  public render(): React.ReactElement {
    return (
      <>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />

          <Private>
            <Switch>
              <Route path="/game">
                <Game level={1} />
              </Route>
              <Route path="/profile" component={Profile} />
              <Route path="/forums" component={Forums} />
              <Route path="/forum/:id" component={Forum} />
              <Route path="/score" component={Score} />
              <Route path="/menu" component={Menu} />
              <Redirect to="/menu" />
            </Switch>
          </Private>
        </Switch>
      </>
    );
  }
}

export const Pages = withRouter(PagesComponent);