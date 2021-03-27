import React from 'react';
import './login.pcss';
import { LoginForm } from './components/login_form/login_form';

export const Login: React.FC = () => {
  return (
    <div className="arcade__background arcade__background-all arcade-login">
      <LoginForm />
    </div>
  );
};
