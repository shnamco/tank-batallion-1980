import React from 'react';
import './app.pcss';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';

export const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <div className="container">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
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
