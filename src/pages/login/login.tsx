import React, { useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import './login.pcss';
import { LoginForm } from './components/login_form/login_form';
import { useDispatch } from 'react-redux';
import { loginWithYandex } from '@store/auth/auth.thunks';

const LoginComponent: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.location.search) {
      const code = props.location.search.slice(6);

      dispatch(loginWithYandex(code));
    }
  });

  return (
    <div className="arcade__background arcade__background-all arcade-login">
      <div className="arcade__background-content">
        <LoginForm />
      </div>
    </div>
  );
};

export const Login = withRouter(LoginComponent);
