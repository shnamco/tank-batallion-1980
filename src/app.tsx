import React, { useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ErrorBoundry } from '@components/error_boundary/error_boundary';
import { Login } from '@pages/login/login';
import { Signup } from '@pages/signup/signup';
import { Private } from '@components/private_route/private_route';
import { Game } from '@pages/game/game';
import { Profile } from '@pages/profile/profile';
import { Forums } from '@pages/forums/forums';
import { Forum } from '@pages/forum/forum';
import { Score } from '@pages/score/score';
import { Menu } from '@pages/menu/menu';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, getUserTheme } from '@store/auth/auth.thunks';
import { selectTheme } from '@store/auth/auth.selectors';
import { THEME } from '@store/auth/auth.reducer';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  const style = (): string => {
    if (theme === THEME.LIGHT) {
      return 'invert(1)';
    }
    return 'invert(0)';
  };

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getUserTheme());
  });

  return (
    <div style={{ filter: style() }}>
      <ErrorBoundry>
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />

            <Private>
              <Switch>
                <Route path="/game">
                  <Game levelNo={1} playerLives={3} enemiesLeft={20} playerScore={0} />
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
        </BrowserRouter>
      </ErrorBoundry>
    </div>
  );
};
