import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import { Login } from './pages/login/login';
import { Game } from './pages/game/game';
import './app.pcss';

export const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      {/* @Andrei-Vorobei, I don't think we need container everywhere */}
      {/* (see /game page) */}
      {/* <div className="container"> */}
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/game" component={Game} />
        <Route
          exact
          path="/"
          render={() => {
            return <Redirect to="/login" />;
          }}
        />
      </Switch>
      {/* </div> */}
    </BrowserRouter>
  );
};
