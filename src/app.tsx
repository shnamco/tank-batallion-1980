import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import { Login } from './pages/login/login';
import './app.pcss';

export const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <div className="container">
        <Switch>
          <Route path="/login" component={Login} />
          <Route
            exact
            path="/"
            render={() => {
              return <Redirect to="/login" />;
            }}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
