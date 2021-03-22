import Header from '@components/header/header';
import { LoginForm } from './components/login_form/login_form';
import React from 'react';
import './login.pcss';

export const Login: React.FC = () => {
  return (
    <>
      <Header />
      <LoginForm />
    </>
  );
};
