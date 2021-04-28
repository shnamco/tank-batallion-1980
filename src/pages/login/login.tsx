import React from 'react';
import { LoginForm } from './components/login_form/login_form';
import './login.pcss';

export const Login: React.FC = () => {
  return (
    <div className="arcade__background arcade__background-all arcade-login">
      <div className="arcade__background-content">
        <LoginForm />
      </div>
    </div>
  );
};
