import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import { Login } from '@pages/login/login';
import { Signup } from '@pages/signup/signup';
import { Game } from '@pages/game/game';
import { Profile } from '@pages/profile/profile';
import { Menu } from '@pages/menu/menu';
import './app.pcss';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/menu" component={Menu} />
        <Route path="/game" component={Game} />
        <Route path="/profile" component={Profile} />
        <Route
          exact
          path="/"
          render={() => {
            return <Redirect to="/login" />;
          }}
        />
      </Switch>
    </BrowserRouter>
  );
};
