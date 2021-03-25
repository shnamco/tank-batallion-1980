import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import { Login } from '@pages/login/login';
import { Signup } from '@pages/signup/signup';
import { Game } from '@pages/game/game';
import { Profile } from '@pages/profile/profile';
import { ErrorBoundry } from '@components/error_boundary/error_boundary';
import './app.pcss';

export const App: React.FC = () => {
  return (
    <ErrorBoundry>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
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
    </ErrorBoundry>
  );
};
