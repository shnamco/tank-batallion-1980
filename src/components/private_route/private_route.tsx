import React, { ReactNode, useEffect } from 'react';
import { Redirect, RouteComponentProps, useHistory, withRouter } from 'react-router-dom';
import { useLoggedIn } from '@utils/use_logged_in';
import { useDispatch } from 'react-redux';
import { loginWithYandex } from '@store/auth/auth.thunks';

interface PrivateProps extends RouteComponentProps {
  children?: ReactNode;
}

export const PrivateComponent: React.FC<RouteComponentProps> = (props: PrivateProps) => {
  const isLogged: boolean = useLoggedIn();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const { pathname, search } = props.location;

    if (pathname === '/' && search) {
      const code = props.location.search.slice(6);

      dispatch(loginWithYandex(code, history));
    }
  });

  if (isLogged) {
    return <>{props.children}</>;
  }

  return <Redirect to="/login" />;
};

export const Private = withRouter(PrivateComponent);
