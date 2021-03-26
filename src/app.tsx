import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import { ErrorBoundry } from '@components/error_boundary/error_boundary';
import { Login } from '@pages/login/login';
import { Signup } from '@pages/signup/signup';
import { Game } from '@pages/game/game';
import { Profile } from '@pages/profile/profile';
import { Forums } from '@pages/forums/forums';
import { Menu } from '@pages/menu/menu';
import './app.pcss';

export const App: React.FC = () => {
  return (
    <ErrorBoundry>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/game" component={Game} />
          <Route path="/profile" component={Profile} />
          <Route path="/forums" component={Forums} />
          <Route path="/menu" component={Menu} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </ErrorBoundry>
  );
};
