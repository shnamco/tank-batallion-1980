import React from 'react';
import './login.pcss';
import Header from '../../components/header/header';
import { LoginForm } from './components/login_form/login_form';

export const Login: React.FC = () => {
  return (
    <>
      <Header />
      <LoginForm />
    </>
  );
};
