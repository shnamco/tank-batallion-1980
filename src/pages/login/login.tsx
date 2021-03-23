import { LoginForm } from './components/login_form/login_form';
import React from 'react';
import './login.pcss';

export const Login: React.FC = () => {
  return (
    <div className="arcade__background">
      <LoginForm />
    </div>
  );
};
